import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type {
  BlogPostType,
  BlogListParams,
  PaginatedResult,
  PaginationParams,
  ServiceResult,
} from "@/types";
import { createBlogPostSchema, updateBlogPostSchema } from "@/lib/validations/blog-validation";
import { titleToSlug, ensureUniqueSlug } from "@/lib/utils/slug";

/** Bounded page size for the public blog index (no pagination in v1). */
const PUBLIC_BLOG_LIST_TAKE = 100;

export async function listPublishedForPublic(): Promise<
  ServiceResult<BlogPostType[]>
> {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      take: PUBLIC_BLOG_LIST_TAKE,
    });
    return { success: true, data: posts };
  } catch {
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function getPublishedById(
  id: number
): Promise<ServiceResult<BlogPostType | null>> {
  try {
    const blogPost = await prisma.blogPost.findFirst({
      where: { id, isActive: true },
    });
    return { success: true, data: blogPost };
  } catch {
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function getPublishedBySlug(
  slug: string
): Promise<ServiceResult<BlogPostType | null>> {
  try {
    const blogPost = await prisma.blogPost.findFirst({
      where: { slug, isActive: true },
    });
    return { success: true, data: blogPost };
  } catch {
    return { success: false, error: "An unexpected error occurred" };
  }
}

/** Resolves a public blog URL segment (slug or legacy numeric id). */
export async function getPublishedBySlugOrLegacyId(
  param: string
): Promise<ServiceResult<BlogPostType | null>> {
  const bySlug = await getPublishedBySlug(param);
  if (!bySlug.success) {
    return bySlug;
  }
  if (bySlug.data) {
    return bySlug;
  }

  if (/^\d+$/.test(param)) {
    return getPublishedById(Number(param));
  }

  return { success: true, data: null };
}

export async function getAll(
  params: PaginationParams
): Promise<ServiceResult<PaginatedResult<BlogPostType>>> {
  try {
    const skip = (params.page - 1) * params.pageSize;
    const [data, total] = await Promise.all([
      prisma.blogPost.findMany({ skip, take: params.pageSize }),
      prisma.blogPost.count(),
    ]);

    return {
      success: true,
      data: {
        data,
        pagination: {
          page: params.page,
          pageSize: params.pageSize,
          total,
          totalPages: Math.ceil(total / params.pageSize),
        },
      },
    };
  } catch {
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function listForAdmin(
  params: BlogListParams
): Promise<ServiceResult<PaginatedResult<BlogPostType>>> {
  try {
    const skip = (params.page - 1) * params.pageSize;
    const orderBy: Prisma.BlogPostOrderByWithRelationInput = {
      [params.sortBy]: params.sortDir,
    };
    const [data, total] = await Promise.all([
      prisma.blogPost.findMany({
        skip,
        take: params.pageSize,
        orderBy,
      }),
      prisma.blogPost.count(),
    ]);

    return {
      success: true,
      data: {
        data,
        pagination: {
          page: params.page,
          pageSize: params.pageSize,
          total,
          totalPages: Math.ceil(total / params.pageSize),
        },
      },
    };
  } catch {
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function getById(
  id: number
): Promise<ServiceResult<BlogPostType | null>> {
  try {
    const blogPost = await prisma.blogPost.findUnique({ where: { id } });
    return { success: true, data: blogPost };
  } catch {
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function create(
  data: unknown
): Promise<ServiceResult<BlogPostType>> {
  if (typeof data !== "object" || data === null) {
    return { success: false, error: "Invalid data" };
  }

  const inputData = data as Record<string, unknown>;
  
  let slug = inputData.slug as string | undefined;
  if (!slug && inputData.title && typeof inputData.title === "string") {
    const baseSlug = titleToSlug(inputData.title);
    const existingSlugs = await getAllSlugs();
    slug = ensureUniqueSlug(baseSlug, existingSlugs);
  }

  const parsed = createBlogPostSchema.safeParse({
    ...inputData,
    slug,
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    const blogPost = await prisma.blogPost.create({ data: parsed.data });
    return { success: true, data: blogPost };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const target = (error.meta?.target as string[]) ?? [];
        if (target.includes("title")) {
          return { success: false, error: "A blog post with this title already exists" };
        }
        if (target.includes("slug")) {
          return { success: false, error: "A blog post with this slug already exists" };
        }
        return { success: false, error: "A blog post with these details already exists" };
      }
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function update(
  id: number,
  data: unknown
): Promise<ServiceResult<BlogPostType>> {
  if (typeof data !== "object" || data === null) {
    return { success: false, error: "Invalid data" };
  }

  const inputData = data as Record<string, unknown>;

  if (inputData.title && typeof inputData.title === "string" && !inputData.slug) {
    const baseSlug = titleToSlug(inputData.title);
    const existingSlugs = await getAllSlugsExcept(id);
    inputData.slug = ensureUniqueSlug(baseSlug, existingSlugs);
  }

  const parsed = updateBlogPostSchema.safeParse(inputData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    const blogPost = await prisma.blogPost.update({
      where: { id },
      data: parsed.data,
    });
    return { success: true, data: blogPost };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return { success: false, error: "Blog post not found" };
      }
      if (error.code === "P2002") {
        const target = (error.meta?.target as string[]) ?? [];
        if (target.includes("title")) {
          return { success: false, error: "A blog post with this title already exists" };
        }
        if (target.includes("slug")) {
          return { success: false, error: "A blog post with this slug already exists" };
        }
        return { success: false, error: "A blog post with these details already exists" };
      }
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function remove(
  id: number
): Promise<ServiceResult<BlogPostType>> {
  try {
    const blogPost = await prisma.blogPost.delete({ where: { id } });
    return { success: true, data: blogPost };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return { success: false, error: "Blog post not found" };
      }
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

async function getAllSlugs(): Promise<Set<string>> {
  const posts = await prisma.blogPost.findMany({
    select: { slug: true },
  });
  return new Set(posts.map((p) => p.slug));
}

async function getAllSlugsExcept(excludeId: number): Promise<Set<string>> {
  const posts = await prisma.blogPost.findMany({
    where: { id: { not: excludeId } },
    select: { slug: true },
  });
  return new Set(posts.map((p) => p.slug));
}
