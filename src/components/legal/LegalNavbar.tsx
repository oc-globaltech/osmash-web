import Link from "next/link";

import { HoverButton } from "@/components/shared/HoverButton";
import { OsmashLockup } from "@/components/shared/OsmashLockup";
import { SUPPORT_MAILTO } from "@/components/shared/osmash";

export function LegalNavbar() {
  return (
    <div className="navbar">
      <div className="navbar_content">
        <div className="navbar_container">
          <div className="navbar_sound-wrapper" />
          <Link href="/" className="navbar_logo-link">
            <OsmashLockup />
          </Link>
          <div className="navbar_menu-wrapper">
            <HoverButton href={SUPPORT_MAILTO} className="button is-small hide-tablet" label="Support">
              <div>Support</div>
            </HoverButton>
          </div>
        </div>
      </div>
      <div className="navbar_overlay" />
    </div>
  );
}
