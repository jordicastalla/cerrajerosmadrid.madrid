/**
 * JSON-LD (spec §14). Una sola entidad de negocio con @id estable; el resto
 * de páginas la referencian. Sin AggregateRating ni Review (spec §18) y sin
 * FAQPage (no aporta resultados visibles).
 */
import { site, absoluta } from '@data/site';

export const ID_NEGOCIO = absoluta('/#business');

type Zona = { '@type': 'City' | 'AdministrativeArea'; name: string };

/** Entidad completa del negocio: solo en la Home */
export function negocio(zonasReady: string[]) {
  const areaServed: Zona[] = [
    { '@type': 'AdministrativeArea', name: 'Madrid' },
    ...zonasReady.map((name) => ({ '@type': 'City' as const, name })),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'Locksmith',
    '@id': ID_NEGOCIO,
    name: site.nombre,
    url: absoluta('/'),
    telephone: site.telefonoLink,
    image: [absoluta(site.imagenOg)],
    logo: absoluta(site.logo),
    sameAs: [site.perfilGoogle],
    areaServed,
    knowsLanguage: ['es'],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    // address y geo: decisión pendiente (TODO-CLIENTE, spec §14). No se inventan.
    ...(site.publicarDireccionEnSchema
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: site.legal.calle,
            postalCode: site.legal.cp,
            addressLocality: site.legal.ciudad,
            addressRegion: site.legal.provincia,
            addressCountry: 'ES',
          },
        }
      : {}),
  };
}

export function servicio(opts: { nombre: string; descripcion: string; ruta: string; area?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': absoluta(`${opts.ruta}#servicio`),
    serviceType: opts.nombre,
    name: opts.nombre,
    description: opts.descripcion,
    url: absoluta(opts.ruta),
    provider: { '@id': ID_NEGOCIO },
    areaServed: opts.area
      ? { '@type': 'City', name: opts.area }
      : { '@type': 'AdministrativeArea', name: 'Madrid' },
  };
}

export interface Miga {
  nombre: string;
  ruta: string;
}

export function migas(items: Miga[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.nombre,
      item: absoluta(item.ruta),
    })),
  };
}
