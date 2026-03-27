# Feature Specification: Header, Areas of Work Imagery, and Calm UI

**Feature Branch**: `013-header-areas-work-ui`  
**Created**: 2026-03-27  
**Status**: Draft  
**Input**: User description: "I want you to adjust header to be taller, and navigation menu on header should be in the middle instead of right most as it is now. Texts on the header should be a bit bigger, and they should be in a dark reen color instead of plain black. Also, use a stock photo that is not used anywhere else in the app on areas of work component. Use /therapist-ui-designer to improve ui."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Clearer, calmer site header (Priority: P1)

A visitor opens any page with the site header and immediately sees a taller bar with navigation grouped in the horizontal center, larger link text in a dark green tone, and a layout that feels balanced and easy to scan.

**Why this priority**: The header is persistent and drives wayfinding; legibility, hierarchy, and a calm first impression directly support trust and task completion.

**Independent Test**: Open a page with the header; verify increased vertical presence, centered navigation cluster, larger text, and dark green (not black) header copy without visiting other sections.

**Acceptance Scenarios**:

1. **Given** a page that shows the global header, **When** the visitor views the header at a typical desktop width, **Then** the primary navigation links appear as a centered group within the header (not flush to the trailing edge).
2. **Given** the same header, **When** the visitor compares it to the prior design baseline, **Then** the header bar is visibly taller and link text is visibly larger while remaining proportional to the logo or site title.
3. **Given** header links and labels, **When** the visitor inspects their color, **Then** the default text color reads as dark green rather than black or near-black, and remains comfortably readable on the header background.

---

### User Story 2 - Distinct, trustworthy imagery in Areas of Work (Priority: P2)

A visitor scrolls to the Areas of Work section and sees supportive stock photography that is used only in that section, reinforcing professionalism and emotional safety.

**Why this priority**: Unique imagery avoids repetition, signals care in presentation, and supports the therapeutic tone of the practice.

**Independent Test**: Load the home (or hosting) page, locate Areas of Work, confirm one primary stock image and verify by site-wide review that the same image asset is not reused elsewhere.

**Acceptance Scenarios**:

1. **Given** the Areas of Work section is visible, **When** the visitor views its visual treatment, **Then** it includes stock photography appropriate to a professional mental-health context.
2. **Given** a full pass over all public pages, **When** the auditor lists every distinct hero, portrait, or section image asset, **Then** the Areas of Work stock image path or file does not duplicate any other in-app usage.

---

### User Story 3 - Therapeutic visual polish (Priority: P3)

A visitor perceives the updated header and Areas of Work presentation as calm, spacious, and consistent with a trustworthy therapy brand—including clear focus states for anything clickable in the header.

**Why this priority**: Micro-interactions and spacing reduce cognitive load and align with expectations for healthcare-adjacent sites.

**Independent Test**: Tab through header links and observe focus visibility; review spacing, corners, and hierarchy against a short calm-UI checklist.

**Acceptance Scenarios**:

1. **Given** keyboard navigation, **When** the visitor moves focus through header links, **Then** each focused control shows a visible focus indicator.
2. **Given** the updated header and Areas of Work block, **When** a stakeholder reviews against a calm-brand rubric (breathing room, soft geometry, non-aggressive accents), **Then** the presentation passes without requiring major rework.

---

### Edge Cases

- Very narrow viewports: centered navigation must remain usable (wrapping, scroll, or an agreed mobile pattern) without losing access to links.
- Long site titles or many nav items: layout must not overlap the logo and nav or clip text; hierarchy stays clear.
- Slow networks: image in Areas of Work should degrade gracefully (e.g., reserved space, alt text) without breaking layout.
- User system settings: increased text size or high-contrast modes should not make header text unreadable or clipped.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site header MUST increase its vertical size (padding and/or min height) relative to the prior baseline so the bar feels clearly taller on typical viewports.
- **FR-002**: The primary navigation group MUST be horizontally centered within the header content area (not aligned to the trailing edge as in the prior layout).
- **FR-003**: Header navigation and related header text MUST use a larger typographic size than the prior baseline while preserving clear hierarchy with branding.
- **FR-004**: Default header text color MUST be a dark green (user intent: “dark green,” not plain black), chosen so normal-sized header copy remains comfortably readable on the header background.
- **FR-005**: The Areas of Work section MUST display stock photography that is not reused anywhere else on the public site (unique asset per site-wide inventory).
- **FR-006**: The Areas of Work section and the updated header MUST follow calm, trustworthy presentation principles: generous spacing, soft contours where appropriate, clear visual hierarchy, and tactile but restrained emphasis for primary actions present in these regions.
- **FR-007**: All interactive header controls MUST expose a visible keyboard focus state.

### Assumptions

- Branding (logo or site name) remains in its established horizontal position; only the navigation cluster is re-centered as specified.
- The new stock image will be licensed or rights-cleared for site use and suitable for a therapy practice context.
- “Dark green” permits any specific shade that satisfies readability on the chosen header background.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Stakeholder review confirms the header is visibly taller than the prior release on a standard desktop preview.
- **SC-002**: Design or QA review confirms the navigation cluster is horizontally centered in the header at desktop widths (not trailing-aligned).
- **SC-003**: Typography review confirms header link text is at least one step larger than the prior baseline on the project’s agreed type scale.
- **SC-004**: A site-wide image inventory shows zero duplicate use of the Areas of Work stock image asset outside that section.
- **SC-005**: At least 90% of participants in an informal three-person stakeholder or internal review rate the updated header and Areas of Work as “calmer” or “more professional” than the prior version on a simple before/after comparison.
