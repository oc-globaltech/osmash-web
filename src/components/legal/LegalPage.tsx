import Link from "next/link";
import type { ReactNode } from "react";

import { LEGAL_LINKS } from "@/components/shared/osmash";

type LegalPageProps = {
  title: string;
  path: (typeof LEGAL_LINKS)[number]["href"];
  children: ReactNode;
};

// The wording is a draft until legal review.
const DRAFT_STATUS = "Draft, pending legal review · Last updated 3 November 2026";

export function LegalPage({ title, path, children }: LegalPageProps) {
  return (
    <section className="section_header">
      <div className="padding-global">
        <div className="padding-section-small">
          <div className="padding-bottom">
            <div className="legal_grid">
              <div className="legal_grid-left">
                <div>
                  <div className="margin-bottom margin-small">
                    <h1 className="heading-3">{title}</h1>
                  </div>
                  <p className="text-size-medium">{DRAFT_STATUS}</p>
                </div>
                <div className="legal_links">
                  {LEGAL_LINKS.map(({ href, label }) => (
                    <LegalLink key={href} href={href} label={label} isCurrent={href === path} />
                  ))}
                </div>
              </div>
              <div className="max-width-large legal_content">
                <div className="text-rich-text">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overlay_legal" />
    </section>
  );
}

function LegalLink({ href, label, isCurrent }: { href: string; label: string; isCurrent: boolean }) {
  return (
    <Link href={href} aria-current={isCurrent ? "page" : undefined} className="legal_link-item">
      <div className="legal_link-puce" />
      <div>{label}</div>
    </Link>
  );
}
