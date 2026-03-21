# Implementation Plan: Site Routing & SEO Landing Pages

**Branch**: `003-routing-seo-pages` | **Date**: 2026-03-21 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-routing-seo-pages/spec.md`

## Summary

Add four Turkish canonical section routes under the existing public layout,
five SEO “full home” landing routes at root-level paths, and a DRY
`HomeTemplate` that parameterizes hero copy. Extend `lib/routes.ts` with SEO
paths and central metadata copy. Refactor `Hero` to accept optional title and
subtitle (defaults preserve current home copy). Share header/footer across
`(main)` and `(home-variations)` via a single shell feature component—no
duplicate Header/Footer implementations. **No HTTP redirects** in this release
(FR-012).

## Technical Context

**Language/Version**: TypeScript 5.x  
**Framework**: Next.js 16.x (App Router)  
**UI**: React 19, Tailwind CSS 4, Shadcn/UI (Base UI–based primitives)  
**Validation / data**: Zod, Prisma (contact form only on relevant pages)  
**Storage**: PostgreSQL (unchanged)  
**Testing**: Manual + `next build` (no new automated test mandate in spec)  
**Target**: Web (mobile-first)  
**Project type**: Next.js monolith (single app directory)  
**Performance**: Align with existing home (static/SSR mix as today)  
**Constraints**: Server Components by default; `'use client'` only on existing
interactive leaves (e.g. `ContactForm`, `Header`); `ROUTES` is the only source
of path strings; redirects out of scope  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Core Tech Stack | PASS | No new deps required for routing/metadata. |
| II. Architecture | PASS | Pages compose feature molecules; optional shell wrapper is a feature composition, not skipping ui→feature. |
| III. Data Handling | PASS | Contact pages reuse `officeService` + existing Server Actions; no new mutation APIs. |
| IV. Directory Standards | PASS | Update `lib/routes.ts`; add `lib/seo/` or similar only if needed for metadata DRY. |
| V. State Management | PASS | No global client state added. |
| Styling & UI | PASS | Theme tokens unchanged. |
| Code Quality | PASS | Explicit return types; kebab-case files; barrel exports where already used. |

**Gate**: PASS — no violations.

## Project Structure

### Documentation (this feature)

```text
specs/003-routing-seo-pages/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── routing-and-metadata.md
└── tasks.md   # from /speckit.tasks
```

### Source Code (repository root)

```text
app/
├── (main)/
│   ├── layout.tsx              # Uses SiteShell (Header + children + Footer)
│   ├── page.tsx                # Full home: HomeTemplate (default hero)
│   ├── hakkimda/page.tsx
│   ├── calisma-alanlari/page.tsx
│   ├── hizmetler/page.tsx
│   └── iletisim/page.tsx       # ContactForm + MapView + office fetch
├── (home-variations)/
│   ├── layout.tsx              # Same SiteShell as (main)
│   ├── istanbul-psikolog/page.tsx
│   ├── cift-terapisi/page.tsx
│   ├── bilissel-davranisci-terapi/page.tsx
│   ├── uskudar-psikolog/page.tsx
│   └── besiktas-psikolog/page.tsx
└── layout.tsx                  # Root (unchanged)

components/feature/
├── site-shell.tsx              # NEW: Header + {children} + Footer (single place)
├── home-template.tsx           # NEW: parameterized full home stack
├── hero.tsx                    # EXTEND: optional title + subtitle props
├── ... (existing feature components unchanged)

lib/
├── routes.ts                   # EXTEND: SEO route constants
└── seo/
    └── landing-pages.ts        # NEW (optional): SEO variant config + metadata helpers

types/
└── index.ts                    # EXTEND: SeoLandingVariant, HomeTemplateProps if useful
```

**Structure decision**: Two route groups share one `SiteShell` feature component
so `(main)` and `(home-variations)` never fork Header/Footer markup (FR-006,
FR-011).

## Complexity Tracking

> No constitution violations; table not required.
