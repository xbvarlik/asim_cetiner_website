"use client";

import * as React from "react";
import { Tabs } from "@base-ui/react/tabs";

import { cn } from "@/lib/utils";

function TabsRoot({
  className,
  ...props
}: React.ComponentProps<typeof Tabs.Root>): React.JSX.Element {
  return (
    <Tabs.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof Tabs.List>): React.JSX.Element {
  return (
    <Tabs.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-full max-w-full flex-wrap items-center justify-start gap-1 rounded-lg p-1 sm:flex-nowrap",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof Tabs.Tab>): React.JSX.Element {
  return (
    <Tabs.Tab
      data-slot="tabs-trigger"
      className={cn(
        "ring-offset-background focus-visible:ring-ring data-active:bg-background data-active:text-foreground inline-flex min-h-8 shrink-0 items-center justify-center rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:px-3 sm:text-sm",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof Tabs.Panel>): React.JSX.Element {
  return (
    <Tabs.Panel
      data-slot="tabs-content"
      className={cn(
        "ring-offset-background focus-visible:ring-ring mt-2 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  );
}

export { TabsRoot, TabsList, TabsTrigger, TabsContent };
