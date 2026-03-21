# Feature Specification: Site Routing & SEO Landing Pages

**Feature Branch**: `003-routing-seo-pages`
**Created**: 2026-03-20
**Status**: Draft
**Input**: User description: "Implement the remaining application routing structure and subpages by reusing existing Feature Components and maintaining a DRY architecture."

## Clarifications

### Session 2026-03-21

- Q: What are the canonical URL paths for the four primary section pages (About, Areas of Work, Services, Contact)? → A: **Turkish slugs** as defined in FR-001: `/hakkinda`, `/calisma-alanlari`, `/hizmetler`, `/iletisim`. English paths (`/about`, etc.) are **not** canonical for this product.
- Q: Should legacy or superseded URLs automatically redirect to the new canonical paths? → A: **Out of scope for this feature.** No HTTP redirects are required. Visitors using bookmarks or links to non-canonical or retired URLs may get a not-found experience until a **separate** redirect or migration story is delivered.
- Q: What should the main home page (`/`) show versus the dedicated section URLs? → A: **Full multi-section home on `/`** — the main entry continues to present the full scroll experience (hero, about, areas of work, services, contact, map, etc. in one page). Each dedicated section URL (`/hakkinda`, `/calisma-alanlari`, `/hizmetler`, `/iletisim`) focuses on **that section only** for sharing and deep linking. SEO landing pages follow the **same full structure as home** with variant hero title and subtitle only.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Dedicated Section Pages (Priority: P1)

A visitor clicks a primary navigation item (About, Areas of Work, Services, or
Contact) and lands on a dedicated page that shows the same content they would
expect from that section, without scrolling through a long single-page layout.
The site header and footer remain consistent with the rest of the site.

**Why this priority**: Correct URLs and dedicated pages are required for
bookmarking, sharing, and clear information architecture before any SEO
experimentation.

**Independent Test**: Open each of the four URLs directly in a browser. Each
page MUST show the correct primary content for that topic and the same global
chrome (header and footer) as the home page.

**Acceptance Scenarios**:

1. **Given** a visitor opens the About URL path, **When** the page loads,
   **Then** they see the About content as the main focus of the page.
2. **Given** a visitor opens the Areas of Work URL path, **When** the page
   loads, **Then** they see the Areas of Work content as the main focus.
3. **Given** a visitor opens the Services URL path, **When** the page loads,
   **Then** they see the Services list content as the main focus.
4. **Given** a visitor opens the Contact URL path, **When** the page loads,
   **Then** they see both the contact form and the map/location placeholder
   section together on that page.
5. **Given** any of these pages, **When** the visitor uses header or footer
   navigation, **Then** all links resolve to the new canonical paths (no broken
   or obsolete URLs for these primary destinations).

---

### User Story 2 - Keyword-Oriented Landing Pages (Priority: P2)

A prospective client searches for a specific service or location (e.g., couple
therapy, cognitive behavioral therapy, or a district plus psychologist). They
land on a page that looks and behaves like the main home experience but with
headline and supporting text tailored to that search intent, and page-level
information that helps them understand they are in the right place.

**Why this priority**: Improves discoverability and conversion from search
traffic while reusing the same trusted layout and components as the main site.

**Independent Test**: Open each of the five SEO landing URLs. Each MUST render
the same overall page structure as the home page, with a unique visible hero
headline and subtitle, and unique page title/description when viewed in the
browser tab or shared preview.

**Acceptance Scenarios**:

1. **Given** the Istanbul psychologist landing URL, **When** the page loads,
   **Then** the hero shows copy aligned to that intent and the page has distinct
   title and description from the generic home page.
2. **Given** the couple therapy landing URL, **When** the page loads, **Then**
   the hero reflects couple therapy and metadata differs from other variants.
3. **Given** the cognitive behavioral therapy landing URL, **When** the page
   loads, **Then** the hero reflects that modality and metadata is unique.
4. **Given** the Üsküdar psychologist landing URL, **When** the page loads,
   **Then** the hero reflects that locality and metadata is unique.
5. **Given** the Beşiktaş psychologist landing URL, **When** the page loads,
   **Then** the hero reflects that locality and metadata is unique.
6. **Given** any SEO landing page, **When** compared to the home page layout,
   **Then** section order and global chrome match the home page pattern (no
   duplicate reimplementation of header, hero shell, or footer behavior).

---

### User Story 3 - Consistent Navigation & Single Source of Truth (Priority: P3)

Across the site, visitors always reach the same destinations from header,
footer, hero calls-to-action, and in-page links—there is one agreed list of
paths for each logical destination.

**Why this priority**: Prevents confusion, broken links, and duplicate
maintenance when routes change.

**Independent Test**: From the home page, SEO pages, and section pages, click
every primary navigation and hero CTA. Each MUST navigate to the path defined
in the central route registry (no hardcoded alternate paths for the same
logical page).

**Acceptance Scenarios**:

1. **Given** the central route registry lists a path for Contact, **When** any
   site chrome or hero CTA targets Contact, **Then** it uses that path only.
2. **Given** the central route registry lists paths for About, Services, and
   Areas of Work, **When** header and footer links reference those sections,
   **Then** they use the registry values only.

---

### Edge Cases

- What happens if a visitor bookmarks an old URL that no longer matches the
  canonical path? **This feature does not include redirects.** Unsupported legacy
  URLs may show a not-found experience until a future release adds explicit
  redirects or aliases.
- What happens when two pages need the same visual structure but different
  wording? A single reusable page pattern MUST supply the variable text so
  layout does not diverge.
- What happens if metadata is missing on a new page? Every routable page in
  this feature MUST have a defined title and description before release.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The application MUST expose dedicated URL paths for About, Areas
  of Work, Services, and Contact under the main public site area, using the
  paths: `/hakkinda`, `/calisma-alanlari`, `/hizmetler`, and `/iletisim`.
- **FR-002**: The About page MUST present only the About content as its primary
  body, using the same About experience already used elsewhere on the site.
- **FR-003**: The Areas of Work page MUST present only the Areas of Work
  content as its primary body, using the same experience already used
  elsewhere.
- **FR-004**: The Services page MUST present only the Services list content as
  its primary body, using the same experience already used elsewhere.
- **FR-005**: The Contact page MUST present the contact inquiry form and
  map/location placeholder together, using the same experiences already used
  elsewhere.
- **FR-006**: All pages in this feature MUST share the same global header and
  footer as the main site entry experience, with no conflicting duplicate
  wrappers that break consistency.
- **FR-007**: The application MUST expose exactly five additional public URLs
  for SEO-oriented home variants at these paths (no extra URL segment for the
  organizing folder): `/istanbul-psikolog`, `/cift-terapisi`,
  `/bilissel-davranisci-terapi`, `/uskudar-psikolog`, and `/besiktas-psikolog`.
  An internal umbrella grouping (per product brief) MAY be used for file
  organization and shared layout; that grouping MUST NOT add extra segments to
  the five public URLs above.
- **FR-008**: Each SEO variant page MUST follow one shared page pattern that
  supplies at minimum a distinct hero headline and hero supporting line
  (subtitle) so wording differs while page structure matches the main home
  experience.
- **FR-009**: Each routable page introduced or updated by this feature MUST
  define unique page title and description suitable for search and social
  previews (no duplicate default placeholder across these pages).
- **FR-010**: Primary navigation, footer links, and hero calls-to-action MUST
  reference destinations through the central route registry only (no ad-hoc
  duplicate path strings for the same destination).
- **FR-011**: The global header, global footer, and hero presentation MUST
  remain a single maintained implementation reused on every page; duplicate
  copies of that behavior for this feature are not allowed.
- **FR-012**: Automatic redirects from legacy or superseded URLs to canonical
  paths are **explicitly out of scope** for this feature and MAY be addressed
  in a separate follow-up.
- **FR-013**: The main site entry path (`/`) MUST continue to offer the **full**
  home experience: all primary content sections remain on one page in the same
  overall order. Dedicated section URLs are additive and MUST NOT replace the
  long-form home with a shortened version.

### Key Entities

- **Canonical route map**: Logical names (home, about, services, contact, etc.)
  mapped to URL paths—single reference for navigation authors.
- **SEO landing variant**: A named entry (e.g., locality or service keyword)
  with distinct hero headline, hero subtitle, page title, and page description.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of the four primary section URLs load successfully and show
  the correct primary content block within 3 seconds on a typical broadband
  connection.
- **SC-002**: 100% of the five SEO variant URLs load successfully and each shows
  a unique hero headline and subtitle visible above the fold on desktop.
- **SC-003**: Spot-check of ten navigation clicks (header, footer, hero CTAs
  across home and two other pages) yields zero incorrect or dead destinations
  for the four primary section routes.
- **SC-004**: Each of the nine new or materially updated public pages has a
  distinct page title and meta description (verified by inspection of page
  properties, not by implementation technology).
- **SC-005**: Stakeholder review confirms that SEO landing pages feel identical
  in layout and trust signals to the main home page, differing only in hero text
  and page-level descriptive metadata.

### Assumptions

- The About, Areas of Work, Services, Contact, map placeholder, header, footer,
  and hero experiences already exist from prior work; this feature connects
  them to dedicated URLs and adds one parameterized home pattern for SEO
  variants. The main home (`/`) remains a **long-form** page with all sections;
  dedicated URLs are additive (see FR-013).
- Primary public URLs for the four sections use **Turkish** path segments as
  listed in FR-001 (`/hakkinda`, `/calisma-alanlari`, `/hizmetler`,
  `/iletisim`). Any previous alternate paths are superseded for navigation and
  registry purposes; **redirects are not part of this feature** (see FR-012).
- Legal or medical claims in SEO copy remain truthful and are supplied or
  approved by the practice owner; the specification only requires unique,
  intent-aligned wording per variant.
- SEO variant pages use an internal umbrella folder (name per product brief:
  home-variations) so they can share one layout; visitor-facing URLs remain the
  five paths listed in FR-007 with no extra path segments.
