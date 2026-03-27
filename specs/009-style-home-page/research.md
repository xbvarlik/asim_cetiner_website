# Research: Public Marketing Visual & Motion Refresh (009)

## 1. Scroll-triggered section appearance

**Decision**: Use **Framer Motion** (`framer-motion`) with `whileInView`, conservative duration (≥0.5s for major entrances), and `viewport={{ once: true, amount: 0.15–0.25 }}` defaults, wrapped in small **client** leaf components.

**Rationale**:

- Spec requires smooth, scroll-linked reveals across many sections on multiple routes; CSS-only approaches (e.g. single `tw-animate` classes) do not scale cleanly to per-section stagger and viewport thresholds without duplicating boilerplate or relying on immature `@scroll-timeline` support.
- Framer Motion supports **`useReducedMotion`** so `prefers-reduced-motion` maps to immediate visibility (matches **FR-004** / **SC-004**).

**Alternatives considered**:

- **Pure CSS + `IntersectionObserver` custom hook** — Fewer dependencies; more bespoke code and risk of inconsistent timing across pages.
- **Tailwind `tw-animate-css` only** — Good for hover/enter on mount; weak for “first time section enters viewport” without extra markup per section.
- **View Transitions API** — Interesting for page navigations; not a substitute for in-page scroll reveals; uneven support for this use case.

## 2. Card / tile hover “alive” feedback

**Decision**: Combine **Tailwind** transitions on interactive surfaces (`transition-transform`, `duration-300`, `hover:shadow-md`, `hover:-translate-y-0.5` or slight `scale-[1.02]`) with optional **Framer Motion** `whileHover` only where a client wrapper already exists—avoid nesting heavy motion on every static card if CSS suffices.

**Rationale**: Keeps most surfaces as server components; only wraps cards that need coordinated motion or shared behavior.

**Alternatives considered**: Framer on every card (unnecessary client boundary proliferation).

## 3. Hero background imagery

**Decision**: Add a **licensed** static asset under `public/` (e.g. `public/images/hero-therapy-space.jpg`) and render with **`next/image`** using `fill`, `priority`, `sizes` appropriate to full-width hero, plus a **gradient/scrim overlay** (token-driven `bg` utilities) for text contrast. Provide **`onError` fallback** or layered CSS background so slow/failed loads still show calm solid/gradient (**spec** slow-connection edge case).

**Rationale**: Next.js image pipeline handles optimization; overlay satisfies contrast without ambiguous “stock URL at runtime.”

**Alternatives considered**: Remote URL only — harder to guarantee license, LCP, and offline/storybook parity.

## 4. Typography (smooth, non-blunt)

**Decision**: Keep **Geist Sans** (already in root layout) for body; add a **second `next/font/google`** for headings (e.g. **Fraunces**, **Source Serif 4**, or **Lora**) exposed as `--font-heading` in `@theme` / `globals.css`, applied to `h1–h3` via `@layer base` or component-level `font-heading` utility. Tune `leading-relaxed` / `tracking-tight` per level.

**Rationale**: Spec asks for refined pairing without Times-like bluntness; `next/font` keeps constitution-friendly token usage (no ad-hoc `@font-face` files).

**Alternatives considered**: System serif stack — inconsistent across OS; weaker brand control.

## 5. Scope: route groups to touch

**Decision**: Treat **`app/(main)/**`** and **`app/(home-variations)/**`** as public marketing surfaces sharing `SiteShell`. **Exclude** `app/(admin)/**` per spec **Out of scope**.

**Rationale**: Matches clarified **Option C** and existing `ROUTES` / `SEO_LANDING_PATHS` layout.

## 6. Third-party dependency vs constitution

**Decision**: Add **`framer-motion`** as a direct dependency with rationale documented here and in **plan.md** **Complexity Tracking**.

**Rationale**: Constitution permits libraries outside the default stack when justified; motion semantics and reduced-motion handling are the driver.

---

All items above resolve prior **NEEDS CLARIFICATION** placeholders for motion library, hero media strategy, and typography approach.
