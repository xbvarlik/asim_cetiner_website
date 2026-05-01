/**
 * Marketing “psychological counselling process” section — copy from stakeholder spec (023).
 */

export type HowItWorksStep = {
  order: number;
  title: string;
  description: string;
};

export const HOW_IT_WORKS_SECTION_TITLE =
  "Psikolojik Danışmanlık Süreci Nasıl İşler?" as const;

export const HOW_IT_WORKS_SECTION_INTRO =
  "Bazen nereden başlayacağınızı bilemeyebilirsiniz. Psikolojik danışmanlık süreci, tam da bu noktada size eşlik eden güvenli bir alan sunar. Amaç, sadece konuşmak değil; kendinizi daha iyi anlamak ve yaşamınızda gerçek bir değişim oluşturmaktır." as const;

export const HOW_IT_WORKS_STEPS: readonly HowItWorksStep[] = [
  {
    order: 1,
    title: "İletişime Geçme ve Görüşme",
    description:
      "İlk adım, iletişime geçmenizdir. Kısa bir görüşmede süreç hakkında bilgi verilir ve aklınızdaki sorular netleşir. Bu aşama, psikolojik danışmanlığa başlamadan önce kendinizi daha rahat hissetmenizi sağlar.",
  },
  {
    order: 2,
    title: "İlk Seans: Tanışma ve Değerlendirme",
    description:
      "İlk seansta sizi anlamaya odaklanırım. Yaşadığınız zorlukları birlikte ele alır, beklentilerinizi netleştiririz. Bu görüşme, psikolojik danışmanlık sürecinin sizin için doğru bir zemin üzerine kurulmasını sağlar.",
  },
  {
    order: 3,
    title: "Danışmanlık Planı Oluşturma",
    description:
      "Her süreç kişiye özeldir. Sizin ihtiyaçlarınıza uygun bir danışmanlık planı birlikte belirlenir. Böylece süreç, size gerçekten iyi gelecek şekilde ilerler.",
  },
  {
    order: 4,
    title: "Düzenli Seanslar ve İlerleme",
    description:
      "Seanslar ilerledikçe farkındalık artar. Tekrarlayan döngüler, duygular ve düşünceler daha net hale gelir. Bu süreçte, sizi zorlayan durumlarla daha sağlıklı baş etme yolları geliştirirsiniz. Psikolojik danışmanlık, kalıcı bir değişim hedefler.",
  },
  {
    order: 5,
    title: "Değerlendirme ve Sonlandırma",
    description:
      "Süreç düzenli olarak değerlendirilir. Kendinizi daha güçlü ve dengede hissettiğiniz noktada psikolojik danışmanlık planlı bir şekilde sonlandırılır. Amaç, süreç dışında da bu dengeyi sürdürebilmenizdir.",
  },
] as const;

export const HOW_IT_WORKS_CTA_HEADING = "Randevu Al" as const;

export const HOW_IT_WORKS_CTA_LINES = [
  "Eğer siz de bu sürece başlamak istiyorsanız, ilk adımı ertelemeyin.",
  "Uygun gün ve saatler hakkında bilgi almak için benimle iletişime geçebilirsiniz.",
] as const;
