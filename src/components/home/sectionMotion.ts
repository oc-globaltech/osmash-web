import { isDesktopViewport, isMobileViewport } from "@/components/shared/breakpoints";
import { gsap, ScrollTrigger } from "@/components/shared/gsap";

import type { CarouselStore } from "./carouselStore";
import { combineReveals, createMaskReveal, revealAll, type Reveal } from "./textReveal";

// Cross-section choreography on <main>: carousel text, section fades and text reveals as the page scrolls.

type CarouselText = { enterActive: (delay?: number) => void; exitActive: (delay?: number) => void };

const SECTION_TWEEN = { duration: 0.5, ease: "power2.inOut" };
// Plays forward on enter and backwards on leave, in both scroll directions.
const PLAY_WHILE_INSIDE = "play reverse play reverse";
const SLIDE_TEXT_DELAY = 0.3;
const BENEFITS_DELAY = 0.35;
const PROFILE_ACTIVE_CLASS = "is-profile-active";

const SELECTORS = {
  slides: ".carousel_slide",
  descs: ".carousel_desc",
  titles: ".carousel_tag",
  heroChrome: ".carousel_pagination, .icon-scroll_wrapper, .carousel_arrow.is-prev, .scroll_discover, .hero_gradient-wrapper",
  argumentShapes: ".argument_svg svg path, .argument_svg svg polygon, .argument_svg svg text",
} as const;

// Active while the section covers the bottom of the viewport.
const insideSection = (section: Element) => ({ trigger: section, start: "top bottom", end: "bottom bottom", toggleActions: PLAY_WHILE_INSIDE });

const revealsIn = (container: Element, kind: "lines-mask" | "chars-mask"): Reveal | null => {
  const els = [...container.querySelectorAll(`[data-anim="${kind}"]`)];
  return els.length ? combineReveals(els.map((el) => createMaskReveal(el, kind))) : null;
};

const fadeToActive = (els: Element[], active: number) =>
  els.forEach((el, i) => gsap.to(el, { autoAlpha: i === active ? 1 : 0, duration: 0.5, ease: "power2.inOut", overwrite: true }));

// Hero tag, profile description and side title follow the active slide.
function bindCarouselText(main: HTMLElement, carousel: CarouselStore): { text: CarouselText; unsubscribe: () => void } {
  const [slides, descs, titles] = [SELECTORS.slides, SELECTORS.descs, SELECTORS.titles].map((selector) => [...main.querySelectorAll(selector)]);
  const descReveals = descs.map((desc) => combineReveals([revealsIn(desc, "lines-mask"), revealsIn(desc, "chars-mask")].filter((reveal) => reveal !== null)));
  const titleReveals = titles.map((title) => revealsIn(title, "chars-mask"));
  const slideReveals = slides.map((slide) => revealsIn(slide, "chars-mask"));
  [slides, descs, titles].forEach((els) => els.forEach((el, i) => gsap.set(el, { autoAlpha: i === carousel.index ? 1 : 0 })));
  const unsubscribe = carousel.subscribe(({ index, previous }) => {
    [slides, descs, titles].forEach((els) => fadeToActive(els, index));
    [descReveals, titleReveals, slideReveals].forEach((reveals) => {
      reveals[previous]?.exit();
      reveals[index]?.enter(SLIDE_TEXT_DELAY);
    });
  });
  slideReveals[carousel.index]?.enter(SLIDE_TEXT_DELAY);
  const text = {
    enterActive: (delay?: number) => [descReveals, titleReveals].forEach((reveals) => reveals[carousel.index]?.enter(delay)),
    exitActive: (delay?: number) => [descReveals, titleReveals].forEach((reveals) => reveals[carousel.index]?.exit(delay)),
  };
  return { text, unsubscribe };
}

// Leaving the hero hides its chrome; desktop narrows the nav, mobile lifts the title.
function animateHero(main: HTMLElement): void {
  const section = main.querySelector(".section.is-hero");
  if (!section) return;
  const tl = gsap.timeline({ defaults: SECTION_TWEEN, scrollTrigger: { trigger: section, start: "bottom bottom", toggleActions: "play none none reverse" } });
  tl.to(main.querySelectorAll(SELECTORS.heroChrome), { autoAlpha: 0 });
  if (isDesktopViewport()) {
    tl.to(main.querySelectorAll(".carousel_title-collection"), { autoAlpha: 0 }, "<");
    tl.to(main.querySelectorAll(".carousel_nav"), { maxWidth: "55%" }, "<");
  }
  if (isMobileViewport()) {
    tl.to(main.querySelectorAll(".carousel_arrow.is-next"), { autoAlpha: 0 }, "<");
    tl.to(main.querySelectorAll(".carousel_title-collection"), { y: "-2.5rem" }, "<");
  }
}

// Profile text reveals with the section; scrolling past it hides the hero behind, scrolling above it ends the profile styling.
function profileCallbacks(main: HTMLElement, section: Element, carouselText: CarouselText) {
  const heroContainer = main.querySelector(".hero_container");
  const reveal = revealAll(section, `${SELECTORS.descs}, ${SELECTORS.titles}`);
  const enter = () => {
    reveal?.enter(0);
    carouselText.enterActive(0);
  };
  const exit = () => {
    reveal?.exit();
    carouselText.exitActive();
  };
  return {
    onEnter: () => {
      document.body.classList.add(PROFILE_ACTIVE_CLASS);
      enter();
    },
    onEnterBack: () => {
      enter();
      gsap.to(heroContainer, { autoAlpha: 1, ...SECTION_TWEEN });
    },
    onLeave: () => {
      exit();
      gsap.to(heroContainer, { autoAlpha: 0, ...SECTION_TWEEN });
    },
    onLeaveBack: () => {
      document.body.classList.remove(PROFILE_ACTIVE_CLASS);
      exit();
    },
  };
}

function animateProfile(main: HTMLElement, carouselText: CarouselText): void {
  const section = main.querySelector(".section.is-profile");
  const container = section?.querySelector(".profile_container");
  if (!section || !container) return;
  const scrollTrigger = { ...insideSection(section), ...profileCallbacks(main, section, carouselText) };
  gsap
    .timeline({ defaults: SECTION_TWEEN, scrollTrigger })
    .fromTo(container, { autoAlpha: 0 }, { autoAlpha: 1 })
    .fromTo(main.querySelectorAll(".carousel_tags-wrapper"), { autoAlpha: 0 }, { autoAlpha: 1 }, "<");
}

function animateBenefits(main: HTMLElement): void {
  main.querySelectorAll(".section.is-benefits").forEach((section) => {
    const container = section.querySelector(".benefits_container");
    if (!container) return;
    const reveal = revealAll(section);
    const enter = () => reveal?.enter(BENEFITS_DELAY);
    const exit = () => reveal?.exit();
    const scrollTrigger = { ...insideSection(section), onEnter: enter, onEnterBack: enter, onLeave: exit, onLeaveBack: exit };
    gsap.timeline({ defaults: SECTION_TWEEN, scrollTrigger }).fromTo(container, { autoAlpha: 0 }, { autoAlpha: 1, delay: BENEFITS_DELAY });
  });
}

// The benefits icon nav shows from the profile section to the end of the last benefits section.
function animateBenefitsNav(main: HTMLElement): void {
  const nav = main.querySelector(".benefits_nav");
  const sections = main.querySelectorAll(".section.is-benefits");
  const profile = main.querySelector(".section.is-profile");
  if (!nav || !sections.length || !profile) return;
  const scrollTrigger = { trigger: profile, start: "top bottom", endTrigger: sections[sections.length - 1], end: "bottom bottom", toggleActions: PLAY_WHILE_INSIDE };
  gsap.timeline({ defaults: SECTION_TWEEN, scrollTrigger }).fromTo(nav, { autoAlpha: 0 }, { autoAlpha: 1 });
}

// The SMASH YOUR LIMITS wordmark pops in letter shape by letter shape over the photo.
function animateArgument(main: HTMLElement): void {
  const section = main.querySelector(".section.is-argument");
  if (!section) return;
  const shapes = section.querySelectorAll(SELECTORS.argumentShapes);
  const blur = section.querySelector(".argument_svg-blur");
  gsap.set(shapes, { autoAlpha: 0, scale: 0.6, transformOrigin: "50% 50%" });
  if (blur) gsap.set(blur, { autoAlpha: 0 });
  const enter = () => {
    gsap.to(shapes, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(2)", stagger: 0.04, delay: 0.4, overwrite: true });
    if (blur) gsap.to(blur, { autoAlpha: 1, duration: 0.4, ease: "power2.out", delay: 1, overwrite: true });
  };
  const exit = () => {
    gsap.to(shapes, { autoAlpha: 0, scale: 0.6, duration: 0.4, ease: "power2.in", overwrite: true });
    if (blur) gsap.to(blur, { autoAlpha: 0, duration: 0.4, ease: "power2.in", overwrite: true });
  };
  const scrollTrigger = { ...insideSection(section), onEnter: enter, onEnterBack: enter, onLeave: exit, onLeaveBack: exit };
  gsap
    .timeline({ defaults: SECTION_TWEEN, scrollTrigger })
    .fromTo(main.querySelectorAll(".argument_container"), { autoAlpha: 0 }, { autoAlpha: 1 })
    .fromTo(main.querySelectorAll(".gradient_overlay"), { autoAlpha: 1 }, { autoAlpha: 0 }, "<");
}

function trackFullRange(main: HTMLElement): void {
  const section = main.querySelector(".section.is-full-range");
  if (!section) return;
  ScrollTrigger.create({
    ...insideSection(section),
    onEnter: () => document.body.classList.remove(PROFILE_ACTIVE_CLASS),
    onLeaveBack: () => document.body.classList.add(PROFILE_ACTIVE_CLASS),
  });
}

// Mobile: the HUD fades out over the FAQ so it does not cover the answers.
function fadeHudOverFaq(main: HTMLElement): void {
  const section = main.querySelector(".section.is-faq");
  if (!isMobileViewport() || !section) return;
  const scrollTrigger = { trigger: section, start: "top bottom", end: "bottom top", toggleActions: PLAY_WHILE_INSIDE };
  gsap.fromTo(main.querySelectorAll(".hud_container"), { autoAlpha: 1 }, { autoAlpha: 0, ...SECTION_TWEEN, scrollTrigger });
}

// Run inside a gsap.context so every tween, trigger and split is reverted on unmount; returns the store unsubscribe.
export function initSectionMotion(main: HTMLElement, carousel: CarouselStore): () => void {
  const { text, unsubscribe } = bindCarouselText(main, carousel);
  animateHero(main);
  animateProfile(main, text);
  animateBenefits(main);
  animateBenefitsNav(main);
  animateArgument(main);
  trackFullRange(main);
  fadeHudOverFaq(main);
  return () => {
    unsubscribe();
    document.body.classList.remove(PROFILE_ACTIVE_CLASS);
  };
}
