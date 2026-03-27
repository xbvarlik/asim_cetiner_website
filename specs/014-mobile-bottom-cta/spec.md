# Feature Specification: Mobile bottom contact bar

**Feature Branch**: `014-mobile-bottom-cta`  
**Created**: 2026-03-27  
**Status**: Draft  
**Input**: User description: "Create a fixed bottom CTA component for mobile. It should contain two floating action buttons: On the left: A WhatsApp button with background color #25D366, white text 'WhatsApp', and the WhatsApp icon. On the right: A Phone button with background color #007AFF, white text 'Tel', and a phone icon. Inside the blue phone button, include a small circular accessibility icon on the far right. Both buttons should have fully rounded (pill-shaped) corners, a subtle shadow, and be fixed to the bottom corners of the viewport with about 16px of padding from the edges. Ensure the component stays on top of all other content. The full-width bar area between the two buttons must not block taps on content behind it; only the two buttons are interactive. Buttons use pill shape, white semibold labels, comfortable tap padding, and visible shadow."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Quick WhatsApp from mobile (Priority: P1)

As a visitor on a phone, I want a always-visible WhatsApp shortcut at the lower-left so I can start a chat without hunting through the page.

**Why this priority**: WhatsApp is a primary conversion path for many therapy practices; reducing friction directly supports bookings and inquiries.

**Independent Test**: On a mobile viewport, scroll any page where the bar is enabled, tap the green WhatsApp control, and confirm the expected WhatsApp conversation flow opens (or the configured destination).

**Acceptance Scenarios**:

1. **Given** a mobile viewport on a page where the bar is shown, **When** the user has scrolled midway down the page, **Then** the WhatsApp control remains visible at the bottom of the screen.
2. **Given** the WhatsApp control is visible, **When** the user taps it, **Then** the site opens the configured WhatsApp destination (e.g. chat with the practice).
3. **Given** the WhatsApp control, **When** the user views it, **Then** it shows the label "WhatsApp", white text on background color #25D366, a recognizable WhatsApp pictogram, pill-shaped edges, and a subtle shadow.

---

### User Story 2 - Quick phone call from mobile (Priority: P2)

As a visitor on a phone, I want a always-visible phone shortcut at the lower-right so I can call the practice in one step.

**Why this priority**: Voice contact is a common alternative to messaging; parity with WhatsApp keeps both major channels one tap away.

**Independent Test**: On a mobile viewport, tap the blue phone control and confirm the device dialer (or equivalent) presents the practice number.

**Acceptance Scenarios**:

1. **Given** a mobile viewport on a page where the bar is shown, **When** the user taps the phone control, **Then** the device initiates a call using the configured telephone number.
2. **Given** the phone control, **When** the user views it, **Then** it shows the label "Tel", white text on background color #007AFF, a recognizable telephone pictogram, a small circular accessibility emblem aligned to the trailing (right) side inside the control, pill-shaped edges, and a subtle shadow.

---

### User Story 3 - Page stays usable between the buttons (Priority: P3)

As a visitor on a phone, I want taps in the empty horizontal space between the two bottom controls to reach the page behind them, so I am not blocked from tapping links or controls in that band.

**Why this priority**: A full-width blocking overlay at the bottom would harm navigation and trust; pass-through in the gap preserves usability.

**Independent Test**: Place an interactive control (link or button) in the horizontal gap at the bottom third of the viewport; with the bar present, tapping it should activate that control, not be swallowed by the bar container.

**Acceptance Scenarios**:

1. **Given** interactive page content positioned under the horizontal gap between the two controls, **When** the user taps that content, **Then** the underlying control receives the tap as it would if the bar were absent.
2. **Given** the bar container spans the bottom width of the viewport, **When** the user taps directly on either labeled control, **Then** only that control’s action fires.

---

### Edge Cases

- Very narrow mobile widths: both controls remain readable, tappable (minimum touch target guidelines), and do not overlap each other; labels may truncate or scale only if legibility and tap targets are preserved.
- Short viewport height (e.g. keyboard open, landscape): the bar remains fixed to the bottom of the visible viewport; content behind it may be obscured only under the controls themselves, not unnecessarily across the full width except where required by layout.
- Pages where outbound chat or call is not desired: the bar is omitted or disabled per product rules (same scope as “pages where the bar is shown”).
- Reduced motion or high contrast system settings: motion is limited to what the rest of the site already allows; text and icon contrast meet accessibility expectations for the specified colors.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: On mobile viewports (per site-wide breakpoint rules for “mobile”), the system MUST show a fixed bar at the bottom of the viewport on agreed pages, containing exactly two primary actions: WhatsApp (leading) and phone (trailing).
- **FR-002**: The WhatsApp action MUST use background color #25D366, white label text "WhatsApp", and a recognizable WhatsApp pictogram adjacent to the label.
- **FR-003**: The phone action MUST use background color #007AFF, white label text "Tel", a recognizable telephone pictogram, and a small circular accessibility emblem on the far right inside the same control.
- **FR-004**: Both actions MUST use pill-shaped (fully rounded) outer shapes, semibold white typography, comfortable horizontal and vertical padding for touch (visually comparable to roughly 12px vertical and 24px horizontal minimum padding), and a clearly visible but subtle drop shadow.
- **FR-005**: The bar MUST maintain approximately 16px inset from the left and right viewport edges and sit above page chrome and content so it is always visible until dismissed or navigated away (stacking above other layers).
- **FR-006**: The bar’s full-width container MUST NOT intercept pointer or touch events in the empty space between the two controls; only the two action regions MUST be interactive.
- **FR-007**: The WhatsApp action MUST navigate to the practice’s configured WhatsApp entry point; the phone action MUST use the practice’s configured voice number, consistent with other contact surfaces on the site unless a feature-specific override is documented.
- **FR-008**: On viewports classified as non-mobile for this site, the bar MUST NOT appear (or an equivalent contact pattern already in use remains authoritative—no duplicate fixed mobile bar on desktop).

### Assumptions

- WhatsApp URL and telephone number are defined in the same place as existing contact information (or will be added there) so the bar stays consistent with footer or contact sections.
- “Subtle shadow” and “high stacking” are judged relative to the rest of the marketing site: the bar reads as floating above content and is not obscured by modals unless a modal intentionally layers above it.
- Icon pictograms may come from the project’s existing icon set as long as WhatsApp and phone meanings are unambiguous to target users.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: On mobile viewports, for pages where the bar is enabled, users can start WhatsApp or initiate a phone call with one tap without scrolling the bar into view, from any vertical scroll position on the page.
- **SC-002**: In manual testing with at least three distinct tap targets placed under the gap between the controls, 100% of taps activate the underlying target (no false captures by the bar container).
- **SC-003**: In a stakeholder or design review checklist, the bar passes all items: correct hex colors, labels "WhatsApp" and "Tel", pill shape, visible shadow, presence of the small circular accessibility emblem inside the phone control, and visual prominence over normal page content without blocking the gap between buttons.
