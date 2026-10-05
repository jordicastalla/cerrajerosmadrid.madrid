import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://cerrajeroschamartin.es',
  trailingSlash: 'always',
  compressHTML: true,
  build: {
    format: 'directory',
    inlineStylesheets: 'always',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      lastmod: new Date(),
      filter: (page) =>
        !page.includes('/politica-de-cookies/') &&
        !page.includes('/politica-de-privacidad/') &&
        !page.includes('/aviso-legal/'),
      serialize(item) {
        if (new URL(item.url).pathname === '/') item.priority = 1.0;
        else if (item.url.endsWith('/contacto/')) item.priority = 0.5;
        else item.priority = 0.9;
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
