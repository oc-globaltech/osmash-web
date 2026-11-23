"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

import { ScrollTrigger } from "@/components/shared/gsap";

type PlayerPoint = {
  title: string;
  body: string;
  icon: ReactNode;
};

const SUBHEAD = "For players & guardians";

// Lucide icons MapPin, QrCode, Wallet and Users (ISC), inlined.
function LucideIcon({ children }: { children: ReactNode }) {
  return (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const PLAYER_POINTS: PlayerPoint[] = [
  {
    title: "Find a coach near you",
    body: "Pick where you train and see the academies and solo coaches near it, with their courts.",
    icon: (
      <LucideIcon>
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
      </LucideIcon>
    ),
  },
  {
    title: "Check in with a scan",
    body: "Scan your coach's session QR when you arrive. Your coach sees you on the list.",
    icon: (
      <LucideIcon>
        <rect width="5" height="5" x="3" y="3" rx="1" />
        <rect width="5" height="5" x="16" y="3" rx="1" />
        <rect width="5" height="5" x="3" y="16" rx="1" />
        <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
        <path d="M21 21v.01" />
        <path d="M12 7v3a2 2 0 0 1-2 2H7" />
        <path d="M3 12h.01" />
        <path d="M12 3h.01" />
        <path d="M12 16v.01" />
        <path d="M16 12h1" />
        <path d="M21 12v.01" />
        <path d="M12 21v-1" />
      </LucideIcon>
    ),
  },
  {
    title: "Pay the month in the app",
    body: "Pay your academy's monthly fee by card. The money goes straight to the academy.",
    icon: (
      <LucideIcon>
        <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
        <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
      </LucideIcon>
    ),
  },
  {
    title: "Bring your child along",
    body: "Link your child's account, approve their academy and pay their fees.",
    icon: (
      <LucideIcon>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <path d="M16 3.128a4 4 0 0 1 0 7.744" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <circle cx="9" cy="7" r="4" />
      </LucideIcon>
    ),
  },
];

const sectionId = (index: number) => `benefits-${index + 1}`;
const pointNumber = (index: number) => String(index + 1).padStart(2, "0");

type BenefitsNavItemProps = { index: number; title: string; icon: ReactNode; isActive: boolean };

function BenefitsNavItem({ index, title, icon, isActive }: BenefitsNavItemProps) {
  return (
    <>
      {index > 0 && <div className="benefits_icon-separator" />}
      <a href={`#${sectionId(index)}`} aria-label={title} className={`benefits_icon-wrapper${isActive ? " is-active" : ""}`}>
        <div className="benefits_icon">{icon}</div>
      </a>
    </>
  );
}

function BenefitsNav({ active }: { active: boolean[] }) {
  return (
    <div className="div-block">
      <div className="benefits_nav">
        {PLAYER_POINTS.map(({ title, icon }, index) => (
          <BenefitsNavItem key={title} index={index} title={title} icon={icon} isActive={active[index]} />
        ))}
      </div>
    </div>
  );
}

// An icon is active while its section covers the bottom of the viewport.
function useActiveSections(sections: RefObject<(HTMLElement | null)[]>): boolean[] {
  const [active, setActive] = useState(() => PLAYER_POINTS.map(() => false));
  useEffect(() => {
    const triggers = sections.current.map((section, index) =>
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom bottom",
        onToggle: ({ isActive }) => setActive((current) => current.map((value, i) => (i === index ? isActive : value))),
      }),
    );
    return () => triggers.forEach((trigger) => trigger.kill());
  }, [sections]);
  return active;
}

export function Benefits() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const active = useActiveSections(sectionRefs);
  return (
    <>
      {PLAYER_POINTS.map(({ title, body }, index) => (
        <section key={title} ref={(el) => { sectionRefs.current[index] = el; }} id={sectionId(index)} className="section is-benefits">
          <div className="benefits_container">
            <div className="padding-global">
              <div className="container-large">
                <div className="padding-section-medium">
                  <div className="benefits_text">
                    <div className="benefits_max-width">
                      <div className="margin-bottom margin-small">
                        <div className="subhead_wrapper align-center">
                          <div className="subhead">
                            <div className="subhead_icon">
                              <div>{pointNumber(index)}</div>
                            </div>
                            <div className="subhead_text">
                              <div data-anim="chars-mask">{SUBHEAD}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="margin-bottom margin-xsmall">
                        <h2 data-anim="chars-mask">{title}</h2>
                      </div>
                      <p data-anim="lines-mask">{body}</p>
                      <div className="max-width-xsmall" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {index === 0 && <BenefitsNav active={active} />}
        </section>
      ))}
    </>
  );
}
