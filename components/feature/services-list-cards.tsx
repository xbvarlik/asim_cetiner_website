"use client";

import { Brain, Heart, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";

import {
  type ServicePillarId,
  PUBLIC_SERVICE_PILLARS,
} from "@/lib/content/services";
import { ROUTES } from "@/lib/routes";

const ICON_BY_PILLAR_ID: Record<ServicePillarId, LucideIcon> = {
  aile: Users,
  bireysel: Brain,
  cift: Heart,
};

const cardLinkClass =
  "group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

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
      {PUBLIC_SERVICE_PILLARS.map((pillar, index) => {
        const Icon = ICON_BY_PILLAR_ID[pillar.id];
        const href = `${ROUTES.services}#hizmet-${pillar.id}`;
        const cardInner = (
          <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-[transform,box-shadow] duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[1.02] group-hover:shadow-lg group-focus-visible:border-ring">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-card-foreground">
              {pillar.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {pillar.shortDescription}
            </p>
          </div>
        );

        if (reduceMotion) {
          return (
            <div
              key={pillar.id}
              className="h-full"
              data-service-card-wrap
            >
              <Link href={href} className={cardLinkClass}>
                {cardInner}
              </Link>
            </div>
          );
        }

        return (
          <motion.div
            key={pillar.id}
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
            <Link href={href} className={cardLinkClass}>
              {cardInner}
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
