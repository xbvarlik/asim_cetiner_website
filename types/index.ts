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

/** Serializable fields passed from Server Components to public blog feature UI. */
export type PublicBlogPost = Pick<
  BlogPostType,
  "id" | "title" | "content" | "createdAt"
>;

export type PaginationParams = {
  page: number;
  pageSize: number;
};

export type SortDirection = "asc" | "desc";

export type LeadListParams = PaginationParams & {
  sortBy: "createdAt" | "name" | "updatedAt";
  sortDir: SortDirection;
  statusId?: number;
  officeId?: number;
};

export type BlogListParams = PaginationParams & {
  sortBy: "createdAt" | "title" | "updatedAt";
  sortDir: SortDirection;
};

export type OfficeListParams = PaginationParams & {
  sortDir: SortDirection;
};

export type AdminActionResult =
  | { success: true; message?: string }
  | { success: false; error: string };

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

export type ContactFormState = {
  success: boolean;
  error?: string;
  fieldErrors?: {
    name?: string[];
    phoneNumber?: string[];
    email?: string[];
    message?: string[];
    officeId?: string[];
  };
};

export type NavItem = {
  label: string;
  href: string;
};

/** Admin stats dashboard (serializable to client chart props). */
export type LeadBySourceStat = {
  sourceKey: string;
  sourceLabel: string;
  count: number;
};

export type LeadByOfficeStat = {
  officeId: number;
  officeName: string;
  count: number;
};

export type VisitorBySourceStat = {
  sourceKey: string;
  sourceLabel: string;
  count: number;
};

export type ConversionStatRow = {
  sourceKey: string;
  sourceLabel: string;
  visitors: number;
  leads: number;
  conversionPercent: number | null;
};

export type DailySourceMetric = {
  day: string;
  sourceKey: string;
  sourceLabel: string;
  visitors: number;
  leads: number;
};

export type AdminStatsBundle = {
  leadsBySource: LeadBySourceStat[];
  leadsByOffice: LeadByOfficeStat[];
  visitorsBySource: VisitorBySourceStat[];
  conversion: ConversionStatRow[];
  dailyBySource: DailySourceMetric[];
};

export type { HomeTemplateProps } from "@/components/feature/home-template";
export type { ContactOfficeOption } from "@/lib/server/contact-page-data";
export type { SeoLandingSlug } from "@/lib/seo/landing-pages";
