# Data model: 017-faq-section-pages

Static **presentation data** only (no Prisma entities). Shapes guide implementation; optional Zod schema in `lib/content/faq.ts` recommended for fail-fast on invalid or empty items.

## Entity: `FaqItem` (public)

| Field | Type | Required | Rules |
|--------|------|----------|--------|
| `id` | `string` | Yes | Stable unique key (`kebab-case` or `faq-1` style) for React `key` and future anchors |
| `question` | `string` | Yes | Non-empty after trim; shown on collapsed trigger |
| `answer` | `string` | Yes | Non-empty after trim; may contain `\n\n` for paragraph breaks rendered as separate `<p>` blocks |

**Relationships**: Flat ordered list; order defines display everywhere (FR-005).

**Validation**: Minimum **3** items at content review time per spec assumptions; each `question` and `answer` non-empty.

## Entity: `FaqContentSet`

| Field | Type | Required |
|--------|------|----------|
| `items` | `readonly FaqItem[]` | Yes — single exported constant e.g. `PUBLIC_FAQ_ITEMS` |

**Consumers**:

- `FaqSection` / accordion UI on `HomeTemplate` and dedicated page
- Future: JSON-LD generator (optional)

## Routing (not DB)

| Constant | Value | Notes |
|----------|--------|--------|
| `ROUTES.faq` | `/sikca-sorulan-sorular` | Only path string for this feature in code |

## Pages: layout eligibility

| Surface | Inline FAQ? |
|---------|-------------|
| `/`, `app/(home-variations)/*` using `HomeTemplate` | Yes |
| `/hizmetler` and other single-focus section pages | No (FR-002a) |
| `/sikca-sorulan-sorular` | Full list (dedicated page) |
