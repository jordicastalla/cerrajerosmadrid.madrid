import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { leerEstadoContenido } from './scripts/contenido.mjs';

/** Dominio definitivo (confirmado en los datos legales del cliente). Única fuente: src/data/site.ts lo lee de aquí. */
const SITE = 'https://cerrajerosmadrid.madrid';

// Qué URLs son noindex (draft, legales, 404) y fecha real de cada contenido
const estado = leerEstadoContenido();

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  compressHTML: true,
  build: {
    format: 'directory',
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      // Solo URLs indexables (spec §5, §13)
      filter: (page) => !estado.noIndexables.has(new URL(page).pathname),
      // Sin changefreq ni priority (Google los ignora); lastmod solo si es real
      serialize(item) {
        const lastmod = estado.lastmod.get(new URL(item.url).pathname);
        if (lastmod) item.lastmod = lastmod;
        else delete item.lastmod;
        delete item.changefreq;
        delete item.priority;
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: true,
      assetsInlineLimit: 2048,
    },
  },
});
