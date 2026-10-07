/**
 * Fotos de la Home (v2.5). Los archivos van en src/assets/home/ (ver _LEEME.md).
 * El texto alternativo describe lo que se ve en la foto (spec §8): sin él,
 * el build falla en cuanto se añade la foto.
 */
export const imagenesHome: Record<1 | 2, { alt: string }> = {
  1: { alt: 'Bombín de latón instalado en el escudo de una puerta de madera, visto de cerca.' },
  2: { alt: 'Canto de una puerta acorazada abierta, con los bulones de acero de su sistema de cierre.' },
};
