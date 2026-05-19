import {
  DEFAULT_HERO_SUBTITLE,
  DEFAULT_HERO_TITLE,
} from "@/components/feature/hero";
import { HomeTemplate } from "@/components/feature/home-template";
import { getContactFormOffices } from "@/lib/server/contact-page-data";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

export const metadata = buildPageMetadata({
  title: "Ana Sayfa",
  description:
    "Kadıköy'de yüz yüze ve online danışmanlık. Klinik Psikolog Asım Çetiner ile bireysel, aile ve çift danışmanlığı. Hizmetler, sıkça sorulan sorular ve iletişim.",
  pathname: "/",
});

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
