# Implementation Plan: Rebrand for Asım Çetiner

**Branch**: `019-rebrand-asim-cetiner` | **Date**: 2026-04-05 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/019-rebrand-asim-cetiner/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Rebrand the public marketing site to **Asım Çetiner**: replace all **Kenan Kübuç** / **Kenan Buğrahan Kübüç** naming with the new name in UI copy, metadata, and SEO helpers; point the About portrait to **`/images/asim_cetiner_stock.jpg`**; refresh **`public/images/areas-of-work-bg.jpg`** and **`public/images/hero-therapy-calm.jpg`** with new rights-cleared photos that keep a calm, therapy-appropriate tone. Update design tokens in **`app/globals.css`** so **primary** reflects **#783B04**, the specified **secondary accent** reflects **#FD9B2F**, and **background** stays a soft off-white. No Prisma schema or Server Action changes; optional housekeeping (e.g. `package.json` name, `.env.example` DB slug) only if stakeholders want dev ergonomics aligned with the new brand.

## Technical Context

**Language/Version**: TypeScript 5.x (strict), Node 20+  
**Primary Dependencies**: Next.js 16 (App Router), React 19, Tailwind CSS 4 (`@import "tailwindcss"` + `@theme inline` in `app/globals.css`), Shadcn/UI (`@base-ui` primitives), Framer Motion (existing sections), lucide-react  
**Storage**: PostgreSQL via Prisma (unchanged; no data migration for this feature)  
**Testing**: `npm run lint`; manual visual/contrast check on hero, primary CTA, areas overlay, About portrait  
**Target Platform**: Modern evergreen browsers; responsive mobile-first layouts  
**Project Type**: Single Next.js web app (marketing + admin)  
**Performance Goals**: No regression on LCP for hero/areas images (optimize new assets similar to current: reasonable dimensions/format)  
**Constraints**: Maintain readable contrast for text on `primary` / `accent` surfaces; respect `prefers-reduced-motion` (unchanged); keep areas background distinct from hero asset (existing rule)  
**Scale/Scope**: ~15+ string touchpoints across `app/`, `components/feature/`, `lib/seo/`; 3 static images under `public/images/`; CSS variable updates in `:root` (+ any hardcoded hex in feature components if found)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|--------|
| I. Core Tech Stack | Pass | No new dependencies; stays Next.js / React / Tailwind / Shadcn / Prisma / Zod |
| II. Server-first / component hierarchy | Pass | Edits are copy, static assets, and global tokens; no new client boundaries required |
| III. Data / mutations | Pass | No new CRUD; no API routes for this feature |
| IV. Directory standards | Pass | Use existing `app/`, `components/feature/`, `lib/seo/`; no new route string literals beyond copy changes inside existing files |
| V. State management | Pass | No external state libraries |
| Styling: tokens | Pass with note | Constitution references `tailwind.config.ts`; this repo uses **Tailwind v4** design tokens in **`app/globals.css`** (`:root` + `@theme inline`). Rebrand continues that established pattern—no new parallel token system. |
| TS strict / explicit returns | Pass | Touch existing files only; preserve typing conventions |

**Post–Phase 1 re-check**: Design artifacts describe static content and CSS variables only; still fully compliant.

## Project Structure

### Documentation (this feature)

```text
specs/019-rebrand-asim-cetiner/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
app/
├── layout.tsx                    # defaultMetadata title template
├── (main)/                       # page metadata descriptions & titles
├── (home-variations)/            # SEO landing pages via shared templates + lib/seo
components/feature/
├── about.tsx                     # intro copy, portrait src, alt
├── header.tsx                    # site title text
├── footer.tsx                    # heading, copyright, contact display
├── hero.tsx                      # hero-therapy-calm.jpg
├── areas-of-work.tsx             # areas-of-work-bg.jpg
lib/seo/
└── landing-pages.ts              # absolute titles for SEO landings
public/images/
├── asim_cetiner_stock.jpg        # portrait (spec)
├── areas-of-work-bg.jpg          # replace file content, same path
└── hero-therapy-calm.jpg         # replace file content, same path
app/globals.css                   # :root semantic colors → brand palette
```

**Structure Decision**: Single Next.js app at repository root (`asim_cetiner_website`). Implementation is limited to marketing surfaces, global CSS tokens, and binary image assets; admin routes unchanged unless a visible “Kenan” string exists (grep-driven).

## Complexity Tracking

No constitution violations; table omitted.
