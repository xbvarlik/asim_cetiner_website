# Research: About Section Subtle Motion & Portrait

**Feature**: `010-about-motion-portrait` | **Date**: 2026-03-27

## R-1: Portrait asset

**Decision**: Use Next.js static path **`/images/kenan_kubuc_stok.jpg`** (file in `public/images/`) as the sole primary image for the About section.

**Rationale**: Matches product request and spec FR-001; `next/image` continues to optimize delivery; path is stable for marketing.

**Alternatives considered**:

- Keep `/images/therapist.jpg` — rejected; spec requires the approved stock portrait.
- Remote URL / CMS — rejected; assumptions exclude new CMS fields for this slice.

## R-2: Motion implementation strategy

**Decision**: Prefer **Framer Motion** on a **leaf** client component for any **additional** motion beyond the existing `RevealSection` (e.g., subtle scale/shadow on hover, optional very slow vertical drift while in view), using **`useReducedMotion()`** to disable looping or strong effects when the user prefers reduced motion.

**Rationale**: Framer Motion is already a project dependency and used in `RevealSection`; consistent API, built-in `useReducedMotion`, and transform/opacity-friendly animations align with performance goals.

**Alternatives considered**:

- **CSS `@keyframes` + Tailwind** — viable for a single hover/float; less consistent with existing motion code and slightly harder to centralize reduced-motion branching in one place (would rely on `motion-safe:` / media queries).
- **Heavier choreography** (staggered text lines) — rejected; spec asks not to overdo motion or distract from copy.

## R-3: Interaction and accessibility

**Decision**: Preserve keyboard tab order and **focus-visible** rings on any focusable controls in the section; ensure animated wrappers do not trap focus or reduce contrast. For reduced motion, provide **static** portrait presentation (no continuous loop, no strong hover scale).

**Rationale**: Satisfies spec FR-004, FR-005 and SC-003; matches existing `RevealSection` pattern (plain `div` when `useReducedMotion()` is true).

**Alternatives considered**:

- Ignoring reduced motion for “small” animations — rejected; violates spec and project UX bar.

## R-4: Visual language (therapeutic UI)

**Decision**: Apply **soft containment** (generous radius, muted surface behind image if needed), **8px-grid spacing**, and **calm** motion timing (≥ ~0.5s eases, no snappy bounces) per internal therapeutic UI guidance; rely on existing Tailwind theme tokens (`background`, `muted`, `foreground`, etc.) rather than raw colors.

**Rationale**: Aligns with spec FR-003 without introducing new global design tokens unless a gap is found during implementation.

**Alternatives considered**:

- Strong brand accent on the portrait frame — deferred to avoid competing with primary CTAs elsewhere on the page.

## R-5: Layout and image loading

**Decision**: Keep a **fixed aspect container** (current pattern `aspect-[4/5]` + `fill` image) to limit CLS; retain meaningful `alt` text for the therapist portrait.

**Rationale**: Addresses edge cases in spec (slow load, small viewports) while minimizing implementation risk.

**Alternatives considered**:

- Intrinsic ratio without wrapper — risks layout shift on slow networks.
