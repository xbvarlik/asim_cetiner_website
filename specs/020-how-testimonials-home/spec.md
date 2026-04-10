# Feature Specification: Home copy refresh and trust sections

**Feature Branch**: `020-how-testimonials-home`  
**Created**: 2026-04-10  
**Status**: Draft  
**Input**: User description: "Implement a few adjustments and two new sections. Descriptions in docs/info.md. Replace placeholders with provided copy for all titled blocks except Extra Field Requests. Add HowItWorks (Süreç Nasıl İşliyor?) and Testimonials (Danışan Yorumları) on the home page; testimonials as a carousel with comments and anonymized name style (e.g. John D.); slow right-to-left motion; UI consistent with calm, trustworthy practice branding and existing site colors."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Accurate practice information site-wide (Priority: P1)

A prospective client opens the site and reads the title, introduction, about narrative, services description, FAQ, office address, and contact details. All of this content matches the approved copy source (docs/info.md) so nothing misleading or placeholder remains.

**Why this priority**: Correct clinical and contact information is essential for trust and for clients to reach the practice.

**Independent Test**: Replace copy only (no new sections) and verify each surface shows the exact intended text for title, subtitle, about, services, FAQ, address, and contact block.

**Acceptance Scenarios**:

1. **Given** the public site, **When** a visitor views the main hero or page title area, **Then** they see the title and subtitle text as specified in the copy source.
2. **Given** the public site, **When** a visitor reads the about section, **Then** they see the full about narrative from the copy source without placeholder tokens.
3. **Given** the public site, **When** a visitor reads services content, **Then** they see the services text from the copy source, structured for readability.
4. **Given** the public site, **When** a visitor reads FAQ content, **Then** they see the questions and answers from the copy source.
5. **Given** the public site, **When** a visitor looks for location or contact, **Then** they see the office address and contact information exactly as in the copy source (phone, email, social handle as provided).

---

### User Story 2 - Understand the therapy process at a glance (Priority: P2)

A visitor on the home page sees a clearly labeled section (e.g. “Süreç Nasıl İşliyor?”) that explains the therapy journey in four to five ordered steps, written in plain language appropriate for prospective clients.

**Why this priority**: Reduces anxiety and sets expectations before booking.

**Independent Test**: With only this section added, a reviewer can confirm step count, order, headings, and that wording describes the process end-to-end without requiring prior clinical knowledge.

**Acceptance Scenarios**:

1. **Given** the home page, **When** a visitor scrolls to the process section, **Then** they see a section title aligned with “Süreç Nasıl İşliyor?” (or equivalent agreed wording).
2. **Given** the process section, **When** a visitor counts the steps, **Then** there are at least four and at most five distinct steps.
3. **Given** each step, **When** a visitor reads it, **Then** the step has a short label and supporting text that fits the overall therapy journey (e.g. from first contact through ongoing work).

---

### User Story 3 - Social proof via testimonials (Priority: P3)

A visitor on the home page sees a “Danışan Yorumları” (or equivalent) area showing multiple client comments as cards in a horizontally scrolling presentation. Quotes move slowly from right to left so the row feels alive without rushing. Each card shows the comment and an anonymized display name in an initials-style pattern (e.g. “John D.”).

**Why this priority**: Builds trust after basic facts and process are clear.

**Independent Test**: Confirm multiple testimonial cards, readable text, names anonymized, and observable slow horizontal movement when motion is not reduced by the visitor’s system preferences.

**Acceptance Scenarios**:

1. **Given** the home page, **When** a visitor views the testimonials section, **Then** they see a heading aligned with “Danışan Yorumları” and more than one testimonial card.
2. **Given** a testimonial card, **When** a visitor reads it, **Then** they see a client comment and a short anonymized name (initials-style), not a full identifiable name unless explicitly approved elsewhere.
3. **Given** default viewing conditions (no reduced-motion preference), **When** a visitor watches the testimonial area for several seconds, **Then** the content drifts slowly horizontally in a right-to-left direction in a continuous or smoothly repeating manner.
4. **Given** a visitor who has indicated a preference for reduced motion at the system or browser level, **When** they view the testimonials section, **Then** automatic horizontal movement is suppressed or replaced with a static or user-controlled presentation so content remains readable and comfortable.

---

### Edge Cases

- Very long paragraphs (about, services, FAQ) on narrow screens: text must wrap and remain readable without horizontal clipping.
- If testimonial count is small: layout must not break; movement or grouping must still look intentional.
- Contact block includes multiple channels (phone, email, social): each must be distinguishable and usable (e.g. tappable phone, mailto where appropriate).
- Turkish typography: special characters and punctuation from the source copy must display correctly everywhere that copy appears.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The public site MUST display the page title and subtitle using the exact strings defined under Title and Subtitle in the approved copy source.
- **FR-002**: The about section MUST display the full About narrative from the approved copy source, replacing any placeholder or draft text.
- **FR-003**: The services presentation MUST use the Services content from the approved copy source, preserving meaning and structure (headings, lists, and sections as provided).
- **FR-004**: The FAQ presentation MUST use the FAQ content from the approved copy source (questions and answers), replacing any placeholders.
- **FR-005**: The office location MUST show the Office Addresses string from the approved copy source wherever the practice address is shown.
- **FR-006**: Contact information MUST show phone, email, and Instagram handle as specified under Contact Information in the approved copy source, without omitting or altering digits or spelling unless a separate legal edit is approved.
- **FR-007**: The home page MUST include a “how it works” / therapy process section titled in line with “Süreç Nasıl İşliyor?”, containing four to five ordered steps that describe the therapy process for prospective clients.
- **FR-008**: The home page MUST include a testimonials section titled in line with “Danışan Yorumları”, presenting multiple testimonial cards (quote plus anonymized display name in initials-style form).
- **FR-009**: Under default conditions, the testimonials area MUST exhibit slow, continuous or smoothly repeating horizontal motion of the testimonial content from right to left, readable at normal viewing distance.
- **FR-010**: When the visitor’s environment signals a preference for reduced motion, the testimonials area MUST not force continuous auto-motion; it MUST offer an equivalent static or user-controlled experience.
- **FR-011**: New and updated sections MUST follow the same visual tone as the rest of the site: calm spacing, soft containment of trust-related content, clear hierarchy, and sufficient color contrast for text and interactive elements so the page remains accessible.

### Key Entities

- **Copy block**: A discrete piece of site text (title, subtitle, about body, services body, FAQ set, address line, contact lines) sourced from the approved document.
- **Process step**: An ordered item in the therapy process section: short title and explanatory text for that stage.
- **Testimonial**: A client quote paired with an anonymized display name for public display.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A content reviewer can compare the live site to the approved copy source and confirm zero placeholder tokens remain in title, subtitle, about, services, FAQ, address, and contact surfaces.
- **SC-002**: At least 90% of pilot viewers (e.g. internal stakeholders) agree on first pass that the process section is “easy to understand” without extra explanation (brief 3-point survey or equivalent).
- **SC-003**: On a standard phone and desktop viewport, all body text in updated sections remains readable without zoom (minimum comfortable reading size for primary paragraphs, no clipped overflow).
- **SC-004**: In default mode, testimonial horizontal motion completes a full visible cycle (or seamless loop) over a duration perceived as slow (e.g. no faster than one full pass across the visible area in approximately 30 seconds unless adjusted for readability), without strobing or jitter that distracts from reading.
- **SC-005**: With reduced-motion preference enabled in the test environment, no automatic horizontal scrolling or drifting of testimonials is required to consume the testimonials; all quotes remain reachable without discomfort.

## Assumptions & Dependencies

- **Assumption**: Step-by-step therapy process wording will be drafted in Turkish to match practice tone; exact sentences are authored during implementation but must stay within four to five steps and align with common first-contact → ongoing therapy expectations.
- **Assumption**: Testimonial quotes will be supplied or approved as sample marketing text if real client quotes are not yet available; display names remain anonymized in initials style.
- **Dependency**: Approved canonical copy remains docs/info.md (or a successor file explicitly marked as source of truth) for all non–Extra Field Requests sections.
- **Dependency**: Existing global brand colors and typography scale of the site remain the baseline; this feature adjusts content and adds sections without changing the overall palette unless separately approved.
