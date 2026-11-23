export type PointerState = { x: number; y: number; smoothX: number; smoothY: number };

// Last mouse position plus a smoothed copy the frame loop eases toward it; starts at the viewport centre.
export function trackPointer(signal: AbortSignal): PointerState {
  const pointer = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    smoothX: window.innerWidth / 2,
    smoothY: window.innerHeight / 2,
  };
  window.addEventListener(
    "mousemove",
    (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    },
    { signal },
  );
  return pointer;
}
