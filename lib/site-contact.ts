/**
 * Canonical practice contact digits for wa.me / tel (E.164 without +).
 * Keep in sync with marketing copy in SITE_PHONE_DISPLAY.
 */
export const SITE_PHONE_E164_DIGITS = "905551234567" as const;

export const SITE_PHONE_DISPLAY = "+90 (555) 123 45 67" as const;

export function getSiteWhatsappHref(): string {
  return `https://wa.me/${SITE_PHONE_E164_DIGITS}`;
}

export function getSiteTelHref(): string {
  return `tel:+${SITE_PHONE_E164_DIGITS}`;
}
