import type { Metadata } from "next";
import { ServicesListDetailed } from "@/components/feature";

export const metadata: Metadata = {
  title: "Hizmetler",
  description:
    "Aile, bireysel ve çift danışmanlığında Kadıköy merkezli yüz yüze ve online seanslar. Klinik Psikolog Asım Çetiner ile hizmet alanları ve odak konuları.",
};

export default function ServicesPage(): React.JSX.Element {
  return <ServicesListDetailed />;
}
