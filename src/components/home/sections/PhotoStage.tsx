"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { CarouselStore } from "../carousel";
import { useCarousel } from "../carouselContext";
import { CLOSING_TITLE } from "../content";
import { FEATURES } from "../features";
import { fadeIn, fadeOut, watchActiveStage } from "./stageFades";
import styles from "./PhotoStage.module.css";

// "Smash your limits" set on two lines: the first word, then the rest.
const [FIRST_WORD, ...OTHER_WORDS] = CLOSING_TITLE.split(" ");

function bindPhotos(media: HTMLElement, carousel: CarouselStore, signal: AbortSignal): void {
  const slides = Array.from(media.querySelectorAll<HTMLElement>(`.${styles.slide}`));
  watchActiveStage((stage) => (stage === "photo" ? fadeIn(media) : fadeOut(media)), signal);
  const unsubscribe = carousel.subscribe(({ index, previous }) => {
    fadeOut(slides[previous]);
    fadeIn(slides[index]);
  });
  signal.addEventListener("abort", unsubscribe, { once: true });
}

// The full-bleed photo of the active feature behind the closing wordmark.
export function PhotoStage() {
  const carousel = useCarousel();
  const [firstIndex] = useState(carousel.index);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;
    const controller = new AbortController();
    bindPhotos(media, carousel, controller.signal);
    return () => controller.abort();
  }, [carousel]);

  return (
    <section data-stage="photo" className={styles.stage}>
      <div ref={mediaRef} data-part="photo-media" className={styles.media}>
        {FEATURES.map((feature, index) => (
          <div key={feature.tag} data-part="photo-slide" className={index === firstIndex ? styles.slide : `${styles.slide} ${styles.away}`}>
            <Image src={feature.photo} alt="" fill sizes="100vw" className={styles.photo} />
          </div>
        ))}
        <h2 data-part="photo-wordmark" className={styles.wordmark}>
          <span className={styles.line}>{FIRST_WORD}</span>
          <span className={styles.line}>{OTHER_WORDS.join(" ")}</span>
        </h2>
      </div>
    </section>
  );
}
