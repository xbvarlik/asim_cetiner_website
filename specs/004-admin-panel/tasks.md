# Tasks: Admin Panel

**Input**: Design documents from `/specs/004-admin-panel/`  
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/admin-panel.md](./contracts/admin-panel.md), [quickstart.md](./quickstart.md)

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no blocking dependency on incomplete sibling)
- **[Story]**: User story (US1–US5); omitted in Setup, Foundational, and Polish phases
- Every description includes at least one concrete file path

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Auth/crypto dependencies, Shadcn primitives, global toast host.

- [x] T001 Install runtime deps `jose` and `bcryptjs` and devDependency `@types/bcryptjs` in `kenan_kubuc_website/package.json` (npm install at repo root)
- [x] T002 [P] Add Shadcn Dialog primitive to `kenan_kubuc_website/components/ui/dialog.tsx`
- [x] T003 [P] Add Shadcn Table primitive to `kenan_kubuc_website/components/ui/table.tsx`
- [x] T004 [P] Add Shadcn Sonner wrapper to `kenan_kubuc_website/components/ui/sonner.tsx`
- [x] T005 Mount `<Toaster />` from `kenan_kubuc_website/components/ui/sonner.tsx` in `kenan_kubuc_website/app/layout.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Admin persistence, session/crypto helpers, middleware gate, service list/sort extensions, reusable admin UI shells. **No user-story pages** until this phase completes.

**⚠️ CRITICAL**: User story phases MUST NOT start until T022 completes.

- [x] T006 Add `Admin` model (`id` UUID, `passwordHash`, timestamps) to `kenan_kubuc_website/prisma/schema.prisma` and create a new migration under `kenan_kubuc_website/prisma/migrations/`
- [x] T007 Extend `kenan_kubuc_website/prisma/seed.ts` to bcrypt-seed a single Admin only when no `Admin` row exists; preserve existing Status and Office upserts
- [x] T008 Create `kenan_kubuc_website/lib/server/admin-password.ts` with explicit-return-type bcrypt `hashPassword` / `verifyPassword` (server-only)
- [x] T009 Create `kenan_kubuc_website/lib/server/admin-session.ts` with JWT sign/verify, cookie name constant, `setSessionCookie` / `clearSessionCookie` / `refreshSlidingExpiry` (7-day sliding per spec)
- [x] T010 Create `kenan_kubuc_website/lib/validations/admin-auth-validation.ts` with Zod schemas for login and change-password (new password FR-012 composition rules)
- [x] T011 Create `kenan_kubuc_website/server/services/admin-service.ts` to load Admin by id, verify password for login, and update `passwordHash` after change
- [x] T012 Extend `kenan_kubuc_website/types/index.ts` with admin list param types (`LeadListParams`, `BlogListParams`, `OfficeListParams`, sort field unions, `SortDirection`)
- [x] T013 Extend `kenan_kubuc_website/lib/routes.ts` with nested `ROUTES.admin` keys matching `specs/004-admin-panel/contracts/admin-panel.md` (no raw `/admin/...` strings elsewhere)
- [x] T014 Create `kenan_kubuc_website/middleware.ts` at app root: `matcher` for `/admin/:path*`, allow `ROUTES.admin.login`, redirect unauthenticated users to login, refresh valid sessions per T009
- [x] T015 Create client `kenan_kubuc_website/components/feature/admin-auth-provider.tsx` exposing auth context with only safe props (`isAuthenticated`, optional `adminId`) — no token or password
- [x] T016 Create `kenan_kubuc_website/app/(admin)/layout.tsx` as a Server Component that verifies session via `lib/server/admin-session.ts` and passes props into `AdminAuthProvider`
- [x] T017 [P] Create `kenan_kubuc_website/lib/validations/admin-list-query-validation.ts` with Zod allow-lists for lead/blog/office list query params (sort fields + directions + lead filters)
- [x] T018 [P] Extend `kenan_kubuc_website/server/services/lead-service.ts` with admin listing: pagination + `statusId`/`officeId` filters + orderBy `createdAt` | `name` | `updatedAt` (default `createdAt` desc)
- [x] T019 [P] Extend `kenan_kubuc_website/server/services/blog-service.ts` with admin listing: pagination + orderBy `createdAt` | `title` | `updatedAt` (default `createdAt` desc)
- [x] T020 [P] Extend `kenan_kubuc_website/server/services/office-service.ts` with admin listing: pagination + orderBy `name` asc/desc only (default asc)
- [x] T021 Create `kenan_kubuc_website/components/feature/admin-data-table.tsx` composing `components/ui/table.tsx` with pagination controls and sortable header callbacks (feature-level only)
- [x] T022 Create `kenan_kubuc_website/components/feature/admin-confirm-dialog.tsx` composing `components/ui/dialog.tsx` for destructive confirmations

**Checkpoint**: Migrations apply; middleware blocks `/admin/*` except login; services return sorted/paginated admin lists; reusable table + confirm dialog exist.

---

## Phase 3: User Story 1 - Secure Admin Access (Priority: P1) 🎯 MVP

**Goal**: Cookie session login, logout, middleware + robots alignment with spec SC-001 / SC-005.

**Independent Test**: Unauthenticated `/admin/leads` → login; valid login → session; Sign out → blocked again; `/robots.txt` disallows `/admin/`.

### Implementation for User Story 1

- [x] T023 [US1] Implement `loginAction` and `logoutAction` in `kenan_kubuc_website/server/actions/admin-auth-actions.ts` using Zod (T010), `admin-service` (T011), and `admin-session` (T009); return result shapes for Sonner
- [x] T024 [P] [US1] Create `kenan_kubuc_website/components/feature/admin-login-form.tsx` (`'use client'`) calling `loginAction`, showing errors, `toast` on success/failure, `router.refresh()` after success
- [x] T025 [US1] Create `kenan_kubuc_website/app/(admin)/admin/(auth)/login/page.tsx` rendering `AdminLoginForm` and using `ROUTES.admin.login` for links
- [x] T026 [US1] Create `kenan_kubuc_website/app/(admin)/admin/(dashboard)/layout.tsx` with a minimal chrome row including **Sign out** wired to `logoutAction` (superseded by AdminShell in US5)
- [x] T027 [US1] Create `kenan_kubuc_website/app/(admin)/admin/(dashboard)/page.tsx` as signed-in landing (e.g. short welcome + link to `ROUTES.admin.leads`)
- [x] T028 [US1] Add `kenan_kubuc_website/public/robots.txt` including `Disallow: /admin/` per FR-016

**Checkpoint**: US1 acceptance scenarios 1–6 verifiable manually.

---

## Phase 4: User Story 2 - Lead Administration (Priority: P2)

**Goal**: Paginated/filtered/sorted leads, inline status update, soft-delete with confirm + toast.

**Independent Test**: Sign in; `/admin/leads` filters/sorts; status Select persists; delete confirms and soft-hides row.

### Implementation for User Story 2

- [x] T029 [US2] Implement `updateLeadStatusAction` and `deleteLeadAction` in `kenan_kubuc_website/server/actions/admin-lead-actions.ts` with Zod + `lead-service`; revalidate admin leads path
- [x] T030 [US2] Create `kenan_kubuc_website/components/feature/admin-leads-table.tsx` using `admin-data-table.tsx`, Shadcn `Select` for status, `admin-confirm-dialog.tsx` for delete, toasts for mutations
- [x] T031 [US2] Create `kenan_kubuc_website/app/(admin)/admin/(dashboard)/leads/page.tsx` as Server Component: parse `searchParams` via T017 schemas, call lead-service (T018), render `AdminLeadsTable` with serialized props or child client boundary as needed

**Checkpoint**: US2 acceptance scenarios 1–6 pass manually.

---

## Phase 5: User Story 3 - Office Administration (Priority: P3)

**Goal**: Office CRUD via modals; name-only sort; delete blocked when leads exist (clear error).

**Independent Test**: CRUD offices; confirm sort; delete with attached lead shows message from service.

### Implementation for User Story 3

- [x] T032 [US3] Implement `createOfficeAction`, `updateOfficeAction`, `deleteOfficeAction` in `kenan_kubuc_website/server/actions/admin-office-actions.ts` with Zod + `office-service.ts`
- [x] T033 [US3] Create `kenan_kubuc_website/components/feature/admin-office-table.tsx` and `kenan_kubuc_website/components/feature/admin-office-modal.tsx` (create/edit) using `admin-data-table.tsx`, `admin-confirm-dialog.tsx`, and `components/ui/*` inputs
- [x] T034 [US3] Create `kenan_kubuc_website/app/(admin)/admin/(dashboard)/offices/page.tsx` wiring T020 list + T032 actions

**Checkpoint**: US3 acceptance scenarios 1–5 pass manually.

---

## Phase 6: User Story 4 - Blog Administration (Priority: P4)

**Goal**: Blog list with Active/Draft (`isActive`), sorts, modal CRUD, delete confirm.

**Independent Test**: Create/edit/toggle draft; delete confirm; list ordering works.

### Implementation for User Story 4

- [x] T035 [US4] Implement `createBlogPostAction`, `updateBlogPostAction`, `deleteBlogPostAction` in `kenan_kubuc_website/server/actions/admin-blog-actions.ts` with Zod + `blog-service.ts`
- [x] T036 [US4] Create `kenan_kubuc_website/components/feature/admin-blog-table.tsx` and `kenan_kubuc_website/components/feature/admin-blog-modal.tsx` for CRUD + Active/Draft mapping
- [x] T037 [US4] Create `kenan_kubuc_website/app/(admin)/admin/(dashboard)/blog/page.tsx` wiring T019 list + T035 actions

**Checkpoint**: US4 acceptance scenarios 1–4 pass manually.

---

## Phase 7: User Story 5 - Admin Shell, Settings, Placeholders (Priority: P5)

**Goal**: Full `AdminShell` nav (Turkish labels), İstatistikler placeholder, settings + password change modal (FR-012 + current password).

**Independent Test**: All nav targets reachable; password change success/failure toasts; stats page shows placeholder only.

### Implementation for User Story 5

- [x] T038 [US5] Create `kenan_kubuc_website/components/feature/admin-shell.tsx` with navigation to `ROUTES.admin.leads`, `.blog`, `.offices`, `.stats`, `.settings` (Turkish labels per spec) and **Sign out** per FR-014
- [x] T039 [US5] Refactor `kenan_kubuc_website/app/(admin)/admin/(dashboard)/layout.tsx` to wrap all dashboard pages with `AdminShell` (remove duplicate minimal chrome from T026 pattern)
- [x] T040 [US5] Create `kenan_kubuc_website/app/(admin)/admin/(dashboard)/stats/page.tsx` with non-numeric placeholder copy for İstatistikler
- [x] T041 [US5] Create `kenan_kubuc_website/app/(admin)/admin/(dashboard)/settings/page.tsx` hosting password-change entry (button opening modal or inline section)
- [x] T042 [US5] Add `changeAdminPasswordAction` to `kenan_kubuc_website/server/actions/admin-auth-actions.ts` and `kenan_kubuc_website/components/feature/admin-change-password-modal.tsx` (`'use client'`) with Zod FR-012 validation and toasts

**Checkpoint**: US5 acceptance scenarios 1–4 pass manually.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Barrel exports, build hygiene, quickstart validation.

- [x] T043 [P] Update `kenan_kubuc_website/components/feature/index.ts` to export new admin feature components
- [x] T044 [P] Update `kenan_kubuc_website/components/ui/index.ts` to export `dialog`, `table`, `sonner` if the project uses UI barrels
- [x] T045 Run `npm run build` in `kenan_kubuc_website/` and fix all TypeScript and ESLint errors introduced by the feature
- [x] T046 Execute manual verification steps in `specs/004-admin-panel/quickstart.md` and note any gaps

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1** → **Phase 2**: T005 should follow T002–T004 (Sonner file exists before root layout import).
- **Phase 2** → **Phase 3+**: All user stories depend on T022.
- **Phase 3 (US1)** → **Phase 4–7**: US2–US5 require working login/session (US1).
- **Phase 7 (US5)** → **Phase 8**: Polish after shell/settings exist (optional to run T045 earlier per branch).

### User Story Dependencies

| Story | Depends on |
|-------|------------|
| US1 | Foundational (T006–T022) |
| US2 | US1 |
| US3 | US1 |
| US4 | US1 |
| US5 | US1 (US2–US4 may be incomplete but shell should not break their routes) |

US2, US3, US4 can proceed **in parallel** after US1 if staffed (separate files; shared actions/services already in foundation).

### Within Each User Story

- Server Actions before client tables/modals that call them.
- Page (`page.tsx`) after actions + feature components for that story.

---

## Parallel Opportunities

**Phase 1**: T002, T003, T004 in parallel; then T005.

**Phase 2**: After T016, run T017, T018, T019, T020 in parallel; T021 and T022 can run in parallel with each other once T002–T004 exist.

**US1**: T024 parallel with preparing T025 if T023 is done first.

**US2–US4** (after US1): Entire phases in parallel across developers.

**Polish**: T043 and T044 in parallel.

### Parallel Example: User Story 2

```text
# After T029 is merged, developer A: T030 admin-leads-table.tsx
# Developer B: T031 leads/page.tsx (coordinate props contract with A)
```

### Parallel Example: Foundational services

```text
# After T012 types exist:
T018 lead-service.ts | T019 blog-service.ts | T020 office-service.ts | T017 admin-list-query-validation.ts
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1 and Phase 2 (through T022).  
2. Complete Phase 3 (US1).  
3. **STOP**: Run quickstart auth + robots checks; demo login/logout.

### Incremental Delivery

1. US1 → secure admin entry.  
2. US2 → operational lead desk.  
3. US3 → office maintenance.  
4. US4 → content.  
5. US5 → production-grade navigation + password rotation.  
6. Phase 8 → merge readiness.

### Suggested MVP Scope

- **Minimum shippable slice**: Phase 1 + Phase 2 + **Phase 3 (US1)**.

---

## Task Summary

| Phase | Task IDs | Count |
|-------|-----------|-------|
| Setup | T001–T005 | 5 |
| Foundational | T006–T022 | 17 |
| US1 | T023–T028 | 6 |
| US2 | T029–T031 | 3 |
| US3 | T032–T034 | 3 |
| US4 | T035–T037 | 3 |
| US5 | T038–T042 | 5 |
| Polish | T043–T046 | 4 |
| **Total** | | **46** |

---

## Notes

- Do not expose `ADMIN_JWT_SECRET` or session token to client components (FR-017).  
- Login rate limiting is **out of scope** (spec clarification); do not add throttle tasks.  
- Office Prisma model: **no** new timestamp columns for sorting (spec clarification).  
- Commit after each task or logical group; run `prisma migrate` after T006/T007 in dev.
