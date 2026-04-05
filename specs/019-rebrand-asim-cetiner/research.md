# Research: 019-rebrand-asim-cetiner

## R1 — Where to define primary (#783B04) and accent (#FD9B2F)

**Decision**: Update semantic color variables in **`app/globals.css`** inside the `:root` block: map **`--primary`**, **`--ring`**, and aligned tokens (**`--sidebar-primary`**, **`--sidebar-ring`**, etc.) to the brown **#783B04**. Map the spec’s **secondary accent** (orange **#FD9B2F**) primarily to **`--accent`** (and tune **`--accent-foreground`** for contrast), since Shadcn’s **`--secondary`** in this codebase is a soft neutral surface—not the marketing “accent” role.

**Rationale**: The project already centralizes theme colors as CSS variables consumed by Tailwind v4 `@theme inline`. Keeping one source of truth preserves `bg-primary`, `text-accent`, etc. without scattering hex in components. Using **`accent`** for the orange matches typical “highlights / chips / secondary emphasis” usage in Shadcn-style themes.

**Alternatives considered**:

- **Add parallel `--brand-primary` / `--brand-accent` only** — Rejected: would require widespread class changes instead of reusing `primary` / `accent`.
- **Convert hex to oklch for every token** — Optional polish: improves consistency with existing oklch values; can use `color-mix` or tools to derive foreground pairs. Acceptable to use **hex directly** for the two brand anchors if contrast pairs are validated manually.

## R2 — Foreground colors on primary and accent fills

**Decision**: After setting **`--primary`** to #783B04, set **`--primary-foreground`** to a light neutral (retain near-off-white, e.g. existing `oklch(0.97 …)` or `#faf8f5`) and verify **4.5:1** minimum for button labels. For **`--accent`** = #FD9B2F, use a **dark brown or near-black foreground** (e.g. derived from #783B04 or dark neutral) so text/icons remain legible.

**Rationale**: Spec requires fixed brand hex values; legibility is adjusted via foreground tokens per edge case in spec.

**Alternatives considered**:

- **Lighten primary to pass contrast on white** — Rejected: contradicts fixed #783B04 for brand fills; use foreground color instead.

## R3 — Rename audit scope (codebase discovery)

**Decision**: Treat as in-scope for implementation grep + manual pass:

- **`components/feature/`**: `header.tsx`, `footer.tsx`, `about.tsx` (includes `alt` and `next/image` `src`).
- **`app/layout.tsx`**: `metadata` title default/template.
- **`app/(main)/`**: `page.tsx`, `hakkimda`, `iletisim`, `sikca-sorulan-sorular` metadata strings.
- **`lib/seo/landing-pages.ts`**: all absolute titles containing “Kenan Kübuç”.

Out of scope unless stakeholder asks: historical **`specs/**`** docs, **`package.json` / `package-lock.json` name**, **`.env.example`** example DB name (developer convenience only).

**Rationale**: Meets SC-001 for live site and SEO titles; avoids churn in archived spec folders.

**Alternatives considered**:

- **Global repo replace including specs** — Rejected for this feature: high noise, low visitor value.

## R4 — Contact email in footer (`info@kenankubuc.com`)

**Decision**: **Not changed** in this plan unless the spec or stakeholder supplies a new address. The user spec only mandates the **display name** and visuals.

**Rationale**: Changing domain/email is a business/ops decision with DNS and deliverability implications.

**Alternatives considered**:

- **Replace with placeholder** — Rejected: could publish invalid contact info.

## R5 — Replacing `areas-of-work-bg.jpg` and `hero-therapy-calm.jpg`

**Decision**: Keep **same public URLs** and filenames; **overwrite** files under `public/images/` with new licensed photography. Criteria: calm, muted palette; therapy-appropriate; **hero** remains suitable for full-width `object-cover`; **areas** remains distinct from hero and readable behind overlays/chips.

**Rationale**: Matches FR-006/FR-007 and avoids code path changes in `hero.tsx` / `areas-of-work.tsx`.

**Alternatives considered**:

- **New filenames + code changes** — Rejected: spec requires same paths.
