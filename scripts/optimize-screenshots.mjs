// scripts/optimize-screenshots.mjs
// Run: node scripts/optimize-screenshots.mjs
// Requires: node_modules/sharp (already present as Next.js dep at 0.34.5)
import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const THEMES = ['light', 'dark'];
const SOURCE_DIR = 'screenshots-source';
const OUT_DIR = 'public/screenshots';
const WEBP_QUALITY = 85;
// iPhone 15 logical width = 393px; use 390 for clean numbers
const TARGET_1X_WIDTH = 390;

if (!existsSync(SOURCE_DIR)) {
  console.error(
    `[optimize-screenshots] Source directory "${SOURCE_DIR}/" not found.\n` +
      `Create it at the project root and add your PNG screenshots:\n` +
      `  ${SOURCE_DIR}/light/   — light-mode screenshots\n` +
      `  ${SOURCE_DIR}/dark/    — dark-mode screenshots`,
  );
  process.exit(1);
}

for (const theme of THEMES) {
  const sourceDir = path.join(SOURCE_DIR, theme);
  const outDir = path.join(OUT_DIR, theme);

  if (!existsSync(sourceDir)) {
    console.warn(`[${theme}] Source directory "${sourceDir}" not found — skipping.`);
    continue;
  }

  await mkdir(outDir, { recursive: true });

  const files = (await readdir(sourceDir)).filter((f) => f.endsWith('.png'));

  if (files.length === 0) {
    console.log(`[${theme}] No PNG files found in "${sourceDir}" — skipping.`);
    continue;
  }

  for (const file of files) {
    const slug = path.basename(file, '.png');
    const src = path.join(sourceDir, file);

    // 1x
    await sharp(src)
      .resize({ width: TARGET_1X_WIDTH })
      .webp({ quality: WEBP_QUALITY })
      .toFile(path.join(outDir, `${slug}.webp`));

    // 2x
    await sharp(src)
      .resize({ width: TARGET_1X_WIDTH * 2 })
      .webp({ quality: WEBP_QUALITY })
      .toFile(path.join(outDir, `${slug}@2x.webp`));

    console.log(`[${theme}] ${slug}: 1x + 2x WebP written`);
  }
}
