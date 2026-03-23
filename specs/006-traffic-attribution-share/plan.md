# Implementation Plan: Traffic Attribution, Lead Source & Social Share

**Branch**: `006-traffic-attribution-share` | **Date**: 2026-03-21 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/006-traffic-attribution-share/spec.md`

## Summary

Add **Prisma** models/migrations: **`TrafficLog`** (UUID, `source`, `path`, optional `utmMedium` / `utmCampaign`, `createdAt`) and **`Lead.utmSource`** (nullable string). Implement **`traffic-service`** + **`logTraffic` Server Action** (Zod-validated); mount a **client** **`TrafficTracker`** inside **`SiteShell`** (covers `(main)` and `(home-variations)` only—**not** admin) to read **`utm_source`** from the URL, call the action **once per browser session** when a tag is present, and persist attribution for the contact form via **`sessionStorage` + a first-party cookie** (see [research.md](./research.md)). Extend **`createLeadAction`** / **`leadService.create`** / **`createLeadSchema`** with optional **`utmSource`**. Add **`getHomeLink(currentPathname: string)`** in **`lib/routes.ts`** backed by a single list of SEO paths derived from existing **`ROUTES`**, and wire **Header** “Ana Sayfa” / logo home targets to **`usePathname()`** + helper. Add **`ShareModal`** (Shadcn **Dialog** + **Tabs**—add `tabs` component if missing) with Lucide icons, per-platform share links using **`utm_source`**, **Copy link** + **Sonner** toast. Constitution: trackers/share are **client leaf** components; **all DB writes** via **Server Actions** → **services**.

**Design artifacts**: [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md).

## Technical Context

**Language/Version**: TypeScript 5.x (strict)  
**Framework**: Next.js 16.x (App Router)  
**UI**: React 19, Tailwind CSS 4, Shadcn/UI (`Dialog`; add **`Tabs`** for share UI)  
**Data**: PostgreSQL via Prisma — new **`TrafficLog`** table; **`Lead`** column **`utmSource`**  
**Testing**: Manual + `npm run build` (no new automated test mandate in spec)  
**Target**: Web, mobile-first (SC-005)  
**Project type**: Next.js monolith  
**Constraints**: Constitution — Server Actions for mutations; services in **`server/services/`**; **`ROUTES`** central paths; client components only for browser APIs (`sessionStorage`, `clipboard`, `window.location`, `usePathname`)  
**Performance / scale**: Best-effort non-blocking client fire-and-forget for logging; bounded string lengths on UTM fields  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Core Tech Stack | PASS | Prisma, Zod, Shadcn, Next — no new stack. |
| II. Architecture | PASS | **`TrafficTracker`**, **`ShareModal`** = client feature leaves; **`SiteShell`** / pages stay server-first; share + tracker are molecules under **`components/feature/`**. |
| III. Data Handling | PASS | **`logTraffic`** + existing **`createLeadAction`** paths; **`traffic-service`**, **`lead-service`** encapsulate Prisma. |
| IV. Directory Standards | PASS | **`getHomeLink`** + SEO path set live in **`lib/routes.ts`**; no duplicate SEO path literals in header. |
| V. State Management | PASS | Session flag + storage keys only; no global store library. |

**Gate**: **PASS**.

**Post-design re-check**: **PASS** — same table (Tabs is Shadcn/UI, allowed).

## Project Structure

### Documentation (this feature)

```text
specs/006-traffic-attribution-share/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── traffic-logging.md
│   ├── attribution-storage.md
│   └── share-and-home.md
└── tasks.md              # from /speckit.tasks
```

### Source Code (repository root)

```text
prisma/
└── schema.prisma                    # EXTEND: TrafficLog model; Lead.utmSource

server/services/
├── traffic-service.ts               # NEW: createTrafficLog
└── lead-service.ts                  # EXTEND: create accepts utmSource

server/actions/
├── traffic-actions.ts               # NEW: logTrafficAction
└── lead-actions.ts                  # EXTEND: read utmSource from FormData

lib/
├── routes.ts                        # EXTEND: SEO path set + getHomeLink()
├── validations/
│   └── traffic-log-validation.ts    # NEW: Zod for log payload
└── attribution-storage.ts           # NEW: cookie + sessionStorage key helpers (client-safe parts documented)

components/feature/
├── site-shell.tsx                   # EXTEND: render TrafficTracker (client)
├── traffic-tracker.tsx              # NEW: client mount logic
├── share-modal.tsx                  # NEW: client Dialog + Tabs
├── header.tsx                       # EXTEND: home href via getHomeLink(pathname)
├── contact-form.tsx                 # EXTEND: hidden input utmSource from storage
└── index.ts                         # EXTEND exports as needed

components/ui/
└── tabs.tsx                         # NEW via shadcn add tabs (if absent)
```

**Structure decision**: **`TrafficTracker`** in **`SiteShell`** (not root `app/layout.tsx`) so **`(admin)`** never executes logging—matches spec “non-public / staff-only” without coupling to auth state.

## Phase Mapping

| Phase | Output | Location |
|-------|--------|----------|
| 0 | Decisions (dedup, storage, placement, URL builder) | [research.md](./research.md) |
| 1 | Entities + validation rules | [data-model.md](./data-model.md) |
| 1 | Action/storage/share/home contracts | [contracts/](./contracts/) |
| 1 | Manual verification | [quickstart.md](./quickstart.md) |
| 2 | **`tasks.md`** | **`/speckit.tasks`** |

## Complexity Tracking

> No constitution violations; table not required.
