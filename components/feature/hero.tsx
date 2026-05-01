import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export const DEFAULT_HERO_TITLE =
  "Klinik Psikolog İstanbul - Asım Çetiner | Kadıköy Psikolojik Danışmanlık";

export const DEFAULT_HERO_SUBTITLE =
  "İstanbul’da arayışınızda, Kadıköy’deki özel klinimizde yüz yüze ve online danışmanlık seçenekleriyle yanınızdayım. Klinik Psikolog Asım Çetiner olarak; bireysel danışmanlık, aile danışmanlığı, çift danışmanlığı alanlarında bilimsel temelli destek sunuyorum.";

const THERAPIST_NAME = "Asım Çetiner";

function interleaveTherapistNameAccent(text: string): React.ReactNode {
  if (!text.includes(THERAPIST_NAME)) {
    return text;
  }
  const parts = text.split(THERAPIST_NAME);
  const out: React.ReactNode[] = [];
  parts.forEach((part, idx) => {
    out.push(part);
    if (idx < parts.length - 1) {
      out.push(
        <span key={`${idx}-${THERAPIST_NAME}`} className="text-brand-name-accent">
          {THERAPIST_NAME}
        </span>
      );
    }
  });
  return out;
}

type HeroProps = {
  title?: string;
  subtitle?: string;
};

export function Hero({
  title = DEFAULT_HERO_TITLE,
  subtitle = DEFAULT_HERO_SUBTITLE,
}: HeroProps): React.JSX.Element {
  return (
    <section className="relative flex min-h-[72vh] items-center overflow-hidden sm:min-h-[78vh]">
      <Image
        src="/images/asim-cetiner-bg-home.jpeg"
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

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="hero-intro-animate max-w-2xl text-left">
          <h1 className="text-3xl font-semibold leading-snug tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {interleaveTherapistNameAccent(title)}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {interleaveTherapistNameAccent(subtitle)}
          </p>

          <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
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
