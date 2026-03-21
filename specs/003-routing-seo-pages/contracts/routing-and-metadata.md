# Contracts: Routing & Metadata

**Feature**: 003-routing-seo-pages | **Date**: 2026-03-21

## `lib/routes.ts` — `ROUTES`

All values MUST be literal path strings. Consumers MUST NOT concatenate ad-hoc
paths for the same logical destinations.

**Required keys (minimum)**

| Key | Path |
|-----|------|
| `home` | `/` |
| `about` | `/hakkinda` |
| `areasOfWork` | `/calisma-alanlari` |
| `services` | `/hizmetler` |
| `contact` | `/iletisim` |
| `blog` | `/blog` |
| `seoIstanbulPsikolog` | `/istanbul-psikolog` |
| `seoCiftTerapisi` | `/cift-terapisi` |
| `seoBilisselDavranisciTerapi` | `/bilissel-davranisci-terapi` |
| `seoUskudarPsikolog` | `/uskudar-psikolog` |
| `seoBesiktasPsikolog` | `/besiktas-psikolog` |

Exact key names MAY use camelCase consistent with existing `ROUTES` style;
paths MUST match the table above.

---

## `SiteShell`

**Location**: `components/feature/site-shell.tsx`  
**Type**: Server Component (no `'use client'`)

**Props**

```ts
type SiteShellProps = {
  children: React.ReactNode;
};
```

**Behavior**: Renders `Header`, then `children`, then `Footer`, using existing
feature components only.

---

## `HomeTemplate`

**Location**: `components/feature/home-template.tsx`  
**Type**: Server Component

**Props**

```ts
type HomeTemplateProps = {
  heroTitle: string;
  heroSubtitle: string;
  offices: Array<{ id: number; name: string }>;
};
```

**Behavior**: Renders, in order: `Hero` (with `title={heroTitle}`,
`subtitle={heroSubtitle}`), `About`, `AreasOfWork`, `ServicesList`,
`ContactForm` (with `offices`), `MapView`.

**Home page (`/`)**: MAY call `HomeTemplate` with default hero strings equal to
current production copy, OR pass defaults inside `Hero` when props omitted—plan
implementation picks one approach; behavior MUST match FR-013 (full stack).

---

## `Hero` extension

**Location**: `components/feature/hero.tsx`

**Additional optional props**

```ts
type HeroProps = {
  title?: string;
  subtitle?: string;
};
```

When `title` / `subtitle` are omitted, render existing default Turkish headline
and paragraph. CTAs MUST continue to use `ROUTES.contact` and `ROUTES.services`.

---

## Page `metadata` contract

Each new `page.tsx` under:

- `app/(main)/hakkimda`
- `app/(main)/calisma-alanlari`
- `app/(main)/hizmetler`
- `app/(main)/iletisim`
- `app/(home-variations)/*/page.tsx` (five pages)

MUST export a `metadata` object (or `generateMetadata`) with at least:

- `title` — non-empty, unique per page
- `description` — non-empty, unique per page

**Home `/`**: SHOULD be reviewed for uniqueness vs. SEO variants (avoid
duplicate default description across all landings).

**Blog**: Out of scope for this feature unless already present; if linked,
avoid 404 by stub page in a separate task.

---

## Server helper: offices for contact

**Suggested signature**

```ts
export async function getContactFormOffices(): Promise<
  Array<{ id: number; name: string }>
>;
```

**Behavior**: Uses `officeService.getAll({ page: 1, pageSize: 100 })`; on
failure returns `[]`.
