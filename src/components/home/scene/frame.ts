import * as THREE from "three";

import { CAROUSEL_SPACING, SLIDE_COUNT, type CarouselStore } from "@/components/home/carouselStore";
import type { EnvironmentTint } from "./environment";
import type { PointerState } from "./input/pointer";
import type { SwipeState } from "./input/swipe";
import type { SceneLights } from "./lights";
import type { Phone } from "./phone/phones";
import { clamp, lerp, wrap } from "./math";
import type { Podium } from "./podium";
import type { SceneView } from "./renderer";
import type { HomeScroll } from "./scroll";
import type { SceneParams } from "./sectionTimeline";
import type { Sections } from "./sections";

const EASE_RATE = 10;
const SWIPE_TO_CAROUSEL = 0.02;
const DESIGN_WIDTH = 1440;
const MAX_WINDOW_RATIO = 2.4;
const WAVE_AMPLITUDE = 0.25;
const SHUTTLE_REST_SCALE = 1.2;
const CAROUSEL_DEPTH = 0.2;
const CAROUSEL_TILT = (-Math.PI / 180) * 20;
const CAROUSEL_YAW = (Math.PI / 180) * 20;
const CAROUSEL_ROLL = (Math.PI / 360) * 22.5;
const SWIRL_TILT = 0.06;
const SWIRL_TILT_BASE = 0.2;
const POINTER_SCALE = 1280;
const SPIN_FROM_YAW = 0.6;
// Handover windows on `params.handover`: the shuttle shrinks away, then the phone grows in turning from edge-on.
// They overlap only where both are tiny, so the two bodies never visibly intersect.
const SHUTTLE_OUT = { from: 0, to: 0.55 } as const;
const PHONE_IN = { from: 0.45, to: 1 } as const;
const PHONE_EDGE_ON = Math.PI / 2;

export type FrameState = {
  view: SceneView;
  scroll: HomeScroll;
  carousel: CarouselStore;
  sections: Sections;
  params: SceneParams;
  timeline: gsap.core.Timeline;
  pointer: PointerState;
  swipe: SwipeState;
  shuttles: THREE.Group[];
  // One per slide; only the focused slot's phone is ever shown.
  phones: Phone[];
  podium: Podium;
  lights: SceneLights;
  tint: EnvironmentTint;
  contextLost: boolean;
};

type CarouselFrame = { heroShare: number; windowRatio: number; wave: number; halfRange: number };

// heroShare runs 0 in the hero to 1 once the hero has scrolled away.
function carouselFrame(state: FrameState): CarouselFrame {
  const { scroll, params } = state;
  const heroShare = clamp(scroll.position / state.sections.first.height, 0, 1);
  const windowRatio = clamp(DESIGN_WIDTH / scroll.lenis.dimensions.scrollWidth, 1, MAX_WINDOW_RATIO);
  const wave = windowRatio * WAVE_AMPLITUDE * (1 - heroShare) * params.wave;
  return { heroShare, windowRatio, wave, halfRange: state.shuttles.length * 0.5 * CAROUSEL_SPACING };
}

// Carousel wave pose in the hero, blended into the timeline pose as the hero scrolls away.
const slotOffset = (state: FrameState, frame: CarouselFrame, slot: number): number =>
  wrap(slot * CAROUSEL_SPACING - state.carousel.position, -frame.halfRange, frame.halfRange);

const focusAt = (offset: number): number => clamp(1 - Math.abs(offset) / CAROUSEL_SPACING, 0, 1);

function poseShuttle(state: FrameState, frame: CarouselFrame, slot: number): void {
  const { params, pointer } = state;
  const shuttle = state.shuttles[slot];
  const x = slotOffset(state, frame, slot);
  const focus = focusAt(x);
  const focusInHero = Math.min(focus, frame.heroShare);
  const posX = x * params.spacing;
  const tilt = lerp(CAROUSEL_TILT * params.wave, x * SWIRL_TILT * frame.windowRatio + SWIRL_TILT_BASE, params.swirl);
  const scale = lerp(SHUTTLE_REST_SCALE, params.modelScale, frame.heroShare);
  shuttle.position.x = posX;
  shuttle.position.y = lerp(Math.sin(posX * frame.wave), params.modelPosY, frame.heroShare);
  shuttle.position.z = lerp((Math.abs(x) * -1 - CAROUSEL_DEPTH) * params.wave, params.modelPosZ, frame.heroShare);
  shuttle.rotation.x = tilt + params.modelRotX;
  shuttle.rotation.y = lerp((posX * 0.5 - CAROUSEL_YAW) * params.wave, params.modelRotY, focusInHero);
  shuttle.rotation.z = lerp(CAROUSEL_ROLL * params.wave, params.modelRotZ, focusInHero);
  shuttle.scale.set(scale, scale, scale);
  shuttle.rotation.y += (pointer.smoothX / POINTER_SCALE) * params.pointerInfluence * focus;
  shuttle.rotation.x += (pointer.smoothY / POINTER_SCALE) * params.pointerInfluence * focus;
  shuttle.children.forEach((part) => {
    part.rotation.z = shuttle.rotation.y * SPIN_FROM_YAW + params.modelSpin * focus;
  });
}

// The phone takes the shuttle's pose; it grows from nothing while turning from edge-on to its sway.
function posePhone(phone: Phone, shuttle: THREE.Group, params: SceneParams, share: number): void {
  const grow = THREE.MathUtils.smoothstep(share, PHONE_IN.from, PHONE_IN.to);
  phone.group.visible = grow > 0;
  phone.group.position.copy(shuttle.position);
  phone.group.quaternion.copy(shuttle.quaternion);
  phone.group.scale.copy(shuttle.scale).multiplyScalar(grow);
  phone.pivot.rotation.y = params.phoneSway + PHONE_EDGE_ON * (1 - grow);
}

// Driven by the scroll-seeked timeline, so it scrubs both ways; only the focused slot hands over.
function handOver(state: FrameState, frame: CarouselFrame, slot: number): void {
  const shuttle = state.shuttles[slot];
  const share = state.params.handover * focusAt(slotOffset(state, frame, slot));
  if (share > 0) posePhone(state.phones[slot % SLIDE_COUNT], shuttle, state.params, share);
  const remaining = 1 - THREE.MathUtils.smoothstep(share, SHUTTLE_OUT.from, SHUTTLE_OUT.to);
  shuttle.scale.multiplyScalar(remaining);
  shuttle.visible = remaining > 0;
}

// Swipe flings, snapping and easing toward the target slide; notifies index listeners.
function moveCarousel(state: FrameState, delta: number): void {
  const { carousel, swipe, pointer } = state;
  carousel.target -= swipe.deltaX * SWIPE_TO_CAROUSEL * state.params.swipeSpeed;
  swipe.deltaX = 0;
  pointer.smoothX = lerp(pointer.smoothX, pointer.x, delta * EASE_RATE);
  pointer.smoothY = lerp(pointer.smoothY, pointer.y, delta * EASE_RATE);
  if (!swipe.holding) carousel.target = carousel.snappedTarget();
  carousel.position = lerp(carousel.position, carousel.target, delta * EASE_RATE);
}

function applyView(state: FrameState): void {
  const { params, view } = state;
  state.podium.setOffset(params.baseOffset);
  view.camera.position.set(params.camPosX, params.camPosY, params.camPosZ);
  view.camera.rotation.set(params.camRotX, params.camRotY, params.camRotZ);
  state.lights.update(params);
  state.tint.strength.value = params.tintStrength;
  if (!state.contextLost) view.composer.render();
}

function renderFrame(state: FrameState, delta: number): void {
  moveCarousel(state, delta);
  state.view.camera.fov = state.params.fov;
  state.view.camera.updateProjectionMatrix();
  state.carousel.syncIndex();
  state.timeline.seek(state.scroll.position / state.scroll.lenis.dimensions.scrollHeight);
  const frame = carouselFrame(state);
  state.phones.forEach((phone) => (phone.group.visible = false));
  state.shuttles.forEach((_, slot) => {
    poseShuttle(state, frame, slot);
    handOver(state, frame, slot);
  });
  applyView(state);
}

// Runs every animation frame until `signal` aborts; the first frame renders synchronously.
export function startFrameLoop(state: FrameState, signal: AbortSignal): void {
  let time = 0;
  let frameId = 0;
  const tick = (now = 0) => {
    const delta = now / 1000 - time;
    frameId = requestAnimationFrame(tick);
    time = now / 1000;
    state.scroll.lenis.raf(time * 1000);
    renderFrame(state, delta);
  };
  signal.addEventListener("abort", () => cancelAnimationFrame(frameId));
  tick();
}
