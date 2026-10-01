/**
 * scripts/remove-logo-bg.mjs
 * Removes white background — writes to NEW filename to avoid file lock.
 */
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const brandDir = path.join(__dirname, '..', 'src', 'assets', 'img', 'brand');

const sources = [
  { in: 'logo-1-2400.webp', out: 'logo-transparent-2400.webp' },
  { in: 'logo-1-1200.webp', out: 'logo-transparent-1200.webp' },
];

async function removeWhiteBg(srcPath, destPath) {
  const { data, info } = await sharp(srcPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const pixels = new Uint8ClampedArray(data);
  const threshold = 235;
  const fuzz = 20;

  for (let i = 0; i < pixels.length; i += channels) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    if (r >= threshold && g >= threshold && b >= threshold) {
      const edgeDist = (Math.min(r, g, b) - (threshold - fuzz)) / fuzz;
      pixels[i + 3] = Math.max(0, Math.round((1 - Math.min(edgeDist, 1)) * 255));
    }
  }

  await sharp(Buffer.from(pixels), { raw: { width, height, channels } })
    .webp({ lossless: true })
    .toFile(destPath);

  const { size } = await sharp(destPath).metadata();
  console.log(`✓ ${path.basename(destPath)} (${Math.round((size || 0) / 1024)} KB)`);
}

for (const { in: inFile, out: outFile } of sources) {
  await removeWhiteBg(
    path.join(brandDir, inFile),
    path.join(brandDir, outFile)
  );
}

console.log('\nDone. Update header.njk and footer.njk to use logo-transparent-*.webp');
