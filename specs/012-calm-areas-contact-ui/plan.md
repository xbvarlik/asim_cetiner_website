# Implementation Plan: Calm areas background and modern contact inputs

**Branch**: `012-calm-areas-contact-ui` | **Date**: 2026-03-27 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/012-calm-areas-contact-ui/spec.md`

**Note**: This plan is produced by `/speckit.plan`. Execution stops after Phase 1 design artifacts; task breakdown is `/speckit.tasks`.

## Summary

Add a **calm, distinct** full-width background image behind the **Çalışma Alanları** tag cluster (`AreasOfWork`), with overlay or chip contrast so heading and tags stay **WCAG-minded** readable. Use an asset **other than** the hero’s `/images/hero-therapy-calm.jpg` (existing candidate: `/images/kenan_kubuc_stok.jpg`, or a new licensed image under `public/images/`).

Taller, calmer **presentation** for the shared **contact form** only: increase vertical size and padding on `Input`, `Textarea`, and `SelectTrigger` via **`className` overrides** in `contact-form.tsx` (keeps global `components/ui/input` defaults unchanged for other surfaces). Preserve field `name`s, labels, validation, Server Action, and success/error UX.

## Technical Context

**Language/Version**: TypeScript 5.x (strict), Node 20+  
**Primary Dependencies**: Next.js 16 (App Router), React 19, Tailwind CSS 4, Shadcn/UI (`@base-ui` primitives), Framer Motion (via `RevealSection` only; no new animation scope required)  
**Storage**: N/A (static images in `public/images/`; no schema changes)  
**Testing**: ESLint; manual / visual verification per [quickstart.md](./quickstart.md) and spec success criteria  
**Target Platform**: Web (modern evergreen browsers; mobile-first responsive)  
**Project Type**: Next.js monolith (marketing + app routes)  
**Performance Goals**: Hero-quality `next/image` usage for areas background (appropriate `sizes`, priority `false`); avoid CLS; optional subtle overlay (CSS) — no heavy blur filters if they risk jank on low-end mobile  
**Constraints**: RSC for `AreasOfWork` when possible; `'use client'` stays on `contact-form.tsx` only as today; design tokens via Tailwind theme — no ad-hoc hex; `focus-visible` rings preserved; respect `prefers-reduced-motion` for any new motion (prefer none)  
**Scale/Scope**: `components/feature/areas-of-work.tsx`, `components/feature/contact-form.tsx`; optional new image file under `public/images/`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Core stack (Next, React 19, Tailwind, Shadcn, Prisma, Zod) | Pass | No new dependencies. |
| II. Server-first; `'use client'` on leaf only | Pass | `AreasOfWork` remains RSC-friendly; `ContactForm` already client for actions — only className/layout tweaks. |
| III. Data / mutations | Pass | No Server Action or Zod schema changes. |
| IV. Directory standards | Pass | Edits under `components/feature/` and `public/images/`; no new routes. |
| V. No external state libraries | Pass | No new state. |
| Styling: Tailwind + tokens | Pass | Use semantic utilities (`bg-background`, `border-border`, `ring-ring`, etc.). |
| TS strict, explicit returns | Pass | Maintain on touched files. |

**Post–Phase 1 re-check**: Artifacts document presentation-only UI; no APIs or DB. **Gate: PASS.**

## Project Structure

### Documentation (this feature)

```text
specs/012-calm-areas-contact-ui/
├── plan.md              # This file
├── research.md          # Phase 0
├── data-model.md        # Phase 1 (no persistence)
├── quickstart.md        # Phase 1
├── contracts/           # Phase 1 (UI contract)
└── tasks.md             # /speckit.tasks (not created here)
```

### Source Code (repository root)

```text
public/images/
├── hero-therapy-calm.jpg    # Hero — do not reuse as areas background
├── kenan_kubuc_stok.jpg     # Candidate calm/distinct areas backdrop (or add new asset)
└── …                        # Optional: new areas-only image

components/feature/
├── areas-of-work.tsx        # Section: relative wrapper, bg image + overlay, content z-index
└── contact-form.tsx         # Taller Input / Textarea / SelectTrigger via className

components/ui/
├── input.tsx                # Reference baseline h-8; do not change globally for this feature
├── textarea.tsx             # Reference baseline min-h-16
└── select.tsx               # SelectTrigger default h-8 — override from contact-form only
```

**Structure Decision**: Single Next.js app. **Feature-local** form sizing avoids unintended layout shifts on admin or other forms. Areas imagery implemented in the feature section with `next/image` and token-based overlay (see [research.md](./research.md)).

## Complexity Tracking

> No constitution violations requiring justification.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |

## Phase 0: Research

See [research.md](./research.md). Resolves image choice vs hero, layout/overlay pattern, and form sizing approach.

## Phase 1: Design & Contracts

- [data-model.md](./data-model.md) — confirms no new entities; optional static presentation notes.  
- [contracts/areas-contact-ui.md](./contracts/areas-contact-ui.md) — visitor-visible UI invariants.  
- [quickstart.md](./quickstart.md) — local verification steps.

## Phase 2

Task decomposition is out of scope for `/speckit.plan`; run **`/speckit.tasks`** to generate `tasks.md`.
