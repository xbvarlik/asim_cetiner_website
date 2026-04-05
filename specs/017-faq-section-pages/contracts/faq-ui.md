# UI contract: FAQ / SSS (017)

## Shared content contract

```ts
// Conceptual — implement at lib/content/faq.ts
export type PublicFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const PUBLIC_FAQ_ITEMS: readonly PublicFaqItem[] = [...];
```

- **Ordering**: Array order is canonical for inline and dedicated page (FR-005).
- **Copy**: Turkish, stakeholder-approved; no lorem in production.

## `FaqSection` (new feature component)

- **Used on**:
  - `HomeTemplate` (inline variant — below `ServicesList`, above `ContactForm`)
  - `app/(main)/sikca-sorulan-sorular/page.tsx` (page variant — primary content)
- **Not used on**: `/hizmetler`, `/iletisim`, `/hakkimda`, blog, admin (unless a future spec says otherwise).

### Structure

- Outer **`<section>`** with accessible label (e.g. `aria-labelledby` pointing at section heading).
- **Heading**: Visible title for the block; on the dedicated page the document’s primary title may be on the page wrapper—ensure a single clear `<h1>` for `/sikca-sorulan-sorular` (FR-008).
- **List**: One accordion item per `PublicFaqItem`; **trigger** shows `question`; **panel** shows `answer` (support multi-paragraph via split on `\n\n` → multiple `<p>`).

### Interaction & accessibility

- **Keyboard**: Triggers are focusable; Enter/Space toggles (FR-006).
- **Focus**: `focus-visible` ring consistent with header/footer links.
- **Assistive tech**: Panel content is associated with its trigger per accordion primitive semantics (FR-007).

### Visual (therapeutic UI goals)

- Calm spacing (8px grid), soft radii (`rounded-xl` family), muted panel backgrounds optional, `shadow-sm` on triggers optional—match existing sections (`ContactForm`, `ServicesList`).

## Accordion primitive (`components/ui/accordion.tsx`)

- Styled wrapper around `@base-ui/react/accordion`.
- **Multiple** expanded items allowed (independent state).
- No business logic—presentation only.

## Navigation contract

- All links to the FAQ page use **`ROUTES.faq`** (constitution).
- At least one persistent link in **header** and one in **footer** after implementation (exceeds FR-009 minimum).

## Metadata contract

- `app/(main)/sikca-sorulan-sorular/page.tsx` exports `Metadata` with Turkish `title` and `description` appropriate for “Sıkça Sorulan Sorular”.
