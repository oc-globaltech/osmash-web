import type { ScenePose, StageKeyframe } from "./params";

// Camera = orbit around the target: `distance` away, `azimuth` about +Y from +Z, `elevation` up from the
// ground plane, `roll` about the view axis. Each keyframe overrides INITIAL_POSE and holds while its section is read.

// The four player beats share one low camera looking up at the phone; the roll, lift, sway and light alternate.
const PLAYER_SHOT: Partial<ScenePose> = {
  fov: 18, ringSpacing: 2.35, heroWave: 0, tubeGap: 3.4,
  handover: 1, pointerAmount: 0,
};

export const KEYFRAMES: readonly StageKeyframe[] = [
  // The shuttle carousel, straight on and centred.
  { stage: "hero", pose: { targetY: 0, distance: 26.29, elevation: 0.02, fov: 22, keyLight: 3.88, keyCone: 0.55, envLevel: 1.45 }, drag: true },
  // Close-up: the focused shuttle has become the phone, tipped back and turned towards the text column.
  {
    stage: "closeup",
    pose: {
      targetX: 0.03, targetY: 0.04, targetZ: -0.03, distance: 6.51, azimuth: -0.4, elevation: 1.8, fov: 37,
      modelX: 0.03, modelY: -0.46, modelPitch: -35.8, modelYaw: 20.1, modelRoll: 21.8, phoneSway: 1.05,
      ringSpacing: 3.7, heroWave: 0, tubeGap: 3.4, keyLight: 3.2, keyCone: 0.94, envLevel: 1.88, topLight: 1.22,
      handover: 1,
    },
    drag: true,
  },
  {
    stage: "player1",
    pose: {
      ...PLAYER_SHOT, targetY: 0, targetZ: 0.17, distance: 13.44, elevation: -12.2, roll: -9.96,
      modelY: -0.89, modelPitch: 2.1, modelYaw: 1.9, phoneSway: -16.4, keyLight: 0.28, envLevel: 0.11, topLight: 34.7, topLightY: 2.6,
    },
    drag: false,
  },
  {
    stage: "player2",
    pose: {
      ...PLAYER_SHOT, targetY: 0.13, targetZ: 0.09, distance: 13.61, elevation: -8.3, roll: 4.95,
      modelY: -0.45, modelPitch: -0.1, modelYaw: 0.7, phoneSway: 11, keyLight: 0.18, envLevel: 0.3, topLight: 30.4, topLightY: 2.4,
    },
    drag: false,
  },
  {
    stage: "player3",
    pose: {
      ...PLAYER_SHOT, targetY: 0.12, targetZ: 0.1, distance: 13.43, elevation: -9.2, roll: -9.97,
      modelY: 0.04, modelPitch: -1.2, modelYaw: -0.4, phoneSway: -14.9, keyLight: 0.2, envLevel: 0.14, topLight: 35.4, topLightY: 2.67,
    },
    drag: false,
  },
  {
    stage: "player4",
    pose: {
      ...PLAYER_SHOT, targetY: 0.18, targetZ: -0.15, distance: 13.76, elevation: -4.9, roll: 4.96,
      modelY: 0.54, modelPitch: -5.1, modelYaw: 0.6, phoneSway: 14.3, keyLight: 0.11, envLevel: 0.1, topLight: 33.9, topLightY: 2.5,
    },
    drag: false,
  },
  // The phone stands small and centred in front of the photo, seen from above and lit mostly by the room.
  {
    stage: "photo",
    pose: {
      targetX: -0.11, targetY: -0.05, targetZ: -0.31, distance: 10.2, azimuth: 4, elevation: 14.5, roll: -1.3, fov: 41,
      modelY: 0.021, modelZ: -0.45, modelPitch: -30.2, modelYaw: -3.1, modelRoll: -3, phoneSway: -1.7,
      ringSpacing: 5.3, heroWave: 0, tubeGap: 3.4,
      keyLight: 0.11, keyCone: 0.84, envLevel: 4.08, topLight: 8, topLightY: 1.79,
      handover: 1,
    },
    drag: true,
  },
  // Back to the shuttles: a tight swirling ring seen from the left, tubes gone.
  {
    stage: "ring",
    pose: {
      targetX: 0.28, targetY: 0.38, targetZ: -0.59, distance: 19.03, azimuth: -8.7, elevation: 3.8, roll: -8.6, fov: 33,
      modelY: 0.28, modelZ: -0.59, modelPitch: -2.9,
      ringSpacing: 0.5, heroWave: 0, ringSwirl: 1.1, tubeGap: 38,
      keyLight: 1.7, keyCone: 2.96, envLevel: 2.59,
      pointerAmount: 0, dragSpeed: 1.8,
    },
    drag: true,
  },
  // The camera drops below the ring, so the reading pose is empty.
  {
    stage: "faq",
    pose: {
      targetY: -5.45, targetZ: -0.16, distance: 11.5, elevation: 2, fov: 27,
      modelZ: -0.35,
      ringSpacing: 0.64, heroWave: 0, ringSwirl: 1.1, tubeGap: 38,
      keyLight: 0, keyCone: 2.85, envLevel: 1.9,
      pointerAmount: 0,
    },
    drag: false,
  },
];

// GSAP ease names: pose tweens between stages, and the shuttle -> phone handover segments.
export const POSE_EASE = "sine.inOut";
export const HANDOVER_EASE = "power2.inOut";
