# Implementation Plan: Public Blog List & Detail

**Branch**: `005-public-blog-pages` | **Date**: 2026-03-21 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/005-public-blog-pages/spec.md`

## Summary

Replace the placeholder **`app/(main)/blog/page.tsx`** with a **Server Component** that loads **published** blog posts (`isActive: true`) via **`blog-service`**, ordered **`createdAt` desc**, and renders **`BlogList`** → **`BlogCard`** (vertical stack, `line-clamp-3` preview, **Read more** via **`ROUTES`**). Add **`app/(main)/blog/[id]/page.tsx`** that loads one post by id; call **`notFound()`** when the row is missing or **inactive**. Introduce **`BlogContent`** for full article layout with **“Geri Dön”** to the list. Extend **`lib/routes.ts`** with a **typed helper** for the detail path (no `/blog/${id}` string literals in feature code). Use existing **design tokens** (`text-primary` / `text-primary` links) for **semi-dark green** headings and links; apply **readable typography** via Tailwind utilities (`max-w-prose`, spacing, line-height). **Body HTML** and **images** follow [research.md](./research.md) (minimal sanitization + responsive `img` / optional `next/image` where allowed).

**Design artifacts**: [research.md](./research.md), [data-model.md](./data-model.md), [contracts/public-blog-routes.md](./contracts/public-blog-routes.md), [quickstart.md](./quickstart.md).

## Technical Context

**Language/Version**: TypeScript 5.x (strict)  
**Framework**: Next.js 16.x (App Router)  
**UI**: React 19, Tailwind CSS 4, Shadcn/UI atoms where useful (e.g. `Button` for “Geri Dön” / “Devamını oku”)  
**Data**: Prisma **`BlogPost`** via **`server/services/blog-service.ts`**  
**Testing**: Manual + `next build` (no new automated test mandate in spec)  
**Target**: Web, mobile-first (SC-005)  
**Project type**: Next.js monolith  
**Constraints**: Constitution — **Server Components by default**; pages compose **feature** components; **`ROUTES`** is the only source of path strings; mutations N/A for this feature  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Core Tech Stack | PASS | No new stack; optional `@tailwindcss/typography` only if justified in research (default: utility-only prose-like layout). |
| II. Architecture | PASS | `blog/page.tsx` and `blog/[id]/page.tsx` are thin; **`BlogList`**, **`BlogCard`**, **`BlogContent`** live under `components/feature/`. |
| III. Data Handling | PASS | Reads only; logic in **`blog-service`** (new query helpers). |
| IV. Directory Standards | PASS | **`ROUTES`** extended; no raw `/blog/...` in feature components. |
| V. State Management | PASS | URL + server data only. |

**Gate**: **PASS**.

**Post-design re-check**: **PASS** — same table.

## Project Structure

### Documentation (this feature)

```text
specs/005-public-blog-pages/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── public-blog-routes.md
└── tasks.md              # from /speckit.tasks
```

### Source Code (repository root)

```text
lib/
└── routes.ts                          # EXTEND: blogPost(id) helper (or equivalent)

server/services/
└── blog-service.ts                    # EXTEND: listPublishedForPublic, getPublishedById (names illustrative)

components/feature/
├── blog-list.tsx                      # NEW
├── blog-card.tsx                      # NEW
├── blog-content.tsx                   # NEW
└── index.ts                           # EXTEND exports

app/(main)/blog/
├── page.tsx                           # REPLACE placeholder: fetch + BlogList
└── [id]/page.tsx                      # NEW: generateMetadata + notFound + BlogContent

app/globals.css                        # OPTIONAL: .blog-body scoped rules for img/pre
```

**Structure decision**: Public blog stays under **`(main)`** with existing site chrome; detail route is a **dynamic segment** `[id]` co-located with the list.

## Phase Mapping

| Phase | Output | Location |
|-------|--------|----------|
| 0 | HTML body & image strategy | [research.md](./research.md) |
| 1 | Service API + route contract | [data-model.md](./data-model.md), [contracts/public-blog-routes.md](./contracts/public-blog-routes.md) |
| 1 | Verification steps | [quickstart.md](./quickstart.md) |
| 2 | Tasks | **`tasks.md`** via **`/speckit.tasks`** |

## Complexity Tracking

> No constitution violations; table not required.
