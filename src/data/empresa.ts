/**
 * Datos del negocio. Todo lo que cambia con el cliente (titular, teléfono,
 * dirección, horarios) sale de aquí y se propaga a plantillas, schema.org,
 * metadatos y páginas legales.
 */

export const empresa = {
  nombre: 'DBA Cerrajeros Chamartín',
  nombreLargo: 'DBA Cerrajeros Chamartín · Técnico de Alta Precisión',
  marca: 'DBA',
  dominio: 'https://cerrajeroschamartin.es',

  // Titular a efectos de LSSI y RGPD
  titular: 'JIREH CAPITAL PARTNERS SL',
  nif: 'B22969398',

  telefono: '919 933 193',
  telefonoLink: '+34919933193',
  /**
   * Único canal de contacto en toda la web, a propósito: no hay email ni
   * formularios en ninguna página. No hay WhatsApp. Solo llamada.
   */

  emailLegal: 'solucionabba@gmail.com',
  telefonoLegal: '675259819',

  direccion: {
    calle: 'Paseo de la Estación, 33',
    cp: '28904',
    ciudad: 'Getafe',
    provincia: 'Madrid',
    comunidad: 'Comunidad de Madrid',
    pais: 'ES',
  },

  zonaServicio: {
    barrio: 'Chamartín',
    distrito: 'Chamartín',
    ciudad: 'Madrid',
    /** Los seis barrios administrativos del distrito */
    barrios: ['El Viso', 'Prosperidad', 'Ciudad Jardín', 'Hispanoamérica', 'Nueva España', 'Castilla'],
  },

  geo: { lat: 40.4605, lng: -3.6882 },

  fichaGoogle: 'https://maps.app.goo.gl/ryHhj87qhMnyST596',
  enlaceMapa: 'https://maps.app.goo.gl/ryHhj87qhMnyST596',

  mapaEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3123.456!2d-3.6882!3d40.4605!2m3!1f0!2f0!3f0!3m2!1iDBA%20Cerrajeros%20Chamartin!4shttps://maps.app.goo.gl/ryHhj87qhMnyST596!5e0!3m2!1ses!2ses!4v1695816000000',

  horario: 'Guardia permanente las 24 horas, los 365 días del año',
  tiempoLlegada: 'unos 20 minutos',

  imagen: '/og/cerrajeros-chamartin.jpg',
  logo: '/logo-cerrajeros-chamartin.png',
} as const;

export const telHref = `tel:${empresa.telefonoLink}`;

export const direccionCorta = `${empresa.zonaServicio.barrio} · Madrid`;
