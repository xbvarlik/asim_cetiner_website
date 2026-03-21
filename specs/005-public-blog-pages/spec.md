# Feature Specification: Public Blog List & Detail

**Feature Branch**: `005-public-blog-pages`  
**Created**: 2026-03-21  
**Status**: Draft  
**Input**: User description: "Implement the public-facing Blog List and Blog Detail pages using existing services, adhering to the Project Constitution and Atomic component hierarchy."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse Published Articles (Priority: P1)

A visitor opens the public blog index and sees a vertical list of **published**
articles (newest first), each showing a title, date, short preview, and a clear
way to open the full article.

**Why this priority**: Without the list, discoverability of content is zero;
this is the primary entry to the blog.

**Independent Test**: With at least one **active** post in the system, open the
blog index URL and confirm only active posts appear, ordered newest-first, with
preview and navigation to detail. With **no** active posts, confirm a friendly
empty state (no errors).

**Acceptance Scenarios**:

1. **Given** one or more **active** blog posts exist, **When** the visitor opens
   the blog list page, **Then** each item shows title, formatted creation date,
   a truncated preview (~3–4 lines), and a control to read more.
2. **Given** multiple active posts, **When** the list loads, **Then** items are
   ordered by creation time **newest first**.
3. **Given** **inactive** (draft) posts exist, **When** the list loads, **Then**
   draft posts do **not** appear.
4. **Given** **no** active posts exist, **When** the list loads, **Then** the
   visitor sees a clear, friendly message equivalent to **“Henüz yazı
   paylaşılmadı”** (or semantically equivalent Turkish copy).
5. **Given** the list page, **When** the visitor uses “read more” (or
   equivalent), **Then** navigation uses the project’s canonical **route
   constants** (no hardcoded path strings in feature code).

---

### User Story 2 - Read a Full Article (Priority: P2)

A visitor opens a specific article from the list (or via a direct link) and
sees the full title, publication date, and complete body, with an obvious way to
return to the blog index.

**Why this priority**: Completes the read journey after discovery on the list.

**Independent Test**: Open a valid **active** post’s public detail URL and
verify full content and back navigation. Open a draft or non-existent id and
verify the app responds with a **not found** experience (no full article
leakage).

**Acceptance Scenarios**:

1. **Given** an **active** post with a known public identifier, **When** the
   visitor opens its detail page, **Then** the full title, date, and body render
   readably.
2. **Given** the detail page, **When** the visitor looks for navigation back to
   the index, **Then** a **“Geri Dön”** (or equivalent) control is visible and
   returns them to the blog list using canonical routes.
3. **Given** a post id that does **not** exist, **When** the detail page is
   requested, **Then**    the site shows a standard **not found** outcome without exposing private
   draft content.
4. **Given** a post that exists but is **inactive** (draft), **When** the public
   detail URL is requested, **Then** the outcome is the same as a missing post
   (**not found**), not a full article view.

---

### Edge Cases

- **Invalid or non-numeric id** in the URL: MUST resolve to a **not found**
  outcome (consistent with missing posts).
- **Very long titles or bodies**: layout MUST remain usable (wrapping, spacing,
  no horizontal overflow on common mobile widths).
- **Content containing images**: when the stored body includes images suitable
  for web delivery, rendering SHOULD use the framework’s **optimized image**
  component for those assets where technically feasible; if content is plain
  text only, no image handling is required on that page.
- **Special characters in titles** (quotes, diacritics): MUST display correctly
  in the UI and in the **page title** (metadata) without corruption.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The public blog **list** route MUST render only blog posts whose
  **published/active** flag is true (draft/inactive posts MUST NOT appear).
- **FR-002**: The list MUST be ordered by **creation time descending** (most
  recent first).
- **FR-003**: When there are **zero** active posts, the list page MUST show a
  friendly empty state including messaging equivalent to **“Henüz yazı
  paylaşılmadı”**.
- **FR-004**: The public blog **detail** route MUST load a single post by the
  **identifier** in the URL and render it only if it is **active**; otherwise
  the response MUST be a **not found** outcome.
- **FR-005**: List and detail pages MUST obtain data through the existing
  **blog** data access layer (same family of operations used elsewhere in the
  product), with list behavior extended or composed so that **only active**
  records are shown on the public index.
- **FR-006**: UI MUST follow the project’s **component hierarchy**: list and
  detail **pages** compose **feature** components; feature components compose
  **UI atoms** as needed—pages MUST NOT implement card or article layout using
  raw atoms alone for blog-specific behavior.
- **FR-007**: A **BlogList** feature component MUST accept the **list of posts**
  as props and render a **vertical stack** (“flat list”) with clear spacing
  between items.
- **FR-008**: A **BlogCard** feature component MUST show **title**, **created
  date** (human-readable, locale-appropriate), and a **text preview** of the body
  limited to approximately **three lines** of text in the layout (visual
  truncation acceptable).
- **FR-009**: Each card MUST include a **“read more”** (or equivalent) control
  whose target path is built from the central **routes** definition for the blog
  detail pattern (no duplicated path literals in feature code).
- **FR-010**: A **BlogContent** feature component MUST render **full title**,
  **date**, and **full body** for the detail view and MUST include a **“Geri
  Dön”** (or equivalent) affordance to return to the blog index.
- **FR-011**: The **detail** page’s **document title** (tab/metadata) MUST
  reflect the **article title** (and sensible defaults for site naming if the
  product already uses a title template).
- **FR-012**: **Titles** and **inline links** on blog pages MUST use the
  product’s **semi-dark green** brand treatment for consistency with the rest of
  the public site.
- **FR-013**: Article body typography MUST be tuned for **readability**
  (appropriate line length, line height, and contrast), using project-approved
  utility patterns (e.g. prose-style utilities if available).
- **FR-014**: Where post bodies include **images** meant for end users, those
  images SHOULD be rendered with the framework’s **optimized image** component
  when the implementation can reliably map source URLs to that component’s
  rules.

### Key Entities

- **Blog post (public view)**: Identifier, title, body content, creation
  timestamp, **active** flag (only active items appear on public list/detail).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: With seeded active posts, **100%** of items on the public list
  are active and ordered **newest first** (manual check of at least 5 posts).
- **SC-002**: **100%** of direct requests to a **draft** or **non-existent**
  detail id result in a **not found** outcome and do **not** show the full
  article content (manual sample of at least 3 cases).
- **SC-003**: A first-time visitor can open the list, open one article, and
  return to the list using **“Geri Dön”** in **under 30 seconds** on a typical
  connection.
- **SC-004**: List and detail pages expose **distinct, accurate** metadata titles
  verifiable in the browser (list uses blog section title; detail uses article
  title).
- **SC-005**: On a **375px-wide** viewport, list and detail content require **no
  horizontal scrolling** for text and previews (images may scroll only if
  unavoidable for very wide assets).

### Assumptions

- **“Active”** aligns with the existing data model’s **published** flag (e.g.
  `isActive: true`); **draft** maps to inactive.
- **Public detail URL** uses the same identifier type as the existing blog post
  primary key (numeric id in path segment), unless a future spec introduces
  slugs.
- **Body content** is trusted **admin-authored** text/HTML; extra HTML
  sanitization beyond default safe rendering is **out of scope** unless a
  security review requires it.
- **ROUTES** (or equivalent single source of truth) already includes or will
  include the blog list path; detail path pattern is added consistently there.
