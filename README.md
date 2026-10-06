# cerrajerosmadrid.madrid

Web de **Cerrajeros Madrid Openservi**, hecha con Astro 7 y Tailwind 4. La especificación completa está en [`docs/SPEC.md`](docs/SPEC.md) (v2.2).

```sh
npm install
npm run dev            # desarrollo
npm run build          # genera dist/ (incluye la puerta de indexación)
npm run audit          # auditoría SEO del build (spec §43)
npm run audit:strict   # además falla si quedan datos pendientes del cliente
npm run inventario     # fase 0: inventario de fotos reales (spec §34)
npm run iconos         # regenera favicons, iconos e imagen OG desde los logotipos
npm run skyline        # vuelve a pasar a SVG el perfil de Madrid (necesita potrace)
```

`dist/` va al repositorio, como en cerrajeroschamartin.es: después de cada cambio, `npm run build` y se sube también `dist/`. El build es determinista, así que `dist/` solo cambia cuando cambia algo de verdad.

Para publicar: `npm run build && npm run audit:strict` y subir el **contenido** de `dist/` a la raíz del hosting (el `.htaccess` va dentro).

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Datos del negocio (teléfono, perfil de Google, garantía, datos legales) | `src/data/site.ts` |
| Dominio | `astro.config.mjs` (`site`) |
| Reseñas literales del perfil de Google | `src/data/resenas.ts` |
| Situaciones del triaje «¿Qué te ha pasado?» | `src/data/situaciones.ts` |
| Fichas de las 16 localidades | `src/content/localidades/*.md` |
| Páginas de servicio | `src/content/servicios/*.md` |
| Trabajos reales (fotos verificadas) | `src/content/casos/` (formato en `_LEEME.md`) |
| Mínimos para indexar una localidad | `src/lib/gate.ts` |
| Paleta, tipografías y reglas de contraste | `src/styles/global.css` |
| Logotipos (horizontal, vertical), emblema y perfil de Madrid en SVG | `src/assets/marca/` |
| Original del perfil de Madrid (fuente de `npm run skyline`) | `marca/skyline-original.webp` |

## Cómo se publica una localidad

Las 16 localidades están en `status: draft`: existen, pero son `noindex`, no salen en el sitemap y no se enlazan. Para pasar una a `ready`, su ficha necesita, como mínimo:

1. al menos 1 caso real verificado en `src/content/casos/`;
2. una introducción propia de 100 palabras o más, escrita solo con datos reales de la zona;
3. al menos 2 preguntas frecuentes reales de la zona (`faqs`);
4. `seoTitle` y `seoDescription` propios.

Además, cada ficha puede llevar un `consejo` práctico para la zona y sus zonas cercanas (`nearby`). Los bloques comunes de las páginas de zona (ventajas, banner, «Ten esto a mano», preguntas generales) están en `src/data/zona.ts`.

Si se marca `ready` sin cumplirlo, el build falla y dice qué falta.

## Reglas que no se saltan

- La web **no publica precios**. El único tiempo de llegada es el tiempo medio que ha dado la empresa (20 a 30 minutos, en las preguntas frecuentes de la Home).
- Nada de «los mejores», «líderes», «técnicos certificados» ni similares sin prueba: la auditoría lo detecta.
- Las reseñas se copian literales del perfil de Google y nunca se marcan con `AggregateRating`.
- No se reutilizan textos de otros dominios propios.

## Pendiente del cliente

- Token de verificación de Search Console (`src/data/site.ts`).
- Decidir qué dirección se publica en schema.org (por defecto, ninguna).
- NIF del titular para el aviso legal (`src/data/site.ts`, `legal.nif`).
- Fotos reales por localidad.
