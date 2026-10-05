/**
 * Configuración de analítica y consentimiento.
 *
 * El identificador vive aquí y no incrustado en el layout para que se pueda
 * cambiar de cuenta sin tocar el markup, y para que la política de cookies
 * pueda nombrar la cookie exacta que instala Google sin desincronizarse.
 */

export const analitica = {
  /** Identificador de medición de Google Analytics 4 */
  id: 'G-J4C5JTWFWQ',
  /** Dónde se guarda la decisión del visitante */
  clave: 'consentimiento-cookies',
  /** Cuánto vale la decisión antes de volver a preguntar */
  mesesVigencia: 12,
} as const;

/**
 * Cookies que instala Google Analytics 4. Se usan para pintar la tabla de la
 * política de cookies: si algún día se cambia de herramienta, se actualiza
 * aquí y la página lo refleja sola.
 */
export const cookiesAnaliticas = [
  {
    nombre: '_ga',
    titular: 'Google Ireland Ltd.',
    finalidad:
      'Distinguir un visitante de otro para poder contar cuántas personas distintas entran en la web.',
    duracion: '2 años',
  },
  {
    nombre: `_ga_${analitica.id.replace('G-', '')}`,
    titular: 'Google Ireland Ltd.',
    finalidad:
      'Mantener el estado de la sesión y saber si la visita es nueva o continúa una anterior.',
    duracion: '2 años',
  },
] as const;

/**
 * Cookies que puede instalar el mapa incrustado de Google Maps, y solo si el
 * visitante pulsa para abrirlo: hasta entonces el iframe ni siquiera existe.
 *
 * Google no publica una lista cerrada y puede variar según el país y si la
 * persona tiene sesión iniciada, así que se nombra la principal y la página
 * remite a la documentación de Google para el detalle completo.
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

/** Cookie propia, la única que se instala sin pedir permiso */
export const cookiesTecnicas = [
  {
    nombre: analitica.clave,
    titular: 'DBA Cerrajeros Chamartín',
    finalidad:
      'Recordar si ha aceptado o rechazado las cookies de analítica para no volver a preguntárselo en cada página. Sin ella el aviso reaparecería continuamente.',
    duracion: `${analitica.mesesVigencia} meses`,
  },
] as const;
