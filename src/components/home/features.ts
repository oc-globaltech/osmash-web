// A label pinned to one spot on the slide's screenshot; u and v run 0..1 from its top-left corner.
export type ScreenCallout = { label: string; u: number; v: number };

// One carousel slide per feature.
export type Feature = {
  tag: string;
  title: string;
  body: string;
  secondaryColor: string;
  // Decorative photo for the slide (five photos, so match-jump repeats).
  photo: string;
  // What the close-up points out on the screenshot.
  callouts: ScreenCallout[];
};

// Every slide shares the Ink Navy primary; only the secondary changes per slide.
export const FEATURE_PRIMARY_COLOR = "#011D41";

export const FEATURES: Feature[] = [
  {
    tag: "Sessions",
    title: "Run every session from the court.",
    body: "Schedule, courts and sub-coaches in one place, built for the minute between games.",
    secondaryColor: "#0078FB",
    photo: "/photos/night-court.jpg",
    callouts: [
      { label: "Today and the week ahead", u: 0.26, v: 0.18 },
      { label: "Your sessions or other coaches'", u: 0.56, v: 0.27 },
      { label: "Live now, ready for attendance", u: 0.44, v: 0.37 },
      { label: "Add a session", u: 0.87, v: 0.81 },
    ],
  },
  {
    tag: "Team",
    title: "Invite your team.",
    body: "Add players and coaches with one invite link. They join in a tap.",
    secondaryColor: "#6FAEFF",
    photo: "/photos/match-jump.jpg",
    callouts: [
      { label: "Players and coaches in one place", u: 0.2, v: 0.19 },
      { label: "Requests to join, waiting for you", u: 0.39, v: 0.35 },
      { label: "Who still owes this month", u: 0.74, v: 0.56 },
    ],
  },
  {
    tag: "Check-in",
    title: "Scan in. Know who showed up.",
    body: "QR attendance for every session, with your sub-coaches and players in one roster.",
    secondaryColor: "#A8CDFF",
    photo: "/photos/jump-indoor.jpg",
    callouts: [
      { label: "Checked in so far, live", u: 0.35, v: 0.29 },
      { label: "Session QR, changes every 30 s", u: 0.5, v: 0.46 },
      { label: "Who scanned, and when", u: 0.3, v: 0.71 },
    ],
  },
  {
    tag: "Fees",
    title: "Fees, paid in the app.",
    body: "Players pay their monthly fee in O'Smash. The money goes to your academy.",
    secondaryColor: "#FC7301",
    photo: "/photos/smash-jump.jpg",
    callouts: [
      { label: "This month's fee", u: 0.23, v: 0.22 },
      { label: "Pay in the app", u: 0.5, v: 0.375 },
      { label: "Paid through Fiuu", u: 0.5, v: 0.51 },
    ],
  },
  {
    tag: "Discover",
    title: "Find a coach near you.",
    body: "Choose where you train and see the academies and solo coaches near it.",
    secondaryColor: "#0062D1",
    photo: "/photos/shuttle-net.jpg",
    callouts: [
      { label: "Academies near the place you chose", u: 0.31, v: 0.19 },
      { label: "Ask to join in a tap", u: 0.7, v: 0.22 },
      { label: "Solo coaches too", u: 0.15, v: 0.34 },
    ],
  },
  {
    tag: "Family",
    title: "Bring your child along.",
    body: "Guardians connect their child, follow their sessions and pay their fees.",
    secondaryColor: "#FCC202",
    photo: "/photos/match-jump.jpg",
    callouts: [
      { label: "Find a coach for your child", u: 0.5, v: 0.23 },
      { label: "Your children", u: 0.8, v: 0.35 },
      { label: "Academy invites to approve", u: 0.5, v: 0.47 },
    ],
  },
];

// The screen each player point shows, in PLAYER_POINTS order (find a coach, check in, fees, family).
export const PLAYER_SCREENS = [
  "/app-screens/player-find-coach.webp",
  "/app-screens/player-check-in.webp",
  "/app-screens/player-fees.webp",
  "/app-screens/player-family.webp",
] as const;
