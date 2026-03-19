# Implementation Plan: Backend Data Layer

**Branch**: `001-backend-data-layer` | **Date**: 2026-03-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-backend-data-layer/spec.md`

## Summary

Establish the foundational data layer for the Kenan Kubuc therapist website:
a Prisma schema with four models (Status, Office, Lead, BlogPost), an
idempotent seed script, centralized type aliases, Zod validation schemas, and a
CRUD service layer with offset pagination, soft delete for leads, and
discriminated-union error handling.

## Technical Context

**Language/Version**: TypeScript 5.x (Node.js 18+ LTS)
**Primary Dependencies**: Next.js LTS (App Router), React 19+, Prisma ORM, Zod, Tailwind CSS, Shadcn/UI
**Storage**: PostgreSQL (NeonDB)
**Testing**: Vitest (recommended for Next.js + TypeScript projects)
**Target Platform**: Web (SSR via Next.js)
**Project Type**: Web application (therapist landing page + admin panel)
**Performance Goals**: Standard web application (no specific latency targets for data layer)
**Constraints**: Constitution-mandated (Server-First, Server Actions, Zod validation, no external state libraries)
**Scale/Scope**: Small-scale therapist practice; <10k leads, <100 blog posts, <10 offices

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|-----------|--------|----------|
| I. Core Tech Stack | ✅ Pass | Prisma ORM, Zod, TypeScript — all in approved stack |
| II. Architecture & Component Philosophy | ✅ Pass (N/A) | Feature is backend-only; no UI components created |
| III. Data Handling & Logic | ✅ Pass | Services in `server/services/`, direct Prisma access, Zod validation at boundary |
| IV. Directory Standards | ✅ Pass | `lib/prisma.ts` singleton, `types/` for definitions, `lib/validations/` for Zod schemas |
| V. State Management | ✅ Pass (N/A) | No client-side state involved |
| Code Quality & TypeScript | ✅ Pass | Strict mode, explicit return types, kebab-case files, barrel export in `types/` |

**Post-Phase 1 re-check**: All gates still pass. No violations introduced during design.

## Project Structure

### Documentation (this feature)

```text
specs/001-backend-data-layer/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── service-contracts.md
├── checklists/
│   └── requirements.md
└── tasks.md                   (created by /speckit.tasks)
```

### Source Code (repository root)

```text
kenan_kubuc_website/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── lib/
│   ├── prisma.ts
│   └── validations/
│       ├── lead-validation.ts
│       ├── office-validation.ts
│       ├── blog-validation.ts
│       └── status-validation.ts
├── server/
│   └── services/
│       ├── lead-service.ts
│       ├── office-service.ts
│       ├── blog-service.ts
│       └── status-service.ts
├── types/
│   └── index.ts
└── .env
```

**Structure Decision**: Next.js App Router single-project layout. No separate
backend/frontend split — Next.js handles both. Services live in `server/services/`
per constitution principle III. Validation schemas in `lib/validations/` are
shared between Server Actions and services.

## Complexity Tracking

No constitution violations. Table intentionally left empty.
