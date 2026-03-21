import type { Metadata } from "next";
import { ServicesList } from "@/components/feature";

export const metadata: Metadata = {
  title: "Hizmetler",
  description:
    "Bireysel terapi, çift terapisi, aile danışmanlığı, travma terapisi, stres yönetimi ve online terapi hizmetleri.",
};

export default function ServicesPage(): React.JSX.Element {
  return <ServicesList />;
}
