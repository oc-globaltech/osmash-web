"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";

import { gsap } from "@/components/shared/gsap";
import { HoverButton } from "@/components/shared/HoverButton";
import { OsmashLockup } from "@/components/shared/OsmashLockup";
import { COPYRIGHT, STORE_URL, SUPPORT_MAILTO } from "@/components/shared/osmash";
import { isPlainClick } from "./hashLinkScroll";
import { bindMenu, createMenuMotion, pulseMenuButton, type MenuParts } from "./navbarMenu";

function findMenuParts(navbar: HTMLElement): MenuParts | null {
  const button = navbar.querySelector(".navbar_menu-button");
  const menu = navbar.querySelector<HTMLElement>(".navbar_menu");
  const links = [...(menu?.querySelectorAll<HTMLElement>(".navbar_link") ?? [])];
  if (!button || !menu || !links.length) return null;
  const extras = [menu.querySelector(".navbar_middle"), menu.querySelector(".navbar_bottom")].filter((el) => el !== null);
  return { button, menu, links, extras };
}

// The logo links the home page to itself: a full reload of "/" starts the scene again at the hero; a client
// navigation to the same route would not move. The hash is dropped first, as following the plain link did.
function reloadHome(event: MouseEvent<HTMLAnchorElement>): void {
  if (!isPlainClick(event)) return;
  event.preventDefault();
  history.replaceState(history.state, "", "/");
  window.location.reload();
}

export function Navbar() {
  const ref = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const navbar = ref.current;
    const parts = navbar && findMenuParts(navbar);
    if (!navbar || !parts) return;
    const controller = new AbortController();
    const motion = gsap.context(() => undefined, navbar);
    // The menu links are split by SplitText, which needs the web fonts in place.
    void document.fonts.ready.then(() => {
      if (controller.signal.aborted) return;
      motion.add(() => {
        pulseMenuButton(parts.button, controller.signal);
        bindMenu(parts, createMenuMotion(parts, setMenuOpen), controller.signal);
      });
    });
    return () => {
      controller.abort();
      motion.revert();
    };
  }, []);

  return (
    <div ref={ref} className="navbar">
      <div className="navbar_content">
        <div className="scroll_component">
          <div className="scroll_point" />
          <div className="scroll_wrapper">
            <div className="scroll_indicator">
              <div className="scroll_indicator__core" />
              <div className="scroll_indicator__mid" />
              <div className="scroll_indicator__halo" />
              <div className="scroll_indicator__hotspot" />
            </div>
          </div>
          <div className="scroll_point" />
        </div>
        <div className="navbar_container">
          <div className="navbar_sound-wrapper" />
          <Link href="/" aria-current="page" className="navbar_logo-link" onClick={reloadHome}>
            <OsmashLockup />
          </Link>
          <div className="navbar_menu-wrapper">
            <div className="navbar_relative">
              <div className={`navbar_menu-button${isMenuOpen ? " is-open" : ""}`}>
                <div className="navbar_menu-button-wrapper">
                  <div>
                    <div className="icon-embed-tiny">
                      <svg width="100%" height="100%" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg">
                        <circle fill="currentColor" cx="1" cy="1" r="1" />
                        <circle fill="currentColor" cx="7" cy="1" r="1" />
                        <circle fill="currentColor" cx="7" cy="7" r="1" />
                        <circle fill="currentColor" cx="1" cy="7" r="1" />
                        <circle className="navbar_menu-circle-closed" fill="currentColor" cx="4" cy="4" r="1" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-block">MENU</div>
                </div>
              </div>
              <div className="navbar_menu">
                <div className="navbar_link-list">
                  <a href="#product" className="navbar_link">Product</a>
                  <a href="#benefits-1" className="navbar_link">Players</a>
                  <a href="#how" className="navbar_link">How it works</a>
                  <a href="#download" className="navbar_link">Coming soon</a>
                </div>
                <div className="navbar_middle">
                  <div className="margin-vertical margin-large">
                    <div className="icon-embed-medium">
                      {/* Material Design Icons "badminton" (Apache-2.0). */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12.3 2c-.97.03-1.72.84-1.69 1.8c.01.24.06.47.16.7l.29.64c.04.13-.03.27-.17.31c-.09.05-.19 0-.26-.08l-.42-.55c-.33-.42-.83-.68-1.36-.69c-.97-.02-1.77.75-1.79 1.71c-.01.42.13.82.39 1.16l.42.5h.01c.08.13.05.29-.06.37c-.09.07-.21.07-.29 0L7 7.45c-.34-.26-.75-.4-1.16-.39c-.96.02-1.73.82-1.71 1.79c.01.53.27 1.03.69 1.36l.57.44c.11.1.11.26-.01.35a.23.23 0 0 1-.26.05h-.01l-.61-.28c-.23-.09-.46-.15-.7-.16c-.96-.03-1.77.73-1.8 1.7c0 .72.4 1.38 1.06 1.66l11.39 5.07l4.59-4.59l-5.07-11.39C13.69 2.39 13 1.97 12.3 2m.83 4.1c.42-.01.8.23.96.61l3.05 6.84l-3.95-3.94l-.93-2.11c-.3-.63.16-1.38.87-1.4M9.85 8.85c.27 0 .52.1.71.3l4.81 4.81c.4.38.41 1.01.03 1.41c-.4.4-1.02.41-1.44 0l-4.81-4.81a.987.987 0 0 1-.02-1.41c.19-.2.45-.3.72-.3m-2.72 3.32c.13 0 .27.04.37.09l2.13.94l3.94 3.94l-6.86-3.05c-1.02-.44-.68-1.95.42-1.92m13.15 3.87l-4.24 4.24l.85.85c.76.75 1.86 1.04 2.89.77a3.02 3.02 0 0 0 2.12-2.12c.27-1.03-.02-2.13-.77-2.89z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="navbar_bottom">
                  <div className="navbar_button">
                    <HoverButton href={SUPPORT_MAILTO} className="button is-full" label="Support">
                      <div>Support</div>
                    </HoverButton>
                  </div>
                  <div className="navbar_socials-links">
                    <div className="text-size-tiny">{COPYRIGHT}</div>
                  </div>
                </div>
              </div>
            </div>
            <HoverButton href={STORE_URL} className="button is-small hide-tablet" label="Coming soon">
              <div>Coming soon</div>
            </HoverButton>
          </div>
        </div>
      </div>
      <div className="navbar_overlay" />
    </div>
  );
}
