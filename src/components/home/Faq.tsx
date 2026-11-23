"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type KeyboardEvent, type Ref } from "react";

import { CustomEase, gsap } from "@/components/shared/gsap";
import { HoverButton } from "@/components/shared/HoverButton";
import { COPYRIGHT, LEGAL_LINKS, STORE_URL, SUPPORT_MAILTO } from "@/components/shared/osmash";

const STEPS = [
  ["Pick your role", "Coach, player or guardian. Choose how you use O'Smash."],
  ["Join your team", "Create an academy, or join one with an invite link or code."],
  ["Get on court", "Sessions, check-ins and fees run from your phone."],
];

// 400ms with the CSS `ease` curve, answer and icon together.
const ACCORDION_TWEEN = { duration: 0.4, ease: CustomEase.create("css-ease", ".25,.1,.25,1"), overwrite: true };
const ICON_OPEN_ROTATION = 180;

function AccordionIcon({ iconRef }: { iconRef: Ref<HTMLDivElement> }) {
  return (
    <div ref={iconRef} className="faq_icon-wrapper">
      <div className="icon-embed-small">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
          <path d="M8 12C8 11.4477 8.44772 11 9 11C9.55228 11 10 11.4477 10 12C10 12.5523 9.55228 13 9 13C8.44772 13 8 12.5523 8 12Z" fill="currentColor" fillOpacity="0.6" />
          <path d="M11 15C11 14.4477 11.4477 14 12 14C12.5523 14 13 14.4477 13 15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15Z" fill="currentColor" />
          <path d="M14 12C14 11.4477 14.4477 11 15 11C15.5523 11 16 11.4477 16 12C16 12.5523 15.5523 13 15 13C14.4477 13 14 12.5523 14 12Z" fill="currentColor" fillOpacity="0.6" />
          <path d="M17 9C17 8.44772 17.4477 8 18 8C18.5523 8 19 8.44772 19 9C19 9.55228 18.5523 10 18 10C17.4477 10 17 9.55228 17 9Z" fill="currentColor" fillOpacity="0.3" />
          <rect x="5" y="8" width="2" height="2" rx="1" fill="currentColor" fillOpacity="0.3" />
        </svg>
      </div>
    </div>
  );
}

// Opening grows the answer to its content height, then lets it size itself; closing shrinks it back to zero.
function StepItem({ title, body }: { title: string; body: string }) {
  const [isOpen, setOpen] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const motion = useRef<gsap.Context | null>(null);
  const answerId = useId();

  useEffect(() => {
    motion.current = gsap.context(() => undefined, itemRef);
    return () => motion.current?.revert();
  }, []);

  const open = (answer: HTMLDivElement) => {
    gsap.to(answer, { height: answer.scrollHeight, ...ACCORDION_TWEEN, onComplete: () => gsap.set(answer, { clearProps: "height" }) });
    gsap.to(iconRef.current, { rotationZ: ICON_OPEN_ROTATION, ...ACCORDION_TWEEN });
  };
  const close = (answer: HTMLDivElement) => {
    gsap.to(answer, { height: 0, ...ACCORDION_TWEEN });
    gsap.to(iconRef.current, { rotationZ: 0, ...ACCORDION_TWEEN });
  };
  const toggle = () => {
    const answer = answerRef.current;
    if (!answer) return;
    motion.current?.add(() => (isOpen ? close(answer) : open(answer)));
    setOpen(!isOpen);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    toggle();
  };

  return (
    <div ref={itemRef} role="listitem">
      <div className="faq_separator" />
      <div className="faq_accordion">
        <div className="faq_question" role="button" tabIndex={0} aria-expanded={isOpen} aria-controls={answerId} onClick={toggle} onKeyDown={onKeyDown}>
          <div className="heading-style-h5">{title}</div>
          <AccordionIcon iconRef={iconRef} />
        </div>
        <div ref={answerRef} id={answerId} inert={!isOpen} style={{ width: "100%", height: "0px" }} className="faq_answer">
          <div className="margin-bottom margin-small">
            <p className="text-size-medium">{body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StoreBadges() {
  return (
    <div className="download_badges">
      <div className="text-size-tiny">Coming soon to</div>
      <div className="download_badge-row">
        <a href={STORE_URL} aria-label="O'Smash on the App Store, coming soon">
          <Image src="/badges/app-store.svg" alt="Download on the App Store" width={120} height={40} className="download_badge is-app-store" />
        </a>
        <a href={STORE_URL} aria-label="O'Smash on Google Play, coming soon">
          <Image src="/badges/google-play.png" alt="Get it on Google Play" width={646} height={250} className="download_badge is-google-play" />
        </a>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section id="how" className="section is-faq">
      <div className="faq_container">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <div className="faq_component">
                <div className="margin-bottom margin-xxlarge">
                  <div className="text-align-center">
                    <div className="margin-bottom margin-small">
                      <div className="text-size-tiny">How it works</div>
                    </div>
                    <div className="margin-bottom margin-small">
                      <h2 className="heading-style-custom-2">
                        On court in
                        <br />
                        three steps
                      </h2>
                    </div>
                    <div className="max-width-large align-center" />
                  </div>
                </div>
                <div className="max-width-large align-center">
                  <div role="list" className="faq_list">
                    {STEPS.map(([title, body]) => (
                      <StepItem key={title} title={title} body={body} />
                    ))}
                  </div>
                  <div className="faq_separator" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="download" className="download_container">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <div className="max-width-medium align-center">
                <div className="text-align-center">
                  <div className="margin-bottom margin-medium">
                    <h2 className="heading-style-h2 text-align-center">Ready to smash it?</h2>
                    <div className="margin-top margin-small">
                      <p className="text-align-center">O&apos;Smash is coming to iPhone and Android. Run your next session from the court.</p>
                    </div>
                  </div>
                  <StoreBadges />
                </div>
              </div>
              <div className="margin-vertical margin-xhuge">
                <div className="text-align-center">
                  <div className="text-size-tiny">{COPYRIGHT}</div>
                </div>
              </div>
              <div className="footer_container">
                <HoverButton href={SUPPORT_MAILTO} className="button is-secondary is-social" label="Support">
                  Support
                </HoverButton>
                <div className="footer_link-list">
                  {LEGAL_LINKS.map(({ href, label }) => (
                    <Link key={href} href={href} className="footer_link">{label}</Link>
                  ))}
                </div>
                <div className="text-size-tiny footer_made-in">Made in Malaysia</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
