# Implementation Plan: Mobile bottom contact bar

**Branch**: `014-mobile-bottom-cta` | **Date**: 2026-03-27 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/014-mobile-bottom-cta/spec.md`

**Note**: This plan is produced by `/speckit.plan`. Execution stops after Phase 1 design artifacts; task breakdown is `/speckit.tasks`.

## Summary

Add a **fixed, mobile-only** bottom bar with **two pill CTAs**: **WhatsApp** (green #25D366, left) and **Tel** (blue #007AFF, right) with **phone + small accessibility** icons inside the blue pill. Container uses **`pointer-events-none`** with **`pointer-events-auto`** on each link so the **gap** passes taps through. Register CTA colors as **Tailwind theme tokens** in `app/globals.css` (`@theme inline`). **Centralize** `tel:` and `wa.me` values in **`lib/site-contact.ts`** and **refactor `Footer`** to use them. Implement as a **feature component** composed into **`SiteShell`** (RSC-friendly). Icons: **Lucide** `Phone` and `Accessibility`; WhatsApp glyph via **shared SVG** extracted from the existing footer markup.

## Technical Context

**Language/Version**: TypeScript 5.x (strict), Node 20+  
**Primary Dependencies**: Next.js 16 (App Router), React 19, Tailwind CSS 4 (`@import "tailwindcss"` + `@theme inline` in `app/globals.css`), Shadcn/UI (`@base-ui` primitives), lucide-react  
**Storage**: N/A (no schema or Server Action changes)  
**Testing**: ESLint (`npm run lint`); manual checks per [quickstart.md](./quickstart.md)  
**Target Platform**: Web, mobile-first; bar visible below `md` breakpoint only  
**Project Type**: Next.js monolith (marketing routes under `SiteShell`; admin separate layout)  
**Performance Goals**: Zero extra client JS if bar stays an RSC; static links only; no layout shift beyond fixed overlay (ensure sufficient bottom padding on long pages optional follow-up)  
**Constraints**: Constitution server-first: **no `'use client'`** unless a requirement appears that needs hooks; design tokens **not** raw hex in JSX; `focus-visible` rings; external links with `rel="noopener noreferrer"`  
**Scale/Scope**: New feature component, small `lib` module, theme token additions, `footer.tsx` + `site-shell.tsx` touches

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Core stack | Pass | Next, React 19, Tailwind, Shadcn, lucide-react only; no new packages. |
| II. Server-first; `'use client'` on leaf only | Pass | Bar implemented as RSC per [research.md](./research.md) R1. |
| III. Data / mutations | Pass | No Server Actions or Zod changes. |
| IV. Directory standards | Pass | Feature UI under `components/feature/`; constants under `lib/`; routes unchanged. |
| V. No external state libraries | Pass | Stateless links. |
| Styling: Tailwind + tokens | Pass with note | Constitution references `tailwind.config.ts`; repo uses **Tailwind v4 `@theme inline`**. Tokens added there — see Complexity Tracking. |
| TS strict, explicit returns | Pass | Explicit return types on new exports/components. |

**Post–Phase 1 re-check**: Artifacts add theme keys, a `lib` module, UI contract, and composition in `SiteShell`. **Gate: PASS.**

## Project Structure

### Documentation (this feature)

```text
specs/014-mobile-bottom-cta/
├── plan.md              # This file
├── research.md          # Phase 0
├── data-model.md        # Phase 1
├── quickstart.md        # Phase 1
├── contracts/
│   └── mobile-bottom-cta-ui.md
└── tasks.md             # /speckit.tasks (not created here)
```

### Source Code (repository root)

```text
app/globals.css                    # @theme inline: --color-cta-whatsapp, --color-cta-phone

lib/site-contact.ts                # NEW: E.164 / href builders + display string

components/feature/
├── site-shell.tsx                 # Compose MobileBottomContactBar (after Footer)
├── footer.tsx                     # REFACTOR: import contact hrefs/display from lib/site-contact.ts
└── mobile-bottom-contact-bar.tsx  # NEW: fixed row, two <a> pills, pointer-events pattern
```

**Structure Decision**: Single Next.js app. Marketing shell owns the bar; admin layout unaffected.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Theme tokens in `globals.css` instead of `tailwind.config.ts` | Repository already standardizes Tailwind v4 on `@theme inline`; no `tailwind.config.ts` present. | Adding a parallel config file would duplicate theme sources. |

## Phase 0: Research

Completed in [research.md](./research.md). All technical unknowns resolved (RSC vs client, icons, tokens, contact single source, breakpoint, shell placement).

## Phase 1: Design & Contracts

- [data-model.md](./data-model.md) — no persistence; configuration concepts only.  
- [contracts/mobile-bottom-cta-ui.md](./contracts/mobile-bottom-cta-ui.md) — visibility, layout, link behavior, a11y invariants.  
- [quickstart.md](./quickstart.md) — manual verification steps.

## Phase 2

Task decomposition is out of scope for `/speckit.plan`; run **`/speckit.tasks`** to generate `tasks.md`.
