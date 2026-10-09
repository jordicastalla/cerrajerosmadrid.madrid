/**
 * Datos del negocio. Todo lo que cambia con el cliente (nombre, teléfono,
 * dominio, datos legales) sale de aquí y se propaga a plantillas, schema.org,
 * metadatos y páginas legales. Nada de estos datos se inventa: los que faltan
 * están marcados como pendientes del cliente (spec v2, anexo C).
 */

export const site = {
  nombre: 'Cerrajeros Madrid OpenServi',
  marca: 'OpenServi',
  /** Sale de `site` en astro.config.mjs (única fuente del dominio) */
  dominio: import.meta.env.SITE as string,

  /** Teléfono comercial: el único CTA de la web (spec §15) */
  telefono: '912 918 462',
  telefonoLink: '+34912918462',

  horario: 'Servicio 24 horas, todos los días',

  /** Datos de la empresa para «Quiénes somos» (aportados por el cliente, 2026-10-06) */
  fundacion: 2017,

  /** Perfil de Google con las reseñas (spec §18) */
  perfilGoogle: 'https://maps.app.goo.gl/bqpm2kbzrnbY4dzp8',

  /** Mapa facilitado por el cliente (spec §17). Solo se carga si el usuario lo pide. */
  mapaEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d914875.9598179081!2d-3.81602975!3d40.525282000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42295d634f1d77%3A0x36f7862aa131e1bf!2sCerrajeros%20Madrid%20Openservi%20Baratos!5e1!3m2!1ses!2ses!4v1791193222054!5m2!1ses!2ses',

  /** Token de verificación de Search Console (spec §41, facilitado por el cliente el 2026-10-09) */
  verificacionGoogle: 'KoHZMPKsBuokaKQNLOzGdJotGitFqkbZlWG2xn1lAXQ' as string | null,

  /**
   * TODO-CLIENTE (spec §14): qué dirección se publica en schema.org.
   * Por defecto ninguna: el único domicilio conocido es el del aviso legal.
   */
  publicarDireccionEnSchema: false,

  /**
   * Garantía por escrito (spec anexo B). Política propuesta a petición del
   * cliente: en el parte o la factura de cada trabajo debe figurar la garantía.
   * Si la empresa no la aplica, poner activa: false y desaparece de la web.
   */
  garantia: {
    activa: true,
    meses: null as number | null,
  },

  imagenOg: '/og/cerrajeros-madrid-openservi.jpg',
  logo: '/icon-512.png',

  /**
   * Identidad del responsable (spec §16, datos del cliente a 2026-10-06).
   * Solo para las páginas legales y el pie.
   */
  legal: {
    titular: 'CerrajerosMadrid.Madrid',
    /** TODO-CLIENTE: NIF del titular. Si se añade, aparece en el aviso legal, la privacidad y el pie. */
    nif: null as string | null,
    domicilio: 'Calle Benito Gutiérrez 17, 28008 Madrid',
    calle: 'Calle Benito Gutiérrez 17',
    cp: '28008',
    ciudad: 'Madrid',
    provincia: 'Madrid',
    email: 'info@cerrajerosmadrid.madrid',
    telefono: '912 918 462',
    web: 'www.cerrajerosmadrid.madrid',
  },
} as const;

export const telHref = `tel:${site.telefonoLink}`;

/** URL absoluta a partir de una ruta del sitio */
export const absoluta = (ruta: string) => new URL(ruta, site.dominio).toString();
