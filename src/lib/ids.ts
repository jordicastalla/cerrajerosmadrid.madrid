/**
 * Identificadores únicos dentro de cada página para los degradados SVG.
 * Deterministas: el mismo contenido produce el mismo HTML en cada build,
 * así dist/ (que va al repositorio) solo cambia cuando cambia algo de verdad.
 */
export function idUnico(locals: App.Locals, prefijo: string): string {
  locals.idsSvg = (locals.idsSvg ?? 0) + 1;
  return `${prefijo}${locals.idsSvg}`;
}
