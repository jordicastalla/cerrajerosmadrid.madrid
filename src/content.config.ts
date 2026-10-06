/**
 * Colecciones de contenido (spec §4, §37, §38). Presentación, datos y textos
 * van separados: los textos viven en src/content y las plantillas no cambian
 * al añadir localidades, servicios o casos.
 */
import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const estado = z.enum(['draft', 'ready']).default('draft');

const tiposDeTrabajo = z.enum(['apertura', 'cambio-cerradura', 'cerrojo', 'bombin', 'alta-seguridad', 'otro']);

/**
 * Localidades: solo existen donde uno de nuestros cerrajeros trabaja en la
 * zona (spec §27). Nacen en draft y pasan a ready cuando cumplen los mínimos
 * de src/lib/gate.ts. El texto se escribe solo con la ficha de la empresa.
 */
const localidades = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/localidades' }),
  schema: ({ image }) =>
    z.object({
      nombre: z.string(),
      status: estado,
      cerrajeroPropio: z.boolean(),
      tipoPresencia: z.literal('cerrajero del equipo').default('cerrajero del equipo'),
      grupoMapa: z.enum(['noroeste', 'oeste', 'sur', 'sureste', 'este']),
      ordenMapa: z.number().int().positive(),
      seoTitle: z.string(),
      seoDescription: z.string(),
      intro: z.string().optional(),
      barrios: z.array(z.string()).default([]),
      observacionesLocales: z.array(z.string()).default([]),
      /** Solo si la empresa lo mide (spec §38). Si no, no se muestra. */
      tiempoLlegada: z.string().optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      nearby: z.array(reference('localidades')).default([]),
      updatedAt: z.coerce.date(),
    }),
});

const servicios = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/servicios' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      h1: z.string(),
      status: estado,
      seoTitle: z.string(),
      seoDescription: z.string(),
      resumen: z.string(),
      intro: z.string(),
      proceso: z.array(z.string()).default([]),
      tiposDeCaso: z.array(tiposDeTrabajo).default([]),
      relacionados: z.array(reference('servicios')).default([]),
      image: image().optional(),
      imageAlt: z.string().optional(),
      orden: z.number().int().default(99),
      updatedAt: z.coerce.date(),
    }),
});

/**
 * «Trabajos reales» (spec §37). Un caso = una foto real + tipo + zona + qué se
 * hizo, aportado por la empresa. Sin verificado: true no se publica.
 */
const casos = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/casos' }),
  schema: ({ image }) =>
    z.object({
      localidad: reference('localidades'),
      tipo: tiposDeTrabajo,
      barrio: z.string().optional(),
      fecha: z.coerce.date().optional(),
      foto: image(),
      alt: z.string().min(15),
      resumen: z.string().min(30),
      verificado: z.literal(true),
    }),
});

export const collections = { localidades, servicios, casos };
