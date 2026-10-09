/**
 * Medición de llamadas (spec §41). Cada enlace tel: lleva data-cta con el
 * bloque de origen (hero, sticky, header, triage-<situacion>…).
 *
 * Este módulo no carga nada de terceros. Emite un evento del navegador y, si
 * el visitante ha aceptado la analítica (el aviso de cookies define entonces
 * window.gtag), lo envía también a Google Analytics 4. Sin consentimiento no
 * sale nada del navegador.
 */

type Detalle = { evento: string; cta: string; pagina: string };

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function registrar(detalle: Detalle) {
  window.dispatchEvent(new CustomEvent('openservi:evento', { detail: detalle }));
  window.gtag?.('event', detalle.evento, { cta: detalle.cta, pagina: detalle.pagina });
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
