import type Lenis from "lenis";

import { isDesktop } from "@/components/shared/breakpoints";
import type { StageName } from "../stages";
import { clamp } from "./numeric";
import type { StageBand } from "./stageLayout";

// A page lands this far above its stage top, so the beat before it has not fully handed over yet.
const LANDING_ABOVE_PX = 10;
// Paging reaches up to this stage; from there on, scrolling is native.
const LAST_PAGED_STAGE: Readonly<Record<"desktop" | "touch", StageName>> = { desktop: "photo", touch: "faq" };
const STAGE_STEP_SECONDS = 1.5;
// Desktop steps between two player beats are quicker: the scene barely moves there.
const PLAYER_STEP_SECONDS = 1;
const PLAYER_STAGES: ReadonlySet<StageName> = new Set(["player1", "player2", "player3", "player4"]);
// Trackpad inertia keeps firing wheel events after a page lands; a quiet gap marks the next gesture.
const GESTURE_GAP_MS = 160;
const SWIPE_MIN_PX = 32;
const AXIS_LOCK_PX = 6;
// Scroll positions this close to a landing count as resting on it.
const LANDED_PX = 2;

const easeOutCubic = (t: number): number => 1 - (1 - t) ** 3;

type Direction = 1 | -1;
type Touch = { x: number; y: number; axis: "none" | "vertical" | "horizontal"; paging: boolean };
type Page = { landing: number; seconds: number };

// One wheel gesture or vertical swipe moves exactly one stage, from the hero down to the last paged stage;
// past it, scrolling stays native.
export class StagePager {
  private busy = false;
  private lastWheelAt = 0;
  private touch: Touch | null = null;

  constructor(
    private readonly lenis: Lenis,
    private readonly bands: () => readonly StageBand[],
  ) {}

  // Lenis asks before every wheel event; true means the pager handled it.
  takeWheel(event: Event): boolean {
    if (!(event instanceof WheelEvent) || event.ctrlKey) return false;
    const now = performance.now();
    const quiet = now - this.lastWheelAt > GESTURE_GAP_MS;
    this.lastWheelAt = now;
    if (this.busy && this.landed() && quiet) this.busy = false;
    if (this.busy) return consume(event);
    const page = this.pageFrom(event.deltaY > 0 ? 1 : -1);
    if (!page) return false;
    this.glide(page);
    return consume(event);
  }

  // True while the scroll position rests nearest the hero.
  atHero(): boolean {
    return this.nearestStage(this.landings()) === 0;
  }

  // Centre-shuttle click: glide from the hero to the next stage.
  leaveHero(): void {
    const next = this.landings()[1];
    if (next !== undefined) this.glide({ landing: next, seconds: STAGE_STEP_SECONDS });
  }

  bindTouch(signal: AbortSignal): void {
    window.addEventListener("touchstart", (event) => this.onTouchStart(event), { signal, passive: true });
    window.addEventListener("touchmove", (event) => this.onTouchMove(event), { signal, passive: false });
    window.addEventListener("touchend", (event) => this.onTouchEnd(event), { signal });
  }

  private landings(): number[] {
    return this.bands().map(({ top }) => Math.max(top - LANDING_ABOVE_PX, 0));
  }

  private nearestStage(landings: number[]): number {
    const scroll = this.lenis.animatedScroll;
    const distances = landings.map((landing) => Math.abs(landing - scroll));
    return distances.indexOf(Math.min(...distances));
  }

  private lastPagedIndex(): number {
    const stage = LAST_PAGED_STAGE[isDesktop() ? "desktop" : "touch"];
    return this.bands().findIndex((band) => band.stage === stage);
  }

  // The page one stage away from the nearest landing, or null where scrolling stays native or the page is held.
  private pageFrom(direction: Direction): Page | null {
    if (this.lenis.isStopped) return null;
    const landings = this.landings();
    const last = this.lastPagedIndex();
    const current = this.nearestStage(landings);
    if (last < 0 || current >= last) return null;
    const target = clamp(current + direction, 0, last);
    const resting = Math.abs(landings[current] - this.lenis.animatedScroll) <= LANDED_PX;
    if (target === current && resting) return null;
    return { landing: landings[target], seconds: this.secondsBetween(current, target) };
  }

  private secondsBetween(from: number, to: number): number {
    const bands = this.bands();
    const betweenPlayers = PLAYER_STAGES.has(bands[from].stage) && PLAYER_STAGES.has(bands[to].stage);
    return betweenPlayers && isDesktop() ? PLAYER_STEP_SECONDS : STAGE_STEP_SECONDS;
  }

  // Read from Lenis, not from onComplete: a forced scrollTo or a stop() ends the glide without completing it.
  private landed(): boolean {
    return !this.lenis.isSmooth;
  }

  private gliding(): boolean {
    return this.busy && !this.landed();
  }

  private glide({ landing, seconds }: Page): void {
    this.busy = true;
    this.lenis.scrollTo(landing, { duration: seconds, easing: easeOutCubic, lock: true, force: true });
  }

  private onTouchStart(event: TouchEvent): void {
    const point = event.touches[0];
    this.touch = point ? { x: point.clientX, y: point.clientY, axis: "none", paging: false } : null;
  }

  private onTouchMove(event: TouchEvent): void {
    const touch = this.touch;
    const point = event.touches[0];
    if (!touch || !point) return;
    const dx = point.clientX - touch.x;
    const dy = point.clientY - touch.y;
    if (touch.axis === "none" && Math.max(Math.abs(dx), Math.abs(dy)) > AXIS_LOCK_PX) {
      touch.axis = Math.abs(dy) > Math.abs(dx) ? "vertical" : "horizontal";
      // A finger moving up scrolls the page down.
      touch.paging = touch.axis === "vertical" && (this.gliding() || this.pageFrom(dy < 0 ? 1 : -1) !== null);
    }
    if (touch.paging && event.cancelable) event.preventDefault();
  }

  private onTouchEnd(event: TouchEvent): void {
    const touch = this.touch;
    this.touch = null;
    const point = event.changedTouches[0];
    if (!touch?.paging || !point || this.gliding()) return;
    const dy = point.clientY - touch.y;
    if (Math.abs(dy) <= SWIPE_MIN_PX) return;
    const page = this.pageFrom(dy < 0 ? 1 : -1);
    if (page) this.glide(page);
  }
}

function consume(event: Event): true {
  if (event.cancelable) event.preventDefault();
  return true;
}
