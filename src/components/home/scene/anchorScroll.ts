import type Lenis from "lenis";

import { clamp } from "./numeric";

// Glide time grows with the log of the distance: a short hop takes under a second, the whole page about 2.3 s.
const SECONDS = { perLogPixel: 0.42, offset: -1.53, min: 0.4, max: 2.4 } as const;

const cubicInOut = (t: number): number => (t < 0.5 ? 4 * t ** 3 : 1 - (2 - 2 * t) ** 3 / 2);

const glideSeconds = (distance: number): number =>
  clamp(SECONDS.offset + SECONDS.perLogPixel * Math.log(Math.max(distance, 1)), SECONDS.min, SECONDS.max);

const reducedMotion = (): boolean => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Left, unmodified clicks only: new tabs, windows and downloads keep the browser default.
const isPlainClick = (event: MouseEvent): boolean =>
  !event.defaultPrevented && event.button === 0 && !(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey);

// The in-page element a link points at, or null when it leaves this page.
function sameDocumentTarget(link: HTMLAnchorElement): HTMLElement | null {
  if (!link.hash || link.origin !== location.origin || link.pathname !== location.pathname) return null;
  return document.getElementById(decodeURIComponent(link.hash.slice(1)));
}

function glide(lenis: Lenis, target: HTMLElement): void {
  const distance = Math.abs(target.getBoundingClientRect().top);
  lenis.scrollTo(target, {
    duration: glideSeconds(distance),
    easing: cubicInOut,
    immediate: reducedMotion(),
    force: true,
    // Stages are tabIndex -1, so focus lands on them without entering the tab order.
    onComplete: () => target.focus({ preventScroll: true }),
  });
}

// The address bar stays on the clean page URL: no `#id`, and no history entry per jump.
function clearHash(): void {
  if (location.hash) history.replaceState(history.state, "", location.pathname + location.search);
}

// Same-page `#id` links glide there with Lenis and move focus to the target, without writing the hash.
export function bindAnchorScroll(lenis: Lenis, signal: AbortSignal): void {
  clearHash();
  const onClick = (event: MouseEvent) => {
    if (!isPlainClick(event) || !(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>("a[href*='#']");
    const target = link && sameDocumentTarget(link);
    if (!link || !target) return;
    event.preventDefault();
    clearHash();
    // Next task: a menu link closes the sheet in this tick, and restarting Lenis then would cancel the glide.
    setTimeout(() => signal.aborted || glide(lenis, target), 0);
  };
  document.addEventListener("click", onClick, { signal });
}
