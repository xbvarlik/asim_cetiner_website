import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogContent } from "@/components/feature/blog-content";
import { htmlToPlainText } from "@/lib/blog-public-html";
import { getPublishedBySlug } from "@/server/services/blog-service";

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

  const result = await getPublishedBySlug(slug);
  if (!result.success || !result.data) {
    return { title: "Blog" };
  }

  const post = result.data;
  const plain = htmlToPlainText(post.content);
  const description =
    plain.length > 0 ? plain.slice(0, 155) : post.title;

  return {
    title: post.title,
    description,
  };
}

export default async function BlogPostPage({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  
  if (!slug || typeof slug !== "string") {
    notFound();
  }

  const result = await getPublishedBySlug(slug);
  if (!result.success || !result.data) {
    notFound();
  }

  return <BlogContent post={result.data} />;
}
