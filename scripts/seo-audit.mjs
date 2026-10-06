#!/usr/bin/env node
/**
 * Auditoría tras el build (spec §43). Revisa el HTML de dist/ y el sitemap.
 *
 *   npm run audit           → errores de SEO técnico y de contenido
 *   npm run audit:strict    → además, falla si queda algún TODO-CLIENTE (producción)
 *
 * Sin dependencias: expresiones regulares sobre HTML generado por Astro.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = 'dist';
const STRICT = process.argv.includes('--strict');
const TEL_COMERCIAL = 'tel:+34912918462';
const PAGINAS_LEGALES = ['/aviso-legal/', '/politica-de-privacidad/', '/politica-de-cookies/'];

/** Expresiones prohibidas sin prueba (spec §42). Las reseñas literales se excluyen. */
const PROHIBIDAS = [
  [/los mejores/i, '«los mejores»'],
  [/\blíderes\b/i, '«líderes»'],
  [/técnicos certificados/i, '«técnicos certificados»'],
  [/llegamos en/i, '«llegamos en…» (tiempo de llegada)'],
  [/en \d+\s*(min|minutos)\b/i, 'tiempo de llegada en minutos'],
  [/garantía de \d+\s*meses/i, '«garantía de X meses»'],
  [/años de experiencia/i, '«años de experiencia»'],
];

const errores = [];
const avisos = [];
const error = (pagina, msg) => errores.push(`${pagina}: ${msg}`);

if (!existsSync(DIST)) {
  console.error('No existe dist/. Ejecuta antes: npm run build');
  process.exit(1);
}

// --- Recoger páginas -------------------------------------------------------
function recorrer(dir, salida = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) recorrer(p, salida);
    else if (f.endsWith('.html')) salida.push(p);
  }
  return salida;
}

const rutaDe = (fichero) => {
  const rel = relative(DIST, fichero).split(sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  return `/${rel}`;
};

/** Valor de un atributo; '' si va sin valor (`<img alt>` equivale a alt=""), null si no está */
const attr = (tag, nombre) => {
  const m = tag.match(new RegExp(`\\s${nombre}(?:\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+)))?(?=[\\s/>])`, 'i'));
  return m ? (m[2] ?? m[3] ?? m[4] ?? '') : null;
};
const decodificar = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const paginas = recorrer(DIST).map((f) => {
  const html = readFileSync(f, 'utf8');
  const ruta = rutaDe(f);
  const robots = (html.match(/<meta[^>]+name="robots"[^>]*>/i) ?? [''])[0];
  return {
    ruta,
    html,
    noindex: /noindex/i.test(attr(robots, 'content') ?? '') || ruta === '/404.html',
    titulo: decodificar((html.match(/<title>([\s\S]*?)<\/title>/i) ?? [, ''])[1].trim()),
    descripcion: decodificar(attr((html.match(/<meta[^>]+name="description"[^>]*>/i) ?? [''])[0], 'content') ?? ''),
    canonical: attr((html.match(/<link[^>]+rel="canonical"[^>]*>/i) ?? [''])[0], 'href'),
  };
});

const porRuta = new Map(paginas.map((p) => [p.ruta, p]));
const SITE = (paginas.find((p) => p.ruta === '/')?.canonical ?? '').replace(/\/$/, '');

const existe = (ruta) => porRuta.has(ruta) || existsSync(join(DIST, ruta));

// --- Comprobaciones por página --------------------------------------------
for (const p of paginas) {
  const { ruta, html } = p;
  if (ruta === '/404.html') continue;

  if (!p.titulo) error(ruta, 'falta <title>');
  if (!p.descripcion) error(ruta, 'falta meta description');

  const h1 = (html.match(/<h1[\s>]/gi) ?? []).length;
  if (h1 !== 1) error(ruta, `tiene ${h1} <h1> (debe tener 1)`);

  if (!p.noindex) {
    if (!p.canonical || !/^https:\/\//.test(p.canonical)) error(ruta, 'canonical ausente o no absoluto');
    else if (p.canonical !== `${SITE}${ruta}`) error(ruta, `canonical apunta a ${p.canonical}`);
  }

  // Imágenes sin alt
  for (const img of html.match(/<img\b[^>]*>/gi) ?? []) if (attr(img, 'alt') === null) error(ruta, `imagen sin alt: ${img.slice(0, 80)}…`);

  // Enlaces tel: siempre el comercial
  for (const a of html.match(/<a\b[^>]*href="tel:[^"]*"[^>]*>/gi) ?? []) {
    const href = attr(a, 'href');
    if (href !== TEL_COMERCIAL) error(ruta, `enlace tel: distinto del comercial (${href})`);
  }

  // JSON-LD válido y sin reseñas marcadas
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try {
      const json = JSON.stringify(JSON.parse(m[1]));
      if (/"@type":"(AggregateRating|Review)"/.test(json)) error(ruta, 'JSON-LD con AggregateRating/Review');
    } catch {
      error(ruta, 'JSON-LD no válido');
    }
  }

  // Texto visible (sin scripts, estilos ni reseñas literales)
  const visible = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<blockquote[\s\S]*?<\/blockquote>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');

  for (const [re, nombre] of PROHIBIDAS) if (re.test(visible)) error(ruta, `expresión prohibida sin prueba: ${nombre}`);
  for (const marca of ['lorem', 'TODO', 'XXX', '{{']) if (visible.includes(marca)) error(ruta, `marca de borrador en el HTML: ${marca}`);
  if (!PAGINAS_LEGALES.includes(ruta) && (/€/.test(visible) || /\beuros?\b/i.test(visible)))
    error(ruta, 'aparece un importe en euros (la web no publica precios)');

  // Enlaces internos rotos o hacia noindex
  for (const a of html.match(/<a\b[^>]*href="\/[^"]*"[^>]*>/gi) ?? []) {
    const href = attr(a, 'href');
    if (href.startsWith('//')) continue;
    const destino = href.split('#')[0].split('?')[0] || '/';
    if (/\.(xml|txt|webmanifest|ico|png|svg|jpg|webp|woff2)$/.test(destino)) continue;
    if (!existe(destino)) error(ruta, `enlace interno roto: ${href}`);
    else if (!p.noindex && porRuta.get(destino)?.noindex && !PAGINAS_LEGALES.includes(destino))
      error(ruta, `enlace desde página indexable hacia página noindex: ${href}`);
  }
}

// --- Duplicados entre páginas indexables -----------------------------------
const indexables = paginas.filter((p) => !p.noindex);
for (const campo of ['titulo', 'descripcion']) {
  const vistos = new Map();
  for (const p of indexables) {
    const v = p[campo];
    if (vistos.has(v)) error(p.ruta, `${campo} duplicado con ${vistos.get(v)}`);
    else vistos.set(v, p.ruta);
  }
}

// --- Sitemap ---------------------------------------------------------------
const sitemaps = readdirSync(DIST).filter((f) => /^sitemap-\d+\.xml$/.test(f));
if (!existsSync(join(DIST, 'sitemap-index.xml')) || sitemaps.length === 0) error('sitemap', 'no existe sitemap-index.xml');
for (const s of sitemaps) {
  const xml = readFileSync(join(DIST, s), 'utf8');
  if (/<changefreq>|<priority>/.test(xml)) error(s, 'contiene changefreq o priority');
  for (const [, url] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const ruta = url.replace(SITE, '') || '/';
    const p = porRuta.get(ruta);
    if (!p) error(s, `URL sin página: ${url}`);
    else if (p.noindex) error(s, `URL noindex en el sitemap: ${url}`);
  }
}

const robots = existsSync(join(DIST, 'robots.txt')) ? readFileSync(join(DIST, 'robots.txt'), 'utf8') : '';
if (!robots.includes(`${SITE}/sitemap-index.xml`)) error('robots.txt', 'no apunta al sitemap-index.xml del dominio');
if (/^Disallow:\s*\/\S/m.test(robots)) avisos.push('robots.txt bloquea rutas: comprueba que no sean páginas noindex (spec §5)');

// --- Modo estricto: TODO-CLIENTE sin resolver --------------------------------
if (STRICT) {
  const fuentes = ['src/data', 'astro.config.mjs'];
  for (const f of fuentes.flatMap((d) => (statSync(d).isDirectory() ? readdirSync(d).map((x) => join(d, x)) : [d]))) {
    readFileSync(f, 'utf8')
      .split('\n')
      .forEach((linea, i) => {
        if (linea.includes('TODO-CLIENTE')) error(`${f}:${i + 1}`, `pendiente: ${linea.trim().slice(0, 110)}`);
      });
  }
}

// --- Informe ---------------------------------------------------------------
const nIdx = indexables.length;
console.log(`Auditoría SEO · ${paginas.length} páginas (${nIdx} indexables, ${paginas.length - nIdx} noindex)${STRICT ? ' · modo estricto' : ''}`);
for (const a of avisos) console.log(`  aviso: ${a}`);
if (errores.length) {
  console.error(`\n${errores.length} error(es):`);
  for (const e of errores) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log('  ✓ Sin errores');
