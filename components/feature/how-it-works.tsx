import { RevealSection } from "@/components/feature/motion/reveal-section";
import { HOW_IT_WORKS_STEPS } from "@/lib/content/how-it-works";

const STEP_COUNT = HOW_IT_WORKS_STEPS.length;

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

          <div
            className="mt-14 -mx-4 snap-x snap-mandatory overflow-x-auto overflow-y-visible px-4 pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
            role="region"
            aria-labelledby="how-it-works-heading"
            tabIndex={0}
          >
            <div className="relative mx-auto min-w-[52rem] lg:min-w-0 lg:w-full [--hiw-gap:1.25rem] sm:[--hiw-gap:1.5rem]">
              <div
                className="pointer-events-none absolute top-12 z-0 border-t border-dashed border-border"
                style={{
                  left: `calc((100% - ${STEP_COUNT - 1} * var(--hiw-gap)) / ${STEP_COUNT} / 2)`,
                  right: `calc((100% - ${STEP_COUNT - 1} * var(--hiw-gap)) / ${STEP_COUNT} / 2)`,
                }}
                aria-hidden
              />
              <ol
                className="relative z-[1] grid list-none gap-x-5 pt-6 sm:gap-x-6"
                style={{
                  gridTemplateColumns: `repeat(${STEP_COUNT}, minmax(0, 1fr))`,
                }}
              >
                {HOW_IT_WORKS_STEPS.map((step) => (
                  <li
                    key={step.order}
                    className="flex snap-center flex-col items-center text-center"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground ring-2 ring-background">
                      <span aria-hidden>{step.order}</span>
                    </div>
                    <h3 className="mt-6 max-w-[14rem] text-balance text-base font-semibold text-foreground sm:max-w-none sm:text-lg">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-[14rem] text-pretty text-sm leading-relaxed text-muted-foreground sm:max-w-none sm:text-base sm:leading-relaxed">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </RevealSection>
  );
}
