"use client";

import styles from "./CornerFrame.module.css";
import { useScrollStage } from "./scrollStage";

const CHEVRON_ROWS = 3;

// Fixed overlay framing the scene: corner brackets, edge letters and scroll-hint chevrons down both sides.
export function CornerFrame() {
  const { stage } = useScrollStage();
  const classes = [
    styles.cornerFrame,
    stage === "hero" && styles.atHero,
    stage === "photo" && styles.atPhoto,
    stage === "faq" && styles.atFaq,
  ];

  return (
    <div className={classes.filter(Boolean).join(" ")} aria-hidden="true" data-part="hud">
      <div className={styles.shade} data-part="hud-shade" />
      <div className={styles.frame} data-part="hud-frame">
        <div className={styles.left} data-part="hud-left">
          <div className={styles.half} data-part="hud-left-top">
            <Corner className={styles.topLeft} />
            <span className={styles.glyph} data-part="hud-letter-o">O</span>
          </div>
          <div className={styles.half} data-part="hud-left-bottom">
            <span className={styles.letters} data-part="hud-left-letters">
              <span className={styles.glyph} data-part="hud-letter-s">S</span>
              <span className={styles.glyph}>_</span>
            </span>
            <Chevrons />
            <Corner className={styles.bottomLeft} />
          </div>
        </div>
        <div className={styles.right} data-part="hud-right">
          <div className={styles.rightTop} data-part="hud-right-top">
            <Corner className={styles.topRight} />
            <span className={styles.glyph} data-part="hud-right-marks">_</span>
          </div>
          <div className={styles.rightBottom} data-part="hud-right-bottom">
            <span className={styles.glyph}>_</span>
            <Chevrons />
            <Corner className={styles.bottomRight} />
          </div>
        </div>
      </div>
    </div>
  );
}

// One bracket shape, turned to fit each corner; only the top arm reaches into the joint.
function Corner({ className }: { className: string }) {
  return (
    <svg className={`${styles.corner} ${className}`} viewBox="0 0 7 7" data-part="hud-corner">
      <path d="M.5 1v5.68M.68.5H7" fill="none" stroke="currentColor" strokeWidth=".75" />
    </svg>
  );
}

// Three dotted down-chevrons that light up top to bottom, on a loop.
function Chevrons() {
  return (
    <span className={styles.chevrons} data-part="hud-chevrons">
      {Array.from({ length: CHEVRON_ROWS }, (_, row) => (
        <svg key={row} className={styles.chevron} viewBox="0 0 35 31.5" fill="currentColor">
          <circle cx="2.7" cy="7" r="1.6" />
          <circle cx="10.5" cy="13" r="2" />
          <circle cx="17.5" cy="19" r="2.4" />
          <circle cx="24.5" cy="13" r="2" />
          <circle cx="32.3" cy="7" r="1.6" />
        </svg>
      ))}
    </span>
  );
}
