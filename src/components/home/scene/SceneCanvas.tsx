"use client";

import { useEffect, useRef } from "react";

import { onIdle } from "@/components/shared/idle";

import { useCarousel } from "../carouselContext";

const FADE_IN = { duration: 500, easing: "ease-out", fill: "forwards" } as const;

// Fixed WebGL layer behind the page; three.js loads on the client only, after hydration, and builds once idle.
export function SceneCanvas() {
  const hostRef = useRef<HTMLDivElement>(null);
  const carousel = useCarousel();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const controller = new AbortController();
    const { signal } = controller;
    // The chunk downloads at once; the build waits for idle, so it never competes with the hero's first paint.
    const idle = new Promise<void>((resolve) => onIdle(resolve, signal));
    Promise.all([import("./runtime"), idle])
      .then(([{ mountScene }]) => mountScene(host, carousel, signal))
      .then((canvas) => canvas.animate([{ opacity: 0 }, { opacity: 1 }], FADE_IN))
      .catch((error: unknown) => {
        // Unmounted mid-build (StrictMode, navigation): the teardown already runs.
        if (signal.aborted) return;
        // No WebGL (or a failed chunk): tear down what was built and keep the page without the scene.
        controller.abort();
        console.warn("Scene unavailable", error);
      });
    return () => controller.abort();
  }, [carousel]);

  return <div ref={hostRef} style={{ display: "contents" }} />;
}
