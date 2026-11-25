import type { ReactNode } from "react";

export type PlayerPoint = {
  title: string;
  body: string;
  icon: ReactNode;
};

export type Step = {
  title: string;
  body: string;
  shot: { src: string; alt: string };
};

// Anchor ids: #product (hero), #players (first player point), #how (steps), #download.
export const NAV = {
  links: [
    { href: "#product", label: "Product" },
    { href: "#players", label: "Players" },
    { href: "#how", label: "How it works" },
    { href: "#download", label: "Coming soon" },
  ],
  menuLabel: "Menu",
} as const;

export const HERO = {
  // Read by screen readers only; the slide tags are the visible headline.
  heading: "Smash your limits",
  scrollHint: "Scroll down",
} as const;

// Above the phone in the close-up and the photo; which word shows depends on the input.
export const SLIDE_HINT = {
  pointer: "Drag",
  touch: "Swipe",
} as const;

export const SUBHEAD = "For players & guardians";

// Lucide icons MapPin, QrCode, Wallet and Users (ISC), inlined.
function LucideIcon({ children }: { children: ReactNode }) {
  return (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

export const PLAYER_POINTS: PlayerPoint[] = [
  {
    title: "Find a coach near you",
    body: "Pick where you train and see the academies and solo coaches near it, with their courts.",
    icon: (
      <LucideIcon>
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
      </LucideIcon>
    ),
  },
  {
    title: "Check in with a scan",
    body: "Scan your coach's session QR when you arrive. Your coach sees you on the list.",
    icon: (
      <LucideIcon>
        <rect width="5" height="5" x="3" y="3" rx="1" />
        <rect width="5" height="5" x="16" y="3" rx="1" />
        <rect width="5" height="5" x="3" y="16" rx="1" />
        <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
        <path d="M21 21v.01" />
        <path d="M12 7v3a2 2 0 0 1-2 2H7" />
        <path d="M3 12h.01" />
        <path d="M12 3h.01" />
        <path d="M12 16v.01" />
        <path d="M16 12h1" />
        <path d="M21 12v.01" />
        <path d="M12 21v-1" />
      </LucideIcon>
    ),
  },
  {
    title: "Pay the month in the app",
    body: "Pay your academy's monthly fee by card. The money goes straight to the academy.",
    icon: (
      <LucideIcon>
        <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
        <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
      </LucideIcon>
    ),
  },
  {
    title: "Bring your child along",
    body: "Link your child's account, approve their academy and pay their fees.",
    icon: (
      <LucideIcon>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <path d="M16 3.128a4 4 0 0 1 0 7.744" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <circle cx="9" cy="7" r="4" />
      </LucideIcon>
    ),
  },
];

// The three steps of the How it works section.
// The app has no role-picker screen yet; step 1 shows a guardian's home, one of the three roles.
export const STEPS: Step[] = [
  {
    title: "Pick your role",
    body: "Coach, player or guardian. Choose how you use O'Smash.",
    shot: {
      src: "/app-screens/family.webp",
      alt: "Guardian home screen in O'Smash with My QR, Find a coach, My children and an academy invite",
    },
  },
  {
    title: "Join your team",
    body: "Create an academy, or join one with an invite link or code.",
    shot: {
      src: "/app-screens/discover.webp",
      alt: "List of academies and solo coaches in Kuala Lumpur, each with an Ask to join button",
    },
  },
  {
    title: "Get on court",
    body: "Sessions, check-ins and fees run from your phone.",
    shot: {
      src: "/app-screens/player-check-in.webp",
      alt: "Player home screen showing the next session at Court 3 with a Scan to check in button",
    },
  },
];

export const FAQ = {
  label: "How it works",
  titleLines: ["On court in", "three steps"],
} as const;

export const CLOSING_TITLE = "Smash your limits";

export const DOWNLOAD = {
  title: "Ready to smash it?",
  body: "O'Smash is coming to iPhone and Android. Run your next session from the court.",
  badgesLabel: "Coming soon to",
  appStoreLabel: "O'Smash on the App Store, coming soon",
  appStoreAlt: "Download on the App Store",
  googlePlayLabel: "O'Smash on Google Play, coming soon",
  googlePlayAlt: "Get it on Google Play",
  supportLabel: "Support",
  madeIn: "Made in Malaysia",
} as const;
