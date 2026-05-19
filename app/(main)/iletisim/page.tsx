import { ContactForm, MapView } from "@/components/feature";
import { ROUTES } from "@/lib/routes";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import { getContactFormOffices } from "@/lib/server/contact-page-data";

export const metadata = buildPageMetadata({
  title: "İletişim",
  description:
    "Randevu ve bilgi için iletişim formu, ofis konumu ve iletişim bilgileri. Asım Çetiner psikolog ile hemen iletişime geçin.",
  pathname: ROUTES.contact,
});

export default async function ContactPage(): Promise<React.JSX.Element> {
  const offices = await getContactFormOffices();

  return (
    <>
      <ContactForm offices={offices} />
      <MapView />
    </>
  );
}
