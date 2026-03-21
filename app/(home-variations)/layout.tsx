import { SiteShell } from "@/components/feature/site-shell";

export default function HomeVariationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return <SiteShell>{children}</SiteShell>;
}
