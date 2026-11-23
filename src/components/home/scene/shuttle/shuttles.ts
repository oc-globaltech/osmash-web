import * as THREE from "three";

import type { DeviceProfile } from "../deviceProfile";
import type { MaterialFactory } from "../materials";
import { createFeatherTextures } from "./featherTexture";
import { createBandGeometry, createCorkGeometry, createSkirtGeometry, createThreadGeometry } from "./geometry";

// Logo colours: the ring nearer the cork is yellow, the one nearer the rim orange.
const THREAD_RINGS = [
  { along: 0.35, color: 0xfcc202 },
  { along: 0.6, color: 0xfc7301 },
];
const THREAD_ROUGHNESS = 0.85;
const FEATHER_ALPHA_TEST = 0.5;
const FEATHER_BUMP_SCALE = 0.6;
// Soft whites, not 0xffffff, so the lit side keeps shading instead of clipping.
const FEATHER_COLOR = 0xeceae4;
const FEATHER_ROUGHNESS = 0.6;
const CORK_COLOR = 0xe6e1d6; // white leather cork cover
const CORK_ROUGHNESS = 0.8;
// The key spots only reach the centre shuttle, so env light is what keeps the side ones off-white.
// Capped so the sections that push the tint to 2 still stay under clipping.
const SHUTTLE_ENV_INTENSITY = 1.5;
const BAND_COLOR = 0x011d41; // O'Smash navy
const BAND_ROUGHNESS = 0.5;

type ShuttlePart = { geometry: THREE.BufferGeometry; material: THREE.Material };

export type Shuttles = {
  groups: THREE.Group[];
  dispose: () => void;
};

function createParts(renderer: THREE.WebGLRenderer, materials: MaterialFactory, profile: DeviceProfile) {
  const textures = createFeatherTextures(renderer, profile);
  const feather = materials.make({
    color: FEATHER_COLOR,
    roughness: FEATHER_ROUGHNESS,
    envMapIntensity: SHUTTLE_ENV_INTENSITY,
    map: textures.color,
    alphaMap: textures.alpha,
    alphaTest: FEATHER_ALPHA_TEST,
    side: THREE.DoubleSide,
    ...(textures.bump ? { bumpMap: textures.bump, bumpScale: FEATHER_BUMP_SCALE } : {}),
  });
  const cork = materials.make({ color: CORK_COLOR, roughness: CORK_ROUGHNESS, envMapIntensity: SHUTTLE_ENV_INTENSITY });
  const band = materials.make({ color: BAND_COLOR, roughness: BAND_ROUGHNESS, envMapIntensity: SHUTTLE_ENV_INTENSITY });
  const threads = THREAD_RINGS.map(({ along, color }) => ({
    geometry: createThreadGeometry(along),
    material: materials.make({ color, roughness: THREAD_ROUGHNESS, metalness: 0, envMapIntensity: SHUTTLE_ENV_INTENSITY }),
  }));
  const parts: ShuttlePart[] = [
    { geometry: createCorkGeometry(), material: cork },
    { geometry: createBandGeometry(), material: band },
    ...threads,
    { geometry: createSkirtGeometry(), material: feather },
  ];
  // Parts are built along y, then turned onto z: the frame spins each part around its local z.
  parts.forEach(({ geometry }) => geometry.rotateX(Math.PI / 2));
  return { parts, textures: [textures.color, textures.alpha, textures.bump] };
}

// One shared set of geometries and materials, instanced as `profile.shuttleCount` meshes groups.
export function createShuttles(scene: THREE.Scene, renderer: THREE.WebGLRenderer, deps: { materials: MaterialFactory; profile: DeviceProfile }): Shuttles {
  const { parts, textures } = createParts(renderer, deps.materials, deps.profile);
  const groups = Array.from({ length: deps.profile.shuttleCount }, () => {
    const shuttle = new THREE.Group();
    parts.forEach(({ geometry, material }) => {
      const part = new THREE.Mesh(geometry, material);
      part.rotation.x = Math.PI / 2;
      shuttle.add(part);
    });
    scene.add(shuttle);
    return shuttle;
  });
  const dispose = () => {
    parts.forEach(({ geometry }) => geometry.dispose());
    textures.forEach((texture) => texture?.dispose());
  };
  return { groups, dispose };
}
