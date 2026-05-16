import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { RevealSection } from "@/components/feature/motion/reveal-section";
import { stripUnsafeBlogHtml } from "@/lib/blog-public-html";
import * as legalDocService from "@/server/services/legal-document-service";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description: "Kişisel verilerin korunması ve işlenmesi hakkında aydınlatma metni.",
};

export default async function KvkkPage(): Promise<React.JSX.Element> {
  const result = await legalDocService.getById("kvkk");

  if (!result.success || !result.data) {
    notFound();
  }

  const doc = result.data;
  const safeHtml = stripUnsafeBlogHtml(doc.content);

  return (
    <RevealSection className="block w-full">
      <section className="bg-background py-12 sm:py-16">
        <article className="mx-auto max-w-prose px-4 sm:px-6">
          <Link
            href={ROUTES.home}
            className="inline-flex rounded-sm text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            ← Ana Sayfa
          </Link>
          <h1 className="mt-6 text-3xl font-semibold text-pretty text-primary sm:text-4xl">
            {doc.title}
          </h1>
          <time
            className="mt-3 block text-sm text-muted-foreground"
            dateTime={doc.updatedAt.toISOString()}
          >
            Son güncelleme: {new Date(doc.updatedAt).toLocaleDateString("tr-TR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <div
            className={cn(
              "legal-content mt-8 space-y-4 text-pretty leading-relaxed text-foreground",
              "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4",
              "[&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:mt-8 [&_h1]:mb-4",
              "[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-3",
              "[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2",
              "[&_ul]:list-disc [&_ul]:ml-6 [&_ul]:space-y-2",
              "[&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:space-y-2",
              "[&_p]:mb-4",
              "break-words"
            )}
            dangerouslySetInnerHTML={{ __html: safeHtml }}
          />
        </article>
      </section>
    </RevealSection>
  );
}
