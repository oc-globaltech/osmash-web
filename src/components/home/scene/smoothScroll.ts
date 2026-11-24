import Lenis, { type VirtualScrollData } from "lenis";

// Set on <html> by the top bar menu while its full-screen sheet is open.
const MENU_OPEN_ATTRIBUTE = "data-menu-open";

export type WheelGate = (data: VirtualScrollData) => boolean;

// Lenis driven by the scene's frame loop. `wheelGate` returns true when it took the gesture itself.
export function createSmoothScroll(wheelGate: WheelGate, signal: AbortSignal): Lenis {
  const lenis = new Lenis({ autoRaf: false, virtualScroll: (data) => !wheelGate(data) });
  const root = document.documentElement;
  const followMenu = () => (root.hasAttribute(MENU_OPEN_ATTRIBUTE) ? lenis.stop() : lenis.start());
  const observer = new MutationObserver(followMenu);
  observer.observe(root, { attributes: true, attributeFilter: [MENU_OPEN_ATTRIBUTE] });
  signal.addEventListener(
    "abort",
    () => {
      observer.disconnect();
      lenis.destroy();
    },
    { once: true },
  );
  return lenis;
}
