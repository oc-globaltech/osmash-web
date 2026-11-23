import Lenis, { type ScrollToOptions } from "lenis";

import { debounce } from "./math";
import { isMobileWidth } from "./deviceProfile";
import type { Sections } from "./sections";

// Lands just above a section so its scroll trigger has already fired.
const SECTION_LANDING_OFFSET = 10;
const SNAP_AFTER_SCROLL_MS = 250;
const SNAP_AFTER_SCROLLEND_MS = 50;

// Smooth scroll over the page; it ends at the footer.
export class HomeScroll {
  readonly lenis = new Lenis({ autoRaf: false, syncTouch: true });
  position = 0;

  constructor() {
    this.lenis.on("scroll", () => {
      this.position = this.lenis.animatedScroll;
    });
  }

  range(): number {
    return this.lenis.dimensions.scrollHeight - this.lenis.dimensions.height;
  }

  to(position: number, options?: ScrollToOptions): void {
    this.lenis.scrollTo(position === 0 ? position : position - SECTION_LANDING_OFFSET, options);
  }
}

// Desktop only: settle onto the hero or the next section once scrolling stops.
export function bindScrollSnap(scroll: HomeScroll, sections: Sections, signal: AbortSignal): void {
  const snap = () => {
    if (signal.aborted || isMobileWidth()) return;
    const found = sections.closestTo(scroll.position);
    if (found >= 0 && sections.items[found].snap) scroll.to(sections.items[found].top);
    else if (Math.abs(scroll.position - sections.first.top) < sections.first.height / 2) scroll.to(sections.first.top);
  };
  window.addEventListener("scroll", debounce(snap, SNAP_AFTER_SCROLL_MS), { signal });
  window.addEventListener("scrollend", debounce(snap, SNAP_AFTER_SCROLLEND_MS), { signal });
}
