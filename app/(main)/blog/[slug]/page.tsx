import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { BlogContent } from "@/components/feature/blog-content";
import { htmlToPlainText } from "@/lib/blog-public-html";
import { getBlogPostPath } from "@/lib/routes";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import { getPublishedBySlugOrLegacyId } from "@/server/services/blog-service";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!slug || typeof slug !== "string") {
    return { title: "Blog" };
  }

  const result = await getPublishedBySlugOrLegacyId(slug);
  if (!result.success || !result.data) {
    return { title: "Blog" };
  }

  const post = result.data;
  const plain = htmlToPlainText(post.content);
  const description =
    plain.length > 0 ? plain.slice(0, 155) : post.title;
  const pathname = getBlogPostPath(post.slug);

  return buildPageMetadata({
    title: post.title,
    description,
    pathname,
    openGraphType: "article",
  });
}

export default async function BlogPostPage({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const { slug } = await params;

  if (!slug || typeof slug !== "string") {
    notFound();
  }

  const result = await getPublishedBySlugOrLegacyId(slug);
  if (!result.success || !result.data) {
    notFound();
  }

  const post = result.data;
  if (/^\d+$/.test(slug) && post.slug !== slug) {
    redirect(getBlogPostPath(post.slug));
  }

  return <BlogContent post={post} />;
}
