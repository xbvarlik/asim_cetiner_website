# Implementation Plan: Horizontal process flow (“Süreç Nasıl İşliyor?”)

**Branch**: `021-horizontal-process-flow` | **Date**: 2026-04-10 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/021-horizontal-process-flow/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Refactor the home **Süreç Nasıl İşliyor?** block from a vertical **card list** to a **horizontal process flow**: full-width centered section, one **dashed horizontal connector** through **circular numbered nodes**, with **title and description centered under each node**, **even horizontal spacing**, **no per-step card chrome**, while keeping existing **background, type, and text colors** via Tailwind **theme tokens**. Implementation is confined to **`components/feature/how-it-works.tsx`** (and optionally a small extracted presentational subcomponent in the same folder if needed for clarity); data remains in **`lib/content/how-it-works.ts`**. Responsive behavior uses **mobile-first** layout with a **scrollable horizontal track** on small viewports per `research.md`. See **Phase 0** (`research.md`) for layout, a11y, and token decisions.

## Technical Context

**Language/Version**: TypeScript 5.x (strict), Node 20+  
**Primary Dependencies**: Next.js 16.2 (App Router), React 19.2, Tailwind CSS 4 (`@import "tailwindcss"` + `@theme` in `app/globals.css`), Shadcn/UI (`@base-ui` primitives), Framer Motion 12 (existing `RevealSection` only)  
**Storage**: N/A (static content module)  
**Testing**: Manual visual + screen reader smoke; `npm run lint`  
**Target Platform**: Modern evergreen browsers; responsive viewports per existing site  
**Project Type**: Next.js web app (single app in repo root)  
**Performance Goals**: No new heavy client bundles; remain static HTML–friendly for the section  
**Constraints**: Server Component by default; semantic `<ol>`/`<li>`; theme tokens only (no arbitrary hex for brand surfaces); WCAG contrast for node text/background  
**Scale/Scope**: One feature section on home; 4–5 steps

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status |
|-----------|--------|
| **I. Core tech stack** | Pass — Next.js, React, Tailwind, Shadcn only; no new stack. |
| **II. Server-first / hierarchy** | Pass — `HowItWorks` stays in `components/feature/`; remains a Server Component; no page-level atom misuse. |
| **III. Data / mutations** | Pass — no mutations or APIs. |
| **IV. Directory standards** | Pass — content in `lib/content/`; feature UI in `components/feature/`. |
| **V. State management** | Pass — no external stores; layout is static. |
| **Styling** | Pass — Tailwind utilities; tokens from `@theme` (constitution references `tailwind.config.ts`; this repo uses `app/globals.css` @theme — align with **existing project practice**). |
| **Mobile-first** | Pass — base styles for narrow screens, enhanced layout at `md`/`lg`. |
| **TypeScript** | Pass — explicit return type on component; no `any`. |

**Post–Phase 1 re-check**: Design artifacts (`data-model.md`, `contracts/how-it-works-layout.md`, `research.md`) introduce no constitution violations; no Complexity Tracking required.

## Phase 0: Outline & Research

**Output**: [research.md](./research.md) — resolves layout (grid + absolute connector), token-based nodes, `<ol>` semantics, narrow-viewport scroll strategy, motion scope.

## Phase 1: Design & Contracts

**Output**:

- [data-model.md](./data-model.md) — static `HowItWorksStep` shape; no DB.
- [contracts/how-it-works-layout.md](./contracts/how-it-works-layout.md) — UI/layout contract for implementers and QA.
- [quickstart.md](./quickstart.md) — local verification steps.

**Contracts note**: No HTTP/API contracts; home composition order unchanged from 020.

**Agent context**: Run `update-agent-context.ps1 -AgentType cursor-agent` after this plan is saved (records feature 021 in agent rules).

## Phase 2

**Not executed by `/speckit.plan`**. Use `/speckit.tasks` to generate `tasks.md`.

## Project Structure

### Documentation (this feature)

```text
specs/021-horizontal-process-flow/
├── plan.md              # This file
├── research.md          # Phase 0
├── data-model.md        # Phase 1
├── quickstart.md        # Phase 1
├── contracts/
│   └── how-it-works-layout.md
├── checklists/
│   └── requirements.md
└── spec.md
```

### Source Code (repository root)

```text
app/
├── (main)/
│   └── page.tsx                    # Composes HomeTemplate (unchanged order)
├── globals.css                     # @theme tokens (reference for node colors)
components/
├── feature/
│   ├── how-it-works.tsx            # Primary implementation target
│   ├── home-template.tsx           # Section order (020 contract)
│   ├── motion/
│   │   └── reveal-section.tsx      # Optional wrapper (existing)
│   └── index.ts                    # Barrel exports
lib/
└── content/
    └── how-it-works.ts             # HOW_IT_WORKS_STEPS (unchanged)
```

**Structure Decision**: Single Next.js app at repo root; feature work in `components/feature/how-it-works.tsx` and existing content module—no new packages or backend paths.

## Complexity Tracking

> No constitution violations requiring justification.
