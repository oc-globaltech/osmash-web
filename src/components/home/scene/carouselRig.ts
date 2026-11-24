import * as THREE from "three";

import { SLIDE_COUNT } from "../carousel";
import { clamp, lerp, wrap } from "./numeric";
import type { ScenePose } from "./params";
import type { Phone } from "./phone/phones";

const { degToRad, smoothstep } = THREE.MathUtils;

// World units between neighbouring slots at ringSpacing 1.
export const SLOT_SPACING = 3.3;
// Hero wave: narrow viewports bend the row more, up to the cap; slots spread a little wider than the stage row,
// recede and shrink away from the centre.
const DESIGN_WIDTH = 1380;
const WIDTH_RATIO_CAP = 2.35;
const HERO_SPREAD = 1.025;
const HERO_WAVE = { height: 0.96, perUnit: 0.267 } as const;
const HERO_DEPTH = { perUnit: 0.756, base: -0.11 } as const;
const HERO_SCALE = { centre: 1.19, perUnit: -0.01 } as const;
// Hand-placed hero turn per slot offset, -3 to 3, in degrees: the shuttle axis leans sideways, tips back,
// then spins about itself. Fractional offsets blend neighbours; further slots keep the end turns.
const HERO_TURNS = [
  { lean: 14.1, tip: -13.5, spin: 20.8 },
  { lean: -13.1, tip: -11.3, spin: 23.9 },
  { lean: -5.7, tip: -31, spin: 19.2 },
  { lean: 11.6, tip: -19.1, spin: 18.5 },
  { lean: 1.8, tip: -9.9, spin: 9.4 },
  { lean: -8.6, tip: -21, spin: 24.2 },
  { lean: -2.4, tip: -29, spin: 21.2 },
] as const;
const HERO_TURN_CENTRE = (HERO_TURNS.length - 1) / 2;
const SHUTTLE_AXIS = new THREE.Vector3(0, 1, 0);
// Ring swirl: slots climb, lean and turn more the further they sit from the centre.
const SWIRL_LIFT_PER_UNIT = 0.014;
const SWIRL_PITCH_PER_UNIT = 0.12;
const SWIRL_SPIN_PER_SLOT = 0.35;
// Handover windows [start, end] on the focused slot's share: the shuttle shrinks away, then the phone grows in from
// edge-on. Both bodies are tiny where the windows overlap, so they never read as passing through each other.
const SHUTTLE_SHRINK_WINDOW = [0, 0.55] as const;
const PHONE_GROW_WINDOW = [0.45, 1] as const;
const PHONE_START_YAW = Math.PI / 2;

export type RigFrame = {
  pose: ScenePose;
  heroShare: number;
  // Carousel position in slides.
  position: number;
  // Smoothed pointer, -1..1 on both axes.
  pointer: { x: number; y: number };
  viewportWidth: number;
};

type SlotPlace = { offset: number; x: number; focus: number };

// Lays the shuttle slots out every frame and hands the focused slot over to its slide's phone.
export class CarouselRig {
  constructor(
    private readonly shuttles: THREE.Group[],
    private readonly phones: Phone[],
  ) {}

  apply(frame: RigFrame): void {
    this.phones.forEach((phone) => (phone.group.visible = false));
    this.shuttles.forEach((shuttle, slot) => {
      const place = this.place(slot, frame);
      poseShuttle(shuttle, place, frame);
      this.handOver(shuttle, slot, place.focus * frame.pose.handover, frame.pose);
    });
  }

  // Signed distance from the centre, in whole slides, of the nearest visible shuttle under the ray.
  offsetUnder(raycaster: THREE.Raycaster, position: number): number | null {
    const hit = raycaster.intersectObjects(this.shuttles.filter((shuttle) => shuttle.visible), true)[0];
    const slot = hit ? this.shuttles.findIndex((shuttle) => shuttle === hit.object.parent) : -1;
    return slot < 0 ? null : Math.round(this.slotOffset(slot, position));
  }

  private slotOffset(slot: number, position: number): number {
    const count = this.shuttles.length;
    return wrap(slot - position, -count / 2, count);
  }

  private place(slot: number, frame: RigFrame): SlotPlace {
    const offset = this.slotOffset(slot, frame.position);
    return { offset, x: offset * SLOT_SPACING * frame.pose.ringSpacing, focus: clamp(1 - Math.abs(offset), 0, 1) };
  }

  private handOver(shuttle: THREE.Group, slot: number, share: number, pose: ScenePose): void {
    if (share > 0) posePhone(this.phones[slot % SLIDE_COUNT], shuttle, share, pose.phoneSway);
    const shuttleSize = 1 - smoothstep(share, ...SHUTTLE_SHRINK_WINDOW);
    shuttle.visible = shuttleSize > 0;
    shuttle.scale.multiplyScalar(shuttleSize);
  }
}

type HeroTurn = { lean: number; tip: number; spin: number };

function heroTurnAt(offset: number): HeroTurn {
  const index = clamp(offset + HERO_TURN_CENTRE, 0, HERO_TURNS.length - 1);
  const below = HERO_TURNS[Math.floor(index)];
  const above = HERO_TURNS[Math.ceil(index)];
  const t = index - Math.floor(index);
  return { lean: lerp(below.lean, above.lean, t), tip: lerp(below.tip, above.tip, t), spin: lerp(below.spin, above.spin, t) };
}

function heroQuaternion({ lean, tip, spin }: HeroTurn): THREE.Quaternion {
  const leanRad = degToRad(lean);
  const axis = new THREE.Vector3(-Math.sin(leanRad), Math.cos(leanRad), Math.tan(degToRad(tip)) * Math.cos(leanRad)).normalize();
  const spinAbout = new THREE.Quaternion().setFromAxisAngle(SHUTTLE_AXIS, degToRad(spin));
  return new THREE.Quaternion().setFromUnitVectors(SHUTTLE_AXIS, axis).multiply(spinAbout);
}

// The hero wave pose, blended into the stage's model pose as the hero scrolls away.
function poseShuttle(shuttle: THREE.Group, place: SlotPlace, frame: RigFrame): void {
  const { pose, heroShare: share, pointer } = frame;
  const wave = pose.heroWave;
  const widthRatio = clamp(DESIGN_WIDTH / frame.viewportWidth, 1, WIDTH_RATIO_CAP);
  const heroY = Math.sin(place.x * HERO_WAVE.perUnit * widthRatio) * HERO_WAVE.height * wave;
  const heroZ = -(Math.abs(place.x) * HERO_DEPTH.perUnit + HERO_DEPTH.base) * wave;
  const swirlX = place.x * pose.ringSwirl;
  shuttle.position.set(
    lerp(place.x * HERO_SPREAD, place.x, share) + pose.modelX,
    lerp(heroY, pose.modelY, share) + swirlX * SWIRL_LIFT_PER_UNIT,
    lerp(heroZ, pose.modelZ, share),
  );
  const heroTurn = new THREE.Quaternion().slerp(heroQuaternion(heroTurnAt(place.offset)), wave);
  const stageTurn = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(degToRad(pose.modelPitch) + swirlX * SWIRL_PITCH_PER_UNIT, degToRad(pose.modelYaw), degToRad(pose.modelRoll)),
  );
  const parallax = pose.pointerAmount * place.focus;
  const pointerTurn = new THREE.Quaternion().setFromEuler(new THREE.Euler(pointer.y * parallax, pointer.x * parallax, 0));
  shuttle.quaternion.slerpQuaternions(heroTurn, stageTurn, share).multiply(pointerTurn);
  shuttle.scale.setScalar(lerp(HERO_SCALE.centre + Math.abs(place.x) * HERO_SCALE.perUnit, pose.modelScale, share));
  const spin = place.offset * pose.ringSwirl * SWIRL_SPIN_PER_SLOT;
  shuttle.children.forEach((part) => (part.rotation.z = spin));
}

// The phone takes the shuttle's pose and grows in while turning from edge-on to its sway.
function posePhone(phone: Phone, shuttle: THREE.Group, share: number, swayDeg: number): void {
  const grow = smoothstep(share, ...PHONE_GROW_WINDOW);
  const { group, pivot } = phone;
  group.visible = grow > 0;
  group.position.copy(shuttle.position);
  group.quaternion.copy(shuttle.quaternion);
  group.scale.copy(shuttle.scale).multiplyScalar(grow);
  pivot.rotation.y = degToRad(swayDeg) + PHONE_START_YAW * (1 - grow);
}
