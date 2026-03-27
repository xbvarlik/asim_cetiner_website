# Research: Services list entrance and calm presentation

**Feature**: `011-services-list-entrance` | **Date**: 2026-03-27

## R-1: Viewport trigger and section vs. item motion

**Decision**: Remove the **whole-section** `RevealSection` wrapper around the entire services block (or restrict it to heading copy only). Drive **per-card** entrance with Framer **`whileInView`** on each item (or a parent `staggerChildren` container), `viewport={{ once: true, amount: ~0.15–0.25 }}`, so cards animate **as the grid enters view**, in **list order** (spec FR-002).

**Rationale**: Current `RevealSection` moves the entire section as one unit; spec requires each service to read as entering **from below** in sequence. Section-level + item-level vertical motion stacks and feels redundant or muddy.

**Alternatives considered**:

- **Keep `RevealSection` and add inner stagger** — rejected; double vertical motion fights clarity and timing.
- **CSS-only `@keyframes`** — possible but inconsistent with existing Framer usage and weaker story for staggered `delay` + `useReducedMotion` in one place.

## R-2: Preserving hover without transform conflicts

**Decision**: Use a **two-layer node** per card: an outer **`motion.div`** handles **only** entrance (`opacity`, `translateY` from positive offset to 0). Inner **`div`** keeps the existing **`group`** classes and hover/`focus-within` styles (`hover:-translate-y-1`, `hover:scale-[1.02]`, `hover:shadow-lg`, ring utilities) **unchanged** (spec FR-003).

**Rationale**: Framer applies `transform` on the animated element; sharing one node with Tailwind hover transforms often causes **overrides** or jank. Separating entrance (outer) from interaction (inner) matches spec “do not change” hover.

**Alternatives considered**:

- **Single `motion.div` + `whileHover`** — would **replace** Tailwind hover semantics; rejected vs. spec.
- **Animate only `opacity`** for entrance — rejected; spec explicitly asks bottom-to-up **directional** cue (SC-001).

## R-3: Stagger and duration budget

**Decision**: Stagger with **`transition.delay = index * 0.06–0.09s`**, per-item duration **~0.5–0.65s**, ease similar to existing reveal (`ease` cubic or `[0.22, 1, 0.36, 1]`). Target **all items done ≤ ~4s** after section is substantially visible for the current six-card grid (spec SC-002); if the list grows, cap delay ramp or reduce per-step delay.

**Rationale**: Therapeutic UI skill prefers **smooth (≥0.5s)** motion, not snappy; bounded total time avoids a “slow” section (spec edge cases).

**Alternatives considered**:

- **Long stagger (0.15s × n)** — risks exceeding 4s for many items.
- **No stagger** — fails scan-friendly sequence emphasis (FR-002).

## R-4: Reduced motion

**Decision**: In the client leaf, call **`useReducedMotion()`** from Framer Motion. When `true`, render **static** wrappers (no entrance animation): cards visible in final layout immediately, same as `RevealSection` fallback (spec FR-005, SC-004).

**Rationale**: One pattern across the site; no forced motion for a11y.

**Alternatives considered**:

- **`motion-safe:` only** — insufficient for programmatic stagger off without duplicating structure.

## R-5: Client boundary placement

**Decision**: Add **`services-list-cards.tsx`** (or equivalent) as **`'use client'`** containing the **`SERVICES` constant**, icon imports, and **`map`** + motion wrappers. Parent **`services-list.tsx`** remains an **RSC** that renders section chrome (heading, container) and imports the client grid.

**Rationale**: Satisfies constitution **leaf** client boundary; avoids marking the entire feature file client unless necessary. Co-locating data with the client grid avoids passing non-serializable icon references from RSC.

**Alternatives considered**:

- **Entire `services-list.tsx` as client** — valid but widens the client bundle boundary more than needed.
- **Icon string map in shared data file** — more indirection; defer unless reuse demands it.

## R-6: Calm presentation tweaks (FR-004)

**Decision**: Within the same change set, apply **token-based** adjustments only: e.g. slightly increase **vertical rhythm** between header and grid (`mt-*` on grid), ensure **`leading-relaxed`** / comfortable line height on descriptions, optional **soft card** treatment using existing `card` / `border` / `muted` tokens—**no** new raw hex colors.

**Rationale**: Aligns with therapeutic UI skill and constitution tokens.

**Alternatives considered**:

- **Large visual redesign** — out of scope; spec bounds work to entrance + preserve hover + readable hierarchy.
