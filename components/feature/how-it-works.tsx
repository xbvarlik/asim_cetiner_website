import { RevealSection } from "@/components/feature/motion/reveal-section";
import { HOW_IT_WORKS_STEPS } from "@/lib/content/how-it-works";

export function HowItWorks(): React.JSX.Element {
  return (
    <RevealSection className="block w-full">
      <section
        className="bg-background py-20 sm:py-28"
        aria-labelledby="how-it-works-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="how-it-works-heading"
              className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              Süreç Nasıl İşliyor?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
              Terapi sürecine dair adımları şeffaf ve sade bir çerçevede
              özetledim; sorularınız için iletişime geçebilirsiniz.
            </p>
          </div>

          <ol className="mx-auto mt-14 grid max-w-3xl gap-8 sm:gap-10">
            {HOW_IT_WORKS_STEPS.map((step) => (
              <li
                key={step.order}
                className="relative flex gap-5 rounded-2xl border border-border/80 bg-card/60 p-6 shadow-sm ring-1 ring-border/40 sm:gap-6 sm:p-8"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-base font-semibold text-primary"
                  aria-hidden
                >
                  {step.order}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </RevealSection>
  );
}
