# Data Model: Backend Data Layer

**Feature**: `001-backend-data-layer`
**Date**: 2026-03-19
**Source**: spec.md (FR-001 through FR-012), research.md (R1, R6)

## Prisma Schema

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Status {
  id    Int    @id @default(autoincrement())
  name  String @unique

  leads Lead[]
}

model Office {
  id       Int     @id @default(autoincrement())
  name     String  @unique
  address  String
  mapsLink String?

  leads Lead[]
}

model Lead {
  id          String    @id @default(uuid())
  name        String
  phoneNumber String
  email       String
  message     String?
  deletedAt   DateTime?

  officeId Int
  office   Office @relation(fields: [officeId], references: [id], onDelete: Restrict)

  statusId Int
  status   Status @relation(fields: [statusId], references: [id], onDelete: Restrict)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model BlogPost {
  id       Int     @id @default(autoincrement())
  title    String
  content  String
  isActive Boolean @default(true)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Entity Relationship Diagram (textual)

```text
Status (1) ──────< Lead (many)
Office (1) ──────< Lead (many)
BlogPost (standalone)
```

## Entity Details

### Status

| Field | Type   | Constraints              |
|-------|--------|--------------------------|
| id    | Int    | PK, auto-increment       |
| name  | String | Unique, required         |

**Seed values**: "New", "Contacted", "In Progress", "Completed", "Cancelled"

### Office

| Field    | Type    | Constraints              |
|----------|---------|--------------------------|
| id       | Int     | PK, auto-increment       |
| name     | String  | Unique, required         |
| address  | String  | Required                 |
| mapsLink | String? | Optional                 |

**Referential rule**: Cannot be deleted while associated Leads exist (`onDelete: Restrict`).

### Lead

| Field       | Type      | Constraints                          |
|-------------|-----------|--------------------------------------|
| id          | String    | PK, UUID (auto-generated)            |
| name        | String    | Required                             |
| phoneNumber | String    | Required                             |
| email       | String    | Required                             |
| message     | String?   | Optional                             |
| deletedAt   | DateTime? | Null = active; non-null = soft-deleted |
| officeId    | Int       | FK → Office.id (Restrict)            |
| statusId    | Int       | FK → Status.id (Restrict)            |
| createdAt   | DateTime  | Auto-set on creation                 |
| updatedAt   | DateTime  | Auto-set on update                   |

**Soft delete**: `delete` sets `deletedAt` to current timestamp. All read
queries filter `deletedAt == null` by default (via Prisma Client Extension).

**Status transitions**: Unrestricted. Any `statusId` referencing a valid Status
record is accepted.

### BlogPost

| Field     | Type     | Constraints              |
|-----------|----------|--------------------------|
| id        | Int      | PK, auto-increment       |
| title     | String   | Required                 |
| content   | String   | Required                 |
| isActive  | Boolean  | Default: true            |
| createdAt | DateTime | Auto-set on creation     |
| updatedAt | DateTime | Auto-set on update       |

## Type Aliases (types/index.ts)

Derived from Prisma generated types using `Prisma.$ModelPayload`:

```typescript
import type { Status, Office, Lead, BlogPost } from "@prisma/client";

export type StatusType = Status;
export type OfficeType = Office;
export type LeadType = Lead;
export type BlogPostType = BlogPost;

export type PaginatedResult<T> = {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

export type ServiceResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };
```

## Validation Schemas (lib/validations/)

### lead-validation.ts

```typescript
import { z } from "zod";

export const createLeadSchema = z.object({
  name: z.string().min(1).max(255),
  phoneNumber: z.string().min(1).max(50),
  email: z.string().email().max(255),
  message: z.string().max(2000).optional(),
  officeId: z.number().int().positive(),
  statusId: z.number().int().positive(),
});

export const updateLeadSchema = createLeadSchema.partial();
```

### office-validation.ts

```typescript
import { z } from "zod";

export const createOfficeSchema = z.object({
  name: z.string().min(1).max(255),
  address: z.string().min(1).max(500),
  mapsLink: z.string().url().max(2000).optional(),
});

export const updateOfficeSchema = createOfficeSchema.partial();
```

### blog-validation.ts

```typescript
import { z } from "zod";

export const createBlogPostSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  isActive: z.boolean().optional(),
});

export const updateBlogPostSchema = createBlogPostSchema.partial();
```

### status-validation.ts

```typescript
import { z } from "zod";

export const createStatusSchema = z.object({
  name: z.string().min(1).max(100),
});

export const updateStatusSchema = createStatusSchema.partial();
```
