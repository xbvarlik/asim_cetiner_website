"use client";

import type * as React from "react";
import { Accordion } from "@base-ui/react/accordion";

import { cn } from "@/lib/utils";

function AccordionRoot({
  className,
  ...props
}: Accordion.Root.Props): React.JSX.Element {
  return (
    <Accordion.Root className={cn("w-full", className)} {...props} />
  );
}

function AccordionItem({
  className,
  ...props
}: Accordion.Item.Props): React.JSX.Element {
  return (
    <Accordion.Item
      className={cn(
        "border-b border-border/80 last:border-b-0",
        className
      )}
      {...props}
    />
  );
}

function AccordionHeader({
  className,
  ...props
}: Accordion.Header.Props): React.JSX.Element {
  return (
    <Accordion.Header className={cn("m-0", className)} {...props} />
  );
}

function AccordionTrigger({
  className,
  ...props
}: Accordion.Trigger.Props): React.JSX.Element {
  return (
    <Accordion.Trigger
      className={cn(
        "flex w-full items-center justify-between gap-3 rounded-xl px-1 py-4 text-left text-base font-semibold text-foreground transition-[color,filter] outline-none hover:text-primary hover:brightness-[0.98] focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 sm:py-5 sm:text-lg",
        className
      )}
      {...props}
    />
  );
}

function AccordionPanel({
  className,
  ...props
}: Accordion.Panel.Props): React.JSX.Element {
  return (
    <Accordion.Panel
      className={cn(
        "overflow-hidden data-[closed]:h-0 data-[closed]:opacity-0 data-[open]:opacity-100",
        className
      )}
      keepMounted={false}
      {...props}
    />
  );
}

export {
  AccordionRoot,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionPanel,
};
