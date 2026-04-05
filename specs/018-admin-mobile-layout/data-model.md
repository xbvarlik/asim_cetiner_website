# Data model: Admin mobile layout (018)

## Summary

This feature is **presentation-only**. There are **no** new Prisma models, fields, migrations, or Zod schemas for payloads.

## Entities

| Area | Change |
|------|--------|
| `Lead`, `BlogPost`, `Office`, `AdminUser`, stats aggregates | **Unchanged** — same DTOs passed into existing admin components |

## Validation / server boundaries

- **Server Actions** and **`server/services/*`** for admin: **unchanged**.
- List query validation (`admin-list-query-validation`, `stats-range-validation`): **unchanged**.

## State (UI only)

Transient UI state (mobile menu open, expanded row ids) lives in **client component memory** only; nothing persisted.
