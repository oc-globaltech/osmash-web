import { createContext, use } from "react";

import type { CarouselStore } from "./carouselStore";

export const CarouselContext = createContext<CarouselStore | null>(null);

export function useCarousel(): CarouselStore {
  const carousel = use(CarouselContext);
  if (!carousel) throw new Error("useCarousel must be used inside <HomeExperience>");
  return carousel;
}
