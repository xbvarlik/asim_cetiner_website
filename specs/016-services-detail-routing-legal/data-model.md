# Data model: 016-services-detail-routing-legal

Static **presentation data** only (no Prisma entities). Shapes guide implementation and validation (optional Zod if loaded from CMS later; not required for this feature).

## Entity: `ServiceOffering` (public)

| Field | Type | Required | Rules |
|--------|------|----------|--------|
| `id` | `string` (slug-like) | Yes | Stable key for React `key` if needed |
| `title` | `string` | Yes | Short heading shown on both compact and detailed cards |
| `shortDescription` | `string` | Yes | Used on **compact** home grid |
| `detailedDescription` | `string` | Yes | Longer narrative for **detailed** layout only |
| `highlights` | `string[]` | Yes | Non-empty for launch; each item is one `<li>` |
| `icon` | `LucideIcon` (component) | Yes | Same icon set as today for visual continuity |

**Relationships**: N/A (flat list).

**Validation**: `highlights.length >= 1` for each service at build/review time; strings non-empty after trim.

## Entity: `FooterLegalNotice`

| Field | Type | Required |
|--------|------|----------|
| `disclaimerTr` | literal string | Yes — exact: `Verilen tüm hizmetler danışmanlık kapsamındadır, psikiyatrik müdahale yapılmamaktadır.` |

**Placement**: Rendered inside `Footer` on every page that includes the site shell footer.

## Entity: `NavLink` (existing pattern)

No schema change beyond **removing** the entry whose `href` previously pointed to areas-of-work. Remaining links must reference keys in `ROUTES` only.

## Removed: Areas-of-work route

| Removed | Notes |
|---------|--------|
| `ROUTES.areasOfWork` | Delete after references removed |
| Page segment `app/(main)/calisma-alanlari/` | Delete directory |
