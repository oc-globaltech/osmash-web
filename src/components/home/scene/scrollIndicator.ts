import { gsap } from "@/components/shared/gsap";

import type { HomeScroll } from "./scroll";

// The navbar line fills with page progress through `--p`.
export function bindScrollIndicator(scroll: HomeScroll): void {
  const indicator = document.querySelector(".scroll_indicator");
  if (!indicator) return;
  gsap.set(indicator, { "--p": 0 });
  const setProgress = gsap.quickTo(indicator, "--p", { duration: 0.3, ease: "power3.out" });
  scroll.lenis.on("scroll", () => {
    const range = scroll.range();
    setProgress(range > 0 ? scroll.position / range : 0);
  });
}
