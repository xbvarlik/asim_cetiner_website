import { Footer } from "@/components/feature/footer";
import { Header } from "@/components/feature/header";

export function SiteShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
