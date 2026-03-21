# Feature Specification: Admin Panel

**Feature Branch**: `004-admin-panel`
**Created**: 2026-03-21
**Status**: Draft
**Input**: User description: "Implement a secure, cookie-authenticated Admin Panel for managing Leads, Blog Posts, and Offices, featuring paginated lists, custom ordering, and modal-based CRUD operations."

## Clarifications

### Session 2026-03-19

- Q: After successful sign-in, how should the admin session cookie behave? → A: **Sliding expiration — 7 days from last successful authenticated admin activity** (Option B).
- Q: How should **Office** admin list sorting work given the current Office data model? → A: **No schema change** — sort **by name only** (asc/desc); **default name ascending (A→Z)** (Option B).
- Q: What **password policy** applies to **new** and **changed** admin passwords? → A: **Minimum 8 characters** plus at least **one uppercase**, **one lowercase**, and **one digit** (Option B).
- Q: Should the admin shell include an explicit **Sign out** action? → A: **Yes** — persistent control that **ends the session** and redirects to **sign-in** (Option A).
- Q: Should **failed login** attempts be **rate-limited** in this feature? → A: **No** — **no** login throttling or lockout in this release; treat as **future hardening** (Option A).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Secure Admin Access (Priority: P1)

An authorized site operator opens the administration area, signs in with a
password, and receives a persistent session that keeps them signed in while they
work. They can **sign out** explicitly when finished. Anyone who is not signed in
cannot view or use admin tools and is guided to the sign-in screen instead.
Search engines are instructed not to index admin URLs.

**Why this priority**: Without authentication and access control, all other
admin capabilities would be exposed publicly.

**Independent Test**: Attempt to open any admin management URL without signing
in — access MUST be denied and the user MUST be directed to sign in. After a
valid sign-in, the same URL MUST load. Use **Sign out** and confirm protected
admin URLs require sign-in again. Verify that a machine-readable site policy
file excludes the admin area from crawling.

**Acceptance Scenarios**:

1. **Given** a visitor is not signed in, **When** they request any admin URL
   except the sign-in page, **Then** they are redirected to the sign-in page.
2. **Given** the sign-in page, **When** the operator enters valid credentials,
   **Then** they are signed in and redirected to an appropriate admin landing
   view.
3. **Given** the sign-in page, **When** the operator enters invalid
   credentials, **Then** they see a clear error and remain unsigned-in with no
   session granted.
4. **Given** a signed-in operator, **When** the session expires (including after
   **7 days** without an authenticated admin request) or the session is
   invalidated,
   **Then** subsequent requests to protected admin URLs require signing in
   again.
5. **Given** a signed-in operator on the admin shell, **When** they use the
   **Sign out** control,
   **Then** the session ends immediately, they are on the **sign-in** page, and
   protected admin URLs are inaccessible until they sign in again.
6. **Given** the public site’s crawler policy file, **When** it is inspected,
   **Then** the admin path prefix is disallowed for automated indexing.

---

### User Story 2 - Lead (Danışan) Administration (Priority: P2)

A signed-in operator views a paginated list of incoming client inquiries
(leads), narrows the list by status and office, sorts by relevant columns, and
updates a lead’s status or removes a lead after confirming the action in a
dialog.

**Why this priority**: Lead handling is the primary operational workflow for the
therapy practice after public contact forms submit data.

**Independent Test**: With sample leads in the system, sign in, open lead
management, apply filters and sorting, change a lead’s status, and delete a lead
with confirmation. Verify list pagination and that changes persist.

**Acceptance Scenarios**:

1. **Given** signed-in operator on lead management, **When** the page loads,
   **Then** leads appear in a table with pagination and default ordering by
   newest first.
2. **Given** the lead list, **When** the operator filters by status and/or
   office, **Then** only matching leads appear.
3. **Given** the lead list, **When** the operator changes sort field or
   direction (among supported options), **Then** rows reorder accordingly.
4. **Given** a lead row, **When** the operator assigns a new status, **Then**
   the change saves and the row reflects the new status.
5. **Given** delete is chosen for a lead, **When** the operator confirms in a
   dialog, **Then** the lead is removed per product rules (e.g. soft delete if
   that is the existing policy) and feedback confirms success.
6. **Given** delete is chosen, **When** the operator cancels the dialog,
   **Then** the lead is unchanged.

---

### User Story 3 - Office Administration (Priority: P3)

A signed-in operator maintains office locations: lists offices with pagination and
sorting, creates new offices, edits name, address, and optional map link, and
deletes an office with confirmation — all through modal dialogs.

**Why this priority**: Offices anchor lead assignment and public contact
selection; they must stay accurate without developer intervention.

**Independent Test**: CRUD an office end-to-end; verify public-facing office
lists (if any) would reflect changes after implementation (where applicable).

**Acceptance Scenarios**:

1. **Given** signed-in operator on office management, **When** they open the
   list, **Then** offices appear with pagination, default **name ascending
   (A→Z)**, and a **name** column header that supports **ascending/descending**
   sort (no other sort fields).
2. **Given** create office, **When** valid data is submitted in the modal,
   **Then** a new office appears in the list with confirmation feedback.
3. **Given** an existing office, **When** the operator edits and saves, **Then**
   updates persist and feedback confirms success.
4. **Given** delete office, **When** confirmed, **Then** behavior follows data
   rules (e.g. cannot delete if leads still reference the office, if that is the
   current business rule).
5. **Given** invalid or incomplete form data, **When** submit is attempted,
   **Then** inline or summary validation messages appear and no partial save
   occurs.

---

### User Story 4 - Blog Post Administration (Priority: P4)

A signed-in operator manages articles: paginated list with title, publication
state (active vs draft), and creation time; sorting; create/update in a modal;
delete with confirmation.

**Why this priority**: Content updates are important but secondary to lead and
office operations.

**Independent Test**: Create a post, toggle or set draft/active state, edit,
delete with confirmation; verify list updates and ordering.

**Acceptance Scenarios**:

1. **Given** blog management, **When** the list loads, **Then** posts show
   title, active/draft indication, created time, with pagination and default
   newest-first ordering.
2. **Given** the list, **When** the operator changes sort options among
   supported fields, **Then** rows reorder accordingly.
3. **Given** create or edit, **When** valid data is saved in the modal, **Then**
   the list reflects the post and feedback confirms success.
4. **Given** delete post, **When** confirmed in a dialog, **Then** the post is
   removed and feedback confirms success.

---

### User Story 5 - Admin Shell, Profile, and Placeholders (Priority: P5)

A signed-in operator navigates via a consistent admin layout (sidebar or top
navigation) to Leads, Blog, Offices, a statistics placeholder, and account
settings, and can **sign out** from the shell. From settings they change their
password by providing the current password and a new password, with validation and
confirmation feedback.

**Why this priority**: Completes navigation ergonomics and operational security
hygiene (password rotation).

**Independent Test**: Navigate all primary admin nav targets; open password
change, succeed with correct current password, fail with wrong current password.

**Acceptance Scenarios**:

1. **Given** a signed-in operator, **When** they use the admin navigation,
   **Then** they can reach lead, blog, office, statistics placeholder, and
   settings views, and a **Sign out** control is visible per **FR-014**.
2. **Given** settings / profile, **When** the operator submits a valid password
   change with correct current password, **Then** the password updates and
   success feedback is shown.
3. **Given** password change, **When** the current password is wrong, **Then**
   no password change occurs and an error is shown.
4. **Given** statistics, **When** opened, **Then** a clear placeholder indicates
   future reporting (no fabricated metrics).

---

### Edge Cases

- What happens when the database has no admin account yet? Initial deployment
  MUST still allow bootstrap (e.g. seed creates one admin only if none exist).
- What happens when login is attempted repeatedly with wrong passwords? Each
  attempt MUST follow **FR-003** (no session on failure; clear error). This
  feature does **not** require **rate limiting**, **cool-down**, or **account
  lockout** (clarification **2026-03-19**, Option A); those MAY be added later
  as **security hardening** if operational risk warrants it.
- What happens when an office delete is blocked by existing leads? The operator
  MUST see an understandable message referencing the business rule.
- What happens when session cookie is tampered or expired? Access MUST be
  denied until sign-in succeeds again.
- What happens when the operator is idle for **longer than 7 days** without any
  authenticated admin request? The session MUST expire and require sign-in
  again (sliding window does not extend without qualifying activity).
- What happens when two operators share one account? Out of scope for
  concurrent-edit conflict; last write wins unless a future multi-user story
  adds locking.
- What happens after **Sign out** if the operator uses the browser **back**
  button? Protected admin content MUST NOT be usable without a **new** valid
  session (e.g. navigation or refresh re-checks auth).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST persist a dedicated **Admin** identity with a
  unique identifier and a **secret credential** stored in non-reversible form
  (never plain text at rest).
- **FR-002**: Seeding MUST ensure at least one Admin exists in empty
  environments using a **temporary** initial secret communicated out-of-band to
  operators; seeding MUST remain idempotent for Status and Office reference
  data already defined for the product.
- **FR-003**: The system MUST expose a **sign-in** page reachable without an
  existing session and MUST reject invalid credentials without creating a
  session.
- **FR-004**: After successful sign-in, the system MUST establish a **browser
  session** with a **sliding lifetime of seven (7) days** from the **last
  successful authenticated admin request** (each such request MAY renew the
  bound expiry); after **7 days** without such activity the session MUST be
  invalid. The session cookie MUST be not readable by page scripts (httpOnly),
  scoped to the site, and sent only on same-site requests by default (e.g.
  SameSite=Lax), and MUST use secure transmission in production.
- **FR-005**: All admin URLs under the agreed admin prefix MUST be inaccessible
  without a valid session **except** the sign-in page; unauthenticated users
  MUST be redirected to sign-in.
- **FR-006**: **Lead** and **blog post** list operations used by the admin MUST
  support **pagination** and **ordering** by configurable field and direction (per
  **FR-007** and **FR-009**). **Office** list operations MUST support
  **pagination** and ordering **only by office name** (ascending or descending),
  with **default sort name ascending (A→Z)**; the Office data model MUST **not**
  require new timestamp fields solely for admin sorting in this feature.
- **FR-007**: Lead management MUST provide filtering by **status** and
  **office**, default sort **newest first** by creation time, and optional
  sorts by creation time, name, and last update time (ascending or descending).
- **FR-008**: Lead management MUST allow **inline status change** and **delete**
  with a **confirmation step** before irreversible action.
- **FR-009**: Blog management MUST list posts with **title**, **active vs draft
  state**, and **created time**, with pagination; default sort newest first;
  optional sorts by creation time, title, and last update (asc/desc).
- **FR-010**: Blog management MUST support **create**, **update**, and **delete**
  via modals; delete MUST require confirmation.
- **FR-011**: Office management MUST support full **create**, **update**, and
  **delete** for name, address, and optional map link via modals; delete MUST
  require confirmation and MUST respect existing referential rules for leads.
- **FR-012**: Password change MUST require the **current** secret, validate the
  **new** secret, and give clear success or failure feedback. The **new** secret
  MUST be at least **8** characters and include at least **one uppercase Latin
  letter**, **one lowercase Latin letter**, and **one digit** (0–9). The same
  rules apply to any other flow that sets a **new** admin password in this
  feature. **Sign-in** with an existing stored credential is not re-validated
  against these composition rules (only correctness of the current password).
- **FR-013**: All mutations (auth, CRUD, status updates, password change) MUST
  be validated at the boundary and MUST show **immediate user-visible
  feedback** on success and failure.
- **FR-014**: Admin UI MUST use a **dedicated layout** with navigation to Lead,
  Blog, Office, Statistics (placeholder), and Settings/Profile. The layout MUST
  expose a persistent **Sign out** control (e.g. header or settings area) that
  **terminates the session immediately** and redirects the operator to the
  **sign-in** page.
- **FR-015**: Reusable **modal** and **data table** patterns MUST be used for
  CRUD and lists (pagination and sortable headers) without duplicating
  low-level primitives per screen.
- **FR-016**: The public crawler policy file MUST **disallow** crawling of the
  entire admin path prefix.
- **FR-017**: Client-side session awareness for the admin area MUST be available
  to interactive admin components via a dedicated **auth context** scoped to the
  admin route group (without exposing the session secret to scripts).

### Key Entities

- **Admin**: Single operational account (initial scope); identifier; secret
  credential stored hashed; updated when password changes. New passwords MUST
  meet **FR-012** composition rules.
- **Lead**: Existing inquiry records; linked to **Status** and **Office**;
  ordering and filters apply to list views; delete follows existing soft-delete
  policy if already defined.
- **Blog post**: Title, body content, active flag (admin UI maps inactive to
  “draft” presentation unless the data model gains an explicit draft state
  later).
- **Office**: Name, address, optional map link; subject to delete restrictions
  when leads reference the office. Admin list ordering is **by name only**
  (asc/desc); default **A→Z** (see **FR-006**).
- **Status**: Reference data for lead pipeline; used as filter and inline
  update target.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of unauthenticated direct requests to protected admin pages
  result in redirection to sign-in (manual test sample of at least 5 distinct
  admin URLs).
- **SC-002**: A trained operator can sign in, locate a specific lead using
  filters, change its status, and see the update reflected in the list within
  **2 minutes** on first attempt under normal conditions.
- **SC-003**: 100% of attempted CRUD and password operations display explicit
  success or error feedback within **2 seconds** of the server completing the
  action (perceived responsiveness on typical broadband).
- **SC-004**: Office and blog lists remain usable with **at least 50 rows** per
  entity type via pagination (no single-page overload in the default view).
- **SC-005**: Crawler policy disallows the admin prefix in a way verifiable by
  opening the policy file (no indexing requirement for admin URLs).

### Assumptions

- **Single admin account** in initial scope; the Admin table may contain one
  seeded row; multi-admin and role-based access are out of scope unless added
  in a follow-up.
- **Blog “Draft”** in the admin list corresponds to **inactive** posts in the
  existing data model (`isActive: false`); “Active” corresponds to `isActive:
  true`. No separate draft column is required unless product later demands it.
- **Lead deletion** in admin follows the **existing product rule** (e.g. soft
  delete); the spec does not override soft-delete vs hard-delete — implementation
  MUST align with the current data layer behavior.
- Admin URLs use a stable prefix (e.g. `/admin/...`); exact path names for each
  screen follow the product brief (leads, blog, offices, login).
- **İstatistikler** is a **placeholder** page with no real analytics in this
  feature.
- Initial seeded password is **temporary**; operators MUST change it after first
  access in production (process expectation, not automated enforcement unless
  specified later).
- **Admin session** uses a **7-day sliding** idle window per **FR-004** and
  clarification session **2026-03-19**.
- **Office admin list**: **name-only** sort, default **ascending**, **no** new
  Office timestamp columns for this feature (clarification **2026-03-19**,
  Option B).
- **Admin password composition** for **new** passwords: **≥8** characters with
  **uppercase**, **lowercase**, and **digit** (clarification **2026-03-19**,
  Option B); see **FR-012**. The **seeded temporary** password MAY predate this
  policy and remains valid until changed.
- **Sign out** is a **first-class** admin shell action (clarification
  **2026-03-19**, Option A); see **FR-014**.
- **Login rate limiting** / **lockout** is **out of scope** for this feature
  (clarification **2026-03-19**, Option A); plan as optional **follow-up
  hardening**, not part of acceptance for this release.
