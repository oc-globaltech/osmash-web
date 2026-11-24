import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

import { clamp } from "./numeric";
import type { ScenePose } from "./params";
import { createSpotMask } from "./spotMask";

// The procedural room is far brighter than a real interior; every material's envMapIntensity is scaled by this
// to bring it to the hero's target exposure.
export const ROOM_EXPOSURE = 0.02;
// A small hot panel up and to the left: the room alone lights the shuttles flat.
const SUN_PANEL = { radiance: 6000, position: [-6, 10, 10], size: [1, 0.1, 1] } as const;

// Candela per pose level unit, for decay-1 spots: the key sits about 5 units from the model, the top spot nearer.
const KEY_CANDELA_PER_LEVEL = 2.5;
const TOP_CANDELA_PER_LEVEL = 2;
const KEY = { position: [-0.14, 3.63, 4.54], coneDeg: 38, penumbra: 0.8 } as const;
const RIM = { position: [1.04, -2.67, -3], coneDeg: 45, penumbra: 0.8, shareOfKey: 0.5 } as const;
const TOP = { z: 2.4, coneDeg: 20, penumbra: 0.5, aimDrop: 3 } as const;
const MAX_CONE = THREE.MathUtils.degToRad(89);
const DECAY = 1;

function createHotPanel(): THREE.Mesh {
  const [width, height, depth] = SUN_PANEL.size;
  const hot = new THREE.MeshBasicMaterial({ color: new THREE.Color().setScalar(SUN_PANEL.radiance) });
  const sun = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), hot);
  sun.position.fromArray(SUN_PANEL.position);
  return sun;
}

// Prefilters the studio room into scene.environment; the returned disposer frees the PMREM resources.
export function createRoomLight(renderer: THREE.WebGLRenderer, scene: THREE.Scene): () => void {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment(renderer);
  room.add(createHotPanel());
  const envMap = pmrem.fromScene(room).texture;
  room.dispose();
  scene.environment = envMap;
  return () => {
    envMap.dispose();
    pmrem.dispose();
  };
}

function addSpot(scene: THREE.Scene, spec: { coneDeg: number; penumbra: number }): THREE.SpotLight {
  const spot = new THREE.SpotLight(0xffffff, 0, 0, THREE.MathUtils.degToRad(spec.coneDeg), spec.penumbra, DECAY);
  scene.add(spot, spot.target);
  return spot;
}

export type LightRig = {
  apply: (pose: ScenePose) => void;
  dispose: () => void;
};

// Key spot high in front, rim spot low behind-right, and a masked top spot whose height follows the pose.
export function createLightRig(scene: THREE.Scene): LightRig {
  const key = addSpot(scene, KEY);
  key.position.set(...KEY.position);
  const rim = addSpot(scene, RIM);
  rim.position.set(...RIM.position);
  const top = addSpot(scene, TOP);
  const mask = createSpotMask();
  top.map = mask;
  const apply = (pose: ScenePose) => {
    key.intensity = pose.keyLight * KEY_CANDELA_PER_LEVEL;
    key.angle = clamp(THREE.MathUtils.degToRad(KEY.coneDeg) * pose.keyCone, 0, MAX_CONE);
    rim.intensity = key.intensity * RIM.shareOfKey;
    top.intensity = pose.topLight * TOP_CANDELA_PER_LEVEL;
    top.position.set(0, pose.topLightY, TOP.z);
    top.target.position.set(0, pose.topLightY - TOP.aimDrop, 0);
  };
  return { apply, dispose: () => mask.dispose() };
}
