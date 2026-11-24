import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/shared/Button";
import { OsmashLockup } from "@/components/shared/OsmashLockup";
import { COPYRIGHT, LEGAL_LINKS, STORE_URL, SUPPORT_MAILTO } from "@/components/shared/osmash";

import { DOWNLOAD } from "../content";
import styles from "./SiteFooter.module.css";

// Sits after <main> so it is the page's contentinfo landmark; the download block opens it as one closing unit.
export function SiteFooter() {
  return (
    <footer data-part="footer" className={styles.footer}>
      <Download />
      <div className={styles.primary}>
        <OsmashLockup />
        <div className={styles.links}>
          {/* No prefetch: it preloads the legal pages' CSS, which Chrome flags as unused on the landing. */}
          {LEGAL_LINKS.map((link) => (
            <Link key={link.href} data-part="footer-link" href={link.href} prefetch={false} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </div>
        <Button data-part="footer-support" variant="ghost" href={SUPPORT_MAILTO} className={styles.support}>
          {DOWNLOAD.supportLabel}
        </Button>
      </div>
      <div className={styles.small}>
        <p data-part="download-copyright">{COPYRIGHT}</p>
        <p data-part="footer-made-in">{DOWNLOAD.madeIn}</p>
      </div>
    </footer>
  );
}

function Download() {
  return (
    <div data-part="download" id="download" tabIndex={-1} className={styles.download}>
      <div className={styles.downloadText}>
        <h2 data-part="download-title" className={styles.downloadTitle}>
          {DOWNLOAD.title}
        </h2>
        <p data-part="download-body" className={styles.downloadBody}>
          {DOWNLOAD.body}
        </p>
      </div>
      <div data-part="download-badges" className={styles.badges}>
        <p data-part="download-badges-label" className={styles.badgesLabel}>
          {DOWNLOAD.badgesLabel}
        </p>
        <div className={styles.badgeRow}>
          <a data-part="download-badge-ios" href={STORE_URL} aria-label={DOWNLOAD.appStoreLabel} className={styles.badgeIos}>
            <Image src="/badges/app-store.svg" alt={DOWNLOAD.appStoreAlt} fill sizes="132px" />
          </a>
          <a data-part="download-badge-android" href={STORE_URL} aria-label={DOWNLOAD.googlePlayLabel} className={styles.badgeAndroid}>
            <Image src="/badges/google-play.png" alt={DOWNLOAD.googlePlayAlt} fill sizes="170px" />
          </a>
        </div>
      </div>
    </div>
  );
}
