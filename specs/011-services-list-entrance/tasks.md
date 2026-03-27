---
description: "Task list for 011-services-list-entrance implementation"
---

# Tasks: Services list entrance and calm presentation

**Input**: Design documents from `/specs/011-services-list-entrance/`  
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/services-list-ui.md](./contracts/services-list-ui.md), [quickstart.md](./quickstart.md)

**Tests**: Not requested in the specification; verification via ESLint and [quickstart.md](./quickstart.md).

**Organization**: Phases follow spec user-story priorities (P1 → P2); foundational work establishes the client leaf before motion or polish.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different concerns, no ordering dependency within the same phase)
- **[Story]**: `US1` / `US2` map to [spec.md](./spec.md) user stories

## Path Conventions

Next.js app at repository root: `components/feature/`, `app/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Align implementer with feature docs and integration point before code changes.

- [x] T001 [P] Read `specs/011-services-list-entrance/research.md` and `specs/011-services-list-entrance/contracts/services-list-ui.md` and note entrance, hover-preservation, and reduced-motion rules
- [x] T002 [P] Confirm `ServicesList` remains composed from `components/feature/home-template.tsx` via `import { ServicesList } from "./services-list"` (no route or page rename required)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Introduce the **client leaf** and RSC shell split so Framer Motion can target each card without widening the client boundary unnecessarily.

**⚠️ CRITICAL**: No user story motion or presentation polish should land before this phase is done.

- [x] T003 Create `components/feature/services-list-cards.tsx` with `'use client'`, move `ServiceItem` type, `SERVICES` array, and the grid `map` from `components/feature/services-list.tsx`, rendering the same card markup with **unchanged** inner card `className` (hover / `focus-within` utilities preserved verbatim)
- [x] T004 Update `components/feature/services-list.tsx` to remove the full-section `RevealSection` wrapper from `components/feature/services-list.tsx`, keep the `<section>` heading and container layout as RSC, and import and render `ServicesListCards` from `components/feature/services-list-cards.tsx`

**Checkpoint**: App builds; services grid matches pre-feature layout and hover (no new entrance yet).

---

## Phase 3: User Story 1 — Services reveal upward (Priority: P1) 🎯 MVP

**Goal**: Each service card enters **from below** into place when the grid enters the viewport, in **list order**, within a reasonable total time; **reduced motion** shows static content.

**Independent Test**: Scroll until the services grid enters view; confirm ordered bottom-to-up entrance; enable OS reduced motion and confirm no entrance animation (see [quickstart.md](./quickstart.md)).

### Implementation for User Story 1

- [x] T005 [US1] In `components/feature/services-list-cards.tsx`, wrap each card in an outer `motion.div` with `initial`/`whileInView` using **opacity** and **positive `y`** (from below), `viewport={{ once: true, amount: 0.18–0.25 }}`, staggered `transition.delay` by index (~0.06–0.09s per step), duration ~0.5–0.65s, ease aligned with `components/feature/motion/reveal-section.tsx`; keep **inner** card `div` as the only node with hover scale/translate/shadow classes
- [x] T006 [US1] In `components/feature/services-list-cards.tsx`, use `useReducedMotion()` from `framer-motion` to render **non-`motion`** wrappers (plain `div`) with no entrance animation when reduced motion is preferred, matching the fallback pattern in `components/feature/motion/reveal-section.tsx`

**Checkpoint**: User Story 1 acceptance scenarios in [spec.md](./spec.md) are satisfied; MVP is shippable for motion-only scope.

---

## Phase 4: User Story 2 — Hover unchanged; calmer presentation (Priority: P2)

**Goal**: Hover/`focus-within` behavior remains **character-equivalent** to baseline; spacing and typography support calm, readable hierarchy using **theme tokens only**.

**Independent Test**: Compare hover/focus to pre-change baseline; review spacing and contrast (see [quickstart.md](./quickstart.md)).

### Implementation for User Story 2

- [x] T007 [US2] Verify in `components/feature/services-list-cards.tsx` that the inner service card `className` string still includes the same `group`, `hover:-translate-y-1`, `hover:scale-[1.02]`, `hover:shadow-lg`, and `focus-within:ring-*` utilities as before the refactor (adjust only if fixing an unintended regression)
- [x] T008 [US2] Apply token-based calm presentation tweaks per FR-004 in `components/feature/services-list.tsx` and/or `components/feature/services-list-cards.tsx` (e.g. comfortable header-to-grid spacing on the 8px grid, `leading-relaxed` or equivalent on descriptions, no raw hex colors)

**Checkpoint**: User Story 2 acceptance scenarios in [spec.md](./spec.md) are satisfied alongside User Story 1.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Lint and manual validation across both stories.

- [x] T009 Run `npm run lint` and resolve issues introduced in `components/feature/services-list.tsx` and `components/feature/services-list-cards.tsx`
- [x] T010 Follow all steps in `specs/011-services-list-entrance/quickstart.md` (entrance, hover, keyboard focus, reduced motion, no console errors)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1**: No dependencies — start immediately.
- **Phase 2**: Depends on Phase 1 — **blocks** User Story phases.
- **Phase 3 (US1)**: Depends on Phase 2 completion.
- **Phase 4 (US2)**: Depends on Phase 3 completion (same module; avoids merge conflicts and preserves hover audit after motion wrappers exist).
- **Phase 5**: Depends on Phase 4 completion.

### User Story Dependencies

- **US1**: Starts after Phase 2; no dependency on US2.
- **US2**: Starts after US1 (recommended: same files; validate hover after `motion` wrappers land).

### Parallel Opportunities

- **Phase 1**: T001 and T002 may run in parallel.
- **Phase 2**: T003 then T004 — sequential (T004 imports T003 export).
- **Phase 3**: T005 then T006 — sequential (same file; reduced motion branches on same structure).
- **Phase 4**: T007 then T008 — sequential (confirm baseline before token tweaks).
- **Phase 5**: T009 then T010 — sequential (lint before manual pass).

---

## Parallel Example: Phase 1

```text
Task T001: Read research.md + contracts/services-list-ui.md
Task T002: Confirm home-template.tsx import of ServicesList
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1).
3. **STOP and VALIDATE** using [quickstart.md](./quickstart.md) entrance + reduced-motion checks.
4. Ship or demo MVP.

### Incremental Delivery

1. Phase 1 → Phase 2 → foundation ready.
2. Add Phase 3 (US1) → validate → deploy/demo (MVP).
3. Add Phase 4 (US2) → validate → deploy/demo.
4. Phase 5 → final lint and full quickstart sign-off.

### Parallel Team Strategy

- After Phase 2, a single developer normally implements US1 then US2 on `services-list-cards.tsx` / `services-list.tsx`.
- Phase 1 tasks can be split between two people with no conflict.

---

## Notes

- Do not change service **copy** or **count** (spec assumption).
- Do not add new dependencies; use existing `framer-motion` in `package.json`.
- Barrel file `components/feature/index.ts` only changes if you choose to export the new client module (not required for `ServicesList` public API).
