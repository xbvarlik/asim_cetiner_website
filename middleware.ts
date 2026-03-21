import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  signAdminSession,
  verifyAdminSession,
} from "@/lib/auth/admin-jwt";
import { ROUTES } from "@/lib/routes";

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60;

function isLoginPath(pathname: string): boolean {
  return (
    pathname === ROUTES.admin.login ||
    pathname.startsWith(`${ROUTES.admin.login}/`)
  );
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (isLoginPath(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = ROUTES.admin.login;
    url.search = "";
    return NextResponse.redirect(url);
  }

  const session = await verifyAdminSession(token);
  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = ROUTES.admin.login;
    url.search = "";
    const res = NextResponse.redirect(url);
    res.cookies.delete(ADMIN_SESSION_COOKIE);
    return res;
  }

  const fresh = await signAdminSession(session.sub);
  const res = NextResponse.next();
  res.cookies.set(ADMIN_SESSION_COOKIE, fresh, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
