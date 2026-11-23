"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { gsap, ScrollTrigger } from "@/components/shared/gsap";
import type { CarouselStore } from "./carouselStore";
import { useCarousel } from "./homeContext";
import { debounce } from "./scene/math";

// One background photo per carousel slide (five photos, so match-jump repeats). Decorative, so alt="".
const SLIDE_PHOTOS = ["night-court", "match-jump", "jump-indoor", "smash-jump", "shuttle-net", "match-jump"];

const WORDMARK_WIDTH = 1314;
const WORDMARK_HEIGHT = 405;
const WORDMARK_LINE_1_SIZE = 250;
const WORDMARK_LINE_1_BASELINE = 185;
const WORDMARK_LINE_2_SIZE = 190;
const WORDMARK_LINE_2_BASELINE = 395;
const WORDMARK_TEXT = {
  x: WORDMARK_WIDTH / 2,
  textAnchor: "middle",
  fillOpacity: 0.72,
  fontWeight: 600,
  style: { fontFamily: "var(--font-heading)" },
} as const;

const PHOTO_FADE = { duration: 0.6, ease: "power2.inOut", overwrite: true };
const SLIDE_SETTLE_MS = 150;

// While the section is on screen, the photo behind the wordmark follows the active slide.
function followActiveSlide(section: HTMLElement, carousel: CarouselStore): () => void {
  const photos = [...section.querySelectorAll(".argument_photo")];
  let inView = false;
  const show = (index: number) => photos.forEach((photo, i) => gsap.to(photo, { autoAlpha: i === index ? 1 : 0, ...PHOTO_FADE }));
  gsap.set(photos, { autoAlpha: 0 });
  const showSettled = debounce((index: number) => {
    if (inView) show(index);
  }, SLIDE_SETTLE_MS);
  const unsubscribe = carousel.subscribe(({ index }) => showSettled(index));
  ScrollTrigger.create({
    trigger: section,
    start: "top bottom",
    end: "bottom top",
    onToggle: ({ isActive }) => {
      inView = isActive;
      if (isActive) show(carousel.index);
    },
  });
  return unsubscribe;
}

export function Argument() {
  const ref = useRef<HTMLElement>(null);
  const carousel = useCarousel();

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    let unsubscribe = () => {};
    const motion = gsap.context(() => {
      unsubscribe = followActiveSlide(section, carousel);
    }, section);
    return () => {
      unsubscribe();
      motion.revert();
    };
  }, [carousel]);

  return (
    <section ref={ref} className="section is-argument">
      <div className="argument_container">
        <div className="padding-global">
          <div className="padding-section-medium" />
        </div>
        <div className="argument_media-container">
          <div role="list" className="argument_photo-stack">
            {SLIDE_PHOTOS.map((file, index) => (
              <div key={index} role="listitem" className="argument_photo">
                <div className="argument_photo-embed">
                  <Image src={`/photos/${file}.jpg`} alt="" fill sizes="100vw" />
                </div>
              </div>
            ))}
          </div>
          <div className="argument_svg-container">
            <div className="argument_svg">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox={`0 0 ${WORDMARK_WIDTH} ${WORDMARK_HEIGHT}`} fill="none">
                <text {...WORDMARK_TEXT} y={WORDMARK_LINE_1_BASELINE} fontSize={WORDMARK_LINE_1_SIZE}>
                  SMASH
                </text>
                <text {...WORDMARK_TEXT} y={WORDMARK_LINE_2_BASELINE} fontSize={WORDMARK_LINE_2_SIZE}>
                  YOUR LIMITS
                </text>
              </svg>
            </div>
            <div className="argument_svg-blur" />
          </div>
        </div>
      </div>
    </section>
  );
}
