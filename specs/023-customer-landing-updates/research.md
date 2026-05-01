# Research: Customer landing UX & content (023)

## 1. Process section visual pattern vs horizontal flow (021)

**Decision**: Replace copy and headings per `023`/`docs/customer-requests.md` entirely in `lib/content/how-it-works.ts`; refactor `components/feature/how-it-works.tsx` to a **vertical, scannable** layout—numbered steps grouped with clear spacing / subtle separators (timeline or stacked “strip” cards)—and append the **Randevu Al** closing block linking to `ROUTES.contact` from `lib/routes.ts`. Drop the cramped horizontal dashed connector metaphor when it fights long Turkish body copy readability.

**Rationale**: Clarified FR-006 favors explicit visual separation (“not wall-of-text”); stakeholder copy is materially longer than the prior five blurbs.

**Alternatives considered**: Keep 021 horizontal scroll layout (rejected — density risk with new paragraph-length steps); accordion (rejected — not requested, adds client complexity).

---

## 2. Practice name accent `#2F3E4E` vs Tailwind/token rule

**Decision**: Declare CSS variable `--brand-name-accent` in `app/globals.css` under `:root`, map through `@theme inline` as `--color-brand-name-accent`, consume as `text-brand-name-accent`. Apply ONLY to hero structured name snippet + header logo text per clarifications—not footer body.

**Rationale**: Constitution mandates tokens over raw hex sprinkled in JSX while honoring exact stakeholder color where contrast passes on light backgrounds.

**Alternatives considered**: Raw `text-[#2F3E4E]` (rejected — violates styling convention); widening scope to footer (rejected — outside clarification Option A).

---

## 3. Service card navigation targets

**Decision**: Navigate to **`${ROUTES.services}#hizmet-${pillar.id}`** (matching existing `ServicePillarId`). Add stable `id` attributes on wrappers in `components/feature/services-list-detailed-cards.tsx`.

**Rationale**: Meets FR-003 “dedicated detail material” using current single `/hizmetler` authoritative page (016 pattern) without new routes.

**Alternatives considered**: Three separate slug pages (scope creep—not in current IA).

---

## 4. Maps / directions affordance

**Decision**: Extend `lib/site-contact.ts` with `getSiteOfficeMapsSearchHref()` returning `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_OFFICE_ADDRESS_SINGLE_LINE)}`. `components/feature/map-view.tsx` exposes a labelled **single-action** `<a>` wrapping address and/or trailing “Yol tarifi” style control.

**Rationale**: FR-010 allows outbound maps; avoids iframe CSP/privacy/consent overhead for v1 while meeting mobile + desktop parity.

**Alternatives considered**: Embedded Google Map (defer — heavier and may need provider keys/policy review).

---

## 5. Contact guidance duplication (FR-008 / Option C)

**Decision**: Centralize verbatim paragraph + inline `tel` / WhatsApp anchors in a **single authoring module under `lib/content/`** reused by **`ContactForm` intro region** everywhere it mounts (home-template stack + standalone contact page). Prefer a `.tsx` file only if JSX for links is cleaner than structured text + consumer.

**Rationale**: Prevents divergence across multiple `ContactForm` instances while satisfying clarification “every inquiry form route”.

**Alternatives considered**: Duplicate strings in JSX (rejected — fails SC-004 maintenance).
