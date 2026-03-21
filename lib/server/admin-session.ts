import "server-only";

import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  signAdminSession,
  verifyAdminSession,
} from "@/lib/auth/admin-jwt";

const COOKIE_MAX_AGE_SEC = 7 * 24 * 60 * 60;

function cookieBaseOptions(): {
  httpOnly: boolean;
  sameSite: "lax";
  path: string;
  maxAge: number;
  secure: boolean;
} {
  return {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE_SEC,
    secure: process.env.NODE_ENV === "production",
  };
}

export async function setAdminSessionCookie(adminId: string): Promise<void> {
  const token = await signAdminSession(adminId);
  const jar = await cookies();
  jar.set(ADMIN_SESSION_COOKIE, token, cookieBaseOptions());
}

export async function clearAdminSessionCookie(): Promise<void> {
  const jar = await cookies();
  jar.set(ADMIN_SESSION_COOKIE, "", {
    ...cookieBaseOptions(),
    maxAge: 0,
  });
}

export async function getAdminSessionFromCookies(): Promise<{
  sub: string;
} | null> {
  const jar = await cookies();
  const raw = jar.get(ADMIN_SESSION_COOKIE)?.value;
  if (!raw) {
    return null;
  }
  return verifyAdminSession(raw);
}

/** Re-issue cookie with fresh 7d expiry (sliding window). */
export async function refreshAdminSessionCookieIfPresent(): Promise<void> {
  const jar = await cookies();
  const raw = jar.get(ADMIN_SESSION_COOKIE)?.value;
  if (!raw) {
    return;
  }
  const session = await verifyAdminSession(raw);
  if (!session) {
    return;
  }
  const token = await signAdminSession(session.sub);
  jar.set(ADMIN_SESSION_COOKIE, token, cookieBaseOptions());
}
