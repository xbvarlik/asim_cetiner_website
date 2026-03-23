# Contract: Traffic logging (Server Action)

**Feature**: `006-traffic-attribution-share`  
**Date**: 2026-03-21

## Action: `logTrafficAction`

**Module**: `server/actions/traffic-actions.ts` (illustrative)

### Input (serialized)

| Field | Type | Source |
|-------|------|--------|
| `source` | `string` | `utm_source` query param |
| `path` | `string` | `window.location.pathname` only (client must not send origin) |
| `utmMedium` | `string?` | `utm_medium` if present |
| `utmCampaign` | `string?` | `utm_campaign` if present |

### Validation

- Zod schema at action boundary; reject invalid path or empty `source`.

### Success

- Returns `{ success: true }` or minimal acknowledgment (no sensitive data).

### Failure

- Returns `{ success: false }` — client **must not** retry in a loop; user experience unchanged.

### Client preconditions

- Call only when `utm_source` is non-empty after trim.
- Call at most once per session after successful response ( **`sessionStorage`** flag).

### Out of scope

- Rate limiting by IP (future hardening).
