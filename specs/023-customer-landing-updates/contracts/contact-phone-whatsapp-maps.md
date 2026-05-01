# Contract: Contact guidance, tel/WhatsApp, maps (023)

## Shared guidance block (`FR-008`)

**Location (implementation suggestion)**: add `lib/content/contact-lead-copy.tsx` (Server Component exporting default fragment) — or an equivalent **`lib/content/` module** consumed inline by `contact-form.tsx`. Naming is flexible; **single authoring point** for the paragraph is mandatory.

**Insertion point**: Immediately above or directly beside the enquiry `<form>` inside `components/feature/contact-form.tsx`, visible on hydration (including Suspense fallback path where sensible — at minimum parity after load).

**Scope**: Every `ContactForm` mount on **public marketing** routes, including `/` variants using `HomeTemplate` and standalone `/iletisim`. **Excluded**: admin dashboard flows.

### Links embedded in prose

Consumers MUST derive dial and chat URLs from `lib/site-contact.ts`:

```ts
import {
  getSiteTelHref,
  getSiteWhatsappHref,
  SITE_PHONE_DISPLAY,
} from "@/lib/site-contact";
```

- Phone segment wraps `getSiteTelHref()`.
- WhatsApp segment wraps `getSiteWhatsappHref()`.

Never hand-type E.164 sequences in JSX literals.

---

## Maps external navigation (`FR-010`)

Extend `lib/site-contact.ts`:

```ts
export function getSiteOfficeMapsSearchHref(): string {
  const q = encodeURIComponent(SITE_OFFICE_ADDRESS_SINGLE_LINE);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}
```

**`components/feature/map-view.tsx`**: Provide one primary actionable control hitting `getSiteOfficeMapsSearchHref()` (address text-as-link plus optional secondary “directions” text control is acceptable if both resolve to the **same destination**).
