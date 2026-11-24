"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { gsap } from "@/components/shared/gsap";
import { isDesktop } from "@/components/shared/breakpoints";

import type { CarouselStore } from "../carousel";
import { useCarousel } from "../carouselContext";
import { HERO } from "../content";
import { FEATURES } from "../features";
import type { StageName } from "../stages";
import { riseIn, sinkOut, splitChars } from "./revealText";
import { fadeIn, fadeOut, watchActiveStage } from "./stageFades";
import styles from "./ShuttleHero.module.css";

// The incoming tag waits until the outgoing one has mostly left.
const TAG_IN_DELAY = 0.4;
const TAG_STAGGER = 0.02;
const CLOSEUP_LIFT_PX = -35;

type HeroParts = {
  dock: HTMLElement;
  slides: HTMLElement;
  slideEls: HTMLElement[];
  arrows: HTMLElement;
  next: HTMLElement;
  // Shown in the hero only: the back arrow and the scroll hint.
  heroOnly: HTMLElement[];
};

function useSlideIndex(carousel: CarouselStore): number {
  return useSyncExternalStore(
    (onChange) => carousel.subscribe(onChange),
    () => carousel.index,
    () => carousel.index,
  );
}

function showAccent(index: number): void {
  document.documentElement.style.setProperty("--accent-2", FEATURES[index].secondaryColor);
}

function bindSlides(parts: HeroParts, carousel: CarouselStore, signal: AbortSignal): void {
  const splits = parts.slideEls.map((slide) => splitChars(slide.firstElementChild as HTMLElement, styles.char));
  gsap.set(splits[carousel.index].chars, { yPercent: 0 });
  const unsubscribe = carousel.subscribe(({ index, previous }) => {
    showAccent(index);
    sinkOut(splits[previous].chars, TAG_STAGGER);
    fadeOut(parts.slideEls[previous]);
    fadeIn(parts.slideEls[index]);
    riseIn(splits[index].chars, { delay: TAG_IN_DELAY, stagger: TAG_STAGGER });
  });
  signal.addEventListener(
    "abort",
    () => {
      unsubscribe();
      splits.forEach((split) => split.revert());
    },
    { once: true },
  );
}

// On desktop the close-up keeps the forward arrow, moved out beside the phone; below desktop the tag stays
// instead, lifted clear of the close-up text.
function showStage(parts: HeroParts, stage: StageName): void {
  const inHero = stage === "hero";
  const inCloseup = stage === "closeup";
  const desktop = isDesktop();
  const tagStaysUp = inCloseup && !desktop;
  if (inHero) fadeIn(parts.heroOnly);
  else fadeOut(parts.heroOnly);
  if (inHero || (inCloseup && desktop)) fadeIn(parts.next);
  else fadeOut(parts.next);
  parts.arrows.classList.toggle(styles.spread, !inHero && desktop);
  if (inHero || inCloseup) fadeIn(parts.dock);
  else fadeOut(parts.dock);
  if (inHero || tagStaysUp) fadeIn(parts.slides);
  else fadeOut(parts.slides);
  gsap.to(parts.slides, { y: tagStaysUp ? CLOSEUP_LIFT_PX : 0, duration: 0.6, ease: "power2.inOut" });
}

// The hero: the active feature's tag over the scroll hint, with arrows beside the centre shuttle.
export function ShuttleHero() {
  const carousel = useCarousel();
  const index = useSlideIndex(carousel);
  const [firstIndex] = useState(carousel.index);
  const dockRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const arrowsRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const [dock, slides, arrows, hint] = [dockRef.current, slidesRef.current, arrowsRef.current, hintRef.current];
    if (!dock || !slides || !arrows || !hint) return;
    const [prev, next] = Array.from(arrows.children) as HTMLElement[];
    const parts: HeroParts = { dock, slides, slideEls: Array.from(slides.children) as HTMLElement[], arrows, next, heroOnly: [prev, hint] };
    const controller = new AbortController();
    showAccent(carousel.index);
    bindSlides(parts, carousel, controller.signal);
    watchActiveStage((stage) => showStage(parts, stage), controller.signal);
    return () => controller.abort();
  }, [carousel]);

  return (
    <section data-stage="hero" id="product" tabIndex={-1} className={styles.stage}>
      <div ref={dockRef} className={styles.dock}>
        <div className={styles.titleBox}>
          <h1 data-part="hero-heading" className={styles.heading}>
            {HERO.heading}
          </h1>
          <div ref={slidesRef} className={styles.slides}>
            {FEATURES.map((feature, slide) => (
              <div key={feature.tag} data-part="hero-slide" className={slide === firstIndex ? styles.slide : `${styles.slide} ${styles.away}`}>
                <p data-part="hero-tag" className={styles.tag}>
                  {feature.tag}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div ref={arrowsRef} data-part="hero-arrows" className={styles.arrows}>
          <button type="button" data-part="hero-prev" className={styles.arrow} aria-label={`Previous: ${FEATURES[(index + FEATURES.length - 1) % FEATURES.length].tag}`} onClick={() => carousel.previous()}>
            <DotChevron />
          </button>
          <button type="button" data-part="hero-next" className={`${styles.arrow} ${styles.forward}`} aria-label={`Next: ${FEATURES[(index + 1) % FEATURES.length].tag}`} onClick={() => carousel.next()}>
            <DotChevron />
          </button>
        </div>
        <p ref={hintRef} data-part="hero-scroll-hint" className={styles.hint}>
          {HERO.scrollHint}
        </p>
      </div>
    </section>
  );
}

// Five dots fanning out from a bright tip; drawn pointing back, mirrored for forward.
function DotChevron() {
  return (
    <svg className={styles.chevron} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="18" cy="32" r="3.2" />
      <circle cx="30.5" cy="18.5" r="3" opacity="0.75" />
      <circle cx="30.5" cy="45.5" r="3" opacity="0.75" />
      <circle cx="43" cy="5" r="2.8" opacity="0.4" />
      <circle cx="43" cy="59" r="2.8" opacity="0.4" />
    </svg>
  );
}
