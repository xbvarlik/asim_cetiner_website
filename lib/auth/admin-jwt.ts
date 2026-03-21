import * as jose from "jose";

/** Shared by Edge middleware and Node server actions — no Prisma. */
export const ADMIN_SESSION_COOKIE = "admin_session";

const SLIDING_EXPIRY = "7d";

function getSecretKey(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("ADMIN_JWT_SECRET is required in production");
    }
    return new TextEncoder().encode(
      "dev-only-insecure-admin-jwt-secret-change-me"
    );
  }
  return new TextEncoder().encode(secret);
}

export async function signAdminSession(adminId: string): Promise<string> {
  return new jose.SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(adminId)
    .setIssuedAt()
    .setExpirationTime(SLIDING_EXPIRY)
    .sign(getSecretKey());
}

export async function verifyAdminSession(
  token: string
): Promise<{ sub: string } | null> {
  try {
    const { payload } = await jose.jwtVerify(token, getSecretKey());
    if (typeof payload.sub !== "string" || payload.sub.length === 0) {
      return null;
    }
    return { sub: payload.sub };
  } catch {
    return null;
  }
}
