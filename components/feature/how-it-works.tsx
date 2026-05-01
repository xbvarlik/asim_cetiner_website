import Link from "next/link";
import { RevealSection } from "@/components/feature/motion/reveal-section";
import {
  HOW_IT_WORKS_CTA_HEADING,
  HOW_IT_WORKS_CTA_LINES,
  HOW_IT_WORKS_SECTION_INTRO,
  HOW_IT_WORKS_SECTION_TITLE,
  HOW_IT_WORKS_STEPS,
} from "@/lib/content/how-it-works";
import { ROUTES } from "@/lib/routes";

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
              {HOW_IT_WORKS_SECTION_TITLE}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
              {HOW_IT_WORKS_SECTION_INTRO}
            </p>
          </div>

          <ol className="mx-auto mt-14 max-w-3xl space-y-10 md:max-w-4xl">
            {HOW_IT_WORKS_STEPS.map((step) => (
              <li
                key={step.order}
                className="flex gap-5 sm:gap-6"
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground ring-4 ring-background"
                  aria-hidden
                >
                  {step.order}
                </div>
                <div className="min-w-0 pt-0.5">
                  <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mx-auto mt-20 max-w-xl rounded-2xl border border-border bg-card/60 px-6 py-8 text-center shadow-sm backdrop-blur-[2px] sm:mt-28 sm:px-10">
            <p className="text-lg font-semibold text-foreground sm:text-xl">
              {HOW_IT_WORKS_CTA_HEADING}
            </p>
            {HOW_IT_WORKS_CTA_LINES.map((line) => (
              <p
                key={line}
                className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground"
              >
                {line}
              </p>
            ))}
            <Link
              href={ROUTES.contact}
              className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-accent px-6 text-sm font-semibold text-accent-foreground shadow-sm transition-[filter,transform] hover:brightness-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.99]"
            >
              İletişime Geçin
            </Link>
          </div>
        </div>
      </section>
    </RevealSection>
  );
}
