import type { Metadata } from "next";
import localFont from "next/font/local";
import { Instrument_Serif, Roboto_Mono } from "next/font/google";
import "./globals.css";

const clash = localFont({
  variable: "--font-clash",
  src: [
    { path: "./fonts/clash-display-500.woff2", weight: "500" },
    { path: "./fonts/clash-display-600.woff2", weight: "600" },
  ],
});

const general = localFont({
  variable: "--font-general",
  src: [
    { path: "./fonts/general-sans-400.woff2", weight: "400" },
    { path: "./fonts/general-sans-500.woff2", weight: "500" },
    { path: "./fonts/general-sans-600.woff2", weight: "600" },
  ],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "O'Smash — Badminton coaching, run from the court",
  description:
    "Sessions, QR attendance and monthly fees for badminton academies, solo coaches, players and parents. Coming soon to the App Store and Google Play.",
  openGraph: {
    title: "O'Smash — Badminton coaching, run from the court",
    description:
      "Sessions, QR attendance and monthly fees for badminton academies, solo coaches, players and parents.",
    images: ["/photos/smash-jump.jpg"],
  },
};

// Runs before paint, so animated elements start hidden only when motion will play.
const motionFlag = `if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${clash.variable} ${general.variable} ${instrument.variable} ${robotoMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionFlag }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
