# Research: Admin Panel

**Feature**: `004-admin-panel`  
**Date**: 2026-03-19

## R1: Admin session format (7-day sliding)

**Decision**: Store a **signed JWT** (HS256) in a single **httpOnly** cookie. Claims include **`sub`** (Admin id), **`iat`**, **`exp`** where **`exp`** is set to **now + 7 days** on every **successful** validation path (middleware and/or layout server refresh). Invalid or expired tokens: treat as logged out; delete cookie on logout.

**Rationale**: Matches **FR-004** sliding window without a database session table (single admin, low risk). `jose` is a small, well-maintained library for sign/verify and expiry handling in Node/Edge runtimes used by Next.js middleware.

**Alternatives considered**:

- **Opaque random session id + DB/Redis**: Stronger revocation story; rejected as overkill for single-admin MVP.
- **iron-session**: Good DX; adds another abstraction; JWT + explicit refresh in middleware is enough.
- **Non-sliding absolute expiry**: Rejected; clarified requirement is sliding 7 days.

## R2: Password hashing

**Decision**: **`bcryptjs`** for **hash** and **compare** at login and password change (cost factor 10–12, document in code).

**Rationale**: bcrypt is standard for password storage; `bcryptjs` is pure JavaScript (no native addon friction on Windows). Constitution allows dependencies with explicit justification.

**Alternatives considered**:

- **argon2**: Stronger default; often native bindings — acceptable later if ops standardize.
- **Node `crypto.scrypt`**: Zero dependency; valid; slightly more custom code for parameter storage; bcryptjs chosen for team familiarity and one-liner compare API.

## R3: Middleware matcher and login exception

**Decision**: `middleware.ts` at repo root with `matcher` including `/admin/:path*`. **Allow** `/admin/login` without a valid session. **Redirect** all other `/admin/*` to `/admin/login` when cookie missing/invalid. After valid token, optionally **re-set** cookie with refreshed **`exp`** (sliding).

**Rationale**: Central gate for SC-001; aligns with spec FR-005.

**Alternatives considered**:

- **Layout-only protection**: Insufficient; static segments and RSC boundaries do not replace middleware for all navigations.
- **API route guards**: Mutations are Server Actions; still need middleware for page GETs.

## R4: Client “auth context” without exposing secrets

**Decision**: **`AdminAuthProvider`** is a **client** component receiving **`isAuthenticated: boolean`** (and optionally **`adminId`**) from **server** `layout.tsx` by reading the verified session server-side. **Never** pass token or password to the client. After **login/logout** Server Actions, call **`router.refresh()`** to re-run server components.

**Rationale**: Satisfies **FR-017** and constitution (no secrets in client state).

**Alternatives considered**:

- **Reading httpOnly cookie from client**: Impossible by design; correct.
- **JWT in memory on client**: Rejected; violates httpOnly goal.

## R5: Toast / feedback library

**Decision**: Add **Sonner** via **shadcn/ui** (`components/ui/sonner`) and mount provider in root `app/layout.tsx`. Server Actions return structured results; client callers fire **toast** on success/error.

**Rationale**: Spec requires immediate feedback (FR-013, SC-003); Sonner pairs cleanly with App Router and Shadcn.

**Alternatives considered**:

- **Radix Toast only**: More wiring; Shadcn Sonner is the project-consistent path.

## R6: Lead list soft-delete and admin views

**Decision**: Admin lead list should include **soft-deleted** leads only if spec requires “full operational” view — spec says delete follows **existing** soft-delete; default interpretation: **admin still sees** non-deleted leads in primary list; optional “show deleted” **out of scope** unless tasks add it. Implement **`getAllForAdmin`** or extend **`getAll`** with a flag **`includeDeleted`** default **false**, using **raw prisma** or non-extended client for admin-only queries if the existing extension always filters `deletedAt`.

**Rationale**: Current `lead-service` uses extended client hiding deleted rows; admin “delete” sets `deletedAt` — row disappears from default list; acceptable per soft-delete UX. If product wants deleted visible for audit, follow-up story.

**Alternatives considered**:

- **Always show deleted in admin**: Would need UI column “Deleted”; defer unless spec amended.

## R7: Login rate limiting

**Decision**: **Not implemented** (spec clarification Option A). Document as future hardening only.

**Rationale**: Explicit scope cut.
