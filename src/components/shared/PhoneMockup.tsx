import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./PhoneMockup.module.css";

// Every file in /public/app-screens is one 828 x 1801 phone capture.
const SHOT_WIDTH = 828;
const SHOT_HEIGHT = 1801;

type PhoneMockupProps = ComponentPropsWithoutRef<"div"> & {
  src: string;
  alt: string;
  sizes: string;
};

// A flat CSS twin of the 3D scene phone: satin frame, black glass, punch-hole camera and side buttons.
export function PhoneMockup({ src, alt, sizes, className, ...wrapperProps }: PhoneMockupProps) {
  const classes = [styles.device, className].filter(Boolean).join(" ");
  return (
    <div {...wrapperProps} className={classes}>
      <span aria-hidden="true" className={`${styles.button} ${styles.power}`} />
      <span aria-hidden="true" className={`${styles.button} ${styles.volumeUp}`} />
      <span aria-hidden="true" className={`${styles.button} ${styles.volumeDown}`} />
      <div className={styles.glass}>
        <div className={styles.screen}>
          <Image src={src} alt={alt} width={SHOT_WIDTH} height={SHOT_HEIGHT} sizes={sizes} className={styles.shot} />
          <span aria-hidden="true" className={styles.camera} />
        </div>
      </div>
    </div>
  );
}
