import { z } from "zod";

const faqItemSchema = z.object({
  id: z.string().min(1),
  question: z.string().trim().min(1),
  answer: z.string().trim().min(1),
});

const faqListSchema = z.array(faqItemSchema).min(10);

export type PublicFaqItem = z.infer<typeof faqItemSchema>;

const rawFaqItems: PublicFaqItem[] = [
  {
    id: "ciddi-problem-gerekir-mi",
    question: "Psikoloğa gitmek için ciddi bir problemim olması gerekir mi?",
    answer:
      "Hayır, psikoloğa gitmek için mutlaka “büyük” bir problem yaşamanız gerekmez. Kendinizi daha iyi tanımak, ilişkilerinizi geliştirmek veya zorlandığınız bir süreci anlamlandırmak vb. olaylar için de terapiye başvurabilirsiniz.",
  },
  {
    id: "ilk-seans-nasil",
    question: "İlk seans nasıl geçer?",
    answer:
      "İlk seans genellikle sizi tanımaya yönelik geçer. Yaşadığınız zorluklar, beklentileriniz ve terapi sürecinden ne istediğiniz konuşulur. Bu seans aynı zamanda terapistinizle uyumunuzu gözlemlemeniz için de bir fırsattır.",
  },
  {
    id: "seans-sure-siklik",
    question: "Seanslar ne kadar sürer ve ne sıklıkla yapılır?",
    answer:
      "Seanslar genellikle 45-50 dakika sürer. Sıklık ise ihtiyacınıza göre belirlenir; çoğu zaman haftada bir olacak şekilde planlanır.",
  },
  {
    id: "terapi-etki-suresi",
    question: "Terapi ne kadar sürede etkisini gösterir?",
    answer:
      "Bu süreç kişiden kişiye değişir. Bazı danışanlar birkaç seansta farkındalık kazanırken, daha derin konuların çalışılması daha uzun sürebilir. Terapi bir süreçtir ve zamanla etkisini gösterir.",
  },
  {
    id: "gizlilik",
    question: "Anlattıklarım gizli kalır mı?",
    answer:
      "Evet, terapi süreci gizlilik esasına dayanır. Paylaştığınız bilgiler sizin izniniz olmadan üçüncü kişilerle paylaşılmaz (istisnai yasal durumlar dışında).",
  },
  {
    id: "psikolog-yonlendirme",
    question: "Psikolog bana ne yapmam gerektiğini söyler mi?",
    answer:
      "Psikolog doğrudan “şunu yapmalısınız” şeklinde yönlendirme yapmaz. Daha çok sizi anlamaya, farkındalık kazandırmaya ve kendi kararlarınızı daha sağlıklı şekilde almanıza yardımcı olur.",
  },
  {
    id: "online-yuz-yuze",
    question: "Online terapi yüz yüze terapi kadar etkili midir?",
    answer:
      "Evet, yapılan araştırmalar online terapinin birçok durumda yüz yüze terapi kadar etkili olduğunu göstermektedir. Özellikle ulaşım ve zaman açısından kolaylık sağlar.",
  },
  {
    id: "terapi-sikligi",
    question: "Terapiye ne sıklıkla gelmeliyim?",
    answer:
      "Genellikle haftada bir önerilir. Ancak ihtiyaçlarınıza göre bu sıklık artırılabilir ya da azaltılabilir. Süreç birlikte planlanır.",
  },
  {
    id: "ifade-zorlugu",
    question: "Kendimi ifade etmekte zorlanırsam ne olacak?",
    answer:
      "Bu çok yaygın bir durumdur. Terapide her şeyi hemen anlatmak zorunda değilsiniz. Terapistiniz sizi zorlamadan, kendi hızınızda ilerlemenize alan tanır.",
  },
  {
    id: "terapi-ise-yarar-mi",
    question: "Terapi gerçekten işe yarar mı?",
    answer:
      "Terapi, kişinin kendini anlaması, duygularını düzenlemesi ve yaşam kalitesini artırması konusunda etkili bir yöntemdir. Ancak sürecin verimli olması için düzenli katılım ve iş birliği önemlidir.",
  },
];

export const PUBLIC_FAQ_ITEMS: readonly PublicFaqItem[] =
  faqListSchema.parse(rawFaqItems);
