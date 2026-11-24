import type { StageName } from "../stages";

// Every scene value one stage keyframe can set. Angles are degrees; the camera is an orbit around the target.
export type ScenePose = {
  targetX: number;
  targetY: number;
  targetZ: number;
  distance: number;
  azimuth: number;
  elevation: number;
  roll: number;
  fov: number;
  modelX: number;
  modelY: number;
  modelZ: number;
  modelPitch: number;
  modelYaw: number;
  modelRoll: number;
  modelScale: number;
  ringSpacing: number;
  heroWave: number;
  ringSwirl: number;
  tubeGap: number;
  keyLight: number;
  keyCone: number;
  envLevel: number;
  topLight: number;
  topLightY: number;
  handover: number;
  phoneSway: number;
  pointerAmount: number;
  dragSpeed: number;
};

export type StageKeyframe = {
  stage: StageName;
  pose: Partial<ScenePose>;
  // Phone-width overrides.
  phone?: Partial<Pick<ScenePose, "modelX" | "modelY" | "distance">>;
  drag: boolean;
};

// The hero pose at load; every keyframe is a partial override of it.
export const INITIAL_POSE: Readonly<ScenePose> = {
  targetX: 0,
  targetY: 0.15,
  targetZ: 0,
  distance: 24.5,
  azimuth: 0,
  elevation: 2,
  roll: 0,
  fov: 24,
  modelX: 0,
  modelY: 0,
  modelZ: 0,
  modelPitch: 0,
  modelYaw: 0,
  modelRoll: 0,
  modelScale: 1,
  ringSpacing: 1,
  heroWave: 1,
  ringSwirl: 0,
  tubeGap: 0,
  keyLight: 5.5,
  keyCone: 1,
  envLevel: 1,
  topLight: 0,
  topLightY: 2.6,
  handover: 0,
  phoneSway: 0,
  pointerAmount: 0.15,
  dragSpeed: 1,
};
