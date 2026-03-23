# Contract: Statistics page URL parameters

**Feature**: `007-admin-stats-dashboard`  
**Date**: 2026-03-23

## Path

- **`ROUTES.admin.stats`** → `/admin/stats` (app file under `(dashboard)/stats`)

## Query parameters

| Param | Required | Format | Meaning |
|-------|----------|--------|---------|
| `from` | Recommended (default in code) | `YYYY-MM-DD` | Inclusive start (**Istanbul** calendar date) |
| `to` | Recommended (default in code) | `YYYY-MM-DD` | Inclusive end (**Istanbul** calendar date) |
| `sources` | Optional | Comma-separated, URL-encoded | Initial selected sources for comparison chart (normalized keys or raw—**must match** service normalization rules) |

## Behavior

1. Invalid or inverted range → **400-safe handling**: clamp or reset to **default window** (e.g. last **30** days) and still render (document exact rule in implementation).
2. Changing dates via picker → **`router.push`** same path with updated query → **Server Component** refetches.
3. Omitting `sources` → chart shows **all** sources from payload; checkbox state defaults to **all selected** (or top **N** if capped—document if capped).

## SEO / robots

- Page remains **noindex** (existing admin metadata pattern).
