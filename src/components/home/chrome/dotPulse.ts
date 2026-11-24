import { type RefObject, useEffect } from "react";

const PULSE = {
  durationMs: 1100,
  staggerMs: 110,
  // Share of the way to the icon centre a dot travels.
  pull: 0.6,
  shrink: 0.6,
} as const;

const reducedMotion = (): boolean => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function pulseKeyframes(dot: SVGCircleElement): Keyframe[] {
  const box = dot.ownerSVGElement?.viewBox.baseVal;
  if (!box) return [];
  const dx = (box.x + box.width / 2 - dot.cx.baseVal.value) * PULSE.pull;
  const dy = (box.y + box.height / 2 - dot.cy.baseVal.value) * PULSE.pull;
  return [
    { transform: "none" },
    { transform: `translate(${dx}px, ${dy}px) scale(${PULSE.shrink})`, offset: 0.35 },
    { transform: "none", offset: 0.7 },
    { transform: "none" },
  ];
}

function startPulse(dots: SVGCircleElement[]): Animation[] {
  return dots.map((dot, index) => {
    dot.style.transformBox = "fill-box";
    dot.style.transformOrigin = "center";
    return dot.animate(pulseKeyframes(dot), {
      duration: PULSE.durationMs,
      delay: index * PULSE.staggerMs,
      iterations: Infinity,
      easing: "ease-in-out",
    });
  });
}

// Lets each dot finish its current beat instead of snapping back.
function settle(animation: Animation): void {
  const { currentIteration } = animation.effect?.getComputedTiming() ?? {};
  if (currentIteration == null) animation.cancel();
  else animation.effect?.updateTiming({ iterations: currentIteration + 1 });
}

// While the pointer is over `trigger`, the dots of the SVG icon inside it take turns dipping toward its centre.
function bindDotPulse(trigger: HTMLElement, signal: AbortSignal): void {
  let running: Animation[] = [];
  const start = () => {
    if (running.length > 0 || reducedMotion()) return;
    running = startPulse([...trigger.querySelectorAll<SVGCircleElement>("svg circle")]);
  };
  const stop = () => {
    running.forEach(settle);
    running = [];
  };
  trigger.addEventListener("pointerenter", start, { signal });
  trigger.addEventListener("pointerleave", stop, { signal });
  signal.addEventListener("abort", () => running.forEach((animation) => animation.cancel()));
}

export function useDotPulse(triggerRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const controller = new AbortController();
    bindDotPulse(trigger, controller.signal);
    return () => controller.abort();
  }, [triggerRef]);
}
