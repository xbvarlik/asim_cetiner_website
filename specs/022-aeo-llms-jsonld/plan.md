# Implementation Plan: Answer Engine Optimization (AEO) — `llms.txt` + JSON-LD

**Branch**: `022-aeo-llms-jsonld` | **Date**: 2026-04-14 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `D:\Codes\TherapistLanding\asim_cetiner_website\specs\022-aeo-llms-jsonld\spec.md`

## Summary

Deliver **Answer Engine Optimization** artifacts: (1) a public **`/llms.txt`** Markdown-oriented summary with Turkey-compliant terminology, mandatory disclaimer, and links to main sections via **`ROUTES`**; (2) **JSON-LD** (`LocalBusiness` + nested `Person`) embedded on every page that uses **`SiteShell`**, with **`knowsAbout`** Wikidata IRIs, **`sameAs`** including canonical Instagram plus **`PLACEHOLDER_*`** tokens, and descriptions aligned with **`docs/info.md`**. No `MedicalBusiness`. Implementation follows [research.md](./research.md): static `public/llms.txt`, server-built graph in a feature component composed in **`SiteShell`**, optional Zod validation, **`NEXT_PUBLIC_SITE_URL`** for absolute URLs.

## Technical Context

**Language/Version**: TypeScript 5.x (strict), Node 20+  
**Primary Dependencies**: Next.js 16.2 (App Router), React 19.2, Zod 4.x (optional validation for JSON-LD object)  
**Storage**: N/A (static files + in-HTML JSON-LD; no Prisma changes)  
**Testing**: `npm run lint`; manual verification per [quickstart.md](./quickstart.md)  
**Target Platform**: Web (SSR/SSG via Next.js)  
**Project Type**: Next.js App Router marketing site (existing monolith)  
**Performance Goals**: Negligible extra payload (~2–5 KB JSON-LD + small `llms.txt`); no measurable SLA beyond default Next static serving  
**Constraints**: Turkey copy rules (blacklist/whitelist, disclaimer verbatim); JSON-LD must not use `MedicalBusiness`; **`SiteShell`** is the inclusion boundary for JSON-LD (excludes admin layouts)  
**Scale/Scope**: Single practice, single locale (`lang="tr"`); one graph reused on all public shell routes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status |
|-----------|--------|
| I. Core Tech Stack (Next, React, Tailwind, Shadcn, Prisma, Zod) | **Pass** — uses existing stack; Zod optional for graph validation |
| II. Server-First / component hierarchy | **Pass** — new JSON-LD as Server Component under `components/feature/`; composed via `SiteShell`, not used directly from `app/` pages as atoms |
| III. Data / mutations | **Pass** — read-only marketing data; no new Server Actions |
| IV. Directory standards | **Pass** — new helpers under `lib/` (e.g. `lib/seo/` or `lib/structured-data/`); routes via `ROUTES` in `lib/routes.ts` |
| V. No external state libraries | **Pass** |

**Post-design re-check**: No violations introduced. Complexity tracking not required.

## Project Structure

### Documentation (this feature)

```text
D:\Codes\TherapistLanding\asim_cetiner_website\specs\022-aeo-llms-jsonld\
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts\
│   ├── llms-txt.md
│   └── json-ld-practice.example.json
└── tasks.md              # Phase 2 — speckit.tasks (not created by this command)
```

### Source Code (repository root)

```text
D:\Codes\TherapistLanding\asim_cetiner_website\
├── app\
│   ├── layout.tsx                    # Root HTML shell (fonts, Toaster) — JSON-LD NOT here (avoid admin)
│   ├── (main)\layout.tsx             # SiteShell — candidate injection point OR prefer SiteShell body
│   └── (home-variations)\layout.tsx # SiteShell — covered if JSON-LD is inside SiteShell
├── components\feature\
│   ├── site-shell.tsx                # Compose <PracticeJsonLd /> here
│   └── practice-json-ld.tsx         # New: server component emitting script tag(s)
├── lib\
│   ├── routes.ts                     # ROUTES — use for llms.txt links
│   ├── site-contact.ts               # Canonical phone, email, address, Instagram
│   └── seo\                          # New: buildPracticeJsonLd(), getSiteOrigin(), etc.
└── public\
    └── llms.txt                      # New: static Markdown-oriented file
```

**Structure Decision**: Single Next.js app at repo root (`asim-cetiner_website`). Feature touches **`public/`**, **`components/feature/`**, and **`lib/seo/`** (or equivalent `lib/structured-data/` name—keep under `lib/` per constitution). JSON-LD lives in **`SiteShell`** so both **`(main)`** and **`(home-variations)`** groups receive markup without duplicating layout edits.

## Complexity Tracking

No constitution violations; table omitted.

## Phase 0 & Phase 1 Outputs

| Artifact | Path |
|----------|------|
| Research | [research.md](./research.md) |
| Data model | [data-model.md](./data-model.md) |
| Contracts | [contracts/llms-txt.md](./contracts/llms-txt.md), [contracts/json-ld-practice.example.json](./contracts/json-ld-practice.example.json) |
| Quickstart | [quickstart.md](./quickstart.md) |

---

**STOP** — Implementation planning for this command ends here. Next: `/speckit.tasks` to break work into tasks, or implement per contracts + quickstart.
