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

// Doc nav beside the document on desktop, a row of links above it below 1024px.
export function LegalDocument({ title, path, children }: LegalDocumentProps) {
  return (
    <main className={styles.document} data-part="legal">
      <aside className={styles.aside} data-part="legal-aside">
        <nav aria-label="Legal" data-part="legal-links">
          <ul className={styles.links}>
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={link.href === path ? "page" : undefined}
                  className={styles.link}
                  data-part="legal-link"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <article className={styles.content} data-part="legal-content">
        <header className={styles.intro}>
          <h1 className={styles.title} data-part="legal-title">
            {title}
          </h1>
          <p className={styles.status} data-part="legal-status">
            {STATUS}
          </p>
        </header>
        <div className={styles.text} data-part="legal-text">
          {children}
        </div>
      </article>
    </main>
  );
}
