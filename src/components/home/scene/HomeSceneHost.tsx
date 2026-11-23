"use client";

import { useEffect, useRef } from "react";

import { gsap, ScrollTrigger } from "@/components/shared/gsap";
import { useCarousel } from "../homeContext";

const REVEAL_SECONDS = 0.4;

// Mount point for the WebGL canvas, last inside <main>; three.js loads only on the client.
export function HomeSceneHost() {
  const hostRef = useRef<HTMLDivElement>(null);
  const carousel = useCarousel();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const controller = new AbortController();
    const motion = gsap.context(() => undefined, host);
    const reveal = () =>
      motion.add(() => {
        gsap.fromTo("canvas", { autoAlpha: 0 }, { autoAlpha: 1, duration: REVEAL_SECONDS, ease: "power2.out" });
        ScrollTrigger.refresh();
      });
    void import("./createHomeScene").then(({ createHomeScene }) => {
      if (controller.signal.aborted) return;
      createHomeScene(host, carousel, { signal: controller.signal, onReady: reveal });
    });
    return () => {
      motion.revert();
      controller.abort();
    };
  }, [carousel]);

  return <div ref={hostRef} style={{ display: "contents" }} />;
}
