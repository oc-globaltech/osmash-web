import * as THREE from "three";

import { FEATURE_PRIMARY_COLOR, FEATURES, type Feature } from "@/components/home/features";
import type { AssetProfile as DeviceProfile } from "../device";

// Under 1 so the app's white stays below the clipping guard.
const SCREEN_BRIGHTNESS = 0.9;
const SCREEN_OFF_RGB = [0x0b, 0x0f, 0x14, 0xff];
const PLACEHOLDER_HEIGHT = 1280;
const PLACEHOLDER_WIDTH = 590;
const PLACEHOLDER_FONT = "700 110px system-ui, sans-serif";

// Loads the texture shown on one slide's screen; the caller owns and disposes it.
export type ScreenSource = (feature: Feature) => Promise<THREE.Texture>;

export type ScreenMaterials = {
  materials: THREE.MeshBasicMaterial[];
  // Shows the override screen at `index` on every phone, or each slide's own screen again for null.
  showOverride: (index: number | null) => void;
  dispose: () => void;
};

type ScreenDeps = { renderer: THREE.WebGLRenderer; profile: DeviceProfile; signal: AbortSignal };

// @placeholder until the app screenshots land: the slide colour with its name in large type.
export const placeholderScreens: ScreenSource = async (feature) => {
  const canvas = document.createElement("canvas");
  canvas.width = PLACEHOLDER_WIDTH;
  canvas.height = PLACEHOLDER_HEIGHT;
  const context = canvas.getContext("2d");
  if (context) {
    context.fillStyle = feature.secondaryColor;
    context.fillRect(0, 0, PLACEHOLDER_WIDTH, PLACEHOLDER_HEIGHT);
    context.fillStyle = FEATURE_PRIMARY_COLOR;
    context.font = PLACEHOLDER_FONT;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(feature.tag, PLACEHOLDER_WIDTH / 2, PLACEHOLDER_HEIGHT / 2, PLACEHOLDER_WIDTH * 0.9);
  }
  return new THREE.CanvasTexture(canvas);
};

// The real screenshots, one webp per slide in /public/app-screens.
export const appScreenshots: ScreenSource = (feature) =>
  new THREE.TextureLoader().loadAsync(`/app-screens/${feature.tag.toLowerCase()}.webp`);

function createScreenOffTexture(): THREE.DataTexture {
  const texture = new THREE.DataTexture(new Uint8Array(SCREEN_OFF_RGB), 1, 1);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function prepareTexture(texture: THREE.Texture, deps: ScreenDeps): void {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.anisotropy = Math.min(deps.renderer.capabilities.getMaxAnisotropy(), deps.profile.maxAnisotropy);
  // Upload now, so the first frame that shows it does not stall.
  deps.renderer.initTexture(texture);
}

// Resolves to the prepared texture, or null if it failed or the scene was torn down first.
async function loadScreen(load: Promise<THREE.Texture>, deps: ScreenDeps): Promise<THREE.Texture | null> {
  try {
    const texture = await load;
    if (deps.signal.aborted) {
      texture.dispose();
      return null;
    }
    prepareTexture(texture, deps);
    return texture;
  } catch (error) {
    console.warn("Phone screen failed to load; keeping it off", error);
    return null;
  }
}

// One unlit material per slide, so no light or room reflection ever glints on it; each starts "off" and swaps in its
// texture when loaded. Every swap reuses the same map slot, so it needs no shader recompile.
export function createScreenMaterials(source: ScreenSource, deps: ScreenDeps, overrideUrls: readonly string[] = []): ScreenMaterials {
  const screenOff = createScreenOffTexture();
  const own: THREE.Texture[] = FEATURES.map(() => screenOff);
  const overrides: (THREE.Texture | null)[] = overrideUrls.map(() => null);
  let overrideIndex: number | null = null;
  const materials = FEATURES.map(
    () => new THREE.MeshBasicMaterial({ color: new THREE.Color().setScalar(SCREEN_BRIGHTNESS), map: screenOff, toneMapped: false }),
  );
  const apply = () => {
    const override = overrideIndex === null ? null : overrides[overrideIndex];
    materials.forEach((material, slide) => (material.map = override ?? own[slide]));
  };
  const loaded = Promise.all([
    ...FEATURES.map(async (feature, slide) => {
      const texture = await loadScreen(source(feature), deps);
      if (texture) own[slide] = texture;
      apply();
      return texture;
    }),
    ...overrideUrls.map(async (url, index) => {
      const texture = await loadScreen(new THREE.TextureLoader().loadAsync(url), deps);
      overrides[index] = texture;
      apply();
      return texture;
    }),
  ]);
  const showOverride = (index: number | null) => {
    overrideIndex = index;
    apply();
  };
  const dispose = () => {
    materials.forEach((material) => material.dispose());
    screenOff.dispose();
    void loaded.then((textures) => textures.forEach((texture) => texture?.dispose()));
  };
  return { materials, showOverride, dispose };
}
