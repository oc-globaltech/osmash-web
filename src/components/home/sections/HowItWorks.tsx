"use client";

import { useId } from "react";

import { PhoneMockup } from "@/components/shared/PhoneMockup";
import { FAQ, STEPS } from "../content";
import styles from "./HowItWorks.module.css";

// Rendered mockup width per layout; keep in step with .phone in the module CSS.
const SHOT_SIZES = "(min-width: 1024px) 16rem, (min-width: 640px) 30vw, 62vw";

// The closing beat: the three steps, each below a real app screen. The download block opens the site footer, outside <main>.
export function HowItWorks() {
  const titleId = useId();

  return (
    <section data-stage="faq" id="how" tabIndex={-1} aria-labelledby={titleId} className={styles.stage}>
      <div className={styles.steps}>
        <h2 id={titleId} data-part="faq-title" className={styles.title}>
          {FAQ.titleLines.map((line) => (
            <span key={line} className={styles.titleLine}>
              {line}
            </span>
          ))}
        </h2>
        {/* role="list": Safari drops list semantics once list-style is none. */}
        <ol role="list" data-part="faq-list" className={styles.list}>
          {STEPS.map((step) => (
            <li key={step.title} data-part="faq-item" className={styles.step}>
              <PhoneMockup
                data-part="faq-step-shot"
                src={step.shot.src}
                alt={step.shot.alt}
                sizes={SHOT_SIZES}
                className={styles.phone}
              />
              <h3 data-part="faq-step-title" className={styles.stepTitle}>
                {step.title}
              </h3>
              <p data-part="faq-step-body" className={styles.stepBody}>
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
