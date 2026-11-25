"use client";

import { useEffect, useRef, useState } from "react";

import type { SplitText } from "@/components/shared/gsap";

import type { CarouselStore } from "../carousel";
import { useCarousel } from "../carouselContext";
import { FEATURES, type Feature } from "../features";
import { riseIn, setBelow, splitLines } from "./revealText";
import { fadeIn, fadeOut, watchActiveStage } from "./stageFades";
import { SlideHint } from "./SlideHint";
import styles from "./CloseUp.module.css";

// Shows only the active slide's callouts; the scene pins them to the phone every frame while `data-active` is set.
function showCallouts(layer: HTMLElement, index: number): void {
  layer.querySelectorAll<HTMLElement>("[data-callout-group]").forEach((group) => {
    group.hidden = group.dataset.calloutGroup !== String(index);
  });
}

function bindCloseUp(overlay: HTMLElement, callouts: HTMLElement, carousel: CarouselStore, signal: AbortSignal): void {
  const items = Array.from(overlay.children) as HTMLElement[];
  const bodies: SplitText[] = items.map((item) => splitLines(item.querySelector("p") as HTMLElement, styles.line));
  let shown = false;
  const reveal = (index: number) => riseIn(bodies[index].lines);

  watchActiveStage((stage) => {
    const inCloseup = stage === "closeup";
    if (inCloseup === shown) return;
    shown = inCloseup;
    callouts.dataset.active = String(inCloseup);
    if (inCloseup) {
      fadeIn([overlay, callouts]);
      reveal(carousel.index);
    } else {
      fadeOut([overlay, callouts]);
    }
  }, signal);

  const unsubscribe = carousel.subscribe(({ index, previous }) => {
    fadeOut(items[previous]);
    fadeIn(items[index]);
    showCallouts(callouts, index);
    if (!shown) return;
    setBelow(bodies[index].lines);
    reveal(index);
  });
  signal.addEventListener(
    "abort",
    () => {
      unsubscribe();
      bodies.forEach((body) => body.revert());
    },
    { once: true },
  );
}

// The phone close-up: the active feature's tag and its text, framed by two corner marks.
export function CloseUp() {
  const carousel = useCarousel();
  const overlayRef = useRef<HTMLDivElement>(null);
  const calloutsRef = useRef<HTMLDivElement>(null);
  const [firstIndex] = useState(carousel.index);

  useEffect(() => {
    const overlay = overlayRef.current;
    const callouts = calloutsRef.current;
    if (!overlay || !callouts) return;
    const controller = new AbortController();
    bindCloseUp(overlay, callouts, carousel, controller.signal);
    return () => controller.abort();
  }, [carousel]);

  return (
    <section data-stage="closeup" className={styles.stage}>
      <div ref={overlayRef} className={styles.overlay}>
        {FEATURES.map((feature, index) => (
          <CloseUpItem key={feature.tag} feature={feature} away={index !== firstIndex} />
        ))}
      </div>
      <div ref={calloutsRef} data-part="closeup-callouts" className={styles.callouts} aria-hidden="true">
        {FEATURES.map((feature, index) => (
          <div key={feature.tag} data-callout-group={index} className={styles.calloutGroup} hidden={index !== firstIndex}>
            <svg className={styles.calloutLines}>
              {feature.callouts.map((callout) => (
                <g key={callout.label}>
                  <line />
                  <circle r="4" />
                </g>
              ))}
            </svg>
            {feature.callouts.map((callout) => (
              <span key={callout.label} data-part="closeup-callout" className={styles.callout}>
                {callout.label}
              </span>
            ))}
          </div>
        ))}
      </div>
      <SlideHint stage="closeup" />
    </section>
  );
}

function CloseUpItem({ feature, away }: { feature: Feature; away: boolean }) {
  return (
    <article data-part="closeup-item" className={away ? `${styles.feature} ${styles.away}` : styles.feature}>
      <h2 data-part="closeup-tag" className={styles.tag}>
        {feature.tag}
      </h2>
      <div data-part="closeup-text" className={styles.text}>
        <span data-part="closeup-corner-start" className={styles.cornerStart} aria-hidden="true" />
        <p data-part="closeup-body" className={styles.body}>
          {feature.title} {feature.body}
        </p>
        <span data-part="closeup-corner-end" className={styles.cornerEnd} aria-hidden="true" />
      </div>
    </article>
  );
}
