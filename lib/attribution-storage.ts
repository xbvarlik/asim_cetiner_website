/**
 * Client-side attribution keys (also referenced by TrafficTracker / ContactForm).
 * Cookie is non-HttpOnly for form read + cross-tab; SameSite=Lax.
 */

export const KK_TRAFFIC_LOGGED_KEY = "kk_traffic_logged";
export const KK_UTM_SESSION_KEY = "kk_utm_source";
export const KK_UTM_COOKIE_NAME = "kk_utm_source";

const COOKIE_MAX_AGE_SEC = 7 * 24 * 60 * 60;

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof sessionStorage !== "undefined";
}

export function readTrafficLoggedFlag(): boolean {
  if (!isBrowser()) {
    return false;
  }
  try {
    return sessionStorage.getItem(KK_TRAFFIC_LOGGED_KEY) === "1";
  } catch {
    return false;
  }
}

export function setTrafficLoggedFlag(): void {
  if (!isBrowser()) {
    return;
  }
  try {
    sessionStorage.setItem(KK_TRAFFIC_LOGGED_KEY, "1");
  } catch {
    /* ignore quota / private mode */
  }
}

export function readAttributionSource(): string | null {
  if (!isBrowser()) {
    return null;
  }
  try {
    const fromSession = sessionStorage.getItem(KK_UTM_SESSION_KEY);
    if (fromSession && fromSession.trim() !== "") {
      return fromSession;
    }
  } catch {
    /* fall through to cookie */
  }

  if (typeof document === "undefined") {
    return null;
  }
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${KK_UTM_COOKIE_NAME}=([^;]*)`)
  );
  if (!match?.[1]) {
    return null;
  }
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

export function persistAttributionSource(value: string): void {
  const trimmed = value.trim().slice(0, 128);
  if (trimmed === "" || !isBrowser()) {
    return;
  }

  try {
    sessionStorage.setItem(KK_UTM_SESSION_KEY, trimmed);
  } catch {
    /* ignore */
  }

  if (typeof document === "undefined") {
    return;
  }
  const encoded = encodeURIComponent(trimmed);
  document.cookie = `${KK_UTM_COOKIE_NAME}=${encoded}; Path=/; Max-Age=${COOKIE_MAX_AGE_SEC}; SameSite=Lax`;
}
