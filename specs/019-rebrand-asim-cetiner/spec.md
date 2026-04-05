# Feature Specification: Rebrand for Asım Çetiner

**Feature Branch**: `019-rebrand-asim-cetiner`  
**Created**: 2026-04-05  
**Status**: Draft  
**Input**: User description: "I want you to change the website's primary color to #783B04 and secondary accent to #FD9B2F and keep the background color as off white. Change names Kenan Buğrahan Kübüç to Asım Çetiner. Use @public/images/asim_cetiner_stock.jpg instead of previous kenan_kubuc_stok which is removed. Change the other to photos, namely @public/images/areas-of-work-bg.jpg and @public/images/hero-therapy-calm.jpg to different pictures that have similar tone."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Correct therapist identity (Priority: P1)

A visitor opens the site to learn about the therapist and expects the professional’s legal or display name and portrait to match Asım Çetiner everywhere that identity is shown (including about, headers, contact, and legal or meta text if present).

**Why this priority**: Wrong name or photo undermines trust and can confuse referrals or search; identity is the core of the landing experience.

**Independent Test**: Review all customer-facing surfaces that state the therapist’s name or show a portrait; confirm they consistently use Asım Çetiner and the approved portrait asset path.

**Acceptance Scenarios**:

1. **Given** a visitor on any main page, **When** they read visible therapist naming, **Then** they see “Asım Çetiner” (and not “Kenan Buğrahan Kübüç” or variants).
2. **Given** a visitor on a page that shows the therapist portrait, **When** the image loads, **Then** it is the image supplied as `public/images/asim_cetiner_stock.jpg` (replacing any prior Kenan Kübüç stock image).

---

### User Story 2 - Calm, on-brand visuals (Priority: P2)

A visitor notices buttons, links, highlights, and key UI accents in the new brown-and-orange palette, while the overall page background stays a soft off-white so content remains easy to read.

**Why this priority**: Color drives first impression and accessibility; it must match the agreed brand without harming readability.

**Independent Test**: Compare primary actions, headings accents, and page background against the approved palette; confirm contrast feels readable on typical displays.

**Acceptance Scenarios**:

1. **Given** a visitor viewing primary actions and brand-colored elements, **When** they compare them to the brand guide, **Then** primary color reads as the approved dark brown (#783B04) and secondary accent as the approved orange (#FD9B2F).
2. **Given** a visitor on standard content pages, **When** they observe the main background, **Then** it remains off-white (not a full-bleed strong color that replaces the prior calm base).

---

### User Story 3 - Updated hero and areas imagery (Priority: P3)

A visitor sees refreshed background or hero imagery for “areas of work” and the calm therapy hero that feels consistent with the previous mood: calm, professional, therapy-appropriate, and visually harmonious with the new palette (muted tones with restrained warmth where appropriate).

**Why this priority**: Imagery supports emotional tone; swapping assets completes the rebrand without changing site structure.

**Independent Test**: Open the views that used `areas-of-work-bg.jpg` and `hero-therapy-calm.jpg`; confirm new images are in use and feel tonally similar to the prior calm, professional treatment.

**Acceptance Scenarios**:

1. **Given** a visitor on the section that used the areas-of-work background, **When** the background image is shown, **Then** it is a new image at the same path `public/images/areas-of-work-bg.jpg` with a similar calm, professional tone (not a jarring or unrelated style).
2. **Given** a visitor on the hero or calm therapy visual that used the prior calm image, **When** the image is shown, **Then** it is a new image at the same path `public/images/hero-therapy-calm.jpg` with a similar calm, contemplative tone suitable for therapy positioning.

---

### Edge Cases

- **Partial rename**: Old name or old portrait references remain in any non-visible place (e.g. alternate text, document title, structured data, email templates, admin copy); acceptance includes a deliberate pass for stragglers.
- **Broken assets**: If a referenced image file is missing, the experience should degrade predictably (stakeholder expectation: files are present at the specified public paths after release).
- **Color contrast**: Very small text on accent-colored backgrounds must remain legible; if a specific component fails contrast, adjust treatment while keeping the same hex values for primary/secondary roles.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: All user-visible and legally relevant occurrences of the prior therapist name “Kenan Buğrahan Kübüç” (including reasonable variants and spacing) MUST be replaced with “Asım Çetiner” unless a jurisdiction explicitly requires retaining a historical legal name (none specified; default is full replacement).
- **FR-002**: The therapist portrait used wherever the previous Kenan Kübüç stock photo applied MUST use the file at `public/images/asim_cetiner_stock.jpg`.
- **FR-003**: The site’s primary brand color MUST be #783B04 for primary UI/branding roles (e.g. primary buttons, key headings accents, brand marks as defined by existing design patterns).
- **FR-004**: The site’s secondary accent color MUST be #FD9B2F for secondary highlights (e.g. links, chips, secondary CTAs, decorative accents per existing patterns).
- **FR-005**: The main page background MUST remain off-white (soft neutral), not replaced by a saturated full-page color.
- **FR-006**: The image deployed at `public/images/areas-of-work-bg.jpg` MUST be replaced with a different photograph that preserves a similar calm, professional, therapy-appropriate tone to the prior asset.
- **FR-007**: The image deployed at `public/images/hero-therapy-calm.jpg` MUST be replaced with a different photograph that preserves a similar calm, contemplative, therapy-appropriate tone to the prior asset.

**Assumptions**: “Similar tone” means muted or soft palettes, minimal visual noise, and no loud or clinical stock clichés; final image selection is subject to stakeholder approval. No change to site information architecture or copy beyond naming and visuals is required unless uncovered during rename audit.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: On a full-site review checklist, 100% of checked locations show “Asım Çetiner” and zero show the old full name (checklist defined as: home, about, services, contact, footer, FAQ, legal pages, and browser title where the name appears).
- **SC-002**: Stakeholder sign-off confirms the primary color matches #783B04 and secondary accent matches #FD9B2F on live or staging pages for representative components (hero, primary button, link accent).
- **SC-003**: Stakeholder sign-off confirms the main background reads as off-white across primary templates (home, inner content page).
- **SC-004**: Stakeholder sign-off confirms the two replaced photographs (`areas-of-work-bg`, `hero-therapy-calm`) feel tonally consistent with the previous pair and appropriate for a therapy practice brand.
