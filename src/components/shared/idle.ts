// Work that waits for idle still runs within this long on a busy page.
const IDLE_TIMEOUT_MS = 1000;
// Safari has no requestIdleCallback; a short delay still lets the pending paint and input go first.
const NO_IDLE_DELAY_MS = 50;

// Runs `callback` once the main thread is idle, unless `signal` aborts first.
export function onIdle(callback: () => void, signal: AbortSignal): void {
  if (typeof requestIdleCallback === "function") {
    const id = requestIdleCallback(callback, { timeout: IDLE_TIMEOUT_MS });
    signal.addEventListener("abort", () => cancelIdleCallback(id), { once: true });
    return;
  }
  const id = setTimeout(callback, NO_IDLE_DELAY_MS);
  signal.addEventListener("abort", () => clearTimeout(id), { once: true });
}
