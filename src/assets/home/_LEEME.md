# Imágenes de la Home

La Home tiene dos huecos para fotos reales:

| Hueco | Dónde sale | Archivo |
|---|---|---|
| 1 | Junto a «Cerrajeros en Madrid» (presentación del equipo) | `imagen-1-<descripción>.webp`, p. ej. `imagen-1-bombin-laton-escudo-puerta-madera.webp` (o `.jpg`, `.png`, `.avif`) |
| 2 | Junto a «Cerrajería 24 horas y urgencias…» | `imagen-2-<descripción>.webp`, p. ej. `imagen-2-canto-puerta-acorazada-bulones.webp` (o `.jpg`, `.png`, `.avif`) |

1. Copia la foto aquí con ese nombre. Mejor en horizontal 4:3 y de al menos 1200 px de ancho: Astro la optimiza sola.
2. Escribe su texto alternativo en `src/data/home.ts` (qué se ve en la foto, no palabras clave).
3. `npm run build`. Si falta el texto alternativo, el build falla y lo dice.

Mientras no haya foto, el hueco muestra un detalle del perfil de Madrid en oro.
