# Tasks: Traffic Attribution, Lead Source & Social Share

**Input**: Design documents from `/specs/006-traffic-attribution-share/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Manual + `npm run build` (no automated test mandate in spec).

**Organization**: Tasks grouped by user story for independent verification where possible.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no blocking dependency)
- **[Story]**: User story label (US1–US4)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Schema)

**Purpose**: Persist traffic rows and lead attribution column.

- [x] T001 Add `TrafficLog` model (`id` UUID, `source`, `path`, optional `utmMedium`, `utmCampaign`, `createdAt`) and nullable `utmSource` on `Lead` in prisma/schema.prisma; run `npx prisma migrate dev` (or equivalent) and `npx prisma generate` so `kenan_kubuc_website` client types update

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Validation, services, server action for logs, routes helper, attribution key helpers.

**⚠️ CRITICAL**: Complete before **`TrafficTracker`** and **`logTrafficAction`** integration.

- [x] T002 Create lib/validations/traffic-log-validation.ts with Zod schema for `source`, `path` (safe pathname), optional `utmMedium` / `utmCampaign` per specs/006-traffic-attribution-share/data-model.md
- [x] T003 Create server/services/traffic-service.ts exporting `createTrafficLog` using Prisma `trafficLog.create`, returning `ServiceResult<{ id: string }>` consistent with existing services
- [x] T004 Create server/actions/traffic-actions.ts with `logTrafficAction` calling `createTrafficLog` after Zod parse; no sensitive data in return shape (contracts/traffic-logging.md)
- [x] T005 [P] Extend lib/routes.ts: export readonly SEO landing path set derived from existing `ROUTES.seo*` values and `getHomeLink(currentPathname: string)` per contracts/share-and-home.md and research.md R8
- [x] T006 [P] Create lib/attribution-storage.ts exporting storage key constants (`kk_traffic_logged`, `kk_utm_source`, cookie name) and small helpers usable from client components for read/write (contracts/attribution-storage.md)

**Checkpoint**: `logTrafficAction` callable; `getHomeLink` testable in isolation.

---

## Phase 3: User Story 1 - Log visits from marketing links (Priority: P1) 🎯 MVP

**Goal**: First tagged landing in a tab session creates one `TrafficLog`; refreshes do not duplicate; tracker not mounted on admin.

**Independent Test**: Public URL with `utm_source` → one DB row per new session; 5+ reloads → still one; `/admin/*` → no tracker (no rows from staff browsing).

### Implementation for User Story 1

- [x] T007 [US1] Create components/feature/traffic-tracker.tsx (`"use client"`): on mount (and when search string changes) read `utm_source` from `window.location`; update session/cookie attribution per research.md R2–R3; if `utm_source` present and `sessionStorage` flag not set, call `logTrafficAction` then set `kk_traffic_logged`; never send origin in `path` (pathname only)
- [x] T008 [US1] Update components/feature/site-shell.tsx to render `<TrafficTracker />` alongside existing shell (Server Component may import client child)

**Checkpoint**: Meets SC-001 and US1 acceptance scenarios on public layouts only.

---

## Phase 4: User Story 2 - Attribute contact leads (Priority: P2)

**Goal**: Submitted leads store optional `utmSource`; staff can see it.

**Independent Test**: Land with `utm_source`, submit contact → lead has matching `utmSource`; submit without prior tag → null/empty; admin list shows column when implemented.

### Implementation for User Story 2

- [x] T009 [US2] Extend lib/validations/lead-validation.ts `createLeadSchema` with optional `utmSource` (max length per data-model.md)
- [x] T010 [US2] Extend server/services/lead-service.ts `create` to pass `utmSource` into `prisma.lead.create` when defined
- [x] T011 [US2] Extend server/actions/lead-actions.ts `createLeadAction` to read `utmSource` from `FormData` and include in `leadService.create` payload
- [x] T012 [US2] Update components/feature/contact-form.tsx: hidden input `utmSource` populated from `lib/attribution-storage` (or inline read) on mount/update so submit sends last captured source
- [x] T013 [P] [US2] Extend components/feature/admin-leads-table.tsx `LeadAdminRowDto` and table UI with `utmSource` column; ensure server/page supplying rows includes `utmSource` from list query (e.g. app/(admin)/admin/leads/page.tsx or lead-service list mapping as needed)

**Checkpoint**: SC-002; visit log remains system of record for full UTM triple on lead optional per spec.

---

## Phase 5: User Story 3 - Context-aware Ana Sayfa (Priority: P3)

**Goal**: On SEO landing paths, “Ana Sayfa” (and logo home) resolve to that SEO path; elsewhere to `/`.

**Independent Test**: On `/cift-terapisi`, Ana Sayfa → same path; on `/hizmetler` → `ROUTES.home`.

### Implementation for User Story 3

- [x] T014 [US3] Update components/feature/header.tsx to use `usePathname()` from `next/navigation` and `getHomeLink` from lib/routes.ts for the **Ana Sayfa** `NavItem` href and the **logo** `Link` href (contracts/share-and-home.md)

**Checkpoint**: SC-003; no duplicate SEO path literals outside lib/routes.ts.

---

## Phase 6: User Story 4 - Social share modal (Priority: P4)

**Goal**: Tabbed share dialog; platform links with `utm_source`; copy + toast; Lucide icons.

**Independent Test**: Each tab’s URL contains correct `utm_source`; copy shows Sonner success; usable at 375px.

### Implementation for User Story 4

- [x] T015 [P] [US4] Add Shadcn `Tabs` primitive at components/ui/tabs.tsx (e.g. `npx shadcn@latest add tabs` aligned with project Shadcn setup) if the file does not exist
- [x] T016 [US4] Create components/feature/share-modal.tsx (`"use client"`): `Dialog` + `Tabs` for WhatsApp, Instagram, Facebook, LinkedIn, X; build share URLs per contracts/share-and-home.md; Instagram tab uses copy-to-clipboard flow; `toast` from `sonner` for copy success
- [x] T017 [US4] Add a public-only share entry point (e.g. button in components/feature/header.tsx or components/feature/site-shell.tsx) that opens `ShareModal`; ensure admin layouts do not render it

**Checkpoint**: SC-004, SC-005.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Barrel exports, build, manual quickstart.

- [x] T018 [P] Update components/feature/index.ts to export `TrafficTracker`, `ShareModal` (and types) if the project relies on the feature barrel
- [x] T019 Run `npm run build` from kenan_kubuc_website root; fix Prisma/TypeScript errors
- [ ] T020 Walk through specs/006-traffic-attribution-share/quickstart.md (traffic dedup, admin exclusion, lead attribution, home link, share, mobile)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1** → **Phase 2** → **Phase 3** → **Phase 4** → **Phase 5** → **Phase 6** → **Phase 7**
- **US3** and **US4** can start after **Phase 2** (they do not require US1/US2 code) but should ship after **T008** if share/trigger lives in **Header** next to tracker for integration sanity.

### User Story Dependencies

- **US1**: Requires Phase 2 (`logTrafficAction`, attribution keys).
- **US2**: Requires T001 (DB column); can overlap US1 after T009–T011 once schema exists; **T012** should follow **T006** + **T007** so storage is populated.
- **US3**: Requires **T005** only.
- **US4**: Requires **T015** before **T016**; **T017** after **T016**.

### Parallel Opportunities

- After **T001**: **T005**, **T006** parallel with **T002** → **T003** → **T004** chain (different files; T002–T004 sequential).
- **T013** parallel with **T014** once **US2** core (**T009–T012**) is done.
- **T015** parallel with **T014** or **T013** (different concerns).
- **T018** after **T016–T017**.

---

## Parallel Example: Phase 2 (after T001)

```bash
# Sequential chain:
T002 traffic-log-validation.ts → T003 traffic-service.ts → T004 traffic-actions.ts

# In parallel to that chain:
T005 getHomeLink in lib/routes.ts
T006 attribution-storage.ts
```

---

## Implementation Strategy

### MVP First

1. Phase 1–3 (through **T008**) — traffic logging live  
2. Validate with quickstart traffic sections  
3. Add Phase 4 (lead + admin column)  
4. Add US3 (**T014**) and US4 (**T015–T017**)  
5. Polish (**T018–T020**)

### Incremental Delivery

- Ship **US1** → then **US2** → **US3** → **US4** for staged demos.

---

## Task Summary

| Phase | Task IDs | Count |
|-------|----------|-------|
| Setup | T001 | 1 |
| Foundational | T002–T006 | 5 |
| US1 | T007–T008 | 2 |
| US2 | T009–T013 | 5 |
| US3 | T014 | 1 |
| US4 | T015–T017 | 3 |
| Polish | T018–T020 | 3 |
| **Total** | **T001–T020** | **20** |

**Suggested MVP scope**: Phase 1–3 (**T001–T008**).

---

## Notes

- Regenerate Prisma client after **T001** before implementing **T003**.
- Keep **pathname** normalization in **getHomeLink** consistent with **Next.js** `usePathname()` (typically no trailing slash except `/`).
- **Constitution**: all DB writes via Server Actions → services; no new global state libraries.
