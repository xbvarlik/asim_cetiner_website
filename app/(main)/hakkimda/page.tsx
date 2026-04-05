import type { Metadata } from "next";
import { About } from "@/components/feature";

export const metadata: Metadata = {
  title: "Hakkımda",
  description:
    "Psikolog Kenan Kübuç hakkında: klinik deneyim, danışmanlık yaklaşımı ve danışanlarına sunduğu profesyonel psikolojik destek.",
};

export default function AboutPage(): React.JSX.Element {
  return <About />;
}
