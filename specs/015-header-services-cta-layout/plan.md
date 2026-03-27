# Implementation Plan: Header, Mobile Menu, Service Cards, and CTA Layout

**Branch**: `015-header-services-cta-layout` | **Date**: 2026-03-27 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/015-header-services-cta-layout/spec.md`

## Summary

Adjust the public site shell so the header matches a **three-zone** desktop layout (brand | centered nav in the **middle band** | actions), keep the **mobile menu trigger on the right**, improve the **sheet navigation** (no visible “Menü” title, centered labels, larger vertical targets), make **service cards equal height** per row (and full list in one column), **remove the decorative accessibility glyph** from the phone CTA, and **show the bottom contact bar on desktop** with layout and main padding so content is not obscured. All changes stay in existing feature components and Tailwind utilities—no new dependencies.

## Technical Context

**Language/Version**: TypeScript 5.x (strict), Node 20+  
**Primary Dependencies**: Next.js 16 (App Router), React 19, Tailwind CSS 4, Shadcn/UI (`@base-ui` primitives), lucide-react, Framer Motion (services cards only)  
**Storage**: N/A (presentation-only)  
**Testing**: `npm run lint`; manual responsive checks per [quickstart.md](./quickstart.md)  
**Target Platform**: Modern browsers; responsive viewports (mobile / tablet / desktop)  
**Project Type**: Web application (single Next.js app in repo root)  
**Performance Goals**: No new blocking scripts; preserve existing animation `useReducedMotion` behavior on service cards  
**Constraints**: Constitution: Server Components by default—`Header` and `ServicesListCards` remain client where interactivity is required; Tailwind-first styling; `ROUTES` / `getHomeLink` unchanged  
**Scale/Scope**: Three feature files (`header.tsx`, `mobile-bottom-contact-bar.tsx`, `services-list-cards.tsx`) and possibly `site-shell.tsx` for layout padding

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|--------|
| I. Core tech stack | Pass | No new libraries |
| II. Server-first / `'use client'` | Pass | Only interactive leaf components stay client; no new global state libraries |
| III. Data / mutations | Pass | No server actions or DB changes |
| IV. Directory standards | Pass | Edits under `components/feature/` and `components/ui/` only as needed; routes unchanged |
| V. State management | Pass | Local `useState` in `Header` only |
| Styling & UI | Pass | Tailwind utilities; tokens via existing theme classes |
| TypeScript | Pass | Explicit return types preserved on touched components |

**Post–Phase 1 re-check**: Unchanged—design artifacts describe UI behavior only; implementation remains within constitution.

## Project Structure

### Documentation (this feature)

```text
specs/015-header-services-cta-layout/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui-layout.md
└── tasks.md              # from /speckit.tasks (not created here)
```

### Source Code (repository root)

```text
components/feature/
├── header.tsx                 # Grid → three-zone layout; sheet content/nav styling; title visibility
├── mobile-bottom-contact-bar.tsx  # Remove phone-link chrome; show on md+; responsive layout
├── services-list-cards.tsx    # Equal-height cards (grid stretch + flex column)
└── site-shell.tsx             # Optional: main bottom padding when CTA visible on desktop

app/(main)/                    # Uses SiteShell; no route changes expected
lib/routes.ts                  # Unchanged
```

**Structure Decision**: Single Next.js app; all edits in `components/feature/` with optional `site-shell.tsx` adjustment for fixed CTA clearance on large viewports.

## Complexity Tracking

> No constitution violations; table not required.

## Phase 0: Research

Consolidated in [research.md](./research.md). No unresolved `NEEDS CLARIFICATION` items—the repo stack and file locations are known.

## Phase 1: Design & Contracts

- [data-model.md](./data-model.md) — No persistent entities for this feature.  
- [contracts/ui-layout.md](./contracts/ui-layout.md) — QA-facing behavioral contract aligned with spec FRs.  
- [quickstart.md](./quickstart.md) — Manual verification steps.  
- Agent context updated via `.specify/scripts/powershell/update-agent-context.ps1 -AgentType cursor-agent`.

## Phase 2

Task breakdown is produced by **`/speckit.tasks`** (not part of this command).
