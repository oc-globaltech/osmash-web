import { FEATURES } from "./features";
import { roundToStep, wrap } from "./scene/math";

export const SLIDE_COUNT = FEATURES.length;
// World units between two shuttles on the hero carousel.
export const CAROUSEL_SPACING = 3.5;
// An odd slide count centres the carousel half a step over.
const CAROUSEL_OFFSET = SLIDE_COUNT % 2 === 0 ? 0 : 1.5;

export type CarouselChange = { index: number; previous: number };
type CarouselListener = (change: CarouselChange) => void;

// Carousel position shared by the WebGL scene (writes every frame) and the DOM sections (react to index changes).
export class CarouselStore {
  target = CAROUSEL_OFFSET;
  position = CAROUSEL_OFFSET;
  index = 0;
  private lastIndex = 0;
  private readonly listeners = new Set<CarouselListener>();

  subscribe(listener: CarouselListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  snappedTarget(): number {
    return roundToStep(this.target + CAROUSEL_OFFSET, CAROUSEL_SPACING) - CAROUSEL_OFFSET;
  }

  goTo(index: number): void {
    this.target = index * CAROUSEL_SPACING - CAROUSEL_OFFSET;
  }

  previous(): void {
    this.goTo(this.unwrappedIndex() - 1);
  }

  next(): void {
    this.goTo(this.unwrappedIndex() + 1);
  }

  // Called once per frame after the position moves; notifies listeners when the slide changes.
  syncIndex(): void {
    const index = wrap(this.unwrappedIndex(), 0, SLIDE_COUNT);
    if (index !== this.lastIndex) {
      const change = { index, previous: this.lastIndex };
      this.listeners.forEach((listener) => listener(change));
      this.lastIndex = index;
    }
    this.index = index;
  }

  private unwrappedIndex(): number {
    return roundToStep((this.position + CAROUSEL_OFFSET) / CAROUSEL_SPACING, 1);
  }
}
