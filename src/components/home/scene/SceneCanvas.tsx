"use client";

import { useEffect, useRef } from "react";

import { useCarousel } from "../carouselContext";

const FADE_IN = { duration: 500, easing: "ease-out", fill: "forwards" } as const;

// Fixed WebGL layer behind the page; three.js loads on the client only, after hydration.
export function SceneCanvas() {
  const hostRef = useRef<HTMLDivElement>(null);
  const carousel = useCarousel();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const controller = new AbortController();
    import("./runtime")
      .then(({ mountScene }) => {
        // StrictMode unmounts before the import resolves: the first mount never builds a canvas.
        if (controller.signal.aborted) return;
        mountScene(host, carousel, controller.signal).animate([{ opacity: 0 }, { opacity: 1 }], FADE_IN);
      })
      .catch((error: unknown) => {
        // No WebGL (or a failed chunk): tear down what was built and keep the page without the scene.
        controller.abort();
        console.warn("Scene unavailable", error);
      });
    return () => controller.abort();
  }, [carousel]);

  return <div ref={hostRef} style={{ display: "contents" }} />;
}
