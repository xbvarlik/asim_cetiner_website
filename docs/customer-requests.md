📄 Therapist Website Improvements Spec (Asım Çetiner)
Overview

This document defines UI/UX and content updates requested for the therapist website.
The goal is to improve readability, clarity of services, user flow, and conversion (contact/randevu).

All changes should follow existing design system and visual consistency.

1. Hero Section Typography Adjustment
Problem

The main heading and subtext on the landing (hero) section appear visually too large and reduce readability.

Requirement
Reduce font size of:
Main title:
"Klinik Psikolog İstanbul - Asım Çetiner | Kadıköy Psikolojik Danışmanlık"
Supporting text below it
Expected Behavior
Typography should:
Maintain visual hierarchy (title > subtitle)
Improve readability and spacing
Avoid dominating the viewport excessively
Acceptance Criteria
Hero section fits cleanly within first viewport
No text overflow or awkward line breaks
Balanced spacing between title, subtitle, and CTA
2. Services Section Content + Navigation Fix
2.1 Text Update

Replace the existing introductory sentence with:

"Aile, bireysel ve çift danışmanlığında online ve yüz yüze olarak bilimsel temelli destek sunuyorum; aşağıda hizmet alanlarımın özetini görebilirsiniz."

2.2 Click Interaction Issue
Problem

Service items (e.g. Aile, Bireysel, Çift danışmanlığı) are not clickable or do not navigate.

Requirement
Each service item should be interactive
Expected Behavior (choose one consistent pattern)
Option A: Navigate to dedicated service detail section/page
Option B: Scroll to relevant section on same page
Option C: Open expandable content (accordion/modal)
Acceptance Criteria
All service items are clickable
Each click produces visible feedback/action
No dead clicks
3. “Süreç Nasıl İşliyor” Section Redesign
Requirement

Replace entire section with structured step-based content below:

Title

Psikolojik Danışmanlık Süreci Nasıl İşler?

Intro Paragraph

Bazen nereden başlayacağınızı bilemeyebilirsiniz. Psikolojik danışmanlık süreci, tam da bu noktada size eşlik eden güvenli bir alan sunar. Amaç, sadece konuşmak değil; kendinizi daha iyi anlamak ve yaşamınızda gerçek bir değişim oluşturmaktır.

Steps (5-Step Structured Layout)
1. İletişime Geçme ve Görüşme

İlk adım, iletişime geçmenizdir. Kısa bir görüşmede süreç hakkında bilgi verilir ve aklınızdaki sorular netleşir. Bu aşama, psikolojik danışmanlığa başlamadan önce kendinizi daha rahat hissetmenizi sağlar.

2. İlk Seans: Tanışma ve Değerlendirme

İlk seansta sizi anlamaya odaklanırım. Yaşadığınız zorlukları birlikte ele alır, beklentilerinizi netleştiririz. Bu görüşme, psikolojik danışmanlık sürecinin sizin için doğru bir zemin üzerine kurulmasını sağlar.

3. Danışmanlık Planı Oluşturma

Her süreç kişiye özeldir. Sizin ihtiyaçlarınıza uygun bir danışmanlık planı birlikte belirlenir. Böylece süreç, size gerçekten iyi gelecek şekilde ilerler.

4. Düzenli Seanslar ve İlerleme

Seanslar ilerledikçe farkındalık artar. Tekrarlayan döngüler, duygular ve düşünceler daha net hale gelir. Bu süreçte, sizi zorlayan durumlarla daha sağlıklı baş etme yolları geliştirirsiniz. Psikolojik danışmanlık, kalıcı bir değişim hedefler.

5. Değerlendirme ve Sonlandırma

Süreç düzenli olarak değerlendirilir. Kendinizi daha güçlü ve dengede hissettiğiniz noktada psikolojik danışmanlık planlı bir şekilde sonlandırılır. Amaç, süreç dışında da bu dengeyi sürdürebilmenizdir.

CTA Block

Randevu Al

Eğer siz de bu sürece başlamak istiyorsanız, ilk adımı ertelemeyin.
Uygun gün ve saatler hakkında bilgi almak için benimle iletişime geçebilirsiniz.

UI Expectations
Steps should be visually separated
Use:
Numbered cards OR vertical timeline OR stepper layout
Must be scannable and not text-heavy visually
4. Color Adjustment (Name Highlight)
Requirement

Apply color styling to therapist name using:

HEX: #2F3E4E
RGB: 47, 62, 78
Target
Therapist name (e.g. "Asım Çetiner")
Expected Behavior
Subtle, professional emphasis
Should not break overall color harmony
Maintain accessibility (contrast)
5. Contact Page Content Update
Replace existing text with:

Aile, bireysel ve çift danışmanlığı hakkında bilgi almak veya randevu oluşturmak için iletişim formunu doldurabilirsiniz. Alternatif olarak +90 554 401 01 76 numarası üzerinden WhatsApp’tan mesaj atabilir ya da doğrudan arayarak benimle iletişime geçebilirsiniz. Tüm başvurulara en kısa sürede dönüş yapılmaktadır.

Expected Behavior
Text clearly visible above or near contact form
Phone number:
Clickable (tel:)
WhatsApp deep link enabled
6. Location / Map Interaction Improvement
Problem

Location section currently lacks navigation behavior.

Requirement

Add interactive map/navigation functionality.

Expected Behavior
Clicking location should:
Open Google Maps (or map app)
Show exact location
Enable directions
Implementation Options
Embedded map with clickable marker
"Yol Tarifi Al" button
Direct Google Maps link
Acceptance Criteria
User can navigate to location in 1 click
Works on both mobile and desktop
Final Notes
Avoid placeholder or inactive UI elements
Prioritize:
Clarity
Trust-building tone
Conversion (contact/randevu)
Keep design minimal, calm, and professional (aligned with psychology field)