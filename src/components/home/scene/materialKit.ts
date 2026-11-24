import * as THREE from "three";

import type { DeviceProfile } from "./device";
import { ROOM_EXPOSURE } from "./lighting";

type MaterialParams = THREE.MeshStandardMaterialParameters;
type MaterialClass = new (params: MaterialParams) => THREE.MeshStandardMaterial;

export type MaterialFactory = {
  make: (params: MaterialParams) => THREE.MeshStandardMaterial;
  // Scales every material's room reflection and fill by the pose's level.
  setRoomLevel: (level: number) => void;
  dispose: () => void;
};

// Every material made here follows the shared room level and is freed by dispose().
export function createMaterialFactory(profile: DeviceProfile): MaterialFactory {
  const Material: MaterialClass = profile.fullPower ? THREE.MeshPhysicalMaterial : THREE.MeshStandardMaterial;
  // Each material's own envMapIntensity, before the room level scales it.
  const ownIntensity = new Map<THREE.MeshStandardMaterial, number>();
  let roomLevel = 1;
  const applyRoomLevel = (material: THREE.MeshStandardMaterial, own: number) =>
    (material.envMapIntensity = own * roomLevel * ROOM_EXPOSURE);
  return {
    make: (params) => {
      const material = new Material(params);
      ownIntensity.set(material, material.envMapIntensity);
      applyRoomLevel(material, material.envMapIntensity);
      return material;
    },
    setRoomLevel: (level) => {
      if (level === roomLevel) return;
      roomLevel = level;
      ownIntensity.forEach((own, material) => applyRoomLevel(material, own));
    },
    dispose: () => ownIntensity.forEach((_, material) => material.dispose()),
  };
}
