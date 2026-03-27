# Tasks: Header, Areas of Work Imagery, and Calm UI

**Input**: Design documents from `/specs/013-header-areas-work-ui/`  
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/header-areas-ui.md](./contracts/header-areas-ui.md), [quickstart.md](./quickstart.md)

**Tests**: Not requested in the feature spec; verification is manual per `quickstart.md` and ESLint.

**Organization**: Phases follow user story priority (P1 → P2 → P3) after shared prerequisites.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no ordering dependency within Phase 2)
- **[Story]**: `[US1]` / `[US2]` / `[US3]` maps to user stories in `specs/013-header-areas-work-ui/spec.md`

## Path Conventions

Single Next.js app at repository root: `app/`, `components/feature/`, `public/images/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Align implementer with acceptance criteria and file touch list before edits.

- [x] T001 Review feature scope and constraints in `specs/013-header-areas-work-ui/spec.md`, `specs/013-header-areas-work-ui/plan.md`, and `specs/013-header-areas-work-ui/research.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared assets and theme tokens required by header (US1) and areas imagery (US2).

**⚠️ CRITICAL**: Complete **both** T002 and T003 before user-story implementation (US1 needs T002; US2 needs T003).

- [x] T002 [P] Add header navigation foreground CSS variable and `@theme inline` color mapping in `app/globals.css` (dark green, WCAG AA on semi-transparent header background per `specs/013-header-areas-work-ui/research.md` R-3; expose Tailwind utility such as `text-header-nav-foreground`)
- [x] T003 [P] Add a new rights-cleared stock image file under `public/images/` (e.g. `areas-of-work-bg.jpg`) suitable for mental-health context; confirm via repository search that no `components/` or `app/` file references this path until `components/feature/areas-of-work.tsx` is updated in US2

**Checkpoint**: Theme token available for header; new image file on disk and unused elsewhere.

---

## Phase 3: User Story 1 — Clearer, calmer site header (Priority: P1) 🎯 MVP

**Goal**: Taller header, centered desktop nav cluster, larger nav text, dark green nav color, branding and actions at edges.

**Independent Test**: Open any `(main)` page; at desktop width verify centered nav, increased height/type, green nav text, without scrolling to Areas of Work.

### Implementation for User Story 1

- [x] T004 [US1] Refactor the header inner row in `components/feature/header.tsx` to a three-column layout (`grid` with `1fr auto 1fr` or equivalent): site title leading, desktop `<nav>` centered at `lg+`, share button + `Sheet` trigger trailing; preserve `max-w-7xl` and horizontal padding
- [x] T005 [US1] Increase header row height (e.g. `h-20`/`h-22` replacing `h-16`) and bump desktop nav links to at least `text-base`; apply token-based dark green default and hover styles from `app/globals.css` in `components/feature/header.tsx` (depends on T002, T004)
- [x] T006 [US1] Apply the same header nav text token and proportional styling to mobile `Sheet` navigation links in `components/feature/header.tsx`; keep existing `focus-visible:ring-2` behavior on all interactive header controls

**Checkpoint**: User Story 1 acceptance scenarios in `specs/013-header-areas-work-ui/spec.md` are satisfied at desktop and mobile.

---

## Phase 4: User Story 2 — Distinct Areas of Work imagery (Priority: P2)

**Goal**: Areas of Work uses a stock background image whose path is unique site-wide (not `kenan_kubuc_stok.jpg` or hero asset).

**Independent Test**: On `/`, scroll to Çalışma Alanları; grep the repo for `AREAS_BACKGROUND_SRC` / image path — only `components/feature/areas-of-work.tsx` references the new file.

### Implementation for User Story 2

- [x] T007 [US2] Set `AREAS_BACKGROUND_SRC` in `components/feature/areas-of-work.tsx` to the new `public/images/` file from T003; ensure `kenan_kubuc_stok.jpg` is no longer referenced in this file (depends on T003)
- [x] T008 [US2] Adjust gradient overlay and/or chip readability in `components/feature/areas-of-work.tsx` if the new photograph reduces contrast per `specs/013-header-areas-work-ui/contracts/header-areas-ui.md` Areas section

**Checkpoint**: User Story 2 acceptance scenarios and FR-005 uniqueness hold.

---

## Phase 5: User Story 3 — Therapeutic visual polish (Priority: P3)

**Goal**: Calm spacing/hierarchy and confirmed keyboard focus across header and refined Areas block—no new animation scope.

**Independent Test**: Tab through header controls; stakeholder spot-check calm rubric on header + Areas section.

### Implementation for User Story 3

- [x] T009 [US3] Apply calm-UI polish (spacing, soft radii, subtle hovers, restrained shadows) to `components/feature/header.tsx` and `components/feature/areas-of-work.tsx` per `specs/013-header-areas-work-ui/spec.md` FR-006 without adding new Framer Motion beyond existing `RevealSection` usage
- [x] T010 [US3] Verify and fix any `focus-visible` regressions on header links and icon buttons in `components/feature/header.tsx` after class changes

**Checkpoint**: User Story 3 acceptance scenarios satisfied.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Lint and documented manual QA.

- [x] T011 Run `npm run lint` from the repository root and resolve any issues introduced in `components/feature/header.tsx`, `components/feature/areas-of-work.tsx`, or `app/globals.css`
- [x] T012 Complete manual validation steps in `specs/013-header-areas-work-ui/quickstart.md` (header layout, colors, focus, areas image uniqueness, contrast spot-check)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1**: No dependencies — start with T001
- **Phase 2**: Depends on Phase 1 — **blocks** US1 (needs T002) and US2 (needs T003)
- **Phase 3 (US1)**: Depends on T002 and T004 sequence (T005 after T004; T006 after T005 or alongside T005 on same file — do T004 → T005 → T006)
- **Phase 4 (US2)**: Depends on T003; independent of US1 completion (can run in parallel with US1 after Phase 2 if staffed)
- **Phase 5 (US3)**: Depends on US1 and US2 implementation being in place (polish both surfaces)
- **Phase 6**: Depends on US1–US3 (or at minimum all intended story phases) before final sign-off

### User Story Dependencies

- **US1**: Requires T002; no dependency on US2
- **US2**: Requires T003; no dependency on US1
- **US3**: Builds on finished US1 + US2 UI

### Parallel Opportunities

- **Phase 2**: T002 (`app/globals.css`) and T003 (`public/images/` new file) — **[P] parallel**
- **After Phase 2**: US1 (header) and US2 (areas) touch different primary files — **parallelizable** across developers once T002/T003 are done
- **Within US1**: T004 → T005 → T006 are **sequential** (same file, dependent layout)

---

## Parallel Example: After Phase 2

```text
Developer A: T004 → T005 → T006 in components/feature/header.tsx (requires T002)
Developer B: T007 → T008 in components/feature/areas-of-work.tsx (requires T003)
Then: T009–T010 (US3) together, then T011–T012
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. T001 → T002 (+ optionally defer T003 if demoing header only)
2. T004 → T005 → T006
3. Stop and validate header independently (spec US1)

### Full feature delivery

1. Phase 1 + Phase 2 (T002 and T003)
2. US1 then US2 (or both in parallel)
3. US3 polish
4. T011–T012

### Suggested MVP scope

**User Story 1** (Phase 3) after **T002** delivers the majority of visible navigation UX; include **T003** early if shipping US2 in the same release.

---

## Notes

- Do not change `lib/routes.ts` nav targets or labels unless a separate spec requires it.
- Binary image for T003 must be legally usable on the site; commit the file to `public/images/`.
- Total tasks: **12** (T001 setup, T002–T003 foundational, T004–T006 US1, T007–T008 US2, T009–T010 US3, T011–T012 polish).
