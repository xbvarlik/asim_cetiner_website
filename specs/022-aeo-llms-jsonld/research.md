# Research: 022-aeo-llms-jsonld

## 1. Primary JSON-LD `@type` for the practice

**Decision**: Use **`LocalBusiness`** as the single `@type` for the top-level practice entity.

**Rationale**: Matches a physical office (Kadıköy address) and generic local service positioning. Avoids `HealthAndBeautyBusiness`, which can imply cosmetic/beauty retail and adds noise for a psychology counseling practice. `MedicalBusiness` is excluded by spec (regulatory positioning).

**Alternatives considered**: `HealthAndBeautyBusiness` (spec-allowed; rejected to reduce category ambiguity); multi-type `["LocalBusiness","ProfessionalService"]` (optional later if rich results need it—not required for MVP).

---

## 2. Where to inject JSON-LD in the Next.js App Router tree

**Decision**: Render structured data from a **feature component composed inside `SiteShell`** (e.g. `<PracticeJsonLd />` alongside existing shell children), so every route using `SiteShell` receives the same block **without** emitting it on **admin** routes (admin does not use `SiteShell`).

**Rationale**: Satisfies **FR-004** and the clarification (“same block on every page that uses that shell”) while respecting the edge case that layouts **outside** the public shell are out of scope. Placing only in `app/(main)/layout.tsx` would **miss** `app/(home-variations)/*` routes, which also wrap `SiteShell`.

**Alternatives considered**: Root `app/layout.tsx` (rejected: would also tag `/admin/*`); only `(main)/layout.tsx` (rejected: omits SEO landing variants).

---

## 3. `llms.txt` delivery

**Decision**: Add **`public/llms.txt`** as a static Markdown file. Next.js serves files in `public/` at the site root, so **`GET /llms.txt`** works without a route handler.

**Rationale**: Spec allows static or generated content; static is simplest, cache-friendly, and easy to review in PRs. If copy must track `docs/info.md` mechanically later, migrate to build-time generation in a follow-up.

**Alternatives considered**: `app/llms.txt/route.ts` returning `text/markdown` (more control over headers; unnecessary for MVP).

---

## 4. Canonical base URL for JSON-LD (`url`, `@id`, `sameAs` resolution)

**Decision**: Introduce **`NEXT_PUBLIC_SITE_URL`** (absolute origin, no trailing slash, e.g. `https://www.example.com`) read in server code that builds the graph. Document in `quickstart.md` / env sample. Fallback for local dev: `http://localhost:3000` when unset.

**Rationale**: Schema.org `LocalBusiness.url` and JSON-LD `@id` should be absolute IRIs; there is no existing project constant for site origin.

**Alternatives considered**: Hardcoding production domain (rejected: wrong for preview/staging); deriving only from `headers()` (valid but adds complexity; env is standard for marketing sites).

---

## 5. `knowsAbout` Wikidata URIs (evidence-based methods)

**Decision**: Use HTTPS entity URLs (stable):

| Topic (Turkish context in copy) | Wikidata |
|-----------------------------------|----------|
| Bilişsel davranışçı yaklaşım / CBT | `https://www.wikidata.org/entity/Q1147152` (cognitive behavioral therapy) |
| Şema danışmanlığı / schema therapy | `https://www.wikidata.org/entity/Q172195` (schema therapy) |

**Rationale**: Satisfies **FR-008** with public knowledge-base URIs that match intent; verified via Wikidata search API.

**Alternatives considered**: Wikipedia page URLs only (less stable for machine linking than Wikidata entity IRIs).

---

## 6. Professional title in JSON-LD (`jobTitle`)

**Decision**: **`Uzman Psikolog`** (aligned with spec Assumptions and master’s-level clinical training described in `docs/info.md`).

**Alternatives considered**: `Psikolojik Danışman` (spec-allowed; use only if marketing explicitly switches positioning).

---

## 7. Zod validation for JSON-LD

**Decision**: Optional **Zod** schema validating the **serialized object** before `JSON.stringify` in dev or always in CI-minded builds—keeps constitution alignment (Zod at boundary) without requiring a runtime dependency path for static literals if team prefers minimal code.

**Rationale**: Constitution requires Zod for validated payloads; structured data is generated server-side—treating the graph object as a validated payload is consistent.

**Alternatives considered**: No validation (faster; higher risk of typos in `@type` strings).
