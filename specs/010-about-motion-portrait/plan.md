# Implementation Plan: About Section Subtle Motion & Portrait

**Branch**: `010-about-motion-portrait` | **Date**: 2026-03-27 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/010-about-motion-portrait/spec.md`

**Note**: This plan is produced by `/speckit.plan`. Execution stops after Phase 1 design artifacts; task breakdown is `/speckit.tasks`.

## Summary

Update the public **About** feature so it uses the approved stock portrait (`/images/kenan_kubuc_stok.jpg`), adds **restrained** motion beyond the existing section reveal (e.g., gentle emphasis on the portrait container), and tightens presentation toward calm, trustworthy therapeutic aesthetics. **No** copy, routing, or data-layer changes. Motion **must** respect `prefers-reduced-motion` (aligned with existing `RevealSection` behavior).

## Technical Context

**Language/Version**: TypeScript 5.x (strict), Node 20+  
**Primary Dependencies**: Next.js 16 (App Router), React 19, Tailwind CSS 4, Shadcn/UI, Framer Motion 12 (already in repo)  
**Storage**: N/A (static image in `public/images/`)  
**Testing**: ESLint; manual / heuristic checks per spec success criteria  
**Target Platform**: Web (modern evergreen browsers; mobile-first responsive)  
**Project Type**: Next.js monolith (marketing + app routes)  
**Performance Goals**: No layout shift on image load beyond existing patterns; animations compositor-friendly (opacity/transform), 60 fps where animated  
**Constraints**: Server Components by default; `'use client'` only on leaf motion/interaction; design tokens via Tailwind theme (no ad-hoc hex in components); WCAG-minded contrast and focus-visible  
**Scale/Scope**: Single feature component (`components/feature/about.tsx`) plus optional small client leaf for portrait motion; one static asset swap  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|--------|
| I. Core stack (Next, React 19, Tailwind, Shadcn, Prisma, Zod) | Pass | No new stack; Framer Motion already adopted in repo (`RevealSection`). |
| II. Server-first; `'use client'` on leaf only | Pass | Keep `About` as RSC; add or extend **leaf** client wrapper only where motion hooks are required (mirror `RevealSection`). |
| III. Data / mutations | Pass | No CRUD or Server Actions for this feature. |
| IV. Directory standards | Pass | Changes under `components/feature/` and `public/images/` only; no new route strings. |
| V. No external state libraries | Pass | Motion is local / Framer, not global store. |
| Styling: Tailwind + tokens | Pass | Use utilities and existing theme; soft radii/spacing per therapeutic UI skill. |
| TS strict, explicit returns | Pass | Maintain on touched files. |

**Post–Phase 1 re-check**: Design artifacts introduce no DB entities, APIs, or non-leaf clients. **Gate: PASS.**

## Project Structure

### Documentation (this feature)

```text
specs/010-about-motion-portrait/
├── plan.md              # This file
├── research.md          # Phase 0
├── data-model.md        # Phase 1 (N/A scope)
├── quickstart.md        # Phase 1
├── contracts/           # Phase 1 (UI contract)
└── tasks.md             # /speckit.tasks (not created here)
```

### Source Code (repository root)

```text
components/
├── feature/
│   ├── about.tsx              # RSC: layout, copy, compose portrait + RevealSection
│   └── motion/
│       └── reveal-section.tsx # Existing client: in-view reveal + useReducedMotion
├── ui/                        # Unchanged unless a primitive is explicitly needed
app/                           # Pages compose feature components (unchanged contract)
public/
└── images/
    └── kenan_kubuc_stok.jpg   # Approved portrait asset (reference in plan)
```

**Structure Decision**: Single Next.js app; feature logic in `components/feature/` per constitution. Portrait-specific motion (if not expressible purely in RSC + CSS) lives in a **new** small file under `components/feature/` (e.g. `about-portrait-motion.tsx`) imported only from `about.tsx`, avoiding barrel churn unless the component is reused.

## Complexity Tracking

> No constitution violations requiring justification. Framer Motion is pre-existing project dependency for motion primitives.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |

## Phase 0: Research

See [research.md](./research.md). All technical choices for this feature are resolved there (portrait source, motion strategy, reduced-motion, styling approach).

## Phase 1: Design & Contracts

- [data-model.md](./data-model.md) — documents absence of persistent entities; static asset reference.  
- [contracts/about-section-ui.md](./contracts/about-section-ui.md) — visitor-visible behavior contract.  
- [quickstart.md](./quickstart.md) — how implementers and reviewers verify the feature locally.

## Phase 2

Task decomposition is out of scope for `/speckit.plan`; run **`/speckit.tasks`** to generate `tasks.md`.
