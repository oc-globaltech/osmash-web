import { createContext, use } from "react";

import type { CarouselStore } from "./carousel";

export const CarouselContext = createContext<CarouselStore | null>(null);

export function useCarousel(): CarouselStore {
  const carousel = use(CarouselContext);
  if (!carousel) throw new Error("useCarousel needs a CarouselContext provider above it");
  return carousel;
}
