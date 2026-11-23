import { clamp, easeOutCubic } from "../math";
import { isMobileWidth } from "../deviceProfile";
import type { HomeScroll } from "../scroll";
import type { Sections } from "../sections";

// Touch paging covers the hero through the full-range section; below it the page scrolls freely.
const LAST_PAGED_SECTION = 7;
const AXIS_LOCK_DISTANCE = 2;
const PAGE_SWIPE_THRESHOLD = 24;
const PAGE_SECONDS = 1.5;

type PagingAxis = "none" | "horizontal" | "vertical";

// Mobile: a vertical swipe moves one section up or down instead of free scrolling.
export function bindMobilePaging(scroll: HomeScroll, sections: Sections, signal: AbortSignal): void {
  const paging = { startX: 0, startY: 0, anchor: 0, axis: "none" as PagingAxis, active: false };
  const onStart = (event: TouchEvent) => {
    if (!isMobileWidth()) return;
    Object.assign(paging, { startX: event.touches[0].clientX, startY: event.touches[0].clientY, axis: "none" });
    paging.anchor = sections.closestTo(scroll.position);
    paging.active = paging.anchor <= LAST_PAGED_SECTION;
  };
  const onMove = (event: TouchEvent) => {
    if (!isMobileWidth() || !paging.active) return;
    const dx = Math.abs(event.touches[0].clientX - paging.startX);
    const dy = Math.abs(event.touches[0].clientY - paging.startY);
    if (paging.axis === "none" && (dx > AXIS_LOCK_DISTANCE || dy > AXIS_LOCK_DISTANCE)) paging.axis = dx > dy ? "horizontal" : "vertical";
    if (paging.axis !== "vertical") return;
    event.preventDefault();
    scroll.lenis.stop();
  };
  const onEnd = (event: TouchEvent) => {
    if (!isMobileWidth() || !paging.active || paging.axis !== "vertical") return;
    const delta = (event.changedTouches[0]?.clientY || paging.startY) - paging.startY;
    const step = Math.abs(delta) > PAGE_SWIPE_THRESHOLD ? (delta < 0 ? 1 : -1) : 0;
    const target = clamp(paging.anchor + step, 0, sections.items.length - 1);
    scroll.lenis.start();
    scroll.to(sections.items[target].top, { duration: PAGE_SECONDS, easing: easeOutCubic });
    Object.assign(paging, { active: false, axis: "none" });
  };
  window.addEventListener("touchstart", onStart, { signal });
  window.addEventListener("touchmove", onMove, { passive: false, signal });
  window.addEventListener("touchend", onEnd, { signal });
}
