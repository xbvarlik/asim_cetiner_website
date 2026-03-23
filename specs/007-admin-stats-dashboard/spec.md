# Feature Specification: Admin Statistics Dashboard (Leads & Visitors)

**Feature Branch**: `007-admin-stats-dashboard`  
**Created**: 2026-03-23  
**Status**: Draft  
**Input**: User description: "Comprehensive visualized Statistics Page in the Admin Panel for Lead and Visitor data with date filtering, source comparison, and conversion insights."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Filter metrics by date range (Priority: P1)

An **admin** opens the **statistics** area of the admin panel and chooses a **date
range** (start and end). All summary figures and charts on the page update to
reflect only **leads** and **visitor logs** whose timestamps fall within that
range (inclusive boundaries). Changing the range is quick and does not require a
full page reload in a way that loses admin context.

**Why this priority**: Without time filtering, the dashboard cannot answer
“how did we do this week?” or compare periods.

**Independent Test**: Pick a known week with data, set the range to that week,
and confirm counts match manual database checks for that interval. Widen the
range and confirm totals never decrease.

**Acceptance Scenarios**:

1. **Given** the statistics page, **When** the admin sets a valid start and end
   date, **Then** every widget on the page uses that range consistently.
2. **Given** a date range with **no** matching records, **When** the page loads,
   **Then** the admin sees a clear **empty state** (e.g. message equivalent to
   **“Veri bulunamadı”**) instead of errors or misleading zeros mixed with stale
   data.
3. **Given** the admin shares or bookmarks the URL, **When** they reopen it,
   **Then** the **same date range** is reflected (range encoded in a stable,
   readable way such as URL parameters).

---

### User Story 2 - See lead volume by channel and office (Priority: P2)

An admin views **how many leads** were captured in the selected period, broken
down by **marketing source** (the same notion as stored on the lead record when
available) and by **office**. The breakdown is visible in a **chart** suitable
for comparing categories (e.g. bars).

**Why this priority**: Operational routing and marketing spend need channel and
location visibility.

**Independent Test**: Seed or identify leads with distinct sources and offices;
confirm bar lengths (or equivalent) match grouped counts for the filter.

**Acceptance Scenarios**:

1. **Given** multiple leads with different **sources**, **When** the chart loads,
   **Then** each **non-empty** source category appears with the correct count.
2. **Given** leads with **no** recorded source, **When** the chart loads,
   **Then** they appear under a single **explicit “unattributed”** (or
   equivalent) category so totals still reconcile.
3. **Given** leads tied to different **offices**, **When** the office breakdown
   is shown, **Then** counts per office match the filtered data.

---

### User Story 3 - See visitor traffic by source (Priority: P2)

An admin views **how many visits** were logged in the period, grouped by **visit
source** (e.g. WhatsApp, Instagram, campaign tags). The distribution is shown in
a **part-to-whole** visualization (e.g. pie or donut) with **legend** and
**tooltips**.

**Why this priority**: Validates which channels drive traffic before conversion.

**Independent Test**: Compare summed slice values to a grouped count of visit
rows for the range.

**Acceptance Scenarios**:

1. **Given** visit logs with several **sources**, **When** the chart renders,
   **Then** proportions reflect grouped counts for the selected dates.
2. **Given** **no** visits in range, **When** the chart area renders, **Then**
   the **empty state** applies (Story 1).

---

### User Story 4 - Compare sources over time and conversion (Priority: P3)

An admin selects **one or more sources** (e.g. via checkboxes) and sees a
**timeline** comparing **daily visitor counts** and **daily lead counts** for
those sources on the same period. A **table** also lists each **source** with
**visitors**, **leads**, and **conversion rate** (leads ÷ visitors as a
percentage, with sensible handling when visitors are zero).

**Why this priority**: Connects traffic to outcomes and supports period
comparison.

**Independent Test**: For a single source with known daily rows, verify the line
or grouped bars match per-day aggregates; verify the table’s rate matches
manual calculation or shows **“—”** / **0%** when visitors = 0 per product
rules.

**Acceptance Scenarios**:

1. **Given** at least two sources with data, **When** the admin selects them,
   **Then** the timeline distinguishes sources visually (color/legend).
2. **Given** **zero** visitors for a source in the range, **When** the
   conversion column is shown, **Then** the UI does **not** show a misleading
   infinite percentage (use **not applicable** treatment).
3. **Given** tooltips on charts, **When** the admin hovers a point or segment,
   **Then** they see **clear labels** (source, date or category, numeric value).

---

### Edge Cases

- **Partial days / timezone**: “Day” boundaries for daily series MUST be
  consistent across all widgets (documented default, e.g. site or business
  timezone).
- **Very large ranges**: Page SHOULD remain responsive; aggregation MUST run on
  the server (not by loading all raw rows into the browser).
- **Admin-only**: No statistics data exposed on public routes.
- **Renamed or new sources**: Unknown source strings still appear as their own
  category (no silent drop).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The admin statistics page MUST aggregate **leads** in the
  selected date range, grouped by **marketing source** (nullable leads grouped
  under an explicit unattributed label).
- **FR-002**: The page MUST aggregate **leads** in the range grouped by
  **office**.
- **FR-003**: The page MUST aggregate **visitor logs** in the range grouped by
  **visit source**.
- **FR-004**: The page MUST provide **conversion rate per source** for the
  range: **leads attributed to that source** vs **visits logged for that
  source**, expressed as a percentage, with defined behavior when visit count is
  zero.
- **FR-005**: All aggregation entry points MUST accept optional **start** and
  **end** date boundaries and apply them consistently to both **Lead** and
  **TrafficLog** timestamps.
- **FR-006**: The statistics page MUST use a **dashboard layout** (grid of
  summary sections/cards) appropriate for desktop; on narrow widths sections
  MUST stack without horizontal overflow of the page chrome.
- **FR-007**: A **global date range control** at the top MUST drive all widgets;
  changing it MUST refresh all figures for the new range.
- **FR-008**: The selected date range MUST be reflected in the **URL** so
  navigation and refresh preserve the filter (**Next.js-friendly** pattern).
- **FR-009**: **Lead-by-source** and **lead-by-office** MUST be shown together in
  a **bar chart** component (single chart with grouped/structured bars, or two
  coordinated bar views—product choice as long as both breakdowns are visible
  without ambiguity).
- **FR-010**: **Visitors by source** MUST use a **pie or donut** chart with
  **legend** and **tooltips**.
- **FR-011**: **Source comparison over time** MUST allow **multi-select
  sources** and show **daily** visitor and lead counts per selected source
  (line or grouped bar chart).
- **FR-012**: A **conversion table** MUST show columns: **Source | Visitors |
  Leads | Conversion %**.
- **FR-013**: Primary data series MUST use the product’s **semi-dark green**
  brand tone; grid lines and secondary series MUST use **neutral** grays /
  off-whites for readability.
- **FR-014**: Charts MUST include **legends** and **tooltips** for values.
- **FR-015**: When no data exists for the range, the page MUST show **“Veri
  bulunamadı”** (or equivalent Turkish copy) in the affected sections.

### Key Entities

- **Lead** (admin view): Includes **creation time**, optional **marketing
  source**, **office** relationship.
- **Traffic log / visit**: Includes **creation time**, **source** label.
- **Date range filter**: Start and end dates applied uniformly to aggregations.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: For a fixed seeded range, **100%** of displayed **aggregate
  numbers** (table + tooltip totals) match manual **SQL-level** or **query-level**
  checks for leads and visits (sample of at least **3** sources and **2**
  offices).
- **SC-002**: Changing the date range updates **all** widgets within **3
  seconds** on a typical admin connection (perceived single refresh; exact
  loading pattern may vary).
- **SC-003**: With **zero** rows in range, **100%** of chart/table areas show
  the **empty state** message—not blank broken layouts.
- **SC-004**: On a **1280px-wide** viewport, the dashboard grid shows **all**
  primary widgets without requiring horizontal page scroll (internal chart
  scroll only if explicitly contained).
- **SC-005**: **100%** of deep-linked URLs with encoded date parameters reproduce
  the same range after reload (manual check of **3** samples).

### Assumptions

- **Route**: The existing admin **statistics** page path remains the canonical
  entry (current app structure under the admin dashboard).
- **Data model**: **Lead** and **TrafficLog** (or equivalent visit log) tables
  exist with the fields needed for source, office, and timestamps.
- **Source alignment**: **Conversion** compares the same **string identity** for
  source on **Lead** and **visit log** (normalization rules applied in the
  aggregation layer if casing differs).
- **Charting library**: Implementation may use **Recharts** or the project’s
  **Shadcn chart** wrappers, provided visual and accessibility outcomes meet
  FR-013–FR-015.
- **Daily buckets**: “Day” is defined in **Europe/Istanbul** (or the business’s
  configured timezone) for daily series—consistent across widgets.

### Out of Scope

- Export to CSV/PDF, scheduled email reports, or real-time streaming updates.
- Non-admin roles or row-level security beyond existing admin gate.
- Editing leads or visit logs from this page.
