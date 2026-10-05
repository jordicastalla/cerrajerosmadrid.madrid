/**
 * Lee el frontmatter de las colecciones para la configuración del sitemap y
 * para la auditoría: qué rutas son noindex (spec §5) y la fecha real de
 * modificación de cada contenido (spec §13). Sin fecha fiable, sin lastmod.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import YAML from 'yaml';

/** Páginas que nunca se indexan */
export const SIEMPRE_NOINDEX = ['/aviso-legal/', '/politica-de-privacidad/', '/politica-de-cookies/', '/404/'];

const COLECCIONES = [
  ['localidades', '/cerrajeros/'],
  ['servicios', '/servicios/'],
];

export function frontmatter(ruta) {
  const texto = readFileSync(ruta, 'utf8');
  const m = texto.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? (YAML.parse(m[1]) ?? {}) : {};
}

export function leerEstadoContenido(raiz = process.cwd()) {
  const noIndexables = new Set(SIEMPRE_NOINDEX);
  const lastmod = new Map();

  for (const [coleccion, base] of COLECCIONES) {
    const dir = join(raiz, 'src/content', coleccion);
    if (!existsSync(dir)) continue;
    for (const fichero of readdirSync(dir).filter((f) => f.endsWith('.md') && !f.startsWith('_'))) {
      const fm = frontmatter(join(dir, fichero));
      const ruta = `${base}${fichero.replace(/\.md$/, '')}/`;
      const sinCerrajero = coleccion === 'localidades' && fm.cerrajeroPropio !== true;
      if (fm.status !== 'ready' || sinCerrajero) noIndexables.add(ruta);
      if (fm.updatedAt) lastmod.set(ruta, new Date(fm.updatedAt).toISOString());
    }
  }

  return { noIndexables, lastmod };
}
