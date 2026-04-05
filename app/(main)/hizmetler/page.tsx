import type { Metadata } from "next";
import { ServicesListDetailed } from "@/components/feature";

export const metadata: Metadata = {
  title: "Hizmetler",
  description:
    "Bireysel danışmanlık, çift danışmanlığı, aile danışmanlığı, travma danışmanlığı, stres yönetimi ve online danışmanlık hizmetleri.",
};

export default function ServicesPage(): React.JSX.Element {
  return <ServicesListDetailed />;
}
