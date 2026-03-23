# Contract: `stats-service` module

**Feature**: `007-admin-stats-dashboard`  
**Date**: 2026-03-23  
**Module**: `server/services/stats-service.ts`

## Shared input

```ts
type StatsDateRange = {
  startUtc: Date; // inclusive lower bound
  endUtc: Date;   // inclusive upper bound
};
```

Range is produced once on the server from validated **`from`/`to`** strings (Istanbul).

## Functions (illustrative names)

| Function | Returns | Notes |
|----------|---------|--------|
| `getLeadsBySourceInRange(range)` | `ServiceResult<LeadBySourceRow[]>` | `utmSource` null → unattributed bucket |
| `getLeadsByOfficeInRange(range)` | `ServiceResult<LeadByOfficeRow[]>` | Join office name |
| `getVisitorsBySourceInRange(range)` | `ServiceResult<VisitorBySourceRow[]>` | `TrafficLog` only |
| `getConversionTableInRange(range)` | `ServiceResult<ConversionRow[]>` | Union of sources seen in either table; **%** null if visitors=0 |
| `getDailyMetricsBySourceInRange(range)` | `ServiceResult<DailySourceMetricsRow[]>` | For time-series + client filter |

## Error handling

- Follow existing **`ServiceResult<T>`** pattern (`success` / `error`).
- **SQL**: only **parameterized** `$queryRaw` / `Prisma.sql`—no string interpolation of user dates.

## Performance

- Target **O(1)** HTTP round-trips from page: **one** service “bundle” function may call the above in **`Promise.all`** from the page for clarity.
