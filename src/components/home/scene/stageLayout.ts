import { STAGES, type StageName } from "../stages";

export type StageBand = { stage: StageName; top: number; height: number };

// Document-space bands of every `[data-stage]` section, in page order; missing stages are left out.
export function measureStages(): StageBand[] {
  return STAGES.flatMap((stage) => {
    const section = document.querySelector<HTMLElement>(`[data-stage="${stage}"]`);
    if (!section) return [];
    const box = section.getBoundingClientRect();
    return [{ stage, top: box.top + window.scrollY, height: box.height }];
  });
}
