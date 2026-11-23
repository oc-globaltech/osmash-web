import Lenis, { type ScrollToOptions } from "lenis";

import { debounce, wrap } from "./math";
import { isMobileWidth } from "./deviceProfile";
import type { Sections } from "./sections";

// Lands just above a section so its scroll trigger has already fired.
const SECTION_LANDING_OFFSET = 10;
const SNAP_AFTER_SCROLL_MS = 250;
const SNAP_AFTER_SCROLLEND_MS = 50;

// Lenis keeps the in-flight animation target private; the frame clamp has to zero it too.
type LenisInternals = { animate?: { to: number } };

// Infinite smooth scroll over the page; `position` is wrapped into one page length.
export class HomeScroll {
  readonly lenis = new Lenis({ autoRaf: false, infinite: true, syncTouch: true });
  position = 0;

  constructor() {
    this.lenis.on("scroll", () => {
      this.position = wrap(this.lenis.animatedScroll, 0, this.range());
    });
  }

  range(): number {
    return this.lenis.dimensions.scrollHeight - this.lenis.dimensions.height;
  }

  to(position: number, options?: ScrollToOptions): void {
    this.lenis.scrollTo(position === 0 ? position : position - SECTION_LANDING_OFFSET, options);
  }

  // Shortest distance to `target`, either directly or across the wrap seam.
  distanceTo(target: number, position = this.position): number {
    const viaSeam = position - this.range();
    return Math.min(Math.abs(position - target), Math.abs(viaSeam - target));
  }

  // Keeps the infinite scroll from wrapping backwards past the top.
  clampAboveTop(): void {
    if (this.lenis.targetScroll >= 0) return;
    this.lenis.targetScroll = 0;
    this.lenis.animatedScroll = 0;
    const internals = this.lenis as unknown as LenisInternals;
    if (internals.animate) internals.animate.to = 0;
  }
}

// Desktop only: settle onto the hero or the next section once scrolling stops.
export function bindScrollSnap(scroll: HomeScroll, sections: Sections, signal: AbortSignal): void {
  const snap = () => {
    if (signal.aborted || isMobileWidth()) return;
    const found = sections.closestTo(scroll.position);
    if (found >= 0 && sections.items[found].snap) scroll.to(sections.items[found].top);
    else if (scroll.distanceTo(sections.first.top) < sections.first.height / 2) scroll.to(sections.first.top);
  };
  window.addEventListener("scroll", debounce(snap, SNAP_AFTER_SCROLL_MS), { signal });
  window.addEventListener("scrollend", debounce(snap, SNAP_AFTER_SCROLLEND_MS), { signal });
}
