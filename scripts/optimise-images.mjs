import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const baseSrcDir = path.resolve('src/assets/img');
const baseOrigDir = path.resolve('_originals');

const folders = ['hero', 'hotel', 'dining', 'events', 'gallery', 'rooms', 'brand'];

for (const folder of folders) {
  const targetDir = path.join(baseSrcDir, folder);
  const originalsDir = path.join(baseOrigDir, folder);

  if (!fs.existsSync(targetDir)) {
    continue; // Folder doesn't exist, skip silently
  }

  if (!fs.existsSync(originalsDir)) {
    fs.mkdirSync(originalsDir, { recursive: true });
  }

  // Move original images (PNG, JPG, JPEG) to _originals
  const targetFiles = fs.readdirSync(targetDir);
  for (const file of targetFiles) {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      const srcPath = path.join(targetDir, file);
      const destPath = path.join(originalsDir, file);
      fs.renameSync(srcPath, destPath);
      console.log(`Moved ${file} to _originals/${folder}/`);
    }
  }

  const originalFiles = fs.readdirSync(originalsDir).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return ext === '.png' || ext === '.jpg' || ext === '.jpeg';
  }).sort();

  if (originalFiles.length === 0) {
    continue;
  }

  console.log(`\nFound ${originalFiles.length} source images in _originals/${folder}/`);

  for (const file of originalFiles) {
    const baseName = path.parse(file).name;
    const inputPath = path.join(originalsDir, file);

    if (folder === 'hero') {
      // 1. Process 2400px wide version (target < 350 KB)
      let q2400 = 78;
      const out2400Name = `${baseName}-2400.webp`;
      const out2400Path = path.join(targetDir, out2400Name);

      let buffer2400;
      while (q2400 >= 20) {
        buffer2400 = await sharp(inputPath)
          .resize({ width: 2400, withoutEnlargement: true })
          .webp({ quality: q2400, effort: 6 })
          .toBuffer();
        const sizeKB = buffer2400.length / 1024;
        if (sizeKB <= 350 || q2400 <= 30) {
          break;
        }
        q2400 -= 3;
      }
      fs.writeFileSync(out2400Path, buffer2400);
      const metadata2400 = await sharp(buffer2400).metadata();
      console.log(`Created hero/${out2400Name} (${metadata2400.width}x${metadata2400.height}) - ${(buffer2400.length / 1024).toFixed(2)} KB (quality: ${q2400})`);

      // 2. Process 1200px wide version (target < 150 KB)
      let q1200 = 75;
      const out1200Name = `${baseName}-1200.webp`;
      const out1200Path = path.join(targetDir, out1200Name);

      let buffer1200;
      while (q1200 >= 20) {
        buffer1200 = await sharp(inputPath)
          .resize({ width: 1200, withoutEnlargement: true })
          .webp({ quality: q1200, effort: 6 })
          .toBuffer();
        const sizeKB = buffer1200.length / 1024;
        if (sizeKB <= 150 || q1200 <= 20) {
          break;
        }
        q1200 -= 3;
      }
      fs.writeFileSync(out1200Path, buffer1200);
      const metadata1200 = await sharp(buffer1200).metadata();
      console.log(`Created hero/${out1200Name} (${metadata1200.width}x${metadata1200.height}) - ${(buffer1200.length / 1024).toFixed(2)} KB (quality: ${q1200})`);
    } else {
      // Process 1600px wide version (target < 200 KB) for other folders
      let q1600 = 78;
      const out1600Name = `${baseName}.webp`;
      const out1600Path = path.join(targetDir, out1600Name);

      let buffer1600;
      while (q1600 >= 20) {
        buffer1600 = await sharp(inputPath)
          .resize({ width: 1600, withoutEnlargement: true })
          .webp({ quality: q1600, effort: 6 })
          .toBuffer();
        const sizeKB = buffer1600.length / 1024;
        if (sizeKB <= 200 || q1600 <= 30) {
          break;
        }
        q1600 -= 3;
      }
      fs.writeFileSync(out1600Path, buffer1600);
      const metadata1600 = await sharp(buffer1600).metadata();
      console.log(`Created ${folder}/${out1600Name} (${metadata1600.width}x${metadata1600.height}) - ${(buffer1600.length / 1024).toFixed(2)} KB (quality: ${q1600})`);
    }
  }
}
