# Feature Specification: Public Marketing Experience — Visual & Motion Refresh

**Feature Branch**: `009-style-home-page`  
**Created**: 2026-03-27  
**Status**: Draft  
**Input**: User description: "Style the components on the home page according to given design constraints: calm hero with stock background (therapy setting), left-aligned hero copy and CTAs, scroll-reveal and micro-interactions across sections, refined typography, and a welcoming, non-judgmental tone aligned with therapist landing best practices (trust, clarity, human warmth)."

## Clarifications

### Session 2026-03-27

- Q: Should visual and motion updates be confined to the home route only, or may shared chrome / a broader surface be in scope? → A: **Whole public site** — apply the same visual and motion language across **all public marketing pages**, not only the home route (Option C).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Immediate sense of safety and welcome (Priority: P1)

A first-time visitor opens the site, usually starting on the home page, and within seconds understands they are in a professional, calm therapy context on that entry view; they see a clear invitation to take the next step. When they move to other public pages, the experience still feels like one trustworthy practice—not a different product or template.

**Why this priority**: The landing hero and global shell set trust and emotional tone; inconsistency across routes undermines the same signals the hero is meant to establish.

**Independent Test**: Review the home page without scrolling; then open at least one other public marketing page and compare header, type, and tone against the acceptance scenarios below.

**Acceptance Scenarios**:

1. **Given** a visitor on a typical desktop or large tablet viewport, **When** the home page loads, **Then** the top section uses a full-width calm background image (e.g. an unoccupied therapy-appropriate setting such as a listening chair or peaceful office) that supports readability of foreground content.
2. **Given** the home page hero is visible, **When** the visitor reads the main headline and supporting text, **Then** that text block and its primary call-to-action buttons are aligned to the start of the reading direction (left in left-to-right languages), not centered as the sole layout, while remaining balanced and uncluttered.
3. **Given** the home page hero is visible, **When** the visitor scans for what to do next, **Then** at least one primary action (e.g. book, contact, or learn more) is visually distinct and clearly associated with the hero message.
4. **Given** a visitor opens any other public marketing page after the home page, **When** they view the global header, footer, and main content, **Then** typography, spacing, color rhythm, and motion vocabulary read as the same design system as the home page (no “alternate theme” effect).

---

### User Story 2 - Calm discovery while scrolling (Priority: P2)

A visitor scrolls through public marketing pages; each **major content section** appears in a smooth, deliberate way so the site feels cohesive and “alive” without feeling hectic or distracting.

**Why this priority**: Scroll behavior reinforces professionalism and keeps attention on content sitewide, not only on the landing view.

**Independent Test**: On the home page and at least one inner public page, scroll on desktop and mobile; below-the-fold blocks should enter view with restrained motion or fade where sections exist.

**Acceptance Scenarios**:

1. **Given** a visitor scrolls downward on a public marketing page that has multiple major sections, **When** a major section first enters the viewport, **Then** that section (or its primary container) becomes visibly present through a smooth transition (e.g. fade, gentle slide, or equivalent) rather than popping in without transition.
2. **Given** multiple sections exist on such a page, **When** the visitor scrolls through the page, **Then** motion timing feels slow and smooth enough that text remains easy to read and the overall effect suggests “flow,” not rapid or jarring movement.

---

### User Story 3 - Tactile, trustworthy interactions (Priority: P3)

A visitor hovers over or focuses on cards, buttons, or other interactive elements on **public marketing pages** and receives subtle feedback that the interface is responsive and polished.

**Why this priority**: Small interactions increase perceived quality and confidence; they support conversion without changing underlying behavior.

**Independent Test**: Use keyboard and pointer on the home page and at least one other public marketing page; hover and focus states should be visible and calm.

**Acceptance Scenarios**:

1. **Given** a card or tile on a public marketing page that represents a service, testimonial, or similar content, **When** the visitor hovers over it with a pointer, **Then** the element shows a minor visual change (e.g. slight scale increase, soft shadow, or gentle elevation) that does not obscure content.
2. **Given** any interactive control on a public marketing page, **When** the visitor moves keyboard focus to it, **Then** a clear focus indicator is visible so the control can be used without guessing where focus is.

---

### Edge Cases

- **Pages without a full hero**: Inner public pages may use a simpler top treatment; they MUST still honor global shell styling, typography, scroll/motion rules for their sections, and interaction patterns. The therapy-setting **photographic hero** requirement applies to the **home (primary landing) page** specifically.
- **Very small viewports**: Home hero imagery and start-aligned copy must remain legible; text must not overlap the background in a way that drops contrast below acceptable reading levels. If needed, background treatment may adjust (e.g. overlay) so contrast is preserved.
- **Slow connections or large images**: Home hero background imagery should not prevent the visitor from reading hero text or using primary actions within a reasonable load perception; a sensible fallback (e.g. solid or gradient calm background) should appear if the image is slow or unavailable.
- **Reduced motion preference**: Visitors who prefer reduced motion must still receive a fully usable site: scroll-triggered effects are replaced or toned down so content is immediately readable without required animation.
- **Right-to-left languages** (if ever enabled): “Start-aligned” layout replaces “left” so hero copy and actions align with the reading direction.

## Requirements *(mandatory)*

### Scope

- **In scope**: All **public marketing pages** (visitor-facing routes intended for clients and prospects) and shared chrome (e.g. header, footer, primary navigation) that appears on those pages. The same visual language, typography, spacing, scroll-reveal behavior, and micro-interactions apply sitewide unless a page has no structural equivalent (e.g. a single short legal page may have fewer sections to animate).
- **Out of scope**: Admin panels, authenticated staff or operational tools, API surfaces, and any route that is not part of the public marketing experience, unless explicitly added by a future decision.

### Functional Requirements

- **FR-001**: The **home (primary landing) page** hero MUST use a calm, professional background photograph or equivalent licensed stock imagery that evokes a therapeutic setting (e.g. quiet office, listening chair, soft natural light) and MUST NOT rely on a plain solid color alone as the only background treatment when the image is available.
- **FR-002**: On the **home page**, hero headline, supporting copy, and primary calls-to-action MUST be laid out along the start edge of the content area (left in LTR), with clear hierarchy so the primary message is read before secondary elements.
- **FR-003**: On **each public marketing page**, every major section below the first screen MUST use a coordinated visual style (spacing, corners, and color rhythm) that reads as modern and calm rather than stark or generic template styling, consistent with the home page.
- **FR-004**: On **each public marketing page**, each major section MUST reveal or settle into view when scrolled into the viewport using smooth, restrained motion or opacity change, unless the visitor’s system or browser signals a preference for reduced motion. (Single-block pages with no meaningful below-the-fold sections are exempt from scroll-reveal but must still meet typography and interaction rules.)
- **FR-005**: On **public marketing pages**, cards, tiles, or analogous grouped content blocks MUST provide a subtle hover response (e.g. slight scale, shadow, or lift) that is noticeable but not dramatic; the same elements MUST expose an obvious keyboard focus state.
- **FR-006**: Typography **across all public marketing pages** MUST use a deliberate pairing suitable for healthcare trust (clear sans-serif for body text with comfortable line spacing; headings MAY use a refined serif or humanist style) and MUST avoid a default generic “office document” serif appearance that feels blunt or dated.
- **FR-007**: Copy placement, imagery, and micro-labels (e.g. confidentiality or credentials where present) **across public marketing pages** MUST collectively reinforce the message: the visitor is welcome, will not be judged, and is in competent hands—without sensational or sales-heavy language.
- **FR-008**: Trust-oriented elements **across public marketing pages** (e.g. confidentiality, qualifications, professional memberships) MUST be visually easy to notice but not shouty—e.g. soft containment or gentle emphasis consistent with the calm palette.
- **FR-009**: **Global shell** components used on public marketing pages (header, footer, primary navigation) MUST use the same coordinated visual system (type, color tokens, spacing, focus/hover behavior) as the rest of the public site so navigation never looks like a separate skin.

### Assumptions

- **Public marketing pages** means all visitor-facing marketing and content routes in the product map (home, about, services, contact, legal pages exposed to the public, etc.), excluding staff-only or admin routes named under Scope.
- The site’s primary audience reads left-to-right; “left-aligned” means start-aligned for the active locale.
- Imagery will be appropriately licensed for web use; selection is constrained by brand and ethical representation (no misleading staging of real patients).
- “Major sections” means the primary structural blocks on a given page (hero, services, about snippets, testimonials, contact/booking teasers, etc.), not every footnote-sized UI fragment.
- Design constraints referenced by stakeholders (calm palette, soft radii, generous vertical spacing, warm accent for primary actions) apply **consistently across public marketing pages** unless a subsection explicitly requires a simpler treatment for accessibility.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In a moderated review with at least three representative viewers (or stakeholder proxy), at least two-thirds describe the **home page** within the first 10 seconds as “calm,” “welcoming,” or “professional” without prompting for those exact words; **and** after visiting **one additional public marketing page** chosen without prior coaching, at least two-thirds **do not** describe the two pages as looking like unrelated or conflicting designs.
- **SC-002**: In the same or a follow-up review, at least two-thirds agree that **the site** communicates that they would feel “safe” or “not judged” contacting the practice, when asked a single closed follow-up question about emotional tone after brief browsing **across at least two public pages**.
- **SC-003**: On a standard broadband connection, **home page** hero text and primary actions MUST be readable and actionable without waiting for decorative animation to finish (any entrance animation for hero text completes within 2 seconds or can be skipped/perceived as non-blocking).
- **SC-004**: With reduced-motion preference enabled at the operating system level, **no section on any public marketing page** MUST require animation for content to be visible; all text and controls MUST be usable immediately after load and after scroll.
- **SC-005**: On both mobile and desktop viewports used in testing, every interactive element **on the public marketing pages** exercised in the test checklist MUST show a visible focus indicator and meet agreed contrast for normal body text against its background (per project or WCAG-aligned internal standard).
