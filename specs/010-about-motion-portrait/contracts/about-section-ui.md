# UI Contract: About Section (Public)

**Feature**: `010-about-motion-portrait` | **Version**: 1.0 | **Date**: 2026-03-27

## Scope

The **About** block on the public marketing page that introduces the therapist (Turkish heading “Hakkımda” and surrounding copy). Contract describes **observable** behavior, not implementation.

## Visible structure

1. **Heading**: Primary section title for the therapist introduction.  
2. **Body**: One or more paragraphs of descriptive copy (unchanged text from prior release).  
3. **Portrait**: Primary photo of the therapist in a rounded, contained frame, adjacent or stacked relative to copy per breakpoint.

## Portrait

- **Source**: The approved professional portrait available at **`/images/kenan_kubuc_stok.jpg`**.
- **Presentation**: Image fills the frame with appropriate cropping (subject centered, face visible); alt text identifies the therapist for screen readers.

## Motion

- **Section**: When the user has not requested reduced motion, the section may animate into view in a **subtle** way (e.g., opacity / slight vertical movement) **once** per page load when scrolled into view.
- **Portrait emphasis**: Optional additional subtle motion (e.g., soft hover feedback or very slow ambient movement) **only** when reduced motion is **not** preferred.
- **Reduced motion**: When the user prefers reduced motion at the OS/browser level, **no** continuous or repeating movement is applied in a way that ignores that preference; static presentation is acceptable.

## Interaction & accessibility

- Any focusable control in the section shows a **visible focus** indicator.  
- Keyboard users can reach focusable elements in logical order.  
- Text remains readable at mobile, tablet, and desktop widths without overlap from the portrait frame.

## Non-goals (this contract)

- No change to booking links, forms, or admin behavior.  
- No requirement for A/B analytics or CMS-driven image swapping.
