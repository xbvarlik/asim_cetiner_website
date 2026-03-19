# Tasks: Backend Data Layer

**Input**: Design documents from `/specs/001-backend-data-layer/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: Not explicitly requested in the feature specification. Test tasks are omitted.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Next.js App Router single-project layout at repository root
- `prisma/` for schema and seed
- `lib/` for Prisma singleton and validations
- `server/services/` for business logic
- `types/` for centralized type definitions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, dependency installation, directory structure

- [x] T001 Initialize Next.js project with `create-next-app` (TypeScript, App Router, Tailwind CSS) at repository root
- [x] T002 Install additional dependencies: `prisma` (dev), `@prisma/client`, `zod` via npm
- [x] T003 [P] Create project directory structure per plan.md: `lib/validations/`, `server/services/`, `types/`
- [x] T004 [P] Create `.env.example` with `DATABASE_URL` placeholder and ensure `.env` is in `.gitignore`

**Checkpoint**: Project scaffolded, dependencies installed, directories ready.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Create Prisma client singleton with `globalThis` HMR-safe cache pattern in `lib/prisma.ts` (see research.md R4)
- [x] T006 Initialize Prisma with `npx prisma init` and configure PostgreSQL datasource + generator blocks in `prisma/schema.prisma`

**Checkpoint**: Foundation ready — Prisma client and schema file exist; user story implementation can begin.

---

## Phase 3: User Story 1 — Persistent Data Storage (Priority: P1) 🎯 MVP

**Goal**: All four entity tables (Status, Office, Lead, BlogPost) exist with correct columns, constraints, relations, and defaults.

**Independent Test**: Run `npx prisma migrate dev --name init` against an empty PostgreSQL database, then open `npx prisma studio` and confirm all tables, columns, unique constraints, foreign keys, and defaults are present.

### Implementation for User Story 1

- [x] T007 [US1] Define Status model with `id` (Int, PK, autoincrement) and `name` (String, @unique) in `prisma/schema.prisma` per data-model.md
- [x] T008 [US1] Define Office model with `id` (Int, PK), `name` (String, @unique), `address` (String), `mapsLink` (String?), and `leads` relation in `prisma/schema.prisma`
- [x] T009 [US1] Define Lead model with UUID `id`, `name`, `phoneNumber`, `email`, `message` (optional), `deletedAt` (DateTime?), FK relations to Office and Status (`onDelete: Restrict`), and `createdAt`/`updatedAt` timestamps in `prisma/schema.prisma`
- [x] T010 [US1] Define BlogPost model with `id` (Int, PK), `title`, `content`, `isActive` (Boolean, default true), and `createdAt`/`updatedAt` timestamps in `prisma/schema.prisma`
- [x] T011 [US1] Run initial database migration: `npx prisma migrate dev --name init` and verify all four tables created successfully
- [x] T012 [US1] Create type aliases (`StatusType`, `OfficeType`, `LeadType`, `BlogPostType`) re-exported from `@prisma/client`, plus `PaginatedResult<T>` and `ServiceResult<T>` utility types in `types/index.ts` per data-model.md

**Checkpoint**: Schema migrated, types defined. All four tables verified in database. User Story 1 complete and independently testable.

---

## Phase 4: User Story 2 — CRUD Service Layer (Priority: P2)

**Goal**: Every entity has a fully functional, validated, paginated CRUD service with discriminated-union error handling and soft delete for leads.

**Independent Test**: Import each service, call getAll/getById/create/update/remove against a seeded test database. Verify: valid payloads succeed, invalid payloads return validation errors, non-existent IDs return not-found, constraint violations return domain-friendly error messages.

### Validation Schemas

- [x] T013 [P] [US2] Create Zod `createStatusSchema` and `updateStatusSchema` in `lib/validations/status-validation.ts` per data-model.md
- [x] T014 [P] [US2] Create Zod `createOfficeSchema` and `updateOfficeSchema` in `lib/validations/office-validation.ts` per data-model.md
- [x] T015 [P] [US2] Create Zod `createLeadSchema` and `updateLeadSchema` (with email format, phone, message length limits) in `lib/validations/lead-validation.ts` per data-model.md
- [x] T016 [P] [US2] Create Zod `createBlogPostSchema` and `updateBlogPostSchema` in `lib/validations/blog-validation.ts` per data-model.md

### Service Implementations

- [x] T017 [P] [US2] Implement `getAll` (paginated via skip/take + count), `getById`, `create`, `update`, `remove` (hard delete with restrict check) in `server/services/status-service.ts` per contracts/service-contracts.md — use `safeParse` for validation, catch Prisma errors (P2002, P2003, P2025) and return `ServiceResult`
- [x] T018 [P] [US2] Implement `getAll` (paginated), `getById`, `create`, `update`, `remove` (hard delete, reject if leads exist) in `server/services/office-service.ts` per contracts/service-contracts.md
- [x] T019 [US2] Implement `getAll` (paginated, exclude soft-deleted), `getById` (exclude soft-deleted), `create`, `update`, `remove` (soft delete via `deletedAt` timestamp) in `server/services/lead-service.ts` using Prisma Client Extension (`$extends`) per research.md R1 and contracts/service-contracts.md
- [x] T020 [P] [US2] Implement `getAll` (paginated), `getById`, `create`, `update`, `remove` (hard delete) in `server/services/blog-service.ts` per contracts/service-contracts.md

**Checkpoint**: All 20 CRUD operations (5 per entity × 4 entities) functional. Validation rejects invalid input. Prisma errors mapped to domain messages. Lead soft delete works via Client Extension. User Story 2 complete.

---

## Phase 5: User Story 3 — Database Seeding (Priority: P3)

**Goal**: Idempotent seed script populates Status and Office tables with reference data on first run and is safe to re-run.

**Independent Test**: Run `npx prisma migrate reset` then `npx prisma db seed`. Open Prisma Studio — confirm 5 statuses and 2 offices. Run seed again — confirm no duplicate records.

### Implementation for User Story 3

- [x] T021 [US3] Create idempotent seed script using `upsert` for 5 statuses ("New", "Contacted", "In Progress", "Completed", "Cancelled") and at least 2 placeholder offices in `prisma/seed.ts`
- [x] T022 [US3] Configure seed command in `prisma.config.ts` and install `tsx`, `@prisma/adapter-pg`, `pg` dependencies
- [x] T023 [US3] Run `npx prisma db seed` and verify: 5 status records, 2 office records, idempotent re-run produces no duplicates

**Checkpoint**: Seed script complete. Database ready for application use. User Story 3 complete.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, code quality, and constitution compliance

- [x] T024 Verify all exported service functions have explicit TypeScript return types and no `any` usage per constitution (Code Quality & TypeScript Conventions)
- [x] T025 Verify file naming follows kebab-case convention and `types/` barrel export is complete per constitution (Directory Standards + Code Quality)
- [x] T026 Run quickstart.md end-to-end validation: `npx next build` passes with zero TS errors, seed verified idempotent

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 — BLOCKS US2 and US3 (schema must exist)
- **US2 (Phase 4)**: Depends on US1 (types and schema required for services)
- **US3 (Phase 5)**: Depends on US1 (tables must exist to seed); independent of US2
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational — no other story dependencies
- **User Story 2 (P2)**: Starts after US1 — needs schema + types; independent of US3
- **User Story 3 (P3)**: Starts after US1 — needs tables; independent of US2

### Within Each User Story

- Validation schemas before service implementations (US2)
- Schema models before migration (US1)
- Migration before types (US1 — Prisma generate depends on schema)
- Seed script before seed config before verification (US3)

### Parallel Opportunities

- T003 and T004 can run in parallel (Phase 1 — different files)
- T013, T014, T015, T016 can all run in parallel (Phase 4 — independent validation files)
- T017, T018, T020 can run in parallel (Phase 4 — independent service files; T019 lead-service is sequential due to Client Extension complexity)
- US2 and US3 could run in parallel after US1 completes (different file sets)

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (Prisma singleton + schema init)
3. Complete Phase 3: User Story 1 (schema + migration + types)
4. **STOP and VALIDATE**: Verify all tables in Prisma Studio
5. Schema is the MVP — all downstream features can build on it

### Incremental Delivery

1. Setup + Foundational → Project scaffolded
2. User Story 1 → Schema migrated, types ready (MVP!)
3. User Story 2 → Full CRUD service layer operational
4. User Story 3 → Database seeded with reference data
5. Polish → Constitution compliance verified, quickstart validated

### Parallel Execution (US2 + US3)

After US1 completes, US2 and US3 can proceed simultaneously:
- Stream A: Validation schemas → Service implementations (US2)
- Stream B: Seed script → Package config → Verification (US3)

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable at its checkpoint
- Commit after each task or logical group (e.g., after all validation schemas)
- Stop at any checkpoint to validate the story independently
- All service files follow the same contract pattern from contracts/service-contracts.md
- Lead service (T019) is the most complex task due to Prisma Client Extension for soft delete — allocate extra attention
