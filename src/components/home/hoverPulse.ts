import { gsap } from "@/components/shared/gsap";

// Desktop chrome: an element's svg shapes pulse in sequence while it is hovered.

export type HoverPulse = { selector: string; stagger: number };

const PULSE = { duration: 0.4, ease: "power2.inOut" };
const PULSE_SETTLE = { scale: 1, duration: 0.3, ease: "power2.out", overwrite: true };

export function pulseOnHover(trigger: Element, { selector, stagger }: HoverPulse, signal: AbortSignal): void {
  const shapes = trigger.querySelectorAll(selector);
  if (!shapes.length) return;
  gsap.set(shapes, { transformOrigin: "50% 50%" });
  let pulse: gsap.core.Timeline | null = null;
  trigger.addEventListener("mouseenter", () => {
    pulse?.kill();
    gsap.set(shapes, { scale: 1 });
    const sequence = { each: stagger, from: "start" } as const;
    pulse = gsap.timeline({ repeat: -1 }).to(shapes, { scale: 0.5, stagger: sequence, ...PULSE }).to(shapes, { scale: 1, stagger: sequence, ...PULSE });
  }, { signal });
  trigger.addEventListener("mouseleave", () => {
    pulse?.kill();
    pulse = null;
    gsap.to(shapes, { ...PULSE_SETTLE });
  }, { signal });
}
