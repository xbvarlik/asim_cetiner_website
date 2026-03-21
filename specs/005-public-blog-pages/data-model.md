# Data Model: Public Blog Pages

**Feature**: `005-public-blog-pages`  
**Date**: 2026-03-21  
**Source**: [spec.md](./spec.md), Prisma schema

## Prisma `BlogPost` (unchanged)

| Field | Type | Public use |
|-------|------|------------|
| `id` | Int | URL segment **`/blog/[id]`** |
| `title` | String | List + detail headings, metadata |
| `content` | String | Preview (truncated) + full body |
| `isActive` | Boolean | **`true`** required for list + detail; **`false`** → treat as not found on public detail |
| `createdAt` | DateTime | Sort DESC on list; display on list + detail |
| `updatedAt` | DateTime | Optional future “updated” line (out of spec v1) |

## Service operations (to add)

| Function | Behavior |
|----------|----------|
| **List published** | `findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' }, take: N })` |
| **Get published by id** | `findFirst({ where: { id, isActive: true } })` → `null` if missing/inactive |

## Public DTO (conceptual)

Server Components may pass **serializable** props to feature components:

- **List item**: `{ id, title, content, createdAt }` (ISO string or `Date` serialized in page before passing to client if any client child—default all server).

## Validation

- **Route param `id`**: **Zod** `z.coerce.number().int().positive()` in **`page.tsx`** before service call; invalid → **`notFound()`**.
