/**
 * Public-facing service catalog for marketing sections.
 * Icons are mapped by `ServiceId` in feature components.
 */

export type ServiceId =
  | "bireysel"
  | "cift"
  | "aile"
  | "travma"
  | "stres"
  | "online";

export type PublicServiceOffering = {
  id: ServiceId;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  highlights: readonly string[];
};

export const PUBLIC_SERVICES: readonly PublicServiceOffering[] = [
  {
    id: "bireysel",
    title: "Bireysel Danışmanlık",
    shortDescription:
      "Kişisel zorluklarınızla başa çıkmanız için birebir danışmanlık seansları. Bilişsel davranışçı yaklaşım ve kanıta dayalı yöntemler.",
    detailedDescription:
      "Yaşamınızdaki zorlayıcı duygu ve düşünce örüntüleriyle birlikte çalışır; hedeflerinizi netleştirip adım adım ilerlemenize yardımcı olurum. Seanslar gizlilik ve güven ilkeleriyle, ihtiyacınıza göre yapılandırılır.",
    highlights: [
      "Birebir görüşmelerle kişiselleştirilmiş çalışma planı",
      "BDT ve kanıta dayalı tekniklerle duygu ve düşünce düzenleme",
      "Anksiyete, depresyon ve stresle başa çıkma becerileri",
      "Yüz yüze veya online esnek seans seçenekleri",
    ],
  },
  {
    id: "cift",
    title: "Çift Danışmanlığı",
    shortDescription:
      "İlişkinizdeki iletişim sorunlarını çözmek ve bağınızı güçlendirmek için profesyonel çift danışmanlığı.",
    detailedDescription:
      "Çiftlerin güven, yakınlık ve çatışma yönetimi konularında daha sağlıklı kalıplar geliştirmesine odaklanırım. Tarafların duygu ve ihtiyaçlarını güvenli bir çerçevede ifade etmesini desteklerim.",
    highlights: [
      "İletişim kalıplarını gözden geçirme ve yapılandırılmış diyalog",
      "Çatışma anlarında denge ve çözüm odaklı çalışma",
      "Yakınlık ve güveni güçlendirme hedefleri",
      "İlişkinize özel ortak hedefler belirleme",
    ],
  },
  {
    id: "aile",
    title: "Aile Danışmanlığı",
    shortDescription:
      "Aile içi dinamikleri iyileştirmek ve sağlıklı iletişim kalıpları oluşturmak için aile danışmanlığı.",
    detailedDescription:
      "Aile üyeleri arasındaki gerilimleri anlamlandırıp, herkesin duyulduğu bir iletişim ortamı kurmayı hedeflerim. Çocuk, ergen ve ebeveyn rolleri arasındaki dengeyi birlikte ele alırız.",
    highlights: [
      "Aile içi roller ve sınırlar üzerinde çalışma",
      "Çocuk ve ergenle ilgili uyum ve disiplin konularında rehberlik",
      "Çok kuşaklı iletişimi güçlendirme",
      "Ortak aile hedefleri ve iş birliği becerileri",
    ],
  },
  {
    id: "travma",
    title: "Travma Danışmanlığı",
    shortDescription:
      "EMDR ve travma odaklı bilişsel davranışçı yaklaşım ile geçmiş travmaların etkilerini azaltmaya yönelik destek.",
    detailedDescription:
      "Travmatik deneyimlerin günlük yaşam, ilişkiler ve beden üzerindeki etkilerini güvenli bir tempoda ele alırız. Kanıta dayalı yöntemlerle duygu düzenleme ve anlamlandırma süreçlerini desteklerim.",
    highlights: [
      "Travma odaklı değerlendirme ve güvenli çerçeve",
      "EMDR ve travma odaklı BDT tekniklerine yönelik bilgilendirme",
      "Tetikleyiciler ve kaçınma kalıpları üzerinde çalışma",
      "İlerlemenize uygun adım adım tempo",
    ],
  },
  {
    id: "stres",
    title: "Stres Yönetimi",
    shortDescription:
      "İş ve günlük yaşam stresini yönetmek için pratik stratejiler ve gevşeme teknikleri.",
    detailedDescription:
      "Stres kaynaklarınızı birlikte haritalayıp, sizi zorlayan durumlarda daha dayanıklı kalmanız için beceri seti geliştiririz. Uyku, odaklanma ve iş-yaşam dengesi konularında somut araçlar sunarım.",
    highlights: [
      "Stres tetikleyicilerini fark etme ve önceliklendirme",
      "Nefes, gevşeme ve mindfulness temelli pratikler",
      "Zaman ve enerji yönetimi ipuçları",
      "İş ve özel yaşamda sınır koyma becerileri",
    ],
  },
  {
    id: "online",
    title: "Online Danışmanlık",
    shortDescription:
      "Evinizin konforunda, güvenli video görüşme ile profesyonel psikolojik destek.",
    detailedDescription:
      "Şehir dışında veya yoğun program nedeniyle yüz yüze gelmek zor olduğunda, güvenli ve gizlilik uyumlu video platformları üzerinden aynı kalitede danışmanlık sunuyorum. Teknik gereksinimler konusunda yönlendirme sağlarım.",
    highlights: [
      "Şifreli ve gizlilik odaklı video görüşmeler",
      "Esnek saat seçenekleri",
      "Yüz yüze süreçle uyumlu içerik ve takip",
      "Ev ortamında güvenli ve rahat bir çerçeve",
    ],
  },
] as const;
