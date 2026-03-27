# Feature Specification: Services list entrance and calm presentation

**Feature Branch**: `011-services-list-entrance`  
**Created**: 2026-03-27  
**Status**: Draft  
**Input**: User description: "I want you to tweak the components/feature/services-list.tsx component in a way that services are coming appearing from bottom to up. Hovering animation is good, do not change that. You can use therapist-ui-designer skill to implement better ui."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Services reveal upward as I read the page (Priority: P1)

A visitor scrolls to the services section on the marketing site. Each service item should become noticeable through a clear upward entrance (starting from lower on the screen and settling into place), so the section feels alive and easy to follow without being distracting.

**Why this priority**: The entrance motion is the core ask and directly affects first impression and scanability of offerings.

**Independent Test**: Open the page, scroll until the services block is in view, and confirm each item’s entrance reads as bottom-to-up and completes without blocking reading.

**Acceptance Scenarios**:

1. **Given** the services section is not yet in view, **When** the visitor scrolls until the section enters the viewport, **Then** each service item plays an upward entrance motion (from below toward its final position) in a predictable order.
2. **Given** the entrance has finished, **When** the visitor reads the list, **Then** all items rest in their final layout with no overlap or clipped content introduced by the motion.

---

### User Story 2 - Hover feels the same; layout feels calmer and more trustworthy (Priority: P2)

A visitor moves the pointer over individual service items. The interactive hover feedback they are used to must remain. Separately, spacing, typography hierarchy, color balance, and focus visibility should support a calm, professional, healthcare-appropriate feel (readable, low strain, clear primary focus on content).

**Why this priority**: Preserving hover avoids regressions; presentation refinements support trust and conversion without changing behavior.

**Independent Test**: Compare hover behavior before and after the change on the same items; review spacing, contrast, and focus states against accessibility expectations.

**Acceptance Scenarios**:

1. **Given** a service item is visible, **When** the visitor hovers it (or equivalent focus for keyboard), **Then** the same hover emphasis and motion character as before the change is preserved (no removal or replacement of that effect).
2. **Given** the visitor navigates by keyboard, **When** they move focus across service links or controls, **Then** a visible focus indicator appears on the focused element.

---

### Edge Cases

- **Few services (one or two)**: Entrance should still look intentional, not empty or overly delayed.
- **Many services**: Staggered entrances should not make the section feel sluggish; total time from first to last item finishing should remain reasonable for a marketing page (visitor can start reading within a short window after the section appears).
- **Reduced motion**: If the visitor has requested reduced motion at the system level, entrance effects should respect that preference and not force distracting movement.
- **Slow devices or low frame rates**: Final layout must remain correct; motion may simplify but must not break structure or readability.

**Assumptions**: The services listing and its current hover treatment already exist as the baseline for comparison (FR-003, SC-003). This feature does not add or remove services from the catalog—only how they are presented and animated.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST present each item in the services listing with an upward entrance motion (from below toward its resting position) when the section becomes viewable, unless reduced motion is requested (see FR-005).
- **FR-002**: Service items MUST appear in a consistent sequence (e.g., top-to-bottom order of the list) so the motion supports scanning rather than randomness.
- **FR-003**: The existing hover (and equivalent focus) feedback on service items MUST be preserved in character and prominence; this work MUST NOT remove or replace that hover treatment with a different effect.
- **FR-004**: Presentation of the services block MUST use clear visual hierarchy, comfortable spacing between items, and readable contrast for body text and interactive elements under normal viewing conditions.
- **FR-005**: When the user’s system indicates a preference for reduced motion, entrance animations MUST be omitted or replaced with a non-motion alternative that still makes content available immediately.

### Key Entities

- **Service item**: A single offering shown in the list (e.g., title, short description, link or action). Display order is significant for the entrance sequence.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: After the services section enters the viewport, at least 90% of visitors (in usability testing or staged review) can identify that items “come up” from below rather than appearing instantly with no directional cue.
- **SC-002**: From the moment the section is first substantially visible, all service items complete their entrance within 4 seconds under typical desktop conditions, without requiring the visitor to interact.
- **SC-003**: In a before/after check, hover behavior on service items is rated as “unchanged” or “equivalent” by the product owner or designated reviewer for every listed item.
- **SC-004**: With reduced-motion preference enabled at the OS level, no visitor report or automated accessibility check flags forced continuous motion on the services list as blocking reading or navigation.
