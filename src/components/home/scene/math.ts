export const wrap = (value: number, min: number, max: number): number => {
  const size = max - min;
  const remainder = value % size;
  return (remainder < 0 ? remainder + size : remainder) + min;
};

export const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

export const lerp = (from: number, to: number, t: number): number => from + (to - from) * t;

export const roundToStep = (value: number, step: number): number => Math.round(value / step) * step;

export const degrees = (angle: number): number => (Math.PI / 180) * angle;

export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

// First of equally close values wins.
export function closestIndex(values: readonly number[], goal: number): number {
  let best = Infinity;
  let index = -1;
  values.forEach((value, i) => {
    if (Math.abs(value - goal) < Math.abs(best - goal)) {
      best = value;
      index = i;
    }
  });
  return index;
}

export function debounce<Args extends unknown[]>(callback: (...args: Args) => void, waitMs: number): (...args: Args) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), waitMs);
  };
}
