# Feature Specification: Answer Engine Optimization (AEO) — practice summary and structured identity

**Feature Branch**: `022-aeo-llms-jsonld`  
**Created**: 2026-04-14  
**Status**: Draft  
**Input**: User description: "**Goal:** Implement Answer Engine Optimization (AEO) by adding a `/llms.txt` file and a dynamic JSON-LD structured data component." — including Turkey legal terminology constraints, neutral advertising tone, mandatory disclaimer, `llms.txt` structure, structured data (business + nested practitioner), authority-focused descriptions, and placeholder external profile URLs where real links are not yet available.

## Clarifications

### Session 2026-04-14

- Q: Where should JSON-LD be embedded (root layout vs home-only vs subset of routes)? → A: Root layout / shared app shell (Option A)—the same `application/ld+json` block on every page that uses that shell.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Accurate, compliant machine-readable practice summary (Priority: P1)

An automated crawler or answer engine that reads the site’s public `llms.txt` document receives a concise, legally compliant summary of who provides services, what “çalışma alanları” (areas of work) are offered, how to reach the practice, and that services are within counseling scope without psychiatric intervention.

**Why this priority**: This is the primary artifact for answer-engine-oriented discovery; if it is wrong or non-compliant, the feature fails its core purpose and creates legal risk.

**Independent Test**: Fetch `/llms.txt` from the deployed site and verify structure, mandatory disclaimer, terminology rules, section coverage, and alignment with approved practice copy (including academic background for authority).

**Acceptance Scenarios**:

1. **Given** a client requests `GET /llms.txt`, **When** the response returns successfully, **Then** the body follows the `llms.txt` convention (clear title, short summary, navigable pointers to key site areas such as About, Çalışma Alanları, Contact).
2. **Given** the summary text in `llms.txt`, **When** a compliance reviewer audits wording, **Then** none of the blacklisted terms appear and required whitelist framing (“danışmanlık”, “Uzman Psikolog” or “Psikolojik Danışman” as applicable) is respected, and tone is neutral and informative (no superlative marketing).
3. **Given** the `llms.txt` content, **When** the reviewer checks for the mandatory scope statement, **Then** the following sentence appears verbatim: `Verilen hizmetler danışmanlık kapsamındadır, psikiyatrik müdahale bulunmamaktadır.`
4. **Given** the practice copy source approved for the site, **When** the “description” / summary passages are compared, **Then** they highlight the practitioner’s academic and training background (using institutions stated in approved copy—e.g. universities named there) to support authority, without inventing credentials or schools not present in approved materials.

---

### User Story 2 - Rich structured identity for search and answer systems (Priority: P2)

A search or answer system that consumes embedded JSON-LD can identify the practice as a local or health/beauty-oriented business (not a medical-clinic-only type), link a nested person record for the psychologist, see job title, topics of expertise with authoritative concept references, and declared same-as URLs for profiles.

**Why this priority**: Improves machine understanding and entity linking for AEO while staying outside MD-only positioning by schema choice.

**Independent Test**: Load HTML for the public home **or** any other route that uses the same root layout / shared app shell; extract `application/ld+json` script(s), validate logical structure and field rules without requiring a specific programming framework.

**Acceptance Scenarios**:

1. **Given** published HTML from any route that uses the public root layout / app shell (including `/`), **When** embedded structured data is present, **Then** the graph includes a top-level business entity with `@type` of `LocalBusiness` **or** `HealthAndBeautyBusiness` (and MUST NOT use `MedicalBusiness`).
2. **Given** the business entity, **When** nested roles are inspected, **Then** a `Person` (or equivalent nesting that clearly identifies the practitioner) is included with `jobTitle` set to **either** `Uzman Psikolog` **or** `Psikolojik Danışman` (consistent with approved professional positioning and whitelist).
3. **Given** the person or business descriptions exposed to structured data, **When** text is reviewed, **Then** the mandatory disclaimer sentence appears verbatim in the relevant description fields as required for this feature, alongside authority-oriented background aligned with approved copy.
4. **Given** the `knowsAbout` (or equivalent) field, **When** topics list evidence-based methods (e.g. cognitive–behavioral orientation, schema counseling), **Then** entries use stable references to public knowledge bases (e.g. Wikidata/Wikipedia URIs) where appropriate, not only free-text labels.
5. **Given** profile URLs not yet finalized, **When** `sameAs` is emitted, **Then** it includes explicit placeholder tokens such as `PLACEHOLDER_ACADEMIA_URL` and `PLACEHOLDER_RESEARCHGATE_URL` for deferred profiles, and includes real URLs discovered in the project for channels that already exist (e.g. Instagram from canonical site contact), without guessing undisclosed profiles.

---

### User Story 3 - Stable citation of authority and methods (Priority: P3)

Stakeholders can demonstrate that both `llms.txt` and JSON-LD descriptions reinforce the same factual, sober narrative about training and methods, suitable for audits and for AI systems that rank “authority.”

**Why this priority**: Supports long-term trust and reduces contradictory signals between human-visible pages and machine-readable layers.

**Independent Test**: Side-by-side review of `llms.txt` summary and JSON-LD description fields against `docs/info.md` (or successor approved copy source).

**Acceptance Scenarios**:

1. **Given** approved copy lists specific universities and programs, **When** machine-readable descriptions are written, **Then** they reference those institutions accurately (no substitution with unapproved “prestige” schools).
2. **Given** method names in Turkish (e.g. “Bilişsel Davranışçı Yaklaşım”, “Şema Danışmanlığı”), **When** linked to knowledge bases, **Then** the links correspond to the intended concepts.

---

### Edge Cases

- **Approved copy changes**: If `docs/info.md` (or the canonical content module) is updated, machine-readable layers should be regenerated or updated so they do not contradict the site—stakeholders should treat copy source as authoritative.
- **Missing social profiles**: Deferred URLs remain as readable placeholders until replaced; no fabricated ResearchGate/Academia links.
- **Schema validator warnings**: Non-critical warnings may exist; critical errors that prevent parsing of JSON-LD should be avoided.
- **Language mix**: Primary audience text is Turkish; English labels in schema properties are acceptable where schema.org expects them; user-visible compliance applies to Turkish marketing strings in scope.
- **Terminology in legacy site areas**: Global site pages outside this deliverable may still contain separate remediation; this feature’s new strings must comply fully with blacklist/whitelist rules.
- **Layouts outside the public shell**: Routes that do not use the same root layout / app shell as public marketing pages (e.g. admin or isolated layouts) are **out of scope** for JSON-LD in this feature unless a later requirement extends identity markup there.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST expose a public `llms.txt` resource at `/llms.txt` (served as static or generated content) whose format follows the community `llms.txt` guidance: markdown-oriented structure with an H1 for the practice name, a brief informative summary using “danışmanlık” framing (not blacklisted terms), and a list of key sections including About, Çalışma Alanları (mapped from “services” concept), and Contact.
- **FR-002**: All new user-facing Turkish strings introduced in `llms.txt` for this feature MUST comply with: (a) **Blacklist** — never use: `Terapi`, `Psikoterapi`, `Hekim`, `Doktor`, `Physician`; (b) **Whitelist** — use `Danışmanlık`, and professional titles `Uzman Psikolog` or `Psikolojik Danışman` as appropriate; (c) **Tone** — neutral, informative, academic; no superlatives (e.g. “en iyi”, “rakipsiz”).
- **FR-003**: `llms.txt` MUST include the disclaimer verbatim: `Verilen hizmetler danışmanlık kapsamındadır, psikiyatrik müdahale bulunmamaktadır.`
- **FR-004**: The site MUST embed one or more `application/ld+json` documents in the **root layout or shared app shell** used by public marketing pages, so the **same** structured-data block appears in the HTML of **every** route that uses that shell (including `/`). Crawlers receive the graph without an extra round trip on those routes.
- **FR-005**: JSON-LD MUST declare a primary business entity with `@type` `LocalBusiness` or `HealthAndBeautyBusiness`, and MUST NOT use `MedicalBusiness`.
- **FR-006**: JSON-LD MUST nest a `Person` (or equivalent) for the practitioner under or linked from the business entity, with `jobTitle` matching the approved choice between `Uzman Psikolog` and `Psikolojik Danışman`.
- **FR-007**: JSON-LD description fields (and the `llms.txt` summary where it serves as “description”) MUST include the same mandatory disclaimer sentence as **FR-003**, and MUST summarize academic/professional authority using facts from approved site copy (universities and programs actually listed there—not invented affiliations).
- **FR-008**: JSON-LD MUST include `knowsAbout` (or equivalent) entries referencing public knowledge-base URIs for named approaches (e.g. cognitive–behavioral orientation, schema counseling) where those URIs exist and match intent.
- **FR-009**: JSON-LD `sameAs` MUST list verified profile URLs found in the codebase (e.g. canonical Instagram from site contact). For profiles not yet available, MUST use explicit placeholders: `PLACEHOLDER_ACADEMIA_URL`, `PLACEHOLDER_RESEARCHGATE_URL`, and any additional placeholders named in the same clear pattern—so owners can replace them without code search.
- **FR-010**: Implementation MUST scan the repository for existing social or academic links when populating `sameAs`; any channel without a confirmed URL uses a placeholder rather than an invented link.

### Key Entities

- **Machine-readable practice summary (`llms.txt`)**: Public text document summarizing the practice, areas of work, contact paths, compliance disclaimer, and pointers to main site sections.
- **Structured identity graph (JSON-LD)**: Business node (non-medical business type), nested practitioner person, titles, topics with knowledge-base references, `sameAs` URLs and placeholders, and descriptions aligned with compliance and authority goals.
- **Compliance rule set**: Blacklist terms, whitelist terms, tone rules, and fixed disclaimer sentence that apply to all new copy in this feature’s deliverables.

### Assumptions

- Approved biographical and academic facts live in `docs/info.md` (or a single canonical content module synced with it); machine-readable text derives from that source unless marketing approves updates.
- **Professional title**: The practitioner is represented as **Uzman Psikolog** in structured data and summaries unless stakeholders explicitly choose **Psikolojik Danışman** for a given release (both remain allowed by policy; one should be chosen consistently per deployment).
- Placeholder tokens in `sameAs` are acceptable until real URLs are published; search quality may improve after replacement.
- The existing footer disclaimer elsewhere on the site may use slightly different wording from an older spec; this feature’s artifacts use the disclaimer sentence exactly as specified in **FR-003** for `llms.txt` and JSON-LD description fields.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In 100% of checks, `llms.txt` is retrievable at `/llms.txt` with HTTP success and contains the mandatory disclaimer sentence exactly as specified in **FR-003**.
- **SC-002**: A structured audit of new Turkish strings in these deliverables finds **zero** occurrences of blacklist terms (**FR-002**) and **zero** superlative marketing phrases in the prohibited category, using a defined search list and manual review of narrative paragraphs.
- **SC-003**: On a sample of routes that use the public shell (including `/`), embedded structured data parses as valid JSON in 100% of checks, declares a business type in the allowed set (**FR-005**), includes a nested practitioner **Person** with the agreed `jobTitle` (**FR-006**), and excludes `MedicalBusiness`.
- **SC-004**: At least two authority signals are present in machine-readable descriptions: (1) the mandatory disclaimer, and (2) accurate academic or training background drawn from approved copy (verified by comparison to the approved source in **FR-007**).
- **SC-005**: `sameAs` contains every confirmed social/academic URL found in project configuration for this practice, and every undeclared optional profile uses an explicit `PLACEHOLDER_*` token rather than a guessed URL (**FR-009**, **FR-010**).
