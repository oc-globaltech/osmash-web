// Scroll beats in page order, one per <section data-stage="<name>">; the scene holds one keyframe per beat.
export const STAGES = ["hero", "closeup", "player1", "player2", "player3", "player4", "photo", "faq"] as const;

export type StageName = (typeof STAGES)[number];

// The four player points, in page order; each shows its own screen on the phone.
export const PLAYER_STAGES = ["player1", "player2", "player3", "player4"] as const satisfies readonly StageName[];
