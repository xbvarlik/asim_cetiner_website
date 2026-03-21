import { MapPin } from "lucide-react";

export function MapView(): React.JSX.Element {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Konumumuz
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Ofisimize kolayca ulaşabilirsiniz.
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-3xl items-center justify-center rounded-2xl border border-border bg-muted p-12 sm:p-20">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MapPin className="h-8 w-8" />
            </div>
            <p className="text-lg font-medium text-foreground">
              123 Terapi Sokak, İstanbul, Türkiye
            </p>
            <p className="text-sm text-muted-foreground">
              Harita görünümü yakında eklenecektir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
