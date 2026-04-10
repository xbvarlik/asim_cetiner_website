/**
 * Public-facing service pillars from docs/info.md (Aile, Bireysel, Çift).
 * Icons mapped by `ServicePillarId` in feature components.
 */

export type ServicePillarId = "aile" | "bireysel" | "cift";

export type ServicePillarSection = {
  heading: string;
  items: readonly string[];
};

export type ServicePillar = {
  id: ServicePillarId;
  title: string;
  intro: string;
  /** Compact blurb for home cards */
  shortDescription: string;
  sections: readonly ServicePillarSection[];
};

export const PUBLIC_SERVICE_PILLARS: readonly ServicePillar[] = [
  {
    id: "aile",
    title: "Aile Danışmanlığı",
    intro:
      "Aile danışmanlığı; bireyler arası ilişkileri güçlendirmeyi, iletişimi düzenlemeyi ve sistem içindeki sorunları anlamlandırmayı hedefleyen geniş bir hizmet alanına sahiptir.",
    shortDescription:
      "Aile içi iletişimi güçlendirmek, rolleri ve sınırları netleştirmek ve birlikte yaşanan zorlukları anlamlandırmak için sistemik bir çerçevede çalışıyorum.",
    sections: [
      {
        heading: "İlişki ve İletişim Sorunları",
        items: [
          "Eşler arası iletişim problemleri",
          "Çatışma çözme becerileri",
          "Duyguların ifade edilmesi ve anlaşılması",
          "Güven sorunları",
        ],
      },
      {
        heading: "Evlilik ve Çift Danışmanlığı",
        items: [
          "Evlilik öncesi danışmanlık",
          "Evlilik içi uyum sorunları",
          "Aldatma / sadakat problemleri",
          "Boşanma süreci ve sonrası uyum",
        ],
      },
      {
        heading: "Ebeveynlik Danışmanlığı",
        items: [
          "Anne-baba tutumları",
          "Disiplin ve sınır koyma",
          "Çocukla sağlıklı bağ kurma",
          "Ergenlik dönemi sorunları",
        ],
      },
      {
        heading: "Aile İçi Roller ve Dinamikler",
        items: [
          "Rol karmaşası (anne-baba-çocuk sınırları)",
          "Aile içi güç dengeleri",
          "Bağımlı / kopuk ilişkiler",
          "Kuşaklar arası aktarım",
        ],
      },
      {
        heading: "Kriz ve Travma Durumları",
        items: [
          "Kayıp ve yas süreçleri",
          "Hastalık, kaza, travma sonrası uyum",
          "Aile içi ani değişimlere adaptasyon",
        ],
      },
      {
        heading: "Psikososyal Sorunlar",
        items: [
          "Bağımlılık (madde, alkol vb.)",
          "Ekonomik stresin ilişkilere etkisi",
          "Göç, taşınma ve uyum sorunları",
        ],
      },
      {
        heading: "Çocuk ve Ergenle İlgili Sorunlar",
        items: [
          "Davranış problemleri",
          "Okul uyum sorunları",
          "Dikkat, kaygı ve duygusal problemler",
          "Aile-çocuk çatışmaları",
        ],
      },
      {
        heading: "Boşanma ve Yeniden Yapılanma",
        items: [
          "Sağlıklı ayrılık süreci",
          "Çocukların etkilenmesinin azaltılması",
          "Yeniden evlilik ve uyum süreçleri",
        ],
      },
    ],
  },
  {
    id: "bireysel",
    title: "Bireysel Danışmanlık",
    intro:
      "Yetişkin çalışma alanları genellikle bireyin duygusal, bilişsel ve ilişkisel işlevselliğini kapsayan geniş bir çerçevede ele alınır.",
    shortDescription:
      "Duygudurum, kaygı, travma, ilişki ve yaşam olaylarına bağlı zorluklarda bireysel danışmanlıkla yanınızdayım.",
    sections: [
      {
        heading: "Çalışma alanları",
        items: [
          "Duygudurum Bozuklukları",
          "Kaygı Bozuklukları",
          "Travma ve İlişkili Sorunlar",
          "Kişilik Örüntüleri ve Kişilik Bozuklukları",
          "İlişki ve Bağlanma Sorunları",
          "Özgüven ve Benlik Algısı",
          "Stres ve Yaşam Olaylarıyla Başa Çıkma",
          "Yas ve Kayıp Süreçleri",
          "Psikosomatik ve Bedensel Belirtiler",
          "Bağımlılık ve Dürtü Kontrol Sorunları",
          "Cinsel İşlev ve Cinsellik ile İlgili Sorunlar",
          "Öfke Yönetimi",
          "Obsesif-kompulsif bozukluk",
          "Dikkat eksikliği ve hiperaktivite",
        ],
      },
    ],
  },
  {
    id: "cift",
    title: "Çift Danışmanlığı",
    intro: "Çift Danışmanlığı Hizmet Alanları:",
    shortDescription:
      "İletişim, yakınlık, güven ve yaşam geçişlerinde çiftlere özel; çatışma yönetimi ve ilişki doyumunu destekleyen danışmanlık.",
    sections: [
      {
        heading: "İletişim ve Çatışma Yönetimi",
        items: [
          "İletişim problemleri",
          "Sık tekrar eden tartışmalar",
          "Sağlıklı ifade ve dinleme becerileri",
          "Çatışma çözme yöntemleri",
        ],
      },
      {
        heading: "İlişki Doyumu ve Yakınlık",
        items: [
          "Duygusal uzaklaşma",
          "Yakınlık ve bağ kurma güçlükleri",
          "İlişkide tatmin ve anlam arayışı",
        ],
      },
      {
        heading: "Güven ve Sadakat Sorunları",
        items: [
          "Aldatma / güven ihlalleri",
          "Kıskançlık",
          "Güvenin yeniden inşası",
        ],
      },
      {
        heading: "Cinsel Yaşam ve Uyum",
        items: [
          "Cinsel isteksizlik",
          "Cinsel uyumsuzluk",
          "Performans kaygısı",
          "Cinsellikte iletişim problemleri",
        ],
      },
      {
        heading: "Bağlanma ve İlişki Örüntüleri",
        items: [
          "Terk edilme korkusu",
          "Yakınlık–mesafe dengesi",
          "Tekrarlayan ilişki döngüleri",
        ],
      },
      {
        heading: "Rol ve Sorumluluk Dengesi",
        items: [
          "İlişkide beklenti farklılıkları",
          "Sorumluluk paylaşımı",
          "Güç ve kontrol dengesi",
        ],
      },
      {
        heading: "Yaşam Dönemleri ve Geçişler",
        items: [
          "Evlilik öncesi danışmanlık",
          "Evliliğe uyum süreci",
          "Çocuk sahibi olma / ebeveynliğe geçiş",
          "Taşınma, iş değişimi gibi yaşam olayları",
        ],
      },
      {
        heading: "Kriz ve Ayrılık Süreçleri",
        items: [
          "Ayrılık / boşanma süreci",
          "Ayrılık sonrası uyum",
          "İlişkiyi sürdürme ya da sonlandırma kararı",
        ],
      },
    ],
  },
] as const;
