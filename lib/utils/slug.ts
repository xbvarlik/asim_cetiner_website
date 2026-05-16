/**
 * Converts a string to a URL-friendly slug.
 * Handles Turkish characters and special characters.
 *
 * @param text - The text to convert to a slug
 * @returns A URL-friendly slug
 *
 * @example
 * titleToSlug("Example Title") // "example-title"
 * titleToSlug("Çok Güzel Bir Başlık") // "cok-guzel-bir-baslik"
 */
export function titleToSlug(text: string): string {
  const turkishCharMap: Record<string, string> = {
    'ç': 'c', 'Ç': 'C',
    'ğ': 'g', 'Ğ': 'G',
    'ı': 'i', 'İ': 'I',
    'ö': 'o', 'Ö': 'O',
    'ş': 's', 'Ş': 'S',
    'ü': 'u', 'Ü': 'U',
  };

  let slug = text;

  Object.entries(turkishCharMap).forEach(([turkish, latin]) => {
    slug = slug.replace(new RegExp(turkish, 'g'), latin);
  });

  slug = slug
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug;
}

/**
 * Generates a unique slug by appending a number if necessary.
 *
 * @param baseSlug - The base slug to make unique
 * @param existingSlugs - Set of existing slugs to check against
 * @returns A unique slug
 *
 * @example
 * ensureUniqueSlug("my-post", new Set(["my-post"])) // "my-post-2"
 * ensureUniqueSlug("my-post", new Set(["my-post", "my-post-2"])) // "my-post-3"
 */
export function ensureUniqueSlug(
  baseSlug: string,
  existingSlugs: Set<string>
): string {
  if (!existingSlugs.has(baseSlug)) {
    return baseSlug;
  }

  let counter = 2;
  let uniqueSlug = `${baseSlug}-${counter}`;

  while (existingSlugs.has(uniqueSlug)) {
    counter++;
    uniqueSlug = `${baseSlug}-${counter}`;
  }

  return uniqueSlug;
}
