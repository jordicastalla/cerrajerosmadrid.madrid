/**
 * Puerta de indexación (spec §5). Decide si una localidad puede ser `ready`
 * (indexable, en el sitemap y enlazada) o se queda en `draft` (noindex, fuera
 * del sitemap y sin enlaces internos).
 *
 * Si una localidad está en `ready` y no cumple los mínimos, el build falla e
 * indica qué falta: no se promociona una página «para rellenar».
 */
import type { CollectionEntry } from 'astro:content';

/** Mínimos orientativos para `ready`; ajustables aquí */
export const MINIMOS = {
  casos: 1,
  faqs: 2,
  palabrasIntro: 100,
};

const contarPalabras = (texto = '') => texto.trim().split(/\s+/).filter(Boolean).length;

export function faltanParaReady(loc: CollectionEntry<'localidades'>, numCasos: number): string[] {
  const d = loc.data;
  const faltan: string[] = [];
  // El texto propio vive en el cuerpo del .md; si aún no lo hay, cae al campo intro (compatibilidad)
  const textoPropio = (loc.body?.trim() ? loc.body : d.intro) ?? '';
  const palabrasPropias = contarPalabras(textoPropio.replace(/[#>*_`[\]()!-]/g, ' '));
  if (!d.cerrajeroPropio) faltan.push('cerrajeroPropio: true (sin cerrajero propio no hay página)');
  if (numCasos < MINIMOS.casos) faltan.push(`≥ ${MINIMOS.casos} caso(s) real(es) verificado(s) en src/content/casos`);
  if (palabrasPropias < MINIMOS.palabrasIntro)
    faltan.push(`texto propio de ≥ ${MINIMOS.palabrasIntro} palabras en el cuerpo del .md (ahora ${palabrasPropias})`);
  // Solo cuentan las preguntas propias de la ficha: las generales son iguales en todas las zonas
  if (d.faqs.length < MINIMOS.faqs) faltan.push(`≥ ${MINIMOS.faqs} FAQs locales reales en la ficha (ahora ${d.faqs.length})`);
  if (!d.seoTitle.trim() || !d.seoDescription.trim()) faltan.push('seoTitle y seoDescription propios');
  return faltan;
}

/** Lanza un error de build si alguna localidad está en ready sin cumplir los mínimos */
export function comprobarPuerta(
  localidades: CollectionEntry<'localidades'>[],
  casosPorLocalidad: Map<string, number>,
) {
  const errores = localidades
    .filter((l) => l.data.status === 'ready')
    .map((l) => ({ id: l.id, faltan: faltanParaReady(l, casosPorLocalidad.get(l.id) ?? 0) }))
    .filter((r) => r.faltan.length > 0);

  if (errores.length) {
    const detalle = errores.map((e) => `  · ${e.id}: falta ${e.faltan.join('; ')}`).join('\n');
    throw new Error(
      `Puerta de indexación (spec §5): estas localidades están en "ready" sin cumplir los mínimos.\n${detalle}\nDéjalas en "draft" o completa su ficha.`,
    );
  }
}

export const esIndexable = (status: 'draft' | 'ready') => status === 'ready';
