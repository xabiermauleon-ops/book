/* Figuras dibujadas de los casos, por slug. Son SVG en línea, no imágenes:
   así siguen el color del tema (claro y oscuro) con currentColor y escalan
   sin pesar. `svg` recibe el texto alternativo ya resuelto en su idioma. */

/* ── Auditoría de PhysioGo ───────────────────────────────────────────── */

const HEURISTICAS = [
  ['Visibilidad del estado',      'Visibility of system status',          'parcial'],
  ['Lenguaje del usuario',        'Match with the real world',            'parcial'],
  ['Control y libertad',          'User control and freedom',             'parcial'],
  ['Consistencia y estándares',   'Consistency and standards',            'parcial'],
  ['Prevención de errores',       'Error prevention',                     'suspensa'],
  ['Reconocer antes que recordar','Recognition rather than recall',       'aprobada'],
  ['Flexibilidad y eficiencia',   'Flexibility and efficiency of use',    'parcial'],
  ['Diseño minimalista',          'Aesthetic and minimalist design',      'parcial'],
  ['Recuperación de errores',     'Help users recover from errors',       'suspensa'],
  ['Ayuda y documentación',       'Help and documentation',               'suspensa']
];

const VEREDICTO = {
  aprobada: { relleno: 1,    es: 'Aprobada', en: 'Pass' },
  parcial:  { relleno: 0.5,  es: 'Parcial',  en: 'Partial' },
  suspensa: { relleno: 0,    es: 'Suspensa', en: 'Fail' }
};

function heuristicas(alt, lang) {
  const FILA = 38, Y0 = 34, PISTA_X = 430, PISTA_W = 190;
  const alto = Y0 + HEURISTICAS.length * FILA + 16;

  const filas = HEURISTICAS.map((h, i) => {
    const y = Y0 + i * FILA;
    const v = VEREDICTO[h[2]];
    const falla = h[2] === 'suspensa';
    const color = falla ? 'var(--azul, #0015FF)' : 'currentColor';
    const ancho = Math.round(PISTA_W * v.relleno);
    return `          <g>
            <text x="0" y="${y + 4}" font-size="11" font-style="italic" opacity="0.5" fill="currentColor">${String(i + 1).padStart(2, '0')}</text>
            <text x="30" y="${y + 4}" font-size="13" fill="${color}"${falla ? ' font-weight="700"' : ''}>${lang === 'en' ? h[1] : h[0]}</text>
            <rect x="${PISTA_X}" y="${y - 7}" width="${PISTA_W}" height="11" fill="none" stroke="currentColor" stroke-width="1" opacity="0.28"></rect>
            ${ancho ? `<rect x="${PISTA_X}" y="${y - 7}" width="${ancho}" height="11" fill="currentColor" opacity="${v.relleno === 1 ? '0.85' : '0.38'}"></rect>` : ''}
            <text x="${PISTA_X + PISTA_W + 14}" y="${y + 4}" font-size="11" letter-spacing="0.04em" fill="${color}"${falla ? ' font-weight="700"' : ''}>${lang === 'en' ? v.en : v.es}</text>
          </g>`;
  }).join('\n');

  return `        <svg viewBox="0 0 760 ${alto}" role="img" aria-label="${alt}">
          <text x="0" y="12" font-size="10" letter-spacing="0.08em" opacity="0.55" fill="currentColor">${lang === 'en' ? 'HEURISTIC' : 'HEURÍSTICA'}</text>
          <text x="${PISTA_X}" y="12" font-size="10" letter-spacing="0.08em" opacity="0.55" fill="currentColor">${lang === 'en' ? 'VERDICT' : 'VEREDICTO'}</text>
          <line x1="0" y1="20" x2="760" y2="20" stroke="currentColor" stroke-width="1" opacity="0.28"></line>
${filas}
        </svg>`;
}

/* Los ocho fallos críticos, agrupados por el esfuerzo que cuesta arreglarlos.
   Es el orden que propone el informe: por esfuerzo, no por gravedad. */
const CRITICOS = [
  { es: 'Bajo', en: 'Low',    codigos: ['C3', 'UI-C1', 'UI-C2', 'UI-C3'] },
  { es: 'Medio', en: 'Medium', codigos: ['C1'] },
  { es: 'Alto', en: 'High',   codigos: ['C2', 'C4', 'C5'] }
];

function esfuerzo(alt, lang) {
  const COL_W = 240, GAP = 20;
  const grupos = CRITICOS.map((g, i) => {
    const x = i * (COL_W + GAP);
    const barato = i === 0;
    const color = barato ? 'var(--azul, #0015FF)' : 'currentColor';
    const chips = g.codigos.map((c, j) => {
      const cx = x + (j % 2) * 118;
      const cy = 104 + Math.floor(j / 2) * 40;
      return `            <g>
              <rect x="${cx}" y="${cy}" width="104" height="30" fill="none" stroke="${color}" stroke-width="1" opacity="${barato ? '1' : '0.4'}"></rect>
              <text x="${cx + 52}" y="${cy + 20}" font-size="12" text-anchor="middle" fill="${color}" opacity="${barato ? '1' : '0.75'}">${c}</text>
            </g>`;
    }).join('\n');
    return `          <g>
            <line x1="${x}" y1="18" x2="${x + COL_W}" y2="18" stroke="${color}" stroke-width="${barato ? '2' : '1'}" opacity="${barato ? '1' : '0.3'}"></line>
            <text x="${x}" y="62" font-size="42" font-weight="700" fill="${color}">${g.codigos.length}</text>
            <text x="${x}" y="84" font-size="11" letter-spacing="0.08em" fill="currentColor" opacity="0.6">${(lang === 'en' ? g.en : g.es).toUpperCase()}</text>
${chips}
          </g>`;
  }).join('\n');

  return `        <svg viewBox="0 0 760 204" role="img" aria-label="${alt}">
${grupos}
        </svg>`;
}

module.exports = {
  'physiogo': [
    {
      titulo: { es: 'Las diez heurísticas', en: 'The ten heuristics' },
      alt: {
        es: 'Las diez heurísticas de usabilidad de Nielsen aplicadas a PhysioGo: aprueba una, cumple seis de forma parcial y suspende tres — prevención de errores, recuperación de errores y ayuda y documentación.',
        en: 'Nielsen’s ten usability heuristics applied to PhysioGo: one pass, six partial and three fails — error prevention, error recovery, and help and documentation.'
      },
      pie: {
        es: 'La aplicación aprueba una heurística, cumple seis a medias y suspende tres. Las tres suspensas tienen algo en común: todas ocurren cuando algo ha ido mal y nadie explica qué.',
        en: 'The app passes one heuristic, half-meets six and fails three. The three failures have something in common: all of them happen once something has gone wrong and nobody explains what.'
      },
      svg: heuristicas
    },
    {
      titulo: { es: 'Los ocho críticos, por esfuerzo', en: 'The eight criticals, by effort' },
      alt: {
        es: 'Los ocho fallos críticos agrupados por esfuerzo de corrección: cuatro de esfuerzo bajo, uno medio y tres altos.',
        en: 'The eight critical failures grouped by the effort needed to fix them: four low, one medium and three high.'
      },
      pie: {
        es: 'La mitad de los fallos críticos son baratos de arreglar, y tres de esos cuatro se resuelven con un único cambio en el sistema de color. Ordenar por esfuerzo y no por gravedad es lo que permite a un equipo pequeño empezar el lunes.',
        en: 'Half the critical failures are cheap to fix, and three of those four are resolved by a single change to the colour system. Ordering by effort rather than by severity is what lets a small team start on Monday.'
      },
      svg: esfuerzo
    }
  ]
};
