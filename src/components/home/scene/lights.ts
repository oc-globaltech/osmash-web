import * as THREE from "three";

import type { SceneParams } from "./sectionTimeline";
import { createSpotMask } from "./spotMask";

// The section timeline's key-spot intensities suit a darker model; scaled down so the white shuttle shades instead of clipping.
const KEY_LIGHT_SCALE = 0.13;
const KEY_LIGHT_BASE_ANGLE = Math.PI / 4;
const SPOT_PENUMBRA = 1;
const SPOT_DECAY = 0.1;
const SPOT_TARGET_DROP = 2.5;
const SPOT_Z = 2;

export type SceneLights = {
  update: (params: SceneParams) => void;
  dispose: () => void;
};

function addSpot(scene: THREE.Scene, spot: THREE.SpotLight): THREE.SpotLight {
  scene.add(spot);
  scene.add(spot.target);
  return spot;
}

export function createLights(scene: THREE.Scene): SceneLights {
  const white = new THREE.Color(0xffffff);
  const key = addSpot(scene, new THREE.SpotLight(white, 50, 8, Math.PI / 4, SPOT_PENUMBRA, SPOT_DECAY));
  key.position.set(0, 3.5, 0);
  key.target.position.set(0, 0, 1);
  const fill = addSpot(scene, new THREE.SpotLight(white, 50, 8, Math.PI / 3, SPOT_PENUMBRA, SPOT_DECAY));
  fill.position.set(0, -3, 2);
  fill.target.position.set(0, 0, 1.8);
  const mask = createSpotMask();
  const top = new THREE.SpotLight(white, 0, 15, Math.PI / 8, SPOT_PENUMBRA, SPOT_DECAY);
  top.map = mask;
  top.position.set(0, 3, 5);
  top.target.position.set(0, 0.5, 0);
  addSpot(scene, top);

  const update = (params: SceneParams) => {
    [key, fill].forEach((spot) => {
      spot.intensity = params.lightIntensity * KEY_LIGHT_SCALE;
      spot.angle = KEY_LIGHT_BASE_ANGLE * params.lightWidth;
    });
    top.intensity = params.spotIntensity;
    top.position.set(0, params.spotY, SPOT_Z);
    top.target.position.set(0, params.spotY - SPOT_TARGET_DROP, 0);
  };

  return { update, dispose: () => mask.dispose() };
}
