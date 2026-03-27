# Tasks: Header, Mobile Menu, Service Cards, and CTA Layout

**Input**: Design documents from `/specs/015-header-services-cta-layout/`  
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/ui-layout.md](./contracts/ui-layout.md), [quickstart.md](./quickstart.md)

**Tests**: Not requested in the specification; validation via `npm run lint` and [quickstart.md](./quickstart.md).

**Organization**: Phases follow user story priority (P1 → P2); setup and polish bookend the work.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on incomplete tasks in another stream)
- **[Story]**: [US1]–[US4] map to user stories in `spec.md`

## Path Conventions

Single Next.js app at repository root; feature code in `components/feature/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Baseline tooling before edits.

- [x] T001 Run `npm run lint` from repository root `d:\Codes\TherapistLanding\kenan_kubuc_website` and fix any pre-existing issues only if they block this feature branch

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Confirm scope and targets; no migrations or APIs for this feature.

**⚠️ CRITICAL**: User story work should not start until this checkpoint is satisfied.

- [x] T002 Confirm presentation-only scope (no Prisma/schema changes) per `specs/015-header-services-cta-layout/data-model.md` and that target files exist: `components/feature/header.tsx`, `components/feature/services-list-cards.tsx`, `components/feature/mobile-bottom-contact-bar.tsx`, `components/feature/site-shell.tsx`

**Checkpoint**: Foundation ready — implementation can proceed.

---

## Phase 3: User Story 1 — Predictable header and navigation placement (Priority: P1) 🎯 MVP (part 1)

**Goal**: Three-zone desktop header (brand | middle-band centered nav | actions); mobile menu trigger remains on the right with share/actions.

**Independent Test**: Resize viewport per `spec.md` User Story 1; at `lg+`, nav centered between brand and right-side actions; below `lg`, menu control on the right.

### Implementation for User Story 1

- [x] T003 [US1] Replace header inner layout with `grid-cols-[auto_1fr_auto]` (or equivalent), place brand in the first column, desktop `<nav className="hidden lg:flex">` centered in the middle column, and share + sheet trigger in the third column in `components/feature/header.tsx`

**Checkpoint**: User Story 1 layout behaviors hold before refining the sheet contents (User Story 2).

---

## Phase 4: User Story 2 — Clear, comfortable full-screen navigation (Priority: P1) 🎯 MVP (part 2)

**Goal**: No visible “Menü” title; centered sheet links; larger vertical tap rows; close control unchanged.

**Independent Test**: Open sheet on phone-width viewport per `spec.md` User Story 2 and `contracts/ui-layout.md` (S-001–S-004).

### Implementation for User Story 2

- [x] T004 [US2] Remove visible “Menü” `SheetTitle` styling; keep an accessible name via `sr-only` (or equivalent) on `SheetTitle` in `components/feature/header.tsx` without violating FR-005
- [x] T005 [US2] Update sheet `<nav>` and link classes for centered text and increased vertical padding/min-height per row in `components/feature/header.tsx`; optionally widen `SheetContent` via `className` on the same file per `specs/015-header-services-cta-layout/research.md`

**Checkpoint**: User Stories 1 and 2 both testable on `components/feature/header.tsx`.

---

## Phase 5: User Story 3 — Uniform service cards (Priority: P2)

**Goal**: Equal card heights per grid row; single-column layout matches tallest card in the list.

**Independent Test**: Load services section / `app/(main)/hizmetler/page.tsx` with mixed description lengths; verify per `spec.md` User Story 3.

### Implementation for User Story 3

- [x] T006 [P] [US3] Implement equal-height cards using grid stretch, `h-full` wrappers, and inner `flex flex-col h-full` with description area `flex-1` (preserve `useReducedMotion` branches) in `components/feature/services-list-cards.tsx`

**Checkpoint**: User Story 3 independent of header/CTA regressions when tested in isolation.

---

## Phase 6: User Story 4 — Streamlined call-to-action and desktop visibility (Priority: P2)

**Goal**: Remove redundant Accessibility chrome on phone CTA; show bottom contact bar on desktop; avoid obscuring main content.

**Independent Test**: Narrow and wide viewports per `spec.md` User Story 4 and `contracts/ui-layout.md` (T-001–T-004).

### Implementation for User Story 4

- [x] T007 [US4] Remove `Accessibility` icon/import and decorative trailing span inside the phone anchor; keep phone link semantics and `aria-label` in `components/feature/mobile-bottom-contact-bar.tsx`
- [x] T008 [US4] Remove `md:hidden` (or equivalent) from the bar container; add responsive flex/layout so WhatsApp + Tel remain usable on large screens in `components/feature/mobile-bottom-contact-bar.tsx`
- [x] T009 [US4] Add appropriate bottom padding to `<main>` for viewports where the fixed CTA is visible (e.g. `md:pb-*`) in `components/feature/site-shell.tsx` so footer and last sections are not covered

**Checkpoint**: User Story 4 complete; all four stories independently verifiable.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Repo health and manual regression pass.

- [x] T010 Run `npm run lint` from repository root `d:\Codes\TherapistLanding\kenan_kubuc_website` and resolve any issues introduced by this feature
- [x] T011 Execute manual steps in `specs/015-header-services-cta-layout/quickstart.md` and note any deviations in the PR / handoff

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No prerequisites.
- **Phase 2 (Foundational)**: Depends on Phase 1 (optional); blocks user-story phases.
- **Phases 3–6 (User Stories)**: Depend on Phase 2. Recommended order: **US1 (T003) → US2 (T004–T005)** on `header.tsx`, then **US3** and/or **US4** (see below).
- **Phase 7 (Polish)**: Depends on all desired user story tasks.

### User Story Dependencies

- **US1 → US2**: Same file `components/feature/header.tsx`; complete **T003** before **T004–T005** to reduce merge/rebase friction.
- **US3**: Independent after Phase 2; touches only `components/feature/services-list-cards.tsx`.
- **US4**: **T007** then **T008** (same file); **T009** (`site-shell.tsx`) after **T008** so layout matches visible bar.

### Parallel Opportunities

| After checkpoint | Parallel tasks | Files |
|------------------|----------------|--------|
| Phase 2 complete | T003 [US1] with T006 [P] [US3] with T007 [US4] | `header.tsx` vs `services-list-cards.tsx` vs `mobile-bottom-contact-bar.tsx` |
| T003 complete | T004–T005 [US2] with T006 [US3] if T006 not started | `header.tsx` vs `services-list-cards.tsx` — only if team splits work; otherwise finish US2 on header first |
| T007 complete | T008 [US4] sequential same file; T006 [US3] still parallel if not done | — |

**Suggested sequential path (single developer)**: T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008 → T009 → T010 → T011.

---

## Parallel Example: After Phase 2 (multi-developer)

```text
Developer A: T003 → T004 → T005 in components/feature/header.tsx
Developer B: T006 in components/feature/services-list-cards.tsx
Developer C: T007 → T008 in components/feature/mobile-bottom-contact-bar.tsx, then T009 in components/feature/site-shell.tsx
```

---

## Implementation Strategy

### MVP First (both P1 stories)

1. Complete Phase 1–2 (T001–T002).  
2. Complete Phase 3–4 (T003–T005): header + sheet.  
3. **STOP and VALIDATE**: `quickstart.md` header and sheet sections.  
4. Optionally ship; then add P2 (T006–T009).

### Incremental Delivery

1. Setup + Foundational → T002 satisfied.  
2. US1 + US2 → shippable improvement to navigation UX.  
3. US3 → services grid polish.  
4. US4 → CTA parity on desktop + cleaner phone CTA.  
5. Polish → T010–T011.

### Task counts

| Scope | Task IDs | Count |
|-------|-----------|-------|
| Setup | T001 | 1 |
| Foundational | T002 | 1 |
| US1 | T003 | 1 |
| US2 | T004–T005 | 2 |
| US3 | T006 | 1 |
| US4 | T007–T009 | 3 |
| Polish | T010–T011 | 2 |
| **Total** | T001–T011 | **11** |

---

## Format validation

All tasks use the checklist form `- [ ] Tnnn ...` with sequential IDs, exact file paths in the description, and **[USn]** labels on user-story phase tasks only; **T006** is the sole **[P]** task (parallelizable with header/CTA work after Phase 2).

---

## Notes

- Do not change `lib/routes.ts` or nav `href` values unless a separate spec requires it.  
- If `SheetTitle` is required by the dialog primitive, prefer `sr-only` text over removing the node entirely.  
- Commit after each phase or logical group (e.g. after T005).
