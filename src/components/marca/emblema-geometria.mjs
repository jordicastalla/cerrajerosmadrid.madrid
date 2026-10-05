/**
 * Geometría del emblema provisional «llave alada» (Victoria Alada en clave
 * cerrajera). La usan el componente Emblema.astro y scripts/generar-iconos.mjs,
 * para que web, favicon e imagen OG dibujen exactamente lo mismo.
 *
 * Caja de 240 × 240. El ala nace junto al astil de la llave: las plumas
 * cuelgan de un borde de ataque curvo y crecen hacia la punta.
 */

const f = (n) => n.toFixed(1);

// Borde de ataque: curva cuadrática de la raíz (junto al astil) a la punta del ala
const R = { x: 156, y: 116 };
const C = { x: 120, y: 30 };
const T = { x: 56, y: 44 };
const borde = (t) => ({
  x: (1 - t) ** 2 * R.x + 2 * (1 - t) * t * C.x + t * t * T.x,
  y: (1 - t) ** 2 * R.y + 2 * (1 - t) * t * C.y + t * t * T.y,
});

/** Dirección de cada pluma: casi vertical junto al cuerpo, abierta en la punta */
const angulo = (t) => 272 - 42 * t;

function pluma(base, anguloGrados, largo, ancho) {
  const a = (anguloGrados * Math.PI) / 180;
  const d = { x: Math.cos(a), y: -Math.sin(a) };
  const p = { x: Math.sin(a), y: Math.cos(a) };
  const punta = { x: base.x + d.x * largo, y: base.y + d.y * largo };
  const m = { x: base.x + d.x * largo * 0.45, y: base.y + d.y * largo * 0.45 };
  return (
    `M${f(base.x + p.x * ancho * 0.6)} ${f(base.y + p.y * ancho * 0.6)}` +
    `Q${f(m.x + p.x * ancho)} ${f(m.y + p.y * ancho)} ${f(punta.x)} ${f(punta.y)}` +
    `Q${f(m.x - p.x * ancho)} ${f(m.y - p.y * ancho)} ${f(base.x - p.x * ancho * 0.6)} ${f(base.y - p.y * ancho * 0.6)}Z`
  );
}

export function geometriaEmblema() {
  const plumas = [];

  // Primarias: largas, de la punta hacia la raíz (las de dentro quedan encima)
  const N = 9;
  for (let i = 0; i < N; i++) {
    const t = 1 - (i / (N - 1)) * 0.78;
    plumas.push(pluma(borde(t), angulo(t), 42 + 54 * t, 9));
  }

  // Coberteras: cortas, encima de las primarias
  const M = 7;
  for (let i = 0; i < M; i++) {
    const t = 0.92 - (i / (M - 1)) * 0.8;
    plumas.push(pluma(borde(t), angulo(t), 22 + 28 * t, 11));
  }

  // Hombro: banda entre el borde de ataque y el arranque de las coberteras
  const sup = [];
  const inf = [];
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    const b = borde(t);
    sup.push(b);
    const a = (angulo(t) * Math.PI) / 180;
    inf.unshift({ x: b.x + Math.cos(a) * 14, y: b.y - Math.sin(a) * 14 });
  }
  const hombro = 'M' + [...sup, ...inf].map((p) => `${f(p.x)} ${f(p.y)}`).join('L') + 'Z';

  return {
    /** Centra el conjunto en la caja de 240 */
    encuadre: 'translate(16 30)',
    plumas,
    hombro,
    llave: 'translate(184 44) rotate(25)',
  };
}
