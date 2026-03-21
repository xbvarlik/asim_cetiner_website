# Quickstart: Admin Panel

**Feature**: `004-admin-panel`  
**Date**: 2026-03-19

## Prerequisites

- PostgreSQL running with `DATABASE_URL` set (see project `.env`).  
- Node 20+ (align with repo).  
- Dependencies installed: `npm install`.

## Environment variables

Add (names may match implementation constants):

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Existing Prisma connection string |
| `ADMIN_JWT_SECRET` | Long random string for signing admin session JWT (production **required**) |

## Database + seed

```bash
npx prisma migrate dev
npx prisma db seed
```

Seed MUST:

- Keep existing **Status** and **Office** idempotent upserts.  
- Create **one `Admin`** row **only if none exist**, with bcrypt hash of temporary password (e.g. `admin123`) for local dev — **rotate in production** via settings UI.

## Dev server

```bash
npm run dev
```

## Manual verification checklist

1. Open `/admin/leads` → redirected to **`/admin/login`**.  
2. Log in with seeded credentials → redirected to **`/admin`** (or leads).  
3. Open **`/robots.txt`** → contains **`Disallow: /admin/`** (e.g. `public/robots.txt`).  
4. **Sign out** → session cleared; `/admin/leads` redirects to login.  
5. Leads: filter, sort, status change, soft delete + toast.  
6. Blog: CRUD + Active/Draft + toast.  
7. Offices: CRUD; delete with linked lead → error message.  
8. Settings: password change with **FR-012** validation + wrong current password error.

## Build

```bash
npm run build
```

Fix any type errors before merge.
