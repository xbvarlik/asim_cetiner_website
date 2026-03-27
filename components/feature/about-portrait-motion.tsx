"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type AboutPortraitMotionProps = {
  children: ReactNode;
  className?: string;
};

export function AboutPortraitMotion({
  children,
  className,
}: AboutPortraitMotionProps): React.JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("origin-center will-change-transform", className)}
      initial={{ opacity: 0.92, scale: 0.985 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {children}
    </motion.div>
  );
}
