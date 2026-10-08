/**
 * Textos comunes de las páginas de localidad (v2.3): ventajas, «Ten esto a
 * mano al llamar» y preguntas generales. Solo afirmaciones respaldadas por
 * datos de la empresa (spec §19, §27, §40, §42): cerrajero propio en la
 * zona, 24 horas, presupuesto antes de empezar, garantía si está activa.
 *
 * Lo propio de cada zona (intro, barrios, consejo, preguntas locales, casos)
 * sale de su ficha en src/content/localidades/: esto es solo el armazón común.
 */
import { site } from '@data/site';
import { resenas, mediaTexto } from '@data/resenas';

export interface PreguntaFaq {
  p: string;
  r: string;
}

export type IconoVentaja = 'mapa' | 'reloj' | 'check' | 'puerta' | 'factura' | 'estrella';

export interface Ventaja {
  icono: IconoVentaja;
  titulo: string;
  texto: string;
  /** Prueba enlazable (spec §19) */
  href?: string;
  externo?: boolean;
}

export function ventajas(nombre: string): Ventaja[] {
  const lista: Ventaja[] = [
    {
      icono: 'mapa',
      titulo: `Cerrajero propio en ${nombre}`,
      texto: `Uno de nuestros cerrajeros trabaja en ${nombre}: es un cerrajero del equipo y está en la propia zona.`,
    },
    {
      icono: 'reloj',
      titulo: '24 horas, todos los días',
      texto: 'También de madrugada, en fin de semana y en festivos.',
      href: '/#cerrajero-urgente-24-horas',
    },
    {
      icono: 'check',
      titulo: 'Presupuesto antes de empezar',
      texto: 'Te explicamos qué hay que hacer y cuánto cuesta, sin compromiso, antes de tocar la puerta.',
      href: '/#como-trabajamos',
    },
    {
      icono: 'puerta',
      titulo: 'Sin romper, si se puede',
      texto: 'Si la puerta se cerró de golpe sin echar la llave, normalmente se abre sin romper la cerradura.',
      href: '/#apertura-de-puertas',
    },
  ];

  if (site.garantia.activa)
    lista.push({
      icono: 'factura',
      titulo: 'Garantía por escrito',
      texto: 'Figura en el parte o en la factura de cada trabajo, con sus condiciones.',
      href: '/#garantia',
    });

  if (resenas.total > 0)
    lista.push({
      icono: 'estrella',
      titulo: mediaTexto ? `${mediaTexto} en Google` : 'Opiniones en Google',
      texto: `${resenas.total} opiniones de clientes en nuestro perfil de Google.`,
      href: resenas.perfilUrl,
      externo: true,
    });

  return lista;
}

export type IconoAMano = 'mapa' | 'llave' | 'puerta' | 'dni';

export function aMano(nombre: string): { icono: IconoAMano; titulo: string; texto: string }[] {
  return [
    {
      icono: 'mapa',
      titulo: 'Dónde estás',
      texto: `La dirección exacta en ${nombre}: calle, número, portal, piso y puerta. Si cuesta encontrarlo, una referencia cercana.`,
    },
    {
      icono: 'llave',
      titulo: 'Qué ha pasado',
      texto: 'Te has quedado fuera, la llave se ha partido, la cerradura no gira o han intentado forzar la puerta.',
    },
    {
      icono: 'puerta',
      titulo: 'Cómo es la puerta',
      texto: 'Si lo sabes: blindada, acorazada, de madera o metálica, y si echaste la llave al salir.',
    },
    {
      icono: 'dni',
      titulo: 'Que es tu casa o tu local',
      texto: 'Algo que acredite tu relación con la vivienda o el local, como el DNI con esa dirección o el contrato.',
    },
  ];
}

/**
 * Las dos preguntas comunes de cada zona (cerrajero propio y zonas cercanas),
 * después de las propias de la ficha. Para que no salgan idénticas en las 16
 * páginas, cada zona usa una de cuatro redacciones (según su slug) y la
 * respuesta lleva sus barrios y sus zonas cercanas.
 */
export function faqsGenerales(
  nombre: string,
  cercanas: string[],
  opciones: { barrios?: string[]; semilla?: string } = {},
): PreguntaFaq[] {
  const lista = (nombres: string[]) =>
    nombres.length > 1 ? `${nombres.slice(0, -1).join(', ')} y ${nombres.at(-1)}` : (nombres[0] ?? '');
  const n = [...(opciones.semilla ?? nombre)].reduce((a, c) => a + c.charCodeAt(0), 0);
  const barrios = (opciones.barrios ?? []).slice(0, 3);
  const enBarrios = barrios.length ? ` y trabaja en barrios como ${lista(barrios)}` : '';
  const tel = site.telefono;

  const propio = [
    {
      p: `¿Tenéis cerrajero propio en ${nombre}?`,
      r: `Sí. Uno de nuestros cerrajeros trabaja en ${nombre}${enBarrios}. Es del equipo de OpenServi, no un intermediario. Llama al ${tel} y cuéntanos qué ha pasado.`,
    },
    {
      p: `¿El cerrajero que viene es de ${nombre} o de una empresa de fuera?`,
      r: `Es de la zona. Uno de nuestros cerrajeros trabaja en ${nombre}${enBarrios}, y forma parte del equipo de OpenServi: sin plataformas ni comisionistas de por medio.`,
    },
    {
      p: `¿Trabaja alguno de vuestros cerrajeros en ${nombre}?`,
      r: `Sí. En ${nombre} trabaja uno de nuestros cerrajeros${enBarrios ? `,${enBarrios.slice(1)}` : ''}. Cuando llamas al ${tel}, te ponemos en contacto con el técnico de la zona.`,
    },
    {
      p: `¿Mandáis a un cerrajero de ${nombre} o viene alguien de Madrid?`,
      r: `De ${nombre}. Uno de nuestros cerrajeros trabaja en la propia zona${enBarrios} y es del equipo de OpenServi. Llama al ${tel} y le pasamos tu aviso en un momento.`,
    },
  ];

  const L = lista(cercanas);
  const cerca = cercanas.length
    ? [
        {
          p: `¿Trabajáis también cerca de ${nombre}?`,
          r: `Sí. También tenemos cerrajero en ${L}, y trabajamos en el resto de zonas de alrededor aunque no aparezcan en la lista.`,
        },
        {
          p: `Si no estoy en ${nombre} sino en un pueblo de al lado, ¿también venís?`,
          r: `Claro. Cerca de ${nombre} también tenemos cerrajero propio en ${L}. Y si tu zona no aparece en la web, llámanos igual: trabajamos en todas las de alrededor.`,
        },
        {
          p: `¿Qué otras zonas cerca de ${nombre} cubrís?`,
          r: `Además de ${nombre}, tenemos cerrajero en ${L}. Si estás en otra zona cercana que no sale en la lista, también vamos.`,
        },
        {
          p: `¿Llegáis a los alrededores de ${nombre}?`,
          r: `Sí. Desde ${nombre} cubrimos los alrededores, y en ${L} tenemos también cerrajero propio. Aunque tu zona no aparezca en la web, llámanos.`,
        },
      ]
    : [{ p: `¿Trabajáis también cerca de ${nombre}?`, r: 'Sí. Trabajamos en las zonas de alrededor aunque no aparezcan en la lista.' }];

  return [propio[n % propio.length], cerca[(n + 1) % cerca.length]];
}
