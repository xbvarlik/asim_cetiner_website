# UI Contract: Services list

**Feature**: `011-services-list-entrance` | **Date**: 2026-03-27  
**Spec**: [spec.md](../spec.md)

## Scope

Visitor-visible behavior of the **Hizmetlerimiz** (services) block on the public site. Implementation may live in `components/feature/services-list.tsx` and a client leaf module; this contract is **behavioral**, not file-specific.

## Entrance

1. When the services **grid** enters the viewport (approximately **15–25%** visible, once per page load), each **service card** plays an **upward** entrance (from below final position to rest).
2. Cards animate in **array order** (visual top-to-bottom / grid order).
3. With **`prefers-reduced-motion: reduce`**, **no** entrance animation runs; cards appear in final layout immediately.

## Hover and focus

1. **Hover**: Pointer over a card shows the **same** emphasis as before this feature: subtle **lift**, **scale**, and **shadow** (no replacement with a different hover “character”).
2. **Keyboard**: Focusable elements inside a card show a **visible** focus ring (existing `focus-within` pattern preserved or equivalent).

## Layout and readability

1. After animations complete, **no** overlapping text, **no** clipped content, and **no** persistent offset that breaks alignment with the grid.
2. Heading, description, and cards maintain **readable** contrast for default theme (light/dark as configured).

## Performance expectations (observable)

1. For the current service count, all entrance animations **complete within about four seconds** of the section being substantially visible on a typical desktop connection, without user interaction.

## Non-goals

- Adding/removing services or changing Turkish copy.
- New backend or CMS fields.
- Changing routes or CTAs outside this block.
