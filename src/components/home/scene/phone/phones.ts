import * as THREE from "three";

import { FEATURES } from "@/components/home/features";
import type { DeviceProfile } from "../deviceProfile";
import type { MaterialFactory } from "../materials";
import { createPhoneGeometries, type PhoneGeometries } from "./geometry";
import { createScreenMaterials, type ScreenSource } from "./screens";

// Off-white satin: the feather white, so the handover keeps the shuttle's luminance.
const FRAME_COLOR = 0xeceae4;
const FRAME_ROUGHNESS = 0.42;
const FRAME_METALNESS = 0.15;
const ISLAND_DARKEN = 0.85;
const FRAME_ENV_INTENSITY = 1.5;
const GLASS_COLOR = 0x07090c;
const GLASS_ROUGHNESS = 0.12;
const GLASS_ENV_INTENSITY = 0.6;

type BodyMaterials = { frame: THREE.Material; glass: THREE.Material; island: THREE.Material };

// `group` takes the shuttle's pose; `pivot` takes the turn about the long axis on top of it.
export type Phone = { group: THREE.Group; pivot: THREE.Group };

export type Phones = {
  items: Phone[];
  dispose: () => void;
};

export type PhonesDeps = { materials: MaterialFactory; profile: DeviceProfile; screens: ScreenSource; signal: AbortSignal };

function createBodyMaterials(materials: MaterialFactory): BodyMaterials {
  const frameParams = { roughness: FRAME_ROUGHNESS, metalness: FRAME_METALNESS, envMapIntensity: FRAME_ENV_INTENSITY };
  return {
    frame: materials.make({ color: FRAME_COLOR, ...frameParams }),
    island: materials.make({ color: new THREE.Color(FRAME_COLOR).multiplyScalar(ISLAND_DARKEN), ...frameParams }),
    glass: materials.make({ color: GLASS_COLOR, roughness: GLASS_ROUGHNESS, metalness: 0, envMapIntensity: GLASS_ENV_INTENSITY }),
  };
}

function createPhone(geometries: PhoneGeometries, body: BodyMaterials, screen: THREE.Material): Phone {
  const pivot = new THREE.Group();
  pivot.add(
    new THREE.Mesh(geometries.body, body.frame),
    new THREE.Mesh(geometries.buttons, body.frame),
    new THREE.Mesh(geometries.glass, body.glass),
    new THREE.Mesh(geometries.punch, body.glass),
    new THREE.Mesh(geometries.lenses, body.glass),
    new THREE.Mesh(geometries.island, body.island),
    new THREE.Mesh(geometries.screen, screen),
  );
  const group = new THREE.Group();
  group.add(pivot);
  group.visible = false;
  return { group, pivot };
}

// One hidden phone per slide, sharing one geometry set; the frame loop shows the focused one during the handover.
export function createPhones(scene: THREE.Scene, renderer: THREE.WebGLRenderer, deps: PhonesDeps): Phones {
  const geometries = createPhoneGeometries();
  const body = createBodyMaterials(deps.materials);
  const screens = createScreenMaterials(deps.screens, { materials: deps.materials, renderer, profile: deps.profile, signal: deps.signal });
  const items = FEATURES.map((_, slide) => {
    const phone = createPhone(geometries, body, screens.materials[slide]);
    scene.add(phone.group);
    return phone;
  });
  const dispose = () => {
    Object.values(geometries).forEach((geometry) => geometry.dispose());
    screens.dispose();
  };
  return { items, dispose };
}
