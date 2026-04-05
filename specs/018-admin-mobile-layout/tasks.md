---
description: "Task list for 018-admin-mobile-layout"
---

# Tasks: Admin mobile layout and navigation

**Input**: Design documents from `/specs/018-admin-mobile-layout/`  
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [contracts/admin-mobile-ui.md](./contracts/admin-mobile-ui.md), [quickstart.md](./quickstart.md)

**Tests**: No automated test tasks — spec/plan call for `npm run lint` and manual verification per [quickstart.md](./quickstart.md).

**Organization**: Phases follow user stories P1 → P2 → P3; file paths are repo-root relative under `d:\Codes\TherapistLanding\kenan_kubuc_website\`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks in the same group)
- **[Story]**: User story label ([US1], [US2], [US3])
- Paths: from repository root `kenan_kubuc_website/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Baseline quality before edits.

- [x] T001 Run `npm run lint` in repository root `kenan_kubuc_website` and ensure it passes before feature edits

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Scope gate — no user story implementation until this is explicit.

**⚠️ CRITICAL**: Confirm admin-only scope before changing files.

- [x] T002 Confirm all implementation tasks target `app/(admin)/`, `components/feature/` admin/stats files, or `components/ui/` reuse only — no edits under `app/(main)/` or public marketing routes per `specs/018-admin-mobile-layout/spec.md` FR-007

**Checkpoint**: Proceed to User Story 1 (MVP).

---

## Phase 3: User Story 1 — Navigate the admin area on a phone (Priority: P1) 🎯 MVP

**Goal**: Hamburger + off-canvas navigation on narrow viewports; full inline nav from `md` up; admin shell fits viewport width without horizontal scroll.

**Independent Test**: On a phone-sized viewport, open/close the menu, navigate to at least two admin sections, no horizontal scroll of the page chrome (`specs/018-admin-mobile-layout/spec.md` User Story 1).

### Implementation for User Story 1

- [x] T003 [US1] Add mobile header row with menu `Button` + `lucide-react` icon, and hide inline nav below `md` in `components/feature/admin-shell.tsx`
- [x] T004 [US1] Render primary nav links and `AdminSignOutButton` inside `Sheet` from `components/ui/sheet.tsx` (side `left`); close sheet when a nav `Link` is activated in `components/feature/admin-shell.tsx`
- [x] T005 [US1] Keep existing horizontal nav for `md:` and up with current `navItems` and active styles in `components/feature/admin-shell.tsx`
- [x] T006 [US1] Apply width-safe layout on shell (`w-full`, `min-w-0` on flex children as needed, avoid page `overflow-x`) for `header` and `main` in `components/feature/admin-shell.tsx`
- [x] T007 [US1] Update admin home helper copy that references “Soldaki menü” to wording that fits mobile + desktop in `app/(admin)/admin/(dashboard)/page.tsx`

**Checkpoint**: User Story 1 acceptance scenarios pass independently.

---

## Phase 4: User Story 2 — List views without horizontal page scroll (Priority: P2)

**Goal**: Leads, blog, and office admin lists use a compact mobile default with progressive disclosure; shared pagination wraps safely; `md+` keeps table layout.

**Independent Test**: On a phone-sized viewport, use at least two list pages with zero horizontal page scroll; expand/collapse details without horizontal page scroll (`specs/018-admin-mobile-layout/spec.md` User Story 2).

### Implementation for User Story 2

- [x] T008 [US2] Make `AdminPagination` toolbar wrap safely (`flex-wrap`, `w-full`, spacing) on narrow widths in `components/feature/admin-data-table.tsx`
- [x] T009 [US2] Implement `md:hidden` stacked row UI + expand/toggle for secondary fields; preserve `hidden md:table` (or equivalent) for wide table in `components/feature/admin-leads-table.tsx`
- [x] T010 [P] [US2] Implement the same mobile stacked + expand pattern for `components/feature/admin-blog-table.tsx` (mirror leads behavior and a11y)
- [x] T011 [P] [US2] Implement the same mobile stacked + expand pattern for `components/feature/admin-office-table.tsx` (mirror leads behavior and a11y)

**Checkpoint**: User Stories 1 and 2 both pass independent tests.

---

## Phase 5: User Story 3 — Forms, settings, and stats on small screens (Priority: P3)

**Goal**: Stats dashboard and optional auth/settings UI do not force horizontal page scroll; charts/tables use contained overflow if needed.

**Independent Test**: Review settings and login on narrow viewport; review stats page without horizontal page scroll (`specs/018-admin-mobile-layout/spec.md` User Story 3).

### Implementation for User Story 3

- [x] T012 [US3] Add responsive grid/`min-w-0`/`w-full` fixes to shell layout around charts and date picker in `components/feature/stats/stats-dashboard.tsx`
- [x] T013 [P] [US3] Ensure `lead-stats-chart.tsx` chart containers use `w-full min-w-0` and optional contained `overflow-x-auto` only inside the chart card in `components/feature/stats/lead-stats-chart.tsx`
- [x] T014 [P] [US3] Ensure `visitor-stats-chart.tsx` chart containers use `w-full min-w-0` and optional contained overflow in `components/feature/stats/visitor-stats-chart.tsx`
- [x] T015 [P] [US3] Make `conversion-table.tsx` width-safe on small screens (stack, hide columns, or contained scroll) in `components/feature/stats/conversion-table.tsx`
- [x] T016 [P] [US3] Make `source-comparison-chart.tsx` width-safe on small screens in `components/feature/stats/source-comparison-chart.tsx`
- [x] T017 [US3] If `AdminLoginForm` overflows at ~320px width, add `max-w-full` and stacked field layout in `components/feature/admin-login-form.tsx`
- [x] T018 [US3] If password dialog content overflows on narrow screens, adjust dialog content classes in `components/feature/admin-change-password-modal.tsx` (and only touch `components/ui/dialog.tsx` if shared primitive requires it)

**Checkpoint**: All three user stories independently verifiable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Lint + manual contract verification.

- [x] T019 Run `npm run lint` in repository root `kenan_kubuc_website` after all edits
- [ ] T020 Walk through `specs/018-admin-mobile-layout/quickstart.md` and confirm `specs/018-admin-mobile-layout/contracts/admin-mobile-ui.md` sections C1–C5 on a real narrow viewport

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1** → **Phase 2** → **Phase 3 (US1)** → **Phase 4 (US2)** → **Phase 5 (US3)** → **Phase 6**
- **US2** and **US3** do not strictly depend on each other for compilation, but **recommended order** is P1 → P2 → P3 for incremental acceptance.

### User Story Dependencies

- **US1**: After Phase 2 — no dependency on US2/US3.
- **US2**: After US1 recommended (better manual testing with working nav); can start after Phase 2 if nav is stubbed (not recommended).
- **US3**: After Phase 2; stats/login/settings independent of table work but should follow after or in parallel with US2 once shell is stable.

### Within User Story 2

- **T008** before **T009** (pagination used by all tables).
- **T009** before **T010** / **T011** (leads establishes the pattern).
- **T010** and **T011** may proceed in parallel after **T009** completes.

### Within User Story 3

- **T012** before **T013**–**T016** (dashboard layout wraps charts).
- **T013**–**T016** may run in parallel after **T012** completes.
- **T017** / **T018** are conditional audits — can run in parallel with stats tasks if staffed.

### Parallel Opportunities

| After | Parallel tasks |
|-------|----------------|
| T009 | T010, T011 |
| T012 | T013, T014, T015, T016 |

---

## Parallel Example: User Story 2

```text
After T009 completes:
- T010 Implement mobile stacked + expand in components/feature/admin-blog-table.tsx
- T011 Implement mobile stacked + expand in components/feature/admin-office-table.tsx
```

---

## Parallel Example: User Story 3

```text
After T012 completes:
- T013 components/feature/stats/lead-stats-chart.tsx
- T014 components/feature/stats/visitor-stats-chart.tsx
- T015 components/feature/stats/conversion-table.tsx
- T016 components/feature/stats/source-comparison-chart.tsx
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1–2  
2. Complete Phase 3 (T003–T007)  
3. **STOP**: Manual test US1 (hamburger, no horizontal shell scroll)  
4. Demo or continue to US2

### Incremental Delivery

1. Setup + Foundational → T001–T002  
2. Add US1 → T003–T007 → validate  
3. Add US2 → T008–T011 → validate  
4. Add US3 → T012–T018 → validate  
5. Polish → T019–T020

### Parallel Team Strategy

- Developer A: US1 (T003–T007)  
- After T009 lands: Developer B: T010; Developer C: T011  
- After T012 lands: split T013–T016 across developers

---

## Summary

| Metric | Value |
|--------|--------|
| **Total tasks** | 20 (T001–T020) |
| **US1** | 5 tasks (T003–T007) |
| **US2** | 4 tasks (T008–T011) |
| **US3** | 7 tasks (T012–T018) |
| **Setup + Foundational** | 2 tasks (T001–T002) |
| **Polish** | 2 tasks (T019–T020) |
| **Suggested MVP** | Phase 3 only (T003–T007) after T001–T002 |

**Format validation**: All tasks use `- [ ]`, sequential `Txxx` IDs, story labels on US phases only, and concrete file paths in descriptions.

---

## Notes

- Row expand implementation may use local `useState` (per-row) in each table component; no global store (`specs/018-admin-mobile-layout/plan.md` constitution).
- If extracting a shared “admin mobile list row” component reduces duplication, keep it under `components/feature/` and avoid skipping hierarchy (constitution).
- Export new feature components from `components/feature/index.ts` only when adding new public exports (optional polish).
