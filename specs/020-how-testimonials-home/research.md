# Research: 020-how-testimonials-home

## 1. Canonical copy placement

**Decision**: Keep **`docs/info.md`** as the human-edited source of truth; implement **typed modules** under `lib/content/` (`faq.ts`, `services.ts`, new `how-it-works.ts`, `testimonials.ts`) that **embed the same strings** (or structured slices) used by components. Optionally add a one-line comment at top of each module: `// Synced from docs/info.md — 020`.

**Rationale**: Matches existing `PUBLIC_FAQ_ITEMS` / `PUBLIC_SERVICES` pattern, enables Zod validation, keeps pages server-only.

**Alternatives considered**: Runtime import of markdown (rejected: extra parser dependency and constitution prefers simple static modules); CMS (rejected: out of scope).

---

## 2. Services body vs current six-card catalog

**Decision**: **Replace** the marketing shape with **three pillars** aligned to `info.md`: **Aile Danışmanlığı**, **Bireysel Danışmanlık**, **Çift Danışmanlığı**, each with an introductory sentence plus **nested topic groups and bullet lines** as in the source. Home (`ServicesListCards`) shows a **compact** presentation of the three pillars (e.g. cards linking to anchors on `/hizmetler` or expandable summaries); `/hizmetler` (`ServicesListDetailed`) renders the **full** nested structure for readability.

**Rationale**: FR-003 requires the services presentation to preserve the **meaning and structure** of the approved copy; the six generic offerings (`travma`, `stres`, etc.) do not match the source document.

**Alternatives considered**: Only updating short blurbs on existing six cards (rejected: does not preserve source structure); adding a single long prose block without lists (rejected: hurts scannability and diverges from source).

---

## 3. Global / site metadata title

**Decision**: Set **root** `metadata.title.default` and `metadata.description` in `app/layout.tsx` to the **Title** and a **concise description** derived from **Subtitle** in `info.md` (trim to sensible length for SERP).

**Rationale**: Spec SC-001 implies tab title and hero align with approved Title; root metadata currently differs from `info.md` Title.

**Alternatives considered**: Only changing hero strings (rejected: leaves browser tab / shares out of sync).

---

## 4. Contact: phone, email, Instagram, footer, MapView

**Decision**: Centralize **E.164 digits**, **display phone**, **email**, **Instagram profile URL**, and **office address line** in **`lib/site-contact.ts`** (or adjacent `lib/content/contact.ts`) and consume from **Footer**, **MapView**, and any CTA that shows the same digits. Update `SITE_PHONE_E164_DIGITS` and `SITE_PHONE_DISPLAY` to **`05544010176`** / formatted Turkish display; email **`pskasimcetiner@gmail.com`**; Instagram **`https://instagram.com/Klinikpsikologasimcetiner`** (or equivalent normalized URL).

**Rationale**: Single source prevents drift between footer, WhatsApp link, and visible number.

**Alternatives considered**: Hardcoding only in footer (rejected: duplicates and violates DRY).

---

## 5. Testimonials motion (slow RTL) and reduced motion

**Decision**: Implement the infinite horizontal drift with **CSS `@keyframes`** translating the track **right → left** over a **long duration** (e.g. 45–90s per full cycle, tuned to SC-004 “~30s+” perception). Duplicate testimonial cards in the DOM (or CSS `content` duplication via two identical flex rows) for a **seamless loop**. Use **`@media (prefers-reduced-motion: reduce)`** (Tailwind: `motion-reduce:animate-none` or equivalent) to **disable** the animation and show a **static flex wrap** or **paused** layout.

**Rationale**: Satisfies FR-009/FR-010 without mandatory client JS; respects constitution preference for server components and minimal client leaves.

**Alternatives considered**: Framer Motion infinite tween (rejected for marquee: adds client bundle and constant main-thread work); Embla/Carousel library (rejected: new dependency).

---

## 6. Section order on home

**Decision**: Insert **HowItWorks** and **Testimonials** after **ServicesList** and **before** **FaqSection** — process then social proof before FAQ/contact.

**Rationale**: Matches spec user-journey priority (facts → process → proof → objections).

**Alternatives considered**: Before services (rejected: user should see offerings first); after FAQ (rejected: weakens proof before contact).

---

## 7. FAQ migration from current four items to ten in `info.md`

**Decision**: Replace `PUBLIC_FAQ_ITEMS` with **ten** items parsed from `info.md` (strip the leading “Sıkça Sorulan Sorular (SSS)” line from body copy; each Q/A becomes one item with stable `id` slugs). Keep **`FaqSection`** accordion behavior; ensure **multi-paragraph answers** use `\n\n` splits like today.

**Rationale**: Meets FR-004 and edge case “long FAQ on mobile”.

**Alternatives considered**: Trimming to fewer items (rejected: spec requires full source).
