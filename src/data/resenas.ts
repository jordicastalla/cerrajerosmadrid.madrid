/**
 * Reseñas del perfil de Google (spec §18). Datos aportados por el cliente a
 * partir del perfil el 2026-10-05. Los textos son literales: no se editan,
 * no se traducen y se respetan sus erratas. Solo reseñas completas (las que el
 * perfil muestra truncadas no se usan, ni las dos con texto idéntico).
 *
 * Nunca se marcan con AggregateRating ni Review en schema.org.
 */

export interface Resena {
  autor: string;
  texto: string;
}

export const resenas = {
  fuente: 'Google',
  perfilUrl: 'https://maps.app.goo.gl/bqpm2kbzrnbY4dzp8',
  total: 40,
  media: 4.9 as number | null,
  /** Fecha de los datos del perfil; actualizar cuando cambien */
  datosAl: '2026-10-05',
  items: [
    {
      autor: 'Lidía Poveda',
      texto:
        'Buenos cerrajeros por la zona, dan presupuesto antes de hacer nada para que no haya sorpresas, actúan con honestidad, no como otros. He cambiado de casa y les he llamado para cambiar las cerraduras y llaves de la casa y el trastero. Buenos precios, trabajan rápido y como decía, sin sorpresas.',
    },
    {
      autor: 'Vicky Barcos',
      texto:
        'Mi experiencia con los cerrajeros de OpenServi ha sido la mejor. El cerrajero que vino a casa, un profesional y amable, llegó realmente rápido a mi casa, y de forma muy eficaz y profesional, arregló el problema en la cerradura sin causar daño alguno a la puerta.',
    },
    {
      autor: 'Miriam Fernandez',
      texto:
        'Servicio súper profesional y rápido cuando me han instalado una puerta acorazada. Los cerrajeros de Openservi fueron muy amables y la puerta quedó perfecta. Muy buen trabajo y buen precio. Relación calidad-precio muy buena. Les agradezco mucho y los recomiendo.',
    },
    {
      autor: 'Ramón Juárez Nieto',
      texto:
        'Recién entramos en nuestro nuevo piso de alquiler y llamé a estos cerrajeros para cambiar la cerradura, hablé con mi casero y me recomendó cambiar la cerradura. Todo fue muy bien, trabajo rápido y barato, y al ser los nuevos inquilinos ya estamos tranquilos y seguros con nueva cerradura. Para trabajos de este tipo yo los recomiendo.',
    },
    {
      autor: 'Olga Montalbo',
      texto:
        'Llamé a esta empresa de cerrajería 24 horas y me tuvieron que cambiar el bombín de la puerta, pero me la abrieron, llegaron rápido y pude dormir dentro de casa, porque perdí las llaves, la puerta estaba cerrada con todas las vueltas de cuando me fui y era de noche. Muchas gracias por vuestro trabajo que además fue económico.',
    },
    {
      autor: 'Marta Alonso',
      texto:
        'Llamé a los cerrajeros de Openservi para instalar en mi empresa cerraduras de alta seguridad. Todas cerraduras de seguridad electrónicas, manejan primeras marcas. Hacen un trabajo fino que te da tranquilidad tanto a tí como a los empleados a la hora de entrar y salir de a empresa cada dia. Un acierto llamar a Openservi',
    },
  ] satisfies Resena[],
};

/** «4,9» con coma decimal, como se escribe en español */
export const mediaTexto = resenas.media === null ? null : resenas.media.toLocaleString('es-ES', { minimumFractionDigits: 1 });
