/**
 * Analítica y consentimiento (spec §41).
 *
 * El identificador vive aquí y no incrustado en el layout para poder cambiar
 * de cuenta sin tocar el markup, y para que la política de cookies nombre la
 * cookie exacta que instala Google sin desincronizarse.
 */
import { site } from './site';

export const analitica = {
  /** Identificador de medición de Google Analytics 4 (facilitado por el cliente, 2026-10-09) */
  id: 'G-T47VCPPF6E',
  /** Dónde guarda el navegador la decisión del visitante (localStorage) */
  clave: 'consentimiento-cookies',
  /** Cuánto vale la decisión antes de volver a preguntar */
  mesesVigencia: 12,
} as const;

/**
 * Cookies que instala Google Analytics 4, según la documentación de Google
 * («Uso de cookies de Google Analytics en sitios web»). Pintan la tabla de la
 * política de cookies: si se cambia de herramienta, se actualiza aquí.
 */
export const cookiesAnaliticas = [
  {
    nombre: '_ga',
    titular: 'Google Ireland Ltd.',
    finalidad: 'Distinguir un visitante de otro para poder contar cuántas personas distintas entran en la web.',
    duracion: '2 años',
  },
  {
    nombre: `_ga_${analitica.id.replace('G-', '')}`,
    titular: 'Google Ireland Ltd.',
    finalidad: 'Mantener el estado de la sesión y saber si la visita es nueva o continúa una anterior.',
    duracion: '2 años',
  },
] as const;

/**
 * Cookies que puede instalar el mapa de Google Maps, y solo si el visitante
 * pulsa para abrirlo: hasta entonces el iframe ni siquiera existe. Google no
 * publica una lista cerrada, así que se nombra la principal y la página remite
 * a su documentación.
 */
export const cookiesMapa = [
  {
    nombre: 'NID',
    titular: 'Google Ireland Ltd.',
    finalidad:
      'Recordar preferencias de visualización del mapa y aplicar medidas de seguridad y prevención de fraude en los servicios de Google.',
    duracion: '6 meses',
  },
] as const;

/** Lo único que se guarda sin pedir permiso: la propia decisión */
export const cookiesTecnicas = [
  {
    nombre: analitica.clave,
    titular: site.legal.titular,
    finalidad:
      'Recordar si ha aceptado o rechazado la analítica para no volver a preguntárselo en cada página. Se guarda en el almacenamiento local del navegador, no se envía a ningún servidor.',
    duracion: `${analitica.mesesVigencia} meses`,
  },
] as const;
