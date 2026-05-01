# Quickstart — verify 023 manually

Repo root `d:\Codes\TherapistLanding\asim_cetiner_website`.

```powershell
npm run lint
npm run dev
```

## Route matrix (`SC-004` inventory helpers)

Visit each URL; checklist against spec:

| Route | Confirm |
|-------|---------|
| `/` (`ROUTES.home`) | Hero scale + accent + Services intro + clickable tiles → `/hizmetler#…` + process copy + FR-008 beside form |
| `/istanbul-psikolog` (+ other `SEO_LANDING_PATHS`) | Variant hero still OK; parity for services/process/contact modules |
| `/iletisim` | FR-008 + tel/WA + maps block if MapView reused |
| `/hizmetler` | IDs align with home deep links |

## Gesture smoke tests (`SC-006`)

1. Tap/click maps control from `/` footer map section → Google Maps resolves to Kadıköy address pin.
2. Tap WhatsApp glyph/text inside FR-008 block → WhatsApp composer targets `SITE_PHONE_E164_DIGITS`.
3. Narrow viewport regression: hero line breaks sane; horizontal service motion still clickable.
