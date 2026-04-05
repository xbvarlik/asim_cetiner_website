# UI contract: Admin mobile layout (018)

Manual acceptance reference aligned with [spec.md](../spec.md). Use a **narrow viewport** (e.g. browser device mode for a common phone portrait size) and an **authenticated admin** session.

## C1 — Shell navigation

1. **Hamburger**: On narrow width, a **menu** control is visible in the admin header; **full inline nav is not required** to fit in one row.
2. **Open**: Tapping the control opens a panel containing **all** items currently defined in admin nav (Danışan, Blog, Ofis, İstatistikler, Ayarlar) plus **sign out**.
3. **Navigate**: Choosing a link navigates and **closes** the panel (or panel is dismissible and navigation still succeeds).
4. **Desktop**: From **`md` (≥768px)** or the breakpoint implemented in code, **hamburger is hidden** and **horizontal nav** matches prior “desktop” behavior.
5. **Horizontal scroll**: The **viewport** does not require horizontal scroll to see header + main content column width at narrow size.

## C2 — List pages (leads, blog, offices)

1. **Default view**: No **horizontal scroll of the page** to see primary row identity and primary actions.
2. **Details**: Secondary fields are available via an explicit **expand/toggle** (or equivalent), without horizontal **page** scroll.
3. **Pagination**: Prev/next and page indicator do not force page-level horizontal overflow (wrapping acceptable).

## C3 — Stats

1. Dashboard loads without **page-level** horizontal scroll; charts may use **contained** horizontal scroll inside a chart card if unavoidable.

## C4 — Forms / settings

1. At least one **settings** flow (password change entry point) and **login** (if tested) remain usable without **page-level** horizontal scroll on narrow width.

## C5 — Scope

1. **No** changes to public marketing routes or `(main)` layout are introduced for this feature.
