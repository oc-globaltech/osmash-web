import * as THREE from "three";

import { FEATURE_PRIMARY_COLOR, FEATURES, type Feature } from "@/components/home/features";
import type { DeviceProfile } from "../deviceProfile";
import type { MaterialFactory } from "../materials";

// Under 1 so the app's white stays below the clipping guard.
const SCREEN_BRIGHTNESS = 0.9;
const SCREEN_ROUGHNESS = 0.12;
// Low: the glass reflection is the material's own specular, kept faint so it never reads as glow.
const SCREEN_ENV_INTENSITY = 0.5;
const SCREEN_OFF_RGB = [0x0b, 0x0f, 0x14, 0xff];
const PLACEHOLDER_HEIGHT = 1280;
const PLACEHOLDER_WIDTH = 590;
const PLACEHOLDER_FONT = "700 110px system-ui, sans-serif";

// Loads the texture shown on one slide's screen; the caller owns and disposes it.
export type ScreenSource = (feature: Feature) => Promise<THREE.Texture>;

export type ScreenMaterials = {
  materials: THREE.MeshStandardMaterial[];
  dispose: () => void;
};

type ScreenDeps = { materials: MaterialFactory; renderer: THREE.WebGLRenderer; profile: DeviceProfile; signal: AbortSignal };

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

// Same map slot before and after, so the swap needs no shader recompile.
async function swapInScreen(material: THREE.MeshStandardMaterial, load: Promise<THREE.Texture>, deps: ScreenDeps): Promise<THREE.Texture | null> {
  try {
    const texture = await load;
    if (deps.signal.aborted) {
      texture.dispose();
      return null;
    }
    prepareTexture(texture, deps);
    material.emissiveMap = texture;
    return texture;
  } catch (error) {
    console.warn("Phone screen failed to load; keeping it off", error);
    return null;
  }
}

// One emissive, unlit-looking material per slide; each starts "off" and swaps in its texture when loaded.
export function createScreenMaterials(source: ScreenSource, deps: ScreenDeps): ScreenMaterials {
  const screenOff = createScreenOffTexture();
  const materials = FEATURES.map(() =>
    deps.materials.make({
      color: 0x000000,
      roughness: SCREEN_ROUGHNESS,
      metalness: 0,
      emissive: 0xffffff,
      emissiveIntensity: SCREEN_BRIGHTNESS,
      emissiveMap: screenOff,
      envMapIntensity: SCREEN_ENV_INTENSITY,
      toneMapped: false,
    }),
  );
  const loaded = Promise.all(FEATURES.map((feature, slide) => swapInScreen(materials[slide], source(feature), deps)));
  const dispose = () => {
    screenOff.dispose();
    void loaded.then((textures) => textures.forEach((texture) => texture?.dispose()));
  };
  return { materials, dispose };
}
