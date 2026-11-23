// Desktop layouts and hover effects start at 992px; below is tablet and phone.
export const DESKTOP_MIN_WIDTH = 992;
const DESKTOP_QUERY = `(min-width: ${DESKTOP_MIN_WIDTH}px)`;
export const MOBILE_QUERY = `(max-width: ${DESKTOP_MIN_WIDTH - 1}px)`;

export const isDesktopViewport = (): boolean => window.matchMedia(DESKTOP_QUERY).matches;

export const isMobileViewport = (): boolean => window.matchMedia(MOBILE_QUERY).matches;
