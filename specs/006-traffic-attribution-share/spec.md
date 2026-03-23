# Feature Specification: Traffic Attribution, Lead Source & Social Share

**Feature Branch**: `006-traffic-attribution-share`  
**Created**: 2026-03-21  
**Status**: Draft  
**Input**: User description: "Implement a visitor tracking system that logs traffic sources to the database, enables lead attribution, contextual Home (Anasayfa) navigation on SEO pages, and a social sharing tool with campaign tagging."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Log visits from marketing links (Priority: P1)

A marketer shares links with a recognizable **source** parameter in the URL (for
example standard campaign query parameters). When a visitor lands on the public
site with that parameter present, the business records **one visit entry** per
browser session for that landing: which **source** was used, which **path** they
landed on, and—when present—**medium** and **campaign** details. Refreshing the
page in the same session does **not** create duplicate visit rows.

**Why this priority**: Without reliable visit logging, attribution and follow-up
analysis of campaigns are unreliable.

**Independent Test**: Open a public URL with a valid source parameter, reload
several times, and confirm **at most one** new visit record exists for that
session. Open the same URL in a **new** browser session and confirm a **new**
visit record can be created.

**Acceptance Scenarios**:

1. **Given** the URL includes a **source** query parameter with a non-empty
   value, **When** the public page loads the first time in a session, **Then** a
   **visit log** row is stored with that source, the **landing path** (path only,
   without sensitive data), optional medium/campaign fields when provided, and a
   timestamp.
2. **Given** a visit was already logged for this browser session, **When** the
   visitor refreshes or navigates within the site, **Then** **no additional**
   visit row is written for the same session solely because of refresh.
3. **Given** the URL has **no** source parameter, **When** the page loads,
   **Then** **no** visit row is created **for that reason** (normal browsing
   without campaign tagging).
4. **Given** the visitor lands on a **non-public** or **staff-only** area,
   **When** logging rules are evaluated, **Then** visit logging **does not**
   apply (no marketing noise from internal use).

---

### User Story 2 - Attribute contact leads to their source (Priority: P2)

A visitor who arrived via a tagged link later submits the **contact** form. The
**lead** stored in the system includes the **marketing source** captured during
their visit (when available) so staff can see which channel produced the lead.

**Why this priority**: Connects marketing effort to concrete conversions.

**Independent Test**: Land with a tagged URL, submit a valid contact form, and
verify the stored lead shows the **same source label** as the landing URL.
Submit another lead after visiting without a tag and verify the source field is
empty or explicitly “unknown” per product rules.

**Acceptance Scenarios**:

1. **Given** a source was captured for the visitor’s session, **When** they
   submit the contact form successfully, **Then** the new lead record includes
   that **source** value (nullable field allowed only when no source was ever
   captured).
2. **Given** no source was ever captured in the session, **When** they submit
   the form, **Then** the lead record does not falsely claim a specific channel
   (field remains unset or follows a documented default).
3. **Given** the visit log stores optional **medium** and **campaign** values,
   **When** they are present on the landing URL, **Then** they are available on
   the **visit log**; linking those fields onto the **lead** is **optional** in
   this release unless explicitly required by follow-up specs (visit log remains
   the system of record for full campaign detail).

---

### User Story 3 - Context-aware “Anasayfa” on SEO landing pages (Priority: P3)

A visitor browsing an **SEO-focused landing page** (a dedicated entry page that
mirrors the main site structure) uses the header link labeled **Anasayfa** (or
equivalent “Home”). They expect to return to **that landing page’s “home”
experience**, not always the main site root, so they stay in the same content
context.

**Why this priority**: Improves orientation and reduces bounce when landing
pages are entry points.

**Independent Test**: On each configured SEO landing path, click **Anasayfa**
and confirm the destination is **that same SEO path** (not the generic root).
On the main home and ordinary section pages, **Anasayfa** goes to the **main
home**.

**Acceptance Scenarios**:

1. **Given** the visitor is on a URL that belongs to the **SEO landing page**
   set defined for this product (district/service-focused entry pages), **When**
   they activate **Anasayfa**, **Then** they are taken to **that page’s own
   path** (the “home” of that variant).
2. **Given** the visitor is on the **main home** or a **standard** section page
   (about, services, contact, etc.), **When** they activate **Anasayfa**, **Then**
   they are taken to the **main home** path.
3. **Given** the product adds or removes an SEO landing path later, **When**
   routing rules are updated in one central place, **Then** **Anasayfa**
   behavior stays consistent without duplicating path lists across the header.

---

### User Story 4 - Share the current page with channel-tagged links (Priority: P4)

A visitor opens a **share** control, chooses a **channel** (e.g. chat, social
networks), and gets a **link** to the **current page** that includes a
**source** query parameter identifying the **platform** so that when someone
else opens it, the visit can be logged under that channel. They can also **copy
the link** and receive clear confirmation that the copy succeeded.

**Why this priority**: Encourages organic sharing while keeping attribution
consistent with Story 1.

**Independent Test**: From a public page, open share, pick each offered channel,
and verify the generated URL includes **`utm_source`** (or the same source
parameter name used site-wide) set to a **stable platform identifier**. Use **Copy
link** and confirm feedback (e.g. toast) appears once.

**Acceptance Scenarios**:

1. **Given** the share dialog is open, **When** the visitor selects **WhatsApp,
   Facebook, LinkedIn, or X (Twitter)**, **Then** the shared URL is the current
   page URL with **`utm_source`** set to a value agreed for that platform (e.g.
   `whatsapp`, `facebook`, `linkedin`, `x`).
2. **Given** **Instagram** is offered, **When** the visitor selects it, **Then**
   the product provides a sensible action (e.g. copy link or open a compatible
   share flow), still using a tagged URL where technically possible.
3. **Given** the visitor uses **Copy link**, **When** the copy completes,
   **Then** they see **non-blocking confirmation** (e.g. brief on-screen
   message).
4. **Given** the share UI uses a **tabbed** layout to switch between options,
   **When** they move between tabs, **Then** labels and actions remain clear and
   accessible on mobile widths.

---

### Edge Cases

- **Malformed or oversized** query parameters: values should be **bounded** or
  normalized so storage and logs remain safe (no unbounded strings).
- **Multiple source parameters** in one URL: define a single **precedence** rule
  (e.g. first valid value wins).
- **Visitor blocks cookies**: source should still be **recoverable for the
  form** using **session-only browser storage** where possible.
- **Direct navigation** to contact without a prior tagged landing: lead saves
  without a fabricated source.
- **Admin and auth areas**: no visit logging from those areas; share control
  either hidden or inapplicable.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST persist **visit log** records containing: unique
  identifier, **source** (channel label), **landing path**, optional **medium**,
  optional **campaign**, and **creation time**.
- **FR-002**: Visit logging MUST run only when the landing URL includes a
  **non-empty source** parameter (aligned with common **`utm_source`** usage).
- **FR-003**: The system MUST prevent **duplicate visit rows** for the **same
  browser session** when the user refreshes or revisits pages (session-scoped
  “already logged” behavior).
- **FR-004**: The captured source MUST be **available to the contact form** at
  submit time via **durable-enough browser storage** (cookie and/or session
  storage) so attribution survives typical in-session navigation.
- **FR-005**: **Lead** records MUST support an optional **marketing source**
  field (`utmSource` or equivalent name) populated from the captured session
  source when the visitor submits the contact form.
- **FR-006**: All **writes** for visit logs and lead creation MUST use the
  product’s **approved server-side persistence path** (same family as existing
  lead submission—no direct client-to-database access).
- **FR-007**: The **Anasayfa** (home) link in the public header MUST use a
  **single helper** that returns the **SEO landing path** when the current route
  is one of the configured SEO entries, otherwise the **main home** path.
- **FR-008**: The set of **SEO landing paths** MUST be defined in **one central
  routing definition** shared with the helper (no duplicated string paths in the
  header).
- **FR-009**: The product MUST provide a **Share** experience (modal dialog) with
  **tabs** for: **WhatsApp, Instagram, Facebook, LinkedIn, X (Twitter)**,
  generating share targets that include **`utm_source=<platform id>`** on the
  shared URL.
- **FR-010**: The Share experience MUST include **Copy link** with **visible
  success feedback** after copying.
- **FR-011**: Icons and visual affordances for Share MUST stay **consistent**
  with the rest of the public site (single icon set style).

### Key Entities

- **Traffic log (visit)**: Unique id, **source** label, **landing path**,
  optional **medium**, optional **campaign**, **created at**. Represents one
  attributed landing in a session (per anti-spam rules).
- **Lead (update)**: Existing lead entity gains optional **marketing source**
  (nullable text) linking conversions back to the captured **utm_source** (or
  equivalent).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: For a tagged landing URL, **100%** of first loads in a **new**
  session produce **exactly one** visit log row in manual testing across at
  least **5** refresh cycles in the same session.
- **SC-002**: **100%** of successful contact submissions after a tagged landing
  show the **correct source** on the lead record in manual testing (sample of
  at least **3** channels).
- **SC-003**: On **all** configured SEO landing pages, **Anasayfa** resolves to
  the **variant home** in **100%** of manual checks; on non-SEO pages, to **main
  home**.
- **SC-004**: For each share channel offered (minimum: WhatsApp, Facebook,
  LinkedIn, X), generated links include **`utm_source`** in **100%** of manual
  samples; **Copy link** shows confirmation in **100%** of trials.
- **SC-005**: On a **375px-wide** viewport, the share dialog remains **usable**
  (no clipped primary actions; tabs or fallback layout readable) in manual
  checks.

### Assumptions

- **Parameter name** for inbound source detection is **`utm_source`**, consistent
  with common marketing tools; optional **`utm_medium`** and **`utm_campaign`**
  map to the visit log’s optional fields when present.
- **SEO landing paths** match the product’s existing marketed URLs (Istanbul /
  couples / CBT / Üsküdar / Beşiktaş psychology landing pages and any future
  entries added alongside them in the same central list).
- **Reporting UI** (dashboards, charts) for traffic logs is **out of scope** for
  this feature unless specified later; value is **durable storage** and **lead
  linkage**.
- **Privacy**: First-party attribution for operations and lead follow-up; site
  **privacy policy** remains the governing notice for visitors.

### Out of Scope

- Automated **spam/fraud scoring** beyond basic session de-duplication.
- Changing **admin** analytics products or third-party pixels.
- **Email** as a share channel (unless added in a later spec).
