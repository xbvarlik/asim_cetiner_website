# Tasks: Calm areas background and modern contact inputs

**Input**: Design documents from `/specs/012-calm-areas-contact-ui/`  
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/areas-contact-ui.md](./contracts/areas-contact-ui.md)

**Tests**: Not requested in spec — no automated test tasks. Verify with `npm run lint` and [quickstart.md](./quickstart.md).

**Organization**: Phases follow user stories P1 (US1) and P2 (US2); stories are independently shippable after the short setup block.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: User story label for implementation phases only

## Path Conventions

Repository root: `d:\Codes\TherapistLanding\kenan_kubuc_website` (use relative paths from root in edits).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm design artifacts and image strategy before coding.

- [x] T001 Read `specs/012-calm-areas-contact-ui/plan.md`, `specs/012-calm-areas-contact-ui/spec.md`, and `specs/012-calm-areas-contact-ui/research.md` for acceptance criteria and asset choice
- [x] T002 [P] Record hero image path from `components/feature/hero.tsx` and confirm it differs from the areas background path documented in `specs/012-calm-areas-contact-ui/research.md` (default `public/images/kenan_kubuc_stok.jpg` vs `/images/hero-therapy-calm.jpg`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Ensure static asset and component boundaries are ready; no DB or Server Action work required.

**⚠️** User story tasks must not start until the areas image source is resolved.

- [x] T003 Verify the chosen areas background file exists under `public/images/` (default `public/images/kenan_kubuc_stok.jpg`) or add a new licensed image to `public/images/` and note the filename for `components/feature/areas-of-work.tsx`
- [x] T004 Confirm `components/feature/areas-of-work.tsx` has no `'use client'` directive so `next/image` background work stays Server Component–compatible

**Checkpoint**: Foundation ready — implement US1 and/or US2.

---

## Phase 3: User Story 1 — Calm, distinct backdrop for specialty tags (Priority: P1) 🎯 MVP

**Goal**: Areas-of-work section shows a calm photographic background behind tags, not the hero image, with readable heading and chips.

**Independent Test**: Open a page with `AreasOfWork`; background is visible; image ≠ hero; tags readable mobile + desktop (see `specs/012-calm-areas-contact-ui/quickstart.md`).

### Implementation for User Story 1

- [x] T005 [US1] Implement relative section wrapper, full-bleed `next/image` (`fill`, `object-cover`, `priority={false}`, appropriate `sizes`) and token-based overlay in `components/feature/areas-of-work.tsx` per `specs/012-calm-areas-contact-ui/research.md` and `specs/012-calm-areas-contact-ui/contracts/areas-contact-ui.md`
- [x] T006 [US1] Tune tag chip and heading styles in `components/feature/areas-of-work.tsx` so text meets WCAG-minded contrast on the chosen background (solid chip backgrounds or stronger overlay as needed)

**Checkpoint**: User Story 1 complete and testable on its own.

---

## Phase 4: User Story 2 — Comfortable, modern contact form fields (Priority: P2)

**Goal**: Taller inputs, textarea, and office select trigger in the marketing contact form only; submission and validation unchanged.

**Independent Test**: Compare field heights before/after; valid submit still succeeds; errors still per-field (`specs/012-calm-areas-contact-ui/quickstart.md`).

### Implementation for User Story 2

- [x] T007 [US2] Add `className` overrides on all `Input` and `Textarea` instances in `components/feature/contact-form.tsx` for minimum ~44px control height and modern padding without changing `name`, `id`, or validation props
- [x] T008 [US2] Add `className` override on `SelectTrigger` in `components/feature/contact-form.tsx` to match input height and preserve `focus-visible` ring visibility per `specs/012-calm-areas-contact-ui/contracts/areas-contact-ui.md`

**Checkpoint**: User Story 2 complete; US1 still passes regression smoke.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Lint and manual QA across both stories.

- [x] T009 [P] Run `npm run lint` at repository root `d:\Codes\TherapistLanding\kenan_kubuc_website`
- [x] T010 Walk through all scenarios in `specs/012-calm-areas-contact-ui/quickstart.md` (areas section + contact form + throttled load spot-check)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1** → **Phase 2** → **Phase 3 / 4** (US1 and US2 may run in parallel after Phase 2) → **Phase 5**

### User Story Dependencies

- **US1 (P1)**: Depends on Phase 2 only — no dependency on US2.
- **US2 (P2)**: Depends on Phase 2 only — no dependency on US1.

### Within Each User Story

- **US1**: T006 follows T005 (same file `components/feature/areas-of-work.tsx`).
- **US2**: T008 can follow T007 immediately (same file `components/feature/contact-form.tsx`).

### Parallel Opportunities

- **Phase 1**: T001 and T002 [P] — different focus (docs vs hero path check).
- **After Phase 2**: T005–T006 [US1] and T007–T008 [US2] — different files; two developers can split US1 vs US2.
- **Phase 5**: T009 [P] and T010 — lint while preparing manual checklist (or run lint first, then manual).

---

## Parallel Example: After Phase 2

```text
Developer A: T005, T006 in components/feature/areas-of-work.tsx [US1]
Developer B: T007, T008 in components/feature/contact-form.tsx [US2]
```

---

## Parallel Example: User Story 1 (single dev)

```text
Sequential: T005 (structure + image + overlay) then T006 (contrast polish) in components/feature/areas-of-work.tsx
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1 and Phase 2 (T001–T004).
2. Complete Phase 3 (T005–T006).
3. **STOP and VALIDATE** with areas section checks in `specs/012-calm-areas-contact-ui/quickstart.md`.
4. Deploy/demo if ready.

### Incremental Delivery

1. Setup + Foundational (T001–T004) → foundation ready.
2. Add US1 (T005–T006) → validate → optional deploy (**MVP**).
3. Add US2 (T007–T008) → validate contact form.
4. Polish (T009–T010).

### Parallel Team Strategy

1. Team completes Phase 1–2 together.
2. After T004: Developer A takes US1 (`areas-of-work.tsx`); Developer B takes US2 (`contact-form.tsx`).
3. Merge; run T009–T010 together.

---

## Task Summary

| Metric | Value |
|--------|-------|
| **Total tasks** | 10 (T001–T010) |
| **US1 tasks** | 2 (T005–T006) |
| **US2 tasks** | 2 (T007–T008) |
| **Setup + Foundational** | 4 (T001–T004) |
| **Polish** | 2 (T009–T010) |
| **Parallel-marked** | T002, T009 |

---

## Notes

- Do not edit `server/actions/lead-actions.ts`, Zod schemas, or `components/ui/input.tsx` globally for this feature unless a follow-up explicitly expands scope.
- All tasks include concrete paths or repo-root commands for executor agents.
