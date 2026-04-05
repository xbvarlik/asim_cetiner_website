# Feature Specification: Admin mobile layout and navigation

**Feature Branch**: `018-admin-mobile-layout`  
**Created**: 2026-04-05  
**Status**: Draft  
**Input**: User description: "I want you to add mobile adaptibility to the admin routes as well. Its menu should be a hamburger and its pages should be ableto seen in mobile without need to scroll horizontally. You can employ a toggle for details approach in lists on mobile for example. In the scope of this feature do not act on public pages, edit admin pages only. You can use /therapist-ui-designer skill for ui decisions if necessary."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Navigate the admin area on a phone (Priority: P1)

An authenticated administrator opens the admin experience on a small screen. They use a compact menu control to open and close the main navigation, reach any admin section, and dismiss the menu to continue working. The overall admin frame (header, menu, and main content area) fits the viewport width without requiring horizontal scrolling.

**Why this priority**: Without usable navigation and a non-overflowing layout shell, other admin tasks are blocked on mobile.

**Independent Test**: On a typical phone-sized viewport, open the admin app, open and close the navigation menu, and navigate to at least two distinct admin sections without horizontal scrolling of the page chrome.

**Acceptance Scenarios**:

1. **Given** the user is on an admin screen on a narrow viewport, **When** they open the main navigation using the menu control, **Then** they see all primary admin navigation destinations and can move to another section.
2. **Given** the navigation menu is open, **When** the user selects a destination or closes the menu, **Then** the menu hides and the chosen screen (or current screen) is fully usable.
3. **Given** the user is on any admin screen on a narrow viewport, **When** they view the layout (header, navigation affordance, main content column), **Then** they do not need to scroll horizontally to see the full width of that layout.

---

### User Story 2 - Use admin list and data views without horizontal page scroll (Priority: P2)

On narrow viewports, administrators view lists, tables, or dense information (for example leads, blog posts, or settings) in a layout that stays within the screen width. Where content would naturally overflow (many columns or long rows), the experience uses progressive disclosure—such as a summary row with an explicit control to show or hide additional details—so the default view does not force horizontal scrolling of the whole page.

**Why this priority**: Core admin work often happens in lists; horizontal scrolling harms task completion and trust on mobile.

**Independent Test**: On a phone-sized viewport, open at least two different admin list-style views and complete reading and acting on an item without horizontal scrolling of the page; use expand/collapse (or equivalent) where detail density would otherwise overflow.

**Acceptance Scenarios**:

1. **Given** a list or table-style admin view on a narrow viewport, **When** the user scans the screen in its default state, **Then** primary identifiers and actions are visible without horizontal page scroll.
2. **Given** an item has more fields than fit comfortably on one line, **When** the user chooses to show details (for example via a toggle, expand control, or similar), **Then** additional information appears in a controlled way (stacked, wrapped, or in a panel) without requiring horizontal scroll of the entire page.
3. **Given** the user collapses or hides details, **When** the view updates, **Then** the list returns to a compact, width-safe presentation.

---

### User Story 3 - Forms and detail screens remain usable on small screens (Priority: P3)

Screens that collect or display structured data (forms, settings, single-record views) use spacing and stacking appropriate to narrow widths so fields and actions remain readable and tappable without horizontal page scroll.

**Why this priority**: Secondary to navigation and lists but needed for end-to-end admin tasks on mobile.

**Independent Test**: Open an admin form or settings-style page on a narrow viewport and complete or review fields without horizontal scrolling of the page.

**Acceptance Scenarios**:

1. **Given** an admin form or detail screen on a narrow viewport, **When** the user scrolls vertically through the content, **Then** inputs, labels, and primary actions remain within the viewport width.
2. **Given** optional secondary actions or metadata exist, **When** space is constrained, **Then** they remain accessible without forcing the main page to scroll horizontally (for example by wrapping, stacking, or secondary placement consistent with the rest of the admin mobile patterns).

---

### Edge Cases

- Very narrow widths (e.g. smallest common phone widths): navigation and content still avoid horizontal page scroll where feasible; if a specific widget cannot shrink further, overflow is contained to that widget with its own scroll rather than the whole page.
- Long navigation labels or user-generated text: truncate or wrap predictably without breaking layout or hiding critical actions.
- Menu open state: focus order and visibility remain clear; closing the menu is always obvious and available.
- Switching between portrait and landscape on the same device: layouts adapt without trapping the user in an unusable state.
- **Out of scope**: Marketing or other non-admin routes are unchanged; any issue on public pages is explicitly excluded from this feature.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: On narrow viewports, the admin experience MUST provide a compact menu control that reveals and hides the primary admin navigation (consistent with a “hamburger” pattern requested by stakeholders).
- **FR-002**: All primary admin navigation destinations available on larger screens MUST remain reachable on narrow viewports via that navigation pattern.
- **FR-003**: For admin routes only, the default layout (shell around admin content) MUST not require horizontal scrolling to view the full width of the header, menu affordance, and main content column at typical phone widths.
- **FR-004**: Admin list, table, or dense summary views MUST present a default mobile layout that avoids horizontal page scroll; where full detail would overflow, the product MUST offer a clear progressive-disclosure pattern (e.g. toggle or expand to show more detail).
- **FR-005**: Admin forms and detail pages MUST arrange fields and primary actions so users can complete or review tasks without horizontal page scroll at typical phone widths.
- **FR-006**: Interactive controls added or adjusted for this feature (menu, toggles, expanders) MUST remain operable with touch and MUST have visible focus for keyboard users when applicable.
- **FR-007**: The feature scope is limited to admin pages and admin-specific shared UI; public or marketing pages MUST NOT be modified for this work.

### Assumptions

- “Typical phone widths” means common smartphone portrait sizes down to the smallest width the product commits to support, as recorded in acceptance test notes.
- Existing authentication and authorization behavior for admin users is unchanged; this feature only affects layout and navigation presentation on small screens.
- Visual tone for new or adjusted controls should remain calm, trustworthy, and consistent with the broader therapeutic brand (professional spacing, readable type, clear focus states)—without changing product scope beyond admin mobile usability.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: On a narrow screen representative of common smartphone portrait use (documented for acceptance testing), an administrator can open the admin menu, navigate to any primary admin section, and close the menu with no horizontal scrolling of the page shell in any step.
- **SC-002**: On that same class of device, at least two distinct admin list-style views can be used in their default state with zero horizontal page scroll; where detail is hidden behind disclosure, users can expand and collapse without horizontal page scroll.
- **SC-003**: On that same class of device, at least one admin form or settings-style page can be reviewed top-to-bottom with zero horizontal page scroll.
- **SC-004**: Qualitative review: representative admin tasks (navigate, scan a list, open item details, submit or save where applicable) are judged by stakeholders as “easy to complete on a phone” compared to the prior desktop-only layout behavior.
