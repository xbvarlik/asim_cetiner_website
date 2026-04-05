---
description: "Task list for 016-services-detail-routing-legal"
---

# Tasks: Services detail, routing, and legal copy

**Input**: Design documents from `/specs/016-services-detail-routing-legal/`  
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/services-ui.md](./contracts/services-ui.md), [quickstart.md](./quickstart.md)

**Tests**: Not requested in spec — no automated test tasks. Validate via `npm run lint` and [quickstart.md](./quickstart.md).

**Organization**: Phases follow spec priorities (US1 → US2 → US3). Setup and foundational work unblock shared `lib/content` usage.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no ordering dependency on other incomplete tasks in the same group)
- **[Story]**: [US1], [US2], [US3] map to user stories in [spec.md](./spec.md)

## Path Conventions

Single Next.js app at repository root: `app/`, `components/feature/`, `lib/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Align implementer with feature scope and verification steps.

- [x] T001 Skim `specs/016-services-detail-routing-legal/quickstart.md` and `specs/016-services-detail-routing-legal/contracts/services-ui.md` for acceptance checks

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Single source of truth for service **text** before terminology sweep and detailed UI. **No user story work should start before T003 completes.**

**⚠️ CRITICAL**: Shared catalog must exist before [US1] edits service copy and before [US2] adds detailed fields.

- [x] T002 Create `lib/content/services.ts` exporting a `ServiceId` union, `PublicServiceOffering` text fields (`id`, `title`, `shortDescription` — align with [data-model.md](./data-model.md)), and `PUBLIC_SERVICES` array migrated from copy currently in `components/feature/services-list-cards.tsx` (icons stay out of this file; map icons by `id` in feature components)
- [x] T003 Refactor `components/feature/services-list-cards.tsx` to import `PUBLIC_SERVICES` from `lib/content/services.ts` and map Lucide icons locally by `ServiceId` (preserve motion and layout behavior)

**Checkpoint**: Home services grid still renders identically; text lives in `lib/content/services.ts`.

---

## Phase 3: User Story 1 — Clear legal scope and consistent wording (Priority: P1) 🎯 MVP

**Goal**: Footer disclaimer verbatim; user-visible Turkish copy shifts from generic “terapi” to “danışmanlık” where appropriate; do **not** change URL path strings, `ROUTES` values used in URLs, or non-UI identifiers ([research.md](./research.md)).

**Independent Test**: Open home and two inner pages — footer shows disclaimer; spot-check body/metadata copy per [quickstart.md](./quickstart.md).

### Implementation for User Story 1

- [x] T004 [US1] Add verbatim disclaimer paragraph to `components/feature/footer.tsx` and update footer tagline/address strings that use “terapi” per terminology rules
- [x] T005 [P] [US1] Update `metadata.description` (and any in-file visible strings) in `app/(main)/page.tsx` for terminology
- [x] T006 [P] [US1] Update `metadata.description` in `app/(main)/hizmetler/page.tsx` for terminology
- [x] T007 [P] [US1] Update metadata or visible strings in `app/(main)/hakkimda/page.tsx`, `app/(main)/blog/page.tsx`, and `app/layout.tsx` for terminology
- [x] T008 [P] [US1] Update user-visible copy in `components/feature/about.tsx`, `components/feature/map-view.tsx`, and `lib/seo/landing-pages.ts` (do not rename SEO URL slugs or `slug` constants)
- [x] T009 [US1] Update intro paragraph in `components/feature/services-list.tsx` and `title`/`shortDescription` strings in `lib/content/services.ts` for terminology (depends on T002, T003)

**Checkpoint**: MVP legal/copy goals met; home still shows compact services only.

---

## Phase 4: User Story 2 — Right level of detail on each page (Priority: P2)

**Goal**: `/hizmetler` shows `ServicesListDetailed` (larger cards, narrative + `<ul>` bullets); `/` keeps compact `ServicesList` only.

**Independent Test**: Side-by-side home vs `/hizmetler` — layout depth and bullets match [spec.md](./spec.md) FR-001/FR-002.

### Implementation for User Story 2

- [x] T010 [US2] Extend `PublicServiceOffering` and each entry in `lib/content/services.ts` with non-empty `detailedDescription` and `highlights` (`string[]`, min one item per service) per [data-model.md](./data-model.md)
- [x] T011 [US2] Implement `components/feature/services-list-detailed.tsx` as a Server or `'use client'` feature component per [plan.md](./plan.md) (larger card layout, semantic `<ul>`/`<li>`, reuse Framer Motion patterns from `components/feature/services-list-cards.tsx` if motion is required)
- [x] T012 [US2] Export `ServicesListDetailed` from `components/feature/index.ts`
- [x] T013 [US2] Replace `ServicesList` import/usage with `ServicesListDetailed` in `app/(main)/hizmetler/page.tsx`

**Checkpoint**: Services page matches detailed contract; home unchanged.

---

## Phase 5: User Story 3 — Retired areas-of-work entry points (Priority: P3)

**Goal**: No `AreasOfWork` on home scroll; `/calisma-alanlari` removed; no header/footer links to that path; `ROUTES` stays the single path source (see `.specify/memory/constitution.md`).

**Independent Test**: Home has no areas section; `/calisma-alanlari` returns 404; nav lists have no “Çalışma Alanları” ([quickstart.md](./quickstart.md)).

### Implementation for User Story 3

- [x] T014 [US3] Comment out `AreasOfWork` import and JSX in `components/feature/home-template.tsx` with an explicit “unused for now” comment (do not delete `components/feature/areas-of-work.tsx`)
- [x] T015 [US3] Delete `app/(main)/calisma-alanlari/page.tsx` and remove the empty route directory if applicable
- [x] T016 [US3] Remove `areasOfWork` from `lib/routes.ts` and fix all TypeScript references across the repo
- [x] T017 [US3] Remove the “Çalışma Alanları” nav item from `components/feature/header.tsx`
- [x] T018 [US3] Remove the “Çalışma Alanları” item from `SITE_LINKS` in `components/feature/footer.tsx` (complete after T004 to reduce merge conflicts on the same file)

**Checkpoint**: Routing and navigation match FR-003/FR-004.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Repo health and spec verification.

- [x] T019 Run `npm run lint` from repository root and resolve any issues introduced in touched files
- [x] T020 Execute manual steps in `specs/016-services-detail-routing-legal/quickstart.md` and note any gaps

---

## Dependencies & Execution Order

### Phase Dependencies

| Phase | Depends on |
|-------|------------|
| Phase 1 | — |
| Phase 2 | Phase 1 (informal) |
| Phase 3 [US1] | Phase 2 complete (T002–T003) |
| Phase 4 [US2] | Phase 2 complete; recommended after Phase 3 so detailed copy uses finalized terminology |
| Phase 5 [US3] | Phase 3 T004 complete before T018 (same `footer.tsx`) |
| Phase 6 | All desired story phases |

### User Story Dependency Graph

```text
Phase 2 (catalog) ──┬──► US1 (P1) legal/copy ──┬──► US3 (P3) routes/nav ──► Polish
                    │                            │
                    └──► US2 (P2) detailed UI ──┘
```

- **US1** does not depend on US2 or US3.
- **US2** depends on foundational catalog; **should follow US1** so `detailedDescription`/`highlights` are authored once with correct terminology.
- **US3** is independent of US2 except shared `footer.tsx`: **T018 after T004**.

### Parallel Opportunities

- After Phase 2: **T005, T006, T007, T008** can run in parallel (distinct files).
- **US2**: T012 can follow immediately after T011 in same feature area; no parallel requirement.

---

## Parallel Example: User Story 1

```text
# After T004 (footer) or in parallel if coordinating merges:

T005 — app/(main)/page.tsx
T006 — app/(main)/hizmetler/page.tsx
T007 — app/(main)/hakkimda/page.tsx, app/(main)/blog/page.tsx, app/layout.tsx
T008 — components/feature/about.tsx, components/feature/map-view.tsx, lib/seo/landing-pages.ts
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1–2 (T001–T003).  
2. Complete Phase 3 (T004–T009).  
3. **STOP and VALIDATE**: Footer disclaimer + terminology on main surfaces; compact services still work.  
4. Deploy/demo if ready.

### Incremental Delivery

1. Add Phase 4 (T010–T013) → validate detailed `/hizmetler`.  
2. Add Phase 5 (T014–T018) → validate removed route and nav.  
3. Phase 6 (T019–T020) before merge.

### Parallel Team Strategy

- Developer A: Phase 2 → US1 (T005–T009) while Developer B prepares US2 component structure — **avoid** both editing `lib/content/services.ts` simultaneously; serialize T009 vs T010–T011 or pair-program shared file.

---

## Task Summary

| Metric | Value |
|--------|------:|
| **Total tasks** | 20 |
| **Phase 1 (Setup)** | 1 |
| **Phase 2 (Foundational)** | 2 |
| **US1 (P1)** | 6 |
| **US2 (P2)** | 4 |
| **US3 (P3)** | 5 |
| **Polish** | 2 |
| **Tasks with [P]** | 4 (T005–T008) |

**Format validation**: All tasks use `- [ ]`, sequential **T001–T020**, file paths in descriptions, **[USn]** only on story phases, **[P]** only where parallel-safe.

---

## Notes

- `components/feature/areas-of-work.tsx` remains in repo but is not composed from `home-template.tsx` after US3.  
- Do not add `areasOfWork` back to `lib/routes.ts` without a new spec.  
- If `rg "areasOfWork|calisma-alanlari" --glob "*.tsx" --glob "*.ts"` finds matches after work, they should be only in specs or comments — resolve before merge.
