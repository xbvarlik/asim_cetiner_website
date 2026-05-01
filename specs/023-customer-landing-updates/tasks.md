# Tasks: Customer landing UX & content (023)

**Input**: Design documents from `d:\Codes\TherapistLanding\asim_cetiner_website\specs\023-customer-landing-updates\`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)

**Tests**: Not requested in feature spec — validate with `npm run lint`, `npm run build`, and manual steps in [quickstart.md](./quickstart.md).

**Organization**: Phases follow **User Story priority** (P1 → P2 → P3); repository root for all code paths: `d:\Codes\TherapistLanding\asim_cetiner_website\`.

## Format

`[ID]` sequential; **`[P]`** = parallel-safe (different files, no ordering dependency on other open tasks); **`[USn]`** on user-story phases only.

---

## Phase 1: Setup

**Purpose**: Baseline read and confirm clean workspace before edits.

- [x] T001 Read `d:\Codes\TherapistLanding\asim_cetiner_website\specs\023-customer-landing-updates\plan.md`, `spec.md`, `research.md`, `contracts\public-marketing-content.md`, and `contracts\contact-phone-whatsapp-maps.md`
- [x] T002 Run `npm run lint` from `d:\Codes\TherapistLanding\asim_cetiner_website\` and capture baseline (fix only blockers introduced by this feature’s edits in later tasks)
- [x] T003 Confirm route inventory in `d:\Codes\TherapistLanding\asim_cetiner_website\specs\023-customer-landing-updates\quickstart.md` matches pages using `HomeTemplate` and `app\(main)\iletisim\page.tsx` (no code change expected)

---

## Phase 2: Foundational (blocking)

**Purpose**: Shared tokens, outbound maps helper, and **`/hizmetler` anchor targets** required before US1 deep links verify end-to-end.

**Checkpoint**: After T006, home service links can land on correct `/hizmetler` fragment.

- [x] T004 [P] Add brand name accent CSS variable `--brand-name-accent` (`#2F3E4E`) and map to Tailwind via `@theme inline` as `--color-brand-name-accent` (consumer class e.g. `text-brand-name-accent`) in `d:\Codes\TherapistLanding\asim_cetiner_website\app\globals.css`
- [x] T005 [P] Add `getSiteOfficeMapsSearchHref()` exporting Google Maps search URL for `SITE_OFFICE_ADDRESS_SINGLE_LINE` in `d:\Codes\TherapistLanding\asim_cetiner_website\lib\site-contact.ts`
- [x] T006 Add stable `id={`hizmet-${pillar.id}`}` on each pillar block in `d:\Codes\TherapistLanding\asim_cetiner_website\components\feature\services-list-detailed-cards.tsx`, plus `scroll-margin-top` / offset so fragments clear sticky header per `specs\023-customer-landing-updates\contracts\public-marketing-content.md`

---

## Phase 3: User Story 1 — Service overview → detail (Priority: P1) — MVP core

**Goal**: FR-002 intro + every home service tile navigates to anchored detail on `/hizmetler` with keyboard-accessible `Link` and visible focus.

**Independent Test**: On `/` scroll to Hizmetler; intro matches spec; click each of three tiles → lands on `d:\Codes\TherapistLanding\asim_cetiner_website\app\(main)\hizmetler\page.tsx` view with correct pillar in view.

### Implementation

- [x] T007 [US1] Replace services intro copy in `d:\Codes\TherapistLanding\asim_cetiner_website\components\feature\services-list.tsx` with verbatim FR-002 sentence from `spec.md`
- [x] T008 [US1] In `d:\Codes\TherapistLanding\asim_cetiner_website\components\feature\services-list-cards.tsx`, make each pillar card a `next/link` navigation to `` `${ROUTES.services}#hizmet-${pillar.id}` `` (import `ROUTES` from `d:\Codes\TherapistLanding\asim_cetiner_website\lib\routes.ts`); preserve Framer layout and ensure focus ring / hit target cover full card without breaking motion

**Checkpoint**: US1 independently shippable — services funnel works before process/contact copy.

---

## Phase 4: User Story 2 — Contact guidance + tel / WhatsApp (Priority: P1) — MVP core

**Goal**: FR-008 adjacent to every public `ContactForm` with working `tel:` and WhatsApp deep links from `lib/site-contact.ts`.

**Independent Test**: `/` and `/iletisim` — guidance visible near form; tap or click phone vs WhatsApp opens dialer / `wa.me`.

### Implementation

- [x] T009 [US2] Create single-source module (e.g. `d:\Codes\TherapistLanding\asim_cetiner_website\lib\content\contact-lead-copy.tsx` per `research.md`) exporting Server Component JSX for verbatim FR-008 paragraph with anchors from `getSiteTelHref()`, `getSiteWhatsappHref()` in `d:\Codes\TherapistLanding\asim_cetiner_website\lib\site-contact.ts`
- [x] T010 [US2] Compose that module inside `ContactFormInner` (and reconcile `ContactFormFallback` if needed) in `d:\Codes\TherapistLanding\asim_cetiner_website\components\feature\contact-form.tsx` placing copy immediately above or beside `<form>` per `contracts\contact-phone-whatsapp-maps.md`

**Checkpoint**: US1 + US2 together satisfy dual P1 conversion paths.

---

## Phase 5: User Story 3 — Hero typography balance (Priority: P2)

**Goal**: FR-001 — headline + subtitle less viewport-dominant; subtitle subordinate to `h1`.

**Independent Test**: Mobile and desktop breakpoints on `/` and one SEO landing rendered via `Hero` through `d:\Codes\TherapistLanding\asim_cetiner_website\components\feature\home-template.tsx`.

### Implementation

- [x] T011 [US3] Tune heading and subtitle utility classes (`min-h` / `py` if needed) in `d:\Codes\TherapistLanding\asim_cetiner_website\components\feature\hero.tsx` so hierarchy and fold balance improve without clipping or cramped CTA cluster

---

## Phase 6: User Story 4 — Process section copy + layout (Priority: P2)

**Goal**: FR-005 / FR-006 — new Turkish title, intro, five verbatim steps plus CTA; vertical scannable layout per `research.md` on baseline `HomeTemplate` routes only.

**Independent Test**: Compare strings to `d:\Codes\TherapistLanding\asim_cetiner_website\docs\customer-requests.md` §3 plus `spec.md` FR-005 on `/` and SEO landings sharing `HomeTemplate`.

### Implementation

- [x] T012 [US4] Extend or replace literals in `d:\Codes\TherapistLanding\asim_cetiner_website\lib\content\how-it-works.ts` with section title, intro paragraph, five stakeholder step bodies, and Randevu CTA copy (`data-model.md` shape)
- [x] T013 [US4] Refactor `d:\Codes\TherapistLanding\asim_cetiner_website\components\feature\how-it-works.tsx` to vertical or chunked layout and append CTA block linking `ROUTES.contact`; preserve ordered-list semantics for assistive tech; retire horizontal-only chrome that fights long copy per `research.md`

---

## Phase 7: User Story 5 — One-click directions (Priority: P2)

**Goal**: FR-010 — obvious maps affordance using `getSiteOfficeMapsSearchHref()`.

**Independent Test**: From Konum section, one gesture opens external maps with practice address pinned or searchable.

### Implementation

- [x] T014 [US5] Implement primary external `<a>` (address and/or labelled control such as directions) in `d:\Codes\TherapistLanding\asim_cetiner_website\components\feature\map-view.tsx` using `getSiteOfficeMapsSearchHref()` from `d:\Codes\TherapistLanding\asim_cetiner_website\lib\site-contact.ts`

---

## Phase 8: User Story 6 — Name accent (Priority: P3)

**Goal**: FR-007 and clarifications — theme token `#2F3E4E` on hero emphasized name substring and header wordmark only.

**Independent Test**: Visual and contrast sampling on `/` hero and header; no accent on incidental footer mentions.

### Implementation

- [x] T015 [US6] Adjust `d:\Codes\TherapistLanding\asim_cetiner_website\components\feature\hero.tsx` so practitioner name emphasis inside the headline uses `text-brand-name-accent` (after T011 typography pass)
- [x] T016 [P] [US6] Apply same accent styling to deliberate wordmark text in `d:\Codes\TherapistLanding\asim_cetiner_website\components\feature\header.tsx`

---

## Phase 9: Polish & cross-cutting

**Purpose**: Release hygiene and SC smoke checks.

- [x] T017 Run `npm run lint` and `npm run build` from `d:\Codes\TherapistLanding\asim_cetiner_website\`
- [x] T018 Execute manual checklist in `d:\Codes\TherapistLanding\asim_cetiner_website\specs\023-customer-landing-updates\quickstart.md`

---

## Dependencies & execution order

### Phase dependencies

- **Phase 1** → **Phase 2** → User story phases → **Phase 9**
- **US1** requires **T006** (anchors) before verifying deep links
- **US5** requires **T005**
- **US6** requires **T004**; sequence **T011 before T015** to avoid conflicting hero edits
- US2–US5 have no mutual hard dependency besides foundational work

### User story completion order (suggested sequential)

```text
US1 → US2 → US3 → US4 → US5 → US6 → Polish
```

### Parallel opportunities

- After foundational: **US1 ‖ US4 ‖ US5** editing different files (`services-list*` + `how-it-works*` + `map-view.tsx`) once T006 exists for US1 QA
- **T004 ‖ T005** foundational
- **T016 ‖ T015** header vs hero accents after `hero.tsx` title structure settles

---

## Parallel example: Post-foundational sprint

```text
Lane A: T007 → T008 (US1)
Lane B: T012 → T013 (US4)
Lane C: T014 (US5)
Lane D: T009 → T010 (US2)
```

Lane A should wait for **T006** before end-to-end link tests.

---

## Implementation strategy

### MVP (both P1)

1. Phases **1 → 2**
2. Complete **US1** and **US2**

### Incremental delivery

Add **US3** (hero readability), **US4** (process trust), **US5** (maps), **US6** (brand accent), then **Phase 9**.

---

## Summary

| User story | Task IDs | Count |
|------------|----------|-------|
| — Setup | T001–T003 | 3 |
| — Foundational | T004–T006 | 3 |
| US1 | T007–T008 | 2 |
| US2 | T009–T010 | 2 |
| US3 | T011 | 1 |
| US4 | T012–T013 | 2 |
| US5 | T014 | 1 |
| US6 | T015–T016 | 2 |
| — Polish | T017–T018 | 2 |
| **Total** | **T001–T018** | **18** |

Format check: Every task uses `- [ ] TN…` checklist line template with ID and repo file path(s); user-story phases label `[US1]` … `[US6]`; foundational and polish omit story labels; `[P]` on T004, T005, T016 only.

**Suggested next command**: `/speckit.implement` (or `/speckit.analyze`) if you want a consistency sweep before coding.
