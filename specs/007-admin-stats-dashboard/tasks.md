# Tasks: Admin Statistics Dashboard (Leads & Visitors)

**Input**: Design documents from `/specs/007-admin-stats-dashboard/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Manual + `npm run build` (no automated test mandate in spec).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no blocking dependency)
- **[Story]**: User story label (US1–US4)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Dependencies & UI Primitives)

**Purpose**: Charting and date libraries; Shadcn range-picker building blocks.

- [x] T001 Add npm dependencies `recharts`, `date-fns`, and `date-fns-tz` to kenan_kubuc_website/package.json and run `npm install` in kenan_kubuc_website (justify per plan constitution note / research.md R1–R2)
- [x] T002 [P] Add Shadcn **Popover** and **Calendar** primitives to components/ui/ (e.g. `npx shadcn@latest add popover calendar` aligned with project Shadcn v4 setup) for stats-date-range-picker; ensure exports from components/ui/index.ts if the project uses a UI barrel

---

## Phase 2: Foundational (Validation, Date Bounds, Stats Service)

**Purpose**: All server-side aggregation before any chart UI.

**⚠️ CRITICAL**: Complete before wiring `stats/page.tsx` to real data.

- [x] T003 Create lib/validations/stats-range-validation.ts: Zod schema for `from` / `to` (`YYYY-MM-DD`), `from <= to`, optional `sources` string split per contracts/stats-url-params.md; export inferred types
- [x] T004 Create lib/server/stats-date-bounds.ts: given validated `from`/`to`, return inclusive `{ startUtc: Date; endUtc: Date }` using **Europe/Istanbul** start-of-day / end-of-day (research.md R2)
- [x] T005 Create server/services/stats-service.ts with `getLeadsBySourceInRange`, `getLeadsByOfficeInRange`, `getVisitorsBySourceInRange` using Prisma `groupBy` + `where.createdAt` + **`Lead.deletedAt: null`**; map null/empty `utmSource` to display label **Belirtilmedi** (data-model.md)
- [x] T006 Extend server/services/stats-service.ts with `getConversionTableInRange` and `getDailyMetricsBySourceInRange` using **parameterized** `prisma.$queryRaw` / `Prisma.sql` for `date_trunc` in Istanbul (plan complexity table); normalize source keys (**trim + lowercase**) for conversion alignment (research.md R4); conversion `%` = **null** in data when visitors = 0 for UI **—**
- [x] T007 [P] Add optional `getAdminStatsBundle(range)` (or equivalent) in server/services/stats-service.ts that runs T005–T006 queries via `Promise.all` for a single page load (contracts/stats-api.md)

**Checkpoint**: Service returns typed DTOs; no raw row dumps to the client.

---

## Phase 3: User Story 1 - Filter metrics by date range (Priority: P1) 🎯 MVP

**Goal**: URL-driven `from`/`to`; global picker; empty state copy; full dashboard refetch on range change.

**Independent Test**: Change range → URL updates → reload preserves range; empty range → **Veri bulunamadı** (spec FR-015).

### Implementation for User Story 1

- [x] T008 [P] [US1] Create components/feature/stats/stats-empty-state.tsx with Turkish **“Veri bulunamadı”** (or equivalent) for chart/table sections
- [x] T009 [US1] Create components/feature/stats/stats-date-range-picker.tsx (`"use client"`): Popover + Calendar range; on apply, `router.push` to `ROUTES.admin.stats` with `from`/`to` query params (contracts/stats-url-params.md)
- [x] T010 [US1] Replace app/(admin)/admin/(dashboard)/stats/page.tsx: `searchParams` Promise (Next 15+ pattern), parse with stats-range-validation.ts, default range (e.g. last 30 days) when missing/invalid per contract, build UTC bounds via stats-date-bounds.ts, call stats-service bundle, pass serializable props to child components

**Checkpoint**: SC-002, SC-003, SC-005 for date behavior.

---

## Phase 4: User Story 2 - Lead volume by source and office (Priority: P2)

**Goal**: Bar charts for leads by source and by office with tooltips/legends and brand primary color (FR-009, FR-013–FR-014).

**Independent Test**: Bar totals match grouped lead counts for the selected range.

### Implementation for User Story 2

- [x] T011 [US2] Create components/feature/stats/lead-stats-chart.tsx (`"use client"`): two **Recharts** `BarChart` sections (source + office) inside a **Shadcn Card**; tooltips, legend, **`hsl(var(--primary))`** (or theme token) for primary fills; neutral grid strokes; delegate to stats-empty-state when series empty

---

## Phase 5: User Story 3 - Visitor traffic by source (Priority: P2)

**Goal**: Pie or donut for `TrafficLog` distribution (FR-010).

**Independent Test**: Slice sum equals visitor count for range.

### Implementation for User Story 3

- [x] T012 [US3] Create components/feature/stats/visitor-stats-chart.tsx (`"use client"`): Recharts `PieChart` / `Pie` with inner radius for donut; legend + tooltip; primary palette rotation with neutrals; stats-empty-state when no visits

---

## Phase 6: User Story 4 - Comparison over time + conversion table (Priority: P3)

**Goal**: Multi-select sources (checkboxes) filtering daily series; table Source | Visitors | Leads | Conv. % (FR-011–FR-012).

**Independent Test**: Toggle sources without new fetch; **—** when visitors = 0; daily points match DB buckets.

### Implementation for User Story 4

- [x] T013 [US4] Create components/feature/stats/conversion-table.tsx: accept `ConversionRow[]` props; render Shadcn **Table** or semantic table with columns per spec; format **%** or **—** when rate null
- [x] T014 [US4] Create components/feature/stats/source-comparison-chart.tsx (`"use client"`): load full `DailySourceMetricsRow[]` from props; checkboxes for sources (initialize from optional `sources` query param per contract); Recharts **ComposedChart** or **LineChart** with multiple series (visitors vs leads per source per day); tooltips + legend; stats-empty-state when no rows

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Dashboard grid composition, barrel exports, build, manual QA.

- [x] T015 Implement responsive **dashboard grid** using Shadcn **Card** wrappers: either components/feature/stats/stats-dashboard.tsx composing all widgets **or** keep composition in app/(admin)/admin/(dashboard)/stats/page.tsx—pick one place to avoid duplicate layout (FR-006); include date picker row at top
- [x] T016 [P] Update components/feature/index.ts to export stats components (and types if needed) following project barrel conventions
- [x] T017 Run `npm run build` from kenan_kubuc_website root; resolve TypeScript / bundling issues (Recharts `"use client"` boundaries)
- [ ] T018 Execute specs/007-admin-stats-dashboard/quickstart.md (timezone spot-check, URL deep link, empty state, 1280px layout)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1** → **Phase 2** → **Phase 3** → **Phases 4–6** (charts can overlap after Phase 3 **T010** delivers props shape) → **Phase 7**

### User Story Dependencies

- **US1**: After Phase 2 (service + bounds).
- **US2–US4**: After **T010** (page passes data); **US4** charts can parallel **US2**/**US3** if props types are stable.

### Parallel Opportunities

- **T002** + **T008** after **T001**
- **T007** after **T006** (optional parallel to **T008** once T006 exists)
- **T011**, **T012**, **T013** parallel (different files) once **T010** done
- **T016** after **T015**

---

## Parallel Example: Charts (after T010)

```bash
# Together:
T011 lead-stats-chart.tsx
T012 visitor-stats-chart.tsx
T013 conversion-table.tsx
# Then T014 (depends on daily metrics shape from page props)
```

---

## Implementation Strategy

### MVP First

1. Phases 1–3 (**T001–T010**) — date filter + empty state + page wired to service  
2. Add **T011** (leads) → **T012** (visitors) → **T013–T014** (conversion + timeline)  
3. **T015–T018** polish  

### Incremental Delivery

- Ship **US1** early, then **US2** → **US3** → **US4** for staged demos.

---

## Task Summary

| Phase | Task IDs | Count |
|-------|----------|-------|
| Setup | T001–T002 | 2 |
| Foundational | T003–T007 | 5 |
| US1 | T008–T010 | 3 |
| US2 | T011 | 1 |
| US3 | T012 | 1 |
| US4 | T013–T014 | 2 |
| Polish | T015–T018 | 4 |
| **Total** | **T001–T018** | **18** |

**Suggested MVP scope**: **T001–T010** (through US1).

---

## Notes

- **Do not** name the service file `statsService.ts`; use **stats-service.ts** per project kebab-case (plan).
- All **`$queryRaw`** must use **bound parameters**—no string-concatenated dates.
- **Lead** soft-delete: always **`deletedAt: null`** in stats queries.
