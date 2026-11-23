import { isDesktopViewport } from "@/components/shared/breakpoints";
import { gsap } from "@/components/shared/gsap";

import { FEATURE_PRIMARY_COLOR, FEATURES } from "./features";
import type { CarouselChange, CarouselStore } from "./carouselStore";
import { pulseOnHover, type HoverPulse } from "./hoverPulse";
import { clamp, debounce } from "./scene/math";

// Hero carousel chrome: pagination dot, rotating gradient, slide colours and looping hover on the arrows.

const VIEWBOX_WIDTH = 1000;
const TRACK_PADDING = 20;
const DOT_WRAP_SLIDE = 150;
const COLOR_SETTLE_MS = 150;
const COLOR_VARS = { primary: "--color-scheme-1--accent-primary", secondary: "--color-scheme-1--accent-secondary" } as const;
// Desktop: the arrow dots pulse in sequence while hovered.
const ARROW_PULSE: HoverPulse = { selector: "svg path, svg rect", stagger: 0.08 };

const slideCount = FEATURES.length;
const usableWidth = VIEWBOX_WIDTH - TRACK_PADDING * 2;
export const indexToX = (index: number): number => TRACK_PADDING + (usableWidth / Math.max(slideCount - 1, 1)) * index;

// Pagination slot under a client x, clamped to the track.
export function indexAtPointer(svg: Element, clientX: number): number {
  const rect = svg.getBoundingClientRect();
  const x = clamp(((clientX - rect.left) / rect.width) * VIEWBOX_WIDTH, TRACK_PADDING, VIEWBOX_WIDTH - TRACK_PADDING);
  return clamp(Math.round(((x - TRACK_PADDING) / usableWidth) * (slideCount - 1)), 0, slideCount - 1);
}

// Steps glide along the bar; wrapping from last to first slides out one side and in the other.
function moveDot(dot: Element, { index, previous }: CarouselChange): gsap.core.Timeline {
  gsap.killTweensOf(dot);
  if (Math.abs(index - previous) <= slideCount / 2) {
    return gsap.timeline().to(dot, { attr: { cx: indexToX(index) }, scale: 1, x: 0, duration: 0.6, ease: "power3.out" });
  }
  const exitX = previous > index ? DOT_WRAP_SLIDE : -DOT_WRAP_SLIDE;
  return gsap
    .timeline()
    .to(dot, { x: exitX, scale: 0, duration: 0.3, ease: "power2.in" })
    .set(dot, { attr: { cx: indexToX(index) }, x: -exitX })
    .to(dot, { x: 0, scale: 1, duration: 0.45, ease: "power3.out" });
}

function followWithDot(dot: Element, carousel: CarouselStore): () => void {
  gsap.set(dot, { attr: { cx: indexToX(carousel.index) }, transformBox: "fill-box", transformOrigin: "50% 50%", x: 0 });
  let timeline: gsap.core.Timeline | null = null;
  return carousel.subscribe((change) => {
    timeline?.kill();
    timeline = moveDot(dot, change);
  });
}

// The conic gradient turns one slice per slide, the short way round.
function followWithGradient(gradient: Element, carousel: CarouselStore): () => void {
  const step = 360 / slideCount;
  let rotation = 0;
  gsap.set(gradient, { rotation: 0 });
  return carousel.subscribe(({ index, previous }) => {
    let delta = index - previous;
    if (delta > slideCount / 2) delta -= slideCount;
    if (delta < -slideCount / 2) delta += slideCount;
    rotation -= delta * step;
    gsap.to(gradient, { rotation, duration: 0.8, ease: "power2.inOut", overwrite: true });
  });
}

function followWithColors(carousel: CarouselStore): () => void {
  const apply = (index: number) => {
    document.documentElement.style.setProperty(COLOR_VARS.primary, FEATURE_PRIMARY_COLOR);
    document.documentElement.style.setProperty(COLOR_VARS.secondary, FEATURES[index].secondaryColor);
  };
  apply(carousel.index);
  const applySettled = debounce(apply, COLOR_SETTLE_MS);
  return carousel.subscribe(({ index }) => applySettled(index));
}

// Run inside a gsap.context; returns the cleanup for the store subscriptions.
export function bindCarouselChrome(hero: HTMLElement, carousel: CarouselStore, signal: AbortSignal): () => void {
  if (isDesktopViewport()) hero.querySelectorAll(".carousel_arrow").forEach((arrow) => pulseOnHover(arrow, ARROW_PULSE, signal));
  const dot = hero.querySelector(".carousel_pagination-dot");
  const gradient = hero.querySelector(".hero_gradient");
  const unsubscribers = [
    dot ? followWithDot(dot, carousel) : null,
    followWithColors(carousel),
    gradient ? followWithGradient(gradient, carousel) : null,
  ];
  return () => unsubscribers.forEach((unsubscribe) => unsubscribe?.());
}
