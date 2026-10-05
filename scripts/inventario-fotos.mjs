#!/usr/bin/env node
/**
 * Fase 0 de la muestra mínima (spec §34): inventario de fotos reales.
 *
 *   npm run inventario -- [carpeta]     (por defecto: fotos/)
 *
 * Cuenta las fotos por localidad a partir del nombre de archivo
 * (localidad_tipo_aaaa-mm.jpg) o de la subcarpeta, y genera inventario.md
 * con la plantilla de casos.csv para que la empresa la complete.
 */
import { readdirSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative, sep, extname } from 'node:path';

const carpeta = process.argv[2] ?? 'fotos';
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.heic']);
const localidades = readdirSync('src/content/localidades')
  .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
  .map((f) => f.replace(/\.md$/, ''));

if (!existsSync(carpeta)) {
  console.error(`No existe la carpeta «${carpeta}». Deja las fotos ahí (o pásala como argumento).`);
  process.exit(1);
}

function recorrer(dir, salida = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) recorrer(p, salida);
    else if (EXT.has(extname(f).toLowerCase())) salida.push(p);
  }
  return salida;
}

const fotos = recorrer(carpeta);
const cuenta = new Map(localidades.map((l) => [l, []]));
const sinAsignar = [];

for (const f of fotos) {
  const rel = relative(carpeta, f).split(sep).join('/').toLowerCase();
  const loc = localidades.find((l) => rel.startsWith(`${l}/`) || rel.split('/').pop().startsWith(`${l}_`));
  if (loc) cuenta.get(loc).push(rel);
  else sinAsignar.push(rel);
}

const filas = [...cuenta].sort((a, b) => b[1].length - a[1].length);
const md = [
  '# Inventario de fotos reales',
  '',
  `Generado el ${new Date().toISOString().slice(0, 10)} a partir de \`${carpeta}/\` (${fotos.length} fotos).`,
  '',
  '| Localidad | Fotos |',
  '|---|---|',
  ...filas.map(([l, f]) => `| ${l} | ${f.length} |`),
  '',
  `Sin localidad reconocible: ${sinAsignar.length}`,
  ...sinAsignar.map((f) => `- ${f}`),
  '',
  '## Plantilla casos.csv (la completa la empresa; fila incompleta = no hay caso)',
  '',
  '```csv',
  'archivo,localidad,tipo,barrio,que_se_hizo,fecha',
  ...filas.flatMap(([l, fs]) => fs.map((f) => `${f},${l},,,,`)),
  '```',
  '',
  'tipo: apertura | cambio-cerradura | cerrojo | bombin | alta-seguridad | otro',
  '',
].join('\n');

writeFileSync('inventario.md', md);
console.log(`inventario.md generado: ${fotos.length} fotos, ${sinAsignar.length} sin localidad.`);
console.log('Lote 1 sugerido (más material):', filas.slice(0, 4).map(([l, f]) => `${l} (${f.length})`).join(', '));
