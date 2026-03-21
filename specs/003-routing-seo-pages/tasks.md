# Tasks: Site Routing & SEO Landing Pages

**Input**: Design documents from `/specs/003-routing-seo-pages/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: User story label (US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Route constants, server data helper, SEO copy table.

- [x] T001 Add five SEO path entries to lib/routes.ts (keys and paths per specs/003-routing-seo-pages/contracts/routing-and-metadata.md)
- [x] T002 [P] Create lib/server/contact-page-data.ts exporting async getContactFormOffices() that returns Array<{ id: number; name: string }> using server/services/office-service.ts
- [x] T003 [P] Create lib/seo/landing-pages.ts exporting a typed record for all five SEO slugs with heroTitle, heroSubtitle, page title, and description (Turkish copy; unique per variant)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: DRY shell, parameterized hero, home template, wire main layout and home page.

**⚠️ CRITICAL**: User story pages MUST NOT start until SiteShell, Hero props, and HomeTemplate exist.

- [x] T004 Create components/feature/site-shell.tsx as a Server Component that renders Header, children, and Footer (import existing feature components only)
- [x] T005 Refactor app/(main)/layout.tsx to wrap children with SiteShell from components/feature/site-shell.tsx (remove direct Header/Footer imports from this file)
- [x] T006 Extend components/feature/hero.tsx with optional title and subtitle string props; when omitted, keep current default Turkish headline and paragraph; CTAs MUST keep using ROUTES.contact and ROUTES.services
- [x] T007 Create components/feature/home-template.tsx as a Server Component accepting heroTitle, heroSubtitle, and offices props; compose Hero (with title/subtitle), About, AreasOfWork, ServicesList, ContactForm, MapView in that order
- [x] T008 Update app/(main)/page.tsx to call getContactFormOffices() and render HomeTemplate with default hero strings matching current home copy (full section stack per FR-013)
- [x] T009 Update components/feature/index.ts to export SiteShell and HomeTemplate

**Checkpoint**: `/` shows full home via HomeTemplate; layout uses SiteShell.

---

## Phase 3: User Story 1 - Dedicated Section Pages (Priority: P1) 🎯 MVP

**Goal**: Four Turkish canonical URLs each showing a single focused section with shared chrome.

**Independent Test**: Open `/hakkinda`, `/calisma-alanlari`, `/hizmetler`, `/iletisim` — correct body only; header and footer match home.

### Implementation for User Story 1

- [x] T010 [US1] Create app/(main)/hakkimda/page.tsx as a Server Component exporting unique metadata (title + description) and rendering About from components/feature only
- [x] T011 [P] [US1] Create app/(main)/calisma-alanlari/page.tsx with unique metadata and AreasOfWork only
- [x] T012 [P] [US1] Create app/(main)/hizmetler/page.tsx with unique metadata and ServicesList only
- [x] T013 [US1] Create app/(main)/iletisim/page.tsx with unique metadata, getContactFormOffices(), ContactForm, and MapView

**Checkpoint**: All four section URLs live; metadata distinct per page.

---

## Phase 4: User Story 2 - SEO Landing Pages (Priority: P2)

**Goal**: Five root-level SEO URLs with full home structure and variant hero + metadata.

**Independent Test**: Open each SEO URL; full section stack; unique hero text and unique tab title/description.

### Implementation for User Story 2

- [x] T014 [US2] Create app/(home-variations)/layout.tsx wrapping children with the same SiteShell pattern as app/(main)/layout.tsx
- [x] T015 [P] [US2] Create app/(home-variations)/istanbul-psikolog/page.tsx exporting metadata from lib/seo/landing-pages.ts and rendering HomeTemplate with variant copy and offices from getContactFormOffices()
- [x] T016 [P] [US2] Create app/(home-variations)/cift-terapisi/page.tsx with metadata and HomeTemplate per landing-pages record
- [x] T017 [P] [US2] Create app/(home-variations)/bilissel-davranisci-terapi/page.tsx with metadata and HomeTemplate per landing-pages record
- [x] T018 [P] [US2] Create app/(home-variations)/uskudar-psikolog/page.tsx with metadata and HomeTemplate per landing-pages record
- [x] T019 [P] [US2] Create app/(home-variations)/besiktas-psikolog/page.tsx with metadata and HomeTemplate per landing-pages record

**Checkpoint**: Five SEO routes build and match home layout with unique hero and metadata.

---

## Phase 5: User Story 3 - ROUTES Consistency (Priority: P3)

**Goal**: No duplicate path strings for primary destinations in feature components.

**Independent Test**: Grep components/feature for string literals matching `/hakkimda`, `/hizmetler`, `/iletisim`, `/calisma-alanlari`, or SEO paths; only ROUTES (or props) should appear.

- [x] T020 [US3] Verify and fix components/feature/*.tsx and components/feature/index.ts so every navigation href uses ROUTES from lib/routes.ts (including any new SEO links if added); remove hardcoded duplicates

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Home vs SEO metadata distinction, types, production build.

- [x] T021 [P] Update app/layout.tsx and/or segment metadata so the root home metadata (title + description) is distinct from all five SEO landing metadata entries (per FR-009)
- [x] T022 Add or extend types in types/index.ts only if needed for HomeTemplateProps or SEO records; ensure all new exported functions and components have explicit return types and no `any`
- [x] T023 Run npx next build from repository root and resolve TypeScript or routing errors

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1** → **Phase 2** → **Phase 3** → **Phase 4** → **Phase 5** → **Phase 6**
- **Phase 4** depends on Phase 2 (HomeTemplate, SiteShell) and Phase 1 (landing-pages, routes, getContactFormOffices)
- **Phase 3** depends on Phase 2 (SiteShell already on `(main)` layout)

### User Story Dependencies

- **US1**: After Phase 2
- **US2**: After Phase 2 and Phase 1 (T003 for copy)
- **US3**: After Phases 3–4 so all pages exist before final link audit

### Parallel Opportunities

- T002 + T003 in parallel
- T011 + T012 in parallel (different section pages)
- T015–T019 in parallel (five SEO pages, different paths)
- T021 can run in parallel with T020 if different files (often T020 first is safer)

---

## Parallel Example: User Story 2

```text
# After T014, launch five pages together:
Task T015: app/(home-variations)/istanbul-psikolog/page.tsx
Task T016: app/(home-variations)/cift-terapisi/page.tsx
Task T017: app/(home-variations)/bilissel-davranisci-terapi/page.tsx
Task T018: app/(home-variations)/uskudar-psikolog/page.tsx
Task T019: app/(home-variations)/besiktas-psikolog/page.tsx
```

---

## Implementation Strategy

### MVP (User Story 1 only)

1. Complete Phase 1 + Phase 2
2. Complete Phase 3 (T010–T013)
3. Stop and validate four section URLs + full home on `/`

### Full feature

1. Phases 1–6 in order
2. Do **not** add redirects (FR-012)

---

## Notes

- Do not duplicate Header, Footer, or Hero implementation (FR-011).
- Route group folder `(home-variations)` MUST NOT appear in public URLs (FR-007).
- **Total tasks**: 23
