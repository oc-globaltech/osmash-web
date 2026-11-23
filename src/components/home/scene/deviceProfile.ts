import * as THREE from "three";

// Below this width the scene pages section by section and drops the heavier render path.
const MOBILE_MAX_WIDTH = 1024;

export const isMobileWidth = (): boolean => window.innerWidth < MOBILE_MAX_WIDTH;

export type DeviceProfile = {
  maxPixelRatio: number;
  renderTargetType: THREE.TextureDataType;
  smaa: boolean;
  // MeshStandard instead of MeshPhysical: no clearcoat or sheen, a much lighter fragment shader.
  physicalMaterials: boolean;
  featherBump: boolean;
  shuttleCount: number;
  // Caps the phone screen's texture filtering.
  maxAnisotropy: number;
};

// DPR 2 keeps mobile edges sharp without SMAA while staying near half the native pixels.
const LOW_POWER: DeviceProfile = {
  maxPixelRatio: 2,
  renderTargetType: THREE.UnsignedByteType,
  smaa: false,
  physicalMaterials: false,
  featherBump: false,
  shuttleCount: 12,
  maxAnisotropy: 4,
};

const FULL_POWER: DeviceProfile = {
  maxPixelRatio: 1.5,
  renderTargetType: THREE.HalfFloatType,
  smaa: true,
  physicalMaterials: true,
  featherBump: true,
  shuttleCount: 24,
  maxAnisotropy: 8,
};

const isIOS = (): boolean =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

// Read once at mount: a later resize keeps the render path the page started with.
export const detectDeviceProfile = (): DeviceProfile => (isIOS() || isMobileWidth() ? LOW_POWER : FULL_POWER);
