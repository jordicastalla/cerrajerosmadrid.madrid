#!/usr/bin/env node
/**
 * Prepara el perfil de Madrid en línea dorada (marca/skyline-linea-original.webp,
 * ilustración del cliente, 2026-10-09) que va de marca de agua en la portada.
 *
 *   npm run skyline:linea
 *
 * El original es oro sobre negro puro. Para que funcione sobre cualquier fondo
 * oscuro, el negro pasa a transparente: el dibujo se queda con un único oro (el
 * tono medio del original) y todo el detalle va en la opacidad, que sale del
 * brillo de cada píxel. Un solo color comprime mucho mejor que el original y,
 * a la opacidad de marca de agua, no se distingue. Se recorta el margen negro
 * y se generan skyline-linea.avif y skyline-linea.webp, que usa la web.
 */
import { statSync } from 'node:fs';
import sharp from 'sharp';

const ORIGEN = 'marca/skyline-linea-original.webp';
const DESTINO = 'src/assets/marca/skyline-linea';
/** Lo que no llega a este brillo (0-255) se considera fondo */
const UMBRAL = 24;
const ANCHO_AVIF = 1600;
const ANCHO_WEBP = 1200;

const { data, info } = await sharp(ORIGEN).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;

// Caja del dibujo, con un pequeño margen
let y0 = H;
let y1 = 0;
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 3;
    if (Math.max(data[i], data[i + 1], data[i + 2]) > UMBRAL) {
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
  }
y0 = Math.max(0, y0 - 8);
y1 = Math.min(H - 1, y1 + 4);
const h = y1 - y0 + 1;

// Tono medio del dibujo (ponderado por brillo) y brillo máximo, para estirar la opacidad
let suma = [0, 0, 0];
let peso = 0;
let maximo = 0;
for (let y = y0; y <= y1; y++)
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 3;
    const a = Math.max(data[i], data[i + 1], data[i + 2]);
    if (a <= UMBRAL) continue;
    suma = suma.map((v, k) => v + data[i + k]);
    peso += a;
    maximo = Math.max(maximo, a);
  }
const oro = suma.map((v) => Math.min(255, Math.round((v / peso) * 255)));

const rgba = Buffer.alloc(W * h * 4);
for (let y = 0; y < h; y++)
  for (let x = 0; x < W; x++) {
    const i = ((y + y0) * W + x) * 3;
    const o = (y * W + x) * 4;
    rgba[o] = oro[0];
    rgba[o + 1] = oro[1];
    rgba[o + 2] = oro[2];
    const a = Math.max(data[i], data[i + 1], data[i + 2]);
    rgba[o + 3] = a <= UMBRAL / 2 ? 0 : Math.round((a * 255) / maximo);
  }

const base = sharp(rgba, { raw: { width: W, height: h, channels: 4 } });
await base.clone().resize(ANCHO_AVIF).avif({ quality: 45, effort: 9 }).toFile(`${DESTINO}.avif`);
await base.clone().resize(ANCHO_WEBP).webp({ quality: 80, alphaQuality: 60, effort: 6 }).toFile(`${DESTINO}.webp`);

console.log(`Recorte ${W}×${h} (filas ${y0}-${y1}), oro rgb(${oro.join(' ')}). Relación de aspecto para CSS: ${W} / ${h}`);
for (const ext of ['avif', 'webp']) {
  const m = await sharp(`${DESTINO}.${ext}`).metadata();
  console.log(`  ${DESTINO}.${ext}: ${m.width}×${m.height}, ${Math.round(statSync(`${DESTINO}.${ext}`).size / 1024)} KB`);
}
