# Feature Specification: FAQ section and dedicated SSS page

**Feature Branch**: `017-faq-section-pages`  
**Created**: 2026-04-05  
**Status**: Draft  
**Input**: User description: "I want you to adda an FAQ section to the application. Main page (and all SEO langin pages) should have an FAQ section under service list, and there should be a separate FAQ page in \"/sikca-sorulan-sorular\" route. It shoud be a toggle list that toggle contains question and when opened displays the answer. You can utilize /therapist-ui-designer skill for ui decisions."

## Clarifications

### Session 2026-04-05

- Q: Should the dedicated services page (`/hizmetler`) include the inline FAQ under its services content, or is FAQ limited to home plus keyword-oriented pages that reuse the full home layout? → A: **Inline FAQ only on `/` and on keyword-oriented pages that reuse the full multi-section home layout—not on `/hizmetler` or other single-focus section pages.**

## User Scenarios & Testing *(mandatory)*

### User Story 1 - FAQ on home and search-oriented landing pages (Priority: P1)

A visitor reading the main entry page or any keyword-oriented landing page that mirrors the home experience scrolls past the services list and finds a clearly labeled block of common questions. Each question appears as a compact row or control; when they activate it, the answer becomes visible without leaving the page. They can collapse it again when they want a shorter view.

**Why this priority**: Most visitors resolve doubts on the same page where they browse services; placing the FAQ directly under services matches that mental model and supports conversion.

**Independent Test**: Open the home page and a representative keyword-oriented landing page; confirm an FAQ block appears immediately after the services section on each, with working expand/collapse for every listed question.

**Acceptance Scenarios**:

1. **Given** the visitor is on the home page, **When** they scroll below the services list, **Then** they see an FAQ section with a clear heading and a list of questions.
2. **Given** the visitor is on any keyword-oriented landing page that reuses the same multi-section home layout as the main entry, **When** they scroll below the services list, **Then** they see the same FAQ section in the same relative position as on the home page.
3. **Given** a collapsed FAQ item, **When** the visitor activates its control, **Then** the corresponding answer text is shown.
4. **Given** an expanded FAQ item, **When** the visitor activates its control again, **Then** the answer is hidden.
5. **Given** the visitor uses only the keyboard, **When** they move focus to an FAQ control and activate it, **Then** expand and collapse behavior works the same as with a pointer.

---

### User Story 2 - Dedicated frequently asked questions page (Priority: P2)

Someone shares or bookmarks the canonical “frequently asked questions” address. The visitor lands on a focused page whose primary content is the full FAQ list using the same expand/collapse pattern, so they can read answers in one place without scanning the long home layout.

**Why this priority**: Supports deep links, search snippets, and visitors who explicitly look for “SSS” or FAQ-style content.

**Independent Test**: Open the dedicated FAQ URL directly; confirm page title or main heading identifies the page as frequently asked questions and that every FAQ item from the shared content set is present and toggles correctly.

**Acceptance Scenarios**:

1. **Given** the visitor opens the path `/sikca-sorulan-sorular`, **When** the page loads, **Then** they see the FAQ list as the main content with the same question-and-answer pairs as defined for the site-wide FAQ content set.
2. **Given** the visitor is on the dedicated FAQ page, **When** they expand and collapse items, **Then** behavior matches the inline FAQ on home and landing pages (one coherent pattern).

---

### Edge Cases

- An answer contains multiple paragraphs or a long list: expanded content remains readable (adequate spacing; no unreadable overlap with adjacent items).
- Only one FAQ item exists: the section still renders and toggles correctly.
- Visitor expands several items in sequence: each item’s state is independent unless a future product decision standardizes otherwise (default for this spec: **independent** expand/collapse per item).
- Visitor follows a link to `/sikca-sorulan-sorular` from a small screen: controls remain easy to tap and text does not require horizontal scrolling for normal prose.
- Visitor is on a single-focus section page (for example `/hizmetler`): the inline FAQ block is intentionally absent; they rely on the dedicated SSS page or the global header/footer link to `/sikca-sorulan-sorular` for the full list.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The home page MUST show an FAQ section placed **directly below** the services list (no other major section between services and FAQ).
- **FR-002**: Every public page that uses the same multi-section home layout as the main entry for keyword-oriented or campaign landing purposes MUST include the same FAQ section in the same position relative to the services list as on the home page.
- **FR-002a**: Single-focus section pages that do **not** reuse that full home layout—including the dedicated services route at **`/hizmetler`** and comparable section-only routes—MUST **not** be required to show the inline FAQ block; visitors use `/sikca-sorulan-sorular` (and the site-wide link in FR-009) for that content.
- **FR-003**: The FAQ MUST be presented as a list of items where each item shows the **question** in the collapsed state and reveals the **full answer** when expanded.
- **FR-004**: The site MUST expose a dedicated visitor-facing page at the canonical path **`/sikca-sorulan-sorular`** whose primary purpose is to present the full FAQ list using the same expand/collapse interaction as the inline FAQ.
- **FR-005**: The set of question-and-answer pairs shown in the inline FAQ (home and eligible landing pages) MUST match the set shown on `/sikca-sorulan-sorular` (same questions, same answers, same order), so content cannot drift between surfaces.
- **FR-006**: FAQ controls MUST be operable with a keyboard and MUST provide a visible focus indicator when focused.
- **FR-007**: Expanded answers MUST be available to assistive technologies in a way that associates each answer with its question (e.g., appropriate grouping or naming so the relationship is clear in a screen-reader review).
- **FR-008**: The dedicated FAQ page MUST identify itself in the main heading or equivalent primary title as a frequently asked questions resource (wording in Turkish consistent with the rest of the site, e.g., “Sıkça Sorulan Sorular” or equivalent approved copy).
- **FR-009**: The site MUST include at least one persistent site-wide link (header navigation, footer, or both) to `/sikca-sorulan-sorular` so the dedicated page is discoverable without typing the URL.

### Key Entities

- **FAQ item**: A single question paired with one authoritative answer intended for public visitors; ordered within a **FAQ content set** used everywhere this feature applies.
- **FAQ content set**: The ordered list of FAQ items that MUST stay consistent across the home page, eligible landing pages, and `/sikca-sorulan-sorular`.

### Assumptions

- Stakeholders provide or approve the initial FAQ copy (minimum of three items for a credible section unless a smaller set is explicitly agreed); placeholder lorem text is not acceptable for production launch.
- “SEO landing pages” means the existing keyword-oriented landing pages that reuse the home layout, as established elsewhere in the product—not arbitrary future URL schemes.
- Inline FAQ placement does **not** apply to dedicated section pages that only present one topic (for example `/hizmetler`); that exclusion is intentional per clarification session 2026-04-05.
- Visual treatment follows the product’s **calm, trustworthy** presentation goals (soft spacing, readable type, clear hierarchy, non-aggressive accents) without prescribing specific frameworks or libraries in this document.

### Dependencies

- Multi-section home and keyword-oriented landing page structure and the services list section must remain in place so the FAQ can be inserted **below** services as specified.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: On the home page and on **100%** of a defined checklist of keyword-oriented landing pages (at least three distinct URLs agreed during planning)—**excluding** single-focus section routes such as `/hizmetler`—the FAQ section appears immediately after the services section in **100%** of manual checks.
- **SC-002**: On `/sikca-sorulan-sorular`, **100%** of items in the FAQ content set are visible in the page’s main FAQ list and each item can be expanded to show its answer and collapsed again in manual testing.
- **SC-003**: A side-by-side content audit (home or landing inline FAQ vs. dedicated page) finds **zero** mismatches in question text, answer text, or order across **100%** of items in the FAQ content set.
- **SC-004**: In a keyboard-only walkthrough of at least five FAQ items across two pages (one inline, one dedicated), **100%** of expand/collapse actions succeed without pointer input, and focus remains visibly discernible after each action.
- **SC-005**: At least one site-wide surface (header or footer) exposes a link to `/sikca-sorulan-sorular` on **100%** of sampled pages that already include that global chrome (minimum sample: home, dedicated FAQ page, one landing page).
