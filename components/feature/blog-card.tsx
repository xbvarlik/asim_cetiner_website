import Link from "next/link";

import { getBlogPostPath } from "@/lib/routes";
import { formatBlogPostDate, htmlToPlainText } from "@/lib/blog-public-html";
import type { PublicBlogPost } from "@/types";

export type BlogCardProps = {
  post: PublicBlogPost;
};

export function BlogCard({ post }: BlogCardProps): React.JSX.Element {
  const preview = htmlToPlainText(post.content);

  return (
    <article className="border-b border-border pb-8 last:border-0 last:pb-0">
      <h2 className="text-xl font-semibold text-primary sm:text-2xl">
        {post.title}
      </h2>
      <time
        className="mt-2 block text-sm text-muted-foreground"
        dateTime={post.createdAt.toISOString()}
      >
        {formatBlogPostDate(post.createdAt)}
      </time>
      <p className="mt-3 line-clamp-3 text-pretty leading-relaxed text-foreground">
        {preview}
      </p>
      <Link
        href={getBlogPostPath(post.id)}
        className="mt-4 inline-flex rounded-sm text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        Devamını oku
      </Link>
    </article>
  );
}
