import {
  DEFAULT_HERO_SUBTITLE,
  DEFAULT_HERO_TITLE,
} from "@/components/feature/hero";
import { HomeTemplate } from "@/components/feature/home-template";
import { getContactFormOffices } from "@/lib/server/contact-page-data";
import {
  SITE_DEFAULT_DESCRIPTION,
  buildPageMetadata,
} from "@/lib/seo/site-metadata";

export const metadata = buildPageMetadata({
  description: SITE_DEFAULT_DESCRIPTION,
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
