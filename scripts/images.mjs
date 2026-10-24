// Optimiza fotos: node scripts/images.mjs
//  1. Las fotos nuevas que dejes en img-src/ se reducen (máx. 1100 px), se guardan como
//     JPG progresivo q78 y WebP en public/img/ (el nombre se conserva).
//  2. Cualquier public/img/*.jpg sin .webp (p. ej. las ya optimizadas) recibe su WebP,
//     sin recomprimir el JPG para no perder calidad.
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import sharp from 'sharp';

const SRC = 'img-src';
const OUT = 'public/img';
const MAX = 1100;
mkdirSync(OUT, { recursive: true });

if (existsSync(SRC)) {
  for (const f of readdirSync(SRC).filter((f) => /\.(jpe?g|png|webp|heic|tiff?)$/i.test(f))) {
    const name = basename(f, extname(f));
    const img = () =>
      sharp(join(SRC, f))
        .rotate()
        .resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true });
    await img()
      .jpeg({ quality: 78, progressive: true })
      .toFile(join(OUT, `${name}.jpg`));
    await img()
      .webp({ quality: 78 })
      .toFile(join(OUT, `${name}.webp`));
    console.log('optimizada', name);
  }
}

for (const f of readdirSync(OUT).filter((f) => /\.jpg$/i.test(f))) {
  const webp = join(OUT, basename(f, extname(f)) + '.webp');
  if (existsSync(webp)) continue;
  await sharp(join(OUT, f)).webp({ quality: 78 }).toFile(webp);
  console.log('webp', webp);
}
