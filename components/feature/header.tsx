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
  { label: "Hizmetler", href: ROUTES.services },
  { label: "SSS", href: ROUTES.faq },
  { label: "İletişim", href: ROUTES.contact },
  { label: "Blog", href: ROUTES.blog },
];

const navLinkClassName =
  "rounded-xl px-3 py-2 text-base font-medium text-header-nav-foreground transition-colors duration-300 hover:bg-muted/70 hover:text-header-nav-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none";

const sheetNavLinkClassName =
  "block min-h-14 w-full rounded-xl px-3 py-4 text-center text-base font-medium text-header-nav-foreground transition-colors duration-300 hover:bg-muted/70 hover:text-header-nav-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none";

const iconButtonClassName =
  "shrink-0 rounded-xl text-header-nav-foreground transition-[background-color,filter] duration-300 hover:bg-muted/60 hover:brightness-[0.98] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

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
      <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/90 shadow-md backdrop-blur-md supports-[backdrop-filter]:bg-background/75">
        <div className="mx-auto grid h-20 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 shrink-0 justify-self-start">
            <Link
              href={homeHref}
              className="min-w-0 shrink rounded-xl text-xl font-semibold tracking-tight text-primary transition-[color,filter] duration-300 hover:text-primary/90 hover:brightness-[0.98] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            >
              Asım Çetiner
            </Link>
          </div>

          <div className="flex min-w-0 justify-center">
            <nav
              className="hidden items-center gap-0.5 lg:flex"
              aria-label="Ana navigasyon"
            >
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} className={navLinkClassName}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex shrink-0 items-center justify-end gap-1 justify-self-end">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={iconButtonClassName}
              aria-label="Paylaş"
              onClick={() => {
                setShareOpen(true);
              }}
            >
              <Share2 className="h-5 w-5" />
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                className="lg:hidden"
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className={iconButtonClassName}
                    aria-label="Menüyü aç"
                  />
                }
              >
                {open ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-sm sm:max-w-md">
                <SheetTitle className="sr-only">Mobil navigasyon</SheetTitle>
                <nav
                  className="mt-2 flex flex-col items-stretch gap-0"
                  aria-label="Mobil navigasyon"
                >
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => {
                        setOpen(false);
                      }}
                      className={sheetNavLinkClassName}
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
