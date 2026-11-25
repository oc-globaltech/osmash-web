import Link from "next/link";

import { Button } from "@/components/shared/Button";
import { OsmashLockup } from "@/components/shared/OsmashLockup";
import { SUPPORT_MAILTO } from "@/components/shared/osmash";

import styles from "./LegalHeader.module.css";

// Solid sticky bar: the logo leads home, Support opens a mail to the team.
export function LegalHeader() {
  return (
    <header className={styles.header} data-part="nav">
      <div className={styles.bar} data-part="nav-bar">
        <Link href="/" className={styles.home} data-part="nav-logo">
          <OsmashLockup />
        </Link>
        <Button href={SUPPORT_MAILTO} className={styles.support} data-part="nav-cta">
          Support
        </Button>
      </div>
    </header>
  );
}
