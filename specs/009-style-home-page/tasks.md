---
description: "Task list for 009 Public Marketing Visual & Motion Refresh"
---

# Tasks: Public Marketing Visual & Motion Refresh

**Input**: Design documents from `D:\Codes\TherapistLanding\kenan_kubuc_website\specs\009-style-home-page\`  
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/ui-public-marketing.md](./contracts/ui-public-marketing.md), [quickstart.md](./quickstart.md)

**Tests**: Omitted — not requested in the feature specification (manual QA via `quickstart.md` / UI contract).

**Organization**: Phases follow user story priorities P1 → P2 → P3, then polish.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no ordering dependency on other incomplete tasks in the same batch)
- **[Story]**: User story label ([US1], [US2], [US3]) for story phases only

## Path conventions

All paths below are relative to repository root `D:\Codes\TherapistLanding\kenan_kubuc_website\`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Dependencies and static assets required before implementation.

- [x] T001 Install `framer-motion` dependency via npm at repository root (updates `package.json` and `package-lock.json`)
- [x] T002 Add licensed calm therapy-setting hero photograph to `public/images/` (e.g. `public/images/hero-therapy-calm.jpg`) suitable for full-width hero use

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared motion primitive and typography tokens — **must complete before user story phases**.

**⚠️ CRITICAL**: No user story work should start until T001–T006 are done (T006 depends on T003).

- [x] T003 [P] Create client `RevealSection` component with `whileInView`, `viewport.once`, and reduced-motion handling in `components/feature/motion/reveal-section.tsx`
- [x] T004 [P] Register heading font via `next/font/google` and expose CSS variable on `<html>` in `app/layout.tsx` (e.g. `--font-heading`)
- [x] T005 Map heading font in `@theme` / `@layer base` for `h1–h3` and optional utility class in `app/globals.css` (consumes variable from `app/layout.tsx`)
- [x] T006 Export `RevealSection` from `components/feature/index.ts` for consistent imports across feature components

**Checkpoint**: Foundation ready — hero and sections can use motion + heading/body typography.

---

## Phase 3: User Story 1 — Immediate sense of safety and welcome (Priority: P1) 🎯 MVP

**Goal**: Home hero with photographic background, start-aligned copy and CTAs, and global shell that matches the same visual system (spec User Story 1, FR-001–002, FR-009).

**Independent Test**: Open `/` without scrolling — hero image, overlay, left/start-aligned text and CTAs; navigate to `/hizmetler` — header/footer typography and colors match home (no alternate skin).

### Implementation for User Story 1

- [x] T007 [US1] Refactor `components/feature/hero.tsx` to use `next/image` full-bleed background, scrim/overlay for contrast, start-aligned (LTR) headline and primary/secondary CTAs via `ROUTES`, and non-blocking entrance treatment per SC-003
- [x] T008 [US1] Align `components/feature/header.tsx` with updated tokens: spacing, typography, link/button hover and `focus-visible` rings consistent with marketing shell
- [x] T009 [US1] Align `components/feature/footer.tsx` with the same coordinated token and focus/hover behavior as `components/feature/header.tsx`
- [x] T010 [US1] Adjust `components/feature/site-shell.tsx` and/or outer `main` layout classes if needed so vertical rhythm and background continuity match the refreshed marketing pages

**Checkpoint**: User Story 1 demonstrable on `/` and at least one inner public page.

---

## Phase 4: User Story 2 — Calm discovery while scrolling (Priority: P2)

**Goal**: Major sections reveal smoothly on scroll across public marketing pages, respecting reduced motion (spec User Story 2, FR-004).

**Independent Test**: Scroll home and one inner page — sections fade/slide in once; enable OS reduced motion — content visible without required animation.

### Implementation for User Story 2

- [x] T011 [US2] Wrap the root section content of `components/feature/about.tsx` with `RevealSection` (or compose child inside `RevealSection`) without breaking server/client boundaries
- [x] T012 [US2] Wrap major section(s) in `components/feature/areas-of-work.tsx` with `RevealSection`
- [x] T013 [US2] Wrap major section(s) in `components/feature/services-list.tsx` with `RevealSection`
- [x] T014 [US2] Wrap the main section container in `components/feature/contact-form.tsx` with `RevealSection`
- [x] T015 [US2] Wrap the main section container in `components/feature/map-view.tsx` with `RevealSection`
- [x] T016 [P] [US2] Apply `RevealSection` to each distinct below-the-fold block on `app/(main)/hakkimda/page.tsx` *(satisfied: page renders `About`, which wraps content in `RevealSection` in `components/feature/about.tsx`)*
- [x] T017 [P] [US2] Apply `RevealSection` to each distinct below-the-fold block on `app/(main)/hizmetler/page.tsx` *(satisfied via `components/feature/services-list.tsx`)*
- [x] T018 [P] [US2] Apply `RevealSection` to each distinct below-the-fold block on `app/(main)/calisma-alanlari/page.tsx` *(satisfied via `components/feature/areas-of-work.tsx`)*
- [x] T019 [P] [US2] Apply `RevealSection` to each distinct below-the-fold block on `app/(main)/iletisim/page.tsx` *(satisfied via `ContactForm` + `MapView` feature wrappers)*
- [x] T020 [US2] Apply `RevealSection` to list/detail major sections on `app/(main)/blog/page.tsx` and `app/(main)/blog/[id]/page.tsx` where multiple scrollable sections exist

**Checkpoint**: SEO landing routes under `app/(home-variations)/` inherit `HomeTemplate` section behavior; inner `(main)` pages show scroll reveals.

---

## Phase 5: User Story 3 — Tactile, trustworthy interactions (Priority: P3)

**Goal**: Subtle hover elevation/scale/shadow on cards/tiles and obvious keyboard focus on interactive marketing controls (spec User Story 3, FR-005, SC-005).

**Independent Test**: Hover service/testimonial/blog cards; tab through header, hero CTAs, footer — focus rings visible and calm.

### Implementation for User Story 3

- [x] T021 [P] [US3] Add subtle hover and `focus-visible` transition classes to card/tile wrappers in `components/feature/services-list.tsx`
- [x] T022 [P] [US3] Add subtle hover and `focus-visible` transition classes to card/tile wrappers in `components/feature/areas-of-work.tsx`
- [x] T023 [P] [US3] Add subtle hover and `focus-visible` transition classes in `components/feature/blog-card.tsx`
- [x] T024 [US3] Audit and normalize interactive elements in `components/feature/hero.tsx`, `components/feature/header.tsx`, and `components/feature/footer.tsx` for consistent `focus-visible` rings and non-hover-only cues

**Checkpoint**: User Story 3 satisfied on home + blog list sampling.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Quality gate across all stories; no `app/(admin)/` changes.

- [x] T025 Run `npm run lint` from repository root and resolve issues introduced in touched files
- [x] T026 Run `npm run build` from repository root and fix any build/type errors from styling or client boundaries
- [ ] T027 Execute manual checks in `specs/009-style-home-page/quickstart.md` against `specs/009-style-home-page/contracts/ui-public-marketing.md` (reduced motion, focus, cross-page coherence)

---

## Dependencies & Execution Order

### Phase dependencies

| Phase | Depends on |
|-------|------------|
| Phase 1 Setup | None |
| Phase 2 Foundational | Phase 1 (T003 needs `framer-motion` from T001) |
| Phase 3 US1 | Phase 2 |
| Phase 4 US2 | Phase 2 (RevealSection + tokens); can start after T006; **recommended after US1** so hero/typography baseline is stable |
| Phase 5 US3 | Phase 3 for hero/header/footer polish targets; can overlap late US2 on different files |
| Phase 6 Polish | Phases 3–5 complete |

### User story dependencies

- **US1**: No dependency on US2/US3 — delivers MVP when combined with Setup + Foundational.
- **US2**: Independent of US3; requires `RevealSection` from Foundational.
- **US3**: Conceptually independent; easiest after cards/sections from US1/US2 exist.

### Parallel opportunities

- **Phase 1**: T001 then T002 (T002 can follow T001 immediately; different concern).
- **Phase 2**: T003 and T004 in parallel; T005 after T004; T006 after T003.
- **Phase 4**: T016–T019 in parallel (different `page.tsx` files).
- **Phase 5**: T021–T023 in parallel (different feature files).

---

## Parallel example: User Story 2 (inner pages)

```text
# After shared components T011–T015 are merged or stashed, split page work:

Task T016 — `app/(main)/hakkimda/page.tsx`
Task T017 — `app/(main)/hizmetler/page.tsx`
Task T018 — `app/(main)/calisma-alanlari/page.tsx`
Task T019 — `app/(main)/iletisim/page.tsx`
```

---

## Parallel example: User Story 3

```text
Task T021 — `components/feature/services-list.tsx`
Task T022 — `components/feature/areas-of-work.tsx`
Task T023 — `components/feature/blog-card.tsx`
```

---

## Implementation strategy

### MVP first (User Story 1 only)

1. Complete Phase 1 (T001–T002) and Phase 2 (T003–T006).
2. Complete Phase 3 (T007–T010).
3. **STOP and validate** using User Story 1 **Independent Test** above.

### Incremental delivery

1. Add Phase 4 (US2) → validate scroll + reduced motion.
2. Add Phase 5 (US3) → validate hover/focus.
3. Phase 6 → lint, build, manual contract checklist.

### Suggested full-story task counts

| Story | Task IDs | Count |
|-------|-----------|-------|
| Setup | T001–T002 | 2 |
| Foundational | T003–T006 | 4 |
| US1 | T007–T010 | 4 |
| US2 | T011–T020 | 10 |
| US3 | T021–T024 | 4 |
| Polish | T025–T027 | 3 |
| **Total** | T001–T027 | **27** |

---

## Format validation

- All lines use checklist prefix `- [ ]`.
- All tasks include sequential IDs `T001`–`T027`.
- All user-story tasks include `[US1]`, `[US2]`, or `[US3]`.
- Parallel tasks marked `[P]` only where files and dependencies allow.
- Each description names at least one concrete path or root-level command.

## Notes

- **T027** (manual QA per `quickstart.md` + `contracts/ui-public-marketing.md`) is left **open** for a human pass (reduced motion, keyboard focus, cross-page spot check).
- Do not restyle `app/(admin)/` routes in this feature.
- Keep Server Components default; add `'use client'` only on `components/feature/motion/reveal-section.tsx` and any future tiny motion leaves if split further.
- Commit after each phase checkpoint where possible.
