export interface Servicio {
  slug: string;
  nombre: string;
  /** Rótulo corto para el carril lateral y el menú */
  corto: string;
  titulo: string;
  metaDescripcion: string;
  resumen: string;
  imagen: string;
  alt: string;
}

/**
 * Servicios con página propia, con URL en la raíz. La apertura urgente de
 * puertas se trata a fondo en la portada y no tiene página dedicada.
 */
export const servicios: Servicio[] = [
  {
    slug: 'cambio-cerradura',
    nombre: 'Cambio de cerradura',
    corto: 'Cerradura',
    titulo: 'Cambio de Cerradura Chamartín | Cerrajeros 24 Horas',
    metaDescripcion:
      '¿Necesitas un cambio de cerradura en Chamartín? Cerrajeros 24 horas, rápidos y económicos. Llegamos en 20 min. Llama al 919 933 193.',
    resumen:
      'Sustituimos cerraduras de sobreponer, embutidas multipunto y de puertas blindadas o acorazadas, con presupuesto por escrito antes de empezar.',
    imagen: '/cambio-cerradura-chamartin.webp',
    alt: 'Placa de una cerradura de seguridad antigua en una puerta de madera',
  },
  {
    slug: 'instalacion-cerraduras-cerrojos',
    nombre: 'Instalación de cerrojos de seguridad',
    corto: 'Cerrojos',
    titulo: 'Instalación Cerrojos de Seguridad Chamartín | 24 Horas',
    metaDescripcion:
      'Aumenta la protección de tu hogar con la instalación de cerrojos de seguridad en Chamartín. Técnicos expertos 24h. Llama al 919 933 193.',
    resumen:
      'Cerrojos mecánicos, electrónicos invisibles o con alarma, y modelos anti-bumping de FAC, Lince y SAG, adaptados al tipo de puerta.',
    imagen: '/cerrojos-chamartin.webp',
    alt: 'Cerrojo de seguridad Lince de sobreponer instalado en una puerta de madera',
  },
  {
    slug: 'reparacion-persianas-cierres-metalicos',
    nombre: 'Reparación de cierres metálicos y persianas',
    corto: 'Persianas',
    titulo: 'Reparación de Cierres Metálicos Chamartín | Persianas 24H',
    metaDescripcion:
      '¿Cierre atascado? Expertos en reparación de cierres metálicos en Chamartín. Llegamos en 20 min. Servicio 24h. Llama al 919 933 193.',
    resumen:
      'Muelles, lamas, guías, motores y mandos de persianas de comercio, garajes y naves, con servicio urgente si el local no abre o no cierra.',
    imagen: '/reparacion-persianas-comercio-chamartin.webp',
    alt: 'Técnico en una escalera reparando el cierre metálico enrollable de un comercio',
  },
];

export const servicioPorSlug = (slug: string) => {
  const s = servicios.find((x) => x.slug === slug);
  if (!s) throw new Error(`Servicio desconocido: ${slug}`);
  return s;
};
