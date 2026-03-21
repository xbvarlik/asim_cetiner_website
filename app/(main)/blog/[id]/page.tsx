import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { z } from "zod";

import { BlogContent } from "@/components/feature/blog-content";
import { htmlToPlainText } from "@/lib/blog-public-html";
import { getPublishedById } from "@/server/services/blog-service";

const idParamSchema = z.coerce.number().int().positive();

type PageProps = {
  params: Promise<{ id: string }>;
};

function parseId(raw: string): number | null {
  const parsed = idParamSchema.safeParse(raw);
  return parsed.success ? parsed.data : null;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id: raw } = await params;
  const id = parseId(raw);
  if (id === null) {
    return { title: "Blog" };
  }

  const result = await getPublishedById(id);
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
  const { id: raw } = await params;
  const id = parseId(raw);
  if (id === null) {
    notFound();
  }

  const result = await getPublishedById(id);
  if (!result.success || !result.data) {
    notFound();
  }

  return <BlogContent post={result.data} />;
}
