"use client";

import { ChevronDown } from "lucide-react";

import {
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionRoot,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PUBLIC_FAQ_ITEMS } from "@/lib/content/faq";
import { cn } from "@/lib/utils";

export type FaqSectionProps = {
  variant?: "inline" | "page";
};

function splitAnswerParagraphs(answer: string): string[] {
  return answer.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
}

export function FaqSection({
  variant = "inline",
}: FaqSectionProps): React.JSX.Element {
  const sectionHeadingId = "faq-section-heading";

  return (
    <section
      className={cn(
        "bg-muted/25 py-20 sm:py-28",
        variant === "page" && "bg-background py-12 sm:py-16"
      )}
      aria-labelledby={
        variant === "inline" ? sectionHeadingId : undefined
      }
      aria-label={variant === "page" ? "Sıkça sorulan sorular" : undefined}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {variant === "inline" ? (
          <div className="text-center">
            <h2
              id={sectionHeadingId}
              className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              Sıkça Sorulan Sorular
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
              Merak ettiklerinize kısa yanıtlar; detaylar için iletişime
              geçebilirsiniz.
            </p>
          </div>
        ) : null}

        <AccordionRoot multiple className={cn(variant === "inline" && "mt-12")}>
          {PUBLIC_FAQ_ITEMS.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionHeader>
                <AccordionTrigger className="group">
                  <span className="pr-2">{item.question}</span>
                  <ChevronDown
                    aria-hidden
                    className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-data-[panel-open]:rotate-180"
                  />
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionPanel>
                <div className="space-y-3 pb-5 pl-1 pr-10 text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-relaxed">
                  {splitAnswerParagraphs(item.answer).map((para, idx) => (
                    <p key={`${item.id}-${idx}`}>{para}</p>
                  ))}
                </div>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </AccordionRoot>
      </div>
    </section>
  );
}
