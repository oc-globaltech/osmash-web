import * as THREE from "three";

import type { AssetProfile as DeviceProfile } from "../device";
import { lerp } from "../numeric";

const TEXTURE_WIDTH = 512;
const TEXTURE_HEIGHT = 1024;
const TEXTURE_SEED = 1337;
const OUTLINE_STEPS = 256;
const VANE_START = 0.3;
const VANE_FULL = 0.55;
const VANE_TIP_START = 0.8;
const VANE_MAX_HALF_WIDTH = 0.46;
const RACHIS_BASE_WIDTH = 0.05;
const RACHIS_TIP_WIDTH = 0.008;
const BARBS_PER_SIDE = 40;
const BARB_RISE = 0.35;
const BARB_JITTER = 0.4;
const BARB_WIDTH = 2;
const VANE_SHADE = "#ffffff";
const BARB_SHADE = "rgba(120, 118, 110, 0.35)";
const RACHIS_SHADE = "#e4dfd2";
const ALPHA_OPAQUE = "#ffffff";
const ALPHA_CLEAR = "#000000";

type Point = { x: number; y: number };
type Barb = { from: Point; to: Point };
type HalfWidthAt = (along: number) => number;

export type FeatherTextures = {
  color: THREE.CanvasTexture;
  alpha: THREE.CanvasTexture;
  bump: THREE.CanvasTexture | null;
};

// mulberry32: seeded so the feather texture is identical on every load.
function createRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const smoothstep = (t: number): number => t * t * (3 - 2 * t);

// Half-width of the vane as a fraction of texture width; `along` runs quill base (0) to tip (1).
const vaneHalfWidth: HalfWidthAt = (along) => {
  if (along < VANE_START) return 0;
  if (along < VANE_FULL) return VANE_MAX_HALF_WIDTH * smoothstep((along - VANE_START) / (VANE_FULL - VANE_START));
  if (along < VANE_TIP_START) return VANE_MAX_HALF_WIDTH;
  const tip = (along - VANE_TIP_START) / (1 - VANE_TIP_START);
  return VANE_MAX_HALF_WIDTH * Math.sqrt(Math.max(0, 1 - tip * tip));
};

const rachisHalfWidth: HalfWidthAt = (along) => lerp(RACHIS_BASE_WIDTH, RACHIS_TIP_WIDTH, along) / 2;

// Canvas y grows downward and CanvasTexture flips it, so the tip is drawn at the top.
const featherPoint = (across: number, along: number): Point => ({
  x: (0.5 + across) * TEXTURE_WIDTH,
  y: (1 - along) * TEXTURE_HEIGHT,
});

function fillOutline(context: CanvasRenderingContext2D, halfWidthAt: HalfWidthAt): void {
  const steps = Array.from({ length: OUTLINE_STEPS + 1 }, (_, i) => i / OUTLINE_STEPS);
  const outline = [
    ...steps.map((along) => featherPoint(-halfWidthAt(along), along)),
    ...[...steps].reverse().map((along) => featherPoint(halfWidthAt(along), along)),
  ];
  context.beginPath();
  outline.forEach(({ x, y }) => context.lineTo(x, y));
  context.closePath();
  context.fill();
}

function createBarbs(random: () => number): Barb[] {
  return [-1, 1].flatMap((side) =>
    Array.from({ length: BARBS_PER_SIDE }, (_, i) => {
      const slot = (i + 0.5 + (random() - 0.5) * BARB_JITTER) / BARBS_PER_SIDE;
      const along = lerp(VANE_START, 1, slot);
      const halfWidth = vaneHalfWidth(along);
      return { from: featherPoint(0, along), to: featherPoint(side * halfWidth, along + halfWidth * BARB_RISE) };
    }),
  );
}

function drawDetail(context: CanvasRenderingContext2D, barbs: Barb[]): void {
  context.fillStyle = VANE_SHADE;
  context.fillRect(0, 0, TEXTURE_WIDTH, TEXTURE_HEIGHT);
  context.strokeStyle = BARB_SHADE;
  context.lineWidth = BARB_WIDTH;
  barbs.forEach(({ from, to }) => {
    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.stroke();
  });
  context.fillStyle = RACHIS_SHADE;
  fillOutline(context, rachisHalfWidth);
}

function drawAlpha(context: CanvasRenderingContext2D): void {
  context.fillStyle = ALPHA_CLEAR;
  context.fillRect(0, 0, TEXTURE_WIDTH, TEXTURE_HEIGHT);
  context.fillStyle = ALPHA_OPAQUE;
  fillOutline(context, vaneHalfWidth);
  fillOutline(context, rachisHalfWidth);
}

function paintTexture(draw: (context: CanvasRenderingContext2D) => void, anisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = TEXTURE_WIDTH;
  canvas.height = TEXTURE_HEIGHT;
  const context = canvas.getContext("2d");
  if (context) draw(context);
  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = anisotropy;
  return texture;
}

// Opaque colour map plus a separate alpha map: canvas alpha would bleed black into the cut-out edges.
// Colour and bump share a drawing but not a texture: the colour map is decoded as sRGB, the bump map is not.
export function createFeatherTextures(renderer: THREE.WebGLRenderer, profile: DeviceProfile): FeatherTextures {
  const anisotropy = renderer.capabilities.getMaxAnisotropy();
  const barbs = createBarbs(createRandom(TEXTURE_SEED));
  const color = paintTexture((context) => drawDetail(context, barbs), anisotropy);
  color.colorSpace = THREE.SRGBColorSpace;
  const bump = profile.featherBump ? paintTexture((context) => drawDetail(context, barbs), anisotropy) : null;
  const alpha = paintTexture(drawAlpha, anisotropy);
  return { color, alpha, bump };
}
