// One carousel slide per feature.
export type Feature = {
  tag: string;
  title: string;
  body: string;
  secondaryColor: string;
};

// Every slide shares the Ink Navy primary; only the secondary changes per slide.
export const FEATURE_PRIMARY_COLOR = "#011D41";

export const FEATURES: Feature[] = [
  {
    tag: "Sessions",
    title: "Run every session from the court.",
    body: "Schedule, courts and sub-coaches in one place, built for the minute between games.",
    secondaryColor: "#0078FB",
  },
  {
    tag: "Team",
    title: "Invite your team.",
    body: "Add players and coaches with one invite link. They join in a tap.",
    secondaryColor: "#6FAEFF",
  },
  {
    tag: "Check-in",
    title: "Scan in. Know who showed up.",
    body: "QR attendance for every session, with your sub-coaches and players in one roster.",
    secondaryColor: "#A8CDFF",
  },
  {
    tag: "Fees",
    title: "Fees, paid in the app.",
    body: "Players pay their monthly fee in O'Smash. The money goes to your academy.",
    secondaryColor: "#FC7301",
  },
  {
    tag: "Discover",
    title: "Find a coach near you.",
    body: "Choose where you train and see the academies and solo coaches near it.",
    secondaryColor: "#0062D1",
  },
  {
    tag: "Family",
    title: "Bring your child along.",
    body: "Guardians connect their child, follow their sessions and pay their fees.",
    secondaryColor: "#FCC202",
  },
];
