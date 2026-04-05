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
      title: { absolute: "İstanbul Psikolog | Asım Çetiner" },
      description:
        "İstanbul'da uzman psikolog desteği. Anksiyete, depresyon ve ilişki sorunları için yüz yüze ve online danışmanlık randevusu alın.",
    },
    heroTitle: "İstanbul'da Güvenilir Psikolog Desteği",
    heroSubtitle:
      "Şehrinizde profesyonel psikolojik danışmanlık. Kendinizi güvende hissedeceğiniz bir ortamda, kanıta dayalı yöntemlerle yanınızdayım.",
  },
  "cift-terapisi": {
    metadata: {
      title: { absolute: "Çift Danışmanlığı İstanbul | Asım Çetiner" },
      description:
        "İlişkinizi güçlendirmek için çift danışmanlığı ve ilişki danışmanlığı. İletişim, güven ve çatışma yönetimi konularında uzman destek.",
    },
    heroTitle: "Çift Danışmanlığı ile İlişkinize Yatırım Yapın",
    heroSubtitle:
      "Partnerinizle sağlıklı iletişim kurmanıza ve birlikte zorlukların üstesinden gelmenize yardımcı oluyorum.",
  },
  "bilissel-davranisci-terapi": {
    metadata: {
      title: { absolute: "Bilişsel Davranışçı Danışmanlık (BDT) | Asım Çetiner" },
      description:
        "BDT ile anksiyete, depresyon ve takıntılı düşünce kalıplarına yönelik etkili danışmanlık. İstanbul'da uzman psikolog.",
    },
    heroTitle: "Bilişsel Davranışçı Danışmanlık ile Düşünce ve Duygularınızı Yeniden Yapılandırın",
    heroSubtitle:
      "Kanıta dayalı BDT teknikleriyle olumsuz düşünce örüntülerini fark edip, daha dengeli bir yaşam için adım atın.",
  },
  "uskudar-psikolog": {
    metadata: {
      title: { absolute: "Üsküdar Psikolog | Asım Çetiner" },
      description:
        "Üsküdar ve Anadolu yakasında psikolog hizmeti. Randevu ve danışmanlık seçenekleri için iletişime geçin.",
    },
    heroTitle: "Üsküdar ve Anadolu Yakası'nda Psikolog",
    heroSubtitle:
      "Yakınınızda erişilebilir danışmanlık desteği. Yüz yüze seanslar ve esnek randevu planlaması ile yanınızdayım.",
  },
  "besiktas-psikolog": {
    metadata: {
      title: { absolute: "Beşiktaş Psikolog | Asım Çetiner" },
      description:
        "Beşiktaş ve Avrupa yakasında profesyonel psikolojik danışmanlık. Stres, anksiyete ve yaşam koçluğu için randevu.",
    },
    heroTitle: "Beşiktaş ve Avrupa Yakası'nda Psikolojik Danışmanlık",
    heroSubtitle:
      "Yoğun tempolu yaşamda dengeyi bulmanıza yardımcı olacak bireysel danışmanlık hizmetleri sunuyorum.",
  },
};
