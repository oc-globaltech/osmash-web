import type Lenis from "lenis";

// Movement past this many pixels decides whether a drag is horizontal (carousel) or vertical (page).
const AXIS_LOCK_DISTANCE = 2;
// Release flings the carousel by the last drag delta times this.
const RELEASE_FLING = 8;

export type SwipeAxis = "none" | "horizontal" | "vertical";

export type SwipeState = {
  // Driven by the section timeline: dragging only works on sections that show the carousel.
  active: boolean;
  holding: boolean;
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
  deltaX: number;
  axis: SwipeAxis;
};

export const createSwipeState = (): SwipeState => ({
  active: true,
  holding: false,
  startX: 0,
  startY: 0,
  lastX: 0,
  lastY: 0,
  deltaX: 0,
  axis: "none",
});

export const pointOf = (event: MouseEvent | TouchEvent): { x: number; y: number } =>
  "touches" in event ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : { x: event.clientX, y: event.clientY };

function startDrag(swipe: SwipeState, event: MouseEvent | TouchEvent): void {
  if (!swipe.active) return;
  const { x, y } = pointOf(event);
  Object.assign(swipe, { holding: true, deltaX: 0, startX: x, lastX: x, startY: y, lastY: y });
}

function moveDrag(swipe: SwipeState, lenis: Lenis, event: MouseEvent | TouchEvent): void {
  if (!swipe.active || !swipe.holding) return;
  const { x, y } = pointOf(event);
  const deltaX = x - swipe.lastX;
  const deltaY = y - swipe.lastY;
  const moved = Math.abs(swipe.startX - x) > AXIS_LOCK_DISTANCE || Math.abs(swipe.startY - y) > AXIS_LOCK_DISTANCE;
  if (swipe.axis === "none" && moved) swipe.axis = Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical";
  if (swipe.axis !== "horizontal") return;
  swipe.lastX = x;
  swipe.deltaX += deltaX;
  lenis.stop();
  if ("touches" in event) document.body.style.overflow = "hidden";
}

// Horizontal drags on the canvas spin the carousel and hold the page still meanwhile.
export function bindSwipe(canvas: HTMLCanvasElement, deps: { swipe: SwipeState; lenis: Lenis }, signal: AbortSignal): void {
  const { swipe, lenis } = deps;
  const onStart = (event: MouseEvent | TouchEvent) => startDrag(swipe, event);
  const onMove = (event: MouseEvent | TouchEvent) => moveDrag(swipe, lenis, event);
  const onEnd = () => {
    if (!swipe.holding) return;
    // Deferred so the click that ends a drag still sees the drag axis and is ignored.
    setTimeout(() => {
      swipe.deltaX *= RELEASE_FLING;
      swipe.holding = false;
      swipe.axis = "none";
      lenis.start();
      document.body.style.overflow = "";
    });
  };
  canvas.addEventListener("mousedown", onStart, { signal });
  canvas.addEventListener("touchstart", onStart, { signal });
  window.addEventListener("mousemove", onMove, { signal });
  window.addEventListener("touchmove", onMove, { signal });
  window.addEventListener("mouseup", onEnd, { signal });
  window.addEventListener("touchend", onEnd, { signal });
}
