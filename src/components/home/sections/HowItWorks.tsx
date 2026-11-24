"use client";

import { useId } from "react";

import { FAQ, STEPS } from "../content";
import styles from "./HowItWorks.module.css";

// The closing beat: the three steps, always open. The download block opens the site footer, outside <main>.
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
