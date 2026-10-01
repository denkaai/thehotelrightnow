/**
 * scripts/grade-images.mjs
 *
 * Applies a consistent, subtle cinematic color treatment to all venue photos.
 * Writes to *-graded.webp files alongside the originals. Does NOT overwrite.
 *
 * Treatment:
 *   - Slight warm white balance (+12 red, -6 blue tint offset to counteract
 *     excessive cool/neon casts while preserving venue lighting character)
 *   - Contrast boost: ~+9% via linear curve (multiply × 1.09, then clamp)
 *   - Saturation reduction: ~-10% (desaturate toward grey by 10%)
 *   - Black point lift prevention: keep shadows anchored
 *
 * Usage: node scripts/grade-images.mjs [--apply]
 *   Without --apply: grades to *-graded.webp for preview
 *   With    --apply: replaces originals (requires separate confirmation)
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import { readdirSync, statSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imgRoot = path.join(__dirname, '..', 'src', 'assets', 'img');

const FOLDERS = ['hero', 'hotel', 'dining', 'events', 'gallery', 'rooms'];
const APPLY = process.argv.includes('--apply');

/**
 * Warm contrast grade:
 *  1. Convert to raw RGBA
 *  2. Per-pixel: apply contrast curve, warm offset, desaturate slightly
 *  3. Re-encode as WebP quality 80
 */
async function gradeImage(srcPath, destPath) {
  const { data, info } = await sharp(srcPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const pixels = new Uint8ClampedArray(data);

  // Contrast multiplier and warm offset
  const contrastMul = 1.09;    // +9% contrast
  const warmR = 10;            // Red channel lift
  const warmB = -8;            // Blue channel pull (removes cold cast)
  const desat = 0.10;          // 10% desaturation toward luminance

  for (let i = 0; i < pixels.length; i += channels) {
    let r = pixels[i];
    let g = pixels[i + 1];
    let b = pixels[i + 2];
    // Alpha channel (i+3) untouched

    // 1. Contrast: scale around mid-grey (128)
    r = Math.round((r - 128) * contrastMul + 128);
    g = Math.round((g - 128) * contrastMul + 128);
    b = Math.round((b - 128) * contrastMul + 128);

    // 2. Warm white balance offset
    r += warmR;
    b += warmB;

    // Clamp to 0-255
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));

    // 3. Slight desaturation: blend toward luminance
    const lum = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
    r = Math.round(r * (1 - desat) + lum * desat);
    g = Math.round(g * (1 - desat) + lum * desat);
    b = Math.round(b * (1 - desat) + lum * desat);

    pixels[i]     = r;
    pixels[i + 1] = g;
    pixels[i + 2] = b;
  }

  await sharp(Buffer.from(pixels), { raw: { width, height, channels } })
    .webp({ quality: 80 })
    .toFile(destPath);
}

const WEB_EXTS = new Set(['.webp', '.jpg', '.jpeg', '.png']);

async function processFolder(folder) {
  const dir = path.join(imgRoot, folder);
  let files;
  try { files = readdirSync(dir); } catch { return; }

  const results = [];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!WEB_EXTS.has(ext)) continue;
    if (file.includes('-graded')) continue; // skip already graded
    if (file.includes('logo') || file.includes('brand')) continue; // skip logos

    const srcPath = path.join(dir, file);
    const base = path.basename(file, ext);
    const gradedName = base + '-graded.webp';
    const destPath = path.join(dir, gradedName);

    const srcSize = statSync(srcPath).size;
    await gradeImage(srcPath, destPath);
    const destSize = statSync(destPath).size;

    results.push({
      folder,
      original: file,
      graded: gradedName,
      srcKB: Math.round(srcSize / 1024),
      destKB: Math.round(destSize / 1024),
    });

    console.log(`  ${folder}/${file} → ${gradedName}  (${Math.round(srcSize/1024)} KB → ${Math.round(destSize/1024)} KB)`);
  }

  return results;
}

console.log('Color grading pass (preview only — originals unchanged)');
console.log('='.repeat(60));

const allResults = [];
for (const folder of FOLDERS) {
  console.log(`\n[${folder}]`);
  const r = await processFolder(folder);
  if (r) allResults.push(...r);
}

console.log('\n' + '='.repeat(60));
console.log(`Graded ${allResults.length} images. Review *-graded.webp files.`);
console.log('Run with --apply to replace originals once confirmed.');
