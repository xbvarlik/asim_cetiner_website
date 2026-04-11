# Research: 021-horizontal-process-flow

## 1. Desktop layout: equal columns + connector through nodes

**Decision**: Use a CSS **grid** with one row of columns (`grid-cols-[n]` matching `HOW_IT_WORKS_STEPS.length`, or a fixed template for 4–5 steps) so each step column has equal width; place the dashed connector as a **single horizontal element** behind the node row (e.g. absolutely positioned `div` with `top` aligned to node centers, `border-t` dashed, full width of the track).

**Rationale**: Grid gives even distribution (FR-006 / SC-003) without manual percentage math; one connector line avoids per-segment alignment bugs.

**Alternatives considered**:

- Flex + `justify-between` — works but spacing is edge-to-edge; padding on container must be tuned so end nodes don’t clip; grid columns are more uniform for centered text blocks.
- Per-step SVG lines between nodes — more DOM, harder to keep responsive; rejected for maintenance.

## 2. Node styling (dark fill, white border, centered number)

**Decision**: Implement nodes as circular elements (`rounded-full`, fixed `size`, flex center) using **design tokens** from the existing theme: e.g. `bg-primary` (or `bg-foreground`) with `text-primary-foreground` (or `text-background`) for the numeral, and `ring-2 ring-background` or `border-2 border-background` for the light edge—exact classes chosen to meet contrast (WCAG) against the section `bg-background`.

**Rationale**: Constitution requires tokens via Tailwind theme (`app/globals.css` `@theme`), not ad-hoc hex.

**Alternatives considered**:

- Raw `#000` / `#fff` — violates token rule; rejected.

## 3. Semantic structure and assistive tech (SC-004)

**Decision**: Keep an **ordered list** (`<ol>`) with one `<li>` per step. Each `<li>` contains: (1) the visible numbered node (decorative duplicate of list order) marked `aria-hidden` **if** the number is redundant with list semantics, **or** expose the step number only via list order and style the marker visually—prefer **visually hidden list markers** + visible circle showing the same number with `aria-hidden` on the circle text to avoid “1, 1” duplication in screen readers. Document chosen pattern in implementation: single spoken index via `<ol>` + `list-none` + decorative numeric badge `aria-hidden`.

**Rationale**: Spec requires reading order to match visual sequence; native `<ol>` gives correct sequence in AT.

**Alternatives considered**:

- `<div>` soup with manual `aria-posinset` — more error-prone; rejected.

## 4. Narrow viewports (FR-009)

**Decision**: From **mobile-first** base, use **`md` or `lg` breakpoint** (align with where the current site treats “desktop” multi-column layouts): below breakpoint, wrap the step row in `overflow-x-auto` with `snap-x snap-mandatory`, a `min-w` on the inner track so all five steps remain in one horizontal path, and `pb` for scrollbar; optional `aria-label` on the scroll region describing “Yatay kaydırarak tüm adımları görüntüleyin” or rely on visible overflow. Above breakpoint, no scroll—full width grid.

**Rationale**: Matches spec option “horizontal scroll that keeps the path metaphor”; testimonials use motion/width patterns but not the same scroll—still consistent with project use of `overflow-x-auto` elsewhere.

**Alternatives considered**:

- Vertical stack with vertical dashed line — valid per spec but larger visual change; defer unless scroll usability fails in QA.

## 5. Motion

**Decision**: Keep **`RevealSection`** wrapper only (existing pattern); **no new** Framer Motion scope for step nodes unless a follow-up explicitly requests it. Respect `prefers-reduced-motion` via existing motion primitives.

**Rationale**: Spec assumptions state motion is optional; constitution prefers minimal `'use client'` surface.

## 6. Files to touch

**Decision**: Primary change in `components/feature/how-it-works.tsx`; **no change** to `lib/content/how-it-works.ts` unless types need extension (not required). `home-template.tsx` order unchanged (020 contract).

**Alternatives considered**:

- New subcomponent file — optional if `how-it-works.tsx` exceeds readability; prefer single file until complexity grows.
