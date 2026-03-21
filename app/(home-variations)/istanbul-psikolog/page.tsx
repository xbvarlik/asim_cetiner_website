import { HomeTemplate } from "@/components/feature/home-template";
import { SEO_LANDING_PAGES } from "@/lib/seo/landing-pages";
import { getContactFormOffices } from "@/lib/server/contact-page-data";

const slug = "istanbul-psikolog" as const;

export const metadata = SEO_LANDING_PAGES[slug].metadata;

export default async function IstanbulPsikologPage(): Promise<React.JSX.Element> {
  const config = SEO_LANDING_PAGES[slug];
  const offices = await getContactFormOffices();

  return (
    <HomeTemplate
      heroTitle={config.heroTitle}
      heroSubtitle={config.heroSubtitle}
      offices={offices}
    />
  );
}
