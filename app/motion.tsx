"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

/*
 * Page motion, driven by data attributes so the sections stay server components:
 *   data-split        headline letters rise in on load
 *   data-rise         whole line rises in on load (parent clips it)
 *   data-bg-drift     background image drifts while the hero scrolls away
 *   data-scrub-words  words brighten as the paragraph scrolls through
 *   data-reveal       block rises in when it enters the viewport
 *   data-speed="n"    parallax; positive moves up faster than the page
 */
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (!document.documentElement.classList.contains("motion")) return;

    const lenis = new Lenis({ anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        SplitText.create(el, {
          type: "lines,chars",
          mask: "lines",
          autoSplit: true,
          onSplit: (split) => {
            gsap.set(el, { visibility: "visible" });
            return gsap.from(split.chars, {
              yPercent: 110,
              duration: 1.4,
              ease: "expo.out",
              stagger: 0.03,
              delay: 0.2,
            });
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((el) => {
        gsap.fromTo(el, { yPercent: 100, autoAlpha: 1 }, { yPercent: 0, duration: 1.6, ease: "expo.out", delay: 0.1 });
      });

      gsap.utils.toArray<HTMLElement>("[data-bg-drift]").forEach((el) => {
        gsap.fromTo(
          el,
          { backgroundPosition: "50% 30%" },
          {
            backgroundPosition: "50% 60%",
            ease: "none",
            scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-scrub-words]").forEach((el) => {
        const split = SplitText.create(el, { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.18 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 60 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        gsap.to(el, {
          yPercent: Number(el.dataset.speed) * -12,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    });

    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
