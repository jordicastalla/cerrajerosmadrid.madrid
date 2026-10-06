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
  palabrasIntro: 100,
};

const contarPalabras = (texto = '') => texto.trim().split(/\s+/).filter(Boolean).length;

export function faltanParaReady(loc: CollectionEntry<'localidades'>, numCasos: number): string[] {
  const d = loc.data;
  const faltan: string[] = [];
  if (!d.cerrajeroPropio) faltan.push('cerrajeroPropio: true (sin cerrajero propio no hay página)');
  if (numCasos < MINIMOS.casos) faltan.push(`≥ ${MINIMOS.casos} caso(s) real(es) verificado(s) en src/content/casos`);
  if (contarPalabras(d.intro) < MINIMOS.palabrasIntro)
    faltan.push(`intro propia de ≥ ${MINIMOS.palabrasIntro} palabras (ahora ${contarPalabras(d.intro)})`);
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
