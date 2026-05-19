import { ServicesListDetailed } from "@/components/feature";
import { ROUTES } from "@/lib/routes";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

export const metadata = buildPageMetadata({
  title: "Hizmetler",
  description:
    "Aile, bireysel ve çift danışmanlığında Kadıköy merkezli yüz yüze ve online seanslar. Klinik Psikolog Asım Çetiner ile hizmet alanları ve odak konuları.",
  pathname: ROUTES.services,
});

export default function ServicesPage(): React.JSX.Element {
  return <ServicesListDetailed />;
}
