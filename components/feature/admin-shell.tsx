"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { AdminSignOutButton } from "@/components/feature/admin-sign-out-button";
import { cn } from "@/lib/utils";

const navItems: { href: string; label: string }[] = [
  { href: ROUTES.admin.leads, label: "Danışan Yönetimi" },
  { href: ROUTES.admin.blog, label: "Blog Yönetimi" },
  { href: ROUTES.admin.offices, label: "Ofis Yönetimi" },
  { href: ROUTES.admin.stats, label: "İstatistikler" },
  { href: ROUTES.admin.settings, label: "Ayarlar" },
];

export function AdminShell({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const pathname = usePathname();

  return (
    <div className="bg-muted/30 flex min-h-screen flex-col">
      <header className="bg-background border-b px-4 py-3">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <Link
            href={ROUTES.admin.home}
            className="text-foreground font-semibold"
          >
            Yönetim
          </Link>
          <nav className="flex flex-wrap items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "hover:bg-muted rounded-md px-3 py-1.5 text-sm transition-colors",
                  pathname === item.href ||
                    pathname.startsWith(`${item.href}/`)
                    ? "bg-muted font-medium"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            <AdminSignOutButton />
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 p-4">{children}</main>
    </div>
  );
}
