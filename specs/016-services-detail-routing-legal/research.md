# Research: 016-services-detail-routing-legal

## 1. Detailed vs compact services UI

**Decision**: Add a new feature component `ServicesListDetailed` in `components/feature/services-list-detailed.tsx` (barrel export). Home keeps existing `ServicesList` → `ServicesListCards`. `/hizmetler` renders `ServicesListDetailed` instead of `ServicesList`.

**Rationale**: Matches the spec’s named “detailed” presentation, avoids prop-drilling variants through every consumer, and keeps the `/hizmetler` page diff trivial (`ServicesList` → `ServicesListDetailed`).

**Alternatives considered**: Single `ServicesList` with `variant="compact" | "detailed"` — fewer files but mixes two layouts in one module and complicates testing; rejected for clarity.

## 2. Service content source of truth

**Decision**: Introduce a shared module (e.g. `lib/content/services.ts` or `components/feature/services-data.ts`) exporting a typed array: `icon`, `title`, `shortDescription` (compact card), `detailedDescription` (longer paragraph), `highlights: string[]` (bullet items). `ServicesListCards` and `ServicesListDetailed` both map over this structure.

**Rationale**: Prevents home and services page from drifting; satisfies “each detailed card has narrative + bullet list.”

**Alternatives considered**: Duplicate arrays in two files — rejected (DRY, error-prone).

## 3. Removing `/calisma-alanlari`

**Decision**: Delete `app/(main)/calisma-alanlari/page.tsx`. Remove `ROUTES.areasOfWork` from `lib/routes.ts`. Remove the “Çalışma Alanları” item from header and footer `SITE_LINKS` / nav arrays. Rely on Next.js `notFound` for the path (no redirect in this release).

**Rationale**: Spec requires the path to no longer serve the old page; constitution forbids hardcoded paths outside `ROUTES`.

**Alternatives considered**: Redirect to `/` — spec assumption says redirect not required; can be a follow-up.

## 4. AreasOfWork on home

**Decision**: In `home-template.tsx`, comment out the `AreasOfWork` import and JSX usage. Add a short comment: unused on home for now per spec 016; component file remains for potential reuse.

**Rationale**: Matches “do not delete the file” and “not shown on home.”

## 5. Terminology: “terapi” → “danışmanlık”

**Decision**: Update **user-visible** Turkish strings (UI labels, paragraphs, `metadata.description` where it is public copy). Do **not** change: URL path strings (`/cift-terapisi`, `/bilissel-davranisci-terapi`), `slug` constants, file names, or `ROUTES` keys/values that encode URLs. For **standard clinical modality names** where “Terapi” is part of a fixed professional term (e.g. “Bilişsel Davranışçı Terapi” as a modality title), prefer natural Turkish: either keep the established modality name where it is industry-standard, or rephrase to “Bilişsel Davranışçı Yaklaşım / BDT” if stakeholders want zero “terapi” — default implementation: replace **generic marketing** uses first; run a focused copy pass on `components/feature/*` and public `app/**` metadata.

**Rationale**: Spec FR-006 targets wording about the **type of support**, not routing infrastructure; awkward or incorrect replacements harm credibility.

**Alternatives considered**: Blind global replace in repo — would break URL slugs and identifiers; rejected.

## 6. Footer disclaimer

**Decision**: Append the exact sentence as a distinct block in `footer.tsx` (e.g. above or below the copyright row), using semantic `<p>`, readable `text-sm` / `text-muted-foreground`, so it appears on every layout that uses `Footer`.

**Rationale**: FR-005 requires verbatim legal copy on every footer-equipped page.

**Alternatives considered**: Only on home — violates FR-005.
