import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

// World units: the long axis is +y, the screen faces +z. The height matches the shuttle it takes over from.
const BODY = { width: 1.64, height: 3.4, radius: 0.24, depth: 0.13 } as const;
const BODY_BEVEL = 0.03;
const BODY_FRONT = BODY.depth / 2 + BODY_BEVEL;
const CURVE_SEGMENTS = 12;
const BEVEL_SEGMENTS = 4;
const GLASS_INSET = 0.035;
const GLASS_RADIUS = 0.21;
const SCREEN = { width: 1.5, height: 3.26, radius: 0.18 } as const;
// Stacked a hair apart in z so the coplanar front layers never z-fight.
const LAYER_GAP = 0.001;
// The screen's face in the phone's own frame, for pinning labels to points on the screenshot.
export const SCREEN_FACE = { width: SCREEN.width, height: SCREEN.height, z: BODY_FRONT + 2 * LAYER_GAP } as const;
const PUNCH_RADIUS = 0.035;
const PUNCH_SEGMENTS = 24;
const PUNCH_BELOW_TOP = 0.12;
const ISLAND = { width: 0.52, height: 0.86, radius: 0.12, depth: 0.025, margin: 0.14 } as const;
const LENS_RADIUS = 0.11;
const LENS_DEPTH = 0.02;
const LENS_SPACING = 0.4;
const LENS_SEGMENTS = 32;
const BUTTON_WIDTH = 0.04;
const BUTTON_DEPTH = 0.08;
const BUTTON_RADIUS = 0.015;
const BUTTON_SEGMENTS = 2;
// Power, then volume up and down, on the right side's upper half: [height, centre y].
const BUTTONS = [
  [0.36, 1.0],
  [0.26, 0.5],
  [0.26, 0.18],
] as const;

type RoundedRect = { width: number; height: number; radius: number };

export type PhoneGeometries = {
  body: THREE.BufferGeometry;
  glass: THREE.BufferGeometry;
  screen: THREE.BufferGeometry;
  punch: THREE.BufferGeometry;
  island: THREE.BufferGeometry;
  lenses: THREE.BufferGeometry;
  buttons: THREE.BufferGeometry;
};

function roundedRect({ width, height, radius }: RoundedRect): THREE.Shape {
  const right = width / 2 - radius;
  const top = height / 2 - radius;
  const shape = new THREE.Shape();
  shape.absarc(right, top, radius, 0, Math.PI / 2, false);
  shape.absarc(-right, top, radius, Math.PI / 2, Math.PI, false);
  shape.absarc(-right, -top, radius, Math.PI, Math.PI * 1.5, false);
  shape.absarc(right, -top, radius, Math.PI * 1.5, Math.PI * 2, false);
  return shape;
}

function createBodyGeometry(): THREE.ExtrudeGeometry {
  const body = new THREE.ExtrudeGeometry(roundedRect(BODY), {
    depth: BODY.depth,
    bevelThickness: BODY_BEVEL,
    bevelSize: BODY_BEVEL,
    bevelSegments: BEVEL_SEGMENTS,
    curveSegments: CURVE_SEGMENTS,
  });
  body.center();
  return body;
}

function createFlatGeometry(rect: RoundedRect, layer: number): THREE.ShapeGeometry {
  const flat = new THREE.ShapeGeometry(roundedRect(rect), CURVE_SEGMENTS);
  flat.translate(0, 0, BODY_FRONT + layer * LAYER_GAP);
  return flat;
}

// ShapeGeometry's UVs are its x/y positions; the screenshot needs 0..1 across the screen's bounds.
function createScreenGeometry(): THREE.ShapeGeometry {
  const screen = createFlatGeometry(SCREEN, 2);
  const uv = screen.attributes.uv;
  const position = screen.attributes.position;
  for (let i = 0; i < uv.count; i++) {
    uv.setXY(i, position.getX(i) / SCREEN.width + 0.5, position.getY(i) / SCREEN.height + 0.5);
  }
  return screen;
}

function createPunchGeometry(): THREE.CircleGeometry {
  const punch = new THREE.CircleGeometry(PUNCH_RADIUS, PUNCH_SEGMENTS);
  punch.translate(0, SCREEN.height / 2 - PUNCH_BELOW_TOP, BODY_FRONT + 3 * LAYER_GAP);
  return punch;
}

// Seen from the back, the island sits top-left, which is +x in the phone's own frame.
const islandCentre = new THREE.Vector2(
  BODY.width / 2 - ISLAND.margin - ISLAND.width / 2,
  BODY.height / 2 - ISLAND.margin - ISLAND.height / 2,
);
const ISLAND_BACK = -BODY_FRONT - ISLAND.depth;

function createIslandGeometry(): THREE.ExtrudeGeometry {
  const island = new THREE.ExtrudeGeometry(roundedRect(ISLAND), { depth: ISLAND.depth, bevelEnabled: false, curveSegments: CURVE_SEGMENTS });
  island.translate(islandCentre.x, islandCentre.y, ISLAND_BACK);
  return island;
}

function createLensesGeometry(): THREE.BufferGeometry {
  const lenses = [1, -1].map((side) => {
    const lens = new THREE.CylinderGeometry(LENS_RADIUS, LENS_RADIUS, LENS_DEPTH, LENS_SEGMENTS);
    lens.rotateX(Math.PI / 2);
    lens.translate(islandCentre.x, islandCentre.y + (side * LENS_SPACING) / 2, ISLAND_BACK);
    return lens;
  });
  const merged = mergeGeometries(lenses);
  lenses.forEach((lens) => lens.dispose());
  return merged;
}

function createButtonsGeometry(): THREE.BufferGeometry {
  const sideX = BODY.width / 2 + BODY_BEVEL;
  const buttons = BUTTONS.map(([height, y]) => {
    const button = new RoundedBoxGeometry(BUTTON_WIDTH, height, BUTTON_DEPTH, BUTTON_SEGMENTS, BUTTON_RADIUS);
    button.translate(sideX, y, 0);
    return button;
  });
  const merged = mergeGeometries(buttons);
  buttons.forEach((button) => button.dispose());
  return merged;
}

const glassRect: RoundedRect = { width: BODY.width - 2 * GLASS_INSET, height: BODY.height - 2 * GLASS_INSET, radius: GLASS_RADIUS };

// Built once and shared by every phone.
export function createPhoneGeometries(): PhoneGeometries {
  return {
    body: createBodyGeometry(),
    glass: createFlatGeometry(glassRect, 1),
    screen: createScreenGeometry(),
    punch: createPunchGeometry(),
    island: createIslandGeometry(),
    lenses: createLensesGeometry(),
    buttons: createButtonsGeometry(),
  };
}
