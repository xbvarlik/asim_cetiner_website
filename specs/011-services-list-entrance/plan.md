# Implementation Plan: Services list entrance and calm presentation

**Branch**: `011-services-list-entrance` | **Date**: 2026-03-27 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/011-services-list-entrance/spec.md`

**Note**: This plan is produced by `/speckit.plan`. Execution stops after Phase 1 design artifacts; task breakdown is `/speckit.tasks`.

## Summary

Implement **per–service-item** entrance motion (bottom → up, ordered top-to-bottom) when the services block enters the viewport, while **preserving** existing card hover (`translate`, scale, shadow) and focus-within rings. Refine spacing, hierarchy, and tokens toward calm therapeutic UI. **No** changes to service copy, count, or data layer. **Reduced motion**: respect `prefers-reduced-motion` (same bar as `RevealSection`).

## Technical Context

**Language/Version**: TypeScript 5.x (strict), Node 20+  
**Primary Dependencies**: Next.js 16 (App Router), React 19, Tailwind CSS 4, Shadcn/UI, Framer Motion 12 (already in repo)  
**Storage**: N/A (static list in feature code)  
**Testing**: ESLint; manual verification per [quickstart.md](./quickstart.md) and spec success criteria  
**Target Platform**: Web (modern evergreen browsers; mobile-first responsive)  
**Project Type**: Next.js monolith (marketing + app routes)  
**Performance Goals**: Entrance uses transform/opacity only; staggered items complete within ~4s total (spec SC-002); avoid layout shift  
**Constraints**: Server Components by default; `'use client'` only on the smallest subtree that needs Framer `motion` / `useReducedMotion`; design tokens via Tailwind theme (no ad-hoc hex); WCAG-minded contrast and `focus-visible`  
**Scale/Scope**: `components/feature/services-list.tsx` plus optional new leaf client module under `components/feature/` (or co-located pattern); existing `components/feature/motion/reveal-section.tsx` as reference only  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Core stack (Next, React 19, Tailwind, Shadcn, Prisma, Zod) | Pass | No new dependencies; Framer Motion already in use. |
| II. Server-first; `'use client'` on leaf only | Pass | Keep section shell as RSC if possible; isolate **leaf** client wrapper for staggered `motion` on each card (see [research.md](./research.md)). |
| III. Data / mutations | Pass | No Server Actions or Prisma changes. |
| IV. Directory standards | Pass | Changes under `components/feature/`; no new hardcoded routes. |
| V. No external state libraries | Pass | Animation is local; no global store. |
| Styling: Tailwind + tokens | Pass | Use theme utilities; 8px grid, soft radii per therapeutic UI guidance. |
| TS strict, explicit returns | Pass | Maintain on touched files. |

**Post–Phase 1 re-check**: Artifacts add no APIs or DB entities; UI contract documents visitor-visible behavior only. **Gate: PASS.**

## Project Structure

### Documentation (this feature)

```text
specs/011-services-list-entrance/
├── plan.md              # This file
├── research.md          # Phase 0
├── data-model.md        # Phase 1 (static presentation model)
├── quickstart.md        # Phase 1
├── contracts/           # Phase 1 (UI contract)
└── tasks.md             # /speckit.tasks (not created here)
```

### Source Code (repository root)

```text
components/
├── feature/
│   ├── services-list.tsx           # RSC: section, heading, compose animated grid
│   ├── services-list-cards.tsx     # New 'use client' leaf (optional name): SERVICES data + staggered motion wrappers
│   └── motion/
│       └── reveal-section.tsx      # Reference: useReducedMotion + in-view pattern (section-level; avoid double-choreography)
app/                                # Pages unchanged; still compose ServicesList
```

**Structure Decision**: Single Next.js app. Staggered item motion lives in a **dedicated client leaf** so the parent list file can remain an RSC shell; **motion wrapper outside hover transform** avoids Framer vs. Tailwind `transform` conflicts on the same node (see research).

## Complexity Tracking

> No constitution violations requiring justification.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |

## Phase 0: Research

See [research.md](./research.md). Resolves viewport trigger, stagger timing, reduced motion, hover preservation, and relationship to `RevealSection`.

## Phase 1: Design & Contracts

- [data-model.md](./data-model.md) — static `ServiceItem` shape and ordering rules.  
- [contracts/services-list-ui.md](./contracts/services-list-ui.md) — visitor-visible behavior contract.  
- [quickstart.md](./quickstart.md) — local verification steps.

## Phase 2

Task decomposition is out of scope for `/speckit.plan`; run **`/speckit.tasks`** to generate `tasks.md`.
