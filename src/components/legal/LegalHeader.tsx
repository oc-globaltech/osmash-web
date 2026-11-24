import Link from "next/link";

import { Button } from "@/components/shared/Button";
import { OsmashLockup } from "@/components/shared/OsmashLockup";
import { SUPPORT_MAILTO } from "@/components/shared/osmash";

import styles from "./LegalHeader.module.css";

export function LegalHeader() {
  return (
    <header className={styles.header} data-part="nav">
      <div className={styles.bar} data-part="nav-bar">
        <span aria-hidden="true" />
        <Link href="/" className={styles.home} data-part="nav-logo">
          <OsmashLockup />
        </Link>
        <div className={styles.actions}>
          <Button href={SUPPORT_MAILTO} className={styles.support} data-part="nav-cta">
            Support
          </Button>
        </div>
      </div>
      <div className={styles.shade} data-part="nav-overlay" />
    </header>
  );
}
