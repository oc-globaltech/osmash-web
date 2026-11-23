// Start at the hero on every load: now, after first paint and once the page has loaded.
export function resetToTopOnLoad(toTop: () => void, signal: AbortSignal): void {
  toTop();
  window.addEventListener("load", toTop, { signal });
  requestAnimationFrame(() => {
    if (!signal.aborted) toTop();
  });
}
