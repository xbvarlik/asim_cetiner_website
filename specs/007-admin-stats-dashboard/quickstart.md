# Quickstart: Admin Statistics Dashboard

**Feature**: `007-admin-stats-dashboard`  
**Date**: 2026-03-23

## Prerequisites

- Dependencies installed: **`recharts`**, **`date-fns`**, **`date-fns-tz`**.
- Shadcn **popover** + **calendar** present (or fallback date inputs documented).
- DB seeded with **`Lead`** (varied `utmSource`, offices) and **`TrafficLog`** rows across days.

## Steps

1. **`npm run dev`**
2. Log in as admin → **`/admin/stats`**.
3. Confirm default range shows widgets (or **“Veri bulunamadı”** if empty).
4. Set **from/to** via picker; URL updates with **`?from=&to=`**; reload preserves range.
5. **Lead** bars: counts match admin expectations for source + office.
6. **Visitor** donut: totals match grouped **`TrafficLog`** for range.
7. **Conversion** table: for visitors = 0, **%** shows **—**; else matches leads/visitors × 100.
8. **Comparison** chart: toggle sources; series show/hide without changing dates.
9. **`npm run build`** passes.

## Timezone sanity

- Create a **`TrafficLog`** just before midnight Istanbul boundary; verify it lands in the expected **calendar** day bucket in the daily chart.
