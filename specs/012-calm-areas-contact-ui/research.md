# Research: Calm areas background and modern contact inputs

**Feature**: `012-calm-areas-contact-ui`  
**Date**: 2026-03-27

## R-1: Background image and layout

**Decision**: Implement the areas-of-work section as a **relative** `<section>` with a **full-bleed background layer** using Next.js **`Image`** (`fill`, `object-cover`), **`priority={false}`**, and explicit **`sizes`** for the section width. Place a **semi-opaque gradient or solid token overlay** (`bg-background/…` or gradient from `background` to transparent) between image and content so heading + tag chips meet contrast expectations (FR-003). Keep tag chips with **solid or near-solid** backgrounds (`bg-background` / `bg-card`) if the photo remains busy after overlay.

**Rationale**: `next/image` gives optimization, avoids ad-hoc CSS `url()` for large assets, and fits the existing hero pattern. Overlay is the standard fix for readable text on photography without replacing stock with flat color only (FR-001).

**Alternatives considered**:

- **CSS `background-image` only** — Rejected for primary path: weaker optimization story vs `next/image` already used in hero.
- **Heavier backdrop-blur** — Rejected as default: can be costly on low-end devices; light blur optional only if performance acceptable in manual check.

## R-2: Distinct asset from hero

**Decision**: Use **`/images/kenan_kubuc_stok.jpg`** as the default areas background **unless** stakeholder prefers a new file. It is **not** `hero-therapy-calm.jpg`, satisfying FR-002. If both images feel too similar in mood, add a **second** calm abstract/nature stock under `public/images/` (e.g. `areas-of-work-bg.jpg`) and reference that in code.

**Rationale**: Asset already in repo; reduces delivery friction. Hero remains unchanged.

**Alternatives considered**:

- **New purchase-only asset** — Deferred; spec allows existing assets first.
- **Same library image with different crop via URL params** — Not applicable to static files; duplicate file or distinct image is clearer.

## R-3: Contact form field height

**Decision**: Apply **`className` overrides** on `Input`, `Textarea`, and `SelectTrigger` **only inside** `components/feature/contact-form.tsx`. Target **minimum control height ~44px** (`h-11` in Tailwind’s default scale) and slightly increased padding (`px-3`, `py-2` or equivalent) for a modern proportion. Bump **textarea** `min-height` proportionally (e.g. `min-h-20` or higher) so the message field feels balanced with inputs.

**Rationale**: Global `Input` is currently `h-8` (32px); spec SC-003 expects ≥20% increase or ~44px touch target. Scoping to the contact form avoids regressions on admin and other dense UIs (FR-005 scope).

**Alternatives considered**:

- **New `size="lg"` on `Input` primitive** — Rejected for this feature to minimize surface area; can be a follow-up if multiple forms need the same scale.
- **Change `components/ui/input.tsx` globally** — Rejected: violates minimal blast radius for a marketing-only requirement.

## R-4: Accessibility and reduced motion

**Decision**: No new animation on the areas background. Ensure **focus-visible** rings on form controls remain visible after class changes (do not shrink ring or contrast). If `forced-colors` / high-contrast issues appear in QA, prefer stronger borders on chips/inputs using token utilities.

**Rationale**: Spec edge cases call out contrast and focus; background is decorative.

**Alternatives considered**: Parallax or zoom-on-scroll — Rejected (out of scope, conflicts with calm brief).
