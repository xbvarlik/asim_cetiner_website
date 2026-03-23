# Data Model: Traffic Attribution & Lead Source

**Feature**: `006-traffic-attribution-share`  
**Date**: 2026-03-21  
**Source**: [spec.md](./spec.md), Prisma conventions

## New model: `TrafficLog`

| Field | Type | Constraints |
|-------|------|-------------|
| `id` | `String` (UUID) | PK, default `uuid()` |
| `source` | `String` | Required; value from `utm_source` (trimmed, max **128**) |
| `path` | `String` | Required; pathname only (leading `/`, no origin), max **512** |
| `utmMedium` | `String?` | Optional; from `utm_medium`, max **128** |
| `utmCampaign` | `String?` | Optional; from `utm_campaign`, max **128** |
| `createdAt` | `DateTime` | `@default(now())` |

**Indexes** (optional v1): `createdAt` desc for future reporting; not required for MVP.

## `Lead` (update)

| Field | Type | Notes |
|-------|------|--------|
| `utmSource` | `String?` | Nullable; set from contact form when attribution present |

**Migration**: Add column with **`NULL`** default for existing rows.

## Validation (Zod — server boundary)

**`logTraffic` payload** (illustrative):

- `source`: string, min 1, max 128  
- `path`: string, must match safe pathname pattern (e.g. starts with `/`, no `//`, no `http`)  
- `utmMedium`, `utmCampaign`: optional string max 128  

**`createLead` extension**:

- `utmSource`: optional string max 128 (or omit if empty)

## Service operations

| Function | Behavior |
|----------|----------|
| **`createTrafficLog`** | `prisma.trafficLog.create` inside try/catch; return `ServiceResult<{ id: string }>` |
| **`leadService.create`** | Pass through `utmSource: string \| undefined` into `Lead` create data |
