# Data model: 021-horizontal-process-flow

## Overview

Presentation-only feature. **No database, API, or Prisma changes.**

## Entity: Process step (content)

| Field | Type | Rules | Source |
|-------|------|-------|--------|
| `order` | `number` | Strictly positive integer; unique per step; defines display sequence | `lib/content/how-it-works.ts` |
| `title` | `string` | Non-empty; shown bold under node | Same |
| `description` | `string` | Non-empty; body copy under title | Same |

## TypeScript

- Export: `HowItWorksStep`, `HOW_IT_WORKS_STEPS` (readonly array).
- **Invariant** (from 020 contract): array length **4–5**; `order` strictly increasing when sorted by array index.

## Relationships

- Steps are **ordered only by array index** (and `order` field matches 1..n for display in the circle).
- No relations to other entities.

## Validation

- Content edits: manual review + TypeScript `as const` on the array.
- No Zod schema required unless future CMS ingestion is added (out of scope).

## State transitions

- N/A (static marketing content).
