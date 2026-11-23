import { Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";

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

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Classes for <html> that declare --font-clash, --font-general and --font-roboto-mono.
export const FONT_VARIABLES = `${clash.variable} ${general.variable} ${robotoMono.variable}`;
