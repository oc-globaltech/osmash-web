import { gsap, SplitText } from "@/components/shared/gsap";

// Pieces sit one full height (plus a margin) below their clipping mask until they rise in.
const BELOW = 110;
const ABOVE = -BELOW;
const RISE = { duration: 1, ease: "expo.out" } as const;
const SINK = { duration: 0.5, ease: "power2.out" } as const;

export type Pieces = Element[];

// Splits `element` into masked lines, each starting below its mask; `lineClass` styles the moving line.
export function splitLines(element: HTMLElement, lineClass: string): SplitText {
  const split = SplitText.create(element, { type: "lines", linesClass: lineClass, mask: "lines", aria: "auto" });
  gsap.set(split.lines, { yPercent: BELOW });
  return split;
}

// Splits `element` into characters, each starting below the element's own clip.
export function splitChars(element: HTMLElement, charClass: string): SplitText {
  const split = SplitText.create(element, { type: "chars", charsClass: charClass, aria: "auto" });
  gsap.set(split.chars, { yPercent: BELOW });
  return split;
}

// Splits `element` into masked lines of characters; the characters start below their line's mask.
export function splitLineChars(element: HTMLElement, classes: { line: string; char: string }): SplitText {
  const split = SplitText.create(element, { type: "lines,chars", linesClass: classes.line, charsClass: classes.char, mask: "lines", aria: "auto" });
  gsap.set(split.chars, { yPercent: BELOW });
  return split;
}

export const riseIn = (pieces: Pieces, { delay = 0, stagger = 0.08 } = {}) =>
  gsap.fromTo(pieces, { yPercent: BELOW }, { ...RISE, yPercent: 0, delay, stagger, overwrite: "auto" });

export const sinkOut = (pieces: Pieces, stagger = 0.015) =>
  gsap.to(pieces, { ...SINK, yPercent: ABOVE, stagger, overwrite: "auto" });

export const setBelow = (pieces: Pieces) => gsap.set(pieces, { yPercent: BELOW });
