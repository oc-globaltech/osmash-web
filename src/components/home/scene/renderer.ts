import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import type { Pass } from "three/addons/postprocessing/Pass.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { SMAAPass } from "three/addons/postprocessing/SMAAPass.js";

import type { DeviceProfile } from "./deviceProfile";

const CAMERA_FOV = 20;
const CAMERA_NEAR = 0.1;
const CAMERA_FAR = 1000;

type SceneParts = { scene: THREE.Scene; camera: THREE.PerspectiveCamera; renderer: THREE.WebGLRenderer };

export type SceneView = SceneParts & {
  composer: EffectComposer;
  resize: () => void;
  dispose: () => void;
};

function createComposer(parts: SceneParts, profile: DeviceProfile) {
  const pixelRatio = parts.renderer.getPixelRatio();
  const target = new THREE.WebGLRenderTarget(window.innerWidth * pixelRatio, window.innerHeight * pixelRatio, {
    type: profile.renderTargetType,
    samples: 0,
  });
  const composer = new EffectComposer(parts.renderer, target);
  // No bloom: the shuttle reads as a matte product shot, not a glowing one.
  const passes: Pass[] = [new RenderPass(parts.scene, parts.camera), new OutputPass()];
  if (profile.smaa) passes.push(new SMAAPass(target.width, target.height));
  passes.forEach((pass) => composer.addPass(pass));
  return { composer, passes };
}

function createRenderer(host: HTMLElement, profile: DeviceProfile): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, profile.maxPixelRatio));
  renderer.setClearColor(0x000000, 0);
  THREE.ColorManagement.enabled = true;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.appendChild(renderer.domElement);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  return renderer;
}

// Transparent full-viewport renderer appended to `host`; the page's navy body shows through.
export function createSceneView(host: HTMLElement, profile: DeviceProfile): SceneView {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(CAMERA_FOV, window.innerWidth / window.innerHeight, CAMERA_NEAR, CAMERA_FAR);
  const renderer = createRenderer(host, profile);
  const { composer, passes } = createComposer({ scene, camera, renderer }, profile);

  const resize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    composer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const dispose = () => {
    passes.forEach((pass) => pass.dispose());
    composer.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  };

  return { scene, camera, renderer, composer, resize, dispose };
}
