import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export const DEFAULT_HERO_TITLE = "Profesyonel Psikolojik Danışmanlık";

export const DEFAULT_HERO_SUBTITLE =
  "Güvenli ve destekleyici bir ortamda, birlikte daha sağlıklı bir yaşam için adım atın. Uzman psikolog desteğiyle kendinizi keşfedin.";

type HeroProps = {
  title?: string;
  subtitle?: string;
};

export function Hero({
  title = DEFAULT_HERO_TITLE,
  subtitle = DEFAULT_HERO_SUBTITLE,
}: HeroProps): React.JSX.Element {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden">
      <Image
        src="/images/hero-therapy-calm.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/25"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="hero-intro-animate max-w-2xl text-left">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {subtitle}
          </p>

          <div className="mt-10 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              href={ROUTES.contact}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-accent px-6 text-sm font-semibold text-accent-foreground shadow-sm transition-[filter,transform] hover:brightness-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.99] sm:w-auto"
            >
              İletişime Geçin
            </Link>
            <Link
              href={ROUTES.services}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background/80 px-6 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors hover:bg-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto"
            >
              Hizmetlerimiz
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
