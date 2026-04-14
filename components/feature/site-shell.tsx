import { Suspense } from "react";

import { Footer } from "@/components/feature/footer";
import { Header } from "@/components/feature/header";
import { MobileBottomContactBar } from "@/components/feature/mobile-bottom-contact-bar";
import { PracticeJsonLd } from "@/components/feature/practice-json-ld";
import { TrafficTracker } from "@/components/feature/traffic-tracker";

export function SiteShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <>
      <PracticeJsonLd />
      <Suspense fallback={null}>
        <TrafficTracker />
      </Suspense>
      <Header />
      <main className="flex-1 bg-background pb-28">{children}</main>
      <Footer />
      <MobileBottomContactBar />
    </>
  );
}
