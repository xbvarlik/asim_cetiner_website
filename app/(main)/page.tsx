import {
  Hero,
  About,
  AreasOfWork,
  ServicesList,
  ContactForm,
  MapView,
} from "@/components/feature";
import * as officeService from "@/server/services/office-service";

export default async function HomePage(): Promise<React.JSX.Element> {
  const officesResult = await officeService.getAll({ page: 1, pageSize: 100 });

  const offices =
    officesResult.success
      ? officesResult.data.data.map((o) => ({ id: o.id, name: o.name }))
      : [];

  return (
    <>
      <Hero />
      <About />
      <AreasOfWork />
      <ServicesList />
      <ContactForm offices={offices} />
      <MapView />
    </>
  );
}
