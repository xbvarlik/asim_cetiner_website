# Research: Traffic Attribution, Lead Source & Social Share

**Feature**: `006-traffic-attribution-share`  
**Date**: 2026-03-21

## R1: Where to mount the visitor tracker

**Decision**: Render **`TrafficTracker`** inside **`components/feature/site-shell.tsx`**, not **`app/layout.tsx`**.

**Rationale**: **`SiteShell`** wraps only public marketing layouts **`(main)`** and **`(home-variations)`**. **`(admin)`** uses a separate layout tree, so staff sessions never trigger **`logTraffic`** without path-based hacks.

**Alternatives considered**:

- **Root layout**: Would require pathname checks and still run on admin HTML shell—more error-prone.
- **Per-page insert**: Duplicated and easy to miss new routes.

---

## R2: Session de-duplication vs attribution freshness

**Decision**:

- **TrafficLog write**: At most **one** successful insert per browser tab session when **`utm_source`** is first observed ( **`sessionStorage`** key e.g. `kk_traffic_logged` = `"1"` after success).
- **Lead `utmSource`**: Use **last non-empty `utm_source` seen in the URL** during the session, stored in **`sessionStorage`** (and mirrored to a short-lived **cookie** for resilience). Update whenever the loaded URL contains **`utm_source`** so last-touch before submit wins.

**Rationale**: Spec forbids duplicate rows on refresh; marketers often care about **last campaign** before conversion. Traffic analytics still capture the **first** tagged landing in that session.

**Alternatives considered**:

- **First-touch only for leads**: Simpler but ignores later campaign clicks in-session.
- **Log every URL change with utm**: Violates “no duplicate on revisit” spirit for same session.

---

## R3: Cookie vs sessionStorage

**Decision**: Use **both**: **`sessionStorage`** as primary for read/write from **`TrafficTracker`** and **`ContactForm`**; set a **first-party cookie** (e.g. `kk_utm_source`, **HttpOnly false**, **SameSite=Lax**, **Path=/**, **Max-Age** ~7 days or **session**) mirroring the same value when **`utm_source`** appears so a full reload or rare edge cases still allow the form to read via a tiny client helper.

**Rationale**: Spec explicitly allows cookie and/or sessionStorage; improves odds the hidden field is populated without new server APIs.

**Alternatives considered**:

- **Cookie only**: Works but worse DX without JS on form.
- **Storage only**: Fails cross-tab consistency; cookie softens that.

---

## R4: String bounds and query precedence

**Decision**: Trim and **truncate** stored strings to safe max lengths (e.g. **128** chars for `source` / medium / campaign / path segment storage). If duplicate `utm_source` keys appear, use the **first** value from **`URLSearchParams`** (standard iterator order).

**Rationale**: Prevents DB bloat and abuse; deterministic behavior.

---

## R5: `logTraffic` transport

**Decision**: **Next.js Server Action** invoked from the client after mount (and optionally after **`usePathname`** / search changes for updating attribution storage only—not re-logging).

**Rationale**: Matches constitution (mutations via Server Actions) and existing **`createLeadAction`** pattern.

---

## R6: Share UI — Tabs component

**Decision**: Add Shadcn **`Tabs`** (`components/ui/tabs.tsx`) if not present; compose **`ShareModal`** with **`Dialog`** + **`Tabs`** per spec.

**Rationale**: Constitution requires Shadcn primitives; avoids custom tab state.

---

## R7: Share URL construction

**Decision**: Base URL = **`window.location.origin` + `pathname`** (and preserve existing **non-UTM** query params if any, or strip all marketing params then set **`utm_source`** for share—**default**: build from **pathname + fresh `utm_source` + `utm_medium=social`** optional). Minimum: **`?utm_source=<platformId>`** appended via **`URLSearchParams`**.

**Rationale**: Recipients clicking the link trigger **`TrafficTracker`** logging under that source.

**Platform IDs** (stable lowercase slugs): `whatsapp`, `instagram`, `facebook`, `linkedin`, `x`.

---

## R8: `getHomeLink` SEO set

**Decision**: Derive allowed SEO home paths from existing **`ROUTES`** keys: **`seoIstanbulPsikolog`**, **`seoCiftTerapisi`**, **`seoBilisselDavranisciTerapi`**, **`seoUskudarPsikolog`**, **`seoBesiktasPsikolog`**. **`getHomeLink(pathname)`** returns **`pathname`** if it **equals** one of those path strings (normalize trailing slash); else **`ROUTES.home`**.

**Rationale**: Single source of truth; satisfies FR-008.

---

## R9: Instagram share behavior

**Decision**: Tab action = **Copy tagged link** + short helper text (no reliable universal web “share to Instagram feed” URL). Optionally open **`instagram.com`** in new tab for user to paste.

**Rationale**: Instagram web share is limited; spec allows “sensible action.”
