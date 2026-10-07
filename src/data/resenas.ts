/**
 * Reseñas del perfil de Google (spec §18). Datos aportados por el cliente a
 * partir del perfil el 2026-10-07. Los textos son literales: no se editan,
 * no se traducen y se respetan sus erratas. Solo reseñas completas: las que el
 * perfil muestra truncadas («… Más») no se usan porque no tenemos el texto
 * entero, ni las dos con texto idéntico, ni la que no lleva texto.
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
  datosAl: '2026-10-07',
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
    {
      autor: 'Filo Lomas',
      texto:
        'Tenía la cerradura de la puerta de casa ya defectuosa y los llamé los llamé para reparar la cerradura. Arreglaron el mecanismo defectuoso de la puerta y la dejaron como nueva.',
    },
    {
      autor: 'Miguel Garrido Santillana',
      texto:
        'Reparación de cerradura de seguridad perfecta. 100% recomendables. Cerrajeros baratos de Madrid, para cualquier problema que tenga alguien con sus cerraduras, son muy eficientes y dejan las cerraduras como nuevas sin roturas y sin desperfectos en las puertas. Vamos un trabajo de 10. Los llamare siempre.',
    },
    {
      autor: 'Chari Rodriguez',
      texto:
        'Llamé a estos cerrajeros para urgencias de cerrajería de Madrid porque me encontraba en una urgencia y vinieron en seguida. Fueron muy rápidos y eficaces. Funcionan las 24 horas, te atienden de forma amable y respetuosa, te solucionan el problema y no te cobran caro. Más bien son cerrajeros baratos. Muy recomendables.',
    },
    {
      autor: 'Alonso Jimenez',
      texto:
        'Todo correcto, OpenServi son cerrajeros de Madrid y son baratos, no mienten en el nombre y además hacen muy buen trabajo de cerrajería, me instalaron una puerta antibumping que las llaman ahora a muy buen precio y con unos acabados perfectos. Y como digo bastante baratos, muy recomendables esta empresa de cerrajería.',
    },
    {
      autor: 'Mónica Molina',
      texto:
        'Muchas gracias OpenServi por vuestro trabajo tan profesional cuando os llamé la semana pasada, no sé qué habría hecho sin vosotros cuando perdí las llaves. Una atención rápida y de primera, súper profesionales.',
    },
    {
      autor: 'Pedro Caparros Martinez',
      texto:
        'Yenía que cambiar la cerradura de mi negocio por cambio de propietario, me recomendaron a los cerrajeros de Openservi Madrid, un precio muy económico y me han dado consejos sobre la que cerradura poner, de seguridad, antirrobos, etc..',
    },
    {
      autor: 'Sergio Fernandez',
      texto:
        'Cerrajeros muy profesionales, honestos y buenos trabajadores. Cambio de cerradura barato y bien hecho. Muchas gracias, los recomiendo.',
    },
    {
      autor: 'Sebastian Jara',
      texto: 'Rápidos y económicos, los mejores cerrajeros de Madrid sin duda. Atentos, comprometidos, rápidos y económicos.',
    },
    {
      autor: 'Beatriz L',
      texto: 'Servicio de cerrajería super profesional y rápido, además de económicos.',
    },
    {
      autor: 'Rafa',
      texto: 'Han sido muy rápidos y eficientes un servicio excelente!',
    },
  ] satisfies Resena[],
};

/** «4,9» con coma decimal, como se escribe en español */
export const mediaTexto = resenas.media === null ? null : resenas.media.toLocaleString('es-ES', { minimumFractionDigits: 1 });
