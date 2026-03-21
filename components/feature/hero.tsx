import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export function Hero(): React.JSX.Element {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center bg-primary">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
          Profesyonel Psikolojik Danışmanlık
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/85 sm:text-xl">
          Güvenli ve destekleyici bir ortamda, birlikte daha sağlıklı bir yaşam
          için adım atın. Uzman psikolog desteğiyle kendinizi keşfedin.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href={ROUTES.contact}
            className="inline-flex h-9 w-full items-center justify-center rounded-lg bg-background px-5 text-sm font-medium text-primary transition-colors hover:bg-background/90 sm:w-auto"
          >
            İletişime Geçin
          </Link>
          <Link
            href={ROUTES.services}
            className="inline-flex h-9 w-full items-center justify-center rounded-lg border border-primary-foreground/30 px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10 sm:w-auto"
          >
            Hizmetlerimiz
          </Link>
        </div>
      </div>
    </section>
  );
}
