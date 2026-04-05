export const ROUTES = {
  home: "/",
  about: "/hakkimda",
  services: "/hizmetler",
  contact: "/iletisim",
  faq: "/sikca-sorulan-sorular",
  blog: "/blog",
  seoIstanbulPsikolog: "/istanbul-psikolog",
  seoCiftTerapisi: "/cift-terapisi",
  seoBilisselDavranisciTerapi: "/bilissel-davranisci-terapi",
  seoUskudarPsikolog: "/uskudar-psikolog",
  seoBesiktasPsikolog: "/besiktas-psikolog",
  admin: {
    login: "/admin/login",
    home: "/admin",
    leads: "/admin/leads",
    blog: "/admin/blog",
    offices: "/admin/offices",
    stats: "/admin/stats",
    settings: "/admin/settings",
  },
} as const;

/** SEO landing entry paths — single source for contextual “Ana Sayfa” + share scope. */
export const SEO_LANDING_PATHS: readonly string[] = [
  ROUTES.seoIstanbulPsikolog,
  ROUTES.seoCiftTerapisi,
  ROUTES.seoBilisselDavranisciTerapi,
  ROUTES.seoUskudarPsikolog,
  ROUTES.seoBesiktasPsikolog,
];

export function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

/** On SEO landing pages, “home” stays the variant; elsewhere main site home. */
export function getHomeLink(pathname: string): string {
  const normalized = normalizePathname(pathname);
  const hit = SEO_LANDING_PATHS.find(
    (p) => normalizePathname(p) === normalized
  );
  return hit ?? ROUTES.home;
}

/** Public detail URL for a blog post; keep path construction centralized (constitution). */
export function getBlogPostPath(id: number): string {
  return `${ROUTES.blog}/${id}`;
}
