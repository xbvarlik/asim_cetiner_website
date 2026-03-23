# Contract: Client attribution storage

**Feature**: `006-traffic-attribution-share`  
**Date**: 2026-03-21

## Keys / identifiers (illustrative — implement consistently in code)

| Key | Storage | Purpose |
|-----|---------|---------|
| `kk_traffic_logged` | `sessionStorage` | `"1"` after **`logTrafficAction`** success for this tab session |
| `kk_utm_source` | `sessionStorage` | Last captured **`utm_source`** for lead form |
| `kk_utm_source` | Cookie (non-HttpOnly) | Mirror for resilience (same name or prefixed per env) |

## Contact form

- Hidden input name: **`utmSource`** (or agreed field name matching **`FormData`** in **`createLeadAction`**).
- Populated on client from **`sessionStorage`** / cookie read helper on mount or before submit.

## Privacy / behavior

- No third-party trackers introduced by this contract.
- Values are **campaign labels**, not PII.
