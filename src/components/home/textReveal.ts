import { gsap, SplitText } from "@/components/shared/gsap";

// Masked text slides up into view and leaves upward; `data-anim` picks lines or characters.
type MaskKind = "lines-mask" | "chars-mask";
export type RevealOptions = { stagger?: number; duration?: number; ease?: string };
export type Reveal = { enter: (delay?: number) => void; exit: (delay?: number) => void };

const HIDDEN_BELOW = 110;
const HIDDEN_ABOVE = -110;
const DEFAULT_EASE = "power3.out";

const MASKS: Record<MaskKind, { type: string; pick: (split: SplitText) => Element[]; stagger: number; duration: number }> = {
  "lines-mask": { type: "lines", pick: (split) => split.lines, stagger: 0.08, duration: 0.7 },
  "chars-mask": { type: "lines,chars", pick: (split) => split.chars, stagger: 0.01, duration: 0.6 },
};

const isMaskKind = (value: string | undefined): value is MaskKind => value === "lines-mask" || value === "chars-mask";

export function createMaskReveal(el: Element, kind: MaskKind, options: RevealOptions = {}): Reveal {
  const mask = MASKS[kind];
  const targets = mask.pick(new SplitText(el, { type: mask.type, mask: "lines", linesClass: "line" }));
  const tween = { duration: options.duration ?? mask.duration, ease: options.ease ?? DEFAULT_EASE, stagger: options.stagger ?? mask.stagger, overwrite: true };
  gsap.set(targets, { yPercent: HIDDEN_BELOW });
  return {
    enter: (delay = 0) => gsap.to(targets, { ...tween, yPercent: 0, delay }),
    exit: (delay = 0) => gsap.to(targets, { ...tween, yPercent: HIDDEN_ABOVE, delay }),
  };
}

export function combineReveals(reveals: Reveal[]): Reveal {
  return {
    enter: (delay) => reveals.forEach((reveal) => reveal.enter(delay)),
    exit: (delay) => reveals.forEach((reveal) => reveal.exit(delay)),
  };
}

const parseOption = (value: string | undefined): number | undefined => parseFloat(value ?? "") || undefined;

// Every `[data-anim]` element under `scope`, skipping those inside `exclude`; null when there are none.
export function revealAll(scope: Element, exclude?: string): Reveal | null {
  const reveals = [...scope.querySelectorAll<HTMLElement>("[data-anim]")]
    .filter((el) => !exclude || !el.closest(exclude))
    .flatMap((el) => {
      const kind = el.dataset.anim;
      if (!isMaskKind(kind)) return [];
      const options = { stagger: parseOption(el.dataset.animStagger), duration: parseOption(el.dataset.animDuration), ease: el.dataset.animEase || undefined };
      return [createMaskReveal(el, kind, options)];
    });
  return reveals.length ? combineReveals(reveals) : null;
}
