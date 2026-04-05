"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { ROUTES } from "@/lib/routes";
import { AdminSignOutButton } from "@/components/feature/admin-sign-out-button";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems: { href: string; label: string }[] = [
  { href: ROUTES.admin.leads, label: "Danışan Yönetimi" },
  { href: ROUTES.admin.blog, label: "Blog Yönetimi" },
  { href: ROUTES.admin.offices, label: "Ofis Yönetimi" },
  { href: ROUTES.admin.stats, label: "İstatistikler" },
  { href: ROUTES.admin.settings, label: "Ayarlar" },
];

function navLinkClassName(active: boolean): string {
  return cn(
    "hover:bg-muted rounded-md px-3 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
    active ? "bg-muted font-medium" : "text-muted-foreground"
  );
}

export function AdminShell({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  function isActive(href: string): boolean {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <div className="bg-muted/30 flex min-h-screen min-w-0 flex-col overflow-x-hidden">
      <header className="bg-background border-b px-4 py-3">
        <div className="mx-auto flex min-w-0 max-w-6xl items-center justify-between gap-3">
          <Link
            href={ROUTES.admin.home}
            className="text-foreground min-w-0 shrink truncate font-semibold focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Yönetim
          </Link>

          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetTrigger
              className="md:hidden"
              render={
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  className="shrink-0"
                  aria-label="Yönetim menüsünü aç"
                  aria-expanded={mobileNavOpen}
                  aria-controls="admin-mobile-nav"
                />
              }
            >
              <Menu className="size-4" aria-hidden />
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-sm sm:max-w-md">
              <SheetTitle className="sr-only">Yönetim menüsü</SheetTitle>
              <nav
                id="admin-mobile-nav"
                className="mt-2 flex min-w-0 flex-col gap-1"
                aria-label="Yönetim menüsü"
              >
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={navLinkClassName(isActive(item.href))}
                    onClick={() => {
                      setMobileNavOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-border mt-3 border-t pt-3">
                  <AdminSignOutButton
                    onBeforeLogout={() => {
                      setMobileNavOpen(false);
                    }}
                  />
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <nav
            className="hidden min-w-0 flex-wrap items-center justify-end gap-2 md:flex"
            aria-label="Yönetim menüsü"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={navLinkClassName(isActive(item.href))}
              >
                {item.label}
              </Link>
            ))}
            <AdminSignOutButton />
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full min-w-0 max-w-6xl flex-1 p-4">
        {children}
      </main>
    </div>
  );
}
