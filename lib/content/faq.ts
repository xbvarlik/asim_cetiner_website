import { z } from "zod";

const faqItemSchema = z.object({
  id: z.string().min(1),
  question: z.string().trim().min(1),
  answer: z.string().trim().min(1),
});

const faqListSchema = z.array(faqItemSchema).min(3);

export type PublicFaqItem = z.infer<typeof faqItemSchema>;

const rawFaqItems: PublicFaqItem[] = [
  {
    id: "seans-nasil",
    question: "İlk seans nasıl işler?",
    answer:
      "İlk görüşmede beklentilerinizi ve hedeflerinizi birlikte netleştiririz. Gizlilik ve çalışma çerçevesi hakkında bilgi veririm; sorularınızı yanıtlarım.\n\nBaskı hissettirmeden, kendi tempoda ilerlemeniz esastır.",
  },
  {
    id: "online-yuz-yuze",
    question: "Online danışmanlık mümkün mü?",
    answer:
      "Evet. Güvenli ve uygun bir video platformu üzerinden online seanslar planlanabilir. Yüz yüze veya online tercihinizi birlikte değerlendiririz.\n\nTeknik olarak rahat bir ortam ve stabil internet bağlantısı yeterlidir.",
  },
  {
    id: "gizlilik",
    question: "Görüşmelerim gizli kalır mı?",
    answer:
      "Profesyonel etik kurallar ve yasal çerçeve gereği görüşmeleriniz gizli tutulur. İstisnai durumlar (örneğin acil güvenlik riski) önceden şeffaf şekilde konuşulur.\n\nKayıt ve paylaşım yalnızca açık rızanız ve net kurallarla yapılır.",
  },
  {
    id: "sure-siklik",
    question: "Seanslar ne kadar sürer, ne sıklıkta yapılır?",
    answer:
      "Tipik seans süresi yaklaşık 50 dakikadır; ihtiyaca göre esnetilebilir. Sıklık, hedeflerinize ve yoğunluğunuza göre haftalık veya iki haftada bir gibi planlanır.\n\nDüzenli takip, sürdürülebilir ilerleme için genelde daha faydalıdır.",
  },
];

export const PUBLIC_FAQ_ITEMS: readonly PublicFaqItem[] =
  faqListSchema.parse(rawFaqItems);
