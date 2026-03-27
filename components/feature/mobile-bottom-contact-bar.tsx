import { Accessibility, Phone } from "lucide-react";
import { getSiteTelHref, getSiteWhatsappHref } from "@/lib/site-contact";
import { WhatsappGlyph } from "./whatsapp-glyph";

const ctaLinkClass =
  "pointer-events-auto inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition-[filter,transform] hover:brightness-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none";

export function MobileBottomContactBar(): React.JSX.Element {
  return (
    <div className="pointer-events-none fixed bottom-4 left-0 right-0 z-50 flex justify-between px-4 md:hidden">
      <a
        href={getSiteWhatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        className={`${ctaLinkClass} bg-cta-whatsapp`}
        aria-label="WhatsApp ile iletişime geçin"
      >
        <WhatsappGlyph className="h-5 w-5" />
        <span>WhatsApp</span>
      </a>
      <a
        href={getSiteTelHref()}
        className={`${ctaLinkClass} bg-cta-phone justify-between gap-3`}
        aria-label="Telefon ile ara"
      >
        <span className="inline-flex items-center gap-2">
          <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span>Tel</span>
        </span>
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20"
          aria-hidden="true"
        >
          <Accessibility className="h-4 w-4" aria-hidden="true" />
        </span>
      </a>
    </div>
  );
}
