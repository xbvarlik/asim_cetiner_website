# Tasks: Answer Engine Optimization (AEO) — `llms.txt` + JSON-LD

**Input**: Design documents from `D:\Codes\TherapistLanding\asim_cetiner_website\specs\022-aeo-llms-jsonld\`  
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)

**Tests**: Manual verification per [quickstart.md](./quickstart.md) and `npm run lint` only (no automated test suite requested in spec).

**Organization**: Tasks grouped by user story (US1 → US2 → US3) for independent increments.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no ordering dependency within phase)
- **[Story]**: [US1], [US2], [US3] for user-story phases only

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Environment documentation for absolute URLs used by `llms.txt` and JSON-LD.

- [x] T001 Document `NEXT_PUBLIC_SITE_URL` (absolute origin, no trailing slash) in `D:\Codes\TherapistLanding\asim_cetiner_website\.env.example` with a short comment pointing to `specs\022-aeo-llms-jsonld\quickstart.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared SEO helpers required before **`public/llms.txt`** and JSON-LD implementation.

**⚠️ CRITICAL**: Complete this phase before Phase 3–5 user-story work.

- [x] T002 [P] Add `D:\Codes\TherapistLanding\asim_cetiner_website\lib\seo\constants.ts` exporting the verbatim disclaimer from spec **FR-003**, Wikidata IRIs from [research.md](./research.md) (`Q1147152`, `Q172195`), canonical `jobTitle` string (`Uzman Psikolog`), and `PLACEHOLDER_ACADEMIA_URL` / `PLACEHOLDER_RESEARCHGATE_URL` token literals for `sameAs`
- [x] T003 [P] Add `D:\Codes\TherapistLanding\asim_cetiner_website\lib\seo\site-origin.ts` exporting `getSiteOrigin(): string` reading `process.env.NEXT_PUBLIC_SITE_URL` with `http://localhost:3000` fallback for local dev (per [research.md](./research.md))

**Checkpoint**: Constants and origin helper available for US1 and US2.

---

## Phase 3: User Story 1 — Compliant `llms.txt` (Priority: P1) 🎯 MVP

**Goal**: Public **`GET /llms.txt`** with Markdown-oriented body: H1, danışmanlık-framed summary, mandatory disclaimer, pointers to About / Çalışma Alanları / Contact using compliant terminology (**FR-001**–**FR-003**).

**Independent Test**: Fetch `/llms.txt` locally; confirm structure, verbatim disclaimer, blacklist terms absent, links use `ROUTES` from `lib/routes.ts` with `getSiteOrigin()` (see [contracts/llms-txt.md](./contracts/llms-txt.md)).

### Implementation for User Story 1

- [x] T004 [US1] Serve **`GET /llms.txt`** via `D:\Codes\TherapistLanding\asim_cetiner_website\app\llms.txt\route.ts` (dynamic Markdown-oriented body + `ROUTES` + `getSiteOrigin()`), shared copy in `lib/seo/practice-copy.ts` — replaces a static `public/llms.txt` so origins stay correct

**Checkpoint**: MVP deliverable — crawlers can consume `llms.txt` without JSON-LD.

---

## Phase 4: User Story 2 — JSON-LD structured identity (Priority: P2)

**Goal**: **`LocalBusiness`** + nested **`Person`** graph in **`application/ld+json`**, emitted on every route using **`SiteShell`** (not admin); **`knowsAbout`** Wikidata URIs; **`sameAs`** with Instagram from `lib/site-contact.ts` plus placeholders; no **`MedicalBusiness`** (**FR-004**–**FR-010**).

**Independent Test**: View source on `/` or `/hizmetler`; extract JSON-LD; validate against [contracts/json-ld-practice.example.json](./contracts/json-ld-practice.example.json) shape and [research.md](./research.md) decisions.

### Implementation for User Story 2

- [x] T005 [US2] Implement `D:\Codes\TherapistLanding\asim_cetiner_website\lib\seo\practice-structured-data.ts` exporting a function that builds the JSON-LD object: `@type` `LocalBusiness`, nested `Person` via `employee`, `knowsAbout` array including Wikidata HTTPS IRIs, `description` fields including verbatim disclaimer + authority text from approved copy, `sameAs` including `SITE_INSTAGRAM_URL` and placeholder strings; populate phone/email/address from `lib/site-contact.ts`; optional Zod parse of the object before stringify; confirm repo scan for social links (**FR-010**) — at minimum ensure `lib/site-contact.ts` Instagram is used and no guessed URLs
- [x] T006 [US2] Add `D:\Codes\TherapistLanding\asim_cetiner_website\components\feature\practice-json-ld.tsx` (Server Component) that calls the builder and renders a single `<script type="application/ld+json">` with safe `JSON.stringify` (no `dangerouslySetInnerHTML` unless escaped per Next patterns; prefer passing string children or serialized JSON from server)
- [x] T007 [US2] Compose `<PracticeJsonLd />` inside `D:\Codes\TherapistLanding\asim_cetiner_website\components\feature\site-shell.tsx` so all `SiteShell` routes receive the block; export `PracticeJsonLd` from `D:\Codes\TherapistLanding\asim_cetiner_website\components\feature\index.ts` to match barrel conventions

**Checkpoint**: US1 + US2 complete — AEO artifacts live.

---

## Phase 5: User Story 3 — Stable citation / authority alignment (Priority: P3)

**Goal**: Machine-readable descriptions in **`llms.txt`** and JSON-LD reinforce the same factual narrative as **`docs/info.md`** (universities, programs, method names) without invented affiliations (**spec** User Story 3).

**Independent Test**: Side-by-side read of `public/llms.txt`, JSON-LD builder output strings, and `docs/info.md` “About” / education lines.

### Implementation for User Story 3

- [x] T008 [US3] Audit and align Turkish authority sentences in `D:\Codes\TherapistLanding\asim_cetiner_website\app\llms.txt\route.ts` / `lib\seo\practice-copy.ts` and `D:\Codes\TherapistLanding\asim_cetiner_website\lib\seo\practice-structured-data.ts` so institution names and programs match `D:\Codes\TherapistLanding\asim_cetiner_website\docs\info.md`; ensure method references remain consistent with **FR-008** Wikidata intent

**Checkpoint**: No contradictory authority signals between human copy source and AEO layers.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Lint and manual validation from [quickstart.md](./quickstart.md).

- [x] T009 Run `npm run lint` from `D:\Codes\TherapistLanding\asim_cetiner_website` and execute manual checks in `D:\Codes\TherapistLanding\asim_cetiner_website\specs\022-aeo-llms-jsonld\quickstart.md` (`/llms.txt`, JSON-LD on shell routes, admin route without JSON-LD if applicable)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No prerequisites
- **Phase 2 (Foundational)**: Depends on Phase 1 (optional ordering — env doc is independent but should exist before shipping)
- **Phase 3 (US1)**: Depends on Phase 2 (uses `constants.ts`, `site-origin.ts`, `ROUTES`)
- **Phase 4 (US2)**: Depends on Phase 2; **independent of US1 completion** (can implement in parallel after Phase 2 if two devs — both need foundational libs only). For single developer, US1 before US2 is natural.
- **Phase 5 (US3)**: Depends on **T004** and **T005–T007** (text to audit must exist)
- **Phase 6 (Polish)**: Depends on Phases 3–5 for full validation

### User Story Dependencies

- **US1**: After Phase 2 — no dependency on US2/US3
- **US2**: After Phase 2 — no strict dependency on US1 files (shared libs only); shipping order can be US1 → US2 or parallel after Phase 2
- **US3**: After US1 + US2 implementations exist

### Within User Story 2

- **T005** → **T006** → **T007** (strict order: builder → component → shell + barrel)

---

## Parallel Opportunities

| Phase | Parallel tasks |
|-------|----------------|
| Phase 2 | **T002** and **T003** — different files, no cross-import required at authoring time |
| After Phase 2 | **US1 (T004)** and **US2 (T005–T007)** can be split across developers once T002/T003 are merged |

### Parallel Example: Phase 2

```text
T002: lib/seo/constants.ts
T003: lib/seo/site-origin.ts
```

### Parallel Example: Post–Phase 2

```text
Developer A: T004 public/llms.txt
Developer B: T005 → T006 → T007 JSON-LD pipeline
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1–2  
2. Complete Phase 3 (T004)  
3. **STOP**: Validate `/llms.txt` per quickstart  

### Full feature

1. Phase 1–2 → foundation  
2. Phase 3 (US1) + Phase 4 (US2)  
3. Phase 5 (US3) alignment pass  
4. Phase 6 lint + manual QA  

---

## Notes

- All checklist lines use sequential IDs **T001**–**T009**  
- File paths are absolute where the template required specificity for Windows workspace roots; relative paths in code refer to repo root `asim_cetiner_website`  
- Do not introduce `MedicalBusiness` or blacklist terms in new strings  
