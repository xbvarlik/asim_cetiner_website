import type { Metadata } from "next";

export type SeoLandingSlug =
  | "istanbul-psikolog"
  | "cift-terapisi"
  | "bilissel-davranisci-terapi"
  | "uskudar-psikolog"
  | "besiktas-psikolog";

export type SeoLandingConfig = {
  metadata: Metadata;
  heroTitle: string;
  heroSubtitle: string;
};

export const SEO_LANDING_PAGES: Record<SeoLandingSlug, SeoLandingConfig> = {
  "istanbul-psikolog": {
    metadata: {
      title: { absolute: "İstanbul Psikolog | Kenan Kübuç" },
      description:
        "İstanbul'da uzman psikolog desteği. Anksiyete, depresyon ve ilişki sorunları için yüz yüze ve online terapi randevusu alın.",
    },
    heroTitle: "İstanbul'da Güvenilir Psikolog Desteği",
    heroSubtitle:
      "Şehrinizde profesyonel psikolojik danışmanlık. Kendinizi güvende hissedeceğiniz bir ortamda, kanıta dayalı terapi yöntemleriyle yanınızdayım.",
  },
  "cift-terapisi": {
    metadata: {
      title: { absolute: "Çift Terapisi İstanbul | Kenan Kübuç" },
      description:
        "İlişkinizi güçlendirmek için çift terapisi ve ilişki danışmanlığı. İletişim, güven ve çatışma yönetimi konularında uzman destek.",
    },
    heroTitle: "Çift Terapisi ile İlişkinize Yatırım Yapın",
    heroSubtitle:
      "Partnerinizle sağlıklı iletişim kurmanıza ve birlikte zorlukların üstesinden gelmenize yardımcı oluyorum.",
  },
  "bilissel-davranisci-terapi": {
    metadata: {
      title: { absolute: "Bilişsel Davranışçı Terapi (BDT) | Kenan Kübuç" },
      description:
        "BDT ile anksiyete, depresyon ve takıntılı düşünce kalıplarına yönelik etkili terapi. İstanbul'da uzman psikolog.",
    },
    heroTitle: "Bilişsel Davranışçı Terapi ile Düşünce ve Duygularınızı Yeniden Yapılandırın",
    heroSubtitle:
      "Kanıta dayalı BDT teknikleriyle olumsuz düşünce örüntülerini fark edip, daha dengeli bir yaşam için adım atın.",
  },
  "uskudar-psikolog": {
    metadata: {
      title: { absolute: "Üsküdar Psikolog | Kenan Kübuç" },
      description:
        "Üsküdar ve Anadolu yakasında psikolog hizmeti. Randevu ve terapi seçenekleri için iletişime geçin.",
    },
    heroTitle: "Üsküdar ve Anadolu Yakası'nda Psikolog",
    heroSubtitle:
      "Yakınınızda erişilebilir terapi desteği. Yüz yüze seanslar ve esnek randevu planlaması ile yanınızdayım.",
  },
  "besiktas-psikolog": {
    metadata: {
      title: { absolute: "Beşiktaş Psikolog | Kenan Kübuç" },
      description:
        "Beşiktaş ve Avrupa yakasında profesyonel psikolojik danışmanlık. Stres, anksiyete ve yaşam koçluğu için randevu.",
    },
    heroTitle: "Beşiktaş ve Avrupa Yakası'nda Psikolojik Danışmanlık",
    heroSubtitle:
      "Yoğun tempolu yaşamda dengeyi bulmanıza yardımcı olacak bireysel terapi ve danışmanlık hizmetleri sunuyorum.",
  },
};
