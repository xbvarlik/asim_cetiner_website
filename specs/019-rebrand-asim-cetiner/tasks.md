---
description: "Task list for 019-rebrand-asim-cetiner"
---

# Tasks: Rebrand for Asım Çetiner

**Input**: Design documents from `D:\Codes\TherapistLanding\asim_cetiner_website\specs\019-rebrand-asim-cetiner\`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md  

**Tests**: Not requested in spec — no automated test tasks; verify via `npm run lint` and manual checks in Polish phase.

**Organization**: Phases follow user stories P1 → P2 → P3; paths are repo-root relative under `D:\Codes\TherapistLanding\asim_cetiner_website\`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: [US1] identity, [US2] palette, [US3] hero/areas imagery

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Baseline quality and confirm portrait asset before copy edits.

- [x] T001 Run `npm run lint` in repository root `D:\Codes\TherapistLanding\asim_cetiner_website` and ensure it passes before feature edits (fix only blocking issues if any)
- [x] T002 [P] Confirm `public/images/asim_cetiner_stock.jpg` exists and is the approved portrait for production use per `specs/019-rebrand-asim-cetiner/spec.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Confirm static image paths referenced by `components/feature/hero.tsx` and `components/feature/areas-of-work.tsx` exist before US3 replacement work.

**⚠️ CRITICAL**: Complete before relying on US3 image swap in release builds.

- [x] T003 Verify `public/images/areas-of-work-bg.jpg` and `public/images/hero-therapy-calm.jpg` exist; obtain rights-cleared replacement binaries for both (same filenames/paths) per `specs/019-rebrand-asim-cetiner/research.md` R5

**Checkpoint**: Portrait and target background files accounted for — user story implementation can proceed.

---

## Phase 3: User Story 1 - Correct therapist identity (Priority: P1) 🎯 MVP

**Goal**: All visible practitioner naming and the About portrait reference **Asım Çetiner** and `/images/asim_cetiner_stock.jpg`.

**Independent Test**: Open header, footer, about, home; view page titles on `/`, `/hakkimda`, `/iletisim`, `/sikca-sorulan-sorular`, and SEO landings (`/istanbul-psikolog`, `/uskudar-psikolog`, `/besiktas-psikolog`, `/cift-terapisi`, `/bilissel-davranisci-terapi`); confirm no “Kenan” / “Kübuç” / “Kübüç” in UI or document titles; About image requests `asim_cetiner_stock.jpg`.

### Implementation for User Story 1

- [x] T004 [P] [US1] Update practitioner copy, `next/image` `src`, and `alt` in `components/feature/about.tsx` to **Asım Çetiner** and `/images/asim_cetiner_stock.jpg`
- [x] T005 [P] [US1] Update site name label in `components/feature/header.tsx` to **Asım Çetiner**
- [x] T006 [P] [US1] Update practitioner heading and copyright line in `components/feature/footer.tsx` to **Asım Çetiner** (leave `info@kenankubuc.com` unchanged unless stakeholder supplies a new address per `specs/019-rebrand-asim-cetiner/research.md` R4)
- [x] T007 [P] [US1] Update `metadata` `title` `default` and `template` in `app/layout.tsx` for **Asım Çetiner**
- [x] T008 [P] [US1] Update `description` / `title` metadata in `app/(main)/page.tsx`, `app/(main)/hakkimda/page.tsx`, `app/(main)/iletisim/page.tsx`, and `app/(main)/sikca-sorulan-sorular/page.tsx` to use **Asım Çetiner** instead of prior name
- [x] T009 [P] [US1] Update absolute `title` strings in `lib/seo/landing-pages.ts` so each entry ends with **| Asım Çetiner** (replace **Kenan Kübuç**)

**Checkpoint**: User Story 1 is independently verifiable without changing colors or non-portrait images.

---

## Phase 4: User Story 2 - Calm, on-brand visuals (Priority: P2)

**Goal**: Primary brand color **#783B04**, secondary accent **#FD9B2F**, body background remains soft off-white; readable contrast on primary/accent fills.

**Independent Test**: Inspect hero CTA, primary buttons, link/chip accents, and page background on home and an inner page; compare to `specs/019-rebrand-asim-cetiner/contracts/public-brand-marketing.md`.

### Implementation for User Story 2

- [x] T010 [US2] Update `:root` semantic tokens in `app/globals.css`: set `--primary` to **#783B04**, align `--ring`, `--sidebar-primary`, and `--sidebar-ring` with the new primary; set `--accent` to **#FD9B2F** and tune `--accent-foreground` / `--primary-foreground` for WCAG-minded contrast; keep `--background` a soft off-white; adjust `--header-nav-foreground` if nav contrast breaks against the new palette

**Checkpoint**: User Story 2 verifiable independently of US3 (binary image swaps).

---

## Phase 5: User Story 3 - Updated hero and areas imagery (Priority: P3)

**Goal**: New photograph bytes at `public/images/areas-of-work-bg.jpg` and `public/images/hero-therapy-calm.jpg`, calm therapy-appropriate tone, distinct assets, no code path changes.

**Independent Test**: Hard-refresh `/` and scroll to Çalışma Alanları; confirm Network tab loads updated JPGs; hero and areas moods match spec tone.

### Implementation for User Story 3

- [x] T011 [P] [US3] Replace file content of `public/images/areas-of-work-bg.jpg` with new rights-cleared image (calm, professional, suitable behind overlays; not the same file as hero)
- [x] T012 [P] [US3] Replace file content of `public/images/hero-therapy-calm.jpg` with new rights-cleared hero image (calm, contemplative, full-width `object-cover` suitable)

**Checkpoint**: Imagery refresh complete; `components/feature/hero.tsx` and `components/feature/areas-of-work.tsx` unchanged except already-deployed paths.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Straggler audit, lint, optional housekeeping.

- [x] T013 [P] Search under `app/`, `components/`, and `lib/` (exclude `specs/`) for `Kenan`, `Kübuç`, `Kübüç`, and `kenan_kubuc_stok`; fix any production-facing matches
- [x] T014 Run `npm run lint` in repository root `D:\Codes\TherapistLanding\asim_cetiner_website` after all edits and resolve issues introduced by this feature
- [x] T015 [P] Optional: rename `package.json` `name` from `kenan-kubuc-website` and align `package-lock.json` if stakeholder wants package identity to match Asım Çetiner site; optionally update `.env.example` example database name — not required for visitor-facing acceptance

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately.
- **Phase 2 (Foundational)**: Depends on Phase 1 — lightweight gate for US3 assets.
- **Phase 3 (US1)**: Can start after Phase 1; does not require Phase 2 for copy/metadata (portrait file confirmed in T002).
- **Phase 4 (US2)**: Can start after Phase 1 — parallel with US1/US3 if staffed (touch `app/globals.css` only).
- **Phase 5 (US3)**: Depends on Phase 2 (replacement files ready) for meaningful completion.
- **Phase 6 (Polish)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **US1 (P1)**: Independent — MVP if shipped alone (old colors/images remain until US2/US3).
- **US2 (P2)**: Independent of US1/US3 for implementation file scope.
- **US3 (P3)**: Independent of US1/US2 for file scope; needs asset binaries from Phase 2.

### Parallel Opportunities

- After Phase 1: **US1** (T004–T009), **US2** (T010), and asset prep **US3** can proceed concurrently by different owners.
- Within US1: **T004–T009** are all **[P]** — parallel across files.
- Within US3: **T011** and **T012** are **[P]** — parallel once binaries exist.

### Parallel Example: User Story 1

```text
Task: T004 — components/feature/about.tsx
Task: T005 — components/feature/header.tsx
Task: T006 — components/feature/footer.tsx
Task: T007 — app/layout.tsx
Task: T008 — app/(main)/page.tsx, hakkimda, iletisim, sikca-sorulan-sorular
Task: T009 — lib/seo/landing-pages.ts
```

### Parallel Example: User Story 3

```text
Task: T011 — public/images/areas-of-work-bg.jpg
Task: T012 — public/images/hero-therapy-calm.jpg
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1–2 (T001–T003) as needed for assets.
2. Complete Phase 3 (T004–T009).
3. **STOP and VALIDATE**: Identity and portrait per spec SC-001 / US1 acceptance.
4. Deploy or continue to US2/US3.

### Incremental Delivery

1. US1 → trust and SEO titles correct.
2. US2 → brand palette live.
3. US3 → photography refresh.
4. Polish → grep + lint + optional `package.json`.

### Task counts

| Scope | Tasks |
|-------|--------|
| Phase 1 Setup | 2 (T001–T002) |
| Phase 2 Foundational | 1 (T003) |
| US1 | 6 (T004–T009) |
| US2 | 1 (T010) |
| US3 | 2 (T011–T012) |
| Polish | 3 (T013–T015) |
| **Total** | **15** |

**Format validation**: Every task uses `- [ ]`, sequential **T001–T015**, **[Story]** only on US phases, **[P]** only where parallel-safe, and each description includes concrete file path(s).

---

## Notes

- Contract reference: `specs/019-rebrand-asim-cetiner/contracts/public-brand-marketing.md`
- Quickstart order: `specs/019-rebrand-asim-cetiner/quickstart.md`
