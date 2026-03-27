# Feature Specification: About Section Subtle Motion & Portrait

**Feature Branch**: `010-about-motion-portrait`  
**Created**: 2026-03-27  
**Status**: Draft  
**Input**: User description: "Make the About section feel slightly ‘in motion’ with restrained animation; use the approved therapist stock portrait in the image area; align styling with a calm, trustworthy therapeutic presentation."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Discover the therapist with a calm, living presentation (Priority: P1)

A visitor reads the marketing site and reaches the About section. They see the therapist’s professional portrait and supporting copy. Gentle, restrained motion (for example on entry or light emphasis on the image area) makes the section feel modern and human without pulling attention away from the message.

**Why this priority**: The About block is a primary trust signal; the portrait and first impression directly support credibility and conversion.

**Independent Test**: Open the public page containing the About section, observe the portrait and motion in a standard desktop or mobile viewport, and confirm the experience feels professional and readable.

**Acceptance Scenarios**:

1. **Given** a visitor viewing the About section, **When** the section becomes visible, **Then** the designated professional portrait appears in the image area and any motion is noticeable but subtle.
2. **Given** a visitor reading the About copy, **When** they focus on text, **Then** motion does not prevent reading or obscure primary content.
3. **Given** a visitor viewing the section on a typical phone width, **When** the layout reflows, **Then** the portrait and text remain coherent and the motion behavior remains appropriate for the smaller viewport.

---

### User Story 2 - Comfortable experience when motion is reduced (Priority: P2)

A visitor who prefers less animation (system or browser setting) still sees the same information and portrait, without continuous or distracting movement.

**Why this priority**: Respecting motion preferences supports accessibility expectations and reduces risk of discomfort for sensitive users.

**Independent Test**: Enable reduced-motion preference on the device, reload the page, open the About section, and confirm looping or strong motion is not imposed.

**Acceptance Scenarios**:

1. **Given** reduced-motion preference is enabled, **When** the visitor views the About section, **Then** the experience avoids continuous or repeating movement that would normally violate that preference.
2. **Given** reduced-motion preference is enabled, **When** the visitor uses keyboard navigation, **Then** focusable elements remain clearly visible and usable.

---

### Edge Cases

- **Slow or failed image load**: Layout should not collapse in a way that hides critical copy; a sensible placeholder or reserved space behavior should keep reading order intact.
- **Very small viewports**: Portrait and text stack or scale without clipping the face or crushing line length beyond comfortable reading.
- **High zoom / large text**: Content remains readable and interactive targets remain usable where applicable.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The About section MUST display the approved therapist professional portrait as the primary image in the designated image area of that section.
- **FR-002**: The section MAY use subtle motion (e.g., gentle entrance, light hover feedback, or very slow ambient emphasis) MUST remain secondary to typography and message; motion MUST NOT feel flashy, rapid, or game-like.
- **FR-003**: The visual treatment of the About section MUST align with a calm, trustworthy therapeutic brand impression: soft containment for imagery, comfortable spacing, and readable body text.
- **FR-004**: All interactive elements in the About section MUST remain operable with a keyboard and MUST show a clear visible focus state.
- **FR-005**: The section MUST respect the visitor’s reduced-motion preference when exposed by the user agent or platform, by avoiding inappropriate continuous or repeating movement in that mode.
- **FR-006**: Scope is limited to presentation of the existing About section; existing factual copy, links, and conversion paths MUST remain functionally unchanged unless explicitly expanded in a future spec.

### Assumptions

- The designated portrait asset is approved for public marketing and is the single source of truth for this section’s photo.
- No new backend data or CMS fields are required; this is a presentation update within the current site structure.
- “Subtle” is interpreted as short, slow transitions or minimal repetition, validated by stakeholder review (see Success Criteria).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In normal browsing conditions, every successful page view that includes the About section shows the approved portrait in the image area (when the asset is reachable).
- **SC-002**: In a short internal review panel (at least four participants), at least three describe the motion as subtle or restrained, and none rate it as “distracting” or “too busy” for a therapy brand.
- **SC-003**: With reduced-motion preference enabled on the device, observers confirm the About section does not present continuous looping movement that ignores that preference.
- **SC-004**: Heuristic or checklist review confirms primary About headings and first paragraph of body copy remain readable without overlap from imagery or motion artifacts at common breakpoints (mobile, tablet, desktop).
