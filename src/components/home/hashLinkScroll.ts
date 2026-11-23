import type Lenis from "lenis";

// Same-page `#id` links glide to their target instead of jumping:
// the hash is pushed to history, Lenis eases there and the target takes focus without an outline.

const LINK_SELECTOR = 'a[href*="#"]:not([href="#"])';
const VALID_HASH = /^#[a-zA-Z0-9][\w:.-]*$/;
const NO_OUTLINE_CLASS = "focus-outline-none";
const NO_OUTLINE_STYLE = `.${NO_OUTLINE_CLASS}[tabindex="-1"]:focus{outline:none;}`;

// Longer distances take longer, logarithmically (seconds).
const scrollSeconds = (distance: number): number => (472.143 * Math.log(Math.abs(distance) + 125) - 2000) / 1000;

const prefersReducedMotion = (): boolean => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const easeInOutCubic = (t: number): number => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1);

// Focus for keyboard and screen-reader users, via a temporary tabindex that is put back afterwards.
function focusTarget(target: HTMLElement): void {
  const tabindex = target.getAttribute("tabindex");
  if (tabindex) target.setAttribute("data-tabindex-swap", tabindex);
  else target.setAttribute("tabindex", "-1");
  target.classList.add(NO_OUTLINE_CLASS);
  target.focus({ preventScroll: true });
  const swapped = target.getAttribute("data-tabindex-swap");
  if (swapped) {
    target.setAttribute("tabindex", swapped);
    target.removeAttribute("data-tabindex-swap");
  } else target.removeAttribute("tabindex");
  target.classList.remove(NO_OUTLINE_CLASS);
}

function glideTo(lenis: Lenis, target: HTMLElement): void {
  const distance = target.getBoundingClientRect().top;
  lenis.scrollTo(target, {
    offset: 0,
    easing: easeInOutCubic,
    duration: scrollSeconds(distance),
    immediate: prefersReducedMotion(),
    onComplete: () => focusTarget(target),
  });
}

type ClickModifiers = Pick<MouseEvent, "defaultPrevented" | "button" | "metaKey" | "ctrlKey" | "shiftKey" | "altKey">;

// New-tab, new-window and download clicks, and clicks another handler already took, keep the browser default.
export const isPlainClick = (event: ClickModifiers): boolean =>
  !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

function onLinkClick(lenis: Lenis, event: MouseEvent): void {
  if (!isPlainClick(event)) return;
  const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>(LINK_SELECTOR) : null;
  if (!link || !VALID_HASH.test(link.hash) || link.host + link.pathname !== location.host + location.pathname) return;
  const target = document.getElementById(link.hash.slice(1));
  if (!target) return;
  // Stops the click here, so window listeners (the hero scene's shuttle click) never see it.
  event.preventDefault();
  event.stopPropagation();
  const state: unknown = history.state;
  const stateHash = state && typeof state === "object" && "hash" in state ? state.hash : undefined;
  if (location.hash !== link.hash && stateHash !== link.hash) history.pushState({ hash: link.hash }, "", link.hash);
  setTimeout(() => glideTo(lenis, target), 0);
}

export function bindHashLinkScroll(lenis: Lenis, signal: AbortSignal): void {
  const style = document.createElement("style");
  style.textContent = NO_OUTLINE_STYLE;
  document.head.insertBefore(style, document.head.firstChild);
  document.addEventListener("click", (event) => onLinkClick(lenis, event), { signal });
  signal.addEventListener("abort", () => style.remove());
}
