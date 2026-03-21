import Link from "next/link";

import { stripUnsafeBlogHtml, formatBlogPostDate } from "@/lib/blog-public-html";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import type { PublicBlogPost } from "@/types";

export type BlogContentProps = {
  post: PublicBlogPost;
  backHref?: string;
};

export function BlogContent({
  post,
  backHref = ROUTES.blog,
}: BlogContentProps): React.JSX.Element {
  const safeHtml = stripUnsafeBlogHtml(post.content);

  return (
    <section className="bg-background py-12 sm:py-16">
      <article className="mx-auto max-w-prose px-4 sm:px-6">
        <Link
          href={backHref}
          className="inline-flex rounded-sm text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          ← Geri Dön
        </Link>
        <h1 className="mt-6 text-3xl font-semibold text-pretty text-primary sm:text-4xl">
          {post.title}
        </h1>
        <time
          className="mt-3 block text-sm text-muted-foreground"
          dateTime={post.createdAt.toISOString()}
        >
          {formatBlogPostDate(post.createdAt)}
        </time>
        <div
          className={cn(
            "blog-body mt-8 space-y-4 text-pretty leading-relaxed text-foreground",
            "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4",
            "break-words"
          )}
          dangerouslySetInnerHTML={{ __html: safeHtml }}
        />
      </article>
    </section>
  );
}
