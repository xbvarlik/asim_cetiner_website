# UI Contract: Header & Areas of Work (013)

**Feature**: `013-header-areas-work-ui`  
**Audience**: Implementers and QA  
**Date**: 2026-03-27

## Site header

1. **Height**: The header content row MUST be visibly taller than the pre-change baseline (`h-16`); target `h-20`–`h-22` class range or equivalent.
2. **Desktop navigation position**: At `lg` and above, the primary navigation link group MUST be **horizontally centered** within the header’s max-width content area (not grouped with trailing actions on the right edge).
3. **Branding position**: The site title / home link remains at the **leading** edge of the header row; share and mobile menu controls remain at the **trailing** edge.
4. **Typography**: Desktop nav link text MUST be larger than pre-change `text-sm` (minimum step: `text-base`).
5. **Color**: Default nav link text MUST read as **dark green** (not neutral black), implemented via a **theme token** (no raw hex in component class strings).
6. **Focus**: All interactive header controls (links, share, menu trigger) MUST retain a visible **`focus-visible`** ring after changes.
7. **Mobile**: Below `lg`, navigation MAY remain in the **Sheet** drawer; sheet link styling SHOULD match the header’s dark-green nav token for consistency.

## Areas of work section

1. **Unique image**: The background image path used in `AreasOfWork` MUST NOT equal any image path used in **About**, **Hero**, or other sections (site-wide unique asset for this section’s background).
2. **Implementation**: Continue using **`next/image`** with `fill`, appropriate `sizes`, and `priority={false}` unless a performance review says otherwise.
3. **Readability**: Section title, subtitle, and tag chips MUST remain readable; adjust overlay opacity if the new photo increases visual noise.
4. **Alt text**: Decorative background MAY use `alt=""` if foreground text provides the section name; do not remove heading structure.

## Non-goals

- Changing route definitions, footer, or admin chrome.
- New animations beyond existing `RevealSection` behavior.
- Global changes to `components/ui/button` or `Link` primitives outside header/areas feature files and theme tokens.
