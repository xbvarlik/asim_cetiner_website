import Image from "next/image";

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

const AREAS_BACKGROUND_SRC = "/images/kenan_kubuc_stok.jpg";

export function AreasOfWork(): React.JSX.Element {
  return (
    <RevealSection className="block w-full">
      <section className="relative overflow-hidden py-20 sm:py-28">
        <Image
          src={AREAS_BACKGROUND_SRC}
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-background/93 via-muted/88 to-background/94"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                className="rounded-2xl border border-border/90 bg-background/95 px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:border-border hover:bg-card hover:shadow-md sm:px-5 sm:text-base"
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
