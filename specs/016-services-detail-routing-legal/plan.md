# Implementation Plan: Services detail, routing, and legal copy

**Branch**: `016-services-detail-routing-legal` | **Date**: 2026-04-05 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/016-services-detail-routing-legal/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Deliver three outcomes: (1) **split services presentation** — keep the current compact grid on the home template while introducing a **detailed** services section (larger cards, longer copy, bottom `<ul>` bullets) used only on `/hizmetler`; (2) **retire areas-of-work surfacing** — stop rendering `AreasOfWork` on the home scroll template (file stays, clearly marked unused), delete `app/(main)/calisma-alanlari/page.tsx`, remove `ROUTES.areasOfWork` and all nav links to it; (3) **legal/copy** — append the fixed Turkish disclaimer to the footer and align user-visible Turkish copy from generic “terapi” wording toward “danışmanlık” where appropriate, without renaming URL path segments, route constants used as URLs, or non-UI identifiers.

**Phase outputs**: [research.md](./research.md) (decisions), [data-model.md](./data-model.md) (content shape), [contracts/](./contracts/) (UI contracts), [quickstart.md](./quickstart.md) (verification).

## Technical Context

**Language/Version**: TypeScript 5.x (strict)  
**Primary Dependencies**: Next.js 16 (App Router), React 19, Tailwind CSS 4, Shadcn/UI (`@base-ui`), Framer Motion 12, lucide-react  
**Storage**: N/A (static marketing content; no schema changes)  
**Testing**: `npm run lint` (ESLint); manual / checklist verification per quickstart  
**Target Platform**: Web (responsive, mobile-first)  
**Project Type**: Next.js marketing site (single app under `app/`)  
**Performance Goals**: No new blocking JS on routes that are currently static beyond existing patterns; detailed services grid may remain a **client** leaf if it reuses Framer Motion (same as `services-list-cards.tsx`)  
**Constraints**: Constitution — `ROUTES` is the single source of path strings; no hardcoded `/calisma-alanlari` after removal; feature components live under `components/feature/`; pages compose features only  
**Scale/Scope**: ~6 services, header/footer nav, home template, one removed route, copy sweep across visible strings and metadata where in scope

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|--------|
| I. Core stack | Pass | No new dependencies required |
| II. Server-first / hierarchy | Pass | New detailed list is a **feature** molecule; page imports feature only. If motion is needed, mark new grid as `'use client'` leaf (same pattern as `ServicesListCards`) |
| III. Data / mutations | Pass | Static content only |
| IV. Directory standards | Pass | Use `lib/routes.ts` for all path updates; remove `areasOfWork` key after scrubbing references |
| V. State | Pass | No global state |

**Post-design**: No violations; **Complexity Tracking** not required.

## Project Structure

### Documentation (this feature)

```text
specs/016-services-detail-routing-legal/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── services-ui.md
├── checklists/
│   └── requirements.md
└── spec.md
```

### Source Code (repository root)

```text
app/(main)/
├── page.tsx                    # Home — uses HomeTemplate
├── hizmetler/page.tsx          # Services — switch to ServicesListDetailed
└── calisma-alanlari/page.tsx   # DELETE

components/feature/
├── home-template.tsx           # Comment out AreasOfWork + “unused for now”
├── services-list.tsx           # Home: unchanged composition (compact)
├── services-list-cards.tsx     # Compact grid (home)
├── services-list-detailed.tsx  # NEW: section + large cards + bullets
├── areas-of-work.tsx           # KEEP file; not rendered from home
├── header.tsx                  # Remove Çalışma Alanları nav item
├── footer.tsx                  # Disclaimer + copy; remove dead link
└── index.ts                    # Export new feature component

lib/
└── routes.ts                   # Remove areasOfWork (and fix all references)
```

**Structure Decision**: Single Next.js App Router app. All changes are localized to `app/(main)/`, `components/feature/`, and `lib/routes.ts`, plus metadata strings in `app/**` and `lib/seo/landing-pages.ts` where copy is user-visible.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |
