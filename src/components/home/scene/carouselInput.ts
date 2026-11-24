import type Lenis from "lenis";
import * as THREE from "three";

import type { CarouselStore } from "../carousel";
import type { CarouselRig } from "./carouselRig";
import { damp } from "./numeric";

const AXIS_LOCK_PX = 6;
// The same finger travel moves one slide at every width; release lands on the nearest slide, no fling.
const DRAG_PX_PER_SLIDE = 175;
const POINTER_RATE = 8;

export type CarouselInputDeps = {
  canvas: HTMLCanvasElement;
  camera: THREE.Camera;
  rig: CarouselRig;
  carousel: CarouselStore;
  lenis: Lenis;
  // Live scene state the input asks for on every event.
  scene: { dragEnabled: () => boolean; inHero: () => boolean; dragSpeed: () => number; leaveHero: () => void };
};

type Drag = { id: number; startX: number; startY: number; lastX: number; axis: "none" | "horizontal" | "vertical" };

// Pointer parallax, horizontal drag and slot clicks on the scene canvas.
export class CarouselInput {
  // Smoothed pointer, -1..1 on both axes.
  readonly pointer = { x: 0, y: 0 };
  private readonly rawPointer = { x: 0, y: 0 };
  private readonly raycaster = new THREE.Raycaster();
  private drag: Drag | null = null;
  private suppressClick = false;

  constructor(private readonly deps: CarouselInputDeps) {}

  bind(signal: AbortSignal): void {
    const { canvas } = this.deps;
    // Vertical swipes stay with the page; horizontal ones reach the carousel.
    canvas.style.touchAction = "pan-y";
    window.addEventListener("pointermove", (event) => this.trackPointer(event), { signal });
    canvas.addEventListener("pointerdown", (event) => this.startDrag(event), { signal });
    canvas.addEventListener("pointermove", (event) => this.moveDrag(event), { signal });
    canvas.addEventListener("pointerup", (event) => this.endDrag(event), { signal });
    canvas.addEventListener("pointercancel", (event) => this.endDrag(event), { signal });
    canvas.addEventListener("click", (event) => this.onClick(event), { signal });
  }

  update(seconds: number): void {
    this.pointer.x = damp(this.pointer.x, this.rawPointer.x, POINTER_RATE, seconds);
    this.pointer.y = damp(this.pointer.y, this.rawPointer.y, POINTER_RATE, seconds);
  }

  private trackPointer(event: PointerEvent): void {
    this.rawPointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.rawPointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    if (event.target === this.deps.canvas && !this.drag) this.updateCursor(event);
  }

  private startDrag(event: PointerEvent): void {
    if (!event.isPrimary || event.button !== 0 || !this.deps.scene.dragEnabled()) return;
    this.drag = { id: event.pointerId, startX: event.clientX, startY: event.clientY, lastX: event.clientX, axis: "none" };
    this.suppressClick = false;
  }

  private moveDrag(event: PointerEvent): void {
    const drag = this.drag;
    if (!drag || event.pointerId !== drag.id) return;
    if (drag.axis === "none") this.lockAxis(drag, event);
    if (drag.axis !== "horizontal") return;
    this.deps.carousel.drag((-(event.clientX - drag.lastX) / DRAG_PX_PER_SLIDE) * this.deps.scene.dragSpeed());
    drag.lastX = event.clientX;
  }

  private lockAxis(drag: Drag, event: PointerEvent): void {
    const dx = Math.abs(event.clientX - drag.startX);
    const dy = Math.abs(event.clientY - drag.startY);
    if (Math.max(dx, dy) <= AXIS_LOCK_PX) return;
    drag.axis = dx > dy ? "horizontal" : "vertical";
    if (drag.axis === "vertical") {
      this.drag = null;
      return;
    }
    this.deps.canvas.setPointerCapture(drag.id);
    this.deps.canvas.style.cursor = "grabbing";
    this.deps.lenis.stop();
  }

  private endDrag(event: PointerEvent): void {
    const drag = this.drag;
    if (!drag || event.pointerId !== drag.id) return;
    this.drag = null;
    if (drag.axis !== "horizontal") return;
    this.suppressClick = true;
    this.deps.carousel.release();
    this.deps.lenis.start();
    this.updateCursor(event);
  }

  // A side shuttle turns the carousel to it; the centre one glides on to the next stage.
  private onClick(event: MouseEvent): void {
    if (this.suppressClick) {
      this.suppressClick = false;
      return;
    }
    const offset = this.offsetUnder(event);
    if (offset === null) return;
    if (offset === 0) this.deps.scene.leaveHero();
    else this.deps.carousel.shift(offset);
  }

  private offsetUnder(event: MouseEvent): number | null {
    if (!this.deps.scene.inHero()) return null;
    const box = this.deps.canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2(((event.clientX - box.left) / box.width) * 2 - 1, -((event.clientY - box.top) / box.height) * 2 + 1);
    this.raycaster.setFromCamera(ndc, this.deps.camera);
    return this.deps.rig.offsetUnder(this.raycaster, this.deps.carousel.position);
  }

  private updateCursor(event: MouseEvent): void {
    const { canvas, scene } = this.deps;
    if (!scene.dragEnabled()) canvas.style.cursor = "";
    else canvas.style.cursor = this.offsetUnder(event) === null ? "grab" : "pointer";
  }
}
