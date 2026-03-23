# Quickstart: Traffic Attribution & Social Share

**Feature**: `006-traffic-attribution-share`  
**Date**: 2026-03-21

## Prerequisites

- Database migrated with **`TrafficLog`** and **`Lead.utmSource`**.
- `npm run dev` from `kenan_kubuc_website`.

## Traffic log

1. Open a public page (e.g. `/`) with query **`?utm_source=test&utm_medium=email&utm_campaign=demo`**.
2. Confirm **one** row in **`TrafficLog`** with `source=test`, path `/`, medium/campaign set.
3. Refresh **5+** times — still **one** row for that browser tab session (check `sessionStorage` flag).
4. New incognito window — **new** row allowed.

## No log without UTM

1. Open `/hizmetler` with no `utm_*` — no new **`TrafficLog`** row (for that reason).

## Admin excluded

1. Open `/admin/login` — **no** **`TrafficLog`** rows created from browsing admin (tracker not mounted).

## Lead attribution

1. Land with **`?utm_source=whatsapp`**.
2. Navigate to contact section, submit valid lead.
3. Verify lead in DB (or admin UI) has **`utmSource`** `whatsapp`.
4. Submit lead without prior UTM — **`utmSource`** null/empty.

## Contextual home

1. On `/cift-terapisi`, click **Ana Sayfa** — stay on **`/cift-terapisi`**.
2. On `/hizmetler`, **Ana Sayfa** → **`/`**.

## Share modal

1. Open share UI on a public page; each tab produces a URL containing **`utm_source`** for that platform.
2. **Copy link** — toast success appears.
3. **375px** viewport — dialog usable (scroll if needed).

## Build

- `npm run build` — no TypeScript errors.
