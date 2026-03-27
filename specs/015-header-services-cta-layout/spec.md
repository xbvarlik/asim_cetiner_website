# Feature Specification: Header, Mobile Menu, Service Cards, and CTA Layout

**Feature Branch**: `015-header-services-cta-layout`  
**Created**: 2026-03-27  
**Status**: Draft  
**Input**: User description: "I want you to do some optimizations on the project. First, the header component displays a hamburger menu in mobile, which is correct, but the location of hamburger should be on the right. Navigations should be in the middle in desktop size, and hamburger should be on the right at mobile. Second, when hamburger is opened and rendered the full menu in modal, the menu inside looks bad. I want you to center the texts in it, expand the area that each covers vertically, and remove the 'menu' title that is displayed. Third, the cards in service list should be equally sized, according to the largest one. They should not be different in size. Fourth, CTA div includes an unnecessary accessability button above phone button, it should be removed. Fifth, CTA div should be included in desktop version as well."

## Clarifications

### Session 2026-03-27

- Q: What does “centered” mean for desktop primary navigation? → A: **Option B** — Primary links are centered in the horizontal space between the logo or brand (left) and the trailing edge of any right-side header actions (three-zone header: brand | navigation | actions).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Predictable header and navigation placement (Priority: P1)

A visitor opens the site on a phone and sees the site header with branding on one side and the compact menu control on the opposite side (right). On a large screen, the same visitor sees the main navigation links centered in the horizontal band between the brand on the left and any right-side header actions, with a clear, balanced layout.

**Why this priority**: Navigation placement is the first interaction pattern users learn; misaligned controls reduce trust and slow task completion.

**Independent Test**: Resize the viewport from narrow to wide and confirm menu control position on narrow views and, on wide views, primary links centered in the band between brand and right-side actions without opening the menu.

**Acceptance Scenarios**:

1. **Given** a narrow viewport typical of a phone, **When** the visitor views the header, **Then** the control that opens the full navigation appears on the right side of the header row.
2. **Given** a wide viewport typical of desktop use, **When** the visitor views the header, **Then** the primary site navigation links are centered within the horizontal space between the brand and any right-side header actions (not only left-aligned with the logo).
3. **Given** a wide viewport, **When** the visitor scans the header, **Then** the logo or site identity and any right-side actions remain clearly distinct from the navigation group in the middle band.

---

### User Story 2 - Clear, comfortable full-screen navigation (Priority: P1)

On a narrow viewport, a visitor opens the full-screen navigation overlay and sees each destination as a large, easy-to-tap row with label text centered, generous vertical spacing, and no redundant heading that only says "Menu."

**Why this priority**: The overlay is the primary way to move around the site on small screens; poor spacing and clutter increase errors and frustration.

**Independent Test**: Open and close the overlay on a phone-sized width and verify layout, spacing, and absence of a standalone "Menu" title.

**Acceptance Scenarios**:

1. **Given** the full navigation overlay is open on a narrow viewport, **When** the visitor reads the list of links, **Then** each link label is centered horizontally within its row or touch area.
2. **Given** the overlay is open, **When** the visitor uses touch or pointer, **Then** each navigation option occupies a vertically expanded target area (clearly larger than a single line of text alone).
3. **Given** the overlay is open, **When** the visitor scans the top of the overlay, **Then** no title or heading whose sole purpose is the word "Menu" (or equivalent generic label) is shown; closing the overlay remains obvious (e.g., close control).

---

### User Story 3 - Uniform service cards (Priority: P2)

A visitor reads the services section and sees every service card in the list at the same height as the tallest card in that group, so the grid looks orderly and no card appears visually "shorter" because of less text.

**Why this priority**: Visual inconsistency suggests lower quality; equal heights improve scannability and professional impression.

**Independent Test**: Load the services list with varied description lengths and compare card heights within the same row (and, where the layout is a single column, all cards in the list).

**Acceptance Scenarios**:

1. **Given** multiple service cards with different amounts of text, **When** the visitor views the services list, **Then** all cards in the same horizontal row share the same total height, matching the tallest card in that row.
2. **Given** a single-column layout on very narrow screens, **When** the visitor scrolls the services list, **Then** every card’s outer height matches the tallest card in the full list for that viewport.

---

### User Story 4 - Streamlined call-to-action and desktop visibility (Priority: P2)

A visitor who wants to call sees one clear phone call action in the persistent call-to-action area, without an extra accessibility-related control stacked above the phone button that duplicates purpose. The same call-to-action area is available on large screens, not only on small screens.

**Why this priority**: Redundant controls confuse users and clutter the UI; hiding the CTA on desktop can hide the main conversion path.

**Independent Test**: Check the CTA strip on narrow and wide viewports for control count and visibility.

**Acceptance Scenarios**:

1. **Given** the persistent bottom (or fixed) call-to-action area is visible on a narrow viewport, **When** the visitor looks at the phone-related actions, **Then** the separate accessibility button that sits above the phone button (described as unnecessary) is not present.
2. **Given** a wide viewport, **When** the visitor views the page, **Then** the same call-to-action area (or equivalent persistent CTA for phone contact) is shown, not omitted solely because the screen is large.
3. **Given** the redundant control was removed, **When** a visitor who relies on assistive technology uses the page, **Then** the phone action remains reachable and identifiable (no regression in ability to initiate a call from the CTA area).

---

### Edge Cases

- Very long navigation labels on desktop: the navigation group in the middle band should not overlap the logo or right-side actions or break the header layout unreadably; wrapping or truncation behavior should remain consistent with the rest of the site.
- Many service items: equal-height rules apply per row (or per design grid row); extremely tall content inside one card should not clip critical text without a defined overflow behavior consistent with brand guidelines.
- Removing the extra control above the phone button must not remove the only way to focus or activate the call action for keyboard or screen-reader users.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: On viewports where the compact menu control is shown, the product MUST place that control on the right side of the header row (not left).
- **FR-002**: On viewports where inline primary navigation is shown, the product MUST present those links as a group centered in the horizontal band between the brand (left) and the trailing edge of any right-side header actions (three-zone header: brand, navigation, actions—not geometric center of the full header width unless no right-side actions exist).
- **FR-003**: When the full-screen navigation overlay is open on narrow viewports, the product MUST center the text of each navigation option within its row or touch region.
- **FR-004**: When the full-screen navigation overlay is open, the product MUST provide vertically expanded space per option so each choice is easier to tap or click than a single text line alone.
- **FR-005**: When the full-screen navigation overlay is open, the product MUST NOT display a heading or title whose only role is to label the overlay as "Menu" (or a direct synonym used as a standalone page title).
- **FR-006**: In the services list, the product MUST give every card in the same row (when multiple columns are shown) the same outer height as the tallest card in that row; when only one column is shown, every card in the list MUST share the same outer height as the tallest card in that list.
- **FR-007**: The persistent call-to-action area MUST NOT include the extra accessibility-related button positioned above the phone button (the one identified as redundant).
- **FR-008**: The call-to-action area MUST be visible on large (desktop-class) viewports as well as on small viewports, with content appropriate to the design (primary phone action remains available).

### Assumptions

- "Desktop" and "mobile" widths follow the product’s existing responsive breakpoints; this feature adjusts layout within those breakpoints rather than defining new ones unless planning discovers a gap.
- On desktop, “centered” primary navigation means the **middle-band** placement in **FR-002** (between brand and any right-side header actions), as confirmed in Clarifications for 2026-03-27—not necessarily the geometric center of the full header width when right-side actions are present.
- Equal card heights apply to cards that share a row in the responsive grid; in multi-column layouts, each row is evaluated separately.
- Removing the redundant control does not remove required accessibility for the phone action; any legally required accessibility affordances remain satisfied through the remaining CTA or page-level mechanisms.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In a structured check across at least three phone-width viewports, the menu-open control appears on the right in 100% of cases.
- **SC-002**: In a structured check across at least three desktop-width viewports, primary navigation links are judged by reviewers to be centered in the band between the brand and right-side header actions (not left-clustered with the logo) in 100% of cases.
- **SC-003**: With the navigation overlay open on a phone-width viewport, 100% of listed options show centered labels and pass a design or usability review confirming each option occupies a clearly enlarged vertical row suitable for comfortable one-thumb selection (not a cramped single-line-only hit area).
- **SC-004**: With the overlay open, no standalone "Menu" title appears in 100% of review passes.
- **SC-005**: For the services list with mixed-length descriptions, all cards in the same row share identical outer height within a 2-pixel tolerance in visual or measurement review.
- **SC-006**: On both narrow and wide viewports, the call-to-action area is present and the phone action is available without the removed redundant control appearing above it, verified in 100% of viewport samples in the test matrix.
