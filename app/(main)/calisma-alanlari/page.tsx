import type { Metadata } from "next";
import { AreasOfWork } from "@/components/feature";

export const metadata: Metadata = {
  title: "Çalışma Alanları",
  description:
    "Anksiyete, depresyon, travma, çift ve aile terapisi ve daha fazlası. Uzmanlık alanlarım ve klinik odak konularım.",
};

export default function AreasOfWorkPage(): React.JSX.Element {
  return <AreasOfWork />;
}
