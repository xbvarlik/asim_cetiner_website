# Data model: 022-aeo-llms-jsonld

Conceptual entities for machine-readable practice identity (no new database tables).

## Entity: `ComplianceCopy`

Fixed strings enforced across `llms.txt` and JSON-LD descriptions.

| Field | Description | Rules |
|-------|-------------|--------|
| `mandatoryDisclaimer` | Scope statement | Exact: `Verilen hizmetler danışmanlık kapsamındadır, psikiyatrik müdahale bulunmamaktadır.` |
| `blacklistTerms` | Forbidden substrings | `Terapi`, `Psikoterapi`, `Hekim`, `Doktor`, `Physician` in **new** Turkish marketing strings for this feature |
| `whitelistTerms` | Required framing | `Danışmanlık`; titles `Uzman Psikolog` or `Psikolojik Danışman` per policy |
| `tone` | Voice | Neutral, informative, academic; no superlatives (e.g. “en iyi”, “rakipsiz”) |

## Entity: `PracticeSummaryDocument` (`llms.txt`)

| Field | Description |
|-------|-------------|
| `title` | H1 — practice name |
| `summary` | Short paragraph: danışmanlık framing, authority (universities from approved copy), includes `mandatoryDisclaimer` |
| `sectionLinks` | Pointers to About, Çalışma Alanları, Contact — use `ROUTES` paths from `lib/routes.ts` |
| `format` | Markdown text served as `text/plain` or `text/markdown` (browser treats as downloadable text; spec allows markdown-oriented structure) |

**Validation**: Manual + search for blacklist terms; disclaimer exact match.

## Entity: `StructuredIdentityGraph` (JSON-LD)

Single graph serialized as `application/ld+json` (one or more `@graph` nodes acceptable if linked).

### Node: `LocalBusiness` (primary)

| Property | Source / notes |
|----------|----------------|
| `@type` | `LocalBusiness` |
| `name` | Practice name from approved metadata/copy |
| `description` | Turkish text: disclaimer + concise authority (schools from `docs/info.md`) |
| `url` | `NEXT_PUBLIC_SITE_URL` origin |
| `telephone` | E.164 or display from `lib/site-contact.ts` |
| `email` | `SITE_EMAIL` |
| `address` | `PostalAddress` from `SITE_OFFICE_ADDRESS_SINGLE_LINE` (split into street/addressLocality/postalCode if implemented) |
| `sameAs` | `SITE_INSTAGRAM_URL`, `getSiteWhatsappHref()` optional policy, **plus** string placeholders `PLACEHOLDER_ACADEMIA_URL`, `PLACEHOLDER_RESEARCHGATE_URL` until replaced |
| `knowsAbout` | Array including Wikidata IRIs from `research.md` + optional plain-string labels in Turkish |
| `employee` or `founder` | Nested `Person` (choose one relationship supported by schema.org; `employee` is typical for solo practice) |

### Node: `Person` (practitioner)

| Property | Source / notes |
|----------|----------------|
| `@type` | `Person` |
| `name` | Full name as on site |
| `jobTitle` | `Uzman Psikolog` (per research decision) |
| `description` | Same disclaimer + authority blurb (can mirror business or be shorter) |
| `sameAs` | Subset or mirror of business `sameAs` as appropriate |
| `knowsAbout` | May mirror business or be omitted if graph links clearly |

**Relationships**: `LocalBusiness` → `employee` → `Person` (or `@id` references in `@graph`).

**Validation**: No `MedicalBusiness`; JSON parseable; Zod optional (see `research.md`).

## Entity: `SiteOrigin`

| Field | Description |
|-------|-------------|
| `baseUrl` | `NEXT_PUBLIC_SITE_URL` with fallback for dev |

Used only for absolute `url` / `@id` in JSON-LD.
