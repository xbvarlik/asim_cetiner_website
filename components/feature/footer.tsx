import Link from "next/link";
import { Phone, MapPin, Mail, Instagram } from "lucide-react";
import { WhatsappGlyph } from "./whatsapp-glyph";
import { ROUTES } from "@/lib/routes";
import {
  getSiteWhatsappHref,
  SITE_PHONE_DISPLAY,
} from "@/lib/site-contact";
import type { NavItem } from "@/types";

const SITE_LINKS: NavItem[] = [
  { label: "Ana Sayfa", href: ROUTES.home },
  { label: "Hakkımda", href: ROUTES.about },
  { label: "Hizmetler", href: ROUTES.services },
  { label: "SSS", href: ROUTES.faq },
  { label: "Blog", href: ROUTES.blog },
  { label: "İletişim", href: ROUTES.contact },
];

export function Footer(): React.JSX.Element {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Asım Çetiner</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Profesyonel psikolojik danışmanlık hizmetleri.
            </p>
            <Link
              href={ROUTES.contact}
              className="mt-4 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-[filter,transform] hover:brightness-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Randevu Alın
            </Link>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Site Haritası
            </h4>
            <nav className="mt-4 flex flex-col gap-2">
              {SITE_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-foreground/90 transition-colors hover:text-primary focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              İletişim
            </h4>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{SITE_PHONE_DISPLAY}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                <span>info@kenankubuc.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>123 Örnek Sokak, İstanbul, Türkiye</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Sosyal Medya
            </h4>
            <div className="mt-4 flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={getSiteWhatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <WhatsappGlyph className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-border pt-6 text-center text-sm leading-relaxed text-muted-foreground">
          Verilen tüm hizmetler danışmanlık kapsamındadır, psikiyatrik müdahale
          yapılmamaktadır.
        </p>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Asım Çetiner. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
