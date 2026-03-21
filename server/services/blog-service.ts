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
  const parsed = createBlogPostSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    const blogPost = await prisma.blogPost.create({ data: parsed.data });
    return { success: true, data: blogPost };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { success: false, error: "A blog post with this title already exists" };
      }
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function update(
  id: number,
  data: unknown
): Promise<ServiceResult<BlogPostType>> {
  const parsed = updateBlogPostSchema.safeParse(data);
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
