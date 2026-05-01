# Data model — customer landing UX (023)

This feature introduces **no** Prisma schema changes or server-persisted entities. Content is modeled as immutable **marketing records** validated by human review (`SC-004`).

## Entities

### 1. `ServiceHomeIntro`

| Field | Type | Constraints |
|-------|------|---------------|
| `body` | `string` | MUST equal FR-002 sentence (allow typographic normalization of quotes/spaces); includes “online ve yüz yüze” wording |

### 2. `HowItWorksPublication`

Represents FR-005/FR-006 surface.

| Field | Type | Constraints |
|-------|------|---------------|
| `sectionTitle` | `string` | «Psikolojik Danışmanlık Süreci Nasıl İşler?» |
| `introParagraph` | `string` | Verbatim stakeholder intro paragraph (“Bazen nereden başlayacağınızı…” through “…değişim oluşturmaktır.”) |
| `steps` | ordered list (5 items) | Each item has sequence 1–5 plus `title` + `description` verbatim from stakeholder doc |
| `ctaEyebrow` | `string` | «Randevu Al» |
| `ctaBody` | multi-line text | Paragraphs beneath CTA eyebrow verbatim from stakeholder (“Eğer siz…” + contact timing lines) |

**Lifecycle**: Stored as TypeScript literals in `lib/content/how-it-works.ts`; changes require editorial review against `docs/customer-requests.md`.

### 3. `ContactGuidanceBlock`

| Field | Type | Constraints |
|-------|------|---------------|
| `body` (`FR-008`) | `string` / JSX | Paragraph exactly as clarified; exposes inline phone + WhatsApp wording |
| `telHref` | `string` | `getSiteTelHref()` from `lib/site-contact.ts` |
| `whatsappHref` | `string` | `getSiteWhatsappHref()` |

Rendered adjacent to **every** public `ContactForm` instance (`FR-008` clarification C).

### 4. `BrandNameAccentRule`

Design token—not persisted DB row.

| Field | Value |
|-------|-------|
| `foregroundHex` | `#2F3E4E` mapped to `--brand-name-accent` / `--color-brand-name-accent` |
| `allowedSurfaces` | Hero emphasized name substring + `components/feature/header.tsx` wordmark |

### 5. `ServicePillarInboundLink`

Derived from catalog — no DB.

| Field | Type |
|-------|------|
| `pillarId` | `"aile" \| "bireysel" \| "cift"` |
| `homeCardHref` | `${ROUTES.services}#hizmet-${pillarId}` |

Anchors MUST exist server-side after detailed services layout exposes matching `id` attributes.

## Validation rules

- String equality audits per `SC-004` checklist before release (services intro + process baseline routes + all inquiry-form surfaces).
- `tel`/`wa.me` links MUST reference `SITE_PHONE_E164_DIGITS` canonical constant—no handwritten digit drift.
