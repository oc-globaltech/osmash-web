import type { Metadata } from "next";
import type { ReactNode } from "react";

import { FONT_VARIABLES } from "@/app/fonts";
import { LegalNavbar } from "@/components/legal/LegalNavbar";

import "../site.css";

export const metadata: Metadata = {
  robots: { index: false },
};

type LegalLayoutProps = {
  children: ReactNode;
};

export default function LegalLayout({ children }: LegalLayoutProps) {
  return (
    <html className={FONT_VARIABLES} lang="en">
      <body>
        <div className="page-wrapper">
          <div className="main-wrapper">
            {children}
            <LegalNavbar />
          </div>
        </div>
      </body>
    </html>
  );
}
