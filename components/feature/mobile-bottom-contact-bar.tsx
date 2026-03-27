import { Phone } from "lucide-react";
import { getSiteTelHref, getSiteWhatsappHref } from "@/lib/site-contact";
import { WhatsappGlyph } from "./whatsapp-glyph";

const ctaLinkClass =
  "pointer-events-auto inline-flex shrink-0 items-center gap-2 rounded-full border-0 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none";

export function MobileBottomContactBar(): React.JSX.Element {
  return (
    <div className="pointer-events-none fixed bottom-4 left-0 right-0 z-50 flex w-full justify-between gap-3 px-4">
      <a
        href={getSiteWhatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        className={`${ctaLinkClass} !bg-[#25D366] hover:!bg-[#1da851] active:!bg-[#199948]`}
        aria-label="WhatsApp ile iletişime geçin"
      >
        <WhatsappGlyph className="h-5 w-5" />
        <span>WhatsApp</span>
      </a>
      <a
        href={getSiteTelHref()}
        className={`${ctaLinkClass} !bg-[#007AFF] hover:!bg-[#0066DD] active:!bg-[#005AC7]`}
        aria-label="Telefon ile ara"
      >
        <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
        <span>Tel</span>
      </a>
    </div>
  );
}
