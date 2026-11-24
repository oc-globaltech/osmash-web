import { FEATURES } from "./features";
import { damp, wrap } from "./scene/numeric";

export const SLIDE_COUNT = FEATURES.length;
// Share of the gap to the target closed per second, frame-rate independent.
const SETTLE_RATE = 8;

export type CarouselChange = { index: number; previous: number };
type CarouselListener = (change: CarouselChange) => void;

// Carousel position in slides, shared by the scene (moves it every frame) and the page (reacts to index changes).
// Position and target are unbounded so the ring can keep turning; the slide index wraps.
export class CarouselStore {
  index = 0;
  position = 0;
  private target = 0;
  private readonly listeners = new Set<CarouselListener>();

  subscribe(listener: CarouselListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // Turns the shorter way round to the slide.
  goTo(index: number): void {
    const from = Math.round(this.target);
    this.target = from + wrap(index - from, -SLIDE_COUNT / 2, SLIDE_COUNT);
  }

  next(): void {
    this.shift(1);
  }

  previous(): void {
    this.shift(-1);
  }

  // Moves a whole number of slides from the slide it is heading to.
  shift(slides: number): void {
    this.target = Math.round(this.target) + slides;
  }

  // Follows a drag without snapping.
  drag(slides: number): void {
    this.target += slides;
  }

  // Ends a drag on the nearest slide.
  release(): void {
    this.target = Math.round(this.target);
  }

  // Called once per frame; notifies listeners when the centred slide changes.
  step(seconds: number): void {
    this.position = damp(this.position, this.target, SETTLE_RATE, seconds);
    const index = wrap(Math.round(this.position), 0, SLIDE_COUNT);
    if (index === this.index) return;
    const change = { index, previous: this.index };
    this.index = index;
    this.listeners.forEach((listener) => listener(change));
  }
}
