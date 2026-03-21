# Implementation Plan: Admin Panel

**Branch**: `004-admin-panel` | **Date**: 2026-03-19 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/004-admin-panel/spec.md` (incl. clarification session 2026-03-19)

## Summary

Deliver a **cookie-authenticated** admin area under `/admin/*` (except `/admin/login`) using **root `middleware.ts`**, **Prisma `Admin`** (UUID + bcrypt-hashed password), **Server Actions** + **Zod** for all mutations, and an **`app/(admin)/admin/`** tree split into **`(auth)`** (login only) and **`(dashboard)`** (shell + CRUD pages). Extend **`leadService`**, **`blogService`**, and **`officeService`** with **safe `orderBy`**, **filters** (leads), and **name-only sort** (offices). Add reusable **`components/ui`** primitives (Dialog, Table, Sonner/Toaster) and **`components/feature`** admin molecules (DataTable, modals, shell). Session: **7-day sliding** expiry via **signed JWT** in an **httpOnly** cookie (**SameSite=Lax**, **Secure** in production). Update **`public/robots.txt`** with `Disallow: /admin/`. **No login rate limiting** in this release.

**Design artifacts**: [research.md](./research.md) (Phase 0), [data-model.md](./data-model.md), [contracts/admin-panel.md](./contracts/admin-panel.md), [quickstart.md](./quickstart.md) (Phase 1).

## Technical Context

**Language/Version**: TypeScript 5.x (strict)  
**Framework**: Next.js 16.x (App Router)  
**UI**: React 19, Tailwind CSS 4, Shadcn/UI (add Dialog, Table, Sonner)  
**Validation**: Zod 4.x  
**ORM / DB**: Prisma 7.x, PostgreSQL  
**Auth**: bcrypt-hashed passwords; JWT session cookie via `jose` (see research.md)  
**Testing**: Manual + `next build` (no new automated test mandate in spec)  
**Target**: Web (desktop-first acceptable for admin; still responsive)  
**Project type**: Next.js monolith (`app/`, `server/`, `lib/`)  
**Performance**: Admin lists use existing offset pagination pattern; concurrent `findMany` + `count`  
**Constraints**: Server Actions only for mutations; no Redux/Zustand; `ROUTES` for all paths; single admin row MVP; **no** login throttling (spec)  
**Scale/Scope**: ~6 admin routes + login; 50+ rows per list via pagination (SC-004)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Core Tech Stack | PASS | Shadcn + Prisma + Zod; add `jose` + `bcryptjs` with documented justification (research.md). |
| II. Architecture | PASS | Pages fetch on server; feature molecules compose UI atoms; modals/tables are feature-level compositions of `components/ui`. |
| III. Data Handling | PASS | Mutations via Server Actions; services in `server/services/`; Zod at action boundary. |
| IV. Directory Standards | PASS | Extend `lib/routes.ts`; new helpers under `lib/server/` or `server/` as appropriate; no hardcoded `/admin/...` strings. |
| V. State Management | PASS | Admin **AuthContext** only for UI session *awareness* (e.g. `isAuthenticated` from server props + `router.refresh()`); no secret in client state. |
| Styling & UI | PASS | Tailwind + Shadcn tokens. |
| Code Quality | PASS | Explicit return types; kebab-case files; barrels updated. |

**Gate**: **PASS** — no violations requiring Complexity Tracking.

**Post-design re-check** (after research + contracts): **PASS** — same table; new deps (`jose`, `bcryptjs`) justified in [research.md](./research.md).

## Project Structure

### Documentation (this feature)

```text
specs/004-admin-panel/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── admin-panel.md
├── checklists/
│   └── requirements.md
└── tasks.md              # from /speckit.tasks (not created by /speckit.plan)
```

### Source Code (repository root)

```text
middleware.ts                          # NEW: protect /admin/* except /admin/login; refresh sliding session

app/
├── layout.tsx                         # EXTEND: optional Toaster provider (Sonner)
├── (admin)/
│   ├── layout.tsx                     # NEW: AdminAuthProvider + children only (no chrome)
│   └── admin/
│       ├── (auth)/
│       │   └── login/page.tsx         # NEW: /admin/login
│       └── (dashboard)/
│           ├── layout.tsx             # NEW: sidebar/top nav + Sign out + settings entry
│           ├── page.tsx               # NEW: /admin landing (redirect or minimal hub)
│           ├── leads/page.tsx
│           ├── blog/page.tsx
│           ├── offices/page.tsx
│           ├── stats/page.tsx         # NEW: İstatistikler placeholder
│           └── settings/page.tsx      # NEW: password change entry (modal or section)

prisma/
├── schema.prisma                      # EXTEND: model Admin
├── seed.ts                            # EXTEND: bootstrap Admin if none
└── migrations/                        # NEW migration for Admin

public/
└── robots.txt                         # NEW or EXTEND: Disallow: /admin/

lib/
├── routes.ts                          # EXTEND: ROUTES.admin.*
├── server/
│   ├── admin-session.ts               # NEW: JWT create/verify/refresh/clear (server-only)
│   └── admin-password.ts              # NEW: bcrypt hash/compare helpers (server-only)
└── validations/
    ├── admin-auth-validation.ts       # NEW: login, password change
    └── ... (extend if list filters need shared schemas)

server/
├── actions/
│   ├── admin-auth-actions.ts          # NEW: login, logout, changePassword
│   ├── admin-lead-actions.ts          # NEW: list helpers if needed; updateStatus, delete
│   ├── admin-blog-actions.ts          # NEW: CRUD
│   └── admin-office-actions.ts        # NEW: CRUD
└── services/
    ├── admin-service.ts               # NEW: getAdmin, updatePasswordHash
    ├── lead-service.ts                # EXTEND: orderBy + filters + admin list (incl. deleted?)
    ├── blog-service.ts                # EXTEND: orderBy
    └── office-service.ts              # EXTEND: orderBy name asc/desc only

components/
├── ui/
│   ├── dialog.tsx                     # NEW (shadcn)
│   ├── table.tsx                      # NEW (shadcn)
│   ├── sonner.tsx                     # NEW (shadcn) or toast
│   └── ... (existing)
└── feature/
    ├── admin-auth-provider.tsx        # NEW: context (no secrets)
    ├── admin-shell.tsx                # NEW: nav + sign out
    ├── admin-data-table.tsx           # NEW: generic table + pagination + sort UI
    ├── admin-modal.tsx                # NEW: thin Dialog wrapper (optional)
    ├── admin-leads-table.tsx          # NEW
    ├── admin-blog-table.tsx           # NEW
    ├── admin-office-table.tsx         # NEW
    └── ... (modals per entity as needed)

types/
└── index.ts                           # EXTEND: list/sort/filter types, Admin DTOs (no hash)
```

**Structure decision**: Route group **`(admin)`** isolates providers without changing URLs. Under **`admin/`**, sibling groups **`(auth)`** and **`(dashboard)`** ensure **login** does not inherit the **dashboard chrome** layout (spec FR-014).

## Phase Mapping

| Phase | Output | Location |
|-------|--------|----------|
| 0 | Research decisions (session, crypto, deps, middleware) | [research.md](./research.md) |
| 1 | Entity + validation notes | [data-model.md](./data-model.md) |
| 1 | Routes, actions, cookie contract | [contracts/admin-panel.md](./contracts/admin-panel.md) |
| 1 | Local verification steps | [quickstart.md](./quickstart.md) |
| 2 | Implementation tasks | `tasks.md` via **`/speckit.tasks`** |

## Complexity Tracking

> No constitution violations; table not required.
