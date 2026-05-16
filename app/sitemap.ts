import { MetadataRoute } from "next";
import { ROUTES, SEO_LANDING_PATHS } from "@/lib/routes";
import * as blogService from "@/server/services/blog-service";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.asimcetiner.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL + ROUTES.home,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: BASE_URL + ROUTES.about,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: BASE_URL + ROUTES.services,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: BASE_URL + ROUTES.contact,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: BASE_URL + ROUTES.faq,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: BASE_URL + ROUTES.blog,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: BASE_URL + ROUTES.kvkk,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: BASE_URL + ROUTES.gizlilik,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const seoLandingRoutes: MetadataRoute.Sitemap = SEO_LANDING_PATHS.map((path) => ({
    url: BASE_URL + path,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  let blogRoutes: MetadataRoute.Sitemap = [];
  const blogResult = await blogService.listPublishedForPublic();
  if (blogResult.success) {
    blogRoutes = blogResult.data.map((post) => ({
      url: `${BASE_URL}${ROUTES.blog}/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  }

  return [...staticRoutes, ...seoLandingRoutes, ...blogRoutes];
}
