#!/usr/bin/env node
/**
 * Imagen para compartir (Open Graph) de cada localidad: un recorte 1,91:1 de
 * su foto (que es vertical), centrado en la altura que diga `imageOgFoco` en
 * la ficha (0 = arriba, 1 = abajo; por defecto 0,5).
 *
 *   npm run og
 *
 * Escribe src/assets/localidades/og/<slug>.jpg. Sin ampliar: si la foto mide
 * menos de 1200 px de ancho, el recorte sale con su ancho real.
 * Hay que volver a ejecutarlo al cambiar una foto o su foco.
 */
import { mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import sharp from 'sharp';
import { parse } from 'yaml';

const FICHAS = 'src/content/localidades';
const DESTINO = 'src/assets/localidades/og';
mkdirSync(DESTINO, { recursive: true });

for (const archivo of readdirSync(FICHAS).filter((f) => f.endsWith('.md'))) {
  const slug = archivo.replace(/\.md$/, '');
  const fm = parse(readFileSync(join(FICHAS, archivo), 'utf8').split(/^---$/m)[1]);
  if (!fm.image) continue;

  const foto = resolve(dirname(join(FICHAS, archivo)), fm.image);
  const { width: W, height: H } = await sharp(foto).metadata();
  const ancho = Math.min(1200, W);
  const alto = Math.round((ancho * 630) / 1200);
  // Recorte en la escala original y después reducción
  const altoOrig = Math.round((alto * W) / ancho);
  const foco = typeof fm.imageOgFoco === 'number' ? fm.imageOgFoco : 0.5;
  const top = Math.max(0, Math.min(H - altoOrig, Math.round(foco * H - altoOrig / 2)));

  await sharp(foto)
    .extract({ left: 0, top, width: W, height: altoOrig })
    .resize(ancho, alto)
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(join(DESTINO, `${slug}.jpg`));
  console.log(`${slug}: ${ancho}×${alto} (foco ${foco})`);
}
