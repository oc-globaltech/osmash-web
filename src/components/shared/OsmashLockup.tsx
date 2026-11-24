import Image from "next/image";

import styles from "./OsmashLockup.module.css";

// No wordmark asset exists: the lockup is the symbol plus the name set in Clash.
export function OsmashLockup() {
  return (
    <span className={styles.lockup} data-part="lockup">
      <Image src="/images/logo-symbol.png" alt="" width={38} height={28} className={styles.symbol} data-part="lockup-symbol" />
      <span className={styles.name} data-part="lockup-name">O&apos;Smash</span>
    </span>
  );
}
