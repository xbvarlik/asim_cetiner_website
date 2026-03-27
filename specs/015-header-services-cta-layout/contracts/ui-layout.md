# UI layout contract: 015-header-services-cta-layout

Behavioral contract for manual / visual QA. Aligned with `spec.md` functional requirements.

## Header (viewport-dependent)

| ID | Requirement |
|----|-------------|
| H-001 | Below `lg` breakpoint: control that opens the navigation sheet is on the **right** side of the header row. |
| H-002 | At `lg` and above: inline primary nav is **centered within the horizontal band** between the brand block and the right-side action group (share + sheet trigger). |
| H-003 | Brand and right-side actions remain visually distinct from the nav group. |

## Mobile navigation sheet

| ID | Requirement |
|----|-------------|
| S-001 | Each nav link label is **horizontally centered** in its row/touch area. |
| S-002 | Each option has **clearly increased vertical padding** vs. a default inline text link (comfortable tap row). |
| S-003 | No **visible** title whose only purpose is the word “Menü” / “Menu”. |
| S-004 | Close affordance remains available (existing sheet close control). |

## Services list cards

| ID | Requirement |
|----|-------------|
| C-001 | In a multi-column row, all cards in that row share the **same outer height** (tallest wins). |
| C-002 | In a single-column layout, every card matches the **tallest card in the list**. |

## Bottom contact CTA

| ID | Requirement |
|----|-------------|
| T-001 | The **Accessibility** icon decoration inside the phone CTA is **absent**. |
| T-002 | CTA strip is **visible** at desktop widths (not `md:hidden` only). |
| T-003 | Phone action remains **keyboard-focusable** and has a clear **accessible name**. |
| T-004 | Page content is not permanently obscured by the fixed bar (adequate bottom spacing on main content). |
