export const ROUTES = {
  home: "/",
  about: "/hakkimda",
  services: "/hizmetler",
  areasOfWork: "/calisma-alanlari",
  contact: "/iletisim",
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

/** Public detail URL for a blog post; keep path construction centralized (constitution). */
export function getBlogPostPath(id: number): string {
  return `${ROUTES.blog}/${id}`;
}
