# Implementation Plan: Admin Statistics Dashboard (Leads & Visitors)

**Branch**: `007-admin-stats-dashboard` | **Date**: 2026-03-23 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/007-admin-stats-dashboard/spec.md`

## Summary

Replace the placeholder **`app/(admin)/admin/(dashboard)/stats/page.tsx`** with a **Server Component** that reads **`from` / `to`** (ISO **YYYY-MM-DD**) from **`searchParams`**, validates with **Zod**, resolves **inclusive** date bounds in **Europe/Istanbul**, and loads aggregated metrics via a new **`server/services/stats-service.ts`** (kebab-case; not `statsService.ts`). The service uses **Prisma** (`groupBy`, `count`, and **parameterized `$queryRaw`** for **daily** buckets) over **`Lead`** (`deletedAt: null`, `createdAt`) and **`TrafficLog`** (`createdAt`), with **`utmSource` / `TrafficLog.source`** normalized (e.g. **trim + lowercase**) for **conversion** and comparison. The page composes **`components/feature/stats/*`** **client** chart molecules (**Recharts**) and **Shadcn `Card`** layout; a **client** date-range control updates the **URL** (`router.push` + **`ROUTES.admin.stats`**) so refetch stays **Next-native**. Add **`recharts`**, **`date-fns`**, and **`date-fns-tz`** for charts and timezone-safe bounds; add Shadcn **`popover`** + **`calendar`** (if not present) for the range picker. Empty ranges show **“Veri bulunamadı”**; conversion **%** shows **“—”** when visitors = 0.

**Design artifacts**: [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md).

## Technical Context

**Language/Version**: TypeScript 5.x (strict)  
**Framework**: Next.js 16.x (App Router)  
**UI**: React 19, Tailwind CSS 4, Shadcn/UI (`Card`, `Button`, `Popover`, `Calendar` after scaffold)  
**Charts**: **Recharts** (bar, pie/donut, line/composed)  
**Data**: PostgreSQL via Prisma — **`Lead`**, **`TrafficLog`**, **`Office`**  
**Date handling**: **`date-fns`** + **`date-fns-tz`** (Istanbul day boundaries → UTC for queries)  
**Testing**: Manual + `npm run build`  
**Target**: Admin desktop-first; responsive stack per FR-006  
**Project type**: Next.js monolith  
**Constraints**: Constitution — **Server Components** for page + data fetch; **charts** = client leaves; **aggregations** in **`server/services/`**; **Zod** at param boundary; **no** client-side aggregation of raw row dumps at scale  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Core Tech Stack | PASS with note | **Recharts** + **date-fns-tz** added—justified in [research.md](./research.md) (R1, R2). |
| II. Architecture | PASS | **`stats/page.tsx`** fetches; **`components/feature/stats/*`** own chart UI; no page-level Recharts. |
| III. Data Handling | PASS | Reads only; no new mutations. All DB access in **`stats-service`**. |
| IV. Directory Standards | PASS | **`ROUTES.admin.stats`** for links; new validation under **`lib/validations/`**. |
| V. State Management | PASS | **URL** holds date range; optional **`sources`** query for deep-linking comparison (see contracts). |

**Gate**: **PASS**.

**Post-design re-check**: **PASS**.

## Project Structure

### Documentation (this feature)

```text
specs/007-admin-stats-dashboard/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── stats-api.md
│   └── stats-url-params.md
└── tasks.md              # from /speckit.tasks
```

### Source Code (repository root)

```text
package.json                         # EXTEND: recharts, date-fns, date-fns-tz

lib/validations/
└── stats-range-validation.ts        # NEW: Zod for from/to (+ optional sources)

lib/server/ (optional)
└── stats-date-bounds.ts             # NEW: Istanbul inclusive range → UTC Date (or co-locate in stats-service)

server/services/
└── stats-service.ts                 # NEW: aggregations + raw daily queries

components/ui/
├── popover.tsx                      # NEW if missing (shadcn)
└── calendar.tsx                     # NEW if missing (shadcn)

components/feature/stats/
├── lead-stats-chart.tsx             # NEW: client — bars (source + office)
├── visitor-stats-chart.tsx          # NEW: client — pie/donut
├── source-comparison-chart.tsx      # NEW: client — ComposedChart / Line, checkbox filter
├── conversion-table.tsx             # NEW: client or server table from props
├── stats-date-range-picker.tsx      # NEW: client — updates URL searchParams
├── stats-empty-state.tsx            # NEW: “Veri bulunamadı”
└── stats-dashboard.tsx              # NEW: optional layout shell composing cards (server-friendly sections)

components/feature/index.ts          # EXTEND exports

app/(admin)/admin/(dashboard)/stats/
└── page.tsx                         # REPLACE placeholder — async searchParams, fetch, compose dashboard
```

**Structure decision**: Keep the **existing** admin dashboard route; file lives under **`(dashboard)/stats/`** matching **`ROUTES.admin.stats`**.

## Phase Mapping

| Phase | Output | Location |
|-------|--------|----------|
| 0 | Library & query strategy | [research.md](./research.md) |
| 1 | Shapes & URL contract | [data-model.md](./data-model.md), [contracts/](./contracts/) |
| 1 | Verification | [quickstart.md](./quickstart.md) |
| 2 | **`tasks.md`** | **`/speckit.tasks`** |

## Complexity Tracking

| Addition | Why Needed | Simpler Alternative Rejected Because |
|----------|------------|-------------------------------------|
| **Recharts** | Spec requires bar, pie/donut, multi-series time charts with tooltips/legends | Raw SVG/CSS charts are high maintenance and slow to ship |
| **date-fns-tz** | Spec mandates **Europe/Istanbul** day buckets | Manual offset math is error-prone across DST |
| **`$queryRaw`** (parameterized) | Prisma **`groupBy`** cannot express **date_trunc** per timezone cleanly in one call | Multiple round-trips per source/day would be slow |
