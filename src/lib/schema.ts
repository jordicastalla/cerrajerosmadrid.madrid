import { empresa } from '@data/empresa';
import { servicios } from '@data/servicios';

const abs = (ruta: string) => new URL(ruta, empresa.dominio).toString();

/** Identificador único del negocio. Todas las páginas emiten la misma entidad. */
export const ID_NEGOCIO = abs('/#business');

/**
 * Negocio con área de servicio: no se atiende al público en un local
 * propio, así que la dirección postal es la sede social (Getafe) y el área
 * cubierta se declara aparte en areaServed.
 */
const direccionPostal = {
  '@type': 'PostalAddress',
  streetAddress: empresa.direccion.calle,
  postalCode: empresa.direccion.cp,
  addressLocality: empresa.direccion.ciudad,
  addressRegion: empresa.direccion.provincia,
  addressCountry: empresa.direccion.pais,
};

const zonas = [
  { '@type': 'AdministrativeArea', name: 'Chamartín, Madrid' },
  ...empresa.zonaServicio.barrios.map((b) => ({ '@type': 'Place', name: `${b}, Chamartín, Madrid` })),
];

export function negocioLocal() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Locksmith',
    '@id': ID_NEGOCIO,
    name: empresa.nombre,
    alternateName: [empresa.nombreLargo],
    description:
      'Cerrajería 24 horas en el distrito de Chamartín (Madrid): apertura de puertas, cambio de cerradura, instalación de cerrojos de seguridad y reparación de cierres metálicos de comercio.',
    url: empresa.dominio,
    telephone: empresa.telefonoLink,
    image: [abs(empresa.imagen)],
    logo: abs(empresa.logo),
    address: direccionPostal,
    sameAs: [empresa.fichaGoogle],
    hasMap: empresa.fichaGoogle,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: empresa.geo.lat,
      longitude: empresa.geo.lng,
    },
    knowsLanguage: ['es'],
    areaServed: zonas,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de cerrajería',
      itemListElement: servicios.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.nombre,
          description: s.resumen,
          url: abs(`/${s.slug}/`),
        },
      })),
    },
  };
}

export function servicioSchema(opts: { nombre: string; descripcion: string; ruta: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': abs(`${opts.ruta}#servicio`),
    serviceType: opts.nombre,
    name: opts.nombre,
    description: opts.descripcion,
    url: abs(opts.ruta),
    provider: { '@id': ID_NEGOCIO },
    areaServed: zonas,
  };
}

export function migas(items: { nombre: string; ruta: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.nombre,
      item: abs(item.ruta),
    })),
  };
}
