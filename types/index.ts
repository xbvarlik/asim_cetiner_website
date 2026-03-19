import type {
  Status,
  Office,
  Lead,
  BlogPost,
} from "@/lib/generated/prisma/client";

export type StatusType = Status;
export type OfficeType = Office;
export type LeadType = Lead;
export type BlogPostType = BlogPost;

export type PaginationParams = {
  page: number;
  pageSize: number;
};

export type PaginatedResult<T> = {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

export type ServiceResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };
