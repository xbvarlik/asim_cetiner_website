# Data Model: Admin Statistics Dashboard

**Feature**: `007-admin-stats-dashboard`  
**Date**: 2026-03-23  
**Source**: [spec.md](./spec.md), Prisma schema

## Entities (read-only)

### `Lead`

| Field | Use in stats |
|-------|----------------|
| `createdAt` | Filter by date range |
| `deletedAt` | **Exclude** soft-deleted (`null` only) |
| `utmSource` | Group leads by source; **null/empty** → display label **`Belirtilmedi`** |
| `officeId` | Group leads; join **`Office.name`** for labels |

### `TrafficLog`

| Field | Use in stats |
|-------|----------------|
| `createdAt` | Filter by date range |
| `source` | Group visitors |

### `Office`

| Field | Use in stats |
|-------|----------------|
| `id`, `name` | Resolve office labels for lead-by-office |

## Derived views (DTOs — illustrative)

### `LeadBySourceRow`

- `sourceKey`: string (normalized or `"__unattributed__"` internally)
- `sourceLabel`: string (display)
- `count`: number

### `LeadByOfficeRow`

- `officeId`: number
- `officeName`: string
- `count`: number

### `VisitorBySourceRow`

- `source`: string (normalized for join)
- `sourceLabel`: string
- `count`: number

### `ConversionRow`

- `sourceLabel`: string
- `visitors`: number
- `leads`: number
- `conversionPercent`: number | null (**null** → UI **“—”** when `visitors === 0`)

### `DailySourceMetricsRow`

- `day`: string (**YYYY-MM-DD** Istanbul calendar date)
- `source`: string (normalized key)
- `sourceLabel`: string
- `visitors`: number
- `leads`: number

## Validation

- **URL / input**: `from`, `to` required or defaulted; **`from <= to`**; max span cap optional (e.g. 366 days) to protect DB—document in service if added.

## Indexes (optional follow-up)

- **`TrafficLog(createdAt)`**, **`Lead(createdAt)`** if explain plans show seq scans at scale—not required for MVP spec.
