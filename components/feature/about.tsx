import Image from "next/image";

import { RevealSection } from "@/components/feature/motion/reveal-section";

export function About(): React.JSX.Element {
  return (
    <RevealSection className="block w-full">
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Hakkımda
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                Merhaba, ben Kenan Kübuç. Klinik psikolog olarak yılların
                deneyimiyle bireylere, çiftlere ve ailelere profesyonel
                psikolojik destek sunuyorum.
              </p>
              <p>
                Danışanlarımın kendilerini güvende ve anlaşılmış hissedecekleri
                bir terapi ortamı oluşturmayı hedefliyorum. Her bireyin kendine
                özgü bir hikayesi olduğuna inanıyor ve tedavi sürecini buna
                göre şekillendiriyorum.
              </p>
              <p>
                Bilişsel Davranışçı Terapi, EMDR ve Şema Terapi gibi
                kanıta dayalı yöntemlerle çalışarak danışanlarımın yaşam
                kalitelerini artırmalarına yardımcı oluyorum.
              </p>
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl bg-muted lg:mx-0">
            <Image
              src="/images/therapist.jpg"
              alt="Psikolog Kenan Kübuç"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 448px"
            />
          </div>
        </div>
      </div>
    </section>
    </RevealSection>
  );
}
