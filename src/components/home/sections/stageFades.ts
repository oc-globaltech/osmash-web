import { gsap } from "@/components/shared/gsap";

import { STAGES, type StageName } from "../stages";

const FADE = { duration: 0.45, ease: "power2.inOut" } as const;

type FadeTarget = gsap.TweenTarget;

export const fadeIn = (target: FadeTarget) => gsap.to(target, { ...FADE, autoAlpha: 1, overwrite: "auto" });

export const fadeOut = (target: FadeTarget) => gsap.to(target, { ...FADE, autoAlpha: 0, overwrite: "auto" });

// A stage takes over as soon as its section top rises above the bottom of the viewport.
function currentStage(): StageName {
  let active: StageName = STAGES[0];
  for (const stage of STAGES) {
    const section = document.querySelector(`[data-stage="${stage}"]`);
    if (section && section.getBoundingClientRect().top < window.innerHeight) active = stage;
  }
  return active;
}

// Calls `onChange` now and every time another stage takes over, until `signal` aborts.
export function watchActiveStage(onChange: (stage: StageName) => void, signal: AbortSignal): void {
  let active = currentStage();
  let frameId = 0;
  const check = () => {
    frameId = 0;
    const stage = currentStage();
    if (stage === active) return;
    active = stage;
    onChange(stage);
  };
  const schedule = () => {
    if (!frameId) frameId = requestAnimationFrame(check);
  };
  window.addEventListener("scroll", schedule, { passive: true, signal });
  window.addEventListener("resize", schedule, { signal });
  signal.addEventListener("abort", () => cancelAnimationFrame(frameId), { once: true });
  onChange(active);
}
