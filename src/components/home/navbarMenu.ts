import { isDesktopViewport, isMobileViewport, MOBILE_QUERY } from "@/components/shared/breakpoints";
import { gsap } from "@/components/shared/gsap";

import { pulseOnHover, type HoverPulse } from "./hoverPulse";
import { createMaskReveal, type Reveal } from "./textReveal";

// Navbar menu: drops open with staggered link reveals; on mobile it fills the screen and brings in the extras.

const MENU_EASE = "power3.inOut";
const EXTRAS_OFFSET = 30;
const TIMING = {
  mobile: { open: 0.8, linkStagger: 0.1, linkDelay: 0.45, close: 0.7, closeDelay: 0.45 },
  desktop: { open: 0.6, linkStagger: 0.06, linkDelay: 0.3, close: 0.5, closeDelay: 0.3 },
};
const LINK_EXIT_STAGGER = 0.05;
const DOT_PULSE: HoverPulse = { selector: "svg circle", stagger: 0.1 };

export type MenuParts = { button: Element; menu: HTMLElement; links: HTMLElement[]; extras: Element[] };
// `animating` locks the menu while a tween runs; `isOpen` mirrors the React state for native listeners.
type MenuLock = { isOpen: boolean; animating: boolean };
type MenuScene = { parts: MenuParts; reveals: Reveal[]; lock: MenuLock };

const openHeight = () => (isMobileViewport() ? "100svh" : "auto");
const timing = () => (isMobileViewport() ? TIMING.mobile : TIMING.desktop);
const settle = (lock: MenuLock) => {
  lock.animating = false;
};

function playOpen({ parts, reveals, lock }: MenuScene): void {
  const t = timing();
  gsap.set(parts.menu, { display: "flex" });
  gsap.to(parts.menu, { height: openHeight(), opacity: 1, duration: t.open, ease: MENU_EASE, onComplete: () => settle(lock) });
  reveals.forEach((reveal, i) => reveal.enter(t.linkDelay + i * t.linkStagger));
  if (!isMobileViewport()) return;
  const extrasDelay = t.linkDelay + parts.links.length * t.linkStagger + 0.15;
  gsap.to(parts.extras, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.15, delay: extrasDelay });
}

function playClose({ parts, reveals, lock }: MenuScene): void {
  const t = timing();
  if (isMobileViewport()) gsap.to(parts.extras, { autoAlpha: 0, y: EXTRAS_OFFSET, duration: 0.4, ease: "power2.in", stagger: 0.08 });
  reveals.forEach((reveal, i) => reveal.exit(i * LINK_EXIT_STAGGER));
  const onComplete = () => {
    gsap.set(parts.menu, { display: "none" });
    gsap.set(parts.extras, { autoAlpha: 0, y: EXTRAS_OFFSET });
    settle(lock);
  };
  gsap.to(parts.menu, { height: 0, opacity: 0, duration: t.close, ease: MENU_EASE, delay: t.closeDelay, onComplete });
}

// Rotating to or from the mobile layout while open snaps the menu to that layout's open state.
function relayoutOpenMenu({ parts, lock }: MenuScene): void {
  if (!lock.isOpen) return;
  gsap.set(parts.menu, { height: openHeight() });
  if (isMobileViewport()) gsap.set(parts.extras, { autoAlpha: 1, y: 0 });
}

export function createMenuMotion(parts: MenuParts, onOpenChange: (isOpen: boolean) => void) {
  const { menu, links, extras } = parts;
  const reveals = links.map((link) => createMaskReveal(link, "lines-mask", { duration: 0.6, stagger: 0.05 }));
  const lock: MenuLock = { isOpen: false, animating: false };
  const scene: MenuScene = { parts, reveals, lock };
  gsap.set(menu, { height: 0, opacity: 0, display: "none", overflow: "hidden" });
  gsap.set(extras, { autoAlpha: 0, y: EXTRAS_OFFSET });

  const open = () => {
    if (lock.animating || lock.isOpen) return;
    Object.assign(lock, { animating: true, isOpen: true });
    onOpenChange(true);
    playOpen(scene);
  };

  const close = () => {
    if (lock.animating || !lock.isOpen) return;
    Object.assign(lock, { animating: true, isOpen: false });
    onOpenChange(false);
    playClose(scene);
  };

  return { lock, open, close, relayout: () => relayoutOpenMenu(scene), toggle: () => (lock.isOpen ? close() : open()) };
}

// Clicks outside close it on desktop; following a link closes it on mobile.
export function bindMenu(parts: MenuParts, menu: ReturnType<typeof createMenuMotion>, signal: AbortSignal): void {
  parts.button.addEventListener("click", menu.toggle, { signal });
  parts.links.forEach((link) =>
    link.addEventListener("click", () => {
      if (isMobileViewport()) menu.close();
    }, { signal }),
  );
  document.addEventListener("click", (event) => {
    if (!menu.lock.isOpen || isMobileViewport()) return;
    if (event.target instanceof Node && (parts.menu.contains(event.target) || parts.button.contains(event.target))) return;
    menu.close();
  }, { signal });
  window.matchMedia(MOBILE_QUERY).addEventListener("change", menu.relayout, { signal });
}

// Desktop: the menu button's dots pulse in sequence while hovered.
export function pulseMenuButton(button: Element, signal: AbortSignal): void {
  if (isDesktopViewport()) pulseOnHover(button, DOT_PULSE, signal);
}
