# Implementation Plan: Header, Areas of Work Imagery, and Calm UI

**Branch**: `013-header-areas-work-ui` | **Date**: 2026-03-27 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/013-header-areas-work-ui/spec.md`

**Note**: This plan is produced by `/speckit.plan`. Execution stops after Phase 1 design artifacts; task breakdown is `/speckit.tasks`.

## Summary

Raise the **sticky site header** vertical presence (`components/feature/header.tsx` today uses `h-16`), **re-center the desktop navigation cluster** in the header bar (logo remains leading; share + mobile controls remain trailing), and apply **larger link typography** with a **dark green** default color via **design tokens** (extend `app/globals.css` `@theme inline` / `:root` — no ad-hoc hex in JSX per constitution).

Replace the **Çalışma Alanları** background asset so it is **not reused elsewhere**: current **`/images/kenan_kubuc_stok.jpg`** appears in both **`areas-of-work.tsx`** and **`about.tsx`**, and **`/images/hero-therapy-calm.jpg`** is hero-only. Implementation adds a **new** licensed file under `public/images/` (e.g. calm nature/abstract therapy-adjacent stock) and points **`AREAS_BACKGROUND_SRC`** only at that file; **About** keeps the portrait/stock it uses today unless a future spec changes it.

Apply **calm UI** polish consistent with therapist-facing marketing: spacing, soft radii, `focus-visible` rings (already present — verify after class changes), optional subtle hover on nav links (`hover:brightness` / muted background) without new client-side animation scope.

## Technical Context

**Language/Version**: TypeScript 5.x (strict), Node 20+  
**Primary Dependencies**: Next.js 16 (App Router), React 19, Tailwind CSS 4 (`@import "tailwindcss"` + `@theme inline` in `app/globals.css`), Shadcn/UI (`@base-ui` primitives)  
**Storage**: N/A (static images in `public/images/`; no schema changes)  
**Testing**: ESLint (`npm run lint`); manual / visual verification per [quickstart.md](./quickstart.md) and spec success criteria  
**Target Platform**: Web (modern evergreen browsers; mobile-first responsive; `lg:` breakpoint for desktop nav)  
**Project Type**: Next.js monolith (marketing `(main)` layout via `SiteShell`)  
**Performance Goals**: No CLS from header height change beyond one-time layout; `next/image` for areas background with existing `sizes` / `priority={false}` pattern  
**Constraints**: Header stays `'use client'` (pathname, sheet, share modal); only layout/classNames and tokens; `ROUTES` / `getHomeLink` unchanged; image alt: decorative bg may stay empty if paired with visible heading; prefer WCAG AA for **nav text on header background**  
**Scale/Scope**: `components/feature/header.tsx`, `components/feature/areas-of-work.tsx`, `app/globals.css`, one new file under `public/images/`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Core stack | Pass | No new dependencies. |
| II. Server-first; `'use client'` on leaf | Pass | `Header` remains client-only leaf; `AreasOfWork` stays RSC-friendly. |
| III. Data / mutations | Pass | No Server Actions or Zod changes. |
| IV. Directory standards | Pass | Edits under `components/feature/`, `app/globals.css`, `public/images/`; nav still uses `ROUTES` from `lib/routes.ts`. |
| V. No external state libraries | Pass | No new state. |
| Styling: Tailwind + tokens | Pass | Dark green for header nav via CSS variables mapped in `@theme inline`, consumed as utilities (e.g. `text-header-nav` after mapping). |
| TS strict, explicit returns | Pass | Maintain on touched files. |

**Post–Phase 1 re-check**: Artifacts are presentation-only; no APIs or DB. **Gate: PASS.**

## Project Structure

### Documentation (this feature)

```text
specs/013-header-areas-work-ui/
├── plan.md              # This file
├── research.md          # Phase 0
├── data-model.md        # Phase 1 (no persistence)
├── quickstart.md        # Phase 1
├── contracts/           # Phase 1 (UI contract)
│   └── header-areas-ui.md
└── tasks.md             # /speckit.tasks (not created here)
```

### Source Code (repository root)

```text
public/images/
├── hero-therapy-calm.jpg       # Hero — do not use for areas background
├── kenan_kubuc_stok.jpg        # About portrait/section — keep; do NOT use for areas (duplicate today)
└── <new-asset>.jpg             # NEW: areas-of-work-only background (see research.md)

app/globals.css                 # :root + @theme: header nav foreground token(s)

components/feature/
├── header.tsx                  # Taller bar, grid/3-column layout, centered nav, token-based nav color, text-base
└── areas-of-work.tsx           # AREAS_BACKGROUND_SRC → new unique asset
```

**Structure Decision**: Single Next.js app. Header layout uses a **three-column grid** (leading brand / centered nav / trailing actions) so the nav group is **optically centered** in the header content width without overlapping the logo. See [research.md](./research.md).

## Complexity Tracking

> No constitution violations requiring justification.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |

## Phase 0: Research

See [research.md](./research.md). Resolves header layout pattern, token strategy for dark green nav text, and unique areas image vs current duplicate usage.

## Phase 1: Design & Contracts

- [data-model.md](./data-model.md) — confirms no new entities; static presentation notes.  
- [contracts/header-areas-ui.md](./contracts/header-areas-ui.md) — visitor-visible UI invariants.  
- [quickstart.md](./quickstart.md) — local verification steps.

## Phase 2

Task decomposition is out of scope for `/speckit.plan`; run **`/speckit.tasks`** to generate `tasks.md`.
