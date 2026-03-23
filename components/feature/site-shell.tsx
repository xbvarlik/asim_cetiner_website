import { Suspense } from "react";

import { Footer } from "@/components/feature/footer";
import { Header } from "@/components/feature/header";
import { TrafficTracker } from "@/components/feature/traffic-tracker";

export function SiteShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <>
      <Suspense fallback={null}>
        <TrafficTracker />
      </Suspense>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
