import {
  Brain,
  Heart,
  Users,
  Shield,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { RevealSection } from "@/components/feature/motion/reveal-section";

type ServiceItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const SERVICES: ServiceItem[] = [
  {
    icon: Brain,
    title: "Bireysel Terapi",
    description:
      "Kişisel zorluklarınızla başa çıkmanız için birebir terapi seansları. Bilişsel davranışçı terapi ve kanıta dayalı yöntemler.",
  },
  {
    icon: Heart,
    title: "Çift Terapisi",
    description:
      "İlişkinizdeki iletişim sorunlarını çözmek ve bağınızı güçlendirmek için profesyonel çift danışmanlığı.",
  },
  {
    icon: Users,
    title: "Aile Danışmanlığı",
    description:
      "Aile içi dinamikleri iyileştirmek ve sağlıklı iletişim kalıpları oluşturmak için aile terapisi.",
  },
  {
    icon: Shield,
    title: "Travma Terapisi",
    description:
      "EMDR ve travma odaklı bilişsel davranışçı terapi ile geçmiş travmaların etkilerini azaltma.",
  },
  {
    icon: Sparkles,
    title: "Stres Yönetimi",
    description:
      "İş ve günlük yaşam stresini yönetmek için pratik stratejiler ve gevşeme teknikleri.",
  },
  {
    icon: MessageCircle,
    title: "Online Terapi",
    description:
      "Evinizin konforunda, güvenli video görüşme ile profesyonel psikolojik destek alın.",
  },
];

export function ServicesList(): React.JSX.Element {
  return (
    <RevealSection className="block w-full">
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Hizmetlerimiz
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            İhtiyaçlarınıza uygun, kanıta dayalı terapi hizmetleri sunuyorum.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-card-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    </RevealSection>
  );
}
