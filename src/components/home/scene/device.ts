import { isDesktop } from "@/components/shared/breakpoints";

// The part of the profile the shuttle, phone and tube builders read.
export type AssetProfile = {
  featherBump: boolean;
  shuttleCount: number;
};

// Read once at mount; a later resize keeps the render path the page started with.
export type DeviceProfile = AssetProfile & {
  // Half-float scene buffer, SMAA and physical materials; otherwise 8-bit, no SMAA, standard materials.
  fullPower: boolean;
  pixelRatioCap: number;
};

// DPR 2 on every device: below it a retina screen upscales the canvas and the phone's app text goes soft.
const PIXEL_RATIO_CAP = 2;
const FULL_POWER_SHUTTLES = 24;
const LIGHT_SHUTTLES = 12;

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
    pixelRatioCap: PIXEL_RATIO_CAP,
    featherBump: fullPower,
    shuttleCount: fullPower ? FULL_POWER_SHUTTLES : LIGHT_SHUTTLES,
  };
}
