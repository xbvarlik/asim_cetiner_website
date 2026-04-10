# Implementation Plan: Home copy refresh and trust sections

**Branch**: `020-how-testimonials-home` | **Date**: 2026-04-10 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/020-how-testimonials-home/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Sync all **marketing copy** with `docs/info.md` (title metadata, hero, about, services body structure, FAQ items, office address, phone/email/Instagram), add two **home-only** sections — **Süreç Nasıl İşliyor?** (4–5 ordered steps) and **Danışan Yorumları** (multi-card marquee, slow right-to-left drift, **prefers-reduced-motion** respected) — and wire them into `HomeTemplate` between existing sections per UX flow (after services or before FAQ; exact order in tasks). Services presentation is refactored so **structured content** matches the three pillars and nested lists in `info.md` rather than the current six abbreviated cards alone.

**Phase outputs**: [research.md](./research.md) (decisions), [data-model.md](./data-model.md) (content shapes), [contracts/](./contracts/) (UI/content contracts), [quickstart.md](./quickstart.md) (verification).

## Technical Context

**Language/Version**: TypeScript 5.x (strict)  
**Primary Dependencies**: Next.js 16.2 (App Router), React 19.2, Tailwind CSS 4, Shadcn/UI (`@base-ui`), Framer Motion 12 (existing section reveals), lucide-react  
**Storage**: N/A — static content only; no Prisma/schema changes  
**Testing**: `npm run lint`; manual checks per [quickstart.md](./quickstart.md)  
**Target Platform**: Web (responsive, mobile-first, `lang="tr"`)  
**Project Type**: Next.js marketing site (`app/` + `components/feature/`)  
**Performance Goals**: No unnecessary client boundaries; marquee implemented without extra heavy JS where CSS suffices  
**Constraints**: Constitution — server components by default; `'use client'` only for leaves that need hooks/browser APIs; contact digits and `wa.me` must stay consistent in `lib/site-contact.ts`; `ROUTES` for links; design tokens via `app/globals.css` / `@theme inline`, not ad-hoc hex in feature code  
**Scale/Scope**: ~15+ touch files (content modules, hero, about, FAQ, services list + detailed, map, footer, site contact, root metadata, home template, 2 new feature sections, optional `globals.css` animation token)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Core stack | Pass | No new dependencies |
| II. Server-first / hierarchy | Pass | `HowItWorks` = server feature + `RevealSection`. Testimonials marquee: prefer **CSS animation** in a small feature wrapper (see research); if a client leaf is required for measurement only, keep it minimal |
| III. Data / mutations | Pass | Content-only |
| IV. Directory standards | Pass | New copy under `lib/content/`; new sections under `components/feature/`; export from `components/feature/index.ts` |
| V. State | Pass | No global state for marquee |

**Post-design**: No violations; **Complexity Tracking** not required.

## Project Structure

### Documentation (this feature)

```text
specs/020-how-testimonials-home/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── home-content.md
├── checklists/
│   └── requirements.md
└── spec.md
```

### Source Code (repository root)

```text
docs/info.md                         # Canonical copy source (already in repo)

app/
├── layout.tsx                       # default metadata title/description → info.md Title + derived description
├── globals.css                      # @keyframes / utility for slow RTL marquee + motion-reduce
└── (main)/
    └── page.tsx                     # metadata description alignment if needed

lib/content/
├── faq.ts                           # Replace items with info.md FAQ (parsed into id/question/answer)
├── services.ts                      # Restructure to match info.md Aile / Bireysel / Çift pillars + lists
├── how-it-works.ts                  # NEW: 4–5 steps (title + body)
├── testimonials.ts                  # NEW: quote + displayName (anonymized)
└── site-contact-constants.ts      # OPTIONAL split; or extend site-contact.ts with email, IG handle, display strings

lib/
└── site-contact.ts                  # SITE_PHONE_* + WhatsApp href → digits from info.md

components/feature/
├── hero.tsx                         # DEFAULT_HERO_* from info.md Title + Subtitle
├── about.tsx                        # Body paragraphs from info.md About
├── home-template.tsx                # Insert HowItWorks + TestimonialsSection (order per contract)
├── how-it-works.tsx                 # NEW
├── testimonials-section.tsx         # NEW (marquee row; CSS-first)
├── map-view.tsx                     # Address from info.md Office Addresses
├── footer.tsx                       # Email, address, Instagram URL/handle from canonical contact
├── services-list.tsx                # Section intro copy if needed; composes updated cards/detailed data
├── services-list-cards.tsx          # Map new pillar model → home layout
├── services-list-detailed-cards.tsx # Full nested lists for /hizmetler
└── index.ts                         # Export new feature components + re-exports as needed
```

**Structure Decision**: Single Next.js app. Copy lives in `lib/content/*` (Zod-validated where patterns exist, e.g. FAQ). Presentation stays in `components/feature/*` per constitution.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |
