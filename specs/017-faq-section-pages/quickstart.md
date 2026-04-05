# Quickstart: verify 017-faq-section-pages

Run from repository root: `npm run lint`

## Manual checks

1. **Home (`/`)**  
   - Scroll: FAQ block appears **immediately below** “Hizmetlerimiz” / services section and **above** the contact form.  
   - Expand/collapse several items; multiple items may stay open.  
   - Tab through triggers; focus ring visible; toggling works without mouse.

2. **SEO landing pages (sample at least 3)**  
   - Open e.g. `/istanbul-psikolog`, `/cift-terapisi`, `/uskudar-psikolog`.  
   - Confirm the same FAQ block placement as home (under services, above contact).

3. **Dedicated page**  
   - Open `ROUTES.faq` → `/sikca-sorulan-sorular`.  
   - Page has a clear Turkish FAQ title (`h1` or equivalent).  
   - Questions and answers match home **exactly** (spot-check order and wording).

4. **Services page (negative check)**  
   - Open `/hizmetler`.  
   - Confirm **no** inline FAQ section (FR-002a).

5. **Navigation**  
   - Header and footer both include a link to `/sikca-sorulan-sorular` using approved label text.

6. **Regression**  
   - `SiteShell` pages still show footer disclaimer (016).  
   - Mobile layout: FAQ readable; no horizontal scroll for normal answer text.

## URL checklist (SC-001 sampling)

| URL | Inline FAQ under services? |
|-----|----------------------------|
| `/` | Yes |
| `/istanbul-psikolog` | Yes |
| `/cift-terapisi` | Yes |
| `/bilissel-davranisci-terapi` | Yes |
| `/uskudar-psikolog` | Yes |
| `/besiktas-psikolog` | Yes |
| `/hizmetler` | No |
