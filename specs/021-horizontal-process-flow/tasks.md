# Tasks: Horizontal process flow (“Süreç Nasıl İşliyor?”)

**Input**: Design documents from `/specs/021-horizontal-process-flow/`  
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/how-it-works-layout.md](./contracts/how-it-works-layout.md), [quickstart.md](./quickstart.md)

**Tests**: Not requested in spec — no automated test tasks. Validate via `npm run lint`, `npm run build`, and [quickstart.md](./quickstart.md).

**Organization**: Phases follow spec user stories (P1 → P2), then polish.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no ordering dependency on other open tasks)
- **[Story]**: `US1` = desktop path clarity (spec User Story 1); `US2` = narrow viewport + assistive tech (spec User Story 2)

## Path conventions

All paths are under repository root `d:\Codes\TherapistLanding\asim_cetiner_website\` unless noted.

---

## Phase 1: Setup

**Purpose**: Baseline and alignment before code changes.

- [x] T001 Run `npm run lint` from `d:\Codes\TherapistLanding\asim_cetiner_website` and fix any pre-existing issues only if they block edits to `components/feature/how-it-works.tsx`
- [x] T002 [P] Read `specs/021-horizontal-process-flow/plan.md`, `specs/021-horizontal-process-flow/spec.md`, `specs/021-horizontal-process-flow/research.md`, and `specs/021-horizontal-process-flow/contracts/how-it-works-layout.md` before implementing

---

## Phase 2: Foundational (blocking prerequisites)

**Purpose**: Confirm static content invariants before layout work.

**⚠️** Complete **before** User Story tasks that assume step data is stable.

- [x] T003 Verify `HOW_IT_WORKS_STEPS` in `lib/content/how-it-works.ts` matches `specs/021-horizontal-process-flow/data-model.md` (length 4–5; `order` strictly increasing; no code change expected unless data is invalid)

**Checkpoint**: Content module ready — proceed to `how-it-works.tsx` refactor.

---

## Phase 3: User Story 1 — Understand the process at a glance (Priority: P1) 🎯 MVP

**Goal**: On desktop-class widths, visitors see one horizontal path: dashed connector through circular numbered nodes, titles and descriptions centered under each node, even spacing, no per-step cards.

**Independent Test**: At `lg`+ viewport, open `/` — section shows five steps on one line with dashed path, dark circular nodes with light edge, no card shadows/borders on steps; spacing looks uniform.

### Implementation for User Story 1

- [x] T004 [US1] Refactor `components/feature/how-it-works.tsx`: replace card-style `<li>` grid with a full-width **relative** track; use **CSS grid** with one row and column count matching `HOW_IT_WORKS_STEPS.length` for equal step columns; add a **single horizontal dashed connector** (e.g. absolutely positioned top `border-t` dashed) aligned to **node vertical center** spanning the track; remove `shadow-*`, `border`, `bg-card`, and ring chrome from individual steps per `specs/021-horizontal-process-flow/contracts/how-it-works-layout.md`
- [x] T005 [US1] In `components/feature/how-it-works.tsx`, implement **circular nodes** on the connector using **theme tokens** from `app/globals.css` `@theme` (no ad-hoc hex for brand surfaces): dark fill, light edge, **centered step number** inside; mark decorative numerals **`aria-hidden`** where list semantics already convey order; center **bold** title (`text-foreground`) and **muted** description (`text-muted-foreground`) under each node; keep section intro, `bg-background`, and existing `RevealSection` wrapper

**Checkpoint**: US1 visually matches spec acceptance scenarios 1–3 on large viewports.

---

## Phase 4: User Story 2 — Small screens and assistive support (Priority: P2)

**Goal**: Narrow viewports remain readable with all steps discoverable; screen readers hear steps in the same order as the visual sequence.

**Independent Test**: Resize to mobile width — scroll or layout still exposes all five steps in order without overlapping illegible text; spot-check VoiceOver/NVDA order 1→5.

### Implementation for User Story 2

- [x] T006 [US2] In `components/feature/how-it-works.tsx`, add **mobile-first** narrow-viewport behavior per `specs/021-horizontal-process-flow/research.md`: wrap the step row in **`overflow-x-auto`** (and optional `snap-x` / padding) with an inner track **`min-w-*`** so every step remains reachable horizontally; avoid clipping titles/descriptions against neighbors
- [x] T007 [US2] In `components/feature/how-it-works.tsx`, keep semantic **`<ol>` / `<li>`** with programmatic order matching left-to-right visual order; if the scroll region is focusable, add **`focus-visible`** ring consistent with site patterns; add **`aria-label`** (Turkish) on the scroll region only if needed for discoverability without duplicating the section heading

**Checkpoint**: US2 meets spec acceptance scenarios for narrow viewports and assistive order.

---

## Phase 5: Polish & cross-cutting

**Purpose**: Repo health and quickstart sign-off.

- [x] T008 [P] Run `npm run lint` and `npm run build` from `d:\Codes\TherapistLanding\asim_cetiner_website`
- [x] T009 [P] Execute manual verification per `specs/021-horizontal-process-flow/quickstart.md` (desktop layout, spacing, narrow width, a11y smoke)

---

## Dependencies & execution order

### Phase dependencies

| Phase | Depends on |
|-------|------------|
| Phase 1 | — |
| Phase 2 (T003) | Phase 1 (recommended) |
| Phase 3 (US1) | Phase 2 |
| Phase 4 (US2) | Phase 3 (same file; complete US1 layout first) |
| Phase 5 | Phases 3–4 complete |

### User story dependencies

- **US1 (P1)**: No dependency on US2.
- **US2 (P2)**: Depends on US1 structure in `components/feature/how-it-works.tsx` being in place (sequential edits to the same file).

### Within User Story 1

- **T004** before **T005** (grid/connector before node styling and typography).

### Parallel opportunities

| After | Parallel tasks |
|-------|----------------|
| Phase 1 start | T001 and T002 [P] can run in parallel (different activities) |
| US1 + US2 complete | T008 and T009 [P] in parallel |

---

## Parallel example: User Story 1

```text
Single assignee recommended (one file):
T004 components/feature/how-it-works.tsx (grid + connector + remove cards)
then
T005 components/feature/how-it-works.tsx (nodes + centered copy + tokens)
```

---

## Parallel example: Polish

```text
Developer A: T008 npm run lint && npm run build
Developer B: T009 quickstart.md manual checks (while build runs)
```

---

## Implementation strategy

### MVP first (User Story 1 only)

1. Complete Phase 1–2.
2. Complete Phase 3 (T004–T005).
3. **STOP**: Validate desktop layout against `specs/021-horizontal-process-flow/quickstart.md` desktop items.

### Incremental delivery

1. US1 → horizontal flow on large screens (core trust UX).
2. US2 → scroll + a11y polish on small screens and AT.
3. Polish → lint, build, full quickstart.

### Task counts

| Scope | Tasks |
|-------|------:|
| Phase 1 Setup | 2 |
| Phase 2 Foundational | 1 |
| US1 | 2 |
| US2 | 2 |
| Polish | 2 |
| **Total** | **9** |

**Format validation**: Every task uses `- [ ] Tnnn` with checkbox, sequential ID, and at least one concrete file path in the description; `[USn]` only on user-story phase tasks; `[P]` only where parallel-safe.

---

## Notes

- Do not change `components/feature/home-template.tsx` section order (still governed by `specs/020-how-testimonials-home/contracts/home-content.md`).
- Prefer **Server Component** for `HowItWorks`; do not add `'use client'` unless a justified leaf is required later.
- If step count changes in the future, grid column count should remain derived from `HOW_IT_WORKS_STEPS.length` (or equivalent) so FR-006 stays satisfied.
