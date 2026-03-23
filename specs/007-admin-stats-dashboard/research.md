# Research: Admin Statistics Dashboard

**Feature**: `007-admin-stats-dashboard`  
**Date**: 2026-03-23

## R1: Charting library

**Decision**: Add **`recharts`** and implement charts as **client components** under **`components/feature/stats/`**.

**Rationale**: Meets FR-009–FR-014 (bar, donut, multi-series time, tooltips, legends) with minimal custom code. Shadcn “chart” examples are often **Recharts**-based; no chart primitives exist in the repo today.

**Alternatives considered**:

- **Chart.js / react-chartjs-2**: Strong, but second ecosystem vs common Shadcn+Recharts stacks.
- **Victory / Nivo**: Heavier bundles for similar outcomes.

---

## R2: Timezone and inclusive date range

**Decision**: Treat URL dates as **calendar dates in `Europe/Istanbul`**. Convert **start** to **start-of-day** and **end** to **end-of-day** Istanbul, then to **`Date`** for Prisma using **`fromZonedTime`** / **`toZonedTime`** from **`date-fns-tz`** with **`date-fns`** helpers.

**Rationale**: Matches spec assumption; avoids off-by-one errors vs UTC-only comparisons.

**Alternatives considered**:

- **UTC midnight only**: Wrong for local “day” semantics.
- **PostgreSQL-only timezone in SQL**: Valid; still need consistent parsing of URL params in TS—**date-fns-tz** keeps one clear pipeline.

---

## R3: Prisma aggregation strategy

**Decision**:

- **Simple groupings** (`Lead` by `utmSource`, `Lead` by `officeId`, `TrafficLog` by `source`): **`prisma.lead.groupBy`** / **`prisma.trafficLog.groupBy`** with **`where.createdAt`** range and **`Lead.deletedAt: null`**.
- **Daily per source** (visitors + leads): **one parameterized `$queryRaw`** per metric (or a single CTE-based query) grouping by **`date_trunc('day', ... AT TIME ZONE 'Europe/Istanbul')`** and **`source`**, with **bound parameters** for range.

**Rationale**: Single round-trip for dense time series; avoids loading raw events into Node.

**Alternatives considered**:

- **Fetch all rows and aggregate in JS**: Fails “large range” edge case.
- **Prisma groupBy on stringified date**: Not supported natively without raw SQL.

---

## R4: Source identity for conversion

**Decision**: Normalize keys with **`trim().toLowerCase()`** for both **`Lead.utmSource`** and **`TrafficLog.source`** when building **conversion** rows. **NULL** / empty lead source → label **`Belirtilmedi`** (or constant exported from service).

**Rationale**: Aligns `utm_source` tags from traffic with lead attribution strings.

**Alternatives considered**:

- **Strict case-sensitive match**: Produces duplicate logical channels.

---

## R5: Lead stats chart layout (FR-009)

**Decision**: **Two** **`BarChart`** blocks inside one **`Card`** (or two cards in one grid cell): **(1) leads by source**, **(2) leads by office**—shared date context, clear labels.

**Rationale**: Avoids confusing dual-axis categorical bars; still “together” visually.

---

## R6: Source comparison interactivity

**Decision**: Server returns **full** daily series for **all sources present in range** (visitors + leads). **Client** checkboxes **filter** which series are visible (no second fetch). Optional URL param **`sources=a,b`** to initialize selection.

**Rationale**: Keeps refetch tied to **date** only; checkbox toggles stay snappy.

**Alternatives considered**:

- **Refetch on each checkbox change**: Slower; more server load for little gain.

---

## R7: Date range UI

**Decision**: Add Shadcn **`popover`** + **`calendar`** (range mode) via CLI; wrapper **`stats-date-range-picker.tsx`** applies selection and **`router.push`** with **`from`/`to`**.

**Rationale**: Matches “Shadcn date range picker” expectation; no calendar in repo today.

**Alternatives considered**:

- **Native `<input type="date">` pair**: Faster to ship but weaker UX—acceptable fallback if CLI conflicts.

---

## R8: Theme colors for charts

**Decision**: Use **`hsl(var(--primary))`** / **`var(--primary)`** (or Tailwind **`text-primary`** hex from theme) for **primary series**; **neutral** Tailwind **`muted` / `border`** for axes and grid via Recharts **`stroke`** props.

**Rationale**: Matches FR-13 without new CSS files.
