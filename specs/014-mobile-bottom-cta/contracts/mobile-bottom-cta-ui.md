# UI contract: Mobile bottom contact bar

Visitor-facing behavior and layout invariants for `014-mobile-bottom-cta`. Implementation may vary; automated or manual checks assert these outcomes.

## Visibility

| ID | Rule |
|----|------|
| V-01 | The bar is **visible** only on viewports below the `md` Tailwind breakpoint (mobile / small tablet in portrait). |
| V-02 | The bar is **not** rendered on admin routes (layout tree without `SiteShell`). |

## Layout and stacking

| ID | Rule |
|----|------|
| L-01 | Bar container is **fixed** to the **bottom** of the viewport, full width, with **horizontal padding** equivalent to `1rem` (16px) from left and right edges. |
| L-02 | Two actions are placed at **start** and **end** of the row (lower-left and lower-right corners of the safe area). |
| L-03 | Bar container uses **`pointer-events: none`**; each action control uses **`pointer-events: auto`** so taps in the **gap** hit underlying page content. |
| L-04 | Z-index is **at least** the same tier as the sticky site header (`z-50` in current codebase) so the bar stays above normal scrolling content. |

## WhatsApp action (leading)

| ID | Rule |
|----|------|
| W-01 | Label text is exactly **WhatsApp** (Latin script as specified). |
| W-02 | Background color is **#25D366**; label and icon are **white**; typography is **semibold**. |
| W-03 | Control is **pill-shaped** (`rounded-full`) with **subtle shadow** (e.g. `shadow-lg` class or equivalent). |
| W-04 | Comfortable tap padding: visually comparable to **~12px vertical × ~24px horizontal** minimum. |
| W-05 | `href` is the canonical WhatsApp URL for the practice, **same** as footer WhatsApp link. |
| W-06 | External link: `target="_blank"` and `rel="noopener noreferrer"`; descriptive **`aria-label`** including “WhatsApp”. |

## Phone action (trailing)

| ID | Rule |
|----|------|
| P-01 | Label text is exactly **Tel**. |
| P-02 | Background color is **#007AFF**; label and icons are **white**; typography is **semibold**. |
| P-03 | Same pill shape and shadow tier as WhatsApp control; same padding band as W-04. |
| P-04 | Includes a **telephone** pictogram and a **small circular accessibility** pictogram on the **trailing** side **inside** the pill. |
| P-05 | `href` uses **`tel:`** with the practice number, **same** logical destination as footer phone. |
| P-06 | Descriptive **`aria-label`** for the control (e.g. includes “telefon” / “call”). |

## Accessibility

| ID | Rule |
|----|------|
| A-01 | Both actions are real **links** (`<a>`) with non-empty **accessible names** (`aria-label` and/or visible text). |
| A-02 | Focus visibility: **focus-visible** ring consistent with site tokens (`ring-ring`, offset). |
| A-03 | Decorative icons: `aria-hidden="true"` where the link already has a sufficient name. |
