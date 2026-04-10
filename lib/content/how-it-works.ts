/**
 * Home “Süreç Nasıl İşliyor?” steps. Therapeutic process summary for prospective clients.
 */

export type HowItWorksStep = {
  order: number;
  title: string;
  description: string;
};

export const HOW_IT_WORKS_STEPS: readonly HowItWorksStep[] = [
  {
    order: 1,
    title: "İletişime geçin ve ön görüşme",
    description:
      "Telefon, e-posta veya form üzerinden bana ulaşabilirsiniz. Kısa bir ön görüşmede ihtiyacınızı dinler, seans formatı (yüz yüze veya online) ve uygunluk hakkında bilgi veririm.",
  },
  {
    order: 2,
    title: "İlk seans: tanışma ve çerçeve",
    description:
      "İlk görüşmede beklentilerinizi, hedeflerinizi ve yaşadığınız zorlukları birlikte ele alırız. Gizlilik, süre ve çalışma şekli netleştirilir; sorularınız yanıtlanır.",
  },
  {
    order: 3,
    title: "Birlikte planlama",
    description:
      "Size uygun seans sıklığını (genellikle haftada bir) ve odak konularını birlikte belirleriz. Süreç boyunca ihtiyaçlarınıza göre plan esnetilebilir.",
  },
  {
    order: 4,
    title: "Düzenli seanslar ve ilerleme",
    description:
      "Seanslarda duygu ve düşünce örüntülerinizi güvenli bir ortamda çalışır; farkındalık ve başa çıkma becerilerinizi desteklerim. Her adımda kendi hızınıza saygı duyulur.",
  },
  {
    order: 5,
    title: "Değerlendirme ve sonlandırma",
    description:
      "Belirli aralıklarla ilerlemeyi gözden geçirir, hedeflerinize ulaştığınızda veya arayı açmak istediğinizde süreci birlikte anlamlı şekilde sonlandırırız.",
  },
] as const;
