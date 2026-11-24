"use client";

import { Fragment, useEffect, useRef } from "react";

import { gsap, type SplitText } from "@/components/shared/gsap";

import { PLAYER_POINTS, SUBHEAD, type PlayerPoint } from "../content";
import { PLAYER_STAGES, type StageName } from "../stages";
import { riseIn, setBelow, splitLineChars, splitLines } from "./revealText";
import { fadeIn, fadeOut, watchActiveStage } from "./stageFades";
import styles from "./PlayerPoints.module.css";

// The first point is the #players anchor; the rail links reach the others by these ids.
const ANCHOR_IDS = ["players", "players-2", "players-3", "players-4"] as const;
const RAIL_STAGES: readonly StageName[] = ["closeup", ...PLAYER_STAGES];
const BODY_DELAY = 0.2;
const CHAR_STAGGER = 0.015;

type PointText = { block: HTMLElement; title: SplitText; body: SplitText };

const number = (index: number) => String(index + 1).padStart(2, "0");

function splitPoint(block: HTMLElement): PointText {
  const [title, body] = [block.querySelector("h2"), block.querySelector("p")] as HTMLElement[];
  return {
    block,
    title: splitLineChars(title, { line: styles.titleLine, char: styles.char }),
    body: splitLines(body, styles.bodyLine),
  };
}

function showPoint({ block, title, body }: PointText): void {
  setBelow([...title.chars, ...body.lines]);
  fadeIn(block);
  riseIn(title.chars, { stagger: CHAR_STAGGER });
  riseIn(body.lines, { delay: BODY_DELAY });
}

function markRail(links: HTMLElement[], current: number): void {
  links.forEach((link, index) => {
    link.classList.toggle(styles.current, index === current);
    if (index === current) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

function bindPoints(root: HTMLElement, signal: AbortSignal): void {
  const points = Array.from(root.querySelectorAll<HTMLElement>(`.${styles.text}`), splitPoint);
  const rail = root.querySelector<HTMLElement>(`.${styles.rail}`);
  const links = Array.from(root.querySelectorAll<HTMLElement>(`.${styles.railLink}`));
  let shownIndex = -1;
  watchActiveStage((stage) => {
    const index = PLAYER_STAGES.indexOf(stage as (typeof PLAYER_STAGES)[number]);
    if (rail && RAIL_STAGES.includes(stage)) fadeIn(rail);
    else if (rail) fadeOut(rail);
    markRail(links, index);
    if (index === shownIndex) return;
    if (shownIndex >= 0) fadeOut(points[shownIndex].block);
    if (index >= 0) showPoint(points[index]);
    shownIndex = index;
  }, signal);
  signal.addEventListener(
    "abort",
    () => {
      gsap.killTweensOf(points.map((point) => point.block));
      points.forEach(({ title, body }) => [title, body].forEach((split) => split.revert()));
    },
    { once: true },
  );
}

// Four scroll beats for players, each with its pinned text, plus the rail of round links to them.
export function PlayerPoints() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const controller = new AbortController();
    bindPoints(root, controller.signal);
    return () => controller.abort();
  }, []);

  return (
    <div ref={rootRef} className={styles.points}>
      {PLAYER_POINTS.map((point, index) => (
        <section key={point.title} data-stage={PLAYER_STAGES[index]} id={ANCHOR_IDS[index]} tabIndex={-1} className={styles.stage}>
          <PointText point={point} index={index} />
          {index === 0 && <PointRail />}
        </section>
      ))}
    </div>
  );
}

function PointText({ point, index }: { point: PlayerPoint; index: number }) {
  return (
    <div data-part="player-text" className={styles.text}>
      <div className={styles.label}>
        <span data-part="player-number" className={styles.number}>
          {number(index)}
        </span>
        <span data-part="player-subhead" className={styles.subhead}>
          {SUBHEAD}
        </span>
      </div>
      <h2 data-part="player-title" className={styles.title}>
        {point.title}
      </h2>
      <p data-part="player-body" className={styles.body}>
        {point.body}
      </p>
    </div>
  );
}

function PointRail() {
  return (
    <nav data-part="player-rail" className={styles.rail} aria-label={SUBHEAD}>
      {PLAYER_POINTS.map((point, index) => (
        <Fragment key={point.title}>
          <a data-part="player-rail-link" href={`#${ANCHOR_IDS[index]}`} className={styles.railLink} aria-label={point.title}>
            <span data-part="player-rail-icon" className={styles.icon}>
              {point.icon}
            </span>
          </a>
          {index < PLAYER_POINTS.length - 1 && <span data-part="player-rail-separator" className={styles.separator} aria-hidden="true" />}
        </Fragment>
      ))}
    </nav>
  );
}
