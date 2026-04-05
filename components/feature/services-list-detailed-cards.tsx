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

import {
  type ServiceId,
  PUBLIC_SERVICES,
} from "@/lib/content/services";

const ICON_BY_SERVICE_ID: Record<ServiceId, LucideIcon> = {
  bireysel: Brain,
  cift: Heart,
  aile: Users,
  travma: Shield,
  stres: Sparkles,
  online: MessageCircle,
};

export function ServicesListDetailedCards(): React.JSX.Element {
  const reduceMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const syncHeights = (): void => {
      const wraps = [
        ...grid.querySelectorAll<HTMLElement>("[data-service-detailed-wrap]"),
      ];
      wraps.forEach((el) => {
        el.style.minHeight = "";
      });
      const singleColumn = window.matchMedia("(max-width: 767px)").matches;
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
      className="mt-16 grid gap-8 md:grid-cols-2"
    >
      {PUBLIC_SERVICES.map((service, index) => {
        const Icon = ICON_BY_SERVICE_ID[service.id];
        const card = (
          <div className="group flex h-full flex-col rounded-3xl border border-border bg-card p-8 shadow-md transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-xl focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-7 w-7" />
            </div>
            <h3 className="mt-5 text-xl font-semibold tracking-tight text-card-foreground sm:text-2xl">
              {service.title}
            </h3>
            <p className="mt-3 flex-1 text-base leading-relaxed text-muted-foreground">
              {service.detailedDescription}
            </p>
            <ul className="mt-6 list-disc space-y-2 border-t border-border pt-6 pl-5 text-sm leading-relaxed text-card-foreground marker:text-primary">
              {service.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        );

        if (reduceMotion) {
          return (
            <div
              key={service.id}
              className="h-full"
              data-service-detailed-wrap
            >
              {card}
            </div>
          );
        }

        return (
          <motion.div
            key={service.id}
            className="h-full"
            data-service-detailed-wrap
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.55,
              delay: index * 0.08,
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
