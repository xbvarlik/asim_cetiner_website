# Research: Site Routing & SEO Landing Pages

**Feature**: 003-routing-seo-pages | **Date**: 2026-03-21

## Decision 1: Shared layout without duplicating Header/Footer

**Decision**: Introduce a **Server Component** `SiteShell` in
`components/feature/site-shell.tsx` that renders `Header`, `{children}`, and
`Footer`. Both `app/(main)/layout.tsx` and `app/(home-variations)/layout.tsx`
render `<SiteShell>{children}</SiteShell>`.

**Rationale**: Next.js route groups cannot share one `layout.tsx` file path;
composing the same feature shell in two layouts avoids copy-paste and satisfies
FR-006 / FR-011.

**Alternatives considered**: Moving shell to root `app/layout.tsx` — rejected
for now because future non-marketing routes (e.g. admin) may need a different
chrome; keeping shells inside public groups preserves flexibility.

## Decision 2: HomeTemplate + configurable Hero

**Decision**: Add `HomeTemplate` that composes the same section stack as today’s
home (`Hero` → `About` → `AreasOfWork` → `ServicesList` → `ContactForm` →
`MapView`). Extend `Hero` with optional `title` and `subtitle` string props;
when omitted, use the current default Turkish strings. `HomeTemplate` accepts
`heroTitle` and `heroSubtitle` and passes them to `Hero`.

**Rationale**: One implementation of the hero UI (FR-011). SEO pages only vary
copy and metadata.

**Alternatives considered**: Cloning `Hero` per variant — violates FR-011.
Passing React nodes as props — unnecessary complexity for text-only overrides.

## Decision 3: Office list fetching for ContactForm

**Decision**: Add a small server-only helper `getContactFormOffices()` in
`lib/server/contact-page-data.ts` (or `lib/server/offices-for-contact.ts`) that
calls `officeService.getAll` and maps to `{ id, name }[]`. Import from
`app/(main)/page.tsx`, `app/(main)/iletisim/page.tsx`, and `HomeTemplate` (or
pass offices into `HomeTemplate` from each page).

**Rationale**: DRY fetch logic; `ContactForm` stays a client component with
offices as props.

**Alternatives considered**: React `cache()` wrapper around fetch in a shared
module — optional optimization; same helper can be wrapped later if needed.

## Decision 4: Metadata strategy

**Decision**: Export static `Metadata` from each `page.tsx` where possible.
Centralize SEO variant title/description (and optional keywords) in
`lib/seo/landing-pages.ts` as a typed record keyed by route slug; each SEO
`page.tsx` imports its entry and spreads into `metadata`. Section pages each
export their own `metadata` object (can live inline or in the same file as
small constants).

**Rationale**: Unique titles/descriptions per FR-009; single table for five
variants prevents drift.

**Alternatives considered**: `generateMetadata` with DB — out of scope; all copy
is static for v1.

## Decision 5: lib/routes.ts extensions

**Decision**: Add five keys under `ROUTES`, e.g. `seoIstanbulPsikolog:
"/istanbul-psikolog"`, … matching FR-007. Header/footer continue to use logical
keys; no hardcoded path strings in components (FR-010).

**Alternatives considered**: Separate `SEO_ROUTES` object — acceptable; single
`ROUTES` keeps one import for grep and audits.

## Decision 6: Redirects (explicitly excluded)

**Decision**: Implement **no** `redirect()` or `permanentRedirect()` for legacy
URLs in this feature (FR-012).

**Rationale**: Clarification session chose out-of-scope; follow-up story can add
a central redirect map.
