# Research: 017-faq-section-pages

## 1. Single source for FAQ copy (FR-005)

**Decision**: Add `lib/content/faq.ts` exporting a readonly array of typed items (`id`, `question`, `answer` where `answer` is `ReactNode` or `string`—prefer **string** for simplicity and JSON-LD later, or **string with markdown-like paragraphs** as plain text split by `\n\n` if multiple paragraphs needed).

**Rationale**: Guarantees identical questions, answers, and order on home, SEO landings, and `/sikca-sorulan-sorular` without duplication.

**Alternatives considered**: Duplicate arrays in page files — rejected (drift risk).

## 2. Disclosure UI primitive

**Decision**: Add `components/ui/accordion.tsx` using **`@base-ui/react/accordion`**, following the same styling approach as existing `components/ui/button.tsx` (Tailwind + `cn`, focus rings). Configure the root for **multiple panels open** (`multiple` / equivalent API) so items behave independently per spec edge cases.

**Rationale**: Package already includes accordion exports; meets keyboard operation and association of trigger + panel for assistive tech (FR-006, FR-007). No new npm dependency.

**Alternatives considered**: `npx shadcn add accordion` — acceptable if it generates Base UI–aligned code; manual file is fine if CLI output diverges from repo style. Native `<details>` — viable but weaker consistency with design system and header/footer focus patterns.

## 3. Component layering

**Decision**: `components/feature/faq-section.tsx` composes the accordion, section heading (“Sıkça Sorulan Sorular” or prop-driven title), and optional intro line. Support a prop such as `variant: "inline" | "page"` for spacing and heading level (`h2` inside home scroll vs `h1` on dedicated page handled by page, not necessarily by FaqSection—either pattern is acceptable if document outline stays valid).

**Rationale**: Constitution: pages compose features; feature composes UI atoms.

**Alternatives considered**: Page imports `Accordion` directly — violates hierarchy (page → feature → ui).

## 4. Template placement (FR-001)

**Decision**: In `home-template.tsx`, order becomes: `Hero` → `About` → `ServicesList` → **`FaqSection`** → `ContactForm` → `MapView`.

**Rationale**: “Directly below services” with no other major section between; `ContactForm` currently follows services and must move after FAQ.

## 5. Routes and navigation (FR-004, FR-009)

**Decision**: Add `faq: "/sikca-sorulan-sorular"` to `ROUTES` in `lib/routes.ts`. Add a nav label (e.g. **“SSS”** or **“Sıkça Sorulan Sorular”**) to **both** `header.tsx` static nav and `footer.tsx` `SITE_LINKS` so discoverability exceeds the minimum.

**Rationale**: FR-009 allows header or footer; both improve UX with negligible cost.

**Alternatives considered**: Footer only — valid but weaker discoverability.

## 6. Excluding `/hizmetler` (FR-002a)

**Decision**: No change to `app/(main)/hizmetler/page.tsx` for FAQ. `HomeTemplate` is not used there; no FAQ injection on that layout.

**Rationale**: Matches clarification Option A.

## 7. Optional JSON-LD / structured data

**Decision**: **Out of scope for initial implementation** unless tasks explicitly add it; spec does not require rich results. Can be a follow-up using the same `PUBLIC_FAQ_ITEMS` strings.

**Rationale**: Reduces scope; content module makes a later addition trivial.
