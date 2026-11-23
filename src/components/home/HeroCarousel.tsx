"use client";

import { useEffect, useRef, type PointerEvent } from "react";

import { gsap } from "@/components/shared/gsap";
import { bindCarouselChrome, indexAtPointer } from "./carouselMotion";
import { FEATURES } from "./features";
import { useCarousel } from "./homeContext";

export function HeroCarousel() {
  const ref = useRef<HTMLElement>(null);
  const dragging = useRef(false);
  const carousel = useCarousel();

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const controller = new AbortController();
    let unsubscribe = () => {};
    const motion = gsap.context(() => {
      unsubscribe = bindCarouselChrome(section, carousel, controller.signal);
    }, section);
    return () => {
      controller.abort();
      unsubscribe();
      motion.revert();
    };
  }, [carousel]);

  // Pressing or dragging along the pagination bar jumps to the slide under the pointer.
  const goToPointer = (event: PointerEvent<HTMLDivElement>) => {
    const svg = event.currentTarget.querySelector("svg");
    if (!svg) return;
    const index = indexAtPointer(svg, event.clientX);
    if (index !== carousel.index) carousel.goTo(index);
  };
  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    goToPointer(event);
  };
  const stopDrag = () => {
    dragging.current = false;
  };

  return (
    <section ref={ref} id="product" className="section is-hero">
      <div className="hero_container">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-bottom padding-medium">
              <div className="max-width-medium align-center">
                <div className="hero_gradient-wrapper">
                  <div className="hero_gradient-position">
                    <div className="hero_gradient" />
                  </div>
                  <div className="hero_gradient-blur" />
                </div>
                <h1 style={{ position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: "0" }}>Smash your limits</h1>
                <div className="carousel_title-collection">
                  <div role="list" className="carousel_list is-hero">
                    {FEATURES.map(({ tag, body }) => (
                      <div key={tag} role="listitem" className="carousel_slide">
                        <div className="carousel_title">
                          <div className="carousel_title-embed">
                            <div className="heading-style-h2">
                              <span data-anim="chars-mask">{tag}</span>
                            </div>
                          </div>
                        </div>
                        <div className="margin-top margin-small hide">
                          <p>{body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="carousel_nav">
                  <div className="carousel_arrow is-prev" onClick={() => carousel.previous()}>
                    <div className="icon-embed-custom">
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 17 32" fill="none">
                        <path d="M2.11495 13.4458C3.28298 13.4458 4.22986 14.3927 4.22986 15.5607C4.22986 16.7287 3.28298 17.6756 2.11495 17.6756C0.946913 17.6756 3.33786e-05 16.7287 3.33786e-05 15.5607C3.33786e-05 14.3927 0.946913 13.4458 2.11495 13.4458Z" fill="currentColor" />
                        <path d="M8.04854 6.77686C9.21657 6.77686 10.1635 7.72373 10.1635 8.89177C10.1635 10.0598 9.21657 11.0067 8.04854 11.0067C6.88051 11.0067 5.93363 10.0598 5.93363 8.89177C5.93363 7.72373 6.88051 6.77686 8.04854 6.77686Z" fill="currentColor" fillOpacity="0.6" />
                        <path d="M8.04854 20.1143C9.21657 20.1143 10.1635 21.0611 10.1635 22.2292C10.1635 23.3972 9.21657 24.3441 8.04854 24.3441C6.88051 24.3441 5.93363 23.3972 5.93363 22.2292C5.93363 21.0611 6.88051 20.1143 8.04854 20.1143Z" fill="currentColor" fillOpacity="0.6" />
                        <path d="M13.9823 26.8911C15.1503 26.8911 16.0972 27.838 16.0972 29.006C16.0972 30.1741 15.1503 31.1209 13.9823 31.1209C12.8142 31.1209 11.8673 30.1741 11.8673 29.006C11.8673 27.838 12.8142 26.8911 13.9823 26.8911Z" fill="currentColor" fillOpacity="0.3" />
                        <rect x="16.0972" y="7.03622e-07" width="4.22982" height="4.22983" rx="2.11491" transform="rotate(90 16.0972 7.03622e-07)" fill="currentColor" fillOpacity="0.3" />
                      </svg>
                    </div>
                  </div>
                  <div className="carousel_arrow is-next" onClick={() => carousel.next()}>
                    <div className="icon-embed-custom">
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 17 32" fill="none">
                        <path d="M13.9822 13.4458C12.8142 13.4458 11.8673 14.3927 11.8673 15.5607C11.8673 16.7287 12.8142 17.6756 13.9822 17.6756C15.1503 17.6756 16.0971 16.7287 16.0971 15.5607C16.0971 14.3927 15.1503 13.4458 13.9822 13.4458Z" fill="currentColor" />
                        <path d="M8.04863 6.77686C6.8806 6.77686 5.93372 7.72373 5.93372 8.89177C5.93372 10.0598 6.8806 11.0067 8.04863 11.0067C9.21666 11.0067 10.1635 10.0598 10.1635 8.89177C10.1635 7.72373 9.21666 6.77686 8.04863 6.77686Z" fill="currentColor" fillOpacity="0.6" />
                        <path d="M8.04863 20.1143C6.8806 20.1143 5.93372 21.0611 5.93372 22.2292C5.93372 23.3972 6.8806 24.3441 8.04863 24.3441C9.21666 24.3441 10.1635 23.3972 10.1635 22.2292C10.1635 21.0611 9.21666 20.1143 8.04863 20.1143Z" fill="currentColor" fillOpacity="0.6" />
                        <path d="M2.11491 26.8911C0.946879 26.8911 0 27.838 0 29.006C0 30.1741 0.946879 31.1209 2.11491 31.1209C3.28295 31.1209 4.22983 30.1741 4.22983 29.006C4.22983 27.838 3.28295 26.8911 2.11491 26.8911Z" fill="currentColor" fillOpacity="0.3" />
                        <rect width="4.22982" height="4.22983" rx="2.11491" transform="matrix(0 1 1 -4.37114e-08 0 7.03622e-07)" fill="currentColor" fillOpacity="0.3" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div
                  className="carousel_pagination"
                  onPointerDown={startDrag}
                  onPointerMove={(event) => {
                    if (dragging.current) goToPointer(event);
                  }}
                  onPointerUp={stopDrag}
                  onPointerCancel={stopDrag}
                >
                  <svg className="carousel_pagination-svg" viewBox="0 0 1000 40" preserveAspectRatio="none">
                    <defs>
                      <filter id="liquid">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" />
                      </filter>
                    </defs>
                    <g filter="url(#liquid)">
                      <rect className="carousel_pagination-bar" x="0" y="16" width="1000" height="8" rx="4" style={{ fill: "var(--color-scheme-1--accent-secondary)" }} />
                      <circle className="carousel_pagination-dot" cx="0" cy="20" r="18" style={{ fill: "var(--color-scheme-1--accent-secondary)" }} />
                    </g>
                  </svg>
                </div>
                <div className="scroll_discover">Scroll down</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
