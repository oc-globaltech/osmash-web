"use client";

import { useEffect, useState } from "react";

import { useCarousel } from "../carouselContext";
import { FEATURES } from "../features";
import { useScrollStage } from "./scrollStage";
import styles from "./TagStrip.module.css";

// The active slide's tag, its letters spread across the screen behind the close-up (desktop only).
export function TagStrip() {
  const carousel = useCarousel();
  const [activeIndex, setActiveIndex] = useState(carousel.index);
  const { stage } = useScrollStage();

  useEffect(() => carousel.subscribe(({ index }) => setActiveIndex(index)), [carousel]);

  return (
    <div className={`${styles.tagStrip} ${stage === "closeup" ? styles.shown : ""}`} aria-hidden="true" data-part="tags">
      {FEATURES.map((feature, index) => (
        <span key={feature.tag} className={`${styles.tag} ${index === activeIndex ? styles.active : ""}`} data-part="tag">
          {[...feature.tag].map((letter, position) => (
            <span key={position}>{letter}</span>
          ))}
        </span>
      ))}
    </div>
  );
}
