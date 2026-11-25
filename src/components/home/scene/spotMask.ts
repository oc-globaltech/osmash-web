import * as THREE from "three";

const SIZE = 256;
// A soft crescent hanging under the centre, in fractions of the mask (y down, like the image it replaces).
const ARC_CENTRE_X = 0.5;
const ARC_CENTRE_Y = 0.206;
const ARC_RADIUS = 0.439;
const ARC_SIGMA = 0.053;
// The crescent fades out and thins towards its tips, gone at this angle either side of straight down.
const ARC_END_ANGLE = (72 * Math.PI) / 180;
const FADE_POWER = 4;

// Brightness 0..1 of one mask pixel, from its offset to the arc centre.
function crescentAt(dx: number, dy: number): number {
  const fromDown = Math.abs(Math.atan2(dx, dy));
  const reach = Math.max(0, 1 - (fromDown / ARC_END_ANGLE) ** FADE_POWER);
  if (reach === 0) return 0;
  const sigma = ARC_SIGMA * reach * reach;
  const offRing = Math.hypot(dx, dy) - ARC_RADIUS;
  return reach * Math.exp(-(offRing * offRing) / (2 * sigma * sigma));
}

function drawCrescent(context: CanvasRenderingContext2D): void {
  const image = context.createImageData(SIZE, SIZE);
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const level = Math.round(255 * crescentAt((x + 0.5) / SIZE - ARC_CENTRE_X, (y + 0.5) / SIZE - ARC_CENTRE_Y));
      const index = (y * SIZE + x) * 4;
      image.data.fill(level, index, index + 3);
      image.data[index + 3] = 255;
    }
  }
  context.putImageData(image, 0, 0);
}

// Light cookie for the top spot, drawn per pixel so it needs no image download.
export function createSpotMask(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = SIZE;
  canvas.height = SIZE;
  const context = canvas.getContext("2d");
  if (context) drawCrescent(context);
  return new THREE.CanvasTexture(canvas);
}
