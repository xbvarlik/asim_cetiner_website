# Quickstart: Verify 020-how-testimonials-home

Run from repository root:

```bash
npm run lint
npm run build
```

## Manual checks

1. **Copy parity**  
   Open `docs/info.md` beside the running site. Confirm **Title** / **Subtitle** match hero and root metadata (browser tab + view source or devtools).

2. **About**  
   `/` — about section paragraphs match **About** block (no old generic placeholder text).

3. **Services**  
   `/` — three pillars or equivalent structure reflects **Aile / Bireysel / Çift** themes from `info.md`.  
   `/hizmetler` — full nested headings and bullets present and readable on mobile (no horizontal clip).

4. **FAQ**  
   `/` and `/sikca-sorulan-sorular` — ten questions from `info.md`; accordion expands/collapses; long answers wrap.

5. **How it works**  
   `/` — heading **Süreç Nasıl İşliyor?** (or agreed exact string); **4–5** numbered/ordered steps with title + text.

6. **Testimonials**  
   `/` — heading **Danışan Yorumları**; ≥3 cards; names anonymized.  
   With **default** OS motion: row drifts slowly **right → left**, readable.  
   Enable **Reduce motion** (Windows Settings → Accessibility → Visual effects → Animation effects **Off**, or macOS **Reduce motion**): marquee **stops**; content still readable.

7. **Contact & location**  
   Footer and **Konumumuz**: address = **Office Addresses** line from `info.md`.  
   Phone = **05544010176** (formatted consistently); **mailto** uses **pskasimcetiner@gmail.com**; Instagram opens correct profile.

8. **WhatsApp / tel**  
   Footer WhatsApp and any `tel:` links use the **same** digits as `lib/site-contact.ts`.

## Done when

- Lint and build pass.  
- All eight manual groups pass.  
- No placeholder strings (e.g. “123 Örnek Sokak”, `info@kenankubuc.com`, generic hero) remain in user-visible UI for this scope.
