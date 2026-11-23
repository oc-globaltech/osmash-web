import * as THREE from "three";

import type { MaterialFactory } from "./materials";

type ProfilePoint = [radius: number, y: number];

const RADIAL_SEGMENTS = 64;
// Every corner is rounded: the thin fillets are what catch the key light as soft rings on the tube.
const FILLET_RADIUS = 0.02;
const FILLET_STEPS = 4;
// A fillet never eats more than this share of either edge it joins.
const FILLET_MAX_EDGE_SHARE = 0.45;
const MIN_SETBACK = 1e-3;

// A generic shuttle tube: wide enough for the shuttle's skirt, long enough to run off screen.
const TUBE_RADIUS = 1.6;
const TUBE_LENGTH = 10.6;
// Ends sit where the old podium faces were, so the camera keyframes still frame them.
const LOWER_TOP = -3.375;
const UPPER_BOTTOM = 3.42;
// The lower tube is open: a rolled lip on the rim and a short dark inside.
const LIP = { overhang: 0.035, height: 0.07 };
const WALL = 0.05;
const INSIDE_DEPTH = 1.2;
// The upper tube is capped: a slightly wider ring with a shallow recess on its face.
const CAP = { radius: 1.68, height: 0.5, recessInset: 0.14, recessDepth: 0.02 };
// A faint pressed seam around the body, a fixed distance from the visible end.
const SEAM = { fromEnd: 1.6, halfWidth: 0.015, depth: 0.012 };
// The label stripe: a thin band just proud of the body.
const STRIPE = { fromEnd: 0.9, height: 0.16, proud: 0.003 };

// Satin paper-tube navy, a step lighter than the #011D41 page so the tube still reads against it.
const TUBE_COLOR = 0x2a3d5e;
const TUBE_ROUGHNESS = 0.6;
const TUBE_ENV_INTENSITY = 1;
const STRIPE_COLOR = 0xfc7301;
const STRIPE_ROUGHNESS = 0.55;

const seamGroove = (y: number): ProfilePoint[] => [
  [TUBE_RADIUS, y - SEAM.halfWidth],
  [TUBE_RADIUS - SEAM.depth, y],
  [TUBE_RADIUS, y + SEAM.halfWidth],
];

// Bottom-up from the axis: closed base off screen, seam, rolled lip, then down the inside wall.
const LOWER_RIM = LOWER_TOP - LIP.height;
const LOWER_PROFILE: ProfilePoint[] = [
  [0, LOWER_TOP - TUBE_LENGTH],
  [TUBE_RADIUS, LOWER_TOP - TUBE_LENGTH],
  ...seamGroove(LOWER_TOP - SEAM.fromEnd),
  [TUBE_RADIUS, LOWER_RIM],
  [TUBE_RADIUS + LIP.overhang, LOWER_RIM + LIP.height / 3],
  [TUBE_RADIUS + LIP.overhang, LOWER_TOP],
  [TUBE_RADIUS - WALL, LOWER_TOP],
  [TUBE_RADIUS - WALL, LOWER_TOP - INSIDE_DEPTH],
  [0, LOWER_TOP - INSIDE_DEPTH],
];

// Bottom-up from the axis: recessed cap face, cap ring, seam, then the body up off screen.
const CAP_TOP = UPPER_BOTTOM + CAP.height;
const UPPER_PROFILE: ProfilePoint[] = [
  [0, UPPER_BOTTOM + CAP.recessDepth],
  [CAP.radius - CAP.recessInset, UPPER_BOTTOM + CAP.recessDepth],
  [CAP.radius - CAP.recessInset + CAP.recessDepth * 2, UPPER_BOTTOM],
  [CAP.radius, UPPER_BOTTOM],
  [CAP.radius, CAP_TOP],
  [TUBE_RADIUS, CAP_TOP],
  ...seamGroove(UPPER_BOTTOM + SEAM.fromEnd),
  [TUBE_RADIUS, UPPER_BOTTOM + TUBE_LENGTH],
  [0, UPPER_BOTTOM + TUBE_LENGTH],
];

// Replaces a corner with a quadratic curve from one edge to the other, tangent to both.
function filletCorner(previous: THREE.Vector2, corner: THREE.Vector2, next: THREE.Vector2): THREE.Vector2[] {
  const toPrevious = previous.clone().sub(corner);
  const toNext = next.clone().sub(corner);
  const halfAngle = toPrevious.angleTo(toNext) / 2;
  const maxSetback = Math.min(toPrevious.length(), toNext.length()) * FILLET_MAX_EDGE_SHARE;
  const setback = Math.min(FILLET_RADIUS / Math.tan(halfAngle), maxSetback);
  // A nearly straight corner needs no fillet; its zero-length segments would break the lathe normals.
  if (setback < MIN_SETBACK) return [corner];
  const start = corner.clone().add(toPrevious.setLength(setback));
  const end = corner.clone().add(toNext.setLength(setback));
  return new THREE.QuadraticBezierCurve(start, corner, end).getPoints(FILLET_STEPS);
}

function roundCorners(profile: ProfilePoint[]): THREE.Vector2[] {
  const points = profile.map(([radius, y]) => new THREE.Vector2(radius, y));
  const last = points.length - 1;
  const rounded = points.slice(1, last).flatMap((corner, index) => filletCorner(points[index], corner, points[index + 2]));
  return [points[0], ...rounded, points[last]];
}

const createTubeGeometry = (profile: ProfilePoint[]) => new THREE.LatheGeometry(roundCorners(profile), RADIAL_SEGMENTS);

function createStripeGeometry(centreY: number): THREE.CylinderGeometry {
  const radius = TUBE_RADIUS + STRIPE.proud;
  const stripe = new THREE.CylinderGeometry(radius, radius, STRIPE.height, RADIAL_SEGMENTS, 1, true);
  stripe.translate(0, centreY, 0);
  return stripe;
}

export type Podium = {
  root: THREE.Group;
  // Parts slide apart vertically as the sections scroll.
  setOffset: (offset: number) => void;
};

// Two shuttle tubes, an open one below and a capped one hanging above: root.children is [lower, upper].
export function createPodium(scene: THREE.Scene, materials: MaterialFactory): Podium {
  const tube = materials.make({ color: TUBE_COLOR, roughness: TUBE_ROUGHNESS, metalness: 0, envMapIntensity: TUBE_ENV_INTENSITY });
  const stripe = materials.make({ color: STRIPE_COLOR, roughness: STRIPE_ROUGHNESS, metalness: 0, envMapIntensity: TUBE_ENV_INTENSITY });
  const lower = new THREE.Mesh(createTubeGeometry(LOWER_PROFILE), tube);
  lower.add(new THREE.Mesh(createStripeGeometry(LOWER_TOP - STRIPE.fromEnd), stripe));
  const upper = new THREE.Mesh(createTubeGeometry(UPPER_PROFILE), tube);
  upper.add(new THREE.Mesh(createStripeGeometry(CAP_TOP + STRIPE.fromEnd), stripe));
  const root = new THREE.Group();
  root.add(lower, upper);
  scene.add(root);
  const setOffset = (offset: number) => {
    lower.position.y = -offset;
    upper.position.y = offset;
  };
  return { root, setOffset };
}
