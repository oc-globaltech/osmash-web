"use client";

import { useEffect, useRef } from "react";

import { SLIDE_HINT } from "../content";
import type { StageName } from "../stages";
import { fadeIn, fadeOut, watchActiveStage } from "./stageFades";
import styles from "./SlideHint.module.css";

// Tells the visitor the phone can be dragged or swiped to the next feature; shown whenever `stage` is active.
export function SlideHint({ stage }: { stage: StageName }) {
  const hintRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const hint = hintRef.current;
    if (!hint) return;
    const controller = new AbortController();
    watchActiveStage((active) => (active === stage ? fadeIn(hint) : fadeOut(hint)), controller.signal);
    return () => controller.abort();
  }, [stage]);

  return (
    <p ref={hintRef} data-part="slide-hint" className={styles.hint} aria-hidden="true">
      <Arrow className={styles.back} />
      <span className={styles.pointer}>{SLIDE_HINT.pointer}</span>
      <span className={styles.touch}>{SLIDE_HINT.touch}</span>
      <Arrow className={styles.forward} />
    </p>
  );
}

// Drawn pointing back; the forward one mirrors it.
function Arrow({ className }: { className: string }) {
  return (
    <svg className={`${styles.arrow} ${className}`} viewBox="0 0 16 10">
      <path d="M15 5H1.5M5 1.5 1.5 5 5 8.5" />
    </svg>
  );
}
