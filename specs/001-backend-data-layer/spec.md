# Feature Specification: Backend Data Layer

**Feature Branch**: `001-backend-data-layer`
**Created**: 2026-03-19
**Status**: Draft
**Input**: User description: "Establish the Prisma schema, database seeding, and the server-side service layer for the Therapist Landing Page and Admin Panel."

## Clarifications

### Session 2026-03-19

- Q: What should happen when an office with associated leads is deleted? → A: Restrict — prevent deletion and return an error.
- Q: Should lead deletion be hard delete or soft delete? → A: Soft delete with a `deletedAt` timestamp; all read queries (getAll, getById) MUST filter out soft-deleted records by default.
- Q: Should getAll return all records unbounded or support pagination? → A: Offset pagination — getAll accepts `page` and `pageSize` parameters, returns a page of results plus total count.
- Q: Are lead status transitions constrained or unrestricted? → A: Unrestricted — any status can transition to any other status; no state machine enforcement at the service layer.
- Q: Should Status.name and Office.name have uniqueness constraints? → A: Both unique — database-level unique constraint on Status.name and Office.name.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Persistent Data Storage for Leads, Offices, Blogs, and Statuses (Priority: P1)

The system MUST have a structured data layer capable of persisting and querying
four core entities: therapy service **Leads** (contact form submissions),
**Office** locations, **Blog Posts**, and lead **Statuses**. Each lead is
associated with exactly one office and one status. Without this foundational
data layer, no other feature (landing page form, admin panel, blog) can
function.

**Why this priority**: Every downstream feature depends on the existence of a
well-defined, relational data model. This is the single blocking prerequisite.

**Independent Test**: The data model can be validated by running a migration
against an empty database and confirming all tables, columns, constraints, and
relationships are created correctly.

**Acceptance Scenarios**:

1. **Given** a fresh database, **When** the schema migration runs, **Then** four
   tables (Status, Office, Lead, BlogPost) are created with all specified
   columns and constraints.
2. **Given** the Lead table, **When** a lead record is inserted, **Then** it
   MUST reference a valid Office and a valid Status (foreign key integrity).
3. **Given** the Lead table, **When** a lead is created without a message,
   **Then** the message field is stored as null (optional field).
4. **Given** the BlogPost table, **When** a blog post is created without
   specifying `isActive`, **Then** it defaults to active (true).
5. **Given** the Office table, **When** an office is created without a maps
   link, **Then** the maps link field is stored as null (optional field).

---

### User Story 2 - CRUD Service Layer for All Entities (Priority: P2)

Administrators and system features MUST be able to create, read, update, and
delete records for all four entities through a consistent, validated service
layer. All data mutations MUST be validated before reaching the database. All
service operations MUST be asynchronous and include structured error handling.

**Why this priority**: Once the schema exists, the service layer is required
before any UI or API can interact with the data. It is the bridge between the
data model and all consumer-facing features.

**Independent Test**: Each service can be tested by invoking its CRUD functions
against a test database and verifying correct data persistence, retrieval,
update, and deletion — including validation rejection of invalid inputs.

**Acceptance Scenarios**:

1. **Given** a valid lead payload, **When** the lead creation service is called,
   **Then** the lead is persisted and returned with its generated UUID.
2. **Given** an invalid lead payload (e.g., missing required email), **When**
   the lead creation service is called, **Then** a validation error is returned
   and no record is persisted.
3. **Given** an existing blog post, **When** the update service is called with
   a new title, **Then** the blog post title is updated and the change is
   persisted.
4. **Given** an existing office, **When** the delete service is called, **Then**
   the office is removed from the database.
5. **Given** a request for all leads, **When** the getAll service is called with
   page 1 and pageSize 10, **Then** up to 10 lead records are returned along
   with the total count of matching records.
6. **Given** a non-existent ID, **When** getById is called, **Then** the
   service returns null or a not-found indicator without throwing an unhandled
   exception.

---

### User Story 3 - Database Seeding with Reference Data (Priority: P3)

On initial deployment or development setup, the database MUST be populated with
a predefined set of **lead statuses** and **placeholder office locations** so
that the application is immediately usable without manual data entry.

**Why this priority**: Seeding is only needed once (initial setup) and is not a
runtime dependency, but it ensures that drop-down selectors and status workflows
function correctly from the start.

**Independent Test**: Run the seed script against a freshly migrated database
and confirm that status and office records exist with the expected values.

**Acceptance Scenarios**:

1. **Given** a freshly migrated database with no data, **When** the seed script
   runs, **Then** exactly 5 status records are created: "New", "Contacted",
   "In Progress", "Completed", "Cancelled".
2. **Given** a freshly migrated database, **When** the seed script runs,
   **Then** at least 2 office records are created with name, address, and
   optionally a maps link.
3. **Given** a database that already has seed data, **When** the seed script
   runs again, **Then** it does not create duplicate records (idempotent
   behavior).

---

### Edge Cases

- What happens when a lead is created referencing a non-existent office or
  status? Foreign key constraint MUST reject the operation.
- What happens when an office is deleted that has associated leads? The system
  MUST reject the deletion and return an error indicating the office still has
  associated leads (restrict / no cascade).
- What happens when a service receives an empty or malformed payload? Validation
  MUST reject it before any database interaction.
- What happens when the database connection is unavailable? Services MUST
  surface a meaningful error, not an unhandled promise rejection.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST define a `Status` entity with a unique integer
  identifier and a name. The name MUST be unique (database-level constraint).
- **FR-002**: System MUST define an `Office` entity with a unique integer
  identifier, name, address, and an optional maps link. The name MUST be unique
  (database-level constraint).
- **FR-003**: System MUST define a `Lead` entity with a UUID identifier, name,
  phone number, email, optional message, mandatory foreign keys to Office and
  Status, and an optional `deletedAt` timestamp for soft deletion.
- **FR-004**: System MUST define a `BlogPost` entity with a unique integer
  identifier, title, content, and an active flag defaulting to true.
- **FR-005**: System MUST provide a service for each entity exposing: getAll
  (paginated), getById, create, update, and delete operations.
- **FR-005a**: The getAll operation MUST accept `page` (1-indexed) and
  `pageSize` parameters and return the matching page of results together with
  the total record count.
- **FR-006**: All create and update operations MUST validate input against a
  defined schema before persisting data.
- **FR-007**: System MUST provide a seed script that populates Status and Office
  tables with predefined reference data.
- **FR-008**: The seed script MUST be idempotent — running it multiple times
  produces the same result without duplicates.
- **FR-009**: All service functions MUST be asynchronous.
- **FR-010**: All service functions MUST include error handling that surfaces
  structured, meaningful error information.
- **FR-011**: The Lead delete operation MUST perform a soft delete by setting
  `deletedAt` to the current timestamp instead of removing the record.
- **FR-012**: All Lead read operations (getAll, getById) MUST exclude
  soft-deleted records (where `deletedAt` is not null) by default.

### Key Entities

- **Status**: Represents the lifecycle stage of a therapy lead (e.g., New,
  Contacted, In Progress, Completed, Cancelled). Used as a lookup/reference
  table. Name is unique. Transitions between statuses are unrestricted — the
  admin may set any status at any time.
- **Office**: Represents a physical therapy office location with name (unique),
  address, and optional map link. Leads are associated with a specific office.
- **Lead**: Represents a prospective client who submitted a contact/inquiry
  form. Contains personal contact information and is linked to one office and
  one status. Supports soft deletion via an optional `deletedAt` timestamp.
- **BlogPost**: Represents a content article for the public-facing landing page.
  Can be toggled active/inactive for visibility control.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All four entity tables are created successfully after running a
  single migration command against an empty database.
- **SC-002**: Every CRUD operation (5 operations x 4 entities = 20 total)
  functions correctly: creates, reads (single + paginated list), updates,
  deletes, and returns correct pagination metadata.
- **SC-003**: Invalid input is rejected by validation before reaching the
  database in 100% of tested invalid-payload scenarios.
- **SC-004**: The seed script populates exactly 5 statuses and at least 2
  offices on a clean database.
- **SC-005**: Running the seed script twice on the same database produces no
  duplicate records.
- **SC-006**: All service functions handle database unavailability or constraint
  violations without unhandled exceptions.

### Assumptions

- The database engine is PostgreSQL (hosted on Supabase or equivalent).
- Type definitions mirror the data model and use type aliases (not interfaces)
  per project convention.
- Validation schemas are co-located with or adjacent to the service layer.
- The Prisma client singleton pattern is already established or will be created
  as part of this feature.
