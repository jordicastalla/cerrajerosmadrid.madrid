/**
 * Trocea el cuerpo de una ficha de localidad según el esquema del cliente
 * (2026-10-08), para que cada parte vaya a su sitio en la página:
 *
 *   texto antes del primer «## »  → intro corta, bajo el H1
 *   1.ª sección «## »             → intro larga, tras el hero
 *   2.ª sección                   → 24 horas / urgencias, tras «Servicios»
 *   3.ª sección                   → precios y calidad, tras «Lo que tienes al llamarnos»
 *   4.ª sección                   → llámanos / confianza, tras «¿Te has quedado fuera en…?»
 *
 * El texto no se toca: solo se reparte (se respetan las erratas del cliente).
 */

export interface SeccionZona {
  titulo: string;
  parrafos: string[];
}

export interface CuerpoZona {
  introCorta: string[];
  introLarga: SeccionZona;
  urgencias: SeccionZona;
  precios: SeccionZona;
  llamanos: SeccionZona;
}

const parrafos = (texto: string) =>
  texto
    .trim()
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s*\n\s*/g, ' ').trim())
    .filter(Boolean);

export function trocearCuerpo(id: string, cuerpo = ''): CuerpoZona | null {
  if (!cuerpo.trim()) return null;

  const [antes = '', ...bloques] = cuerpo.split(/^## +/m);
  const secciones = bloques.map((bloque) => {
    const salto = bloque.indexOf('\n');
    return {
      titulo: (salto === -1 ? bloque : bloque.slice(0, salto)).trim(),
      parrafos: salto === -1 ? [] : parrafos(bloque.slice(salto)),
    };
  });

  if (secciones.length !== 4)
    throw new Error(
      `Ficha de localidad «${id}»: el cuerpo debe tener 4 secciones «## » (intro larga, 24 horas, precios y llámanos), en ese orden; tiene ${secciones.length}.`,
    );

  const [introLarga, urgencias, precios, llamanos] = secciones;
  return { introCorta: parrafos(antes), introLarga, urgencias, precios, llamanos };
}
