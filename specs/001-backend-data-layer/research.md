# Research: Backend Data Layer

**Feature**: `001-backend-data-layer`
**Date**: 2026-03-19

## R1: Prisma Soft Delete Strategy

**Decision**: Use Prisma Client Extensions (`$extends`) to implement soft delete
on the Lead model.

**Rationale**: Client Extensions (available since Prisma 4.16+) are the modern
replacement for the deprecated middleware API. They are composable, type-safe,
and tree-shakeable. The extension intercepts `findMany`, `findFirst`, and
`findUnique` on the Lead model to automatically exclude records where
`deletedAt` is not null, and converts `delete` calls into `update` calls that
set `deletedAt` to the current timestamp.

**Alternatives considered**:
- **Prisma middleware (deprecated)**: Older pattern; not recommended for new
  projects. Client Extensions supersede it.
- **Manual filtering in every query**: Error-prone; easy to forget the
  `deletedAt` filter in new queries. Extension centralizes the concern.
- **Database-level row security (Supabase RLS)**: Would work but couples the
  logic to the hosting platform and makes local development harder.

## R2: Offset Pagination Pattern

**Decision**: Use Prisma `skip`/`take` with a concurrent `count()` query via
`Promise.all()` for offset pagination.

**Rationale**: Offset pagination is the standard pattern for admin panel table
views. Running the data query and count query concurrently via `Promise.all()`
minimizes latency. The service returns a standardized pagination envelope:
`{ data: T[], pagination: { page, pageSize, total, totalPages } }`.

**Alternatives considered**:
- **Cursor-based pagination**: Better for infinite scroll and large datasets,
  but overkill for an admin panel with small-to-medium record counts. Adds API
  complexity without meaningful benefit at this scale.
- **Unbounded queries**: Simplest, but does not scale and provides a poor admin
  UX when lead counts grow.

## R3: Zod Validation Strategy

**Decision**: Write Zod schemas manually in `lib/validations/` organized by
entity. Each entity gets `create` and `update` schemas. Use `safeParse()` at
the service boundary.

**Rationale**: Manual schemas give full control over custom validation rules
(email format, phone format, string length limits) that a generator cannot
infer from Prisma's schema alone. Keeping schemas in `lib/validations/` follows
the constitution's directory standards and makes them importable from both
Server Actions and service functions.

**Alternatives considered**:
- **`prisma-zod-generator`**: Auto-generates Zod schemas from Prisma models.
  Reduces duplication but offers less control over domain-specific validation
  (e.g., phone number format, email regex) and adds a build-time dependency.
- **Co-located schemas in service files**: Would work but limits reuse; Server
  Actions in `app/` would need to import from `server/services/`, creating a
  tighter coupling than a shared `lib/validations/` directory.

## R4: Prisma Client Singleton for Next.js

**Decision**: Use the standard singleton pattern in `lib/prisma.ts` with a
global cache to prevent multiple Prisma Client instances during Next.js hot
module reloading in development.

**Rationale**: Next.js App Router reloads modules during development, which can
create multiple Prisma Client instances and exhaust the database connection
pool. The `globalThis` pattern caches the client instance.

**Alternatives considered**:
- **No singleton**: Works in production but causes connection pool exhaustion
  during development with HMR.

## R5: Service Layer Error Handling

**Decision**: Services return a discriminated union result type
(`{ success: true, data: T } | { success: false, error: string }`) rather than
throwing exceptions. Prisma-specific errors (e.g., `P2002` unique constraint,
`P2003` foreign key constraint, `P2025` record not found) are caught and mapped
to domain-friendly error messages.

**Rationale**: Returning result objects instead of throwing makes error handling
explicit at the call site and avoids unhandled promise rejections. It aligns
with the constitution's requirement for "structured, meaningful error
information" (FR-010). Prisma error codes are well-documented and can be mapped
to user-facing messages.

**Alternatives considered**:
- **Throw exceptions**: Requires try/catch at every call site; easy to miss.
- **Custom error classes**: More formal but adds class hierarchy complexity for
  a small project with a simple error surface.

## R6: Type Definitions Strategy

**Decision**: Define type aliases in `types/index.ts` that mirror Prisma model
shapes. Use Prisma's generated types as the source of truth and re-export
selected shapes as application-level type aliases.

**Rationale**: The constitution mandates type aliases (not interfaces) and
centralized definitions in `types/`. Deriving from Prisma's generated types
ensures the application types stay in sync with the schema without manual
duplication.

**Alternatives considered**:
- **Fully manual types**: Duplicates the Prisma schema; risks drift when
  schema changes.
- **Direct Prisma type imports everywhere**: Couples all application code
  directly to Prisma; makes future ORM swaps harder (low risk, but against
  clean layering).
