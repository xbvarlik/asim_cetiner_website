# Data Model: Admin Panel

**Feature**: `004-admin-panel`  
**Date**: 2026-03-19  
**Source**: [spec.md](./spec.md), [research.md](./research.md)

## Prisma: new model `Admin`

```prisma
model Admin {
  id           String   @id @default(uuid())
  passwordHash String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

- **id**: UUID string primary key (FR-001).  
- **passwordHash**: bcrypt hash only; never store plaintext (FR-001, FR-012).  
- **Single row** in MVP; no `email` field required unless a follow-up adds identification UX.

**Migration**: additive; no change to `Office` timestamps (clarification: name-only sort, FR-006).

## Existing entities (unchanged shape, extended usage)

| Entity | Admin usage |
|--------|-------------|
| **Lead** | Filter `statusId`, `officeId`; sort `createdAt`, `name`, `updatedAt`; `remove` → soft delete (`deletedAt`) |
| **BlogPost** | List title, `isActive` → Active/Draft, `createdAt`; sort `createdAt`, `title`, `updatedAt`; CRUD |
| **Office** | Sort **`name` only** asc/desc, default asc; CRUD; delete blocked when leads reference (existing `onDelete: Restrict`) |
| **Status** | Reference for lead filters and inline status updates |

## List query parameters (services)

Extend pagination input (names illustrative; align with `types/`):

```ts
// Leads (admin)
type LeadSortField = "createdAt" | "name" | "updatedAt";
type SortDirection = "asc" | "desc";

type LeadListParams = PaginationParams & {
  sortBy: LeadSortField;
  sortDir: SortDirection;
  statusId?: number;
  officeId?: number;
};

// Blog posts (admin)
type BlogSortField = "createdAt" | "title" | "updatedAt";

type BlogListParams = PaginationParams & {
  sortBy: BlogSortField;
  sortDir: SortDirection;
};

// Offices (admin) — name only
type OfficeListParams = PaginationParams & {
  sortDir: SortDirection; // applies to name; default asc
};
```

**Validation**: Map `sortBy` / `sortDir` through **allow-lists** in Zod schemas at the Server Action boundary so Prisma `orderBy` is never user-controlled raw input.

## Password rules (Zod, FR-012)

New password (change flow):

- Minimum **8** characters.  
- At least **one** `A–Z`, **one** `a–z`, **one** digit `0–9`.  
- Latin letters sufficient for MVP.

**Login**: compare bcrypt only; do **not** enforce composition on existing seeded password (spec assumption).

## State transitions

- **Admin password**: `passwordHash` replaced on successful change after current password verify.  
- **Lead**: status update via `statusId`; delete → `deletedAt` set.  
- **BlogPost**: `isActive` toggled for Draft/Active presentation.  
- **Office**: create/update/delete with referential errors surfaced as user-visible messages (FR-011, edge cases).
