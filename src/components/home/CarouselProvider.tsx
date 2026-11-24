"use client";

import { useState, type ReactNode } from "react";

import { CarouselStore } from "./carousel";
import { CarouselContext } from "./carouselContext";

// One carousel per page load, shared by the scene and every part that follows the active slide.
export function CarouselProvider({ children }: { children: ReactNode }) {
  const [carousel] = useState(() => new CarouselStore());
  return <CarouselContext value={carousel}>{children}</CarouselContext>;
}
