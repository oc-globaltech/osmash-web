import * as THREE from "three";

import type { CarouselStore } from "@/components/home/carouselStore";
import { bindHashLinkScroll } from "@/components/home/hashLinkScroll";
import { resetToTopOnLoad } from "@/components/home/resetToTopOnLoad";
import { gsap } from "@/components/shared/gsap";
import { detectDeviceProfile, type DeviceProfile } from "./deviceProfile";
import { createEnvironment, createEnvironmentTint } from "./environment";
import { startFrameLoop, type FrameState } from "./frame";
import { trackPointer } from "./input/pointer";
import { bindMobilePaging } from "./input/mobilePaging";
import { bindShuttleClick } from "./input/shuttleClick";
import { bindSwipe, createSwipeState } from "./input/swipe";
import { bindWheelPaging } from "./input/wheelPaging";
import { createLights } from "./lights";
import { createMaterialFactory } from "./materials";
import { createPhones, type Phone } from "./phone/phones";
import { placeholderScreens } from "./phone/screens";
import { createPodium } from "./podium";
import { createSceneView, type SceneView } from "./renderer";
import { bindScrollSnap, HomeScroll } from "./scroll";
import { bindScrollIndicator } from "./scrollIndicator";
import { buildSectionTimeline, INITIAL_PARAMS } from "./sectionTimeline";
import { Sections } from "./sections";
import { createShuttles } from "./shuttle/shuttles";

export type SceneHooks = {
  signal: AbortSignal;
  // Fires once the first frame has rendered.
  onReady: () => void;
};

type SceneCore = ReturnType<typeof buildCore>;

// Renderer, environment, lights and materials; the canvas is in `host` when this returns.
function buildCore(host: HTMLElement, profile: DeviceProfile) {
  const scroll = new HomeScroll();
  const view = createSceneView(host, profile);
  const tint = createEnvironmentTint();
  const disposeEnvironment = createEnvironment(view.renderer, view.scene);
  const lights = createLights(view.scene);
  const materials = createMaterialFactory(profile, tint);
  const dispose = () => {
    scroll.lenis.destroy();
    disposeEnvironment();
    lights.dispose();
    materials.dispose();
    view.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) object.geometry.dispose();
    });
    view.dispose();
    document.body.style.cursor = "";
    document.body.style.overflow = "";
  };
  return { scroll, view, tint, lights, materials, dispose };
}

// Pauses rendering while the GPU context is gone (common on iOS under memory pressure).
function watchContextLoss(state: FrameState, signal: AbortSignal): void {
  const canvas = state.view.renderer.domElement;
  canvas.addEventListener(
    "webglcontextlost",
    (event) => {
      event.preventDefault();
      console.warn("WebGL context lost, rendering paused");
      state.contextLost = true;
    },
    { signal },
  );
  canvas.addEventListener(
    "webglcontextrestored",
    () => {
      console.warn("WebGL context restored, rendering resumed");
      state.contextLost = false;
    },
    { signal },
  );
}

const rebuildTimeline = (state: FrameState, motion: gsap.Context): gsap.core.Timeline =>
  motion.add(() => buildSectionTimeline(state.params, { sections: state.sections, scrollHeight: state.scroll.lenis.dimensions.scrollHeight }, state.swipe));

// Same width means a mobile toolbar resize: nothing to re-measure.
function bindResize(state: FrameState, motion: gsap.Context, signal: AbortSignal): void {
  let lastWidth = window.innerWidth;
  const onResize = () => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    state.view.resize();
    state.sections.measure();
    state.timeline.kill();
    state.timeline = rebuildTimeline(state, motion);
  };
  window.addEventListener("resize", onResize, { signal });
}

function bindInput(state: FrameState, signal: AbortSignal): void {
  const canvas = state.view.renderer.domElement;
  const { carousel, scroll, sections, swipe } = state;
  bindShuttleClick({ camera: state.view.camera, canvas, shuttles: state.shuttles, carousel, scroll, sections, swipe }, signal);
  watchContextLoss(state, signal);
  bindSwipe(canvas, { swipe, lenis: scroll.lenis }, signal);
  bindMobilePaging(scroll, sections, signal);
  bindWheelPaging(scroll, sections, signal);
  bindHashLinkScroll(scroll.lenis, signal);
}

// The phones stay hidden until the handover; compile their shaders now, against the composer's target
// (its tone-mapping variant), so their first appearance mid-scroll does not stall a frame.
function warmUpPhones(view: SceneView, phones: Phone[]): void {
  phones.forEach((phone) => (phone.group.visible = true));
  view.renderer.setRenderTarget(view.composer.readBuffer);
  view.renderer.compile(view.scene, view.camera);
  view.renderer.setRenderTarget(null);
  phones.forEach((phone) => (phone.group.visible = false));
}

type SceneSetup = { profile: DeviceProfile; motion: gsap.Context; signal: AbortSignal };

function createFrameState(core: SceneCore, carousel: CarouselStore, setup: SceneSetup): FrameState {
  const podium = createPodium(core.view.scene, core.materials);
  const shuttles = createShuttles(core.view.scene, core.view.renderer, { materials: core.materials, profile: setup.profile });
  setup.signal.addEventListener("abort", shuttles.dispose, { once: true });
  const phones = createPhones(core.view.scene, core.view.renderer, { materials: core.materials, profile: setup.profile, screens: placeholderScreens, signal: setup.signal });
  setup.signal.addEventListener("abort", phones.dispose, { once: true });
  warmUpPhones(core.view, phones.items);
  const sections = new Sections();
  sections.measure();
  const { scroll, view, tint, lights } = core;
  const params = { ...INITIAL_PARAMS };
  const swipe = createSwipeState();
  const timeline = setup.motion.add(() => buildSectionTimeline(params, { sections, scrollHeight: scroll.lenis.dimensions.scrollHeight }, swipe));
  const pointer = trackPointer(setup.signal);
  return { view, scroll, carousel, sections, params, timeline, pointer, swipe, shuttles: shuttles.groups, phones: phones.items, podium, lights, tint, contextLost: false };
}

// Builds the hero WebGL scene into `host` and wires its scroll and input; everything is torn down when `hooks.signal` aborts.
export function createHomeScene(host: HTMLElement, carousel: CarouselStore, hooks: SceneHooks): void {
  const { signal } = hooks;
  const profile = detectDeviceProfile();
  const core = buildCore(host, profile);
  resetToTopOnLoad(() => core.scroll.lenis.scrollTo(0, { immediate: true }), signal);
  const motion = gsap.context(() => undefined);
  signal.addEventListener(
    "abort",
    () => {
      motion.revert();
      core.dispose();
    },
    { once: true },
  );
  const state = createFrameState(core, carousel, { profile, motion, signal });
  bindScrollSnap(state.scroll, state.sections, signal);
  bindInput(state, signal);
  startFrameLoop(state, signal);
  bindResize(state, motion, signal);
  state.scroll.lenis.scrollTo(0, { immediate: true });
  motion.add(() => bindScrollIndicator(state.scroll));
  hooks.onReady();
}
