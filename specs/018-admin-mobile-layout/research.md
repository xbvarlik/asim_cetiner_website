# Research: Admin mobile layout (018)

## 1. Primary navigation on small screens

**Decision**: Use a **header hamburger** control that opens a **slide-in panel** listing the same `navItems` as today, implemented with the existing **Shadcn Sheet** (`components/ui/sheet.tsx`) from the leading edge (left), with overlay. From **`md` breakpoint upward**, keep **inline horizontal nav** (current behavior) in the header row.

**Rationale**: Sheet matches stack + constitution (Shadcn primitive), provides focus-friendly overlay, and avoids permanent sidebar consumption of width on phones. `AdminShell` is already a client component, so `useState` for open/close is appropriate.

**Alternatives considered**:

- **Dropdown menu only**: Poor fit for ~5 links + sign-out; cramped and easy to mis-tap.
- **Always-visible wrapped nav**: Already problematic at mobile widths (wrap + crowding); spec explicitly requests hamburger.
- **Dedicated new dependency** (e.g. headless drawer library): Rejected under constitution without justification; Sheet suffices.

## 2. Data tables (leads, blog, offices) on narrow viewports

**Decision**: On **`sm` and below** (or equivalent Tailwind breakpoint), replace wide `<Table>` layouts with a **stacked “card per row”** or **single-column list** showing **primary fields** (identifier, key status, primary action). Secondary fields appear under a **toggle** (“Detayları göster” / chevron) using **Collapsible** pattern or a small client sub-row state. On **`md+`**, keep the existing table for scanability.

**Rationale**: Matches spec FR-004 (progressive disclosure); avoids whole-page horizontal scroll while preserving desktop table UX.

**Alternatives considered**:

- **Horizontal scroll on `<table>` only**: Spec prefers disclosure over scrolling the page; inner scroll on table is acceptable as last resort for a sub-widget but not as the default mobile pattern.
- **Hide columns with CSS only**: Risk of hiding critical actions; explicit disclosure keeps actions discoverable.

## 3. Pagination and sort controls

**Decision**: Ensure **AdminPagination** and toolbar rows use **`flex-wrap`**, **`gap`**, and **`justify`/`w-full`** so “Önceki / Sonraki” and page text do not force overflow. Sort headers can remain links; on mobile, consider **short labels** or **icon + text** only if wrapping still fails.

**Rationale**: Small change in shared helper benefits all three list pages.

## 4. Stats dashboard (Recharts)

**Decision**: Ensure chart **parent containers** use **`w-full min-w-0`** (and grid children **`min-w-0`**) so **ResponsiveContainer** can shrink. If a chart still overflows, wrap that block in **`overflow-x-auto`** so only the chart region scrolls, not the full page—aligned with spec edge case.

**Rationale**: Common Recharts + CSS grid issue; localized overflow is acceptable per spec.

## 5. Login and settings

**Decision**: **Audit only** after shell/tables/stats. `AdminLoginPage` already centers with `p-4`; if `AdminLoginForm` or `AdminChangePasswordModal` exceeds width at 320px, apply **`max-w-full`** and **stacked fields**—no scope expansion beyond admin.

**Rationale**: Spec P3 and FR-005; minimal touch if already acceptable.

## 6. Accessibility

**Decision**: Menu trigger uses **`aria-expanded`**, **`aria-controls`** (if applicable to Sheet API), and **visible `focus-visible` rings** on Shadcn Button. When Sheet opens, **focus moves into** the panel; close returns focus to trigger (Sheet default behavior if configured).

**Rationale**: FR-006 and therapist-ui-designer trust/calm expectations.
