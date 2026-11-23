import { clamp, easeOutCubic } from "../math";
import type { HomeScroll } from "../scroll";
import type { Sections } from "../sections";

// Wheel paging stops after the argument section; below it the page scrolls freely.
const LAST_PAGED_SECTION = 6;
const MIN_WHEEL_DELTA = 4;
// Sections with long scene transitions (hero, profile, argument, packshot) page slower.
const SLOW_SECTIONS = [0, 1, 5, 6];
const SLOW_PAGE_SECONDS = 1.5;
const FAST_PAGE_SECONDS = 1;

export const pageDuration = (fromSection: number): number =>
  SLOW_SECTIONS.includes(fromSection) ? SLOW_PAGE_SECONDS : FAST_PAGE_SECONDS;

// One wheel gesture moves exactly one section, locked until the scroll lands.
export function bindWheelPaging(scroll: HomeScroll, sections: Sections, signal: AbortSignal): void {
  let locked = false;
  let unlockTimer: ReturnType<typeof setTimeout> | undefined;
  signal.addEventListener("abort", () => clearTimeout(unlockTimer));
  const onWheel = (event: WheelEvent) => {
    const anchor = sections.closestTo(scroll.position);
    if (anchor > LAST_PAGED_SECTION) return;
    event.preventDefault();
    if (locked || Math.abs(event.deltaY) < MIN_WHEEL_DELTA) return;
    const target = clamp(anchor + Math.sign(event.deltaY), 0, sections.items.length - 1);
    if (target === anchor) return;
    const duration = pageDuration(anchor);
    locked = true;
    scroll.to(sections.items[target].top, { duration, lock: true, easing: easeOutCubic });
    clearTimeout(unlockTimer);
    unlockTimer = setTimeout(() => (locked = false), duration * 1000);
  };
  window.addEventListener("wheel", onWheel, { passive: false, signal });
}
