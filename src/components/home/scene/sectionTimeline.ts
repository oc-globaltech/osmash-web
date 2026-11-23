import { gsap } from "@/components/shared/gsap";

import { degrees } from "./math";
import type { Sections } from "./sections";

// Everything the section timeline animates; the frame loop reads it every frame.
export type SceneParams = {
  camPosX: number; camPosY: number; camPosZ: number; camRotX: number; camRotY: number; camRotZ: number; fov: number;
  modelScale: number; modelPosX: number; modelPosY: number; modelPosZ: number; modelRotX: number; modelRotY: number; modelRotZ: number; modelSpin: number;
  spacing: number; wave: number; swirl: number; baseOffset: number;
  lightIntensity: number; lightWidth: number; tintStrength: number; spotIntensity: number; spotY: number;
  pointerInfluence: number; swipeSpeed: number;
  // 0 shows the shuttle, 1 the phone; phoneSway turns the phone about its long axis.
  handover: number; phoneSway: number;
};

export const INITIAL_PARAMS: Readonly<SceneParams> = {
  camPosX: 0, camPosY: 0, camPosZ: 29, camRotX: 0, camRotY: 0, camRotZ: 0, fov: 20,
  modelScale: 1, modelPosX: 0, modelPosY: 0, modelPosZ: 0, modelRotX: 0, modelRotY: 0, modelRotZ: 0, modelSpin: 0,
  spacing: 1, wave: 1, swirl: 0, baseOffset: 0,
  lightIntensity: 50, lightWidth: 1, tintStrength: 1, spotIntensity: 0, spotY: 3,
  pointerInfluence: 0.2, swipeSpeed: 1,
  handover: 0, phoneSway: 0,
};

// The phone's sway leans with the camera roll, alternating from one advantage section to the next.
const PHONE_SWAY = 15;

// Advantage sections share one pose; only the camera roll, model height and shuttle spin change.
const advantage = (camRotZ: number, modelPosY: number, modelSpin: number): SceneParams => ({
  camPosX: 0, camPosY: -2, camPosZ: 12, camRotX: degrees(10), camRotY: 0, camRotZ: degrees(camRotZ), fov: 20,
  modelScale: 1, modelPosX: 0, modelPosY, modelPosZ: 0, modelRotX: 0, modelRotY: 0, modelRotZ: 0, modelSpin: degrees(modelSpin),
  spacing: 2.2, wave: 0, swirl: 0, baseOffset: 3,
  lightIntensity: 0, lightWidth: 1, tintStrength: 0.2, spotIntensity: 35, spotY: 2.2,
  pointerInfluence: 0, swipeSpeed: 1,
  handover: 1, phoneSway: degrees(Math.sign(camRotZ) * PHONE_SWAY),
});

// One step per scroll section, in page order; `swipe` toggles horizontal dragging.
type Keyframe = { section: Partial<SceneParams> } | { swipe: boolean };

const KEYFRAMES: Keyframe[] = [
  { section: { // Hero carousel -> profile
    camPosX: 0, camPosY: 0, camPosZ: 6, camRotX: 0, camRotY: 0, camRotZ: 0, fov: 40,
    modelScale: 1, modelPosX: 0.5, modelPosY: -0.5, modelPosZ: 0, modelRotX: degrees(-37.5), modelRotY: degrees(15), modelRotZ: degrees(22.5), modelSpin: 0,
    spacing: 3.5, wave: 0, swirl: 0, baseOffset: 3,
    lightIntensity: 30, lightWidth: 1, tintStrength: 1, spotIntensity: 0, spotY: 3, pointerInfluence: 0.2, swipeSpeed: 1,
    handover: 1, phoneSway: 0 } },
  { swipe: false },
  { section: advantage(-10, -0.8, 120) },
  { section: advantage(5, -0.48, 130) },
  { section: advantage(-10, 0.02, 120) },
  { section: advantage(5, 0.5, 130) },
  { section: { // Argument
    camPosX: 0, camPosY: 0, camPosZ: 8, camRotX: 0, camRotY: 0, camRotZ: 0, fov: 45,
    modelScale: 1, modelPosX: 0, modelPosY: 0, modelPosZ: -0.5, modelRotX: degrees(-20), modelRotY: 0, modelRotZ: degrees(-5), modelSpin: 0,
    spacing: 5, wave: 0, swirl: 0, baseOffset: 3,
    lightIntensity: 45, lightWidth: 1.5, tintStrength: 2, spotIntensity: 0, spotY: 3, pointerInfluence: 0.2, swipeSpeed: 1,
    handover: 1, phoneSway: 0 } },
  { swipe: true },
  { section: { // Packshot: the phone hands back to the shuttle ring
    camPosX: -3, camPosY: -3.5, camPosZ: 20, camRotX: degrees(10), camRotY: degrees(-9), camRotZ: degrees(-10), fov: 30,
    modelScale: 1, modelPosX: 0, modelPosY: 0, modelPosZ: -0.4, modelRotX: 0, modelRotY: 0, modelRotZ: 0, modelSpin: 0,
    spacing: 0.47, wave: 0, swirl: 1, baseOffset: 20,
    lightIntensity: 10, lightWidth: 3, tintStrength: 2, spotIntensity: 0, spotY: 3, pointerInfluence: 0, swipeSpeed: 2,
    handover: 0, phoneSway: 0 } },
  { section: { // Move offscreen (tint strength carries over)
    camPosX: 0, camPosY: -5.5, camPosZ: 10, camRotX: 0, camRotY: 0, camRotZ: 0, fov: 30,
    modelScale: 1, modelPosX: 0, modelPosY: 0, modelPosZ: -0.4, modelRotX: 0, modelRotY: 0, modelRotZ: 0, modelSpin: 0,
    spacing: 0.6, wave: 0, swirl: 1, baseOffset: 20,
    lightIntensity: 0, lightWidth: 3, spotIntensity: 0, spotY: 3, pointerInfluence: 0, swipeSpeed: 1 } },
  // The page ends here: this state holds through the download section and the footer.
  { swipe: false },
];

export type TimelineLayout = { sections: Sections; scrollHeight: number };

// Paused timeline over the whole page: its progress is seeked to the scroll position every frame.
export function buildSectionTimeline(params: SceneParams, layout: TimelineLayout, swipe: { active: boolean }): gsap.core.Timeline {
  const timeline = gsap.timeline({ defaults: { ease: "power1.inOut" } });
  let section = 0;
  KEYFRAMES.forEach((keyframe) => {
    if ("swipe" in keyframe) timeline.set(swipe, { active: keyframe.swipe });
    else {
      const band = layout.sections.items[section];
      timeline.to(params, { ...keyframe.section, duration: band ? band.height / layout.scrollHeight : 1 });
      section += 1;
    }
  });
  timeline.pause();
  return timeline;
}
