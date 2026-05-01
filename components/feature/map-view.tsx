import { MapPin } from "lucide-react";

import { RevealSection } from "@/components/feature/motion/reveal-section";
import {
  getSiteOfficeMapsSearchHref,
  SITE_OFFICE_ADDRESS_SINGLE_LINE,
} from "@/lib/site-contact";

export function MapView(): React.JSX.Element {
  const mapsHref = getSiteOfficeMapsSearchHref();

  return (
    <RevealSection className="block w-full">
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Konumumuz
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Ofis adresimize tek dokunuşla yol tarifi alabilirsiniz.
            </p>
          </div>

          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-center rounded-2xl border border-border bg-muted p-10 shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-14"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MapPin className="h-8 w-8" />
            </span>
            <span className="mt-6 text-center text-pretty text-lg font-medium leading-relaxed text-foreground underline-offset-4 sm:text-xl">
              {SITE_OFFICE_ADDRESS_SINGLE_LINE}
            </span>
            <span className="mt-3 text-center text-sm font-semibold text-primary">
              Haritada aç • Yol tarifi al
            </span>
          </a>
        </div>
      </section>
    </RevealSection>
  );
}
