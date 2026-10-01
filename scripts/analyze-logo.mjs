import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.join(__dirname, '..', 'src', 'assets', 'img', 'brand', 'logo-transparent-2400.webp');
const outDir = path.join(__dirname, '..', 'src', 'assets', 'img', 'brand');

async function analyze() {
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  
  const { width, height, channels } = info;
  const pixels = new Uint8ClampedArray(data);
  
  // Find row density (sum of alpha values per row)
  const rowDensities = new Array(height).fill(0);
  for (let y = 0; y < height; y++) {
    let alphaSum = 0;
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const alpha = pixels[idx + 3];
      alphaSum += alpha;
    }
    rowDensities[y] = alphaSum;
  }
  
  // Find column density
  const colDensities = new Array(width).fill(0);
  for (let x = 0; x < width; x++) {
    let alphaSum = 0;
    for (let y = 0; y < height; y++) {
      const idx = (y * width + x) * channels;
      const alpha = pixels[idx + 3];
      alphaSum += alpha;
    }
    colDensities[x] = alphaSum;
  }

  // Find bounding box
  let minX = width, maxX = 0, minY = height, maxY = 0;
  for (let x = 0; x < width; x++) {
    if (colDensities[x] > 0) { minX = Math.min(minX, x); maxX = Math.max(maxX, x); }
  }
  for (let y = 0; y < height; y++) {
    if (rowDensities[y] > 0) { minY = Math.min(minY, y); maxY = Math.max(maxY, y); }
  }
  
  console.log(`Bounding box: x: ${minX}-${maxX}, y: ${minY}-${maxY}`);
  console.log(`Content width: ${maxX - minX}, height: ${maxY - minY}`);
  
  // Check for gaps in the middle
  let bestRowGap = { y: 0, length: 0 };
  let currentGap = 0;
  for (let y = minY; y <= maxY; y++) {
    if (rowDensities[y] === 0 || rowDensities[y] < (width * 255 * 0.005)) { // Less than 0.5% filled is a gap
      currentGap++;
    } else {
      if (currentGap > bestRowGap.length && currentGap > 10 && y > minY + (maxY-minY)*0.2 && y < maxY - (maxY-minY)*0.2) {
        bestRowGap = { y: y - currentGap, length: currentGap };
      }
      currentGap = 0;
    }
  }

  let bestColGap = { x: 0, length: 0 };
  currentGap = 0;
  for (let x = minX; x <= maxX; x++) {
    if (colDensities[x] === 0 || colDensities[x] < (height * 255 * 0.005)) { // Less than 0.5% filled is a gap
      currentGap++;
    } else {
      if (currentGap > bestColGap.length && currentGap > 10 && x > minX + (maxX-minX)*0.2 && x < maxX - (maxX-minX)*0.2) {
        bestColGap = { x: x - currentGap, length: currentGap };
      }
      currentGap = 0;
    }
  }

  let iconMinX = width, iconMaxX = 0;
  for (let x = 0; x < width; x++) {
    let alphaSum = 0;
    for (let y = minY; y < bestRowGap.y; y++) {
      const idx = (y * width + x) * channels;
      alphaSum += pixels[idx + 3];
    }
    if (alphaSum > 0) {
      iconMinX = Math.min(iconMinX, x);
      iconMaxX = Math.max(iconMaxX, x);
    }
  }

  console.log(`Icon bounding box: x: ${iconMinX}-${iconMaxX}, y: ${minY}-${bestRowGap.y}`);
  console.log(`Icon width: ${iconMaxX - iconMinX}, height: ${bestRowGap.y - minY}`);
}

analyze().catch(console.error);
