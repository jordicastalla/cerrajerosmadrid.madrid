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

/** Preguntas comunes a todas las zonas; van después de las preguntas propias de la ficha */
export function faqsGenerales(nombre: string, cercanas: string[]): PreguntaFaq[] {
  const lista = (nombres: string[]) =>
    nombres.length > 1 ? `${nombres.slice(0, -1).join(', ')} y ${nombres.at(-1)}` : (nombres[0] ?? '');

  return [
    {
      p: `¿Tenéis cerrajero en ${nombre}?`,
      r: `Sí. Uno de nuestros cerrajeros trabaja en ${nombre}. Llama al ${site.telefono} y cuéntanos qué ha pasado.`,
    },
    {
      p: `¿Atendéis en ${nombre} de noche y en festivos?`,
      r: `Sí. El servicio funciona las 24 horas, todos los días, también de madrugada, en fin de semana y en festivos.`,
    },
    {
      p: `¿Cuánto cuesta un cerrajero en ${nombre}?`,
      r: 'Depende del trabajo, de la puerta y de la cerradura. Antes de empezar te explicamos qué hay que hacer y te damos el presupuesto, sin compromiso.',
    },
    {
      p: `¿Trabajáis también cerca de ${nombre}?`,
      r: cercanas.length
        ? `Sí. También tenemos cerrajero en ${lista(cercanas)}, y trabajamos en el resto de zonas de alrededor aunque no aparezcan en la lista.`
        : 'Sí. Trabajamos en las zonas de alrededor aunque no aparezcan en la lista.',
    },
  ];
}
