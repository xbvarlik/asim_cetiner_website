"use client";

import {
  Brain,
  Heart,
  Users,
  Shield,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";

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

export function ServicesListCards(): React.JSX.Element {
  const reduceMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const syncHeights = (): void => {
      const wraps = [
        ...grid.querySelectorAll<HTMLElement>("[data-service-card-wrap]"),
      ];
      wraps.forEach((el) => {
        el.style.minHeight = "";
      });
      const singleColumn = window.matchMedia("(max-width: 639px)").matches;
      if (!singleColumn || wraps.length === 0) return;
      requestAnimationFrame(() => {
        const maxH = Math.max(
          0,
          ...wraps.map((el) => el.getBoundingClientRect().height)
        );
        const px = Math.ceil(maxH);
        wraps.forEach((el) => {
          el.style.minHeight = `${px}px`;
        });
      });
    };

    const ro = new ResizeObserver(syncHeights);
    ro.observe(grid);
    window.addEventListener("resize", syncHeights);
    syncHeights();
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", syncHeights);
    };
  }, []);

  return (
    <div
      ref={gridRef}
      className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {SERVICES.map((service, index) => {
        const Icon = service.icon;
        const card = (
          <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-card-foreground">
              {service.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {service.description}
            </p>
          </div>
        );

        if (reduceMotion) {
          return (
            <div
              key={service.title}
              className="h-full"
              data-service-card-wrap
            >
              {card}
            </div>
          );
        }

        return (
          <motion.div
            key={service.title}
            className="h-full"
            data-service-card-wrap
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.55,
              delay: index * 0.075,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {card}
          </motion.div>
        );
      })}
    </div>
  );
}
