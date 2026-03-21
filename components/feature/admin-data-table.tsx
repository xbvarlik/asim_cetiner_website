"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function toSearchParams(
  base: Record<string, string | undefined>
): URLSearchParams {
  const u = new URLSearchParams();
  Object.entries(base).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      u.set(key, value);
    }
  });
  return u;
}

export function adminListHref(
  pathname: string,
  params: Record<string, string | undefined>
): string {
  const u = toSearchParams(params);
  const q = u.toString();
  return q ? `${pathname}?${q}` : pathname;
}

export function AdminPagination({
  pathname,
  page,
  totalPages,
  query,
}: {
  pathname: string;
  page: number;
  totalPages: number;
  query: Record<string, string | undefined>;
}): React.JSX.Element | null {
  if (totalPages <= 1) {
    return null;
  }

  const prev = page > 1 ? page - 1 : null;
  const next = page < totalPages ? page + 1 : null;

  return (
    <div className="mt-4 flex items-center justify-end gap-2">
      {prev != null ? (
        <Link
          href={adminListHref(pathname, { ...query, page: String(prev) })}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          Önceki
        </Link>
      ) : (
        <Button variant="outline" size="sm" disabled>
          Önceki
        </Button>
      )}
      <span className="text-muted-foreground text-sm">
        Sayfa {page} / {totalPages}
      </span>
      {next != null ? (
        <Link
          href={adminListHref(pathname, { ...query, page: String(next) })}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          Sonraki
        </Link>
      ) : (
        <Button variant="outline" size="sm" disabled>
          Sonraki
        </Button>
      )}
    </div>
  );
}

export function AdminSortHeader({
  pathname,
  label,
  field,
  currentField,
  currentDir,
  query,
}: {
  pathname: string;
  label: string;
  field: string;
  currentField: string;
  currentDir: string;
  query: Record<string, string | undefined>;
}): React.JSX.Element {
  const isActive = currentField === field;
  const nextDir =
    isActive && currentDir === "asc" ? "desc" : isActive ? "asc" : "desc";
  const href = adminListHref(pathname, {
    ...query,
    sortBy: field,
    sortDir: isActive ? nextDir : "desc",
    page: "1",
  });

  return (
    <Link
      href={href}
      className={cn(
        "hover:text-foreground inline-flex items-center gap-1 font-medium",
        isActive ? "text-foreground" : "text-muted-foreground"
      )}
    >
      {label}
      {isActive ? (currentDir === "asc" ? " ↑" : " ↓") : ""}
    </Link>
  );
}
