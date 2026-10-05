/**
 * Triaje «¿Qué te ha pasado?» (spec §39). Las situaciones salen de los temas
 * que más se repiten en las reseñas reales del perfil. Borrador editable: la
 * empresa revisa los textos antes de publicar.
 *
 * «Qué haremos» solo describe lo que la empresa hace de verdad. Sin tiempos
 * de llegada ni precios (spec §40, §42).
 */

export interface Situacion {
  id: string;
  titulo: string;
  detalle: string;
  ahora: string[];
  haremos: string[];
  aMano: string[];
  /** Enlace al servicio relacionado */
  servicio: { href: string; texto: string };
}

export const situaciones: Situacion[] = [
  {
    id: 'fuera-de-casa',
    titulo: 'Me he quedado fuera de casa',
    detalle: 'Llaves dentro o perdidas',
    ahora: [
      'No fuerces la puerta ni la cerradura: puedes dañarlas y complicar la apertura.',
      'Comprueba si alguien de confianza tiene una copia de la llave.',
      'Si la puerta se cerró de golpe sin echar la llave, dínoslo al llamar.',
    ],
    haremos: [
      'Revisar la puerta y la cerradura y explicarte cómo vamos a abrir.',
      'Darte el presupuesto, sin compromiso, antes de empezar.',
    ],
    aMano: [
      'La dirección exacta: portal, piso y puerta.',
      'Si la puerta es blindada o acorazada y si echaste la llave al salir.',
      'Algo que acredite tu relación con la vivienda.',
    ],
    servicio: { href: '/#apertura-de-puertas', texto: 'Apertura de puertas' },
  },
  {
    id: 'cerradura-falla',
    titulo: 'La cerradura falla, está bloqueada o se ha roto la llave',
    detalle: 'La llave no gira o se ha partido dentro',
    ahora: [
      'No sigas forzando la llave: si se parte dentro, el arreglo se complica.',
      'Si se ha roto, guarda el trozo que tengas.',
      'No intentes sacar el trozo con pegamento ni objetos punzantes.',
    ],
    haremos: [
      'Extraer la llave rota, si la hay, y revisar el mecanismo.',
      'Repararlo si se puede; si no, proponerte el cambio con presupuesto previo.',
    ],
    aMano: [
      'Desde cuándo falla la cerradura.',
      'Si es la puerta de casa, del portal, del trastero o de un local.',
    ],
    servicio: { href: '/servicios/cambio-de-cerraduras-madrid/', texto: 'Cambio de cerraduras en Madrid' },
  },
  {
    id: 'intento-de-robo',
    titulo: 'Han intentado forzar mi puerta',
    detalle: 'Intento de robo u ocupación',
    ahora: [
      'Si hay peligro, llama al 112.',
      'Si vas a presentar denuncia, hazlo antes de que se cambie nada.',
      'Haz fotos de los daños: te pueden servir para el seguro.',
    ],
    haremos: [
      'Revisar cómo han quedado la puerta y la cerradura.',
      'Proponerte cómo dejarla segura (cambio de cerradura o de bombín, cerrojo adicional), con presupuesto sin compromiso.',
    ],
    aMano: ['Las fotos de los daños.', 'Si la puerta todavía cierra o no.'],
    servicio: { href: '/servicios/cambio-de-cerraduras-madrid/', texto: 'Cambio de cerraduras en Madrid' },
  },
  {
    id: 'mudanza',
    titulo: 'Me mudo o ha cambiado el inquilino',
    detalle: 'Quiero cambiar la cerradura',
    ahora: [
      'Ten en cuenta que no sabes cuántas copias de la llave hay en circulación.',
      'Si vives de alquiler, coméntalo con la propiedad.',
    ],
    haremos: [
      'Cambiar el bombín o la cerradura completa, según la puerta.',
      'Entregarte las llaves nuevas al terminar.',
    ],
    aMano: [
      'El tipo de puerta: madera, blindada o acorazada.',
      'Si hay otras puertas con la misma llave (portal, trastero).',
    ],
    servicio: { href: '/servicios/cambio-de-cerraduras-madrid/', texto: 'Cambio de cerraduras en Madrid' },
  },
  {
    id: 'mas-seguridad',
    titulo: 'Quiero más seguridad en mi casa o negocio',
    detalle: 'Cerrojo, bombín o cerradura de seguridad',
    ahora: ['No hay prisa: llama cuando te venga bien y lo vemos sin compromiso.'],
    haremos: [
      'Explicarte las opciones según tu puerta: cerrojo de seguridad, cambio de cerradura o bombín de seguridad.',
      'Darte el presupuesto, sin compromiso, antes de instalar nada.',
    ],
    aMano: ['El tipo de puerta y la cerradura que tiene ahora.', 'Si es una vivienda, un local o una oficina.'],
    servicio: { href: '/servicios/instalacion-de-cerrojos-madrid/', texto: 'Instalación de cerrojos de seguridad' },
  },
];
