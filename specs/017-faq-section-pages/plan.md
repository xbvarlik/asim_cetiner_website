# Implementation Plan: FAQ section and dedicated SSS page

**Branch**: `017-faq-section-pages` | **Date**: 2026-04-05 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/017-faq-section-pages/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Add a **single source of truth** for public FAQ copy, render it as an **accessible expand/collapse list** immediately **below** `ServicesList` inside `HomeTemplate` (covers `/` and all `(home-variations)/` SEO landings), add a dedicated page at **`/sikca-sorulan-sorular`**, and expose **`ROUTES.faq`** in **header and footer** navigation. **Do not** add inline FAQ to single-focus pages such as **`/hizmetler`** (per clarification).

**Phase outputs**: [research.md](./research.md), [data-model.md](./data-model.md), [contracts/faq-ui.md](./contracts/faq-ui.md), [quickstart.md](./quickstart.md).

## Technical Context

**Language/Version**: TypeScript 5.x (strict)  
**Primary Dependencies**: Next.js 16 (App Router), React 19, Tailwind CSS 4, Shadcn/UI (`@base-ui` primitives), lucide-react  
**Storage**: N/A (static marketing content; no schema changes)  
**Testing**: `npm run lint` (ESLint); manual checks per [quickstart.md](./quickstart.md)  
**Target Platform**: Web (responsive, mobile-first)  
**Project Type**: Next.js marketing site (single app under `app/`)  
**Performance Goals**: Minimal client JS—accordion/disclosure leaf only; no new data fetching  
**Constraints**: Constitution — `ROUTES` for all path strings; FAQ content single module to satisfy FR-005; `'use client'` only on the interactive FAQ UI leaf  
**Scale/Scope**: One content module, one feature component, one new route, nav link updates, `HomeTemplate` insertion order change

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|--------|
| I. Core stack | Pass | Use existing Next/React/Tailwind/Shadcn; add UI primitive (`accordion` or `collapsible`) from `@base-ui` pattern consistent with `components/ui/button.tsx` |
| II. Server-first / hierarchy | Pass | `HomeTemplate` stays a server component; new `FaqSection` in `components/feature/` may import a client child or be `'use client'` if it directly attaches disclosure behavior—prefer thin client wrapper around UI primitive |
| III. Data / mutations | Pass | Static content only; optional Zod parse of FAQ array at module boundary for fail-fast |
| IV. Directory standards | Pass | Add `ROUTES.faq`; no hardcoded `/sikca-sorulan-sorular` outside `lib/routes.ts` |
| V. State | Pass | Local open/closed state inside disclosure components only |

**Post-design**: No violations; **Complexity Tracking** not required.

## Project Structure

### Documentation (this feature)

```text
specs/017-faq-section-pages/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── faq-ui.md
├── checklists/
│   └── requirements.md
└── spec.md
```

### Source Code (repository root)

```text
lib/
├── routes.ts                    # ROUTES.faq + any export helpers if needed
└── content/
    └── faq.ts                   # NEW: PUBLIC_FAQ_ITEMS + types (optional Zod)

components/ui/
└── accordion.tsx                # NEW: Base UI accordion primitive (or collapsible), styled like existing UI

components/feature/
├── faq-section.tsx              # NEW: section chrome + list (client if needed)
├── home-template.tsx            # INSERT FaqSection after ServicesList, before ContactForm
├── header.tsx                   # Add nav item → ROUTES.faq
├── footer.tsx                   # Add SITE_LINKS entry → ROUTES.faq
└── index.ts                     # Export FaqSection

app/(main)/
└── sikca-sorulan-sorular/
    └── page.tsx                 # NEW: metadata + page title + FaqSection (page variant)
```

**Structure Decision**: Single Next.js app. FAQ placement is centralized in `HomeTemplate` so `/` and every `HomeTemplate` consumer in `app/(home-variations)/*` gain the section without per-page duplication. Dedicated FAQ route lives under `app/(main)/` to inherit `SiteShell`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |
