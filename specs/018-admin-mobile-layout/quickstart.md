# Quickstart: Verify admin mobile layout (018)

## Prerequisites

- Node 20+ (per repo conventions), dependencies installed (`npm install`).
- Database and admin credentials available (same as existing admin panel).
- `npm run dev` running locally.

## Lint

```bash
npm run lint
```

## Manual checks (narrow viewport)

1. Open DevTools → toggle device toolbar → pick a **phone portrait** preset (or resize to ~375px wide).
2. Visit admin login, sign in, then exercise:

| Step | Route (via app) | Expect |
|------|-----------------|--------|
| Shell | `/admin` (or dashboard home) | Hamburger opens full nav; no page horizontal scroll |
| Lists | `/admin/leads`, `/admin/blog`, `/admin/offices` | Compact default rows; details via toggle; pagination wraps |
| Stats | `/admin/stats` | No page horizontal scroll; charts contained |
| Settings | `/admin/settings` | Modal/form usable without page horizontal scroll |

3. Widen viewport past the **`md`** breakpoint: confirm **inline nav returns** and hamburger is hidden.

## Regression (desktop)

At **≥1024px**, spot-check the same routes: tables and header behave as before (no layout regressions).

## Out of scope spot check

Open a **public** home or marketing page on mobile: confirm **no** admin-only UI leaked (should be unchanged from main branch aside from unrelated work).
