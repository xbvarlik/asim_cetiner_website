# Implementation Plan: Customer landing UX & content (023)

**Branch**: `023-customer-landing-updates` | **Date**: 2026-05-01 | **Spec**: [`spec.md`](./spec.md)  
**Input**: Feature specification `/specs/023-customer-landing-updates/spec.md` (incl. clarifications Session 2026-05-01)

## Summary

Deliver stakeholder copy and UX from `docs/customer-requests.md` on the existing Next.js therapist site: calmer hero typography and scoped name-accent color (`#2F3E4E`), updated services introduction with **clickable** home service cards navigating to anchored detail areas on `/hizmetler`, wholesale replacement of the **five-step counselling process** (title, intro body, steps, footer CTA) authored in `lib/content/how-it-works.ts` and rendered by `components/feature/how-it-works.tsx`, shared **verbatim contact guidance** beside **every** public `ContactForm` (home + SEO landings + `/iletisim`), and a **single-gesture** external maps/deep-link affordance from `components/feature/map-view.tsx`. Implementation stays within the constitution: Server Components by default, `ROUTES` for internal links, Tailwind/CSS variables for accent color—not ad-hoc hex in scattered JSX unless mapped through theme.

## Technical Context

**Language/Version**: TypeScript 5.x (strict), Node 20+  
**Primary Dependencies**: Next.js 16.2 (App Router), React 19.2, Tailwind CSS 4 (`@import "tailwindcss"` + `@theme` in `app/globals.css`), Shadcn/UI (`@base-ui`), Framer Motion 12 (existing client sections), lucide-react  
**Storage**: N/A — marketing copy only; existing Prisma/lead submission unchanged aside from adjacent UI strings  
**Testing**: `npm run lint`, `npm run build`; manual route matrix in `./quickstart.md`
**Target Platform**: Public web (responsive mobile-first)  
**Project Type**: Single Next.js application (therapy marketing + admin split under `app/`)  
**Performance Goals**: No new CLS-heavy embeds by default (prefer outbound maps link vs heavy iframe unless product explicitly follows up)  
**Constraints**: Accessible keyboard paths for service links; WhatsApp fallback behavior per spec edge cases  
**Scale/Scope**: Primary surfaces: `components/feature/hero.tsx`, `services-list.tsx`, `services-list-cards.tsx`, `how-it-works.tsx` (+ `lib/content/how-it-works.ts`), `contact-form.tsx`, `map-view.tsx`, `header.tsx`; anchor targets in `services-list-detailed-cards.tsx`. Absolute workspace root: `d:\Codes\TherapistLanding\asim_cetiner_website\`.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Core stack only | ✅ | No new deps proposed |
| II. Server-first / component layers | ✅ | Keep `Hero`, `ServicesList`, `HowItWorks`, `MapView` as RSC unless already client; **`ServicesListCards` is already `'use client'`** — compose `Link`/keyboard affordances there; introduce tiny presentational subcomponents under `components/feature/` instead of coupling pages to `@/components/ui/*` atoms for flows |
| III. Mutations via Server Actions | ✅ | Lead action untouched |
| IV. `ROUTES` central paths | ✅ | All `href`s use `ROUTES` + sanctioned fragments (see contracts) |
| V. No global client state libs | ✅ | — |
| Styling tokens | ✅ | Map customer `#2F3E4E` into `@theme`/CSS variables; reference Tailwind semantic class (see `research.md`) |
| Accessibility | ✅ | Maintain ordered list semantics / focus rings for interactive service tiles |

**Gate result**: ✅ PASS — proceed.

**Post–Phase 1 re-check**: Design artifacts reaffirm PASS — outbound maps helper + shared contact copy introduce no forbidden patterns; layering keeps Server Actions untouched.

## Project Structure

### Documentation (this feature)

```text
specs/023-customer-landing-updates/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── public-marketing-content.md
│   └── contact-phone-whatsapp-maps.md
├── spec.md
└── tasks.md              # (/speckit.tasks — out of scope for this command)
```

### Source Code (repository root)

```text
d:\Codes\TherapistLanding\asim_cetiner_website\
├── app/
│   ├── (main)\
│   │   ├── page.tsx
│   │   └── iletisim/page.tsx
│   ├── (home-variations)\
│   │   └── */page.tsx
│   └── globals.css
├── components/feature/
│   ├── hero.tsx
│   ├── home-template.tsx
│   ├── services-list.tsx
│   ├── services-list-cards.tsx
│   ├── services-list-detailed-cards.tsx
│   ├── how-it-works.tsx
│   ├── contact-form.tsx
│   ├── map-view.tsx
│   └── header.tsx
├── lib/content/how-it-works.ts
├── lib/routes.ts
└── lib/site-contact.ts
```

**Structure Decision**: Single-app Next repo; marketing changes live under `components/feature/` and `lib/content/` consistent with specs 016/021 patterns.

## Complexity Tracking

> No constitution violations — table intentionally empty.
