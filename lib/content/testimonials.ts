import { z } from "zod";

const testimonialSchema = z.object({
  id: z.string().min(1),
  quote: z.string().trim().min(1),
  displayName: z.string().trim().min(1),
});

export type PublicTestimonial = z.infer<typeof testimonialSchema>;

const raw: PublicTestimonial[] = [
  {
    id: "t1",
    quote:
      "İlk başta çekingen davransam da kendimi güvende hissettim. Süreç boyunca sabırlı ve yapıcı bir yaklaşım gördüm.",
    displayName: "Elif Y.",
  },
  {
    id: "t2",
    quote:
      "İletişim sorunlarımızda bize net bir çerçeve sundu. Eşimle konuşmayı yeniden öğrendiğimizi söyleyebilirim.",
    displayName: "Mehmet A.",
  },
  {
    id: "t3",
    quote:
      "Online seanslar yoğun iş tempomda hayat kurtardı. Yüz yüze kadar olmasa da verimli geçtiğini düşünüyorum.",
    displayName: "Zeynep K.",
  },
  {
    id: "t4",
    quote:
      "Kaygılarımı anlamlandırmamda çok yardımcı oldu. Kendime dair farkındalığım arttı; teşekkür ederim.",
    displayName: "Can D.",
  },
];

export const PUBLIC_TESTIMONIALS: readonly PublicTestimonial[] =
  z.array(testimonialSchema).min(3).parse(raw);
