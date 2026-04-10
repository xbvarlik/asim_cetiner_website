# Data Model: 020-how-testimonials-home

Static **content entities** only (no database). All structures are TypeScript types + readonly arrays, validated at module load where Zod is already used.

## 1. `SiteMetadataCopy` (conceptual)

| Field | Type | Rules |
|--------|------|--------|
| `documentTitle` | string | Exact **Title** from `docs/info.md` |
| `defaultDescription` | string | Derived from **Subtitle**, ≤ ~160 chars recommended for meta description |

*Consumers*: `app/layout.tsx`, optionally `app/(main)/page.tsx` description.

---

## 2. `HeroCopy`

| Field | Type | Rules |
|--------|------|--------|
| `title` | string | Same as `documentTitle` or approved shortening if legally required (spec prefers exact Title) |
| `subtitle` | string | Exact **Subtitle** from `info.md` |

*Consumers*: `components/feature/hero.tsx` exports `DEFAULT_HERO_TITLE` / `DEFAULT_HERO_SUBTITLE`.

---

## 3. `AboutCopy`

| Field | Type | Rules |
|--------|------|--------|
| `paragraphs` | `readonly string[]` | One or more paragraphs from **About** block; preserve line breaks as separate paragraphs |

*Consumers*: `components/feature/about.tsx`.

---

## 4. `FaqItem`

| Field | Type | Rules |
|--------|------|--------|
| `id` | string | Stable kebab-case slug (e.g. `ilk-seans-nasil`) |
| `question` | string | Single-line question text |
| `answer` | string | Full answer; use `\n\n` between paragraphs |

*Validation*: Existing `faqItemSchema` in `lib/content/faq.ts` — extend list to **10** items minimum per `info.md` source.

*Consumers*: `FaqSection`, `/sikca-sorulan-sorular` if it reuses the same list.

---

## 5. `ServicePillar` (replaces six-offering model for *marketing truth*)

| Field | Type | Rules |
|--------|------|--------|
| `id` | `'aile' \| 'bireysel' \| 'cift'` | Stable id for keys and anchors |
| `title` | string | Pillar heading from `info.md` |
| `intro` | string | Opening paragraph for that pillar |
| `sections` | `readonly { heading: string; items: readonly string[] }[]` | Numbered areas in source become **heading + bullet list** |

*Consumers*: `services-list-cards.tsx` (summary), `services-list-detailed-cards.tsx` (full tree).

*Validation*: Optional Zod schema `servicePillarSchema` for runtime assert in dev.

---

## 6. `ProcessStep`

| Field | Type | Rules |
|--------|------|--------|
| `order` | number | 1-based; **4–5** steps total |
| `title` | string | Short step title (Turkish) |
| `description` | string | 1–3 sentences |

*Consumers*: `lib/content/how-it-works.ts`, `components/feature/how-it-works.tsx`.

---

## 7. `Testimonial`

| Field | Type | Rules |
|--------|------|--------|
| `id` | string | Stable slug |
| `quote` | string | Client-facing quote (Turkish sample copy until real quotes approved) |
| `displayName` | string | Anonymized pattern, e.g. `Ayşe K.` / `John D.` |

*Consumers*: `lib/content/testimonials.ts`, `components/feature/testimonials-section.tsx`.

*Rules*: Minimum **3** items for a credible carousel; duplicate array for marquee loop as **presentation** concern, not data model.

---

## 8. `PracticeLocation`

| Field | Type | Rules |
|--------|------|--------|
| `singleLineAddress` | string | Exact **Office Addresses** string |

*Consumers*: `MapView`, `Footer`.

---

## 9. `PracticeContact`

| Field | Type | Rules |
|--------|------|--------|
| `phoneE164Digits` | string | Digits only, country code included (for `wa.me` / `tel:`) |
| `phoneDisplay` | string | Human-readable (spaces/parens) |
| `email` | string | Valid email |
| `instagramHandle` | string | Handle without URL |
| `instagramUrl` | string | Full `https://` profile URL |

*Consumers*: `lib/site-contact.ts`, `footer.tsx`, any header CTA using phone.

---

## Relationships (conceptual)

```text
SiteMetadataCopy ──► layout metadata
HeroCopy ──► Hero
AboutCopy ──► About
ServicePillar[] ──► Services home + /hizmetler
ProcessStep[] ──► HowItWorks
Testimonial[] ──► TestimonialsSection
PracticeLocation + PracticeContact ──► MapView + Footer + site-contact helpers
FaqItem[] ──► FaqSection (+ dedicated FAQ page if shared)
```
