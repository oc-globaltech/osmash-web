"use client";

import { useId } from "react";

import { Button } from "@/components/shared/Button";
import { OsmashLockup } from "@/components/shared/OsmashLockup";
import { COPYRIGHT, STORE_URL, SUPPORT_MAILTO } from "@/components/shared/osmash";

import { DOWNLOAD, FAQ, NAV } from "../content";
import { useScrollStage } from "./scrollStage";
import styles from "./TopBar.module.css";
import { useTopBarMenu } from "./topBarMenu";

const LINK_STAGGER_S = 0.08;

// Fixed top bar: centred logo, menu toggle with its menu, and the store button on desktop.
export function TopBar() {
  return (
    <header className={styles.topBar} data-part="nav">
      <div className={styles.bar} data-part="nav-bar">
        <a href="#product" className={styles.logo} data-part="nav-logo">
          <OsmashLockup />
        </a>
        <SectionLabel />
        <div className={styles.actions}>
          <MenuArea />
          {/* A plain span opts out of the letter roll, which would fight the hover fill. */}
          <Button href={STORE_URL} className={styles.cta} data-part="nav-cta">
            <span>{NAV.ctaLabel}</span>
          </Button>
        </div>
      </div>
      <div className={styles.shade} data-part="nav-overlay" aria-hidden="true" />
    </header>
  );
}

// Names the steps section under the logo while it is on screen, until the download block takes over.
function SectionLabel() {
  const { stage, atDownload } = useScrollStage();
  const shown = stage === "faq" && !atDownload;
  return (
    <span className={styles.sectionLabel} data-shown={shown || undefined} aria-hidden="true">
      {FAQ.label}
    </span>
  );
}

function MenuArea() {
  const { open, menuId, menuAreaRef, toggleRef, toggle, closeSheetAfterJump } = useTopBarMenu();

  return (
    <div ref={menuAreaRef} className={styles.menuArea}>
      <button
        ref={toggleRef}
        type="button"
        className={styles.menuToggle}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={toggle}
        data-part="nav-menu-button"
      >
        <MenuIcon />
        <span data-part="nav-menu-button-label">{NAV.menuLabel}</span>
      </button>
      <div id={menuId} className={styles.menu} data-open={open || undefined} data-part="nav-menu">
        <nav aria-label="Main">
          {NAV.links.map((link, order) => (
            <a key={link.href} href={link.href} className={styles.menuLink} onClick={closeSheetAfterJump} data-part="nav-menu-link">
              <span className={styles.menuLinkText} style={{ transitionDelay: `${order * LINK_STAGGER_S}s` }}>
                {link.label}
              </span>
            </a>
          ))}
        </nav>
        <SheetExtras />
      </div>
    </div>
  );
}

// Only the full-screen sheet shows these: the mark, a support button and the copyright line.
function SheetExtras() {
  return (
    <div className={styles.menuExtras}>
      <div className={styles.markArea}>
        <ShuttleMark />
      </div>
      <Button href={SUPPORT_MAILTO} className={styles.support} data-part="nav-menu-support">
        {DOWNLOAD.supportLabel}
      </Button>
      <small className={styles.copyright} data-part="nav-menu-copyright">
        {COPYRIGHT}
      </small>
    </div>
  );
}

// Two lines that cross into a close mark while the menu is open; the toggle's aria-expanded drives it.
function MenuIcon() {
  return (
    <svg className={styles.menuIcon} viewBox="0 0 16 16" aria-hidden="true" data-part="nav-menu-button-icon">
      <line className={styles.menuLineTop} x1="1" y1="8" x2="15" y2="8" />
      <line className={styles.menuLineBottom} x1="1" y1="8" x2="15" y2="8" />
    </svg>
  );
}

// Shuttlecock pointing to the bottom right, drawn along its own axis: a skirt with four scallops and three slots,
// then the cork. The slots are cut out with a mask so the sheet shows through.
function ShuttleMark() {
  const slotMaskId = useId();
  return (
    <svg className={styles.mark} viewBox="0 0 42 42" fill="currentColor" aria-hidden="true" data-part="nav-menu-mark">
      <mask id={slotMaskId} maskUnits="userSpaceOnUse" x="-30" y="-20" width="40" height="40">
        <rect x="-30" y="-20" width="40" height="40" fill="#fff" />
        <g stroke="#000" strokeLinecap="round">
          <line x1="-17.1" y1="-7.4" x2="-7.3" y2="-4.8" strokeWidth="3" />
          <line x1="-17.8" y1="0" x2="-5.5" y2="-0.1" strokeWidth="3.3" />
          <line x1="-17.1" y1="7.5" x2="-7.2" y2="4.8" strokeWidth="3" />
        </g>
      </mask>
      <g transform="translate(29.5 29.5) rotate(45)">
        <g mask={`url(#${slotMaskId})`}>
          <path d="M-22-14 0-5.6v11.2L-22 14Z" />
          <circle cx="-21.9" cy="-10.6" r="2.8" />
          <circle cx="-23.2" cy="-3.5" r="3.1" />
          <circle cx="-23.6" cy="3.6" r="2.9" />
          <circle cx="-21.9" cy="10.6" r="2.9" />
        </g>
        <path d="M3.4-6.5a6.5 6.5 0 0 1 0 13Z" />
      </g>
    </svg>
  );
}
