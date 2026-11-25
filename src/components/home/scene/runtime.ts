import type Lenis from "lenis";
import * as THREE from "three";

import { isPhone } from "@/components/shared/breakpoints";
import type { CarouselStore } from "../carousel";
import { PLAYER_SCREENS } from "../features";
import { watchActiveStage } from "../sections/stageFades";
import { PLAYER_STAGES } from "../stages";
import { bindAnchorScroll } from "./anchorScroll";
import { CarouselInput } from "./carouselInput";
import { CarouselRig } from "./carouselRig";
import { readDeviceProfile } from "./device";
import { createLightRig, createRoomLight, createRoomLightAsync, type LightRig } from "./lighting";
import { createMaterialFactory, type MaterialFactory } from "./materialKit";
import { applyOrbit } from "./orbitCamera";
import { createPhones, type Phones } from "./phone/phones";
import { appScreenshots } from "./phone/screens";
import { updateCallouts } from "./screenCallouts";
import { createPodium, type Podium } from "./podium";
import { PoseTrack, resolvePhonePose, resolvePose } from "./poseTrack";
import { createShuttles, type Shuttles } from "./shuttle/shuttles";
import { createSmoothScroll } from "./smoothScroll";
import { measureStages, type StageBand } from "./stageLayout";
import { StagePager } from "./stagePaging";
import { createView, type View } from "./view";

// A long stall (background tab, debugger) must not fling the damped values.
const MAX_FRAME_SECONDS = 0.1;

type Scene = {
  view: View;
  phones: Phones;
  lights: LightRig;
  materials: MaterialFactory;
  podium: Podium;
  rig: CarouselRig;
  // Prefilters the room light again: a restored GPU context comes back without it.
  relight: () => void;
};

type Runtime = Scene & {
  carousel: CarouselStore;
  lenis: Lenis;
  input: CarouselInput;
  bands: StageBand[];
  track: PoseTrack;
  contextLost: boolean;
  // Kept from resize events: reading window.innerWidth in the frame loop forces a layout.
  viewportWidth: number;
};

const buildTrack = (bands: StageBand[]): PoseTrack => new PoseTrack(bands, isPhone() ? resolvePhonePose : resolvePose);

// The phones stay hidden until the handover: compile their shaders now, for the scene pass's target format,
// so their first appearance mid-scroll does not stall a frame. The GPU compiles them in parallel.
async function warmUp(view: View, phones: THREE.Object3D[]): Promise<void> {
  phones.forEach((phone) => (phone.visible = true));
  view.renderer.setRenderTarget(view.sceneTarget);
  const compiled = view.renderer.compileAsync(view.scene, view.camera);
  view.renderer.setRenderTarget(null);
  phones.forEach((phone) => (phone.visible = false));
  await compiled;
}

// What the build has made so far, for the teardown.
type Built = Partial<{ view: View; disposeRoom: () => void; lights: LightRig; materials: MaterialFactory; shuttles: Shuttles; phones: Phones }>;

function disposeBuilt(built: Built): void {
  built.view?.scene.traverse((object) => {
    if (object instanceof THREE.Mesh) object.geometry.dispose();
  });
  built.shuttles?.dispose();
  built.phones?.dispose();
  built.materials?.dispose();
  built.lights?.dispose();
  built.disposeRoom?.();
  built.view?.dispose();
}

// Hands the main thread back between build steps, so no single step blocks input for long.
async function nextTask(signal: AbortSignal): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 0));
  signal.throwIfAborted();
}

async function buildSteps(built: Built, signal: AbortSignal): Promise<Scene> {
  const profile = readDeviceProfile();
  const view = createView(profile);
  built.view = view;
  await nextTask(signal);
  built.disposeRoom = await createRoomLightAsync(view.renderer, view.scene, signal);
  // The lost context already freed the old room on the GPU; disposing it now would delete foreign handles.
  const relight = () => (built.disposeRoom = createRoomLight(view.renderer, view.scene));
  await nextTask(signal);
  const lights = createLightRig(view.scene);
  built.lights = lights;
  await nextTask(signal);
  const materials = createMaterialFactory(profile);
  built.materials = materials;
  const podium = createPodium(view.scene, materials);
  const shuttles = createShuttles(view.scene, view.renderer, { materials, profile });
  built.shuttles = shuttles;
  await nextTask(signal);
  const phones = createPhones(view.scene, view.renderer, { materials, screens: appScreenshots, overrideScreens: PLAYER_SCREENS, signal });
  built.phones = phones;
  await nextTask(signal);
  await warmUp(view, phones.items.map(({ group }) => group));
  signal.throwIfAborted();
  return { view, phones, lights, materials, podium, rig: new CarouselRig(shuttles.groups, phones.items), relight };
}

// Builds the scene over several tasks; everything built is freed when `signal` aborts, after the step in flight
// settles (three's async compile keeps polling the materials it was given).
function buildScene(signal: AbortSignal): Promise<Scene> {
  const built: Built = {};
  const build = buildSteps(built, signal);
  signal.addEventListener("abort", () => void build.catch(() => undefined).then(() => disposeBuilt(built)), { once: true });
  return build;
}

function renderFrame(runtime: Runtime, seconds: number): void {
  const scroll = runtime.lenis.animatedScroll;
  const pose = runtime.track.sample(scroll);
  runtime.carousel.step(seconds);
  runtime.input.update(seconds);
  runtime.rig.apply({ pose, heroShare: runtime.track.heroShare(scroll), position: runtime.carousel.position, pointer: runtime.input.pointer, viewportWidth: runtime.viewportWidth });
  applyOrbit(runtime.view.camera, pose);
  runtime.lights.apply(pose);
  runtime.materials.setRoomLevel(pose.envLevel);
  runtime.podium.setOffset(pose.tubeGap / 2);
  if (!runtime.contextLost) runtime.view.render();
  const callouts = document.querySelector<HTMLElement>('[data-part="closeup-callouts"]');
  const shownPhone = runtime.phones.items.find(({ group }) => group.visible);
  if (callouts) updateCallouts(callouts, shownPhone, runtime.view.camera, runtime.carousel.index);
}

// Each player point puts its own screen on the phone; every other stage shows the slide's screen.
function watchPlayerScreens(phones: Phones, signal: AbortSignal): void {
  watchActiveStage((stage) => {
    const point = PLAYER_STAGES.indexOf(stage as (typeof PLAYER_STAGES)[number]);
    phones.showOverride(point >= 0 ? point : null);
  }, signal);
}

// Runs every animation frame until `signal` aborts; the first frame renders before this returns.
function startLoop(runtime: Runtime, signal: AbortSignal): void {
  let frameId = 0;
  let last = performance.now();
  const tick = (now: number) => {
    frameId = requestAnimationFrame(tick);
    const seconds = Math.min(Math.max(now - last, 0) / 1000, MAX_FRAME_SECONDS);
    last = now;
    runtime.lenis.raf(now);
    renderFrame(runtime, seconds);
  };
  signal.addEventListener("abort", () => cancelAnimationFrame(frameId), { once: true });
  tick(last);
}

// Mobile browsers drop the GPU context under memory pressure; rendering waits until it is back. three.js
// re-uploads meshes and image textures by itself, but the prefiltered room light lived only on the GPU.
function watchContext(runtime: Runtime, signal: AbortSignal): void {
  const { canvas } = runtime.view;
  const onLost = (event: Event) => {
    event.preventDefault();
    console.warn("Scene paused: graphics context lost");
    runtime.contextLost = true;
  };
  canvas.addEventListener("webglcontextlost", onLost, { signal });
  const onRestored = () => {
    runtime.relight();
    runtime.contextLost = false;
  };
  canvas.addEventListener("webglcontextrestored", onRestored, { signal });
}

function remeasure(runtime: Runtime): void {
  runtime.bands = measureStages();
  runtime.track = buildTrack(runtime.bands);
}

// Stage bands move when fonts, images or the accordion change the page height; the view only on a width
// change, so a mobile toolbar sliding away does not resize the canvas.
function watchLayout(runtime: Runtime, signal: AbortSignal): void {
  const onResize = () => {
    if (window.innerWidth === runtime.viewportWidth) return;
    runtime.viewportWidth = window.innerWidth;
    runtime.view.resize();
    remeasure(runtime);
  };
  window.addEventListener("resize", onResize, { signal });
  const observer = new ResizeObserver(() => remeasure(runtime));
  observer.observe(document.body);
  signal.addEventListener("abort", () => observer.disconnect(), { once: true });
}

// The page always opens at the hero: now, and again once late content has loaded.
function openAtHero(lenis: Lenis, signal: AbortSignal): void {
  const toTop = () => lenis.scrollTo(0, { immediate: true, force: true });
  toTop();
  window.addEventListener("load", toTop, { signal, once: true });
}

function styleCanvas(canvas: HTMLCanvasElement): void {
  Object.assign(canvas.style, { position: "fixed", inset: "0", zIndex: "var(--z-scene)", opacity: "0" });
}

// Builds the WebGL scene into `host` and drives scroll, paging, anchors and carousel input; resolves to the
// canvas, still transparent. Everything is torn down when `signal` aborts.
export async function mountScene(host: HTMLElement, carousel: CarouselStore, signal: AbortSignal): Promise<HTMLCanvasElement> {
  const scene = await buildScene(signal);
  // Lenis only asks the gate on wheel events, after mountScene has returned and `pager` exists.
  const lenis = createSmoothScroll((data) => pager.takeWheel(data.event), signal);
  const bands = measureStages();
  const pager = new StagePager(lenis, () => runtime.bands);
  const input = new CarouselInput({
    canvas: scene.view.canvas,
    camera: scene.view.camera,
    rig: scene.rig,
    carousel,
    lenis,
    scene: {
      dragEnabled: () => runtime.track.dragEnabled(lenis.animatedScroll, window.innerHeight),
      inHero: () => pager.atHero(),
      dragSpeed: () => runtime.track.sample(lenis.animatedScroll).dragSpeed,
      leaveHero: () => pager.leaveHero(),
    },
  });
  const runtime: Runtime = { ...scene, carousel, lenis, input, bands, track: buildTrack(bands), contextLost: false, viewportWidth: window.innerWidth };
  pager.bindTouch(signal);
  input.bind(signal);
  bindAnchorScroll(lenis, signal);
  watchContext(runtime, signal);
  watchPlayerScreens(scene.phones, signal);
  watchLayout(runtime, signal);
  styleCanvas(scene.view.canvas);
  host.appendChild(scene.view.canvas);
  openAtHero(lenis, signal);
  startLoop(runtime, signal);
  return scene.view.canvas;
}
