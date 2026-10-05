/**
 * Acceso a la colección «casos» (spec §37). Mientras no haya ningún caso real
 * no se consulta: así el build no avisa en cada página de que está vacía.
 */
import { getCollection, type CollectionEntry } from 'astro:content';

const hayCasos = Object.keys(import.meta.glob('/src/content/casos/[!_]*.md')).length > 0;

export async function casosVerificados(
  filtro: (c: CollectionEntry<'casos'>) => boolean = () => true,
): Promise<CollectionEntry<'casos'>[]> {
  if (!hayCasos) return [];
  return getCollection('casos', (c) => c.data.verificado && filtro(c));
}
