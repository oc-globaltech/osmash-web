import type { Metadata } from "next";
import type { ReactNode } from "react";

import { FONT_VARIABLES } from "@/app/fonts";
import { LegalHeader } from "@/components/legal/LegalHeader";

import "../tokens.css";
import "../base.css";

import styles from "./legal.module.css";

export const metadata: Metadata = {
  robots: { index: false },
};

type LegalLayoutProps = {
  children: ReactNode;
};

export default function LegalLayout({ children }: LegalLayoutProps) {
  return (
    <html className={FONT_VARIABLES} lang="en">
      <body className={styles.page}>
        {children}
        <LegalHeader />
      </body>
    </html>
  );
}
