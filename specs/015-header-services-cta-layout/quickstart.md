# Quickstart: Verify 015-header-services-cta-layout

Run from repository root:

```bash
npm run lint
npm run dev
```

## Manual checks

1. **Header — mobile (< lg)**  
   - Open home (or any main layout page).  
   - Confirm **menu trigger** is on the **right** of the header row (relative to brand and share).  
   - Open sheet: links are **centered**, rows feel **tall enough to tap** easily, and there is **no visible “Menü”** title.

2. **Header — desktop (≥ lg)**  
   - Confirm primary nav sits in the **middle band** between brand and right-side actions (not only hugging the logo).  
   - Resize slowly across `lg` breakpoint; no overlap with long nav labels (spot-check).

3. **Services**  
   - Open `/hizmetler` (or home services block).  
   - Per **row** (2-col / 3-col breakpoints), card **heights match** the tallest card.  
   - In **single column**, all cards match the **tallest in the list**.

4. **CTA bar**  
   - **Mobile**: Phone control has **no** small accessibility icon/badge next to it; WhatsApp + Tel remain usable.  
   - **Desktop**: Bar is **visible**; scrolling to the footer, **no critical content** stays hidden behind the fixed bar (main has adequate bottom padding).

5. **Accessibility**  
   - Tab to phone link; screen reader still announces the control meaningfully.  
   - Open mobile sheet: focus trap behaves as before; close control still present.
