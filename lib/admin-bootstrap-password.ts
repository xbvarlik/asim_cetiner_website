/**
 * Initial plaintext password for the single admin account created or reset by
 * `prisma db seed`. Override for a given seed run with env
 * `ADMIN_BOOTSTRAP_PASSWORD` (optional).
 *
 * After first login, change it from **Admin → Ayarlar → Şifre değiştir** (current
 * password required) — no redeploy needed.
 */
export const ADMIN_SEED_PLAIN_PASSWORD: string =
  process.env.ADMIN_BOOTSTRAP_PASSWORD?.trim() || "Asim123";
