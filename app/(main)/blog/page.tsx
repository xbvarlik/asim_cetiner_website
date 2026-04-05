import type { Metadata } from "next";

import { RevealSection } from "@/components/feature/motion/reveal-section";
import { BlogList } from "@/components/feature/blog-list";
import { listPublishedForPublic } from "@/server/services/blog-service";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Psikoloji, ruh sağlığı ve danışmanlık üzerine yazılar ve güncel içerikler.",
};

export default async function BlogPage(): Promise<React.JSX.Element> {
  const result = await listPublishedForPublic();

  return (
    <RevealSection className="block w-full">
    <section className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <h1 className="text-center text-3xl font-bold text-primary sm:text-4xl">
          Blog
        </h1>
        <p className="mt-3 text-center text-pretty text-muted-foreground">
          Psikoloji ve ruh sağlığı üzerine yazılar.
        </p>
        <div className="mt-10 sm:mt-12">
          {!result.success ? (
            <p className="text-center text-muted-foreground">
              Yazılar şu anda yüklenemiyor. Lütfen daha sonra tekrar deneyin.
            </p>
          ) : (
            <BlogList posts={result.data} />
          )}
        </div>
      </div>
    </section>
    </RevealSection>
  );
}
