/**
 * Medición de llamadas (spec §41). Cada enlace tel: lleva data-cta con el
 * bloque de origen (hero, sticky, header, triage-<situacion>…).
 *
 * Mientras la empresa no elija herramienta de analítica (TODO-CLIENTE), aquí
 * no se carga ningún script de terceros: solo se emite un evento del
 * navegador y, si algún día existe window.dataLayer, se empuja ahí también.
 */

type Detalle = { evento: string; cta: string; pagina: string };

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function registrar(detalle: Detalle) {
  window.dispatchEvent(new CustomEvent('openservi:evento', { detail: detalle }));
  window.dataLayer?.push({ event: detalle.evento, cta: detalle.cta, pagina: detalle.pagina });
}

document.addEventListener(
  'click',
  (e) => {
    const el = (e.target as Element | null)?.closest?.('a[href^="tel:"], [data-evento]');
    if (!el) return;
    const esLlamada = el.matches('a[href^="tel:"]');
    registrar({
      evento: esLlamada ? 'llamada' : (el.getAttribute('data-evento') ?? 'clic'),
      cta: el.getAttribute('data-cta') ?? 'sin-etiqueta',
      pagina: location.pathname,
    });
  },
  { passive: true },
);

export {};
