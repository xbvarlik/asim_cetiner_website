# Feature Specification: Horizontal process flow (“Süreç Nasıl İşliyor?”)

**Feature Branch**: `021-horizontal-process-flow`  
**Created**: 2026-04-10  
**Status**: Draft  
**Input**: User description: "Refactor the existing \"Süreç Nasıl İşliyor?\" component from a vertical card list into a horizontal graph-style process flow," including full layout, node, spacing, and styling constraints (full-width centered container, central dashed connector, circular numbered nodes, text beneath nodes, equal horizontal distribution, preservation of existing palette and typography, no per-step card chrome).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the process at a glance (Priority: P1)

A visitor opens the page containing the “Süreç Nasıl İşliyor?” section and quickly sees that therapy follows a clear sequence from first step to last, connected as one journey rather than separate boxes.

**Why this priority**: The section exists to reduce uncertainty and build trust; sequence clarity is the core value.

**Independent Test**: Show the section alone (or the page with only this section visible) and ask whether the visitor can state the order of steps and what each step represents, without referring to the old vertical cards.

**Acceptance Scenarios**:

1. **Given** the visitor is viewing the section on a typical desktop or large tablet width, **When** they scan the section, **Then** they see a single horizontal path with all steps along one line and a dashed connector running through them.
2. **Given** the visitor is viewing the section, **When** they look at any step, **Then** they see a circular node on the line with the step number inside it, and the step title and description centered below that node.
3. **Given** the visitor is viewing the section, **When** they compare adjacent steps, **Then** horizontal spacing between step positions appears even (no step looks accidentally grouped or isolated).

---

### User Story 2 - Same clarity on smaller screens and with assistive support (Priority: P2)

A visitor using a narrow viewport or assistive technology still encounters the steps in the correct order, with readable text and no loss of meaning compared to the wide layout.

**Why this priority**: A calm, trustworthy experience must not break on mobile or for users who do not rely on vision alone.

**Independent Test**: Resize the viewport through the same range the rest of the site supports, and verify with keyboard/screen reader that step order matches the intended sequence; confirm text does not overlap nodes or neighboring columns in a way that hides content.

**Acceptance Scenarios**:

1. **Given** the viewport is at the narrow end of the site’s supported range, **When** the visitor reads the section, **Then** every step’s number, title, and description remain readable and the chronological order is unambiguous.
2. **Given** a visitor uses assistive technology that reads content in document order, **When** they move through the section, **Then** the order of steps announced matches the visual sequence (first to last along the process).

---

### Edge Cases

- Step titles or descriptions are longer than today (wrapping): text remains centered under its node and does not collide with the dashed path or adjacent steps on supported viewports; if wrapping increases height, layout still keeps each block clearly tied to one node.
- Future change in the number of steps: equal horizontal distribution still applies across however many steps the product defines; the dashed connector still spans the full width of the step row.
- Very wide screens: content stays horizontally centered within the site’s usual content width behavior so the section does not feel disconnected from the rest of the page.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The section MUST present the same ordered process steps as today (same count, titles, and descriptions unless separately updated by content owners), in chronological order from first to last.
- **FR-002**: The section MUST use a full-width, horizontally centered layout consistent with how major page sections are aligned elsewhere on the site.
- **FR-003**: The section MUST show a continuous horizontal dashed line (connector) that runs through the step row and visually links all steps as one path.
- **FR-004**: Each step MUST be represented by a circular node centered on the dashed line; the node MUST use a dark fill and a light (e.g., white) border, with the step index (1, 2, …) centered inside the circle.
- **FR-005**: For each step, the title MUST appear bold; the description MUST be legible body text; both MUST be centered under that step’s circular node and read as belonging to that node only.
- **FR-006**: Step positions along the horizontal axis MUST be evenly distributed so spacing between adjacent steps is uniform within normal design tolerance (no arbitrary clustering).
- **FR-007**: Individual steps MUST NOT use card-style containers: no box shadows, no bordered boxes, and no separate background panels behind each step that visually separate it from the section; the section SHOULD feel open and unified, connected by the dashed path.
- **FR-008**: The section MUST retain the site’s existing off-white or cream section background, existing font families, and existing text color system so the block still matches surrounding pages.
- **FR-009**: On narrow viewports, the experience MUST remain understandable: either an approved adaptation that preserves order and association (e.g., horizontal scroll that keeps the path metaphor, or a documented alternate layout that preserves node styling and text alignment rules) following patterns already used for complex horizontal sections on the site, without hiding steps or scrambling order.

### Key Entities

- **Process step**: One item in the ordered flow; has a sequence index, a short title, and a short description shown to visitors.

## Assumptions

- Step copy and count are unchanged unless content is edited outside this feature; this work is presentation and layout only.
- Document order and visual order stay aligned for accessibility (programmatic sequence matches left-to-right flow on LTR pages).
- Motion or animation, if any, is optional and not required for understanding; any motion should remain subtle and respectful of reduced-motion preferences, in line with the site’s therapeutic tone.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: On a desktop-class viewport (the same class the site already targets for multi-column layouts), every step’s number, title, and full description are visible without clipping or overlapping adjacent steps during a standard design review.
- **SC-002**: In a quick qualitative check (e.g., three representative users or internal stakeholders), all participants correctly identify the first step, the last step, and that the steps form a single ordered path—not separate unrelated blocks.
- **SC-003**: Measured horizontal spacing between adjacent step centers on the desktop layout varies by no more than 15% between the largest and smallest gap (equal distribution criterion).
- **SC-004**: For users of screen readers, the sequence of steps encountered in reading order matches the intended process order in 100% of checks performed during accessibility verification for this section.
