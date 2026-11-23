"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/components/shared/gsap";

const ARROW_IN = { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" };
const ARROW_DRIFT = 100;

// The three chevrons of each scroll hint fade in top to bottom, then out together, on a loop.
function loopScrollHint(wrapper: Element): void {
  const arrows = wrapper.querySelectorAll("svg > g");
  if (arrows.length !== 3) return;
  const [first, middle, last] = arrows;
  gsap.set(arrows, { opacity: 0, scale: 0, transformOrigin: "50% 50%" });
  gsap.set(first, { y: ARROW_DRIFT });
  gsap.set(last, { y: -ARROW_DRIFT });
  gsap
    .timeline({ repeat: -1, repeatDelay: 0.3 })
    .to(first, { ...ARROW_IN, y: 0 })
    .to(middle, { ...ARROW_IN }, "-=0.4")
    .to(last, { ...ARROW_IN, y: 0 }, "-=0.4")
    .to(arrows, { opacity: 0, duration: 0.4, ease: "power2.in", stagger: 0.25 }, "+=0.3");
}

export function Hud() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hud = ref.current;
    if (!hud) return;
    const motion = gsap.context(() => hud.querySelectorAll(".icon-scroll_wrapper").forEach(loopScrollHint), hud);
    return () => motion.revert();
  }, []);

  return (
    <div ref={ref} className="hud">
      <div className="gradient_overlay" />
      <div className="hud_container">
        <div className="hud_left">
          <div className="hud_left-top">
            <div className="icon-embed-xtiny">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 9 9" fill="none">
                <path d="M0.5 8.5L0.499999 2.5C0.499998 1.39543 1.39543 0.500001 2.5 0.500001L8.5 0.499999" stroke="currentColor" strokeLinecap="round" />
              </svg>
            </div>
            <div>O</div>
          </div>
          <div className="hud_left-bottom">
            <div className="hud_left-bottom-top">
              <div>S</div>
              <div>_</div>
            </div>
            <div className="icon-scroll_wrapper">
              <div className="code-embed">
                {" "}
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 35 146">
                  <g>
                    <path fill="currentColor" fillOpacity="0.6" d="M7.6,9.1c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z" />
                    <path fill="currentColor" d="M15.1,15.7c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z" />
                    <path fill="currentColor" fillOpacity="0.6" d="M22.6,9.1c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z" />
                    <path fill="currentColor" fillOpacity="0.3" d="M30.2,2.4C30.2,1.1,31.3,0,32.6,0s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z" />
                    <path fill="currentColor" fillOpacity="0.3" d="M2.4,0h0C3.7,0,4.8,1.1,4.8,2.4h0c0,1.3-1.1,2.4-2.4,2.4h0C1.1,4.8,0,3.7,0,2.4H0C0,1.1,1.1,0,2.4,0Z" />
                  </g>
                  <g>
                    <path fill="currentColor" fillOpacity="0.6" d="M7.6,73c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z" />
                    <path fill="currentColor" d="M15.1,79.7c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z" />
                    <path fill="currentColor" fillOpacity="0.6" d="M22.6,73c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z" />
                    <path fill="currentColor" fillOpacity="0.3" d="M30.2,66.4c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z" />
                    <path fill="currentColor" fillOpacity="0.3" d="M2.4,64h0c1.3,0,2.4,1.1,2.4,2.4h0c0,1.3-1.1,2.4-2.4,2.4h0C1.1,68.7,0,67.7,0,66.4H0C0,65,1.1,64,2.4,64Z" />
                  </g>
                  <g>
                    <path fill="currentColor" fillOpacity="0.6" d="M7.6,137c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z" />
                    <path fill="currentColor" d="M15.1,143.7c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z" />
                    <path fill="currentColor" fillOpacity="0.6" d="M22.6,137c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z" />
                    <path fill="currentColor" fillOpacity="0.3" d="M30.2,130.3c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z" />
                    <path fill="currentColor" fillOpacity="0.3" d="M2.4,128h0c1.3,0,2.4,1.1,2.4,2.4h0c0,1.3-1.1,2.4-2.4,2.4h0C1.1,132.7,0,131.6,0,130.3H0C0,129,1.1,128,2.4,128Z" />
                  </g>
                </svg>
              </div>
            </div>
            <div className="icon-embed-xtiny">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 9 9" fill="none">
                <path d="M8.5 8.5L2.5 8.5C1.39543 8.5 0.5 7.60457 0.5 6.5L0.499999 0.5" stroke="currentColor" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
        <div className="hud_right">
          <div className="hud_right-top">
            <div className="icon-embed-xtiny">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 9 9" fill="none">
                <path d="M0.5 0.5L6.5 0.499999C7.60457 0.499999 8.5 1.39543 8.5 2.5L8.5 8.5" stroke="currentColor" strokeLinecap="round" />
              </svg>
            </div>
            <div className="hud_right-top-bottom">
              <div>_</div>
              <div className="hide">/</div>
            </div>
          </div>
          <div className="hud_right-bottom">
            <div className="icon-scroll_wrapper">
              <div className="code-embed">
                {" "}
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 35 146">
                  <g>
                    <path fill="currentColor" fillOpacity="0.6" d="M7.6,9.1c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z" />
                    <path fill="currentColor" d="M15.1,15.7c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z" />
                    <path fill="currentColor" fillOpacity="0.6" d="M22.6,9.1c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z" />
                    <path fill="currentColor" fillOpacity="0.3" d="M30.2,2.4C30.2,1.1,31.3,0,32.6,0s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z" />
                    <path fill="currentColor" fillOpacity="0.3" d="M2.4,0h0C3.7,0,4.8,1.1,4.8,2.4h0c0,1.3-1.1,2.4-2.4,2.4h0C1.1,4.8,0,3.7,0,2.4H0C0,1.1,1.1,0,2.4,0Z" />
                  </g>
                  <g>
                    <path fill="currentColor" fillOpacity="0.6" d="M7.6,73c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z" />
                    <path fill="currentColor" d="M15.1,79.7c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z" />
                    <path fill="currentColor" fillOpacity="0.6" d="M22.6,73c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z" />
                    <path fill="currentColor" fillOpacity="0.3" d="M30.2,66.4c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z" />
                    <path fill="currentColor" fillOpacity="0.3" d="M2.4,64h0c1.3,0,2.4,1.1,2.4,2.4h0c0,1.3-1.1,2.4-2.4,2.4h0C1.1,68.7,0,67.7,0,66.4H0C0,65,1.1,64,2.4,64Z" />
                  </g>
                  <g>
                    <path fill="currentColor" fillOpacity="0.6" d="M7.6,137c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z" />
                    <path fill="currentColor" d="M15.1,143.7c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z" />
                    <path fill="currentColor" fillOpacity="0.6" d="M22.6,137c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z" />
                    <path fill="currentColor" fillOpacity="0.3" d="M30.2,130.3c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z" />
                    <path fill="currentColor" fillOpacity="0.3" d="M2.4,128h0c1.3,0,2.4,1.1,2.4,2.4h0c0,1.3-1.1,2.4-2.4,2.4h0C1.1,132.7,0,131.6,0,130.3H0C0,129,1.1,128,2.4,128Z" />
                  </g>
                </svg>
              </div>
            </div>
            <div>_</div>
            <div className="icon-embed-xtiny">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 9 9" fill="none">
                <path d="M8.5 0.5L8.5 6.5C8.5 7.60457 7.60457 8.5 6.5 8.5L0.500001 8.5" stroke="currentColor" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
