---
description: "Task list for 017-faq-section-pages"
---

# Tasks: FAQ section and dedicated SSS page

**Input**: Design documents from `/specs/017-faq-section-pages/`  
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/faq-ui.md](./contracts/faq-ui.md), [quickstart.md](./quickstart.md)

**Tests**: Not requested in spec — no automated test tasks. Validate via `npm run lint` and [quickstart.md](./quickstart.md).

**Organization**: Phases follow spec priorities (US1 → US2). Foundational tasks supply route constant, static content, and accordion primitive before any feature composition.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no ordering dependency on other incomplete tasks in the same group)
- **[Story]**: [US1], [US2] map to user stories in [spec.md](./spec.md)

## Path Conventions

Single Next.js app at repository root: `app/`, `components/feature/`, `components/ui/`, `lib/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Align implementer with acceptance checks and UI contract.

- [x] T001 Skim `specs/017-faq-section-pages/quickstart.md` and `specs/017-faq-section-pages/contracts/faq-ui.md` for acceptance checks and accessibility structure

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Route constant, FAQ content module, and accordion UI primitive. **No user story work until T002–T004 complete.**

**⚠️ CRITICAL**: `FaqSection` depends on `PUBLIC_FAQ_ITEMS`, `ROUTES.faq`, and `components/ui/accordion.tsx`.

- [x] T002 Add `faq: "/sikca-sorulan-sorular"` to `lib/routes.ts` (constitution: no other hardcoded FAQ path strings in TS/TSX)
- [x] T003 [P] Create `lib/content/faq.ts` exporting `PublicFaqItem` type and `PUBLIC_FAQ_ITEMS` readonly array per [data-model.md](./data-model.md) (≥3 Turkish Q&A pairs; optional Zod parse at module load for fail-fast)
- [x] T004 [P] Create `components/ui/accordion.tsx` using `@base-ui/react/accordion` with **multiple** expandable panels, Tailwind + `cn` styling and `focus-visible` rings consistent with `components/ui/button.tsx`

**Checkpoint**: `ROUTES.faq` resolves; FAQ data builds; accordion primitive renders in isolation if smoke-tested in a throwaway fragment.

---

## Phase 3: User Story 1 — FAQ on home and search-oriented landing pages (Priority: P1) 🎯 MVP

**Goal**: Inline FAQ section **directly below** `ServicesList` and **above** `ContactForm` in `components/feature/home-template.tsx` so `/` and all `app/(home-variations)/*/page.tsx` consumers get the block automatically.

**Independent Test**: Open `/` and one SEO landing (e.g. `/istanbul-psikolog`) — FAQ under services; keyboard toggles; multiple items can stay open ([spec.md](./spec.md) edge cases).

### Implementation for User Story 1

- [x] T005 [US1] Implement `components/feature/faq-section.tsx` composing `PUBLIC_FAQ_ITEMS` from `lib/content/faq.ts` with `components/ui/accordion.tsx`, `<section>` + heading + `aria-labelledby`, split `answer` on `\n\n` into `<p>` blocks per [contracts/faq-ui.md](./contracts/faq-ui.md) (use `'use client'` only if required for accordion wiring)
- [x] T006 [US1] Export `FaqSection` from `components/feature/index.ts`
- [x] T007 [US1] Insert `<FaqSection />` in `components/feature/home-template.tsx` immediately after `<ServicesList />` and before `<ContactForm />`

**Checkpoint**: MVP — home and SEO landings show inline FAQ; `/hizmetler` still has **no** inline FAQ ([spec.md](./spec.md) FR-002a).

---

## Phase 4: User Story 2 — Dedicated frequently asked questions page (Priority: P2)

**Goal**: Canonical page at `ROUTES.faq` with Turkish title/metadata and same Q&A set as inline FAQ; global discoverability via header and footer links.

**Independent Test**: Open `/sikca-sorulan-sorular` — `h1` (or equivalent primary title) identifies SSS; content matches `PUBLIC_FAQ_ITEMS`; header and footer link to `ROUTES.faq`.

### Implementation for User Story 2

- [x] T008 [US2] Create `app/(main)/sikca-sorulan-sorular/page.tsx` exporting `Metadata` (Turkish `title`/`description`) and rendering page-level `h1` plus `FaqSection` for primary content (inherit `SiteShell` via `app/(main)/layout.tsx`)
- [x] T009 [P] [US2] Add FAQ nav item to `components/feature/header.tsx` (`STATIC_NAV_REST` or equivalent) with `href: ROUTES.faq` and label per contract (e.g. “SSS” or “Sıkça Sorulan Sorular”)
- [x] T010 [P] [US2] Add FAQ entry to `SITE_LINKS` in `components/feature/footer.tsx` with `href: ROUTES.faq` and matching label

**Checkpoint**: Dedicated page live; FR-009 satisfied with both chrome surfaces linking to FAQ.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Repo health and spec verification.

- [x] T011 Run `npm run lint` from repository root `d:\Codes\TherapistLanding\kenan_kubuc_website` and resolve any issues introduced in touched files
- [x] T012 Execute manual steps in `specs/017-faq-section-pages/quickstart.md` (include negative check on `/hizmetler`)

---

## Dependencies & Execution Order

### Phase Dependencies

| Phase | Depends on |
|-------|------------|
| Phase 1 | — |
| Phase 2 | Phase 1 (informal read) |
| Phase 3 [US1] | Phase 2 complete (T002–T004) |
| Phase 4 [US2] | Phase 3 complete (needs `FaqSection` + `ROUTES.faq`) |
| Phase 5 | All desired story phases |

### User Story Dependencies

- **User Story 1 (P1)**: After Phase 2 — no dependency on US2.
- **User Story 2 (P2)**: After US1 — reuses `FaqSection` and content module; adds route page + nav.

### Within Each User Story

- **US1**: `faq-section.tsx` before barrel export; barrel before `home-template.tsx` edit.
- **US2**: `page.tsx` can precede or follow T009/T010; T009 and T010 are parallelizable with each other.

### Parallel Opportunities

- **Phase 2**: T003 and T004 [P] together; T002 can run in parallel with T003 and T004 (three-way parallel if staffed).
- **Phase 4**: T009 and T010 [P] together after or alongside T008 (different files; avoid merge conflicts by coordinating `header.tsx` / `footer.tsx` if one developer).

---

## Parallel Example: Phase 2

```text
Task: T002 Add ROUTES.faq in lib/routes.ts
Task: T003 Create lib/content/faq.ts
Task: T004 Create components/ui/accordion.tsx
```

---

## Parallel Example: User Story 2 (nav)

```text
Task: T009 Add FAQ link in components/feature/header.tsx
Task: T010 Add FAQ link in components/feature/footer.tsx
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1–2 (T001–T004).
2. Complete Phase 3 (T005–T007).
3. **STOP and VALIDATE**: Home + one SEO landing per [quickstart.md](./quickstart.md); confirm `/hizmetler` has no FAQ block.

### Incremental Delivery

1. Add Phase 4 (T008–T010) for dedicated page + discoverability.
2. Phase 5 lint + full quickstart.

---

## Notes

- All checklist lines use `- [ ]` with sequential **T** IDs and file paths in the description.
- Do not duplicate FAQ item arrays outside `lib/content/faq.ts` (FR-005).
