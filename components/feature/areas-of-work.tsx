import { RevealSection } from "@/components/feature/motion/reveal-section";

const CLINICAL_AREAS = [
  "Anksiyete Bozuklukları",
  "Depresyon",
  "Travma ve TSSB",
  "Çift Terapisi",
  "Aile Danışmanlığı",
  "Obsesif Kompulsif Bozukluk",
  "Panik Atak",
  "Sosyal Fobi",
  "Yas ve Kayıp",
  "Öfke Yönetimi",
  "Stres Yönetimi",
  "Özgüven Geliştirme",
] as const;

export function AreasOfWork(): React.JSX.Element {
  return (
    <RevealSection className="block w-full">
    <section className="bg-muted py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Çalışma Alanları
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Geniş bir yelpazede profesyonel psikolojik destek sunuyorum.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {CLINICAL_AREAS.map((area) => (
            <span
              key={area}
              className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:bg-card hover:shadow-md sm:text-base"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
    </RevealSection>
  );
}
