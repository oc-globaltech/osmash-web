import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

import { lerp } from "../numeric";

const SHUTTLE_LENGTH = 3.4;
const SHUTTLE_TOP = SHUTTLE_LENGTH / 2;
const CORK_LENGTH = 0.75;
const CORK_RADIUS = 0.425;
const CORK_BASE = SHUTTLE_TOP - CORK_LENGTH;
const CORK_DOME_CENTRE = SHUTTLE_TOP - CORK_RADIUS;
const CORK_DOME_STEPS = 12;
const BAND_HEIGHT = 0.12;
const BAND_RADIUS = 0.445;
const SKIRT_LENGTH = SHUTTLE_LENGTH - CORK_LENGTH;
const SKIRT_BASE_RADIUS = 0.42;
const SKIRT_RIM_RADIUS = 1.15;
// Thick enough to read as wound thread rather than a lit tube.
const THREAD_RADIUS = 0.03;
const THREAD_TUBE_SEGMENTS = 8;
const ROUND_SEGMENTS = 48;
const FEATHER_COUNT = 16;
const FEATHER_SLOT_ANGLE = (Math.PI * 2) / FEATHER_COUNT;
const FEATHER_SEGMENTS_ACROSS = 4;
const FEATHER_SEGMENTS_ALONG = 8;

const skirtRadiusAt = (along: number): number => lerp(SKIRT_BASE_RADIUS, SKIRT_RIM_RADIUS, along);
const skirtHeightAt = (along: number): number => CORK_BASE - along * SKIRT_LENGTH;

export function createCorkGeometry(): THREE.LatheGeometry {
  const dome = Array.from({ length: CORK_DOME_STEPS + 1 }, (_, i) => {
    const angle = (i / CORK_DOME_STEPS) * (Math.PI / 2);
    return new THREE.Vector2(CORK_RADIUS * Math.cos(angle), CORK_DOME_CENTRE + CORK_RADIUS * Math.sin(angle));
  });
  const profile = [new THREE.Vector2(0, CORK_BASE), new THREE.Vector2(CORK_RADIUS, CORK_BASE), ...dome];
  return new THREE.LatheGeometry(profile, ROUND_SEGMENTS);
}

export function createBandGeometry(): THREE.CylinderGeometry {
  const band = new THREE.CylinderGeometry(BAND_RADIUS, BAND_RADIUS, BAND_HEIGHT, ROUND_SEGMENTS, 1, true);
  band.translate(0, CORK_BASE, 0);
  return band;
}

// A ring around the skirt `along` its length (0 at the cork, 1 at the rim).
export function createThreadGeometry(along: number): THREE.TorusGeometry {
  const thread = new THREE.TorusGeometry(skirtRadiusAt(along) + THREAD_RADIUS, THREAD_RADIUS, THREAD_TUBE_SEGMENTS, ROUND_SEGMENTS);
  thread.rotateX(Math.PI / 2);
  thread.translate(0, skirtHeightAt(along), 0);
  return thread;
}

// A plane bent onto the skirt cone: u spans one feather slot, v runs quill (0) to tip (1).
function createFeatherGeometry(): THREE.PlaneGeometry {
  const feather = new THREE.PlaneGeometry(1, 1, FEATHER_SEGMENTS_ACROSS, FEATHER_SEGMENTS_ALONG);
  const position = feather.attributes.position;
  for (let i = 0; i < position.count; i++) {
    const along = position.getY(i) + 0.5;
    // Mirrored angle keeps the winding facing outward once y is flipped to run down the skirt.
    const angle = -position.getX(i) * FEATHER_SLOT_ANGLE;
    const radius = skirtRadiusAt(along);
    position.setXYZ(i, radius * Math.sin(angle), skirtHeightAt(along), radius * Math.cos(angle));
  }
  feather.computeVertexNormals();
  return feather;
}

export function createSkirtGeometry(): THREE.BufferGeometry {
  const feather = createFeatherGeometry();
  const feathers = Array.from({ length: FEATHER_COUNT }, (_, i) => feather.clone().rotateY(i * FEATHER_SLOT_ANGLE));
  const skirt = mergeGeometries(feathers);
  [feather, ...feathers].forEach((part) => part.dispose());
  return skirt;
}
