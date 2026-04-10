import { PUBLIC_TESTIMONIALS } from "@/lib/content/testimonials";

function TestimonialCard({
  quote,
  displayName,
}: {
  quote: string;
  displayName: string;
}): React.JSX.Element {
  return (
    <figure className="flex w-[min(100vw-2rem,22rem)] shrink-0 flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm ring-1 ring-border/30 sm:w-80">
      <blockquote className="text-sm leading-relaxed text-card-foreground">
        <span className="text-primary/80" aria-hidden>
          “
        </span>
        {quote}
        <span className="text-primary/80" aria-hidden>
          ”
        </span>
      </blockquote>
      <figcaption className="mt-4 text-sm font-medium text-muted-foreground">
        — {displayName}
      </figcaption>
    </figure>
  );
}

export function TestimonialsSection(): React.JSX.Element {
  const items = PUBLIC_TESTIMONIALS;
  const loopItems = [...items, ...items];

  return (
    <section
      className="bg-muted/25 py-20 sm:py-28"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="testimonials-heading"
            className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Danışan Yorumları
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
            Sürece katılan danışanlardan anonimleştirilmiş geri bildirimler.
          </p>
        </div>
      </div>

      <div className="testimonial-marquee-static mx-auto mt-12 max-w-7xl flex-wrap justify-center gap-6 px-4 sm:px-6 lg:px-8">
        {items.map((t) => (
          <TestimonialCard
            key={t.id}
            quote={t.quote}
            displayName={t.displayName}
          />
        ))}
      </div>

      <div className="testimonial-marquee-scroll relative mt-12 w-full">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-muted/25 to-transparent sm:w-24"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-muted/25 to-transparent sm:w-24"
          aria-hidden
        />
        <div className="overflow-hidden">
          <div className="testimonial-marquee-track gap-6 pr-6 pl-4 sm:pl-6">
            {loopItems.map((t, i) => (
              <TestimonialCard
                key={`${t.id}-${i}`}
                quote={t.quote}
                displayName={t.displayName}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
