export const clamp = (value: number, min: number, max: number): number => (value < min ? min : value > max ? max : value);

export const lerp = (from: number, to: number, t: number): number => from + t * (to - from);

// Maps any value into [min, min + span).
export const wrap = (value: number, min: number, span: number): number => min + ((((value - min) % span) + span) % span);

// Frame-rate independent ease toward `goal`: the same share of the gap closes per second at any fps.
export const damp = (current: number, goal: number, ratePerSecond: number, seconds: number): number =>
  lerp(current, goal, 1 - Math.exp(-ratePerSecond * seconds));
