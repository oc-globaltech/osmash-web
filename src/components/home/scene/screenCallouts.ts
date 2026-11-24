import * as THREE from "three";

import { FEATURES } from "@/components/home/features";
import { SCREEN_FACE } from "./phone/geometry";
import type { Phone } from "./phone/phones";

// Labels sit in one column right of the screen; rows closer than this push apart.
const LABEL_GAP_PX = 64;
const MIN_ROW_PX = 46;
// The line stops short of the label so it never touches the text.
const LINE_END_GAP_PX = 12;
const DESKTOP_MIN_WIDTH = 1024;

type Point = { x: number; y: number };

const scratch = new THREE.Vector3();

// A spot on the screenshot (u, v from its top-left) in viewport pixels.
function project(phone: Phone, camera: THREE.Camera, u: number, v: number): Point {
  scratch.set((u - 0.5) * SCREEN_FACE.width, (0.5 - v) * SCREEN_FACE.height, SCREEN_FACE.z);
  phone.pivot.localToWorld(scratch).project(camera);
  return { x: ((scratch.x + 1) / 2) * window.innerWidth, y: ((1 - scratch.y) / 2) * window.innerHeight };
}

// Rows keep their order top to bottom but never sit closer than MIN_ROW_PX.
function spreadRows(ys: number[]): number[] {
  const order = ys.map((y, index) => ({ y, index })).sort((a, b) => a.y - b.y);
  order.forEach((row, rank) => {
    if (rank > 0) row.y = Math.max(row.y, order[rank - 1].y + MIN_ROW_PX);
  });
  const spread = [...ys];
  order.forEach(({ y, index }) => (spread[index] = y));
  return spread;
}

// Pins the active slide's callouts to its phone screen; the close-up section shows and hides the layer.
export function updateCallouts(layer: HTMLElement, phone: Phone | undefined, camera: THREE.Camera, slide: number): void {
  if (layer.dataset.active !== "true" || !phone || window.innerWidth < DESKTOP_MIN_WIDTH) return;
  const group = layer.querySelector<HTMLElement>(`[data-callout-group="${slide}"]`);
  if (!group) return;
  const callouts = FEATURES[slide].callouts;
  const anchors = callouts.map(({ u, v }) => project(phone, camera, u, v));
  const screenRight = Math.max(...callouts.map(({ v }) => project(phone, camera, 1, v).x));
  const labelX = screenRight + LABEL_GAP_PX;
  const labelYs = spreadRows(anchors.map((anchor) => anchor.y));
  const labels = group.querySelectorAll<HTMLElement>('[data-part="closeup-callout"]');
  const lines = group.querySelectorAll<SVGLineElement>("line");
  const dots = group.querySelectorAll<SVGCircleElement>("circle");
  anchors.forEach((anchor, index) => {
    labels[index]?.style.setProperty("transform", `translate(${labelX}px, ${labelYs[index]}px) translateY(-50%)`);
    lines[index]?.setAttribute("x1", String(anchor.x));
    lines[index]?.setAttribute("y1", String(anchor.y));
    lines[index]?.setAttribute("x2", String(labelX - LINE_END_GAP_PX));
    lines[index]?.setAttribute("y2", String(labelYs[index]));
    dots[index]?.setAttribute("cx", String(anchor.x));
    dots[index]?.setAttribute("cy", String(anchor.y));
  });
}
