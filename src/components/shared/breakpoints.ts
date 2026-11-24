// Desktop from 1024px, phone below 640px, tablet in between. tokens.css repeats these in its media queries.
export const DESKTOP_MIN_PX = 1024;
export const PHONE_BELOW_PX = 640;

export const MEDIA = {
  desktop: `(min-width: ${DESKTOP_MIN_PX}px)`,
  belowDesktop: `(max-width: ${DESKTOP_MIN_PX - 1}px)`,
  phone: `(max-width: ${PHONE_BELOW_PX - 1}px)`,
} as const;

export const isDesktop = (): boolean => window.matchMedia(MEDIA.desktop).matches;

export const isPhone = (): boolean => window.matchMedia(MEDIA.phone).matches;
