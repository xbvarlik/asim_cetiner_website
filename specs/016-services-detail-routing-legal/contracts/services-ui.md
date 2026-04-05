# UI contract: services presentations & footer (016)

## `ServicesList` (compact — existing behavior)

- **Used on**: `HomeTemplate` only (via current import chain).
- **Structure**: Section heading “Hizmetlerimiz”, intro paragraph, grid of cards.
- **Card content**: Title + short description + icon; **no** bullet list.

## `ServicesListDetailed` (new)

- **Used on**: `app/(main)/hizmetler/page.tsx` only.
- **Structure**: Section heading + intro (may match or extend compact intro per copy pass); grid or stacked **large** cards (padding/typography visibly larger than compact grid).
- **Card content** (order):
  1. Icon
  2. Title (`h3` or equivalent)
  3. Detailed description (block paragraph, `detailedDescription`)
  4. `<ul>` with one `<li>` per highlight; semantic list, not icon bullets unless design requires

## Shared catalog contract

```ts
// Conceptual — actual path per implementation (e.g. lib/content/services.ts)
export type PublicServiceOffering = {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  highlights: readonly string[];
  // icon: LucideIcon — implementation-specific
};

export const PUBLIC_SERVICES: readonly PublicServiceOffering[] = [...];
```

Consumers:

- Compact cards: `title`, `shortDescription`, `icon`
- Detailed cards: `title`, `detailedDescription`, `highlights`, `icon`

## Footer legal block

- **Exact text** (no translation, no truncation):

  `Verilen tüm hizmetler danışmanlık kapsamındadır, psikiyatrik müdahale yapılmamaktadır.`

- **Visibility**: Any page rendering `Footer` must include this string in the DOM (screen readers + visual).

## Navigation contract

- **Must not** expose a link labeled for areas-of-work to a removed path.
- **Must** use `ROUTES` for all `href` values in header/footer nav (constitution).
