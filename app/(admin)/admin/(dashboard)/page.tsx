import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Yönetim",
  robots: { index: false, follow: false },
};

export default function AdminHomePage(): React.JSX.Element {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Yönetim paneli</h1>
      <p className="text-muted-foreground text-sm">
        Soldaki menüden bölüm seçin veya{" "}
        <Link className="text-primary underline" href={ROUTES.admin.leads}>
          danışan yönetimine
        </Link>{" "}
        gidin.
      </p>
    </div>
  );
}
