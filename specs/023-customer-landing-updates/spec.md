# Feature Specification: Therapist site customer UX and content updates

**Feature Branch**: `023-customer-landing-updates`  
**Created**: 2026-05-01  
**Status**: Draft  
**Input**: User description: "Implement UI/UX and content updates from `docs/customer-requests.md`: hero typography, services intro and clickable services, redesigned “how the process works” section, therapist name highlight color (#2F3E4E), contact page copy with phone/WhatsApp links, one-click location navigation."

## Clarifications

### Session 2026-05-01

- Q: What is the scope of application for the practitioner name accent color (#2F3E4E)? → A: Hero and logo-style (wordmark/site identity) instances only (Option A).
- Q: On which surfaces must the verbatim contact guidance (`FR-008`) appear? → A: Every public visitor-facing route where an inquiry/contact form is presented (Option C).
- Q: Where must the redesigned five-step counselling process (`FR-005`/`FR-006`) appear relative to existing site structure? → A: Landing marketing home **plus every other existing public route that already surfaced the predecessor «process / how it works» module** today—no newly introduced mirrors on routes that lacked it historically (Option B).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Service overview leads to actionable next step (Priority: P1)

A visitor scanning the services area reads updated introductory copy, then taps or clicks each listed service area (family, individual, couples) and reaches fuller information for that area through one consistent pattern (default: dedicated service detail), with visible feedback—never a dead interaction.

**Why this priority**: Broken or ambiguous service links directly harm trust and conversion; this is explicitly flagged in the customer request.

**Independent Test**: With only the services block updated, a tester can verify copy and every service affordance activates an expected navigation or reveal.

**Acceptance Scenarios**:

1. **Given** the services section is in view, **When** the visitor reads the introduction, **Then** it matches the agreed introductory sentence verbatim (excluding intentional locale or typographic normalization).
2. **Given** a service row or card representing a consulting area is shown, **When** the visitor activates it (click or tap), **Then** the visitor reaches fuller information for that counselling area using the single agreed pattern (default: dedicated service detail material; see Assumption A-001).
3. **Given** the visitor activates any service affordance, **When** the action completes, **Then** there is visible feedback (e.g. focus change, transition, expanded content, or new view) confirming the interaction.

---

### User Story 2 - Contact intentions are clear and one tap away (Priority: P1)

A visitor who reaches **any** public page that includes the practice inquiry/contact form sees updated guidance text adjacent to that form, can start a phone call from the published number with one tap, and can open a WhatsApp conversation with one tap—all without guessing secondary steps.

**Why this priority**: Contact and WhatsApp paths are primary conversion routes; ambiguity or non-working links wastes leads.

**Independent Test**: Enumerate every public route that surfaces the inquiry/contact form; verify `FR-008` placement, phone/tap behavior, and WhatsApp affordance on each, on both phone and desktop form factors.

**Acceptance Scenarios**:

1. **Given** any public visitor-facing page that presents an inquiry/contact form, **When** the visitor reads the instructional text above or beside that form, **Then** the text matches the agreed replacement copy verbatim for meaning and presence of phone number and WhatsApp reference.
2. **Given** the published mobile number appears in that text, **When** the visitor selects it on a capable device, **Then** the device offers to place a call using that number.
3. **Given** WhatsApp is referenced, **When** the visitor selects the WhatsApp affordance, **Then** a WhatsApp chat to the intended number opens or is clearly offered without manual copy-paste of the number.

---

### User Story 3 - First screen reads calmly and proportionally (Priority: P2)

A first-time visitor on the landing page sees a hero headline and supporting line sized so the block does not overwhelm the viewport, preserves clear hierarchy between title and subtitle, and avoids awkward overflows or cramped CTAs relative to neighboring elements.

**Why this priority**: Readability sets tone for trust; oversized hero text was called out explicitly.

**Independent Test**: On standard phone and desktop breakpoints, inspect hero only for hierarchy, truncation, wrapping, and balance with primary call-to-action.

**Acceptance Scenarios**:

1. **Given** a typical mobile viewport height, **When** the page loads above the fold, **Then** the hero title plus subtitle plus primary CTA read as one balanced group without dominating the entire screen.
2. **Given** the hero headline text (the agreed practitioner and positioning line), **When** rendered with localized line breaks, **Then** wrapping does not produce misleading breaks or clipped text within supported browsers for the marketed locales.

---

### User Story 4 - Process timeline educates without wall-of-text fatigue (Priority: P2)

On the marketing landing home—and on any separate public routes that reused the legacy «how the process works» block—a visitor discovers the renamed explanatory section presenting a short introduction plus five numbered, visually separated steps ending in a structured appointment prompt.

**Why this priority**: Explaining the method reduces anxiety and supports conversion; structured steps were specified with exact wording.

**Independent Test**: Baseline-inventory every public route that exposed the predecessor process module; on **each** such route, verify titles, intro, five step titles/bodies, CTA copy, and chunked layout.

**Acceptance Scenarios**:

1. **Given** a route in that baseline inventory, **When** the visitor reads the section heading, **Then** it matches the agreed section title verbatim.
2. **Given** the introduction paragraph is shown, **When** compared to the specification, **Then** it matches the supplied intro verbatim.
3. **Given** the five steps are presented, **When** inspected in order, **Then** each step has the supplied title and body text and appears as a visually distinct unit (numbered card, vertical timeline segment, or stepper step).
4. **Given** the section end, **When** the visitor reaches the closing call-to-action, **Then** the “Randevu Al” labeling and supportive sentences match the agreed CTA block.

---

### User Story 5 - Practice location opens directions in one action (Priority: P2)

A visitor viewing the practice location sees an obvious control or linked area such that selecting it once opens an external maps experience pinned to the correct address where they can request directions—on both mobile and desktop.

**Why this priority**: Lack of navigation was raised as gaps; parity across devices avoids frustration.

**Independent Test**: From the location block only, activate the map affordance twice on mobile and desktop profiles.

**Acceptance Scenarios**:

1. **Given** the location presentation is visible, **When** the visitor triggers the designated map/navigation affordance once, **Then** an external maps view or app opens centered on or listing the advertised location.
2. **Given** the visitor is on mobile or desktop, **When** they use that affordance, **Then** the same one-step principle holds (no intermediary dead-end control).

---

### User Story 6 - Therapist name has subtle branded emphasis (Priority: P3)

On the marketed landing hero and in logo/wordmark identity instances where the practitioner’s name is part of deliberate brand framing, that name styling uses the designated brand-neutral blue-gray emphasis while keeping readable contrast against its backdrop. Other incidental mentions elsewhere do not acquire this accent by default.

**Why this priority**: Visual refinement; lower risk than blocked flows.

**Independent Test**: Inspect only the landing hero name emphasis and logo/name lockups; verify color token (#2F3E4E) and subjective restraint (not flashy) plus contrast readiness on defaults.

**Acceptance Scenarios**:

1. **Given** the practitioner’s name is shown with emphasis in the landing hero or logo-style lockup, **When** reviewers assess presentation, **Then** accent reads as subdued and professional, not ornamental or loud.
2. **Given** those instances, **When** typography and adjacent brand chrome stay otherwise unchanged aside from this highlight, **Then** the name stays readable without relying on color alone for discernibility of meaning versus surrounding text hierarchy.

---

### Edge Cases

- Very narrow mobile widths wrap long hero lines; hierarchy and CTA proximity must remain clear without overlapping touch targets.
- Service items with keyboard navigation: interactive elements remain focusable and activatable without mouse-only gestures.
- If a visitor has no WhatsApp installed, selecting WhatsApp shows a recognizable OS/browser outcome (store prompt or fallback) rather than a silent failure; phone link remains usable.
- A single public page hosting more than one inquiry form requires `FR-008` copy (or one clearly shared intro block legibly associated with every form in that section—no form left without adjacent guidance).
- Map affordance honors reduced-motion or fallback where required by policy without removing the ability to obtain directions via the same textual address.
- Long words in Turkish copy in cards or timelines should wrap without overflowing containers.
- Incidental occurrences of the practitioner’s name in body content, auxiliary pages, or legal footnotes do **not** need the accent color unless independently styled as emphasized later.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The marketed landing hero MUST present the main headline and subtitle at sizes and spacing such that subtitle is subordinate to the headline and the hero group does not monopolize the first viewport disproportionately relative to neighboring primary actions (per acceptance tests in Story 3).
- **FR-002**: The services section introduction MUST display the sentence: «Aile, bireysel ve çift danışmanlığında online ve yüz yüze olarak bilimsel temelli destek sunuyorum; aşağıda hizmet alanlarımın özetini görebilirsiniz.» (straight quotes normalized as appropriate for typography).
- **FR-003**: Every listed counselling area affordance (e.g. family, individual, couples) MUST be interactive; activating any affordance MUST take the visitor to dedicated service detail material for that area, using one consistent pattern across all items (see Assumption A-001). If stakeholders replace that default with a different single pattern before build, this requirement MUST be updated accordingly in planning.
- **FR-004**: Each active service interaction MUST provide visible acknowledgment (focus motion, reveal, navigation transition, etc.); MUST NOT silently ignore activation.
- **FR-005**: On the primary marketed landing **home** and on **each other public visitor-facing route that already displayed the predecessor «process» / «how it works» styled section before this release**, that section MUST be replaced by content structured as: title «Psikolojik Danışmanlık Süreci Nasıl İşler?»; introductory paragraph beginning «Bazen nereden başlayacağınızı bilemeyebilirsiniz…» through «…yaşamınızda gerçek bir değişim oluşturmaktır.»; five steps with titles and bodies exactly as supplied in customer source; trailing CTA labeled «Randevu Al» with body «Eğer siz de bu sürece başlamak istiyorsanız, ilk adımı ertelemeyin.» and follow-on lines about contacting for suitable days and hours. Routes that **never** hosted that predecessor section remain out of scope—no new mirrored placement is required there for this feature.
- **FR-006**: On each surface governed by `FR-005`, the five-step content MUST use a scanned layout separating steps (numbered cards, vertical timeline, or stepper)—visually chunked, not a single uninterrupted paragraph.
- **FR-007**: The practitioner’s emphasized name MUST use highlight color HEX #2F3E4E (RGB 47, 62, 78) **only** in (a) the landing hero name emphasis and (b) logo-style or site-identify wordmarks where that name participates in intentional brand framing—unless accessibility remediation mandates the nearest compliant approved token documented in release notes.
- **FR-008**: On **every** public visitor-facing route where the practice inquiry/contact form appears, the guiding text immediately above or beside that form MUST match: «Aile, bireysel ve çift danışmanlığı hakkında bilgi almak veya randevu oluşturmak için iletişim formunu doldurabilirsiniz. Alternatif olarak +90 554 401 01 76 numarası üzerinden WhatsApp’tan mesaj atabilir ya da doğrudan arayarak benimle iletişime geçebilirsiniz. Tüm başvurulara en kısa sürede dönüş yapılmaktadır.» Authenticated admin, staff, or internal tooling surfaces are out of scope for this requirement.
- **FR-009**: The published phone number MUST offer one-tap dialing on capable devices; WhatsApp MUST offer one-tap chat using the same published number through the platform-appropriate messaging entry point.
- **FR-010**: Location presentation MUST include at least one clear affordance (linked address text, embedded map hotspot, or button such as «Yol Tarifi Al» aligned to brand voice) opening external maps anchored to the publicized practice address such that requesting directions IS available from that maps view.
- **FR-011**: New or changed interactive elements on public pages MUST remain usable with keyboard alone and provide non-visual labels understandable to assistive technologies, following generally accepted public-web accessibility practice.

### Assumptions

- **A-001**: Dedicated service detail material already exists; default interaction pattern until stakeholders override is **navigation to corresponding service detail** rather than accordion-only or same-page anchors.
- **A-002**: “External maps experience” MAY be vendor-specific maps in production as long as user-visible behavior matches FR-010 and parity across mobile/desktop holds.
- **A-003**: Hero “first viewport balance” judgments use representative breakpoints aligned with existing design QA practice for this property.
- **A-004**: The authoritative list of routes subject to `FR-005` MUST be derived from a baseline inventory of whichever public pages already rendered the predecessor process module **immediately before this feature ships** (no retroactive expansion beyond that set without a new spec amendment).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In moderated hallway testing (minimum 5 participants unfamiliar with staging), ≥80% spontaneously rate hero title and subtitle readability as «easy» or «very easy» on mobile after change versus prior baseline wording at original sizes (survey or thumbs scale).
- **SC-002**: In automated/manual interaction passes, zero instances occur of clickable-looking service tiles failing to activate across three representative devices (small phone, large phone, desktop) for each counselling area advertised in the grid or list.
- **SC-003**: On a sample that includes the dedicated contact route plus at least one other public route exposing the inquiry form (if any exist), handheld session tests show testers complete both phone dial-offer AND WhatsApp affordance within 30 seconds cumulative without external instructions (task-time proxy for clarity).
- **SC-004**: Blind content audit (single reviewer checklist) verifies 100% match of mandated strings across services intro; five process steps (+ titles + intro + CTA) on **every baseline-inventoried route subject to `FR-005`**; and `FR-008` text on **each** inventoried public inquiry-form surface before release sign-off.
- **SC-005**: Spot-check contrast on default backgrounds limited to scoped instances (landing hero emphasis + logo/name lockups under FR-007) meets published minimum contrast for readable headline-style text in the team’s accessibility checklist—or a documented alternative emphasis style achieves equivalent readability with stakeholder approval.
- **SC-006**: Maps smoke test passes on two mobile browsers and two desktop browsers opening in one user gesture from resting state ≥95% of attempts (excluding network failures).
