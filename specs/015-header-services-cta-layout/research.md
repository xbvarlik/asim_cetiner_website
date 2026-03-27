# Research: 015-header-services-cta-layout

## 1. Desktop navigation “middle band” (FR-002)

**Decision**: Use a **three-column grid** `grid-cols-[auto_1fr_auto]` (or equivalent flex pattern) with the logo in the first column, primary `<nav>` in the second column with `flex justify-center`, and share + mobile sheet trigger in the third column.

**Rationale**: The previous layout used `minmax(0,1fr) auto minmax(0,1fr)`, which centers the nav in the **full** header width (equal side tracks), not necessarily in the band between the brand and the right-side actions. `auto` + `1fr` + `auto` makes the middle track exactly the space between intrinsic left and right columns, matching the clarification (Option B).

**Alternatives considered**:

- Absolute positioning for nav — works but complicates stacking and focus order; grid is simpler.
- Flex with `flex-1` on a spacer — possible; grid is explicit for three zones.

## 2. Visible “Menü” title in sheet (FR-005)

**Decision**: Remove the visible **Menü** heading. Keep an accessible name for the dialog/sheet using **`sr-only`** on `SheetTitle` (e.g. “Mobil navigasyon” or “Site menüsü”) so assistive technology still gets a title without showing generic “Menu” copy.

**Rationale**: Spec forbids a heading whose sole role is the word “Menu”; a screen-reader-only title satisfies accessibility patterns for modal/sheet surfaces without violating the visible UI requirement.

**Alternatives considered**:

- Omit `SheetTitle` entirely — may fail accessibility checks depending on `@base-ui/react` dialog requirements; prefer sr-only title if the primitive expects a title node.

## 3. Mobile sheet link layout (FR-003, FR-004)

**Decision**: Nav column uses `items-stretch`, links are `text-center`, block-level with **vertical padding** (`py-4` or similar) and optional `min-h` touch-friendly height; widen sheet if needed (`w-full` / `max-w-*`) for a fuller mobile menu feel.

**Rationale**: Centered text plus explicit padding meets “expanded vertical area” without relying on vague line-height alone.

**Alternatives considered**:

- Full-screen sheet (`side` / width classes) — optional enhancement if the narrow `w-72` feels cramped; can be decided during implementation.

## 4. Equal-height service cards (FR-006)

**Decision**: Parent grid uses default **stretch** alignment; each direct child (`motion.div` / wrapper) has `h-full`. Inner card becomes **`flex flex-col h-full`** with description area `flex-1` (and optional `min-h-0` if overflow is needed later).

**Rationale**: Standard CSS grid + flex column pattern; works with Framer Motion wrappers already using `h-full`.

**Alternatives considered**:

- Fixed `min-h` on cards — brittle across content changes; stretch + flex-1 adapts to tallest in row.

## 5. CTA: remove accessibility chrome + desktop visibility (FR-007, FR-008)

**Decision**: Remove the **Accessibility** icon `span` inside the phone anchor (decorative “button-like” chrome). Drop `md:hidden` on the bar container; use a **responsive flex layout** (e.g. centered group on `md+`, side-by-side on small screens). Add **`padding-bottom`** on `<main>` in `SiteShell` for `md:` and up so fixed bottom content does not cover the footer or last sections.

**Rationale**: Spec requires one clear phone action without redundant control; desktop visibility requires the same persistent CTA without hiding primary conversion paths.

**Alternatives considered**:

- Duplicate CTA in header on desktop only — rejected; spec asks for the CTA **area** on desktop, not a different widget.
