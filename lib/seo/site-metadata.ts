import type { Metadata } from "next";

import { getSiteOrigin } from "@/lib/seo/site-origin";

/** Production origin when env is unset (sitemap, docs). Prefer `NEXT_PUBLIC_SITE_URL` in deploy. */
export const DEFAULT_PRODUCTION_ORIGIN = "https://www.asimcetiner.com" as const;

export const SITE_NAME = "Asım Çetiner" as const;

export const SITE_DEFAULT_TITLE =
  "Klinik Psikolog İstanbul - Asım Çetiner | Kadıköy Psikolojik Danışmanlık" as const;

export const SITE_TITLE_TEMPLATE = "%s | Asım Çetiner" as const;

export const SITE_DEFAULT_DESCRIPTION =
  "Kadıköy'de yüz yüze ve online danışmanlık. Klinik Psikolog Asım Çetiner ile bireysel, aile ve çift danışmanlığında bilimsel temelli destek." as const;

export const SITE_LOCALE = "tr_TR" as const;

export const SITE_THEME_COLOR = "#783b04" as const;

/** Static paths under `public/` — verify locally at http://localhost:3000/… */
export const SITE_OG_IMAGE_PATH = "/og-image.jpg" as const;
export const SITE_FAVICON_PATH = "/favicon.ico" as const;
export const SITE_APPLE_TOUCH_ICON_PATH = "/apple-touch-icon.png" as const;
export const SITE_MANIFEST_PATH = "/site.webmanifest" as const;

export function getMetadataBase(): URL {
  return new URL(`${getSiteOrigin()}/`);
}

export function absoluteAssetUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, getMetadataBase()).toString();
}

const sharedIcons: Metadata["icons"] = {
  icon: [
    { url: SITE_FAVICON_PATH, sizes: "any" },
    { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
  ],
  apple: [{ url: SITE_APPLE_TOUCH_ICON_PATH, sizes: "180x180", type: "image/png" }],
  shortcut: SITE_FAVICON_PATH,
};

const sharedOgImages: NonNullable<Metadata["openGraph"]>["images"] = [
  {
    url: SITE_OG_IMAGE_PATH,
    width: 1200,
    height: 630,
    alt: SITE_DEFAULT_TITLE,
  },
];

const sharedOpenGraph: Metadata["openGraph"] = {
  type: "website",
  locale: SITE_LOCALE,
  siteName: SITE_NAME,
  title: SITE_DEFAULT_TITLE,
  description: SITE_DEFAULT_DESCRIPTION,
  images: sharedOgImages,
};

const sharedTwitter: Metadata["twitter"] = {
  card: "summary_large_image",
  title: SITE_DEFAULT_TITLE,
  description: SITE_DEFAULT_DESCRIPTION,
  images: [SITE_OG_IMAGE_PATH],
};

/** Root layout metadata — pages merge/override title & description. */
export const rootSiteMetadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: SITE_DEFAULT_TITLE,
    template: SITE_TITLE_TEMPLATE,
  },
  description: SITE_DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  manifest: SITE_MANIFEST_PATH,
  icons: sharedIcons,
  openGraph: sharedOpenGraph,
  twitter: sharedTwitter,
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "theme-color": SITE_THEME_COLOR,
  },
};

export function buildPageMetadata({
  title,
  description,
  pathname,
  openGraphType = "website",
}: {
  title?: string;
  description?: string;
  pathname: string;
  openGraphType?: "website" | "article";
}): Metadata {
  const canonicalPath = pathname.startsWith("/") ? pathname : `/${pathname}`;

  return {
    ...(title !== undefined ? { title } : {}),
    ...(description !== undefined ? { description } : {}),
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: openGraphType,
      ...(title !== undefined ? { title } : {}),
      ...(description !== undefined ? { description } : {}),
      url: canonicalPath,
      images: sharedOgImages,
    },
    twitter: {
      card: "summary_large_image",
      ...(title !== undefined ? { title } : {}),
      ...(description !== undefined ? { description } : {}),
      images: [SITE_OG_IMAGE_PATH],
    },
  };
}
