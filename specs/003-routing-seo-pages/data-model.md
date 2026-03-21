# Data Model: Site Routing & SEO Landing Pages

**Feature**: 003-routing-seo-pages | **Date**: 2026-03-21

## Persistence

No database schema changes. Existing entities:

- **Office** — still loaded for `ContactForm` office `<Select>` on home,
  `iletisim`, and any page that renders `HomeTemplate` with `ContactForm`.

- **Lead** — unchanged; submissions still via existing Server Action.

## Configuration entities (code-level, not DB)

### Canonical route map (`ROUTES`)

Logical keys → path strings:

| Key (example) | Path |
|----------------|------|
| home | `/` |
| about | `/hakkinda` |
| areasOfWork | `/calisma-alanlari` |
| services | `/hizmetler` |
| contact | `/iletisim` |
| blog | `/blog` (unchanged; page may be placeholder) |
| + 5 SEO keys | `/istanbul-psikolog`, … per FR-007 |

### SEO landing variant (record per slug)

| Field | Purpose |
|-------|---------|
| slug | URL segment (matches folder name) |
| pageTitle | `<title>` / Open Graph title |
| description | Meta description |
| heroTitle | Passed to `Hero` |
| heroSubtitle | Passed to `Hero` |

## Validation rules

- All `ROUTES` values are non-empty strings starting with `/`.
- SEO records MUST cover exactly the five slugs in FR-007.

## State transitions

N/A (read-only routing and static metadata).
