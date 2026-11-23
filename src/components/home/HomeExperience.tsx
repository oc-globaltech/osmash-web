"use client";

import { useEffect, useState, type ReactNode } from "react";

import { gsap } from "@/components/shared/gsap";
import { CarouselStore } from "./carouselStore";
import { CarouselContext } from "./homeContext";
import { resetToTopOnLoad } from "./resetToTopOnLoad";
import { initSectionMotion } from "./sectionMotion";

type HomeExperienceProps = {
  children: ReactNode;
};

// Owns the home page's shared carousel state, opens the page at the hero and runs the cross-section motion.
export function HomeExperience({ children }: HomeExperienceProps) {
  const [carousel] = useState(() => new CarouselStore());

  useEffect(() => {
    const controller = new AbortController();
    resetToTopOnLoad(() => window.scrollTo(0, 0), controller.signal);
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;
    let stopMotion = () => {};
    let mounted = true;
    const motion = gsap.context(() => undefined, main);
    // SplitText measures line breaks, so it must run with the web fonts in place.
    void document.fonts.ready.then(() => {
      if (!mounted) return;
      motion.add(() => {
        stopMotion = initSectionMotion(main, carousel);
      });
    });
    return () => {
      mounted = false;
      stopMotion();
      motion.revert();
    };
  }, [carousel]);

  return <CarouselContext value={carousel}>{children}</CarouselContext>;
}
