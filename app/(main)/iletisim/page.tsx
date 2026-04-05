import type { Metadata } from "next";
import { ContactForm, MapView } from "@/components/feature";
import { getContactFormOffices } from "@/lib/server/contact-page-data";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Randevu ve bilgi için iletişim formu, ofis konumu ve iletişim bilgileri. Asım Çetiner psikolog ile hemen iletişime geçin.",
};

export default async function ContactPage(): Promise<React.JSX.Element> {
  const offices = await getContactFormOffices();

  return (
    <>
      <ContactForm offices={offices} />
      <MapView />
    </>
  );
}
