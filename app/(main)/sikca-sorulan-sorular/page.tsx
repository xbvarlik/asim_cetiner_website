import { FaqSection } from "@/components/feature/faq-section";
import { ROUTES } from "@/lib/routes";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

export const metadata = {
  title: { absolute: "Sıkça Sorulan Sorular | Asım Çetiner" },
  ...buildPageMetadata({
    description:
      "Danışmanlık süreci, seanslar, gizlilik ve online görüşmeler hakkında sık sorulan sorular ve yanıtları.",
    pathname: ROUTES.faq,
  }),
};

export default function FaqPage(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14">
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Sıkça Sorulan Sorular
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
          Aşağıdaki başlıklardan sorunuza uygun olanı açarak yanıtı
          okuyabilirsiniz.
        </p>
      </header>
      <FaqSection variant="page" />
    </div>
  );
}
