import Link from "next/link";
import type { ReactNode } from "react";

import { LEGAL_LINKS } from "@/components/shared/osmash";

import styles from "./LegalDocument.module.css";

const STATUS = "Draft, pending legal review · Last updated 3 November 2026";

type LegalPath = (typeof LEGAL_LINKS)[number]["href"];

type LegalDocumentProps = {
  title: string;
  path: LegalPath;
  children: ReactNode;
};

export function LegalDocument({ title, path, children }: LegalDocumentProps) {
  return (
    <main className={styles.document} data-part="legal">
      <div className={styles.columns}>
        <div className={styles.aside} data-part="legal-aside">
          <div>
            <h1 className={styles.title} data-part="legal-title">
              {title}
            </h1>
            <p className={styles.status} data-part="legal-status">
              {STATUS}
            </p>
          </div>
          <nav aria-label="Legal" className={styles.links} data-part="legal-links">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={link.href === path ? "page" : undefined}
                className={styles.link}
                data-part="legal-link"
              >
                <span className={styles.dot} data-part="legal-link-dot" />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className={styles.content} data-part="legal-content">
          <div className={styles.text} data-part="legal-text">
            {children}
          </div>
        </div>
      </div>
      <div className={styles.fade} data-part="legal-overlay" />
    </main>
  );
}
