#!/usr/bin/env node
/**
 * Genera favicons, iconos del manifest e imagen Open Graph a partir de los
 * logotipos definitivos del cliente (src/assets/marca/):
 *
 *   · emblema.webp       → favicon.ico, favicon-32.png, apple-touch-icon e iconos del manifest
 *   · logo-vertical.webp → imagen Open Graph (con el perfil de Madrid de fondo)
 *
 *   npm run iconos
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const MARCA = 'src/assets/marca';
const OBSIDIANA = '#030712';

mkdirSync('public/og', { recursive: true });

/** Emblema recortado a su contenido (el aro), en un cuadrado transparente */
const emblema = await sharp(`${MARCA}/emblema.webp`).trim({ threshold: 10 }).toBuffer();
const { width: ew, height: eh } = await sharp(emblema).metadata();
const lado = Math.max(ew, eh);
const emblemaCuadrado = await sharp(emblema)
  .extend({
    top: Math.floor((lado - eh) / 2),
    bottom: Math.ceil((lado - eh) / 2),
    left: Math.floor((lado - ew) / 2),
    right: Math.ceil((lado - ew) / 2),
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toBuffer();

const emblemaA = (tam) => sharp(emblemaCuadrado).resize(tam, tam, { kernel: 'lanczos3' }).sharpen({ sigma: 0.5 }).png().toBuffer();

/** Icono cuadrado: emblema sobre obsidiana, con margen (fracción del lado) y esquinas opcionales */
async function icono(tam, margen, redondeo = 0) {
  const r = tam * redondeo;
  const fondo = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${tam}" height="${tam}"><rect width="${tam}" height="${tam}" rx="${r}" fill="${OBSIDIANA}"/></svg>`,
  );
  const interior = Math.round(tam * (1 - 2 * margen));
  return sharp(fondo)
    .composite([{ input: await emblemaA(interior), gravity: 'centre' }])
    .png({ palette: true, quality: 90, effort: 10, compressionLevel: 9 })
    .toBuffer();
}

// Favicons: emblema sin fondo (se ve en pestañas claras y oscuras)
const favicon = { 16: await emblemaA(16), 32: await emblemaA(32), 48: await emblemaA(48) };
writeFileSync('public/favicon-32.png', favicon[32]);

// favicon.ico con PNG embebidos de 16, 32 y 48 px
const tamanos = [16, 32, 48];
const cabecera = Buffer.alloc(6 + 16 * tamanos.length);
cabecera.writeUInt16LE(0, 0); // reservado
cabecera.writeUInt16LE(1, 2); // tipo: icono
cabecera.writeUInt16LE(tamanos.length, 4); // nº de imágenes
let desplazamiento = cabecera.length;
tamanos.forEach((t, i) => {
  const o = 6 + 16 * i;
  cabecera.writeUInt8(t, o); // ancho
  cabecera.writeUInt8(t, o + 1); // alto
  cabecera.writeUInt8(0, o + 2); // paleta
  cabecera.writeUInt8(0, o + 3); // reservado
  cabecera.writeUInt16LE(1, o + 4); // planos
  cabecera.writeUInt16LE(32, o + 6); // bits por píxel
  cabecera.writeUInt32LE(favicon[t].length, o + 8); // tamaño de los datos
  cabecera.writeUInt32LE(desplazamiento, o + 12); // desplazamiento
  desplazamiento += favicon[t].length;
});
writeFileSync('public/favicon.ico', Buffer.concat([cabecera, ...tamanos.map((t) => favicon[t])]));

// Iconos de pantalla de inicio y del manifest: sobre obsidiana
writeFileSync('public/apple-touch-icon.png', await icono(180, 0.08));
writeFileSync('public/icon-192.png', await icono(192, 0.08, 0.18));
writeFileSync('public/icon-512.png', await icono(512, 0.08, 0.18));
// Maskable: el contenido dentro de la zona segura (círculo del 80 %)
writeFileSync('public/icon-maskable-512.png', await icono(512, 0.15));

// Imagen Open Graph 1200 × 630: logotipo vertical y teléfono, con el perfil de Madrid de fondo
const W = 1200;
const H = 630;
const fondo = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><radialGradient id="brillo" cx="0.27" cy="0.45" r="0.55"><stop offset="0" stop-color="#D4AF37" stop-opacity="0.22"/><stop offset="1" stop-color="#D4AF37" stop-opacity="0"/></radialGradient></defs>
  <rect width="${W}" height="${H}" fill="${OBSIDIANA}"/>
  <rect width="${W}" height="${H}" fill="url(#brillo)"/>
</svg>`);

// Perfil de Madrid a todo el ancho, al 32 % de opacidad
const skyline = await sharp(`${MARCA}/skyline.svg`, { density: 72 * (W / 1500) }).resize(W).png().toBuffer();
const opacidad = Buffer.from([255, 255, 255, Math.round(255 * 0.32)]);
const skylineTenue = await sharp(skyline)
  .composite([{ input: opacidad, raw: { width: 1, height: 1, channels: 4 }, tile: true, blend: 'dest-in' }])
  .png()
  .toBuffer();
const { height: sh } = await sharp(skylineTenue).metadata();

// Velo de arriba abajo: el perfil se funde hacia arriba, como en la web
const velo = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><linearGradient id="v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${OBSIDIANA}" stop-opacity="1"/><stop offset="0.5" stop-color="${OBSIDIANA}" stop-opacity="0.5"/><stop offset="1" stop-color="${OBSIDIANA}" stop-opacity="0"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#v)"/>
</svg>`);

const texto = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><linearGradient id="plata" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="0.5" stop-color="#E2E8F0"/><stop offset="1" stop-color="#94A3B8"/></linearGradient></defs>
  <text x="640" y="240" font-family="DejaVu Sans" font-weight="bold" font-size="40" fill="url(#plata)">Cerrajeros en Madrid</text>
  <text x="640" y="296" font-family="DejaVu Sans" font-weight="bold" font-size="40" fill="#D4AF37">24 horas</text>
  <rect x="640" y="336" width="440" height="2" fill="#D4AF37" opacity="0.6"/>
  <text x="640" y="410" font-family="DejaVu Sans" font-weight="bold" font-size="52" fill="#FFFFFF">912 918 462</text>
</svg>`);

const logo = await sharp(`${MARCA}/logo-vertical.webp`).resize(540, 540).png().toBuffer();

await sharp(fondo)
  .composite([
    { input: skylineTenue, top: H - sh, left: 0 },
    { input: velo, top: 0, left: 0 },
    { input: logo, top: 45, left: 70 },
    { input: texto, top: 0, left: 0 },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile('public/og/cerrajeros-madrid-openservi.jpg');

console.log('Iconos e imagen OG generados en public/.');
