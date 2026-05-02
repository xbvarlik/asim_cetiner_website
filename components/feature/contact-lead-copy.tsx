"use client";

import {
  getSiteTelHref,
  getSiteWhatsappHref,
  SITE_PHONE_DISPLAY_COMPACT,
} from "@/lib/site-contact";

const linkUnderlineClass =
  "font-semibold text-foreground underline decoration-primary/55 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary";

const telLinkClass = `${linkUnderlineClass} whitespace-nowrap`;

/** Verbatim FR-008 guidance (023) — used beside every public inquiry form */
export function ContactLeadCopy(): React.JSX.Element {
  return (
    <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
      Aile, bireysel ve çift danışmanlığı hakkında bilgi almak veya randevu
      oluşturmak için iletişim formunu doldurabilirsiniz. Alternatif olarak{" "}
      <a href={getSiteTelHref()} className={telLinkClass}>
        {SITE_PHONE_DISPLAY_COMPACT}
      </a>{" "}
      numarası üzerinden{" "}
      <a
        href={getSiteWhatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        className={linkUnderlineClass}
      >
        WhatsApp
      </a>
      ’tan mesaj atabilir ya da doğrudan arayarak benimle iletişime
      geçebilirsiniz. Tüm başvurulara en kısa sürede dönüş yapılmaktadır.
    </p>
  );
}
