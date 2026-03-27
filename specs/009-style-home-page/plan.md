# Implementation Plan: Public Marketing Visual & Motion Refresh

**Branch**: `009-style-home-page` | **Date**: 2026-03-27 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/009-style-home-page/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Unify **public marketing** pages (`app/(main)/*`, `app/(home-variations)/*`) under a calm, trustworthy visual system: **home hero** with **photographic background**, **start-aligned** copy and CTAs, **refined typography** (sans body + distinct heading family via `next/font`), **scroll-triggered section reveals** and **subtle hover/focus** feedback on tiles/cards, with **reduced-motion** respected. **Global shell** (`SiteShell`, `Header`, `Footer`) adopts the same tokens and interaction patterns. **Admin** routes stay out of scope.

Technical approach: extend **Tailwind v4** tokens in `app/globals.css`, refactor `components/feature/hero.tsx` and section molecules (`about`, `services-list`, `areas-of-work`, `contact-form`, etc.), add small **client** wrappers using **Framer Motion** for viewport-based animation, use **`next/image`** for the hero photo, and align inner marketing pages’ layouts with the same spacing/typography/motion vocabulary.

## Technical Context

**Language/Version**: TypeScript 5.x (strict), Node 20+  
**Primary Dependencies**: Next.js 16 (App Router), React 19, Tailwind CSS 4, Shadcn/UI, Framer Motion *(to be added — see research.md)*  
**Storage**: N/A (presentation-only; no schema changes)  
**Testing**: Manual QA per `quickstart.md` and `contracts/ui-public-marketing.md`; ESLint via `npm run lint`  
**Target Platform**: Modern evergreen browsers + mobile Safari/Chrome (responsive)  
**Project Type**: Web application (single Next.js app)  
**Performance Goals**: Home hero LCP acceptable on broadband (image optimized via `next/image`, `priority` on hero); decorative animations complete within ~2s and never block primary actions (**SC-003**)  
**Constraints**: Server Components by default; `'use client'` only on leaf motion/interaction wrappers; design tokens in `globals.css` / `@theme`, not ad-hoc hex in components; `ROUTES` for links  
**Scale/Scope**: ~12+ public marketing routes sharing `SiteShell`; 5 SEO landings using `HomeTemplate`; inner pages (`hakkimda`, `hizmetler`, `calisma-alanlari`, `iletisim`, `blog/*`) receive coordinated section styling and motion where sections exist

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|-----------|--------|----------|
| Core stack (Next, React 19, Tailwind, Shadcn, Prisma, Zod) | **Pass** | UI work stays within stack; Prisma unused for this feature |
| Server-first; client only at leaves | **Pass** | Motion split into dedicated client components; pages remain server components |
| Component hierarchy (`ui` → `feature` → `app`) | **Pass** | Changes target `components/feature/*` and tokens; no business logic in `ui` |
| Tokens in Tailwind theme / `@theme` | **Pass** | Colors, radii, fonts extended via `globals.css` |
| Third-party outside stack | **Recorded** | Framer Motion added with justification — see **Complexity Tracking** |
| No Redux/Zustand | **Pass** | No global client state introduced |

**Post-design re-check**: Research locks motion + font + image strategy; no constitution violations introduced. Framer Motion remains the single justified additive dependency.

## Project Structure

### Documentation (this feature)

```text
specs/009-style-home-page/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── ui-public-marketing.md
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
app/
├── layout.tsx                 # Root fonts (extend with heading font variable)
├── globals.css                # @theme tokens, base typography, motion-safe defaults
├── (main)/
│   ├── layout.tsx             # SiteShell wrapper
│   ├── page.tsx               # Home → HomeTemplate
│   ├── hakkimda/page.tsx
│   ├── hizmetler/page.tsx
│   ├── calisma-alanlari/page.tsx
│   ├── iletisim/page.tsx
│   └── blog/...
├── (home-variations)/
│   ├── layout.tsx             # SiteShell wrapper
│   └── */page.tsx             # SEO landings → HomeTemplate variants
└── (admin)/                   # Out of scope for styling pass

components/
├── feature/
│   ├── site-shell.tsx         # FR-009 shell coherence
│   ├── header.tsx             # Shell tokens + focus/hover
│   ├── footer.tsx
│   ├── hero.tsx               # FR-001, FR-002 — image hero + alignment
│   ├── home-template.tsx      # Compose sections + optional reveal wrappers
│   ├── about.tsx
│   ├── services-list.tsx
│   ├── areas-of-work.tsx
│   ├── contact-form.tsx
│   └── ...                    # Other marketing sections as needed
└── ui/                        # Shadcn primitives — focus-visible rings

public/
└── images/                    # Licensed hero asset(s)
```

**Structure Decision**: Single Next.js App Router project per constitution; all work lives under `app/(main)`, `app/(home-variations)`, `components/feature`, and shared `app/globals.css` / `app/layout.tsx`. Admin tree excluded.

## Phase 0 & Phase 1 Outputs

| Artifact | Path | Purpose |
|----------|------|---------|
| Research | `specs/009-style-home-page/research.md` | Motion library, hero media, typography, scope |
| Presentation model | `specs/009-style-home-page/data-model.md` | Conceptual surfaces & validation rules |
| UI contract | `specs/009-style-home-page/contracts/ui-public-marketing.md` | Testable behaviors for QA |
| Quickstart | `specs/009-style-home-page/quickstart.md` | Local run + verification matrix |

## Implementation notes (for `/speckit.tasks`)

- Introduce **`components/feature/motion/*`** or similarly named **client** wrappers: e.g. `RevealSection`, `MotionCard`, using `useReducedMotion` from `framer-motion`.
- **Hero**: refactor from gradient-only centered block to **full-bleed image** + **scrim** + **start-aligned** content; keep links via `ROUTES`.
- **Inner pages**: audit each `page.tsx` under `(main)` for section wrappers; apply `RevealSection` to major bands; harmonize `py-*`, `max-w-*`, and card hover classes.
- **Typography**: add heading font variable in root layout; map in `@theme` for `font-heading` utility.
- **Accessibility**: ensure `prefers-reduced-motion` disables or minimizes `whileInView`; preserve WCAG contrast on hero text over imagery.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| New dependency: `framer-motion` | Spec requires smooth scroll-linked reveals and consistent reduced-motion handling across many sections | CSS-only and tw-animate cannot match viewport-based, once-only, accessible motion without large custom observer code |
