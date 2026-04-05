# Feature Specification: Services detail, routing, and legal copy

**Feature Branch**: `016-services-detail-routing-legal`  
**Created**: 2026-04-05  
**Status**: Draft  
**Input**: User description: "1. Component Architecture Changes — New ServiceListDetailed with larger cards than the standard services list; each card includes a detailed description and a bullet list of specific features/points. Home page (`/`) shows only the original standard services list; services page (`/hizmetler`) uses the detailed presentation instead of the standard list. On the home page, the Areas of Work section is not shown (implementation may retain source for later use, marked as unused). Remove the `/calisma-alanlari` page entirely. Footer: add Turkish disclaimer: "Verilen tüm hizmetler danışmanlık kapsamındadır, psikiyatrik müdahale yapılmamaktadır." Globally replace user-visible copy "terapi" with "danışmanlık" where it refers to service type, without changing non-display identifiers in code."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Clear legal scope and consistent wording (Priority: P1)

A visitor reads the site and immediately understands that offerings are within a counseling scope and that psychiatric intervention is not provided; they also see consistent public wording that matches that positioning (including the preferred term for the type of support).

**Why this priority**: Reduces misunderstanding of service scope and aligns public language with how services are framed legally and professionally.

**Independent Test**: Review any page that shows the site footer and sample body copy; confirm the disclaimer appears and that visible wording uses the agreed term instead of the legacy term where applicable.

**Acceptance Scenarios**:

1. **Given** a page that includes the global footer, **When** the visitor scrolls to the footer, **Then** they see the exact disclaimer sentence specified in the requirements.
2. **Given** user-visible marketing or explanatory text that previously used the legacy term for the service type, **When** the visitor reads that text, **Then** the preferred term appears instead, except where unchanged text is required by law or external quotation.

---

### User Story 2 - Right level of detail on each page (Priority: P2)

A visitor opens the home page and sees a compact services overview; when they open the dedicated services page, they see a richer layout with longer descriptions and bullet points per service.

**Why this priority**: Matches information depth to intent (overview vs. deep read) and supports conversion without overwhelming the home page.

**Independent Test**: Compare home and services pages side by side; confirm layout depth and content elements differ as specified.

**Acceptance Scenarios**:

1. **Given** the visitor is on the home page, **When** they view the services section, **Then** they see the standard (more compact) services presentation only—not the detailed layout.
2. **Given** the visitor is on the services page, **When** they view the services section, **Then** each service is shown in a larger card style than on the home page, including a narrative description and a bullet list of specific features or points at the bottom of the card.

---

### User Story 3 - Retired areas-of-work entry points (Priority: P3)

A visitor no longer sees an “areas of work” section on the home page and cannot open a standalone “areas of work” page at the old address.

**Why this priority**: Simplifies navigation and removes a redundant or paused surface while avoiding confusion from dead UI.

**Independent Test**: Load the home page and attempt to open the former areas-of-work URL; confirm the section is absent and the old path does not serve that page.

**Acceptance Scenarios**:

1. **Given** the visitor is on the home page, **When** they scan the page, **Then** the areas-of-work block does not appear.
2. **Given** the visitor (or an old bookmark) requests the former `/calisma-alanlari` path, **Then** the site does not present the old areas-of-work page (normal “not found” behavior for unknown or removed pages is acceptable).

---

### Edge Cases

- A visitor follows an external link or bookmark to the removed path: they should not see the previous page content; stakeholders accept standard not-found handling unless a future initiative adds redirects.
- A service has a long description: text should remain readable within the card (wrapping, spacing) without breaking layout.
- Copy changes must not alter user-visible strings that are legally fixed quotes or third-party citations.
- Terminology replacement must not change internal identifiers, configuration keys, or analytics event names that are not shown to users—only visitor-facing copy in scope.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: On the home page, the services area MUST show only the standard (compact) services presentation; the detailed services presentation MUST NOT appear there.
- **FR-002**: On the services page (`/hizmetler`), the services area MUST use the detailed presentation: visually larger cards than the home standard, each including a full descriptive paragraph (or equivalent narrative block) and a bullet list of specific features or points beneath it.
- **FR-003**: The home page MUST NOT display the areas-of-work section to visitors; the underlying implementation MAY remain in the codebase for future use but MUST NOT render on the home page.
- **FR-004**: The standalone route or page for “areas of work” at `/calisma-alanlari` MUST be removed from the product so that path no longer delivers that page.
- **FR-005**: Every page that shows the site footer MUST include the following Turkish sentence verbatim in the footer: Verilen tüm hizmetler danışmanlık kapsamındadır, psikiyatrik müdahale yapılmamaktadır.
- **FR-006**: All user-visible copy in scope (including placeholder or demo text in UI components) MUST use "danışmanlık" instead of "terapi" where the text refers to the type of professional support offered, without renaming non-display code identifiers when avoidable.

### Key Entities

- **Service offering (public)**: A service as shown to visitors—title, narrative description for the detailed view, and a list of highlight bullets; the same logical services may appear in both standard and detailed presentations.
- **Footer legal notice**: A short, fixed statement clarifying that services are within counseling scope and that psychiatric intervention is not provided.

### Assumptions

- The catalog of services (which services exist) stays the same unless separately changed; this feature changes how they are presented and how copy is worded.
- Removing `/calisma-alanlari` without a redirect is acceptable for this release.
- “Dummy” or placeholder text in components counts as user-visible copy for the terminology rule unless it is clearly non-Turkish demo content where the replacement would be inappropriate.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: On 100% of pages that include the footer, the disclaimer sentence appears exactly as specified (character-by-character check on a defined page set: home, services, and at least two other representative pages).
- **SC-002**: On the services page, 100% of listed services include both a narrative description block and a non-empty bullet list in the detailed card layout.
- **SC-003**: On the home page, the areas-of-work section is absent in 100% of checks; the standard services presentation is present and the detailed card layout is absent.
- **SC-004**: A controlled review of in-scope Turkish UI strings finds zero remaining inappropriate uses of the legacy term where the preferred term applies (sampling method: search planned copy inventory or walkthrough of main user flows).
- **SC-005**: Requests to the former `/calisma-alanlari` path do not return the previous page’s primary content (verified by manual or scripted check agreed with delivery).
