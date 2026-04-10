/**
 * Canonical practice contact for wa.me / tel / footer.
 * Sync with docs/info.md — Contact Information & Office Addresses.
 */
export const SITE_PHONE_E164_DIGITS = "905544010176" as const;

export const SITE_PHONE_DISPLAY = "+90 554 401 01 76" as const;

export const SITE_EMAIL = "pskasimcetiner@gmail.com" as const;

export const SITE_INSTAGRAM_HANDLE = "Klinikpsikologasimcetiner" as const;

export const SITE_INSTAGRAM_URL =
  "https://www.instagram.com/Klinikpsikologasimcetiner/" as const;

export const SITE_OFFICE_ADDRESS_SINGLE_LINE =
  "Merdivenköy, Fahrettin Kerim Gökay Caddesi Çeviköz Apt No: 169 Kat: 2 Daire: 5, 34732 Kadıköy/İstanbul" as const;

export function getSiteWhatsappHref(): string {
  return `https://wa.me/${SITE_PHONE_E164_DIGITS}`;
}

export function getSiteTelHref(): string {
  return `tel:+${SITE_PHONE_E164_DIGITS}`;
}
