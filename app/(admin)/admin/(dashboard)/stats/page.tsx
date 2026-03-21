import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İstatistikler",
  robots: { index: false, follow: false },
};

export default function AdminStatsPage(): React.JSX.Element {
  return (
    <div className="space-y-2">
      <h1 className="text-xl font-semibold">İstatistikler</h1>
      <p className="text-muted-foreground text-sm">
        Raporlama ve analiz özellikleri bu sürümde yer almıyor. İleride
        eklenecektir.
      </p>
    </div>
  );
}
