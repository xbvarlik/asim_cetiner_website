# Quickstart: Mobile bottom contact bar

Local verification after implementation.

## Prerequisites

- `npm run dev`
- Browser devtools device toolbar (or a physical phone on the same LAN)

## Steps

1. **Mobile visibility**  
   Open any public page using `SiteShell` (e.g. `/`, `/iletisim`). Set width **below 768px**. Confirm a **fixed** bar at the bottom with **WhatsApp** (green) left and **Tel** (blue) right.

2. **Desktop hidden**  
   Widen viewport to **≥768px**. Confirm the bar **disappears**.

3. **WhatsApp**  
   Tap/click the green control. Confirm **new tab** opens to the practice **wa.me** URL (same as footer WhatsApp).

4. **Phone**  
   Tap/click the blue control. On a real device, confirm the **dialer** opens with the expected number; on desktop, confirm `tel:` navigation occurs (or platform equivalent).

5. **Gap pass-through (SC-002)**  
   Temporarily add a full-width **link** or **button** in page content positioned under the **horizontal gap** between the two pills (e.g. bottom of `main`). Tap that control: it must **activate**, proving the wrapper does not steal hits.

6. **Admin exclusion**  
   Navigate to `/admin` (or any admin URL). Confirm the **mobile bottom bar does not appear**.

7. **Visual checklist (SC-003)**  
   Confirm pill shape, **#25D366** / **#007AFF** backgrounds, white semibold labels, shadow, and **small circular accessibility** icon inside the blue pill on the right.

8. **Lint**  
   Run `npm run lint` — no new errors.
