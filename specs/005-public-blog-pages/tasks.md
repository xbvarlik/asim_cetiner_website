# Tasks: Public Blog List & Detail

**Input**: Design documents from `/specs/005-public-blog-pages/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Manual + `npm run build` only (no automated test mandate in spec).

**Organization**: Tasks grouped by user story for independent implementation and verification.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: User story label (US1, US2)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm data layer matches the public-blog contract before coding.

- [x] T001 Verify `BlogPost` fields (`id`, `title`, `content`, `isActive`, `createdAt`) in prisma/schema.prisma match specs/005-public-blog-pages/data-model.md (no migration unless the model is missing fields)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Central routes, service reads for **published-only** posts, public DTO type, responsive body images.

**⚠️ CRITICAL**: No user story UI work until **`listPublishedForPublic`**, **`getPublishedById`**, and **`getBlogPostPath`** exist.

- [x] T002 Add `listPublishedForPublic()` to server/services/blog-service.ts: `where: { isActive: true }`, `orderBy: { createdAt: "desc" }`, bounded `take` (e.g. 100), return `ServiceResult<BlogPostType[]>` (or equivalent per existing patterns)
- [x] T003 Add `getPublishedById(id: number)` to server/services/blog-service.ts: `findFirst({ where: { id, isActive: true } })`, return `ServiceResult<BlogPostType | null>`; `null` for missing or inactive
- [x] T004 [P] Export `getBlogPostPath(id: number): string` from lib/routes.ts returning the public detail path (implementation lives only here; no `"/blog/"` literals elsewhere per specs/005-public-blog-pages/contracts/public-blog-routes.md)
- [x] T005 [P] Add `PublicBlogPost` (or `Pick`-based alias) in types/index.ts for serializable list/detail props `{ id, title, content, createdAt }` if not already expressible cleanly via `BlogPostType`
- [x] T006 [P] Add scoped `.blog-body img { max-width: 100%; height: auto; }` (and any minimal `pre`/overflow rules) to app/globals.css per specs/005-public-blog-pages/research.md (R6)

**Checkpoint**: Published-only queries and path helper ready; feature pages can import them.

---

## Phase 3: User Story 1 - Browse Published Articles (Priority: P1) 🎯 MVP

**Goal**: Public `/blog` lists active posts newest-first with preview, read-more via route helper, friendly empty state.

**Independent Test**: With ≥1 active post, open `ROUTES.blog` — only active posts, newest first, truncated preview, link to detail via `getBlogPostPath`. With zero active posts — **“Henüz yazı paylaşılmadı”** (or equivalent) with no errors.

### Implementation for User Story 1

- [x] T007 [P] [US1] Create components/feature/blog-card.tsx as a Server Component: title with `text-primary`, formatted `createdAt`, body preview with `line-clamp-3` (or ~3 lines), **Devamını oku** / read-more using `Link` + `getBlogPostPath(post.id)` from lib/routes.ts (no `"/blog/"` string in this file)
- [x] T008 [US1] Create components/feature/blog-list.tsx as a Server Component: vertical stack with spacing; map posts to `BlogCard`; when `posts.length === 0`, render empty state copy per FR-003
- [x] T009 [US1] Replace app/(main)/blog/page.tsx: export static `metadata` (blog section title + description per contracts/public-blog-routes.md); call `listPublishedForPublic()`; handle `success: false` with safe error UI; pass data to `BlogList`
- [x] T010 [US1] Update components/feature/index.ts to export `BlogList` and `BlogCard`

**Checkpoint**: List route matches SC-001, FR-001–FR-003, FR-007–FR-009, FR-012 (headings/links).

---

## Phase 4: User Story 2 - Read a Full Article (Priority: P2)

**Goal**: `/blog/[id]` shows full active article with readable typography, **Geri Dön** to list; invalid id / draft / missing → `notFound()`.

**Independent Test**: Valid active id — full title, date, body. Draft or bad id — Next **not found**; no draft body leaked. Tab title on detail = post title (SC-004).

### Implementation for User Story 2

- [x] T011 [P] [US2] Create lib/blog-public-html.ts exporting a small server-only helper to strip obvious XSS vectors (`<script`, `on*=` patterns) from HTML string before injection, per specs/005-public-blog-pages/research.md (R5)
- [x] T012 [US2] Create components/feature/blog-content.tsx as a Server Component: full title (`text-primary`), date, **Geri Dön** `Button`/`Link` to `ROUTES.blog`; render body inside `.blog-body` using `dangerouslySetInnerHTML` after the strip helper; use `max-w-prose`, spacing, contrast per FR-013 / R4
- [x] T013 [US2] Create app/(main)/blog/[id]/page.tsx: parse `params.id` with `z.coerce.number().int().positive()` from zod; on failure call `notFound()`; call `getPublishedById`; on `null` or service failure → `notFound()` or safe error per existing patterns; render `BlogContent`; implement async `generateMetadata` using the same published-only fetch as the page (contracts/public-blog-routes.md)
- [x] T014 [US2] Update components/feature/index.ts to export `BlogContent`

**Checkpoint**: Detail route matches FR-004, FR-010, FR-011, FR-012–FR-014 (responsive images via CSS where HTML is arbitrary), edge cases in spec (invalid id, inactive).

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Constitution compliance, build, manual quickstart.

- [x] T015 [P] Search components/feature for substring `"/blog/"` and raw `/blog` detail patterns; ensure only lib/routes.ts (or its exports) builds detail paths; fix any stragglers
- [x] T016 Run `npm run build` from kenan_kubuc_website root; resolve TypeScript and routing errors
- [ ] T017 Execute manual steps in specs/005-public-blog-pages/quickstart.md (list, detail, back, 404s, empty state, metadata, 375px overflow spot-check for SC-005)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1** → **Phase 2** → **Phase 3** → **Phase 4** → **Phase 5**
- **Phase 3 (US1)** depends on Phase 2 (service + routes + types + CSS)
- **Phase 4 (US2)** depends on Phase 2 and benefits from US1 navigation but is independently testable via direct URL

### User Story Dependencies

- **US1 (P1)**: After Phase 2 — no dependency on US2
- **US2 (P2)**: After Phase 2 — can implement after US1 or in parallel once Phase 2 is done (detail page does not require list components in code, only shared service/routes/types)

### Within Each User Story

- **US1**: `blog-card` before or in parallel with scaffolding `blog-list` only if `blog-list` imports `blog-card` — complete `blog-card` first (T007 → T008)
- **US2**: `blog-public-html` (T011) before `blog-content` (T012) → `[id]/page` (T013)

### Parallel Opportunities

- After T002–T003: **T004**, **T005**, **T006** in parallel (different files)
- **T007** [US1] parallel with **T011** [US2] once Phase 2 is done (different files; optional time saver)
- **T015** can run anytime after T014

---

## Parallel Example: Phase 2 (after T003)

```bash
# Together:
Task T004 "getBlogPostPath in lib/routes.ts"
Task T005 "PublicBlogPost in types/index.ts"
Task T006 ".blog-body rules in app/globals.css"
```

---

## Parallel Example: User Story 1 vs User Story 2

```bash
# After Phase 2, different developers:
Developer A: T007 → T008 → T009 → T010 (list flow)
Developer B: T011 → T012 → T013 → T014 (detail flow)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1–2
2. Complete Phase 3 (US1)
3. **STOP and VALIDATE**: quickstart list + empty-state steps
4. Demo if ready

### Incremental Delivery

1. Phase 2 → published queries + routes
2. Add US1 → public index
3. Add US2 → public detail + metadata
4. Phase 5 → audit + build + full quickstart

---

## Notes

- All blog **pages** stay thin; layout/body live in `components/feature/*`
- Do not use `"/blog/"` literals outside lib/routes.ts (constitution + contract)
- Invalid `id` and inactive posts must never render full article HTML on the public detail route

---

## Task Summary

| Phase        | Task IDs   | Count |
|-------------|------------|-------|
| Setup       | T001       | 1     |
| Foundational| T002–T006  | 5     |
| US1         | T007–T010  | 4     |
| US2         | T011–T014  | 4     |
| Polish      | T015–T017  | 3     |
| **Total**   | **T001–T017** | **17** |

**Parallel-friendly tasks**: T004, T005, T006 (after T003); T007; T011; T015.

**Suggested MVP scope**: Phase 1–3 (through **T010**).
