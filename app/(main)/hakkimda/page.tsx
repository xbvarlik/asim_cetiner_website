import { About } from "@/components/feature";
import { ROUTES } from "@/lib/routes";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

export const metadata = buildPageMetadata({
  title: "Hakkımda",
  description:
    "Psikolog Asım Çetiner hakkında: klinik deneyim, danışmanlık yaklaşımı ve danışanlarına sunduğu profesyonel psikolojik destek.",
  pathname: ROUTES.about,
});

export default function AboutPage(): React.JSX.Element {
  return <About />;
}
