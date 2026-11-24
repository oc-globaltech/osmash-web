import { isDesktop } from "@/components/shared/breakpoints";

// The part of the profile the shuttle, phone and tube builders read.
export type AssetProfile = {
  featherBump: boolean;
  shuttleCount: number;
  maxAnisotropy: number;
};

// Read once at mount; a later resize keeps the render path the page started with.
export type DeviceProfile = AssetProfile & {
  // Half-float scene buffer, SMAA and physical materials; otherwise 8-bit, no SMAA, standard materials.
  fullPower: boolean;
  pixelRatioCap: number;
};

// A full-power desktop gains little above DPR 1.5; phones stay at 2, where they need no SMAA.
const FULL_POWER_PIXEL_RATIO = 1.5;
const LIGHT_PIXEL_RATIO = 2;
const FULL_POWER_SHUTTLES = 24;
const LIGHT_SHUTTLES = 12;
const FULL_POWER_ANISOTROPY = 8;
const LIGHT_ANISOTROPY = 4;

// iPhones and iPods name themselves; iPadOS asks for the desktop site and only its touch points give it away.
function runsOnAppleTouchDevice(): boolean {
  const { userAgent, maxTouchPoints } = navigator;
  if (/iPhone|iPad|iPod/.test(userAgent)) return true;
  return /Macintosh/.test(userAgent) && maxTouchPoints > 1;
}

export function readDeviceProfile(): DeviceProfile {
  const fullPower = isDesktop() && !runsOnAppleTouchDevice();
  return {
    fullPower,
    pixelRatioCap: fullPower ? FULL_POWER_PIXEL_RATIO : LIGHT_PIXEL_RATIO,
    featherBump: fullPower,
    shuttleCount: fullPower ? FULL_POWER_SHUTTLES : LIGHT_SHUTTLES,
    maxAnisotropy: fullPower ? FULL_POWER_ANISOTROPY : LIGHT_ANISOTROPY,
  };
}
