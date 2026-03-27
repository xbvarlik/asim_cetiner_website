"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Share2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShareModal } from "@/components/feature/share-modal";
import { getHomeLink, ROUTES } from "@/lib/routes";
import type { NavItem } from "@/types";

const STATIC_NAV_REST: NavItem[] = [
  { label: "Hakkımda", href: ROUTES.about },
  { label: "Çalışma Alanları", href: ROUTES.areasOfWork },
  { label: "Hizmetler", href: ROUTES.services },
  { label: "İletişim", href: ROUTES.contact },
  { label: "Blog", href: ROUTES.blog },
];

export function Header(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const pathname = usePathname();
  const homeHref = getHomeLink(pathname);

  const navItems: NavItem[] = useMemo(
    () => [{ label: "Ana Sayfa", href: homeHref }, ...STATIC_NAV_REST],
    [homeHref]
  );

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/90 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/75">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
          <Link
            href={homeHref}
            className="min-w-0 shrink rounded-lg text-xl font-semibold tracking-tight text-primary transition-colors hover:text-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Kenan Kübuç
          </Link>

          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0 rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="Paylaş"
              onClick={() => {
                setShareOpen(true);
              }}
            >
              <Share2 className="h-5 w-5" />
            </Button>

            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
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
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => {
                        setOpen(false);
                      }}
                      className="rounded-lg px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <ShareModal open={shareOpen} onOpenChange={setShareOpen} />
    </>
  );
}
