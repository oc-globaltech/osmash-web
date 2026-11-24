import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { SMAAPass } from "three/addons/postprocessing/SMAAPass.js";

import type { DeviceProfile } from "./device";
import { INITIAL_POSE } from "./params";

const NEAR = 0.1;
const FAR = 400;

export type View = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  canvas: HTMLCanvasElement;
  // Same format as the target the scene pass renders into, for shader warm-up.
  sceneTarget: THREE.WebGLRenderTarget;
  render: () => void;
  resize: () => void;
  dispose: () => void;
};

const viewportSize = () => ({ width: window.innerWidth, height: window.innerHeight });

function createRenderer(profile: DeviceProfile): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, profile.pixelRatioCap));
  const { width, height } = viewportSize();
  renderer.setSize(width, height);
  return renderer;
}

// Full power keeps the HDR range in a half-float buffer until tone mapping; the light path stays 8-bit.
function createComposer(renderer: THREE.WebGLRenderer, fullPower: boolean): EffectComposer {
  const { width, height } = renderer.getDrawingBufferSize(new THREE.Vector2());
  const type = fullPower ? THREE.HalfFloatType : THREE.UnsignedByteType;
  return new EffectComposer(renderer, new THREE.WebGLRenderTarget(width, height, { type }));
}

// Transparent full-viewport canvas: the navy page shows through wherever nothing is drawn.
export function createView(profile: DeviceProfile): View {
  const scene = new THREE.Scene();
  const { width, height } = viewportSize();
  const camera = new THREE.PerspectiveCamera(INITIAL_POSE.fov, width / height, NEAR, FAR);
  const renderer = createRenderer(profile);
  const composer = createComposer(renderer, profile.fullPower);
  composer.addPass(new RenderPass(scene, camera));
  // Tone map and sRGB first; SMAA then smooths the edges as they will be shown. No bloom: the look stays matte.
  composer.addPass(new OutputPass());
  if (profile.fullPower) composer.addPass(new SMAAPass(composer.renderTarget1.width, composer.renderTarget1.height));
  const resize = () => {
    const size = viewportSize();
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
    renderer.setSize(size.width, size.height);
    composer.setSize(size.width, size.height);
  };
  const dispose = () => {
    composer.passes.forEach((pass) => pass.dispose());
    composer.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  };
  return { scene, camera, renderer, canvas: renderer.domElement, sceneTarget: composer.renderTarget1, render: () => composer.render(), resize, dispose };
}
