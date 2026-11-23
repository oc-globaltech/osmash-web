import * as THREE from "three";

import type { DeviceProfile } from "./deviceProfile";
import { applyEnvironmentTint, type EnvironmentTint } from "./environment";

type StandardParams = THREE.MeshStandardMaterialParameters;
// Clearcoat, sheen, ior: only the full-power path renders them.
type PhysicalExtras = Omit<THREE.MeshPhysicalMaterialParameters, keyof StandardParams>;

export type MaterialFactory = {
  make: (params: StandardParams, extras?: PhysicalExtras) => THREE.MeshStandardMaterial;
  dispose: () => void;
};

// Every material is tinted by the environment and tracked so the scene can dispose it.
export function createMaterialFactory(profile: DeviceProfile, tint: EnvironmentTint): MaterialFactory {
  const materials: THREE.MeshStandardMaterial[] = [];
  const make = (params: StandardParams, extras: PhysicalExtras = {}) => {
    const material = profile.physicalMaterials
      ? new THREE.MeshPhysicalMaterial({ ...params, ...extras })
      : new THREE.MeshStandardMaterial(params);
    applyEnvironmentTint(material, tint);
    materials.push(material);
    return material;
  };
  return { make, dispose: () => materials.forEach((material) => material.dispose()) };
}
