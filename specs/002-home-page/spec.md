# Feature Specification: Home Page

**Feature Branch**: `002-home-page`
**Created**: 2026-03-19
**Status**: Draft
**Input**: User description: "Create a high-performance, Server-First Home Page using the established Atomic Component hierarchy and the project's green/off-white color palette."

## Clarifications

### Session 2026-03-19

- Q: Do header nav links (About, Areas of Work, Contact, Services, Blog) anchor-scroll to same-page sections or navigate to separate page routes? → A: All links navigate to **separate pages**. Each section (About, Areas of Work, Contact, Services, Blog) exists as its own route. The home page renders all sections as a preview/overview, but navigation always triggers full page navigation.
- Q: What is the content language of the page? → A: **Turkish only**. All page content, labels, form fields, validation messages, and mock copy MUST be in Turkish.
- Q: Should the contact form have spam prevention? → A: **Honeypot field**. A hidden form field that bots fill but humans don't. Submissions with the field filled are silently rejected. No third-party dependencies required.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - First Impression and Site Navigation (Priority: P1)

A prospective therapy client visits the website for the first time. They MUST
immediately see a calming, professional landing section with a clear value
proposition and prominent calls-to-action. A persistent navigation bar MUST
allow them to jump to any section of the page or to other site areas. A footer
MUST provide contact details and social media links at all times.

**Why this priority**: The hero, header, and footer form the page shell. Without
them, no other section can be reached or contextualised.

**Independent Test**: Load the page in a browser at the root URL. Verify the
hero section renders above the fold with a title, subtitle, and two CTA buttons.
Verify the header is visible and sticky on scroll. Verify the footer contains
contact info and social links.

**Acceptance Scenarios**:

1. **Given** a visitor loads the home page, **When** the page renders, **Then**
   a full-width hero section appears with a background image, a prominent H1
   title, a subtitle, and two call-to-action buttons ("Contact" and "Services").
2. **Given** the hero is visible, **When** the visitor scrolls down, **Then**
   the header navigation remains fixed at the top of the viewport.
3. **Given** the header navigation, **When** the visitor clicks any navigation
   link (Home, About, Areas of Work, Contact, Services, Blog), **Then** the
   page navigates to the corresponding separate page route.
4. **Given** the footer, **When** the visitor scrolls to the bottom, **Then**
   they see a phone number, physical address, email address, site-map links,
   social media icons (Instagram, WhatsApp), and a call-to-action.
5. **Given** the page on a mobile device (< 768px width), **When** the page
   renders, **Then** all elements reflow to a single-column layout and the
   navigation adapts (e.g., hamburger menu or collapsible links).

---

### User Story 2 - Exploring Therapist Information and Services (Priority: P2)

The visitor scrolls past the hero to learn about the therapist, their areas of
clinical expertise, and the specific services offered. The content MUST be
presented in visually distinct sections that are easy to scan and understand
without prior context.

**Why this priority**: Information sections build trust and educate the visitor.
They are essential for conversion but rely on the page shell (US1) being in
place.

**Independent Test**: Scroll down the home page. Verify the About section shows
a two-column layout with text and an image. Verify the Areas of Work section
lists at least 10 clinical areas. Verify the Services section displays a
responsive grid of service cards.

**Acceptance Scenarios**:

1. **Given** the About section, **When** viewed on desktop (>= 1024px), **Then**
   a two-column layout is visible: text/title on the left and a therapist image
   on the right.
2. **Given** the About section on mobile, **When** the viewport is < 768px,
   **Then** the columns stack vertically with the image below the text.
3. **Given** the Areas of Work section, **When** it renders, **Then** at least
   10 clinical area labels are displayed in a flexible tag-cloud or list layout.
4. **Given** the Services section on desktop, **When** it renders, **Then** a
   3-column responsive grid is visible with at least 6 service cards, each
   containing an icon/image, a title, and a short description.
5. **Given** the Services section on mobile, **When** the viewport is < 768px,
   **Then** the grid collapses to a single column.

---

### User Story 3 - Submitting a Contact Inquiry (Priority: P3)

The visitor decides to reach out. They fill in a contact form with their name,
phone number, email, and an optional message, select an office location, and
submit the inquiry. The system validates the input, stores the lead in the
database, and confirms the submission. A map/location placeholder sits alongside
or near the form to reinforce the physical presence of the practice.

**Why this priority**: The contact form is the primary conversion point. It
depends on the page shell (US1) and benefits from the trust built by content
sections (US2), and it uses the existing data layer (leads, offices, statuses).

**Independent Test**: Fill in the contact form with valid data and submit.
Verify the lead appears in the database. Fill in the form with invalid data and
submit. Verify validation errors are displayed inline.

**Acceptance Scenarios**:

1. **Given** the contact form, **When** it renders, **Then** it contains fields
   for name, phone number, email, message (optional), and an office selector
   populated with available offices.
2. **Given** a visitor fills in all required fields with valid data, **When**
   they submit the form, **Then** a success confirmation is displayed and the
   lead is persisted in the database with the default "New" status.
3. **Given** a visitor submits the form with missing or invalid fields (e.g.,
   invalid email format), **When** validation runs, **Then** inline error
   messages appear next to the offending fields and no data is persisted.
4. **Given** the map/location section, **When** the page renders, **Then** a
   placeholder for the office location is visible (a styled container or mock
   image).
5. **Given** a successful form submission, **When** the confirmation is shown,
   **Then** the form fields are reset to their default empty state.

---

### Edge Cases

- What happens when the office list is empty (no offices seeded)? The form
  MUST display a fallback message indicating that office selection is currently
  unavailable.
- What happens when the server action fails (e.g., database unreachable)? The
  form MUST display a user-friendly error message without exposing technical
  details.
- What happens when images fail to load? All images MUST have descriptive alt
  text and the layout MUST not break when images are unavailable.
- What happens when JavaScript is disabled? The page content (server-rendered
  sections) MUST still be visible and readable. The contact form will be
  non-functional as expected for a client-side interactive component.
- What happens when a bot fills the honeypot field? The submission MUST be
  silently rejected (no error displayed, no data persisted) to avoid revealing
  the spam detection mechanism.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The home page MUST render 8 distinct visual sections in order:
  Header, Hero, About, Areas of Work, Services, Contact Form, Map/Location,
  and Footer.
- **FR-002**: The Header MUST be sticky (fixed on scroll) and contain navigation
  links to: Home, About, Areas of Work, Contact, Services, and Blog. Each link
  MUST navigate to its own separate page route.
- **FR-003**: The Hero MUST display a full-width background image, an H1 title,
  a subtitle, and two CTA buttons linking to Contact and Services sections.
- **FR-004**: The About section MUST present a two-column layout on desktop
  (text left, image right) that stacks vertically on mobile.
- **FR-005**: The Areas of Work section MUST display at least 10 clinical area
  labels in a flexible layout.
- **FR-006**: The Services section MUST display at least 6 service cards in a
  responsive grid (3 columns on desktop, 1 on mobile), each with an icon/image,
  title, and description.
- **FR-007**: The Contact Form MUST collect name, phone number, email, optional
  message, and office selection.
- **FR-008**: The Contact Form MUST validate all input before submission and
  display inline error messages for invalid fields.
- **FR-009**: On valid submission, the Contact Form MUST persist a new lead
  record in the database with the default "New" status and display a success
  confirmation.
- **FR-010**: The Map/Location section MUST render a placeholder container for
  the office location.
- **FR-011**: The Footer MUST display a phone number, physical address, email,
  site-map links, social media icons (Instagram, WhatsApp), and a CTA.
- **FR-012**: All navigation links MUST use centralized route definitions (no
  hardcoded URL strings).
- **FR-013**: All images MUST include descriptive alt text and use optimized
  loading (priority for hero, lazy for below-fold).
- **FR-014**: Every section MUST be mobile-first and fully responsive across
  all standard breakpoints.
- **FR-015**: The Contact Form MUST include a hidden honeypot field. If the
  honeypot field contains a value on submission, the form MUST silently reject
  the submission without persisting any data.

### Key Entities

- **Lead**: A contact form submission containing name, phone, email, optional
  message, and office selection. Stored in the existing data layer.
- **Office**: Office locations displayed in the contact form dropdown. Sourced
  from the existing data layer.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The home page loads and displays all 8 sections within 3 seconds
  on a standard broadband connection.
- **SC-002**: All navigation links correctly route the visitor to the
  corresponding section or page.
- **SC-003**: The contact form successfully creates a lead record in the
  database when submitted with valid data.
- **SC-004**: 100% of invalid form submissions are caught by validation with
  inline error messages before any data is persisted.
- **SC-005**: All 8 sections display correctly on mobile (375px), tablet
  (768px), and desktop (1280px) viewports with no horizontal overflow or broken
  layouts.
- **SC-006**: The hero section background image and all content render above
  the fold on desktop without requiring any scroll.
- **SC-007**: The page content (excluding the contact form) is fully readable
  with JavaScript disabled.

### Assumptions

- The data layer (Lead, Office, Status models and services) is already
  implemented and operational from the `001-backend-data-layer` feature.
- Placeholder/mock data will be used for: therapist bio text, clinical area
  labels, service descriptions, background images, and therapist photo.
- The office selector in the contact form will be populated from the seeded
  Office records.
- The green/off-white color palette will be configured as design tokens and
  applied globally — no hardcoded color values in components.
- Social media links (Instagram, WhatsApp) will use placeholder URLs that can
  be replaced with real ones later.
- All page content, UI labels, form field labels, validation error messages,
  and placeholder/mock copy MUST be written in Turkish. The HTML lang attribute
  MUST be set to "tr".
