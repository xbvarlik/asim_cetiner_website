import type { Metadata } from "next";
import {
  DEFAULT_HERO_SUBTITLE,
  DEFAULT_HERO_TITLE,
} from "@/components/feature/hero";
import { HomeTemplate } from "@/components/feature/home-template";
import { getContactFormOffices } from "@/lib/server/contact-page-data";

export const metadata: Metadata = {
  title: "Ana Sayfa",
  description:
    "Asım Çetiner — İstanbul merkezli psikolog. Bireysel danışmanlık, çift danışmanlığı ve online danışmanlık. Ana sayfadan tüm hizmetlere ve iletişim formuna ulaşın.",
};

export default async function HomePage(): Promise<React.JSX.Element> {
  const offices = await getContactFormOffices();

  return (
    <HomeTemplate
      heroTitle={DEFAULT_HERO_TITLE}
      heroSubtitle={DEFAULT_HERO_SUBTITLE}
      offices={offices}
    />
  );
}
