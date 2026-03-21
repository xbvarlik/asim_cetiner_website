"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ROUTES } from "@/lib/routes";
import type { NavItem } from "@/types";

const NAV_ITEMS: NavItem[] = [
  { label: "Ana Sayfa", href: ROUTES.home },
  { label: "Hakkımda", href: ROUTES.about },
  { label: "Çalışma Alanları", href: ROUTES.areasOfWork },
  { label: "Hizmetler", href: ROUTES.services },
  { label: "İletişim", href: ROUTES.contact },
  { label: "Blog", href: ROUTES.blog },
];

export function Header(): React.JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={ROUTES.home}
          className="text-xl font-bold text-primary"
        >
          Kenan Kübuç
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="lg:hidden"
            render={
              <Button variant="ghost" size="icon" aria-label="Menüyü aç" />
            }
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="text-lg font-bold text-primary">
              Menü
            </SheetTitle>
            <nav className="mt-6 flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
