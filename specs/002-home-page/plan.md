# Implementation Plan: Home Page

**Branch**: `002-home-page` | **Date**: 2026-03-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-home-page/spec.md`

## Summary

Build the therapist landing home page as a Server-First composition of 8
sections (Header, Hero, About, Areas of Work, Services, Contact Form,
Map/Location, Footer) using the Atomic Component hierarchy. All content in
Turkish. Navigation links route to separate pages. The contact form uses a
Server Action with Zod validation and honeypot spam prevention, persisting leads
via the existing data layer.

## Technical Context

**Language/Version**: TypeScript 5.x
**Framework**: Next.js 16.2.0 (App Router)
**UI Libraries**: React 19.2.4, Tailwind CSS 4.x, Shadcn/UI (needs initial setup)
**ORM**: Prisma 7.5.0 (`@prisma/adapter-pg`)
**Validation**: Zod 4.3.6 (v4 — uses `.issues` not `.errors`)
**Storage**: PostgreSQL (existing from 001-backend-data-layer)
**Target Platform**: Web browser (desktop + mobile)
**Project Type**: Web application (Next.js App Router)
**Performance Goals**: Page load < 3 seconds, hero above the fold on desktop
**Constraints**: Server-first (RSC default), mobile-first responsive, Turkish only, no external state libraries
**Scale/Scope**: Single landing page with 8 sections, 8 feature components, ~15 files

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Core Tech Stack | PASS | Next.js 16 LTS, React 19, Tailwind 4, Zod 4 — all aligned. Shadcn/UI needs initial setup (npx shadcn@latest init). |
| II. Architecture & Component Philosophy | PASS | All sections are Server Components. Only ContactForm uses 'use client'. Hierarchy enforced: ui/ → feature/ → page.tsx. |
| III. Data Handling & Logic | PASS | Contact form uses Server Action → leadService.create. Zod validates at boundary. No API routes for mutations. |
| IV. Directory Standards | GAP | `lib/routes.ts` does not exist — must be created. All other directories exist. |
| V. State Management | PASS | No external state libs. Form state is component-local via React hooks. |
| Styling & UI | GAP | Shadcn/UI not yet initialized. Green/off-white design tokens not configured in `@theme` block. |
| Code Quality & TypeScript | PASS | Strict mode enabled. Kebab-case files. Barrel exports for components/ui/, components/feature/, types/. |

**Gate result**: PASS — no violations. Two gaps (Shadcn/UI setup, routes.ts) are addressed in the implementation tasks.

## Project Structure

### Documentation (this feature)

```text
specs/002-home-page/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── server-action-contracts.md
└── tasks.md
```

### Source Code (repository root)

```text
app/
├── (main)/
│   ├── layout.tsx           # Shared layout with Header + Footer
│   └── page.tsx             # Home page — composes all feature sections
├── globals.css              # Tailwind v4 @theme with green/off-white tokens
└── layout.tsx               # Root layout (lang="tr")

components/
├── feature/
│   ├── header.tsx           # Sticky nav with mobile hamburger (needs 'use client' for menu toggle)
│   ├── hero.tsx             # Full-width hero section
│   ├── about.tsx            # Two-column about section
│   ├── areas-of-work.tsx    # Tag cloud of clinical areas
│   ├── services-list.tsx    # 3x2 responsive grid
│   ├── contact-form.tsx     # 'use client' — form + Zod + Server Action
│   ├── map-view.tsx         # Placeholder map section
│   ├── footer.tsx           # Contact info + social links
│   └── index.ts             # Barrel export
└── ui/
    └── (Shadcn components)  # button, input, label, select, textarea, etc.

lib/
├── routes.ts                # Central ROUTES constant
├── prisma.ts                # (existing) Singleton Prisma client
└── validations/
    └── lead-validation.ts   # (existing) Zod schemas for lead

server/
├── actions/
│   └── lead-actions.ts      # Server Action: createLead with honeypot check
└── services/
    └── lead-service.ts      # (existing) Lead CRUD service

types/
└── index.ts                 # (existing + extended) Type exports

public/
└── images/                  # Hero background, therapist photo, service icons
```

**Structure Decision**: Next.js App Router with route group `(main)` for shared
Header/Footer layout. Feature components in `components/feature/`, Shadcn atoms
in `components/ui/`. Server Action in `server/actions/` follows the existing
`server/services/` pattern.
