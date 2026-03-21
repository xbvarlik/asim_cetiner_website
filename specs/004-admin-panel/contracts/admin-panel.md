# Contract: Admin Panel (routes, session, Server Actions)

**Feature**: `004-admin-panel`  
**Date**: 2026-03-19

## Routes (`lib/routes.ts`)

All paths MUST be defined on **`ROUTES.admin`** (exact keys are implementation detail; example):

| Key (example) | Path |
|---------------|------|
| `login` | `/admin/login` |
| `home` | `/admin` |
| `leads` | `/admin/leads` |
| `blog` | `/admin/blog` |
| `offices` | `/admin/offices` |
| `stats` | `/admin/stats` |
| `settings` | `/admin/settings` |

**Middleware**: Public under `/admin` only **`/admin/login`** (and static assets as per Next defaults). All other `/admin/*` require valid session cookie.

## HTTP / SEO

- **`public/robots.txt`**: include `Disallow: /admin/` (FR-016).  
- **No** requirement to index admin pages.

## Session cookie (implementation contract)

| Property | Value |
|----------|--------|
| Name | e.g. `admin_session` (single constant in `lib/server/admin-session.ts`) |
| httpOnly | `true` |
| secure | `true` in production |
| sameSite | `lax` |
| path | `/` |
| maxAge / expires | Aligned with JWT **`exp`** (sliding **7 days** from last refresh) |

**JWT payload (claims)**:

- **`sub`**: Admin `id` (UUID string).  
- **`iat`**, **`exp`**: standard; **`exp`** refreshed on sliding renewal.  
- **No** password or PII in claims.

**Signing key**: `process.env.ADMIN_JWT_SECRET` (or shared `AUTH_SECRET` if documented in quickstart); MUST be long random in production.

## Server Actions (mutations only)

Zod-validate **all** inputs at action entry; return `ServiceResult`-style or discriminated union consumable by client toasts.

| Area | Actions (illustrative names) |
|------|------------------------------|
| Auth | `loginAction`, `logoutAction`, `changeAdminPasswordAction` |
| Leads | `updateLeadStatusAction`, `deleteLeadAction` |
| Blog | `createBlogPostAction`, `updateBlogPostAction`, `deleteBlogPostAction` |
| Offices | `createOfficeAction`, `updateOfficeAction`, `deleteOfficeAction` |

**Errors**: User-safe messages; no stack traces to client. Referential failures (office delete) return spec-compliant messaging.

## Read paths (RSC)

- List pages use **server components** calling services with **page** / **pageSize** / **sort** / **filters** from **`searchParams`** (URL-driven state for refreshable, shareable admin URLs — optional but recommended in implementation).

## Auth context (client contract)

- **Input props**: `isAuthenticated: boolean` (required); optional `adminId: string`.  
- **Forbidden**: session token, password, or `passwordHash`.  
- **Updates**: After `loginAction` / `logoutAction` success, client calls **`router.refresh()`**.
