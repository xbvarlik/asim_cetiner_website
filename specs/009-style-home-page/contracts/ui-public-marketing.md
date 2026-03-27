# UI Contract: Public Marketing Surfaces

**Feature**: 009-style-home-page  
**Consumers**: Human visitors on `(main)` and `(home-variations)` route groups.  
**Producers**: Next.js App Router pages and `components/feature/*` compositions.

## Behavioral contract

### C1 — Reduced motion

- **When** the user agent reports `prefers-reduced-motion: reduce`, **then** no marketing content may **require** animation to become visible or readable.
- **Verification**: Enable reduced motion in OS settings; scroll entire home + one inner page; all text and CTAs usable without waiting for motion.

### C2 — Focus visibility

- **When** keyboard focus moves to any interactive control in scope, **then** a visible focus ring or outline consistent with design tokens appears.
- **Verification**: Tab through header, hero CTAs, footer links, and at least one card link on home.

### C3 — Scroll reveal (eligible sections)

- **When** a major section enters the viewport for the first time and reduced motion is **not** preferred, **then** the section’s primary container completes a smooth entrance (opacity and/or translate) within **~0.5–0.9s** without blocking interaction of already-visible content.
- **Verification**: Desktop + mobile scroll; no “pop” without transition; motion does not repeat annoyingly on small scroll jitter (`once: true`).

### C4 — Hover feedback (pointer devices)

- **When** a pointer hovers an eligible card/tile, **then** a subtle visual change (shadow, translate, or scale ≤ ~2%) occurs; content remains readable.
- **Verification**: Visual + no layout shift that hides primary text.

### C5 — Home hero layout (LTR)

- **When** the home hero is rendered in Turkish (LTR) `lang="tr"`, **then** headline block and primary CTAs are **start-aligned** (left), not centered as the only layout mode.
- **Verification**: Visual check at `sm` and `lg` breakpoints.

### C6 — Cross-page coherence

- **When** navigating from `/` to any `(main)` marketing page, **then** header, footer, typography, and motion vocabulary remain consistent (no alternate theme).
- **Verification**: Spot-check `/`, `/hizmetler`, `/iletisim` (and one `SEO_LANDING_PATHS` entry if timeboxed).

## Non-contract (out of scope)

- Admin `(admin)` routes, login, dashboards.
- API response shapes, Prisma models, Server Actions payloads.
