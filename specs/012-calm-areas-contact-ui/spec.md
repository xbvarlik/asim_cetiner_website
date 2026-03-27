# Feature Specification: Calm areas background and modern contact inputs

**Feature Branch**: `012-calm-areas-contact-ui`  
**Created**: 2026-03-27  
**Status**: Draft  
**Input**: User description: "I want @components/feature/areas-of-work.tsx component to have a backround stock image that is calm (not the same image in the hero) behind the tags. Also, The contact form input fields should be taller, more modern. Use /therapist-ui-designer skill to improve UI on said components."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Calm, distinct backdrop for specialty tags (Priority: P1)

A visitor reading the site wants the “areas of work” section to feel calm and visually rich without competing with the hero. They see a soft photographic or illustrative background behind the list of specialty tags, clearly different from the main hero imagery, while every tag label stays easy to read.

**Why this priority**: This section communicates scope of practice; poor contrast or a harsh background would undermine trust and readability.

**Independent Test**: Open the page containing the areas-of-work section; confirm a calm background image appears behind the tag cluster, verify tag text remains readable at typical phone and desktop widths, and confirm the image is not the same as the primary hero image on that page.

**Acceptance Scenarios**:

1. **Given** a page that includes the areas-of-work section and a hero with a prominent image, **When** the visitor scrolls to the areas-of-work section, **Then** they see a calm background treatment behind the tags that uses a different image (or distinct artwork) than the hero’s primary image.
2. **Given** the areas-of-work section is visible, **When** the visitor reads any tag label, **Then** the label meets comfortable reading contrast against its immediate background (including any overlay or chip styling).
3. **Given** a narrow mobile viewport, **When** tags wrap across multiple lines, **Then** the background and tags remain visually balanced and labels stay legible.

---

### User Story 2 - Comfortable, modern contact form fields (Priority: P2)

A visitor who wants to reach out uses the contact form. Input areas feel tall enough to tap and type comfortably, with a contemporary, calm appearance consistent with a professional therapy practice—not cramped or dated.

**Why this priority**: The form is a primary conversion path; field size and polish directly affect completion confidence and perceived quality.

**Independent Test**: Open any screen that shows the shared contact inquiry form; compare field height and visual style to the prior baseline; submit a valid entry and confirm success behavior is unchanged.

**Acceptance Scenarios**:

1. **Given** the contact form is displayed, **When** the visitor focuses each visible text input and the message area, **Then** fields appear visibly taller than the previous default and spacing feels consistent with a modern form layout.
2. **Given** the contact form on a touch device, **When** the visitor taps a field or control, **Then** interactive targets feel easy to hit without accidental adjacent taps.
3. **Given** the visitor submits the form with valid data, **When** the server accepts the submission, **Then** the same success feedback and downstream behavior as before the change still occur (no regression in submission outcome).

---

### Edge Cases

- Very slow loading of the background image: foreground content (heading, tags) should still be usable; avoid a layout that collapses or hides tags until the image loads unless a neutral fallback is shown.
- Strong user contrast preferences (e.g., high-contrast mode): tag text and form labels remain readable; focus indicators remain visible.
- Long tag labels or many tags: wrapping must not clip text or break the calm layout.
- Form validation errors: error messages remain associated with fields and readable after field styling changes.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The areas-of-work section MUST present a calm, non-distracting background image or illustration behind the cluster of specialty tags (not only a flat solid color), suitable for a mental-health professional brand.
- **FR-002**: The background used in the areas-of-work section MUST NOT be the same image as the primary hero image on the same page (a distinct asset or clearly different crop/treatment is acceptable if the underlying library image is shared, as long as the visitor perceives a different visual).
- **FR-003**: Tag labels and section heading MUST remain readable on all supported viewports; if the background is busy, an overlay, blur, or chip treatment MUST be used so text maintains at least WCAG 2.1 AA contrast for normal body-sized text where applicable.
- **FR-004**: The contact inquiry form’s visible text inputs, textarea, and select trigger MUST use a taller vertical layout than the current baseline so fields feel modern and comfortable for mouse and touch use.
- **FR-005**: Updated form styling MUST preserve existing field names, validation rules, accessibility semantics (labels, errors, required indicators), and submission behavior—presentation-only changes.
- **FR-006**: Interactive controls in the contact form (including focus states) MUST remain clearly visible for keyboard and pointer users, consistent with a calm, trustworthy visual language (no harsh motion or low-contrast focus).

### Assumptions

- A suitable licensed or owned stock-style image will be supplied or chosen from existing site assets, distinct from the hero asset.
- “Modern” field appearance implies increased height, generous padding, and cohesive radius or borders aligned with the site’s design system—not a redesign of form logic or copy.
- Therapeutic UI guidance (calm palette, soft shapes, readable type, subtle depth) applies to these two surfaces only within this feature unless otherwise specified.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: On a standard phone and desktop viewport, representative users (or structured review) can read all areas-of-work tag labels without reported difficulty; automated contrast checks for tag text against its rendered background pass WCAG 2.1 AA for normal text where tooling applies.
- **SC-002**: Stakeholder or design review confirms the areas-of-work background is visually calmer than a high-energy marketing photo and is not the same image as the page hero’s primary image.
- **SC-003**: Contact form text fields and textarea measure at least 20% greater minimum tap/click height than the pre-change baseline on the same viewport (or meet a 44×44 CSS pixel minimum for primary interactive targets, whichever the product already standardizes on).
- **SC-004**: In a smoke test of ten valid form submissions (or equivalent test passes), success rate and server-side acceptance match the pre-change behavior (100% parity for successful submissions under the same inputs).
