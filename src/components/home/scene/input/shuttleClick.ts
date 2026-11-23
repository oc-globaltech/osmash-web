import * as THREE from "three";

import { CAROUSEL_SPACING, SLIDE_COUNT, type CarouselStore } from "@/components/home/carouselStore";
import { easeOutCubic } from "../math";
import type { HomeScroll } from "../scroll";
import type { Sections } from "../sections";
import type { SwipeState } from "./swipe";
import { pageDuration } from "./wheelPaging";

export type ShuttleClickDeps = {
  camera: THREE.Camera;
  canvas: HTMLCanvasElement;
  shuttles: THREE.Group[];
  carousel: CarouselStore;
  scroll: HomeScroll;
  sections: Sections;
  swipe: SwipeState;
};

// Shuttles under the pointer, as indexes into `deps.shuttles`.
function shuttlesAt(deps: ShuttleClickDeps, event: MouseEvent, raycaster: THREE.Raycaster): number[] {
  const ndc = new THREE.Vector2((event.clientX / deps.canvas.clientWidth) * 2 - 1, -(event.clientY / deps.canvas.clientHeight) * 2 + 1);
  raycaster.setFromCamera(ndc, deps.camera);
  return deps.shuttles.flatMap((shuttle, i) => (raycaster.intersectObject(shuttle).length > 0 ? [i] : []));
}

// Click a side shuttle to step the carousel; click the centre one to scroll on to the next section.
function onClick(deps: ShuttleClickDeps, event: MouseEvent, raycaster: THREE.Raycaster): void {
  if (deps.swipe.axis !== "none" || deps.scroll.position > deps.sections.second.top) return;
  shuttlesAt(deps, event, raycaster).forEach((i) => {
    const offset = Math.round(deps.shuttles[i].position.x / CAROUSEL_SPACING);
    if (offset > 0) deps.carousel.next();
    if (offset < 0) deps.carousel.previous();
    if (offset === 0) deps.scroll.to(deps.sections.second.top, { duration: pageDuration(0), easing: easeOutCubic });
  });
}

// Grab cursor over the hero, pointer over the active shuttle, grabbing while dragging.
function onCursorMove(deps: ShuttleClickDeps, event: MouseEvent, raycaster: THREE.Raycaster): void {
  if (deps.scroll.position >= deps.sections.second.top) {
    document.body.style.cursor = "";
    return;
  }
  if (deps.swipe.holding && deps.swipe.axis === "horizontal") {
    document.body.style.cursor = "grabbing";
    return;
  }
  const overActive = shuttlesAt(deps, event, raycaster).some((i) => i % SLIDE_COUNT === deps.carousel.index);
  document.body.style.cursor = overActive ? "pointer" : "grab";
}

export function bindShuttleClick(deps: ShuttleClickDeps, signal: AbortSignal): void {
  const raycaster = new THREE.Raycaster();
  const onRelease = () => {
    if (deps.scroll.position < deps.sections.second.top) document.body.style.cursor = "grab";
  };
  window.addEventListener("click", (event) => onClick(deps, event, raycaster), { signal });
  window.addEventListener("mousemove", (event) => onCursorMove(deps, event, raycaster), { signal });
  window.addEventListener("mouseup", onRelease, { signal });
  window.addEventListener("touchend", onRelease, { signal });
}
