import { About } from "./about";
// import { AreasOfWork } from "./areas-of-work"; // Unused on home for now (spec 016)
import { ContactForm } from "./contact-form";
import { FaqSection } from "./faq-section";
import { Hero } from "./hero";
import { MapView } from "./map-view";
import { ServicesList } from "./services-list";

export type HomeTemplateProps = {
  heroTitle: string;
  heroSubtitle: string;
  offices: Array<{ id: number; name: string }>;
};

export function HomeTemplate({
  heroTitle,
  heroSubtitle,
  offices,
}: HomeTemplateProps): React.JSX.Element {
  return (
    <>
      <Hero title={heroTitle} subtitle={heroSubtitle} />
      <About />
      {/* <AreasOfWork /> — unused for now; component file retained for possible reuse */}
      <ServicesList />
      <FaqSection />
      <ContactForm offices={offices} />
      <MapView />
    </>
  );
}
