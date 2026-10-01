import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.join(__dirname, '..', 'src', 'assets', 'img', 'brand', 'logo-transparent-2400.webp');
const outDir = path.join(__dirname, '..', 'src', 'assets', 'img', 'brand');

// Icon mark bounding box discovered by analyze-logo.mjs:
// x: 517-989, y: 105-599  (472 x 494 px) — the swirl mark above the wordmark text
const ICON_LEFT   = 517;
const ICON_TOP    = 105;
const ICON_WIDTH  = 472;
const ICON_HEIGHT = 494;
// Small breathing room padding
const PAD = 20;

const crop = {
  left:   Math.max(0, ICON_LEFT - PAD),
  top:    Math.max(0, ICON_TOP  - PAD),
  width:  ICON_WIDTH  + PAD * 2,
  height: ICON_HEIGHT + PAD * 2,
};

async function generateFavicons() {
  console.log('Cropping icon mark and generating favicons...');

  // Save a preview so we can visually confirm the crop
  await sharp(inputPath)
    .extract(crop)
    .png()
    .toFile(path.join(outDir, 'icon-mark-preview.png'));
  console.log('Saved icon-mark-preview.png');

  // 1. favicon-32x32.png  (transparent bg)
  await sharp(inputPath)
    .extract(crop)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(outDir, 'favicon-32x32.png'));
  console.log('Created favicon-32x32.png');

  // 2. favicon.ico  (browsers accept a 32px PNG with .ico extension)
  await sharp(inputPath)
    .extract(crop)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(outDir, 'favicon.ico'));
  console.log('Created favicon.ico');

  // 3. apple-touch-icon.png  (180x180, icon centred on charcoal bg)
  // --charcoal is rgb(28, 25, 23)
  const iconBuf = await sharp(inputPath)
    .extract(crop)
    .resize(140, 140, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp({
    create: { width: 180, height: 180, channels: 4, background: { r: 28, g: 25, b: 23, alpha: 1 } }
  })
    .composite([{ input: iconBuf, gravity: 'centre' }])
    .png()
    .toFile(path.join(outDir, 'apple-touch-icon.png'));
  console.log('Created apple-touch-icon.png');

  console.log('\nDone!');
}

generateFavicons().catch(console.error);
