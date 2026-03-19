# Tasks: Home Page

**Input**: Design documents from `/specs/002-home-page/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize Shadcn/UI, configure theme tokens, create routing constant, and extend types.

- [ ] T001 Initialize Shadcn/UI by running `npx shadcn@latest init` and add required components (button, input, label, select, textarea, sheet) via `npx shadcn@latest add`
- [ ] T002 Update green/off-white color palette in app/globals.css using OKLCH CSS variables in the @theme inline block per research.md Decision 2
- [ ] T003 [P] Create centralized route definitions in lib/routes.ts with Turkish slugs per research.md Decision 7
- [ ] T004 [P] Extend types in types/index.ts with ContactFormState and NavItem types per data-model.md
- [ ] T005 Update root layout in app/layout.tsx: change lang="en" to lang="tr", update metadata title/description to Turkish, and remove dark mode preference media query from globals.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create the route group layout structure and placeholder image assets that all user stories depend on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 Create route group layout at app/(main)/layout.tsx that wraps children with Header and Footer placeholders (import feature components once built)
- [ ] T007 Move existing app/page.tsx to app/(main)/page.tsx as the home page entry point (empty composition shell importing feature sections)
- [ ] T008 [P] Add placeholder images to public/images/: hero-bg.jpg (a gradient placeholder) and therapist.jpg (a placeholder image), and clean up default Next.js SVGs from public/
- [ ] T009 [P] Create barrel export file at components/feature/index.ts exporting all feature components (initially empty, updated as components are built)

**Checkpoint**: Route group structure ready, home page shell exists — feature component development can begin.

---

## Phase 3: User Story 1 — First Impression and Site Navigation (Priority: P1) 🎯 MVP

**Goal**: Deliver the page shell — sticky Header with mobile drawer, full-width Hero with CTAs, and Footer with contact info and social links.

**Independent Test**: Load http://localhost:3000. Verify the hero renders above the fold with title, subtitle, and two CTA buttons. Scroll down — header stays fixed. Scroll to bottom — footer shows phone, address, email, Instagram, WhatsApp links. Resize to mobile — hamburger menu appears and opens a sheet drawer.

### Implementation for User Story 1

- [ ] T010 [P] [US1] Create Header component in components/feature/header.tsx: sticky nav bar with desktop horizontal links (Home, Hakkımda, Çalışma Alanları, İletişim, Hizmetler, Blog) using ROUTES from lib/routes.ts and next/link, plus mobile Sheet drawer with hamburger toggle ('use client' needed for Sheet)
- [ ] T011 [P] [US1] Create Hero component in components/feature/hero.tsx: full-width section with background image (next/image with priority and fill), H1 title in Turkish, subtitle, and two CTA Button components linking to ROUTES.contact and ROUTES.services
- [ ] T012 [P] [US1] Create Footer component in components/feature/footer.tsx: phone number, address, email, site-map links using ROUTES, social media icons (Instagram, WhatsApp) with placeholder URLs, and a CTA Button
- [ ] T013 [US1] Wire Header and Footer into app/(main)/layout.tsx and compose Hero into app/(main)/page.tsx, update barrel export in components/feature/index.ts

**Checkpoint**: Page shell functional — hero visible above fold, sticky header, footer with contact info. Mobile responsive with hamburger drawer.

---

## Phase 4: User Story 2 — Exploring Therapist Information and Services (Priority: P2)

**Goal**: Deliver the content sections — About (two-column with image), Areas of Work (tag cloud of 10+ clinical areas), and Services (3x2 responsive grid with Lucide icons).

**Independent Test**: Scroll below the hero. Verify About section shows two-column layout on desktop (text left, image right) stacking on mobile. Verify Areas of Work displays 10+ Turkish clinical area labels. Verify Services shows 6 cards in a 3-column grid on desktop collapsing to 1 column on mobile.

### Implementation for User Story 2

- [ ] T014 [P] [US2] Create About component in components/feature/about.tsx: two-column layout (text/title left, therapist image right using next/image), stacking vertically on mobile. Mock Turkish bio text as a constant.
- [ ] T015 [P] [US2] Create AreasOfWork component in components/feature/areas-of-work.tsx: flexible tag-cloud layout displaying 10+ mock Turkish clinical area labels (e.g., Anksiyete, Depresyon, Travma, Çift Terapisi, etc.) using styled tags/badges
- [ ] T016 [P] [US2] Create ServicesList component in components/feature/services-list.tsx: responsive grid (3 columns desktop, 1 mobile) with 6 service cards, each containing a Lucide icon, Turkish title, and short Turkish description. Mock data as a constant array.
- [ ] T017 [US2] Compose About, AreasOfWork, and ServicesList into app/(main)/page.tsx below Hero, update barrel export in components/feature/index.ts

**Checkpoint**: All informational sections render correctly with responsive layouts and Turkish content.

---

## Phase 5: User Story 3 — Submitting a Contact Inquiry (Priority: P3)

**Goal**: Deliver the lead capture flow — Server Action with honeypot, Zod-validated ContactForm, MapView placeholder, and office data fetching.

**Independent Test**: Fill the contact form with valid data (name, phone, email, office) and submit. Verify success message appears and form resets. Submit with invalid email — verify inline error. Check database for the new lead record with statusId=1.

### Implementation for User Story 3

- [ ] T018 [US3] Create Server Action in server/actions/lead-actions.ts: createLeadAction function with 'use server' directive implementing honeypot check, Zod safeParse with createLeadSchema, leadService.create with statusId=1, revalidatePath, and Turkish error messages per contracts
- [ ] T019 [US3] Create ContactForm component in components/feature/contact-form.tsx: 'use client' component using useActionState with createLeadAction, Shadcn Input/Label/Select/Textarea/Button atoms, honeypot hidden field, inline field error display, success confirmation message, and form reset on success. Office list received as props.
- [ ] T020 [P] [US3] Create MapView component in components/feature/map-view.tsx: styled placeholder div with Turkish label for office location
- [ ] T021 [US3] Update app/(main)/page.tsx to fetch offices via officeService.getAll() in the Server Component, pass office list as props to ContactForm, and compose ContactForm and MapView sections. Update barrel export in components/feature/index.ts.

**Checkpoint**: Full lead capture flow functional — form validates, honeypot rejects bots silently, leads persist in database, office dropdown populated from seeded data.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Build verification, responsiveness audit, and cleanup.

- [ ] T022 Verify all components use explicit TypeScript return types, no `any` usage, and kebab-case file naming across components/feature/ and server/actions/
- [ ] T023 Verify mobile responsiveness: all 8 sections render correctly at 375px, 768px, and 1280px viewports with no horizontal overflow
- [ ] T024 [P] Verify all navigation links use ROUTES constant from lib/routes.ts — no hardcoded route strings in any component
- [ ] T025 [P] Verify all images use next/image with alt text in Turkish, hero image has priority prop
- [ ] T026 Run `npx next build` to confirm zero TypeScript errors and successful production build

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 (Shadcn + theme must be configured first)
- **User Story 1 (Phase 3)**: Depends on Phase 2 (route group + page shell must exist)
- **User Story 2 (Phase 4)**: Depends on Phase 2 (page shell). Can run in parallel with US1 if components are composed separately.
- **User Story 3 (Phase 5)**: Depends on Phase 2 (page shell) + existing data layer. Can run in parallel with US1/US2 for the Server Action (T018), but T021 composition depends on US1 being wired.
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Depends on Phase 2 only. No cross-story dependencies. Delivers the page shell (Header, Hero, Footer).
- **User Story 2 (P2)**: Depends on Phase 2 only. Component creation (T014–T016) is independent of US1. Composition (T017) depends on page.tsx existing from T007.
- **User Story 3 (P3)**: Server Action (T018) and MapView (T020) are independent. ContactForm (T019) depends on T018. Final composition (T021) depends on page.tsx and ContactForm.

### Parallel Opportunities

- T003 + T004 can run in parallel (different files)
- T008 + T009 can run in parallel (different directories)
- T010 + T011 + T012 can all run in parallel (three independent feature components)
- T014 + T015 + T016 can all run in parallel (three independent feature components)
- T020 can run in parallel with T018/T019 (independent component)
- T022 + T023 + T024 + T025 can partially parallelize (read-only verification on different concerns)

---

## Parallel Example: User Story 1

```text
# Launch all three US1 feature components in parallel:
Task T010: "Create Header in components/feature/header.tsx"
Task T011: "Create Hero in components/feature/hero.tsx"
Task T012: "Create Footer in components/feature/footer.tsx"

# Then wire them together (sequential):
Task T013: "Compose into layout.tsx and page.tsx"
```

## Parallel Example: User Story 2

```text
# Launch all three US2 feature components in parallel:
Task T014: "Create About in components/feature/about.tsx"
Task T015: "Create AreasOfWork in components/feature/areas-of-work.tsx"
Task T016: "Create ServicesList in components/feature/services-list.tsx"

# Then compose (sequential):
Task T017: "Compose into page.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (Shadcn, theme, routes, types)
2. Complete Phase 2: Foundational (route group, page shell)
3. Complete Phase 3: User Story 1 (Header, Hero, Footer)
4. **STOP and VALIDATE**: Verify sticky header, hero above fold, footer visible, mobile responsive
5. Page shell ready — deploy/demo if desired

### Incremental Delivery

1. Setup + Foundational → Infrastructure ready
2. Add User Story 1 → Test → Deploy/Demo (**MVP**: page shell with nav + hero + footer)
3. Add User Story 2 → Test → Deploy/Demo (content sections visible)
4. Add User Story 3 → Test → Deploy/Demo (lead capture functional)
5. Polish → Final verification and build

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- All mock content (bio text, clinical areas, service descriptions) MUST be in Turkish
- All Shadcn UI atoms (Button, Input, etc.) MUST be imported from components/ui/
- No hardcoded color values — use theme tokens only (bg-primary, text-foreground, etc.)
- Commit after each phase completion for clean history
