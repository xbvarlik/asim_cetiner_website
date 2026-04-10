# Contract: Home content composition (020-how-testimonials-home)

## 1. `HomeTemplate` section order

**Contract**: `components/feature/home-template.tsx` MUST render sections in this order unless a follow-up spec explicitly changes it:

1. `Hero` — `heroTitle`, `heroSubtitle` props (defaults from `hero.tsx` constants aligned with `info.md`).
2. `About`
3. `ServicesList`
4. **`HowItWorks`** (new)
5. **`TestimonialsSection`** (new)
6. `FaqSection`
7. `ContactForm`
8. `MapView`

**Inputs**: `HomeTemplateProps` unchanged except if new props are required; **prefer zero new props** — new sections read from `lib/content/*` internally.

---

## 2. Copy module exports

| Module | Export | Contract |
|--------|--------|----------|
| `lib/content/faq.ts` | `PublicFaqItem[]` as `PUBLIC_FAQ_ITEMS` | Length ≥ 10 after migration; each `answer` may contain `\n\n`; IDs stable for analytics/bookmarks |
| `lib/content/services.ts` | `PUBLIC_SERVICE_PILLARS` (name TBD) or renamed canonical export | Exactly **3** pillars `aile`, `bireysel`, `cift`; nested `sections[]` non-empty |
| `lib/content/how-it-works.ts` | `HOW_IT_WORKS_STEPS` | Length 4–5; `order` strictly increasing |
| `lib/content/testimonials.ts` | `PUBLIC_TESTIMONIALS` | Length ≥ 3; `displayName` matches anonymized pattern (initial + surname initial + optional dot) |
| `lib/site-contact.ts` | `SITE_PHONE_E164_DIGITS`, `SITE_PHONE_DISPLAY`, `getSiteWhatsappHref`, `getSiteTelHref` | Digits MUST match visible marketing number; changing one requires changing all |

---

## 3. Metadata contract

| Location | Field | Source |
|----------|-------|--------|
| `app/layout.tsx` | `metadata.title.default` | `info.md` **Title** |
| `app/layout.tsx` | `metadata.description` | Shortened **Subtitle** or first sentence thereof |

Home page `app/(main)/page.tsx` MAY keep `title: "Ana Sayfa"` with template `%s | Asım Çetiner` as long as **default tab title** for `/` resolves to acceptable branding; if product owner requires **full Title on home tab**, override `metadata` on `page.tsx` accordingly (document in tasks).

---

## 4. Marquee accessibility contract

**Contract**: When `prefers-reduced-motion: reduce` is active:

- No **infinite** CSS animation on testimonial track.
- All testimonial **quotes** remain visible via **static layout** (stack or grid) without requiring animation to read.

---

## 5. Turkish typography

**Contract**: All user-visible strings from `info.md` MUST be stored as **UTF-8** in source files; no HTML-escaped entities in JSX text nodes for Turkish characters (`İ`, `ı`, `ş`, etc.).
