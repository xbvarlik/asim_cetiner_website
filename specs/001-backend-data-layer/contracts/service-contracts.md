# Service Contracts: Backend Data Layer

**Feature**: `001-backend-data-layer`
**Date**: 2026-03-19

These contracts define the public API surface of each service module. All
services live under `server/services/` and import the Prisma singleton from
`lib/prisma.ts`.

## Common Types

```typescript
type PaginationParams = { page: number; pageSize: number };

type PaginatedResult<T> = {
  data: T[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
};

type ServiceResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };
```

## server/services/lead-service.ts

```typescript
import type { LeadType, PaginatedResult, ServiceResult } from "@/types";
import type { z } from "zod";
import type { createLeadSchema, updateLeadSchema } from "@/lib/validations/lead-validation";

export async function getAll(
  params: PaginationParams
): Promise<ServiceResult<PaginatedResult<LeadType>>>;

export async function getById(
  id: string
): Promise<ServiceResult<LeadType | null>>;

export async function create(
  data: z.infer<typeof createLeadSchema>
): Promise<ServiceResult<LeadType>>;

export async function update(
  id: string,
  data: z.infer<typeof updateLeadSchema>
): Promise<ServiceResult<LeadType>>;

export async function remove(
  id: string
): Promise<ServiceResult<LeadType>>;
```

**Notes**:
- `getAll` and `getById` exclude soft-deleted leads (`deletedAt != null`).
- `remove` performs a soft delete (sets `deletedAt`), not a hard delete.
- The function is named `remove` to avoid the `delete` reserved word.

## server/services/office-service.ts

```typescript
import type { OfficeType, PaginatedResult, ServiceResult } from "@/types";
import type { z } from "zod";
import type { createOfficeSchema, updateOfficeSchema } from "@/lib/validations/office-validation";

export async function getAll(
  params: PaginationParams
): Promise<ServiceResult<PaginatedResult<OfficeType>>>;

export async function getById(
  id: number
): Promise<ServiceResult<OfficeType | null>>;

export async function create(
  data: z.infer<typeof createOfficeSchema>
): Promise<ServiceResult<OfficeType>>;

export async function update(
  id: number,
  data: z.infer<typeof updateOfficeSchema>
): Promise<ServiceResult<OfficeType>>;

export async function remove(
  id: number
): Promise<ServiceResult<OfficeType>>;
```

**Notes**:
- `remove` performs a hard delete. Fails with an error if the office has
  associated leads (Restrict).

## server/services/blog-service.ts

```typescript
import type { BlogPostType, PaginatedResult, ServiceResult } from "@/types";
import type { z } from "zod";
import type { createBlogPostSchema, updateBlogPostSchema } from "@/lib/validations/blog-validation";

export async function getAll(
  params: PaginationParams
): Promise<ServiceResult<PaginatedResult<BlogPostType>>>;

export async function getById(
  id: number
): Promise<ServiceResult<BlogPostType | null>>;

export async function create(
  data: z.infer<typeof createBlogPostSchema>
): Promise<ServiceResult<BlogPostType>>;

export async function update(
  id: number,
  data: z.infer<typeof updateBlogPostSchema>
): Promise<ServiceResult<BlogPostType>>;

export async function remove(
  id: number
): Promise<ServiceResult<BlogPostType>>;
```

## server/services/status-service.ts

```typescript
import type { StatusType, PaginatedResult, ServiceResult } from "@/types";
import type { z } from "zod";
import type { createStatusSchema, updateStatusSchema } from "@/lib/validations/status-validation";

export async function getAll(
  params: PaginationParams
): Promise<ServiceResult<PaginatedResult<StatusType>>>;

export async function getById(
  id: number
): Promise<ServiceResult<StatusType | null>>;

export async function create(
  data: z.infer<typeof createStatusSchema>
): Promise<ServiceResult<StatusType>>;

export async function update(
  id: number,
  data: z.infer<typeof updateStatusSchema>
): Promise<ServiceResult<StatusType>>;

export async function remove(
  id: number
): Promise<ServiceResult<StatusType>>;
```

**Notes**:
- `remove` performs a hard delete. Fails with an error if the status has
  associated leads (Restrict).

## Error Mapping Convention

All services catch Prisma errors and map them to `ServiceResult`:

| Prisma Code | Meaning                  | Service Error Message                    |
|-------------|--------------------------|------------------------------------------|
| P2002       | Unique constraint failed | "A record with this {field} already exists" |
| P2003       | Foreign key failed       | "Referenced {entity} does not exist"     |
| P2025       | Record not found         | "{Entity} not found"                     |
| Other       | Unexpected               | "An unexpected error occurred"           |
