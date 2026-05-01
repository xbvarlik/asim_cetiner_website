# Contract: Public marketing modules (023)

## Surfaces inventoried (`FR-005` baseline Option B)

| Context | Routes (baseline, pre-change) |
|---------|-------------------------------|
| `HowItWorks` ships inside `HomeTemplate` | `/` (`ROUTES.home`) plus every path in `SEO_LANDING_PATHS` — see `lib/routes.ts` |

`HowItWorks` is **absent** on `/iletisim`; no change expected there for process (`FR-005`).

---

## `ServicesList` compact module

File: `components/feature/services-list.tsx`

- Heading remains “Hizmetlerimiz” unless a separate copy ticket overrides it.
- Intro `<p>` MUST render **FR-002** sentence exactly (customer copy), including «online ve yüz yüze» wording.

---

## Home service tiles

File: `components/feature/services-list-cards.tsx`

| Requirement | Contract |
|-------------|----------|
| Interactivity | Each tile navigates internally: concatenate `ROUTES.services`, `#`, `hizmet-`, and pillar `id` (central `ROUTES` import). |
| Accessibility | Entire intent is reachable by keyboard (`Link`/`Tab`), with visible `:focus-visible` styling. |
| Motion | Hover / Framer wrappers must not intercept pointer events meant for navigation. |

---

## Anchored detailed services

File: `components/feature/services-list-detailed-cards.tsx`

- Each pillar block MUST expose `id="hizmet-{pillar.id}"`.
- Fragment targets MUST remain visible beneath any sticky header (scroll margin / offset pattern as elsewhere on site).
