# Quickstart: Site Routing & SEO Landing Pages

**Feature**: 003-routing-seo-pages | **Date**: 2026-03-21

## Prerequisites

- `002-home-page` (or equivalent) implemented: feature components and
  `officeService` available.
- `npm install` and `.env` with `DATABASE_URL` for contact office loading.

## Implementation order

1. Add `SiteShell`; refactor `app/(main)/layout.tsx` to use it.
2. Extend `Hero` with optional `title` / `subtitle`.
3. Add `getContactFormOffices()` helper; add `HomeTemplate`.
4. Replace `app/(main)/page.tsx` body with `HomeTemplate` (defaults) or keep
   composition equivalent to FR-013.
5. Add four section `page.tsx` files under `(main)/` with `metadata`.
6. Extend `lib/routes.ts` with SEO paths; update any link if key names change.
7. Add `app/(home-variations)/layout.tsx` using `SiteShell`.
8. Add `lib/seo/landing-pages.ts` (or inline metadata) + five SEO `page.tsx`
   files using `HomeTemplate` + unique `metadata`.
9. Run `npx next build` and smoke-test all URLs.

## Verify URLs

| URL | Expected primary content |
|-----|-------------------------|
| `/` | Full home (all sections) |
| `/hakkinda` | About |
| `/calisma-alanlari` | Areas of Work |
| `/hizmetler` | Services list |
| `/iletisim` | Contact form + map placeholder |
| `/istanbul-psikolog` | Full home + variant hero |
| `/cift-terapisi` | Full home + variant hero |
| `/bilissel-davranisci-terapi` | Full home + variant hero |
| `/uskudar-psikolog` | Full home + variant hero |
| `/besiktas-psikolog` | Full home + variant hero |

## Grep checks

```bash
# No raw paths for primary routes (allow blog and static assets as exceptions)
rg 'href="/hakkimda"' components/
rg "/hizmetler" components/
```

Prefer `ROUTES.*` in `components/feature/`.

## Out of scope (this feature)

- HTTP redirects from legacy URLs (FR-012).
- Blog content implementation.
