import { ServicesListDetailedCards } from "@/components/feature/services-list-detailed-cards";

export function ServicesListDetailed(): React.JSX.Element {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Hizmetlerimiz
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
            Aile, bireysel ve çift danışmanlığında bilimsel temelli destek
            sunuyorum. Aşağıda her alan için kapsam ve odak noktalarını detaylı
            olarak bulabilirsiniz.
          </p>
        </div>

        <ServicesListDetailedCards />
      </div>
    </section>
  );
}
