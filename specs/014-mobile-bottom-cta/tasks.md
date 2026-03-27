# Tasks: Mobile bottom contact bar

**Input**: Design documents from `/specs/014-mobile-bottom-cta/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/mobile-bottom-cta-ui.md, quickstart.md  

**Tests**: Not requested in the feature spec — no automated test tasks. Verification via `quickstart.md` and lint.

**Organization**: Phases follow user story priority (P1 → P2 → P3) after shared foundation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no unmet dependencies)
- **[Story]**: User story label on story-phase tasks only (`[US1]`, `[US2]`, `[US3]`)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Align implementer with feature artifacts before code changes.

- [x] T001 Read specs/014-mobile-bottom-cta/plan.md, spec.md, research.md, data-model.md, contracts/mobile-bottom-cta-ui.md, and quickstart.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Theme tokens, shared contact constants, and footer alignment required before the mobile bar matches spec FR-007 and design tokens.

**⚠️ CRITICAL**: No user story implementation should start until T005 completes.

- [x] T002 [P] Register CTA colors in app/globals.css (`@theme inline`: e.g. `--color-cta-whatsapp` #25D366 and `--color-cta-phone` #007AFF mapped for `bg-cta-whatsapp` / `bg-cta-phone` utilities)
- [x] T003 [P] Create lib/site-contact.ts exporting the practice phone display string, `tel:` href, and WhatsApp `https://wa.me/…` href (same logical values as today’s components/feature/footer.tsx)
- [x] T004 [P] Create components/feature/whatsapp-glyph.tsx with the presentational WhatsApp SVG currently inlined in components/feature/footer.tsx
- [x] T005 Refactor components/feature/footer.tsx to import lib/site-contact.ts and components/feature/whatsapp-glyph.tsx (remove duplicated path/href and inline SVG)

**Checkpoint**: Foundation ready — user story work can begin.

---

## Phase 3: User Story 1 — Quick WhatsApp from mobile (Priority: P1) 🎯 MVP

**Goal**: Mobile-only fixed bottom bar with a green WhatsApp pill that opens the configured chat.

**Independent Test**: On a viewport below `md`, scroll a `SiteShell` page, confirm the green **WhatsApp** control stays fixed and opens the same wa.me destination as the footer.

### Implementation for User Story 1

- [x] T006 [US1] Create components/feature/mobile-bottom-contact-bar.tsx with `md:hidden` fixed container (`bottom-4 left-0 right-0 z-50 flex justify-between px-4 pointer-events-none`), left WhatsApp `<a>` (`pointer-events-auto`, `bg-cta-whatsapp`, white semibold **WhatsApp** label, `rounded-full`, `py-3 px-6`, `shadow-lg`, `gap-2`, `items-center`, WhatsappGlyph, `href` from lib/site-contact.ts, `target="_blank"` `rel="noopener noreferrer"`, descriptive `aria-label`)
- [x] T007 [US1] Import and render `<MobileBottomContactBar />` in components/feature/site-shell.tsx immediately after `<Footer />`

**Checkpoint**: User Story 1 delivers a shippable WhatsApp-only mobile bar (right slot empty until US2).

---

## Phase 4: User Story 2 — Quick phone call from mobile (Priority: P2)

**Goal**: Blue **Tel** pill with phone + small circular accessibility pictogram; `tel:` uses shared site contact.

**Independent Test**: Below `md`, tap **Tel**; device or desktop behavior initiates call to the same number as the footer phone line. Visually matches contract (blue #007AFF, **Tel**, icons).

### Implementation for User Story 2

- [x] T008 [US2] Add trailing `<a>` to components/feature/mobile-bottom-contact-bar.tsx (`pointer-events-auto`, `bg-cta-phone`, **Tel** label, lucide-react `Phone`, small circular trailing `Accessibility` icon inside the pill, `tel:` href from lib/site-contact.ts, `aria-label`, same pill/shadow/padding band as WhatsApp control)

**Checkpoint**: User Stories 1 and 2 both satisfied on the same component.

---

## Phase 5: User Story 3 — Page stays usable between the buttons (Priority: P3)

**Goal**: Horizontal gap between pills does not steal taps from underlying content.

**Independent Test**: Per quickstart / spec SC-002: place a tap target under the gap; it must receive the tap.

### Implementation for User Story 3

- [x] T009 [US3] Audit components/feature/mobile-bottom-contact-bar.tsx to ensure the outer fixed row uses `pointer-events-none` and only the two `<a>` elements use `pointer-events-auto`; fix any full-width hit box (e.g. avoid interactive wrappers spanning the gap)

**Checkpoint**: Pass-through behavior explicitly verified.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Barrel exports, lint, manual QA per quickstart.

- [x] T010 [P] Export `WhatsappGlyph` and `MobileBottomContactBar` from components/feature/index.ts
- [x] T011 Run npm run lint at repository root
- [ ] T012 Execute manual checks in specs/014-mobile-bottom-cta/quickstart.md (mobile vs `md`, both links, gap pass-through, admin exclusion, visual checklist)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1** → **Phase 2** → **Phases 3–5** (sequential by story: US1 → US2 → US3) → **Phase 6**
- **Phase 2 internal**: T002, T003, T004 can run in parallel after T001; **T005** depends on T003 and T004
- **Phase 3**: T007 depends on T006
- **Phase 4**: T008 depends on Phase 3 complete (bar file exists)
- **Phase 5**: T009 depends on T008 (both anchors present for realistic gap testing)
- **Phase 6**: T010 can parallel with T011 only if no barrel conflicts; typically T010 then T011 then T012

### User Story Dependencies

- **US1**: After Phase 2 — no dependency on US2/US3
- **US2**: After US1 (extends same component file)
- **US3**: After US2 (validates two-button layout gap)

### Parallel Opportunities

| After | Parallel tasks |
|-------|----------------|
| T001 | T002, T003, T004 |
| T005 | — |
| T006–T009 | T010 (export) can be done once `MobileBottomContactBar` and `WhatsappGlyph` exist (e.g. after T007) |

### Parallel Example: Foundational

```text
T002: Add CTA tokens in app/globals.css
T003: Create lib/site-contact.ts
T004: Create components/feature/whatsapp-glyph.tsx
→ then T005: Refactor components/feature/footer.tsx
```

### Parallel Example: User Story 1

```text
T006: Implement bar + WhatsApp in components/feature/mobile-bottom-contact-bar.tsx
→ T007: Wire into components/feature/site-shell.tsx
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1 and Phase 2 (T001–T005).  
2. Complete Phase 3 (T006–T007).  
3. **STOP and VALIDATE**: Independent test for US1 (WhatsApp fixed + correct URL).  
4. Ship or demo before adding phone pill.

### Incremental Delivery

1. Foundation (tokens + `lib/site-contact.ts` + footer + glyph) → consistent contact data site-wide.  
2. US1 → WhatsApp mobile bar + `SiteShell`.  
3. US2 → Tel pill completes dual CTA.  
4. US3 → pointer-events audit for gap.  
5. Polish → barrel, lint, quickstart.

### Parallel Team Strategy

- Developer A: T002 + T006–T009 (CSS + bar).  
- Developer B: T003 + T005 (site-contact + footer).  
- Developer C: T004 (glyph) then hand off to B for T005.  
Coordination: T005 waits for T003 and T004; T006 waits for T005.

---

## Notes

- Every task line uses the checklist format: `- [ ] Tnnn …` with file paths in the description.  
- Story labels `[US1]` / `[US2]` / `[US3]` appear only on Phases 3–5.  
- No `[NEEDS CLARIFICATION]` in scope; phone/WhatsApp values follow existing footer until product updates `lib/site-contact.ts`.
