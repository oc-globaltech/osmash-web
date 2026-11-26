import { gsap } from "@/components/shared/gsap";
import { HANDOVER_EASE, KEYFRAMES, POSE_EASE } from "./keyframes";
import { clamp, lerp } from "./numeric";
import { INITIAL_POSE, type ScenePose, type StageKeyframe } from "./params";
import type { StageBand } from "./stageLayout";

// By default a transition starts this far into the previous stage and lands at the top of the next one.
const TRANSITION_START = 0.7;

type PoseKey = keyof ScenePose;
type Stop = { band: StageBand; pose: ScenePose; drag: boolean; transitionStart: number };

export const resolvePose = (keyframe: StageKeyframe): ScenePose => ({ ...INITIAL_POSE, ...keyframe.pose });

// Phone widths reframe the model and camera distance only.
export const resolvePhonePose = (keyframe: StageKeyframe): ScenePose => ({ ...resolvePose(keyframe), ...keyframe.phone });

const POSE_KEYS = Object.keys(INITIAL_POSE) as PoseKey[];
const easePose = gsap.parseEase(POSE_EASE);
const easeHandover = gsap.parseEase(HANDOVER_EASE);

function blend(from: ScenePose, to: ScenePose, t: number): ScenePose {
  const poseT = easePose(t);
  const handoverT = easeHandover(t);
  const pose = { ...from };
  POSE_KEYS.forEach((key) => (pose[key] = lerp(from[key], to[key], key === "handover" ? handoverT : poseT)));
  return pose;
}

// Scene pose as a pure function of the scroll position: each stage's pose holds while it is read.
export class PoseTrack {
  private readonly stops: Stop[];

  constructor(bands: StageBand[], resolve: (keyframe: StageKeyframe) => ScenePose) {
    this.stops = KEYFRAMES.flatMap((keyframe) => {
      const band = bands.find(({ stage }) => stage === keyframe.stage);
      const transitionStart = keyframe.transitionStart ?? TRANSITION_START;
      return band ? [{ band, pose: resolve(keyframe), drag: keyframe.drag, transitionStart }] : [];
    });
  }

  sample(scroll: number): ScenePose {
    const next = this.stops.findLastIndex((stop, i) => i > 0 && scroll >= this.transitionStart(i));
    if (next < 1) return { ...(this.stops[0]?.pose ?? INITIAL_POSE) };
    const start = this.transitionStart(next);
    const end = this.stops[next].band.top;
    const t = end > start ? clamp((scroll - start) / (end - start), 0, 1) : 1;
    return blend(this.stops[next - 1].pose, this.stops[next].pose, t);
  }

  // Drag follows the stage that holds the middle of the viewport.
  dragEnabled(scroll: number, viewportHeight: number): boolean {
    const middle = scroll + viewportHeight / 2;
    return this.stops.findLast((stop) => stop.band.top <= middle)?.drag ?? false;
  }

  // 0 at the top of the page, 1 once the hero has scrolled away.
  heroShare(scroll: number): number {
    const hero = this.stops[0]?.band;
    return hero && hero.height > 0 ? clamp(scroll / hero.height, 0, 1) : 1;
  }

  private transitionStart(index: number): number {
    const previous = this.stops[index - 1].band;
    return previous.top + previous.height * this.stops[index].transitionStart;
  }
}
