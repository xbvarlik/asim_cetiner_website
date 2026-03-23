# Contract: Share modal & contextual home link

**Feature**: `006-traffic-attribution-share`  
**Date**: 2026-03-21

## `getHomeLink(currentPathname: string): string`

**Module**: `lib/routes.ts`

### Rules

1. Normalize `currentPathname`: strip trailing slash except root; compare to known SEO paths.
2. If `currentPathname` is in the **SEO landing path set** (the five `ROUTES.seo*` values), return **that same path** (canonical form from `ROUTES`).
3. Otherwise return **`ROUTES.home`** (`/`).

### Consumers

- **`Header`**: “Ana Sayfa” nav item `href` and optionally **logo** link (product decision: **both** use `getHomeLink` for consistency).

## Share modal

### UI

- **Dialog** trigger: e.g. floating button or header icon (placement in **`/speckit.tasks`**).
- **Tabs**: WhatsApp | Instagram | Facebook | LinkedIn | X
- **Lucide** icons per tab (consistent sizing).

### Tagged URL

- For each platform `p`, shared URL must include **`utm_source=<p>`** where `p` ∈ `whatsapp`, `instagram`, `facebook`, `linkedin`, `x`.
- Use **`URL`** / **`URLSearchParams`** to merge with current page URL.

### Platform actions

| Platform | Action |
|----------|--------|
| WhatsApp | `https://wa.me/?text=<encoded url>` |
| Facebook | `https://www.facebook.com/sharer/sharer.php?u=<encoded>` |
| LinkedIn | `https://www.linkedin.com/sharing/share-offsite/?url=<encoded>` |
| X | `https://twitter.com/intent/tweet?url=<encoded>` |
| Instagram | Copy link + toast (no standard share URL) |

### Copy link

- **`navigator.clipboard.writeText`**
- Success feedback: **`sonner`** `toast.success` (already in root layout).

### Visibility

- Render only under **`SiteShell`** (public site); omit on admin layouts.
