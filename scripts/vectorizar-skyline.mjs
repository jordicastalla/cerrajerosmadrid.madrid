#!/usr/bin/env node
/**
 * Pasa a SVG la ilustración del perfil de Madrid (marca/skyline-original.webp)
 * que se usa de fondo en la portada y en el pie.
 *
 *   npm run skyline        (necesita potrace: apt install potrace / brew install potrace)
 *
 * La ilustración es de un solo tono (oro) con distintas intensidades. Se
 * reduce a 5 niveles de intensidad, se calca cada nivel con potrace y se
 * apilan las capas en oro con la opacidad de su nivel. Resultado: un SVG de
 * un solo color, sin fondo, que escala sin pixelarse.
 *
 * El SVG generado va al repositorio: el build no necesita potrace.
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';

const ORIGEN = 'marca/skyline-original.webp';
const DESTINO = 'src/assets/marca/skyline.svg';
const ORO = '#D4AF37';

/** Umbrales de intensidad (0–1): un nivel por umbral */
const NIVELES = [0.12, 0.3, 0.48, 0.64, 0.8];
/** Se calca al doble de tamaño: curvas más finas */
const ESCALA = 2;
const POTRACE = ['--svg', '--flat', '--turdsize', '10', '--alphamax', '1.0', '--opttolerance', '0.8', '--unit', '1'];

try {
  execFileSync('potrace', ['--version'], { stdio: 'ignore' });
} catch {
  console.error('Falta potrace. Instálalo con «apt install potrace» o «brew install potrace».');
  process.exit(1);
}

const { data, info } = await sharp(ORIGEN).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;

// Intensidad visible sobre fondo oscuro: opacidad × luminancia (el oro medio ronda 0,75)
const intensidad = Buffer.alloc(W * H);
for (let i = 0; i < W * H; i++) {
  const [r, g, b, a] = [data[i * 4], data[i * 4 + 1], data[i * 4 + 2], data[i * 4 + 3]];
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  intensidad[i] = Math.round(Math.min(1, ((a / 255) * lum) / 0.75) * 255);
}

const w = W * ESCALA;
const h = H * ESCALA;
const { data: gris, info: infoGris } = await sharp(intensidad, { raw: { width: W, height: H, channels: 1 } })
  .resize(w, h, { kernel: 'lanczos3' })
  .blur(0.8)
  .extractChannel(0)
  .raw()
  .toBuffer({ resolveWithObject: true });
if (infoGris.channels !== 1 || infoGris.width !== w) throw new Error('Imagen intermedia inesperada');

const tmp = mkdtempSync(join(tmpdir(), 'skyline-'));
const capas = [];

try {
  for (const [k, umbral] of NIVELES.entries()) {
    // PBM binario (P4): 1 = tinta
    const fila = Math.ceil(w / 8);
    const bits = Buffer.alloc(fila * h);
    const corte = umbral * 255;
    for (let y = 0; y < h; y++)
      for (let x = 0; x < w; x++) if (gris[y * w + x] >= corte) bits[y * fila + (x >> 3)] |= 0x80 >> (x & 7);

    const pbm = join(tmp, `nivel-${k}.pbm`);
    writeFileSync(pbm, Buffer.concat([Buffer.from(`P4\n${w} ${h}\n`), bits]));
    const svg = execFileSync('potrace', [pbm, ...POTRACE, '--output', '-']).toString();

    const transform = svg.match(/<g transform="([^"]+)"/)[1].replace(/(\d)\.0+\b/g, '$1');
    const d = [...svg.matchAll(/<path d="([^"]+)"/g)].map((m) => m[1].replace(/\s+/g, ' ').trim()).join(' ');
    capas.push({ transform, d });
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

// Opacidad de cada capa para que, apiladas, cada nivel tenga la intensidad media de su tramo
let cubierto = 0;
const opacidades = NIVELES.map((t, k) => {
  const objetivo = Math.min(1, (t + (NIVELES[k + 1] ?? 1)) / 2);
  const o = (objetivo - cubierto) / (1 - cubierto);
  cubierto = objetivo;
  return o;
});

const cuerpo = capas
  .map((c, k) => `<path transform="scale(${1 / ESCALA}) ${c.transform}" fill-opacity="${opacidades[k].toFixed(3)}" d="${c.d}"/>`)
  .join('\n');

writeFileSync(
  DESTINO,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" fill="${ORO}" aria-hidden="true">\n${cuerpo}\n</svg>\n`,
);

const kb = (readFileSync(DESTINO).length / 1024).toFixed(0);
console.log(`Skyline vectorizado: ${DESTINO} (${W}×${H}, ${NIVELES.length} niveles, ${kb} KB).`);
