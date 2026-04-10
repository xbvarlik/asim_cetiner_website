import Image from "next/image";

import { AboutPortraitMotion } from "@/components/feature/about-portrait-motion";
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
                Merhaba, ben Asım Çetiner. Lisans eğitimimi tam burslu olarak
                Doğuş Üniversitesi %100 İngilizce Psikoloji Bölümü’nde onur
                derecesiyle tamamladım. Lisans bitirme projemde, derslerde verilen
                örneklerin öğrencilerin güncel yaşamlarında karşılık bulan olgular
                arasından seçilmesinin öğrenme üzerindeki etkisini inceleyen bir
                deney araştırması ile tamamladım.
              </p>
              <p>
                Yüksek lisans eğitimimi ise Arel Üniversitesi Klinik Psikoloji
                programında, “Dikkat Eksikliği ve Hiperaktivite Bozukluğu ile
                ilişkili değişkenlerin incelenmesi” başlıklı uzmanlık çalışmamla
                ve yüksek onur derecesiyle tamamladım.
              </p>
              <p>
                Akademik çalışmalarımın yanı sıra, Teknofest Psikoloji alanında
                panik bozukluk tanısı almış bireylerin kendi kendine yardım
                becerilerini desteklemeye yönelik bir çalışmada proje yöneticisi
                olarak görev aldım. Ayrıca İstanbul Erenköy Ruh ve Sinir
                Hastalıkları Eğitim ve Araştırma Hastanesi, Koç Üniversitesi, Kim
                Psikoloji ile Dünya Danışmanlık ve Psikoloji Merkezi gibi çeşitli
                kurumlarda staj süreçlerimi gerçekleştirdim.
              </p>
            </div>
          </div>

          <AboutPortraitMotion className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl bg-muted shadow-sm ring-1 ring-border/30 lg:mx-0">
            <Image
              src="/images/asim_cetiner_stock.jpg"
              alt="Psikolog Asım Çetiner, klinik psikolog"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 448px"
            />
          </AboutPortraitMotion>
        </div>
      </div>
    </section>
    </RevealSection>
  );
}
