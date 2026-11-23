"use client";

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";

import { DESKTOP_MIN_WIDTH } from "./breakpoints";
import { gsap } from "./gsap";

// Desktop widths only: only then are the labels split for the hover roll.
const SPLIT_MIN_WIDTH = DESKTOP_MIN_WIDTH;
const ROLL = { duration: 0.4, ease: "power3.inOut" };
const BELOW = "110%";
const ABOVE = "-110%";
const MAX_STAGGER = 0.025;
const STAGGER_SPREAD = 0.25;

type HoverButtonProps = {
  href: string;
  className: string;
  // Text rolled character by character on desktop hover.
  label: string;
  // Markup shown when the label is not split (touch and narrow screens).
  children: ReactNode;
};

// Decided once per page load, like the original script: a later resize keeps the first layout.
let splitAtLoad: boolean | undefined;
const readSplit = () => (splitAtLoad ??= window.innerWidth >= SPLIT_MIN_WIDTH);
const subscribeNever = () => () => {};

function Chars({ label }: { label: string }) {
  return [...label].map((char, i) => (
    <span key={i} className="char" style={{ display: "inline-block" }}>
      {char === " " ? " " : char}
    </span>
  ));
}

// Desktop buttons roll their label: each character slides up and a copy slides in from below.
export function HoverButton({ href, className, label, children }: HoverButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  // The server renders the plain label; the client swaps in the split one after hydration.
  const split = useSyncExternalStore(subscribeNever, readSplit, () => false);

  useEffect(() => {
    const button = ref.current;
    if (!split || !button) return;
    const controller = new AbortController();
    const motion = gsap.context(() => {
      const top = button.querySelectorAll(".layer-top .char");
      const bottom = button.querySelectorAll(".layer-bottom .char");
      const stagger = Math.min(MAX_STAGGER, STAGGER_SPREAD / top.length);
      gsap.set(bottom, { y: BELOW });
      const roll = (leaving: NodeListOf<Element>, arriving: NodeListOf<Element>, leaveTo: string) => {
        gsap.killTweensOf([top, bottom]);
        gsap.timeline().to(leaving, { y: leaveTo, stagger, ...ROLL }, 0).to(arriving, { y: "0%", stagger, ...ROLL }, 0);
      };
      button.addEventListener("mouseenter", () => roll(top, bottom, ABOVE), { signal: controller.signal });
      button.addEventListener("mouseleave", () => roll(bottom, top, BELOW), { signal: controller.signal });
    }, button);
    return () => {
      motion.revert();
      controller.abort();
    };
  }, [split]);

  return (
    <a ref={ref} href={href} className={className}>
      {split ? (
        <div className="button_text" style={{ overflow: "hidden", display: "inline-flex", position: "relative" }}>
          <div className="layer-top">
            <Chars label={label} />
          </div>
          <div className="layer-bottom" style={{ position: "absolute", top: 0, left: 0 }}>
            <Chars label={label} />
          </div>
        </div>
      ) : (
        children
      )}
    </a>
  );
}
