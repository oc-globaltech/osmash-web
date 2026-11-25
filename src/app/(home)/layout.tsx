import type { Metadata } from "next";
import type { ReactNode } from "react";

import { FONT_VARIABLES } from "@/app/fonts";
import { SITE_URL } from "@/components/shared/osmash";

import "../tokens.css";
import "../base.css";

const TITLE = "O'Smash — Badminton coaching, run from the court";
const DESCRIPTION =
  "Sessions, QR attendance and monthly fees for badminton academies, solo coaches, players and parents. Coming soon to the App Store and Google Play.";
const SHARE_DESCRIPTION =
  "Sessions, QR attendance and monthly fees for badminton academies, solo coaches, players and parents.";
const SCROLL_RESTORATION_SCRIPT = "if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: SHARE_DESCRIPTION,
    type: "website",
    images: "/photos/smash-jump.jpg",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: SHARE_DESCRIPTION },
};

type HomeLayoutProps = {
  children: ReactNode;
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <html className={FONT_VARIABLES} lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCROLL_RESTORATION_SCRIPT }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
