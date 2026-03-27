# Research: Mobile bottom contact bar

## R1 — Server vs client component

**Decision**: Implement the bar as a **React Server Component** (no `'use client'`) unless a follow-up requires dismissible state or client-only APIs.

**Rationale**: Visibility is expressible with responsive utilities (`md:hidden`). Actions are plain `<a href="tel:…">` and `<a href="https://wa.me/…">` with `target`/`rel` for external links. Pointer pass-through uses `pointer-events-none` on the wrapper and `pointer-events-auto` on links—no hooks required. Matches constitution **server-first** guidance.

**Alternatives considered**: Client wrapper for `useMediaQuery` — redundant if breakpoints match Tailwind. Client-only icon components — unnecessary; Lucide and inline SVG work from RSC.

## R2 — WhatsApp pictogram

**Decision**: Reuse the **inline SVG path** already used in `components/feature/footer.tsx` for WhatsApp, extracted to a tiny shared presentational subcomponent (e.g. `WhatsappGlyph` in `components/feature/` or next to the bar) to avoid duplicating the path string.

**Rationale**: Lucide does not ship an official WhatsApp brand mark; the footer already ships a correct glyph. No new dependency.

**Alternatives considered**: `react-icons` / Font Awesome — adds a dependency; constitution discourages without justification. Generic `MessageCircle` — weaker brand recognition than the spec’s “recognizable WhatsApp pictogram.”

## R3 — Phone and accessibility pictograms

**Decision**: Use **lucide-react** `Phone` for the telephone icon and **`Accessibility`** for the small circular emblem inside the phone pill (wrapped in a rounded-full container with appropriate size contrast).

**Rationale**: Already a core dependency; matches spec wording (“accessibility icon”). Keeps icon set consistent with `Footer` and `Header`.

**Alternatives considered**: Unicode symbol only — poor cross-font consistency. Custom SVG — unnecessary when Lucide fits.

## R4 — Brand colors vs design tokens

**Decision**: Register **#25D366** (WhatsApp CTA) and **#007AFF** (phone CTA) as named theme colors in **`app/globals.css`** inside `@theme inline` (e.g. `--color-cta-whatsapp` and `--color-cta-phone`), then use Tailwind utilities such as `bg-cta-whatsapp` / `bg-cta-phone`.

**Rationale**: Constitution requires design tokens rather than scattered arbitrary hex in JSX. This repo uses **Tailwind CSS v4** with `@theme inline` (no `tailwind.config.ts`); extending the theme in `globals.css` is the local source of truth.

**Alternatives considered**: Arbitrary values `bg-[#25D366]` in components — fails constitution token rule. Creating `tailwind.config.ts` — would fight the v4 setup already in use.

## R5 — Single source for phone and WhatsApp URLs

**Decision**: Add **`lib/site-contact.ts`** exporting display string, `tel:` href, and WhatsApp `https://wa.me/…` href (or E.164 segment) derived from one E.164-style constant. **Refactor `Footer`** to consume these exports so the bar and footer never diverge.

**Rationale**: Satisfies spec FR-007 and spec assumptions; reduces duplicate magic numbers/URLs.

**Alternatives considered**: Props drilled from layout — more boilerplate for a site-wide constant. Env vars — optional later; not required for static marketing contacts today.

## R6 — Viewport scope and stacking

**Decision**: Show the bar only below the **`md`** breakpoint (`md:hidden` on the wrapper), consistent with mobile-first patterns elsewhere. Use **`z-50`** on the fixed container per product request; document that sticky header also uses `z-50`—DOM order after main/footer keeps the bar usable; if modals clip it, raise z-index in a follow-up.

**Rationale**: Matches spec FR-001/FR-008 (“mobile”) using an existing project convention. Spec explicitly called for high stacking; `z-50` matches header tier.

**Alternatives considered**: `max-sm:` only — narrower than typical “mobile” tablet portrait; `md` cutoff is a reasonable default.

## R7 — Placement in app shell

**Decision**: Render the bar inside **`SiteShell`** (e.g. after `<Footer />`) so it appears on all marketing layouts that use `SiteShell` and **not** on admin routes (different layout tree).

**Rationale**: One insertion point; admin panel remains unaffected.

**Alternatives considered**: Root `layout.tsx` — would require conditional logic to hide on `/admin`. Per-page inclusion — easy to miss routes.
