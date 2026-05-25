/**
 * Generates favicon, PWA icons, and OG image into public/.
 * Run: node scripts/generate-brand-assets.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const logoPath = path.join(
  root,
  "public/images/asim-cetiner-logo-removebg-preview.png",
);

const BRAND_PRIMARY = "#783b04";
const BRAND_BG = "#faf8f5";
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

async function writePng(buffer, filename) {
  await writeFile(path.join(publicDir, filename), buffer);
}

/** Logo centered on a white circle — readable at favicon and SERP sizes. */
async function iconOnWhiteCircle(size, logoScale = 0.72) {
  const circleSvg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#ffffff"/>
</svg>`;

  const logoMax = Math.max(1, Math.round(size * logoScale));
  const logoBuffer = await sharp(logoPath)
    .ensureAlpha()
    .resize(logoMax, logoMax, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const { width: logoW = logoMax, height: logoH = logoMax } =
    await sharp(logoBuffer).metadata();

  return sharp(Buffer.from(circleSvg))
    .resize(size, size)
    .composite([
      {
        input: logoBuffer,
        left: Math.round((size - logoW) / 2),
        top: Math.round((size - logoH) / 2),
      },
    ])
    .png()
    .toBuffer();
}

async function main() {
  await mkdir(publicDir, { recursive: true });

  const logo = sharp(logoPath).ensureAlpha();
  const logoMeta = await logo.metadata();

  const favicon32 = await iconOnWhiteCircle(32);
  const favicon16 = await iconOnWhiteCircle(16);

  await writePng(favicon32, "favicon-32x32.png");
  await writePng(favicon16, "favicon-16x16.png");

  const ico = await pngToIco([favicon16, favicon32]);
  const faviconIcoPath = path.join(publicDir, "favicon.ico");
  await writeFile(faviconIcoPath, ico);
  await writeFile(path.join(root, "app", "favicon.ico"), ico);

  const appleTouch = await iconOnWhiteCircle(180);
  await writePng(appleTouch, "apple-touch-icon.png");

  for (const size of [192, 512]) {
    const icon = await iconOnWhiteCircle(size);
    await writePng(icon, `android-chrome-${size}x${size}.png`);
  }

  const logoMaxWidth = Math.min(420, Math.floor(OG_WIDTH * 0.38));
  const logoForOg = await logo
    .clone()
    .resize(logoMaxWidth, logoMaxWidth, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .png()
    .toBuffer();

  const logoOgMeta = await sharp(logoForOg).metadata();
  const logoW = logoOgMeta.width ?? logoMaxWidth;
  const logoH = logoOgMeta.height ?? logoMaxWidth;

  const titleSvg = `
<svg width="${OG_WIDTH}" height="${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BRAND_BG}"/>
      <stop offset="100%" stop-color="#f3ebe3"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect x="0" y="0" width="12" height="100%" fill="${BRAND_PRIMARY}"/>
  <text x="80" y="200" font-family="Georgia, 'Times New Roman', serif" font-size="52" font-weight="700" fill="${BRAND_PRIMARY}">
    Asım Çetiner
  </text>
  <text x="80" y="270" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="#3d2914">
    Klinik Psikolog · Kadıköy, İstanbul
  </text>
  <text x="80" y="340" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#5c4a3a">
    Bireysel, aile ve çift danışmanlığı · Yüz yüze ve online
  </text>
  <text x="80" y="520" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#783b04">
    www.asimcetiner.com
  </text>
</svg>`;

  const textLayer = await sharp(Buffer.from(titleSvg)).png().toBuffer();

  const logoLeft = OG_WIDTH - logoW - 72;
  const logoTop = Math.round((OG_HEIGHT - logoH) / 2);

  const ogImage = await sharp(textLayer)
    .composite([{ input: logoForOg, left: logoLeft, top: logoTop }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer();

  await writeFile(path.join(publicDir, "og-image.jpg"), ogImage);

  const manifest = {
    name: "Klinik Psikolog Asım Çetiner",
    short_name: "Asım Çetiner",
    description:
      "Kadıköy'de yüz yüze ve online psikolojik danışmanlık — Asım Çetiner.",
    start_url: "/",
    display: "standalone",
    background_color: BRAND_BG,
    theme_color: BRAND_PRIMARY,
    lang: "tr",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };

  await writeFile(
    path.join(publicDir, "site.webmanifest"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );

  console.log("Brand assets written to public/ and app/favicon.ico");
  console.log(`Logo source: ${logoPath} (${logoMeta.width}x${logoMeta.height})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
