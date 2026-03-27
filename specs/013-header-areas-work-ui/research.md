# Research: Header layout, nav color tokens, unique areas imagery

**Feature**: `013-header-areas-work-ui`  
**Date**: 2026-03-27

## R-1: Desktop header layout (centered nav, logo left, actions right)

**Decision**: Use a **single-row CSS grid** on the header inner container, e.g. three columns: **`1fr auto 1fr`** (or `minmax(0,1fr) auto minmax(0,1fr)`). Place **site title link** in column 1 (`justify-self: start`), **`<nav>`** with desktop links in column 2 (`justify-self: center`), and **share + mobile sheet trigger** in column 3 (`justify-self: end`). Keep **`max-w-7xl`** and horizontal padding on this grid wrapper.

**Rationale**: Flexbox with `justify-between` pins nav to the trailing cluster; true **horizontal centering** of the link group relative to the full header width requires either this grid or an absolutely positioned nav. Grid avoids overlap issues from absolute positioning when the title is long, as long as column 1 content does not grow into column 2 (use `min-w-0` / truncation on the title if needed).

**Alternatives considered**:

- **`absolute left-1/2 -translate-x-1/2` on nav** — Works but needs careful z-index and min-height; more fragile when logo or actions width changes asymmetrically.
- **Duplicate nav row** — Rejected: harms accessibility and maintenance.

## R-2: Taller header and larger nav type

**Decision**: Increase inner bar height from **`h-16` (4rem)** to **`h-20` or `h-22`** (5rem / 5.5rem) per visual “clearly taller” spec. Bump desktop nav links from **`text-sm`** to **`text-base`** (and optionally **`font-medium`** retained). Apply the same token-based text color to **sheet menu links** on small screens for consistency, with existing `Sheet` layout unchanged.

**Rationale**: Quantitative step-up on the default Tailwind type scale satisfies FR-003; height change is obvious in side-by-side review (SC-001).

**Alternatives considered**:

- **Global `text-base` on all header text including logo** — Optional; if logo uses `text-xl`, keep hierarchy by only stepping nav + optional subtitle (none today).

## R-3: Dark green header text via design tokens

**Decision**: Define a semantic token in **`app/globals.css`** under `:root`, e.g. **`--header-nav-foreground`**, as **oklch** with **hue ~150–165** (green-teal) and chroma/lightness chosen so **contrast on `background/90` header** meets **WCAG AA** for normal text (~4.5:1). Map it in **`@theme inline`** as **`--color-header-nav-foreground`** so Tailwind exposes **`text-header-nav-foreground`** (or a shorter alias if preferred).

Use this utility on **desktop nav links**, **mobile sheet links**, and optionally **icon buttons** (Share, Menu) for a cohesive bar; **site title** may use the same token or stay **`text-primary`** per stakeholder preference — default: **nav + actions labels use header token**, title unchanged for hierarchy.

**Rationale**: Constitution requires tokens in theme, not raw hex in components. Existing `--foreground` is near-black greenish; spec asks for **explicit dark green** for header copy — a dedicated token makes the requirement auditable and theme-safe.

**Alternatives considered**:

- **`text-primary` for nav** — Already teal/slate; user asked for dark green specifically; may be close but a dedicated token avoids coupling nav to CTA primary semantics.
- **Arbitrary value in className** — Rejected: violates styling conventions.

## R-4: Unique stock photo for Areas of Work

**Decision**: **Add a new file** under `public/images/` (e.g. **`areas-of-work-bg.jpg`**) — calm, professional, therapy-adjacent **stock** imagery, **rights-cleared**. Update **`AREAS_BACKGROUND_SRC`** in **`areas-of-work.tsx`** to this path only. **Do not** use `hero-therapy-calm.jpg` or `kenan_kubuc_stok.jpg` for this section: the latter is **already used in `about.tsx`**, violating FR-005 / spec uniqueness if retained for areas.

**Rationale**: Site-wide grep shows **`kenan_kubuc_stok.jpg`** in **About** and **Areas**; spec requires areas asset **not used elsewhere**. A new asset is the minimal fix.

**Alternatives considered**:

- **Swap About to a different image and keep areas on kenan_kubuc_stok** — Larger blast radius than spec requires (spec only mandates areas uniqueness).
- **Use hero image for areas** — Rejected: hero already consumes `hero-therapy-calm.jpg`; duplicate use would violate distinctiveness intent.

## R-5: Calm UI polish (therapeutic aesthetics)

**Decision**: Prefer **softer hover** on nav links (`hover:bg-muted/80`, optional **`hover:brightness-95`** on filled controls if any), maintain **`rounded-lg`**, preserve **`focus-visible:ring-2`** on links and buttons. Optionally increase **header `shadow-sm`** slightly or border softness — keep changes subtle. **Areas of work**: keep **`RevealSection`**; optionally tune **overlay** opacity if the new photo is busier, without removing the gradient pattern from 012.

**Rationale**: Aligns with calm/trust brief without new Framer Motion scope.

**Alternatives considered**:

- **Backdrop blur increase on header** — Already `backdrop-blur-md`; avoid heavier blur for performance on low-end devices.
