import { useSyncExternalStore } from "react";

import { STAGES, type StageName } from "../stages";

export type ScrollStage = {
  stage: StageName;
  // True once the download block has reached the middle of the screen.
  atDownload: boolean;
};

const INITIAL: ScrollStage = { stage: STAGES[0], atDownload: false };
// A section becomes current when its top passes this share of the viewport height.
const CURRENT_LINE = 0.5;

const listeners = new Set<() => void>();
let snapshot = INITIAL;
let frame = 0;

const passedCurrentLine = (element: Element): boolean =>
  element.getBoundingClientRect().top <= window.innerHeight * CURRENT_LINE;

function measure(): ScrollStage {
  const passed = [...document.querySelectorAll<HTMLElement>("section[data-stage]")].filter(passedCurrentLine);
  const stage = (passed.at(-1)?.dataset.stage as StageName | undefined) ?? INITIAL.stage;
  const download = document.getElementById("download");
  return { stage, atDownload: !!download && passedCurrentLine(download) };
}

function update(): void {
  frame = 0;
  const next = measure();
  if (next.stage !== snapshot.stage || next.atDownload !== snapshot.atDownload) snapshot = next;
  listeners.forEach((listener) => listener());
}

function scheduleUpdate(): void {
  frame ||= requestAnimationFrame(update);
}

// Calls `listener` at most once per frame while the page scrolls or resizes.
function subscribeScroll(listener: () => void): () => void {
  if (listeners.size === 0) {
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
  }
  listeners.add(listener);
  scheduleUpdate();
  return () => {
    listeners.delete(listener);
    if (listeners.size > 0) return;
    window.removeEventListener("scroll", scheduleUpdate);
    window.removeEventListener("resize", scheduleUpdate);
    cancelAnimationFrame(frame);
    frame = 0;
  };
}

export function useScrollStage(): ScrollStage {
  return useSyncExternalStore(
    subscribeScroll,
    () => snapshot,
    () => INITIAL,
  );
}
