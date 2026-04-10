# Tasks: Home copy refresh and trust sections

**Input**: Design documents from `/specs/020-how-testimonials-home/`  
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/home-content.md](./contracts/home-content.md), [quickstart.md](./quickstart.md)

**Tests**: Not requested in spec — no automated test tasks. Validate via `npm run lint`, `npm run build`, and [quickstart.md](./quickstart.md).

**Organization**: Phases follow spec user stories (P1 → P2 → P3), then polish.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no ordering dependency on other open tasks)
- **[Story]**: `US1` = accurate copy (spec User Story 1); `US2` = How it works; `US3` = Testimonials

## Path conventions

All paths are under repository root `d:\Codes\TherapistLanding\asim_cetiner_website\` unless noted.

---

## Phase 1: Setup

**Purpose**: Baseline and alignment before code changes.

- [x] T001 Run `npm run lint` from `d:\Codes\TherapistLanding\asim_cetiner_website` and record baseline (expect clean or fix only unrelated blockers before large edits)
- [x] T002 Cross-check `docs/info.md` against `specs/020-how-testimonials-home/contracts/home-content.md` and `specs/020-how-testimonials-home/data-model.md` for every field (Title, Subtitle, About, Services, FAQ, Office, Contact)

---

## Phase 2: Foundational (blocking prerequisites)

**Purpose**: Shared CSS primitive for testimonials; complete before **US3** implementation of `components/feature/testimonials-section.tsx`.

**⚠️ US1 and US2 can start after Phase 1**; **US3 marquee UI depends on T003**.

- [x] T003 Add slow horizontal marquee `@keyframes` and a utility class (e.g. animate testimonial track RTL) in `app/globals.css`, with **`prefers-reduced-motion: reduce`** disabling animation per `specs/020-how-testimonials-home/research.md`

**Checkpoint**: Marquee class name documented in task completion notes for US3.

---

## Phase 3: User Story 1 — Accurate practice information (Priority: P1) 🎯 MVP

**Goal**: All marketing copy matches `docs/info.md` (hero, metadata, about, FAQ ×10, services three-pillar structure, map address, footer contact, phone/WhatsApp digits).

**Independent Test**: Compare live `/`, `/hizmetler`, `/sikca-sorulan-sorular`, footer, and root metadata against `docs/info.md` without adding HowItWorks or Testimonials yet.

### Implementation for User Story 1

- [x] T004 [US1] Update `lib/site-contact.ts`: set `SITE_PHONE_E164_DIGITS` and `SITE_PHONE_DISPLAY` from `docs/info.md` Contact (05544010176); export `SITE_EMAIL`, `SITE_INSTAGRAM_URL` (and optional `SITE_INSTAGRAM_HANDLE`) for footer/map consistency
- [x] T005 [P] [US1] Update root `metadata.title.default` and `metadata.description` in `app/layout.tsx` using `docs/info.md` Title and a concise Subtitle-derived description
- [x] T006 [P] [US1] Update `DEFAULT_HERO_TITLE` and `DEFAULT_HERO_SUBTITLE` in `components/feature/hero.tsx` from `docs/info.md` Title and Subtitle
- [x] T007 [P] [US1] Replace body copy in `components/feature/about.tsx` with paragraph breaks matching `docs/info.md` About block
- [x] T008 [US1] Replace `rawFaqItems` in `lib/content/faq.ts` with ten Q&A pairs from `docs/info.md` FAQ; update `faqListSchema` minimum length to `10`; keep `faqListSchema.parse` export pattern
- [x] T009 [US1] Restructure `lib/content/services.ts` to the three-pillar model (`aile`, `bireysel`, `cift`) with intros and nested `sections[].items` per `docs/info.md` Services and `specs/020-how-testimonials-home/data-model.md`
- [x] T010 [US1] Refactor `components/feature/services-list-cards.tsx` to consume the new pillar export from `lib/content/services.ts` (adjust icons/keys for three pillars; preserve motion/layout quality)
- [x] T011 [US1] Refactor `components/feature/services-list-detailed-cards.tsx` to render full nested structure for `/hizmetler` from `lib/content/services.ts`
- [x] T012 [P] [US1] Replace placeholder address in `components/feature/map-view.tsx` with the Office Addresses line from `docs/info.md`
- [x] T013 [US1] Update `components/feature/footer.tsx`: phone display, `mailto` email, address line, and Instagram link using `lib/site-contact.ts` constants (remove `info@kenankubuc.com` and `123 Örnek Sokak` placeholders)
- [x] T014 [P] [US1] Update `metadata.description` in `app/(main)/hizmetler/page.tsx` to align with refreshed services positioning from `docs/info.md` where appropriate

**Checkpoint**: P1 complete — copy audit passes; services home + detail pages render new pillar data.

---

## Phase 4: User Story 2 — How it works (Priority: P2)

**Goal**: Home page shows **Süreç Nasıl İşliyor?** with **4–5** ordered steps (title + description), calm layout consistent with existing sections.

**Independent Test**: Open `/` — section present between Services and FAQ (per contract), step count 4–5, Turkish process copy readable on mobile.

### Implementation for User Story 2

- [x] T015 [US2] Create `lib/content/how-it-works.ts` exporting `HOW_IT_WORKS_STEPS` (4–5 steps: `order`, `title`, `description`) in Turkish, consistent with `specs/020-how-testimonials-home/research.md` journey
- [x] T016 [US2] Create `components/feature/how-it-works.tsx` as a Server Component: section heading **Süreç Nasıl İşliyor?**, step list with `RevealSection` / spacing patterns matching `components/feature/about.tsx`
- [x] T017 [US2] Export `HowItWorks` from `components/feature/index.ts` (after T016)
- [x] T018 [US2] Insert `<HowItWorks />` immediately after `<ServicesList />` in `components/feature/home-template.tsx` per `specs/020-how-testimonials-home/contracts/home-content.md`

**Checkpoint**: US2 independently verifiable on home scroll order.

---

## Phase 5: User Story 3 — Testimonials marquee (Priority: P3)

**Goal**: **Danışan Yorumları** with ≥3 cards, anonymized display names, slow **right-to-left** infinite motion when motion is allowed; static/comfortable layout when reduced motion is preferred.

**Independent Test**: `/` — marquee drifts slowly; enable OS reduced motion — animation stops, quotes still readable.

**Depends on**: T003 (CSS utility) before styling verification.

### Implementation for User Story 3

- [x] T019 [US3] Create `lib/content/testimonials.ts` exporting `PUBLIC_TESTIMONIALS` (≥3 entries: `id`, `quote`, `displayName` with initials-style anonymization)
- [x] T020 [US3] Create `components/feature/testimonials-section.tsx`: heading **Danışan Yorumları**, duplicate-track marquee using class from T003, static fallback layout under `motion-reduce`, `focus-visible` rings on any interactive controls if present
- [x] T021 [US3] Export `TestimonialsSection` from `components/feature/index.ts` (after T020)
- [x] T022 [US3] Insert `<TestimonialsSection />` after `<HowItWorks />` and before `<FaqSection />` in `components/feature/home-template.tsx`

**Checkpoint**: US3 passes quickstart testimonial checks.

---

## Phase 6: Polish & cross-cutting

**Purpose**: Repo health and final audit.

- [x] T023 Run `npm run lint` and `npm run build` from `d:\Codes\TherapistLanding\asim_cetiner_website`
- [x] T024 [P] Execute manual verification per `specs/020-how-testimonials-home/quickstart.md` (all eight groups)
- [x] T025 [P] Search repo for stale placeholders: `123 Örnek`, `kenankubuc`, `905551234567`, old hero strings in `components/feature/` and `app/`; fix any hits in scope

---

## Dependencies & execution order

### Phase dependencies

| Phase | Depends on |
|-------|------------|
| Phase 1 | — |
| Phase 2 (T003) | Phase 1 (recommended: before US3) |
| Phase 3 (US1) | Phase 1 |
| Phase 4 (US2) | Phase 3 recommended (home already stable; US2 only adds section) |
| Phase 5 (US3) | **T003** + Phase 4 recommended (same `home-template.tsx` line as US2) |
| Phase 6 | Phases 3–5 desired complete |

### User story dependencies

- **US1**: No dependency on US2/US3.
- **US2**: Independent of US3; edits `home-template.tsx` before US3.
- **US3**: Should apply **after** US2’s `home-template.tsx` change to avoid merge conflicts; **requires T003** for marquee CSS.

### Within US1

- Run **T004** before **T013** (footer uses contact constants).
- **T009 → T010 → T011** is sequential (data then both UIs).
- **T005, T006, T007, T012, T014** can run in parallel **after** T004 if staffed, as they touch disjoint files (watch **T005/T006** both use `docs/info.md` Title/Subtitle — same source, no file conflict).

### Parallel opportunities

| After | Parallel tasks |
|-------|----------------|
| T004 | T005, T006, T007, T012, T014 |
| T009 | — (T010/T011 sequential on consumers) |
| T003 + US2 done | T019 then T020 → T021 → T022 (same feature area; serialize to reduce conflicts) |
| Phase 6 | T024, T025 in parallel |

---

## Parallel example: User Story 1

```text
Developer A: T004 lib/site-contact.ts
Developer B: T005 app/layout.tsx + T006 components/feature/hero.tsx
Developer C: T007 components/feature/about.tsx + T012 components/feature/map-view.tsx
Then single owner: T008 faq.ts → T009–T011 services pipeline → T013 footer
```

---

## Parallel example: User Story 3

```text
Developer A: T019 lib/content/testimonials.ts
Developer B (after T019): T020 components/feature/testimonials-section.tsx (uses T003 CSS class)
Then single assignee: T021 export, T022 home-template.tsx
```

---

## Implementation strategy

### MVP first (User Story 1 only)

1. Complete Phase 1–2 (optional: defer T003 until before US3).
2. Complete Phase 3 (T004–T014).
3. **STOP**: Run quickstart sections 1–4, 7–8 (copy, services, FAQ, contact, motion not required).

### Incremental delivery

1. US1 → ship accurate marketing site.
2. US2 → add process section.
3. US3 → add testimonials + marquee.
4. Phase 6 → full quickstart sign-off.

### Task counts

| Scope | Tasks |
|-------|------:|
| Phase 1 Setup | 2 |
| Phase 2 Foundational | 1 |
| US1 | 11 |
| US2 | 4 |
| US3 | 4 |
| Polish | 3 |
| **Total** | **25** |

**Format validation**: Every task uses `- [ ] Tnnn` with checkbox, sequential ID, file path in description; `[USn]` only on user-story phase tasks; `[P]` only where parallel-safe.

---

## Notes

- Landing SEO variants under `app/(home-variations)/` are **out of scope** unless product asks to sync hero copy with `info.md` (plan focuses canonical home + content modules).
- If `ServiceId` union is removed during T009, delete unused icon map entries and keep TypeScript strict.
- Commit after each task or logical group (e.g. T009–T011 together) to ease review.
