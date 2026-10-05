#!/usr/bin/env node
/**
 * Genera favicons, iconos del manifest e imagen Open Graph a partir del
 * emblema provisional (llave alada). Cuando llegue el logotipo definitivo,
 * se sustituye el SVG de aquí o se exportan los PNG desde el original.
 *
 *   npm run iconos
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import sharp from 'sharp';

import { geometriaEmblema } from '../src/components/marca/emblema-geometria.mjs';

// Misma geometría que src/components/marca/Emblema.astro
const g = geometriaEmblema();

const emblema = (id = 'o') => `
  <defs><linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="240" y2="240">
    <stop offset="0" stop-color="#F59E0B"/><stop offset="0.5" stop-color="#D4AF37"/><stop offset="1" stop-color="#F59E0B"/>
  </linearGradient></defs>
  <g transform="${g.encuadre}">
    <g fill="url(#${id})" stroke="#030712" stroke-width="1.6" stroke-linejoin="round">
      ${g.plumas.map((d) => `<path d="${d}"/>`).join('')}<path d="${g.hombro}"/>
    </g>
    <g transform="${g.llave}" fill="none" stroke="url(#${id})" stroke-width="5.5" stroke-linecap="round">
      <circle cx="0" cy="-11" r="9.5"/><circle cx="-9.5" cy="5.5" r="9.5"/><circle cx="9.5" cy="5.5" r="9.5"/>
      <path d="M0 18v100" stroke-width="7"/><path d="M-7 24h14"/>
      <path d="M3 98h15v7H8v6h12v8H3" stroke-width="5" stroke-linejoin="round"/>
    </g>
  </g>`;

/** Icono cuadrado: emblema sobre obsidiana, con margen opcional (maskable) */
const icono = (margen = 0.1, redondeo = 0.18) => {
  const s = 240;
  const m = s * margen;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}">
  <rect width="${s}" height="${s}" rx="${s * redondeo}" fill="#030712"/>
  <circle cx="120" cy="120" r="110" fill="#D4AF37" opacity="0.08"/>
  <g transform="translate(${m} ${m}) scale(${(s - 2 * m) / s})">${emblema()}</g>
</svg>`;
};

mkdirSync('public/og', { recursive: true });

const svgFavicon = icono(0.04, 0.2);
writeFileSync('public/favicon.svg', svgFavicon);

const png = (svg, tam, destino) => sharp(Buffer.from(svg), { density: 384 }).resize(tam, tam).png().toFile(destino);

await png(svgFavicon, 32, 'public/favicon-32.png');
await png(icono(0.06, 0), 180, 'public/apple-touch-icon.png');
await png(icono(0.06, 0.18), 192, 'public/icon-192.png');
await png(icono(0.06, 0.18), 512, 'public/icon-512.png');
await png(icono(0.2, 0), 512, 'public/icon-maskable-512.png');

// favicon.ico (PNG embebido de 48 px: formato ICO con una sola imagen)
const ico48 = await sharp(Buffer.from(svgFavicon), { density: 384 }).resize(48, 48).png().toBuffer();
const cabecera = Buffer.alloc(22);
cabecera.writeUInt16LE(0, 0); // reservado
cabecera.writeUInt16LE(1, 2); // tipo: icono
cabecera.writeUInt16LE(1, 4); // nº de imágenes
cabecera.writeUInt8(48, 6); // ancho
cabecera.writeUInt8(48, 7); // alto
cabecera.writeUInt8(0, 8); // paleta
cabecera.writeUInt8(0, 9); // reservado
cabecera.writeUInt16LE(1, 10); // planos
cabecera.writeUInt16LE(32, 12); // bits por píxel
cabecera.writeUInt32LE(ico48.length, 14); // tamaño de los datos
cabecera.writeUInt32LE(22, 18); // desplazamiento
writeFileSync('public/favicon.ico', Buffer.concat([cabecera, ico48]));

// Imagen Open Graph 1200×630
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="brillo" cx="0.28" cy="0.5" r="0.55"><stop offset="0" stop-color="#D4AF37" stop-opacity="0.28"/><stop offset="1" stop-color="#D4AF37" stop-opacity="0"/></radialGradient>
    <linearGradient id="plata" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="0.5" stop-color="#E2E8F0"/><stop offset="1" stop-color="#94A3B8"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#030712"/>
  <rect width="1200" height="630" fill="url(#brillo)"/>
  <g transform="translate(70 95) scale(1.85)">${emblema('og')}</g>
  <text x="560" y="250" font-family="DejaVu Sans" font-size="30" letter-spacing="12" fill="#94A3B8">CERRAJEROS</text>
  <text x="556" y="345" font-family="DejaVu Sans" font-weight="bold" font-size="104" letter-spacing="6" fill="url(#plata)">MADRID</text>
  <text x="560" y="420" font-family="DejaVu Sans" font-weight="bold" font-style="italic" font-size="58"><tspan fill="#E2E8F0">Open</tspan><tspan fill="#D4AF37">Servi</tspan></text>
  <rect x="560" y="462" width="480" height="2" fill="#D4AF37" opacity="0.6"/>
  <text x="560" y="520" font-family="DejaVu Sans" font-weight="bold" font-size="40" fill="#FFFFFF">912 918 462 · 24 horas</text>
</svg>`;
await sharp(Buffer.from(og)).jpeg({ quality: 86, mozjpeg: true }).toFile('public/og/cerrajeros-madrid-openservi.jpg');

console.log('Iconos e imagen OG generados en public/.');
