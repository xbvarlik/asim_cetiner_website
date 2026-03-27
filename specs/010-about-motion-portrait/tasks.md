# Tasks: About Section Subtle Motion & Portrait

**Input**: Design documents from `/specs/010-about-motion-portrait/`  
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [contracts/about-section-ui.md](./contracts/about-section-ui.md), [quickstart.md](./quickstart.md)

**Tests**: Not requested in the feature spec; validation is **manual / ESLint** per plan.

**Organization**: Tasks are grouped by user story (P1, P2) so each story can be verified independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no ordering dependency)
- **[Story]**: `US1` = User Story 1 (P1), `US2` = User Story 2 (P2)
- Paths are relative to repository root

---

## Phase 1: Preconditions

**Purpose**: Confirm assets and context before code changes

- [x] T001 [P] Verify `public/images/kenan_kubuc_stok.jpg` exists and is suitable for production use (replace or add file if missing per design)

**Checkpoint**: Stock portrait available at `/images/kenan_kubuc_stok.jpg`

---

## Phase 2: User Story 1 — Calm, living About presentation (Priority: P1)

**Goal**: About section shows the approved portrait and subtle, professional motion that does not overpower copy.

**Independent Test**: Load the page with default motion settings; scroll to About — portrait is correct image; motion is gentle; text remains easy to read on mobile and desktop.

### Implementation

- [x] T002 [US1] Add leaf client component `components/feature/about-portrait-motion.tsx`: wrap portrait area with Framer Motion; use `useReducedMotion()` for static fallback; keep animations transform/opacity-based, duration ≥ ~0.5s, no flashy or looping “ambient” unless spec allows (prefer one-shot in-view or subtle hover only)
- [x] T003 [US1] Update `components/feature/about.tsx`: set `next/image` `src` to `/images/kenan_kubuc_stok.jpg`; compose `AboutPortraitMotion` (or chosen name) around the existing aspect-ratio portrait container; preserve copy and `RevealSection` wrapper unchanged
- [x] T004 [P] [US1] Refine portrait frame Tailwind on the About section: soft radius, optional `shadow-sm`, `bg-muted` / spacing consistent with calm therapeutic layout (`py-20`/`sm:py-28` grid unchanged unless spacing must adjust for new frame)
- [x] T005 [US1] Confirm `sizes` and `alt` on `Image` remain appropriate for the new asset and layout breakpoints

**Checkpoint**: US1 acceptance scenarios in [spec.md](./spec.md) (portrait, readability, mobile layout) pass on manual check

---

## Phase 3: User Story 2 — Reduced motion & keyboard comfort (Priority: P2)

**Goal**: With OS/browser reduced motion enabled, portrait and section behave per [contracts/about-section-ui.md](./contracts/about-section-ui.md); focusable content stays usable.

**Independent Test**: Enable reduced motion, reload, scroll to About — no inappropriate continuous/repeating movement; tab through any focusables in the section.

### Implementation & verification

- [x] T006 [US2] In `components/feature/about-portrait-motion.tsx`, ensure reduced-motion branch matches contract: static presentation (no continuous loop, damped or disabled hover emphasis as agreed in research)
- [x] T007 [US2] If About introduces or wraps focusable elements, ensure `focus-visible` rings meet project conventions; otherwise confirm no regression vs. previous About section
- [x] T008 [US2] Run through [quickstart.md](./quickstart.md) checks 2–5 (motion default, reduced motion, responsive, keyboard)

**Checkpoint**: US2 acceptance scenarios and SC-003 satisfied

---

## Phase 4: Polish & cross-cutting

- [x] T009 [P] Run `npm run lint` and fix any issues in touched files
- [x] T010 Confirm no new barrel export is required (internal-only leaf); if the component is reused elsewhere later, add to `components/feature/index.ts` then

**Checkpoint**: Lint clean; [quickstart.md](./quickstart.md) fully satisfied

---

## Dependencies & execution order

### Phase dependencies

| Phase | Depends on | Notes |
|-------|------------|--------|
| 1 Preconditions | — | Start anytime |
| 2 US1 (P1) | T001 recommended | Can start once asset path is certain |
| 3 US2 (P2) | T002–T005 | Reduced-motion logic lives in same leaf as US1 |
| 4 Polish | T002–T008 | Final pass |

### Within US1

- T002 before T003 (component exists before composition), **or** implement T002+T004 in parallel if T003 is last integration step
- Recommended sequence: **T002 → T003 → T004 → T005**

### Parallel opportunities

- **T001** parallel with drafting **T002** (different concerns) if asset already present
- **T004** can be done alongside **T002** if coordinated (same file eventually — avoid merge conflict: prefer sequential **T002 → T003 → T004**)
- **T009** parallel with documentation-only updates (none required here)

---

## Implementation strategy

### MVP (US1 only)

1. Complete T001  
2. Complete T002–T005 and validate US1  
3. Stop for demo if P2 can follow later  

### Full feature (spec)

1. T001 → Phase 2 (US1) → Phase 3 (US2) → Phase 4  

---

## Notes

- Do not change About **copy**, routes, or data layer (FR-006).  
- Keep `About` as a **Server Component**; only the new portrait wrapper is `"use client"`.  
- Commit after each task or logical group.
