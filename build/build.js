// Genera trabajo.html, como-trabajo.html y las páginas de caso a partir de build/cases.js.
// Uso: node build/build.js   (desde la raíz del proyecto)

const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const cases = require('./cases.js');
const PAGINAS = require('./paginas.js');

/* La salida vive en public/. El generador y los datos se quedan fuera,
   para que Netlify publique solo lo publicable. */
const ROOT = path.resolve(__dirname, '..', 'public');
const RAIZ_REPO = path.resolve(__dirname, '..');
const FUENTES = path.resolve(__dirname, '..', 'src');

/* Dominio de publicación. Si Netlify te da otro, cambia SOLO esta línea
   y vuelve a ejecutar `node build/build.js`. */
const SITIO = 'https://xabimauleon.netlify.app';

/* ------------------------------------------------------------
   Idioma
   El castellano manda en la raíz; el inglés vive en /en/. El
   generador se ejecuta una vez por idioma: L dice cuál se está
   escribiendo, y T() traduce las frases de interfaz.
   ------------------------------------------------------------ */

const TEXTOS = require('./textos.js');
const IDIOMAS = ['es', 'en'];

/* Mientras falten traducciones, el ingles se genera para poder revisarlo
   pero no se publica: ni se escribe en public/, ni aparece el selector,
   ni se declara en hreflang ni en el sitemap. Publicar paginas inglesas
   con texto en castellano es peor que no tenerlas. Pon true cuando este
   completo y vuelve a ejecutar el generador. */
const PUBLICAR_INGLES = true;
const VISIBLES = PUBLICAR_INGLES ? IDIOMAS : ['es'];
let L = 'es';
const faltan = new Set();

function T(es) {
  if (L === 'es') return es;
  const en = TEXTOS[es];
  if (en === undefined) { faltan.add(es); return es; }
  return en;
}

/* Campo de datos que existe en los dos idiomas: { es: '…', en: '…' }.
   Si aún no hay inglés, cae al castellano y lo anota. */
function C(campo) {
  if (campo === null || campo === undefined) return '';
  if (typeof campo === 'string') return campo;
  const v = campo[L];
  if (v === undefined || v === null || v === '') {
    faltan.add('[dato] ' + String(campo.es).slice(0, 60));
    return campo.es || '';
  }
  return v;
}

/* Rutas de cada página dentro de su propio árbol de idioma.
   El árbol español es public/, el inglés public/en/. */
const RUTA = {
  es: { inicio: 'index.html', trabajo: 'trabajo.html', metodo: 'como-trabajo.html',
        richmedia: 'rich-media.html', estudio: 'estudio.html', contacto: 'contacto.html',
        gracias: 'gracias.html', casos: 'casos/' },
  en: { inicio: 'index.html', trabajo: 'projects.html', metodo: 'how-i-work.html',
        richmedia: 'rich-media.html', estudio: 'about.html', contacto: 'contact.html',
        gracias: 'thanks.html', casos: 'cases/' }
};

const BASE = { es: '', en: 'en/' };

function R(clave) { return RUTA[L][clave]; }

/* Dos prefijos distintos, y conviene no confundirlos:
   pa() sube hasta la raíz del idioma (para enlazar entre páginas),
   pr() sube hasta public/ (para el CSS, el JS, las imágenes y el CV,
   que son comunes a los dos idiomas y no se duplican). */
function pa(up) { return up ? '../' : ''; }
function pr(up) {
  const saltos = (up ? 1 : 0) + (L === 'es' ? 0 : 1);
  return '../'.repeat(saltos);
}

/* Enlace relativo a esta misma página en el otro idioma. Se calcula
   subiendo hasta public/ y bajando por el árbol del otro idioma. */
function otroIdiomaHref(up, clave, slug) {
  const otro = L === 'es' ? 'en' : 'es';
  const r = RUTA[otro];
  const destino = slug ? r.casos + slug + '.html' : r[clave];
  return pr(up) + BASE[otro] + destino;
}

/* URL absoluta de una página, para canónicas y hreflang. */
function url(lang, clave, slug) {
  const r = RUTA[lang];
  const destino = slug ? r.casos + slug + '.html' : r[clave];
  const ruta = BASE[lang] + (clave === 'inicio' && !slug ? '' : destino);
  return SITIO + '/' + ruta;
}

/* Huella del contenido del CSS y del JS. Van pegada a la direccion
   (styles.css?v=1a2b3c4d) para que el navegador pida el archivo nuevo en
   cuanto cambia, aunque la cabecera de cache diga que puede guardarlo un
   ano. Sin esto, quien ya haya visitado la web sigue con la version vieja.
   Regla equivalente para las imagenes: si cambia una, cambiale el nombre. */
function huella(archivo) {
  const ruta = path.join(ROOT, archivo);
  if (!fs.existsSync(ruta)) return '';
  return '?v=' + crypto.createHash('sha1').update(fs.readFileSync(ruta)).digest('hex').slice(0, 8);
}
const V = { css: '', js: '' };

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Categoría legible -> clave de filtro
const CLAVE = {
  'UX/UI Digital': 'uxui',
  'Publicidad': 'publicidad',
  'Editorial': 'editorial',
  'Visualización de Datos': 'datos'
};

const FILTROS = [
  { k: 'todo', label: 'Todo' },
  { k: 'uxui', label: 'UX/UI Digital' },
  { k: 'publicidad', label: 'Publicidad' },
  { k: 'richmedia', label: 'Rich Media' },
  { k: 'editorial', label: 'Editorial' },
  { k: 'datos', label: 'Datos' }
];

function nav(active, up, otroIdioma) {
  const a = pa(up);     // hasta la raíz del idioma
  const r = pr(up);     // hasta public/ (CSS, imágenes, CV)
  const fila = (href, label, key, clase) =>
    `        <a class="fila ${clase}${active === key ? ' actual' : ''}" href="${a}${href}">${esc(label)}</a>`;

  /* El selector de idioma apunta a la misma página en el otro idioma.
     Si esa página no existe todavía, se enlaza su portada. */
  const otro = L === 'es' ? 'en' : 'es';
  const etiqueta = L === 'es' ? 'English' : 'Español';
  const cambio = (otroIdioma && VISIBLES.length > 1)
    ? `      <a class="menu-idioma" href="${otroIdioma}" hreflang="${otro}" lang="${otro}">${etiqueta}</a>\n`
    : '';

  return `<!-- nav -->
<header class="site-header">
  <div class="site-header-inner">
    <a href="${a}${R('inicio')}" class="logo">X. MAULEON</a>
    <button class="nav-toggle" data-menu-abrir aria-controls="menu" aria-expanded="false" aria-label="${esc(T('Abrir menú'))}">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<div class="menu" id="menu" aria-hidden="true">
  <aside class="menu-meta">
    <ul>
      <li><a href="mailto:xabier.mauleon@gmail.com">xabier.mauleon@gmail.com</a></li>
      <li><a href="tel:+34607323642">+34 607 323 642</a></li>
      <li><a href="https://www.linkedin.com/in/xabiermauleon" target="_blank" rel="noopener">LinkedIn →</a></li>
      <li><span>${esc(T('Madrid, España'))}</span></li>
    </ul>
${cambio}    <a class="menu-cv" href="${r}cv-xabier-mauleon.pdf" target="_blank" rel="noopener">${esc(T('Descargar CV ↓'))}</a>
  </aside>

  <div class="menu-panel">
    <div class="menu-top">
      <a href="${a}${R('inicio')}" class="logo">X. MAULEON</a>
      <button class="menu-cerrar" data-menu-cerrar aria-label="${esc(T('Cerrar menú'))}">✕</button>
    </div>
    <nav class="menu-nav" aria-label="${esc(T('Navegación principal'))}">
${fila(R('trabajo'), T('Proyectos'), 'trabajo', 'fila-grande')}
${fila(R('trabajo') + '#uxui', T('UX/UI Digital'), null, 'fila-sub')}
${fila(R('trabajo') + '#publicidad', T('Publicidad'), null, 'fila-sub')}
${fila(R('trabajo') + '#richmedia', T('Rich Media'), 'richmedia', 'fila-sub')}
${fila(R('trabajo') + '#editorial', T('Editorial'), null, 'fila-sub')}
${fila(R('trabajo') + '#datos', T('Datos'), null, 'fila-sub')}
${fila(R('metodo'), T('Cómo trabajo'), 'metodo', 'fila-grande')}
${fila(R('estudio'), T('Sobre mí'), 'estudio', 'fila-grande')}
${fila(R('contacto'), T('Contacto'), 'contacto', 'fila-grande')}
    </nav>
  </div>
</div>
<!-- /nav -->`;
}

function footer(up) {
  const a = pa(up);
  const r = pr(up);
  return `  <!-- pie -->
  <footer class="site-footer">
    <div class="footer-top">
      <p class="footer-claim">${esc(T('¿Hablamos?'))}</p>
      <a class="footer-mail" href="${a}${R('contacto')}">xabier.mauleon@gmail.com →</a>
    </div>
    <div class="footer-cols">
      <div class="footer-col">
        <h3>${esc(T('Navegación'))}</h3>
        <ul>
          <li><a href="${a}${R('inicio')}">${esc(T('Inicio'))}</a></li>
          <li><a href="${a}${R('trabajo')}">${esc(T('Proyectos'))}</a></li>
          <li><a href="${a}${R('metodo')}">${esc(T('Cómo trabajo'))}</a></li>
          <li><a href="${a}${R('estudio')}">${esc(T('Sobre mí'))}</a></li>
          <li><a href="${a}${R('contacto')}">${esc(T('Contacto'))}</a></li>
          <li><a href="${r}cv-xabier-mauleon.pdf" target="_blank" rel="noopener">${esc(T('CV (PDF) →'))}</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>${esc(T('Proyectos'))}</h3>
        <ul>
          <li><a href="${a}${R('trabajo')}#uxui">${esc(T('UX/UI Digital'))}</a></li>
          <li><a href="${a}${R('trabajo')}#publicidad">${esc(T('Publicidad'))}</a></li>
          <li><a href="${a}${R('trabajo')}#richmedia">${esc(T('Rich Media'))}</a></li>
          <li><a href="${a}${R('trabajo')}#editorial">${esc(T('Editorial'))}</a></li>
          <li><a href="${a}${R('trabajo')}#datos">${esc(T('Datos'))}</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>${esc(T('Contacto'))}</h3>
        <ul>
          <li><span>xabier.mauleon@gmail.com</span></li>
          <li><span>+34 607 323 642</span></li>
          <li><a href="https://www.linkedin.com/in/xabiermauleon" target="_blank" rel="noopener">LinkedIn →</a></li>
          <li><a href="https://xabiermauleon.myportfolio.com/" target="_blank" rel="noopener">${esc(T('Portfolio Adobe →'))}</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>${esc(T('Buscando'))}</h3>
        <ul>
          <li><span>${esc(T('Art Director · Design Lead'))}</span></li>
          <li><span>${esc(T('Madrid, híbrido o remoto'))}</span></li>
          <li><span>${esc(T('Disponible desde Q4 2026'))}</span></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Xabier Mauleon</span>
      <span>${esc(T('Diseñado y construido por mí'))}</span>
    </div>
  </footer>
  <!-- /pie -->`;
}

function linkChips(links, cls) {
  if (!links || !links.length) return '';
  const items = links
    .map(l => `<a href="${l.href}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`)
    .join('\n        ');
  return `      <div class="${cls}">
        ${items}
      </div>`;
}

function doc(title, body, up, extraHead, desc, clave, slug) {
  const r = pr(up);
  const d = desc || T('Book de Xabier Mauleon. Veinte años dirigiendo diseño entre medios de moda, agencia y producto digital.');
  const canon = url(L, clave, slug);
  /* hreflang le dice al buscador que estas dos páginas son la misma en
     distinto idioma, para que sirva la que toca y no las trate como
     contenido duplicado. x-default apunta al castellano, que es el principal. */
  const alternas = VISIBLES.length < 2 ? '' : VISIBLES
    .map(lg => `<link rel="alternate" hreflang="${lg}" href="${url(lg, clave, slug)}">`)
    .concat([`<link rel="alternate" hreflang="x-default" href="${url('es', clave, slug)}">`])
    .join('\n') + '\n';

  return `<!doctype html>
<html lang="${L}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(d)}">
<link rel="canonical" href="${canon}">
${alternas}<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(d)}">
<meta property="og:url" content="${canon}">
<meta property="og:image" content="${SITIO}/img/retrato.jpg">
<meta property="og:locale" content="${L === 'es' ? 'es_ES' : 'en_GB'}">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="${r}styles.css${V.css}">${extraHead || ''}
</head>
<body>
${body}
<script src="${r}script.js${V.js}" defer></script>
</body>
</html>
`;
}

/* Galería del caso. La primera imagen va a ancho completo y el resto
   en una fila, porque suelen ser detalles de menor entidad. */
function galeria(imagenes) {
  if (!imagenes || !imagenes.length) return '';
  const uno = im => `      <figure>
        <img src="${pr(true)}${im.src}" alt="${esc(C(im.alt))}" width="${im.w}" height="${im.h}" loading="lazy">
        <figcaption>${esc(C(im.pie))}</figcaption>
      </figure>`;
  const [principal, ...resto] = imagenes;
  return `
  <section class="case-galeria">
    <div class="galeria-principal">
${uno(principal)}
    </div>${resto.length ? `
    <div class="galeria-resto">
${resto.map(uno).join('\n')}
    </div>` : ''}
  </section>
`;
}

/* ---------- Página de inicio ---------- */

function inicioPage() {
  const P = PAGINAS.inicio;
  const r = pr(false);
  const a = pa(false);

  const tarjetas = P.tarjetas.map(t => `      <a href="${a}${R('casos')}${t.slug}.html" class="case-card">
        <span class="eyebrow-case">${esc(C(t.titulo))}</span>
        <p>${esc(C(t.texto))}</p>
        <span class="card-cta">${esc(C(P.verCaso))}</span>
      </a>`).join('\n');

  const conflictos = P.conflictos.map(k => `      <a class="conflicto-bloque" href="${a}${R('metodo')}">
        <span class="proyecto">${esc(C(k.proyecto))}</span>
        <span class="choque">${esc(C(k.choque))}</span>
        <span class="regla">${esc(C(k.regla))}</span>
      </a>`).join('\n');

  const parrafos = P.perfilP.map(t => `      <p>${esc(C(t))}</p>`).join('\n');

  const body = `
${nav('inicio', false, otroIdiomaHref(false, 'inicio'))}

<img class="retrato" src="${r}img/retrato.jpg" alt="${esc(C(P.retratoAlt))}" width="1600" height="500">

<main>

  <section class="hero">
    <span class="status"><span class="dot"></span>${esc(C(P.estado))}</span>
    <h1>${esc(C(P.h1a))}<br>${esc(C(P.h1b))}</h1>
    <p class="lede">${esc(C(P.lede))}</p>
    <p class="support">${esc(C(P.apoyo))}</p>
  </section>

  <section>
    <div class="section-label-row">
      <span class="section-label">${esc(C(P.destacadoLabel))}</span>
      <a href="${a}${R('trabajo')}" class="link-arrow">${esc(C(P.destacadoLink))}</a>
    </div>
    <div class="featured-grid">
${tarjetas}
    </div>
  </section>

  <figure class="banda">
    <img src="${r}img/arquitectura.jpg" alt="${esc(C(P.bandaAlt))}" width="1600" height="532" loading="lazy">
  </figure>

  <section class="metodo-resumen">
    <div class="metodo-head">
      <h2>${esc(C(P.metodoH2))}</h2>
      <span class="metodo-eyebrow">${esc(C(P.metodoEyebrow))}</span>
    </div>
    <p class="metodo-lede">${esc(C(P.metodoLede))}</p>

    <div class="conflicto-grid">
${conflictos}
    </div>

    <a class="link-azul" href="${a}${R('metodo')}">${esc(C(P.metodoLink))}</a>
  </section>

  <section class="perfil">
    <img class="perfil-foto" src="${r}img/helvetica.jpg" alt="${esc(C(P.perfilAlt))}" width="816" height="1205" loading="lazy">
    <div class="perfil-col">
      <span class="section-label">${esc(C(P.perfilLabel))}</span>
      <h2>${esc(C(P.perfilH2))}</h2>
${parrafos}

      <div class="perfil-acciones">
        <a class="btn-solido" href="${r}cv-xabier-mauleon.pdf" target="_blank" rel="noopener">${esc(C(P.perfilCV))}</a>
        <a class="btn-linea" href="${a}${R('estudio')}">${esc(C(P.perfilTray))}</a>
      </div>
    </div>
  </section>

${footer(false)}

</main>
`;
  return doc(C(P.titulo), body, false, '', C(P.desc), 'inicio');
}

/* ---------- Sobre mí ---------- */

function estudioPage() {
  const P = PAGINAS.estudio;
  const intro = P.intro.map(t => `    <p>${esc(C(t))}</p>`).join('\n');
  const nodos = P.trayectoria.map((t, i) => {
    const ultimo = i === P.trayectoria.length - 1;
    return `      <span class="node"${ultimo ? ' style="padding-right: 0;"' : ''}>${esc(C(t))}</span>` +
           (ultimo ? '' : '<span class="arrow">→</span>');
  }).join('\n');
  const tags = P.herramientas.map(t => `        <span class="tag">${esc(t)}</span>`).join('\n');

  const body = `
${nav('estudio', false, otroIdiomaHref(false, 'estudio'))}

<main>

  <section class="studio-intro">
    <h1>${esc(C(P.h1))}</h1>
${intro}
  </section>

  <section class="timeline-panel">
    <span class="timeline-label">${esc(C(P.trayectoriaLabel))}</span>
    <div class="timeline-row">
${nodos}
    </div>
  </section>

  <section class="studio-grid">
    <div>
      <h2 class="section-label">${esc(C(P.herramientasLabel))}</h2>
      <div class="tag-list">
${tags}
      </div>
    </div>
    <div>
      <h2 class="section-label">${esc(C(P.fueraLabel))}</h2>
      <p>${esc(C(P.fuera))}</p>
    </div>
  </section>

${footer(false)}

</main>
`;
  return doc(C(P.titulo), body, false, '', C(P.desc), 'estudio');
}

/* ---------- Contacto ---------- */

function contactoPage() {
  const P = PAGINAS.contacto;
  const a = pa(false);
  const bloques = P.bloques.map(b => `    <div class="presentacion-bloque">
      <span class="section-label">${esc(C(b.label))}</span>
      <p>${esc(C(b.texto))}</p>
    </div>`).join('\n\n');
  const motivos = P.motivos.map(m => `            <option>${esc(C(m))}</option>`).join('\n');

  const body = `
${nav('contacto', false, otroIdiomaHref(false, 'contacto'))}

<main>

  <section class="page-header">
    <span class="eyebrow-case">${esc(C(P.eyebrow))}</span>
    <h1>Xabier Mauleon</h1>
    <p class="intro-destacada">${esc(C(P.intro))}</p>
  </section>

  <section class="presentacion">
${bloques}
  </section>

  <section class="bloque-formulario" style="padding-block: 8px; display: flex; gap: 64px; flex-wrap: wrap;">

    <h2 class="section-label" style="flex: 1 1 100%; margin: 0 0 20px;">${esc(C(P.formTitulo))}</h2>

    <div style="flex: 1 1 520px;">
      <form class="form-grid" id="form-contacto" name="contacto" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="${a}${R('gracias')}" novalidate>
        <input type="hidden" name="form-name" value="contacto">
        <input type="hidden" name="idioma" value="${L}">
        <p class="hp"><label>${esc(C(P.hp))} <input name="bot-field"></label></p>

        <div class="field">
          <label for="nombre">${esc(C(P.campos.nombre))}</label>
          <input id="nombre" name="nombre" type="text" autocomplete="name" required>
          <span class="error" data-error-for="nombre"></span>
        </div>

        <div class="field">
          <label for="email">${esc(C(P.campos.email))}</label>
          <input id="email" name="email" type="email" autocomplete="email" required>
          <span class="error" data-error-for="email"></span>
        </div>

        <div class="field">
          <label for="empresa">${esc(C(P.campos.empresa))}</label>
          <input id="empresa" name="empresa" type="text" autocomplete="organization">
          <span class="error" data-error-for="empresa"></span>
        </div>

        <div class="field">
          <label for="motivo">${esc(C(P.campos.motivo))}</label>
          <select id="motivo" name="motivo">
${motivos}
          </select>
          <span class="error" data-error-for="motivo"></span>
        </div>

        <div class="field wide">
          <label for="mensaje">${esc(C(P.campos.mensaje))}</label>
          <textarea id="mensaje" name="mensaje" required></textarea>
          <span class="error" data-error-for="mensaje"></span>
        </div>

        <div class="form-actions">
          <button class="btn" type="submit">${esc(C(P.enviar))}</button>
          <span class="form-note">${esc(C(P.nota))}</span>
        </div>

        <div class="form-status" id="form-status" hidden></div>
      </form>
    </div>

    <aside style="flex: 0 1 300px; display: flex; flex-direction: column; gap: 28px;">
      <div>
        <h2 class="section-label" style="margin: 0 0 12px;">${esc(C(P.directoLabel))}</h2>
        <div class="contact-links" style="margin-top: 0;">
          <div class="copy-row">
            <span style="font-size: 16px;">xabier.mauleon@gmail.com</span>
            <button class="copy-btn" data-copy="xabier.mauleon@gmail.com" type="button">${esc(C(P.copiar))}</button>
          </div>
          <div class="copy-row">
            <span style="font-size: 16px; color: var(--ink-soft);">+34 607 323 642</span>
            <button class="copy-btn" data-copy="+34 607 323 642" type="button">${esc(C(P.copiar))}</button>
          </div>
        </div>
      </div>
      <div>
        <h2 class="section-label" style="margin: 0 0 12px;">${esc(C(P.otrosLabel))}</h2>
        <div class="extra-links">
          <a href="https://www.linkedin.com/in/xabiermauleon" target="_blank" rel="noopener">LinkedIn →</a>
          <a href="https://xabiermauleon.myportfolio.com/" target="_blank" rel="noopener">${esc(T('Portfolio Adobe →'))}</a>
        </div>
      </div>
      <div>
        <h2 class="section-label" style="margin: 0 0 12px;">${esc(C(P.buscandoLabel))}</h2>
        <p style="margin: 0; font-size: 15px; line-height: 1.6; color: var(--ink-soft);">${esc(C(P.buscando))}</p>
      </div>
    </aside>

  </section>

${footer(false)}

</main>
`;
  return doc(C(P.titulo), body, false, '', C(P.desc), 'contacto');
}

/* ---------- Gracias ---------- */

function graciasPage() {
  const P = PAGINAS.gracias;
  const a = pa(false);
  const body = `
${nav('', false, otroIdiomaHref(false, 'gracias'))}

<main>
  <section class="hero">
    <h1>${esc(C(P.h1))}</h1>
    <p class="lede">${esc(C(P.texto))}</p>
    <p class="support"><a class="link-azul" href="${a}${R('inicio')}">${esc(C(P.volver))}</a></p>
  </section>
${footer(false)}
</main>
`;
  return doc(C(P.titulo), body, false, '', C(P.texto), 'gracias');
}

/* ---------- Página de caso ---------- */

function casePage(c, index, all) {
  const next = all[(index + 1) % all.length];
  const decisiones = c.decisiones
    .map(
      (d, i) => `      <div class="decision">
        <span class="decision-num">${String(i + 1).padStart(2, '0')}</span>
        <div class="decision-body">
          <p class="decision-que">${esc(C(d.que))}</p>
          <p class="decision-porque"><span class="decision-tag">${esc(T('Por qué'))}</span>${esc(C(d.porque))}</p>
        </div>
      </div>`
    )
    .join('\n');

  const body = `
${nav('trabajo', true, otroIdiomaHref(true, null, c.slug))}

<main>

  <a href="${pa(true)}${R('trabajo')}" class="back-link">${esc(T('← Proyectos'))}</a>

  <section class="case-hero-meta">
    <span class="eyebrow-case">${esc(C(c.category))} · ${esc(c.year)}</span>
    <h1 style="view-transition-name: caso-${c.slug}">${esc(C(c.title))}</h1>
    <p>${esc(C(c.subtitle))}</p>
  </section>

  <div class="case-body">

    <section class="case-block">
      <span class="label">${esc(T('El problema'))}</span>
      <p>${esc(C(c.problema))}</p>
    </section>

    <section class="case-block">
      <span class="label">${esc(T('Las decisiones'))}</span>
      <div class="decision-list">
${decisiones}
      </div>
    </section>

    <section class="case-block">
      <span class="label">${esc(T('El resultado'))}</span>
      <p>${esc(C(c.resultado))}</p>
    </section>

  </div>
${galeria(c.imagenes)}

${c.links && c.links.length ? linkChips(c.links, 'case-links') + '\n' : ''}
  <a href="${next.slug}.html" class="next-case">
    <span class="next-label">${esc(T('Siguiente caso'))}</span>
    <span class="next-title">${esc(C(next.title))} →</span>
  </a>

${footer(true)}

</main>
`;
  return doc(`${C(c.title)} — Xabier Mauleon`, body, true, '', C(c.summary), null, c.slug);
}

/* ---------- Página de proyectos ---------- */

function workPage(all) {
  const filtros = FILTROS.map(f =>
    `      <button type="button" class="filtro${f.k === 'todo' ? ' activo' : ''}" data-cat="${f.k}">${esc(T(f.label))}</button>`
  ).join('\n');

  // El listado mezcla los casos con las piezas de Rich Media, que
  // viven en su propia página pero son una categoría más.
  const entradas = all.map(c => ({
    cat: CLAVE[c.category.es] || 'otros',
    href: R('casos') + c.slug + '.html',
    vt: 'caso-' + c.slug,
    title: C(c.title),
    desc: C(c.summary),
    def: C(c.definicion),
    year: c.year,
    categoria: C(c.category),
    links: c.links
  })).concat(PIEZAS.map(p => ({
    cat: 'richmedia',
    href: R('richmedia') + '#pieza-' + p.n,
    vt: null,
    title: p.cliente + ' — ' + T(p.titulo),
    desc: T(p.formato),
    def: T(p.texto),
    year: p.year,
    categoria: 'Rich Media',
    links: [{ label: T('Ver la pieza'), href: R('richmedia') + '#pieza-' + p.n }]
  })));

  const rows = entradas
    .map((e, i) => `    <article class="work-row" data-cat="${e.cat}">
      <span class="num">${String(i + 1).padStart(2, '0')}</span>
      <div class="main">
        <a href="${e.href}" class="title"${e.vt ? ` style="view-transition-name: ${e.vt}"` : ''}>${esc(e.title)}</a>
        <p class="desc">${esc(e.desc)}</p>
        <p class="definicion">${esc(e.def)}</p>
      </div>
      <div class="meta">${esc(e.year)}<br>${esc(e.categoria)}</div>
${linkChips(e.links, 'row-links')}
    </article>`)
    .join('\n\n');

  const body = `
${nav('trabajo', false, otroIdiomaHref(false, 'trabajo'))}

<main>

  <section class="page-header">
    <h1>${esc(T('Proyectos'))}</h1>
    <p data-contador>${entradas.length}${esc(T(' trabajos, cada uno contado por el problema que resolvía y por qué se tomó cada decisión — no solo por el resultado.'))}</p>
  </section>

  <figure class="banda">
    <img src="${pr(false)}img/mesa-trabajo.jpg" alt="${esc(T('Tarjetas de método extendidas sobre una mesa de trabajo'))}" width="1264" height="420" loading="lazy">
  </figure>

  <div class="filtros" role="group" aria-label="${esc(T('Filtrar proyectos por categoría'))}">
${filtros}
  </div>

  <div class="work-list" data-lista>

${rows}

  </div>

${footer(false)}

</main>
`;
  return doc(T('Proyectos') + ' — Xabier Mauleon', body, false, '', T('Dieciocho trabajos de producto digital, publicidad, editorial y visualización de datos, con las decisiones que hay detrás de cada uno.'), 'trabajo');
}

/* ---------- Página de método ---------- */

function nodoSVG({ x, y, w, h, azul, etiqueta, lineas, nota }) {
  const cx = x + 22;
  const fill = azul ? '#0015FF' : 'none';
  const stroke = azul ? 'none' : 'currentColor';
  const col = azul ? '#FFFFFF' : 'currentColor';
  let out = `          <g class="nodo${azul ? ' nodo-azul' : ''}">
            <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="1"></rect>`;
  let ty = y + 36;
  if (etiqueta) {
    out += `\n            <text x="${cx}" y="${ty}" font-size="12" letter-spacing="0.06em" fill="${col}" opacity="0.7">${esc(T(etiqueta))}</text>`;
    ty += 30;
  }
  lineas.forEach(l => {
    out += `\n            <text x="${cx}" y="${ty}" font-size="${azul ? 17 : 16}" font-weight="700" fill="${col}">${esc(T(l))}</text>`;
    ty += 23;
  });
  if (nota) {
    /* La nota puede venir partida en varias líneas: el SVG no reajusta
       texto solo, así que los saltos se deciden aquí. */
    let ny = ty - 1;
    for (const linea of [].concat(nota)) {
      out += `\n            <text x="${cx}" y="${ny}" font-size="12" fill="${col}" opacity="0.78">${esc(T(linea))}</text>`;
      ny += 16;
    }
  }
  return out + '\n          </g>';
}

function metodoPage() {
  const diagrama = `        <svg class="diagrama-ancho" viewBox="0 0 1180 430" role="img" aria-label="Diagrama del método: los requisitos del negocio y el recorrido real de quien usa el producto entran en conflicto; ese conflicto se resuelve con una regla explícita que se convierte en un sistema de componentes, y el sistema alimenta la producción, que a su vez devuelve correcciones al sistema.">
          <defs>
            <marker id="pf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="currentColor"></path>
            </marker>
            <marker id="pa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="#0015FF"></path>
            </marker>
          </defs>

${nodoSVG({ x: 1, y: 36, w: 248, h: 92, lineas: ['Lo que pide el negocio'], nota: ['Captar, vender, escalar,', 'posicionar en buscadores'] })}
${nodoSVG({ x: 1, y: 300, w: 248, h: 92, lineas: ['Lo que necesita quien lo usa'], nota: ['Comparar, decidir,', 'reservar sin fricción'] })}

          <path d="M249 82 C 300 82, 320 150, 372 176" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#pf)"></path>
          <path d="M249 346 C 300 346, 320 278, 372 252" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#pf)"></path>
          <text x="256" y="150" font-size="12" fill="currentColor" opacity="0.62">${esc(T('requisitos'))}</text>
          <text x="256" y="278" font-size="12" fill="currentColor" opacity="0.62">${esc(T('recorrido real'))}</text>

${nodoSVG({ x: 376, y: 150, w: 276, h: 128, azul: true, etiqueta: '01 · EL CONFLICTO', lineas: ['Las dos cosas chocan.', 'Decido cuál manda'], nota: 'y dejo la regla por escrito.' })}

          <path d="M652 214 L 716 214" fill="none" stroke="#0015FF" stroke-width="1.5" marker-end="url(#pa)"></path>
          <text x="660" y="202" font-size="12" fill="#0015FF">${esc(T('la regla'))}</text>

${nodoSVG({ x: 720, y: 150, w: 200, h: 128, etiqueta: '02 · EL SISTEMA', lineas: ['Tokens,', 'componentes,', 'arquitectura'] })}

          <path d="M920 214 L 976 214" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#pf)"></path>
          <text x="924" y="202" font-size="12" fill="currentColor" opacity="0.62">${esc(T('se aplica'))}</text>

${nodoSVG({ x: 980, y: 150, w: 198, h: 128, etiqueta: '03 · LA PRODUCCIÓN', lineas: ['Pantallas,', 'campañas,', 'mercados'] })}

          <path d="M1079 278 L 1079 350 L 820 350 L 820 279" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4" marker-end="url(#pf)"></path>
          <text x="866" y="372" font-size="12" fill="currentColor" opacity="0.62">${esc(T('lo que falla al desplegar vuelve al sistema, no al parche'))}</text>

          <text x="376" y="410" font-size="12" fill="currentColor" opacity="0.62">${esc(T('IBMot: SEO contra experiencia · Condé Nast: migrar contra reconstruir · Corrupción: rigor contra legibilidad'))}</text>
        </svg>`;

  /* Misma cadena, apilada, para pantallas estrechas. No es el diagrama
     ancho escalado: se redibuja para que el texto conserve su tamaño. */
  const diagramaVertical = `        <svg class="diagrama-alto" viewBox="0 0 380 886" role="img" aria-label="Diagrama del método en vertical: lo que pide el negocio y lo que necesita quien usa el producto entran en conflicto; ese conflicto se resuelve con una regla explícita que se convierte en un sistema, el sistema alimenta la producción y lo que falla al desplegar vuelve al sistema.">
          <defs>
            <marker id="pfv" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="currentColor"></path>
            </marker>
            <marker id="pav" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="#0015FF"></path>
            </marker>
          </defs>

          <text x="36" y="13" font-size="11" letter-spacing="0.06em" fill="currentColor" opacity="0.62">${esc(T('DOS EXIGENCIAS LEGÍTIMAS'))}</text>

${nodoSVG({ x: 36, y: 26, w: 343, h: 92, lineas: ['Lo que pide el negocio'], nota: ['Captar, vender, escalar,', 'posicionar en buscadores'] })}
${nodoSVG({ x: 36, y: 130, w: 343, h: 92, lineas: ['Lo que necesita quien lo usa'], nota: ['Comparar, decidir,', 'reservar sin fricción'] })}

          <path d="M130 222 L 130 258" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#pfv)"></path>
          <text x="142" y="246" font-size="11" fill="currentColor" opacity="0.62">${esc(T('requisitos y recorrido real'))}</text>

${nodoSVG({ x: 36, y: 262, w: 343, h: 128, azul: true, etiqueta: '01 · EL CONFLICTO', lineas: ['Las dos cosas chocan.', 'Decido cuál manda'], nota: 'y dejo la regla por escrito.' })}

          <path d="M130 390 L 130 426" fill="none" stroke="#0015FF" stroke-width="1.5" marker-end="url(#pav)"></path>
          <text x="142" y="414" font-size="11" fill="#0015FF">${esc(T('regla explícita'))}</text>

${nodoSVG({ x: 36, y: 430, w: 343, h: 128, etiqueta: '02 · EL SISTEMA', lineas: ['Tokens, componentes,', 'arquitectura'] })}

          <path d="M130 558 L 130 594" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#pfv)"></path>
          <text x="142" y="582" font-size="11" fill="currentColor" opacity="0.62">${esc(T('se aplica'))}</text>

${nodoSVG({ x: 36, y: 598, w: 343, h: 128, etiqueta: '03 · LA PRODUCCIÓN', lineas: ['Pantallas, campañas,', 'mercados'] })}

          <path d="M240 726 L 240 766 L 18 766 L 18 494 L 32 494" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4" marker-end="url(#pfv)"></path>
          <text x="44" y="788" font-size="11" fill="currentColor" opacity="0.62">${esc(T('lo que falla al desplegar vuelve'))}</text>
          <text x="44" y="804" font-size="11" fill="currentColor" opacity="0.62">${esc(T('al sistema, no al parche'))}</text>

          <text x="36" y="840" font-size="11" fill="currentColor" opacity="0.62">${esc(T('IBMot: SEO contra experiencia'))}</text>
          <text x="36" y="858" font-size="11" fill="currentColor" opacity="0.62">${esc(T('Condé Nast: migrar contra reconstruir'))}</text>
          <text x="36" y="876" font-size="11" fill="currentColor" opacity="0.62">${esc(T('Corrupción: rigor contra legibilidad'))}</text>
        </svg>`;

  const ARGUMENTOS = [
    {
      n: '01',
      t: 'El diseño casi nunca decide, y por eso los productos se rompen.',
      como: 'En la mayoría de las empresas el diseño entra cuando las decisiones que importan ya están tomadas en otra reunión. Lo que pide el negocio y lo que necesita quien usa el producto chocan igual, pero el choque se resuelve solo, por inercia o por quien grita más fuerte, y nadie lo escribe en ningún sitio.',
      deberia: 'El diseño debería ser el sitio donde ese choque se nombra en voz alta y se resuelve con una regla explícita. No se trata de que mande el diseño: se trata de que la decisión exista, tenga dueño y esté escrita. En IBMot la regla fue que mandaba el posicionamiento sobre la experiencia, y es una decisión incómoda que había que poder defender por escrito.'
    },
    {
      n: '02',
      t: 'Un sistema de diseño no es una librería de botones.',
      como: 'Se confunde el sistema con su inventario. Se documentan los componentes, los colores y los espaciados, y se da por hecho que eso es el sistema. Luego llega un caso que nadie previó, no hay ninguna regla que lo cubra, y cada equipo improvisa el suyo. A los seis meses hay cinco maneras de hacer lo mismo.',
      deberia: 'Un sistema es el conjunto de reglas que explican por qué los componentes son como son. La regla va antes que el componente, y es lo único que sirve cuando aparece el caso que no estaba previsto. En las cinco tiendas de Condé Nast lo que permitió abrir Oriente Medio e India sin rehacer el producto no fue la librería: fue haber decidido antes qué era negociable en cada mercado y qué no.'
    },
    {
      n: '03',
      t: 'Lo que falla al desplegar vuelve al sistema, no al parche.',
      como: 'La presión de entrega empuja siempre a arreglar la pantalla concreta que está fallando hoy. Es más rápido, se nota menos y cierra el ticket. Cada parche es una excepción que nadie documenta, y la suma de excepciones es exactamente lo que convierte un sistema en un montón de casos particulares.',
      deberia: 'Toda corrección tiene que subir al sistema aunque cueste más. Si algo se rompe al desplegarlo, lo que está mal no es la pantalla, es la regla que la generó. Es la flecha discontinua del diagrama de arriba, y es la parte del método que más disciplina exige, porque el beneficio no se ve en la entrega de esta semana sino en la de dentro de un año.'
    }
  ];

  const CONFLICTOS = [
    { slug: 'ibmot', proy: 'IBMot Experience', choque: 'SEO contra experiencia', regla: 'Manda el buscador: si la página no existe como URL propia, la visita no ocurre y la calidad de la interfaz da igual.' },
    { slug: 'suscripciones-conde-nast', proy: 'Condé Nast — Suscripciones', choque: 'Migrar contra reconstruir', regla: 'Se reconstruye: la base heredada imponía las reglas de un modelo que ya no se vendía.' },
    { slug: 'corrupcion', proy: 'Corrupción en España', choque: 'Rigor contra legibilidad', regla: 'Manda la lectura: un dato que no se entiende dentro del gráfico no está publicado, está escondido.' }
  ];

  const argumentos = ARGUMENTOS.map(a => `    <article class="argumento">
      <div class="argumento-enunciado">
        <span class="num">${a.n}</span>
        <h3>${esc(T(a.t))}</h3>
      </div>
      <div class="argumento-cuerpo">
        <div class="parte">
          <span class="parte-label">${esc(T('Cómo es'))}</span>
          <p>${esc(T(a.como))}</p>
        </div>
        <div class="parte parte-regla">
          <span class="parte-label">${esc(T('Cómo debería ser'))}</span>
          <p>${esc(T(a.deberia))}</p>
        </div>
      </div>
    </article>`).join('\n\n');

  const conflictos = CONFLICTOS.map(c => `      <a class="conflicto-bloque" href="${R('casos')}${c.slug}.html">
        <span class="proyecto">${esc(T(c.proy))}</span>
        <span class="choque">${esc(T(c.choque))}</span>
        <span class="regla">${esc(T(c.regla))}</span>
        <span class="cta">${esc(T('Ver el caso →'))}</span>
      </a>`).join('\n');

  const body = `
${nav('metodo', false, otroIdiomaHref(false, 'metodo'))}

<main>

  <figure class="banda banda-alta">
    <img src="${pr(false)}img/apuntes.jpg" alt="${esc(T('Un portátil con una interfaz abierta, un cuaderno y un bolígrafo sobre una mesa'))}" width="1264" height="460" loading="eager">
  </figure>

  <section class="metodo">
    <div class="metodo-head">
      <h1>${esc(T('Cómo trabajo'))}</h1>
      <span class="metodo-eyebrow">${esc(T('El conflicto es el sitio donde se diseña'))}</span>
    </div>
    <p class="metodo-lede">${esc(T('Casi ningún proyecto falla por falta de ideas. Falla porque dos cosas legítimas se estorban y nadie decide cuál manda. Esta página explica dónde creo que se toman de verdad las decisiones de diseño, por qué casi siempre se toman en el sitio equivocado, y cómo intento corregirlo.'))}</p>
    <figure>
      <div class="diagrama-scroll">
${diagrama}
${diagramaVertical}
      </div>
      <figcaption>${esc(T('El punto azul es donde ocurre el trabajo: no en las pantallas, sino en la decisión que las ordena.'))}</figcaption>
    </figure>
  </section>

  <section class="argumentos">
    <div class="conflictos-head">
      <h2>${esc(T('Cómo funciona el diseño y cómo debería funcionar'))}</h2>
      <span>${esc(T('Tres cosas que he aprendido discutiendo'))}</span>
    </div>

${argumentos}

  </section>

  <section class="metodo-resumen metodo-cierre">
    <div class="metodo-head">
      <h2>${esc(T('Dónde ha pasado esto de verdad'))}</h2>
      <span class="metodo-eyebrow">${esc(T('Tres conflictos y su regla'))}</span>
    </div>
    <div class="conflicto-grid">
${conflictos}
    </div>
  </section>

${footer(false)}

</main>
`;
  return doc(T('Cómo trabajo') + ' — Xabier Mauleon', body, false, '', T('Cómo funciona el diseño de producto y cómo debería funcionar: el conflicto como el sitio donde se decide.'), 'metodo');
}

/* ---------- Página de Rich Media ---------- */

const PIEZAS = [
  {
    n: '01', cliente: 'AD × Cartier', titulo: 'Clash de Cartier', formato: 'Shopping Collection · 2019', year: '2019', tipo: 'shopping',
    texto: 'Vídeo de campaña de alta factura más galería interactiva de joyería en oro rosa. La unidad eleva el producto a objeto de deseo dentro del universo aspiracional de AD.',
    chips: ['Mobile', 'Vídeo + carrusel', 'CTA shoppable']
  },
  {
    n: '02', cliente: 'Vanity Fair × Dior', titulo: 'Skin — J’adore', formato: 'Skin full-wrap · 2020', year: '2020', tipo: 'skin',
    texto: 'El formato de mayor impacto del ecosistema: la creatividad envuelve la página editorial entera, con vídeo arriba y las botellas doradas flanqueando el contenido. Enmarca la lectura en vez de interrumpirla.',
    chips: ['Desktop', 'Skin', 'Full-wrap']
  },
  {
    n: '03', cliente: 'Vogue × Massimo Dutti', titulo: 'Nueva Colección', formato: 'Shopping Collection · 2019', year: '2019', tipo: 'shopping',
    texto: 'Abre con vídeo atmosférico en blanco y negro y sigue con la colección navegable desde la propia unidad. El tono cinematográfico se alinea con la sofisticación editorial de Vogue.',
    chips: ['Mobile', 'Vídeo + carrusel', 'CTA shoppable']
  },
  {
    n: '04', cliente: 'Glamour × Dior', titulo: 'Rouge Dior', formato: 'Shopping Collection · 2019', year: '2019', tipo: 'shopping',
    texto: 'Vídeo de producto a pantalla completa con galería de miniaturas inferior: toda la colección de labiales explorable sin salir del entorno editorial.',
    chips: ['Mobile', 'Vídeo + carrusel', 'CTA shoppable']
  },
  {
    n: '05', cliente: 'AD × Cartier', titulo: 'Les Épures de Parfum', formato: 'Carrusel interactivo · 2019', year: '2019', tipo: 'carrusel',
    texto: 'Navegación táctil o de ratón entre las fragancias de la colección, con compra directa desde la unidad y el tono de lujo de ambas marcas intacto.',
    chips: ['Desktop', 'Carrusel', 'CTA shoppable']
  }
];

/* Mientras no haya captura real de cada unidad, la tarjeta muestra
   un esquema del formato. Dice más que un rectángulo negro y no
   finge ser un vídeo que no existe. */
function esquema(tipo) {
  const marco = '<rect x="0.5" y="0.5" width="279" height="174" fill="none" stroke="currentColor" stroke-opacity="0.35"/>';
  const cuerpos = {
    shopping: `
        <rect x="104" y="14" width="72" height="147" fill="none" stroke="currentColor" stroke-opacity="0.8"/>
        <rect x="108" y="18" width="64" height="72" fill="currentColor" fill-opacity="0.22"/>
        <polygon points="132,46 148,54 132,62" fill="currentColor" fill-opacity="0.9"/>
        <rect x="108" y="96" width="19" height="26" fill="currentColor" fill-opacity="0.35"/>
        <rect x="130" y="96" width="19" height="26" fill="currentColor" fill-opacity="0.22"/>
        <rect x="152" y="96" width="19" height="26" fill="currentColor" fill-opacity="0.22"/>
        <rect x="108" y="132" width="64" height="12" fill="currentColor" fill-opacity="0.55"/>`,
    skin: `
        <rect x="14" y="14" width="66" height="147" fill="currentColor" fill-opacity="0.3"/>
        <rect x="200" y="14" width="66" height="147" fill="currentColor" fill-opacity="0.3"/>
        <rect x="88" y="14" width="104" height="44" fill="currentColor" fill-opacity="0.22"/>
        <polygon points="132,28 148,36 132,44" fill="currentColor" fill-opacity="0.9"/>
        <rect x="88" y="66" width="104" height="8" fill="currentColor" fill-opacity="0.5"/>
        <rect x="88" y="80" width="104" height="5" fill="currentColor" fill-opacity="0.25"/>
        <rect x="88" y="90" width="104" height="5" fill="currentColor" fill-opacity="0.25"/>
        <rect x="88" y="100" width="76" height="5" fill="currentColor" fill-opacity="0.25"/>
        <rect x="88" y="116" width="104" height="45" fill="currentColor" fill-opacity="0.12"/>`,
    carrusel: `
        <rect x="26" y="40" width="64" height="95" fill="currentColor" fill-opacity="0.16"/>
        <rect x="108" y="28" width="64" height="119" fill="currentColor" fill-opacity="0.32"/>
        <rect x="190" y="40" width="64" height="95" fill="currentColor" fill-opacity="0.16"/>
        <path d="M100 88 L84 88 M88 82 L82 88 L88 94" fill="none" stroke="currentColor" stroke-opacity="0.8" stroke-width="1.5"/>
        <path d="M180 88 L196 88 M192 82 L198 88 L192 94" fill="none" stroke="currentColor" stroke-opacity="0.8" stroke-width="1.5"/>
        <rect x="116" y="124" width="48" height="10" fill="currentColor" fill-opacity="0.55"/>`
  };
  return `<svg viewBox="0 0 280 175" role="img" aria-label="${esc(T('Esquema del formato'))}">${marco}${cuerpos[tipo]}\n      </svg>`;
}

function richMediaPage() {
  const piezas = PIEZAS.map(p => `    <article class="pieza" id="pieza-${p.n}">
      <div class="pieza-visual">${esquema(p.tipo)}<span class="pieza-formato-nota">${esc(T('Esquema del formato'))}</span></div>
      <div class="pieza-texto">
        <span class="pieza-num">${p.n}</span>
        <span class="pieza-cliente">${esc(p.cliente)}</span>
        <h2>${esc(T(p.titulo))}</h2>
        <p class="pieza-formato">${esc(T(p.formato))}</p>
        <p>${esc(T(p.texto))}</p>
        <div class="pieza-chips">${p.chips.map(c => `<span>${esc(T(c))}</span>`).join('')}</div>
      </div>
    </article>`).join('\n\n');

  const body = `
${nav('richmedia', false, otroIdiomaHref(false, 'richmedia'))}

<main>

  <section class="page-header">
    <span class="eyebrow-case">${esc(T('Experiencias interactivas · Tecnología Celtra'))}</span>
    <h1>Rich Media</h1>
    <p>${esc(T('Fundé el departamento de Rich Media de la agencia interna de Condé Nast desde cero: 250.000 € de facturación el primer año y más de cincuenta campañas anuales. Estas son piezas construidas con Celtra —el estándar de la industria en Rich Media y optimización dinámica de creatividades— para Cartier, Dior y Massimo Dutti en los entornos editoriales de AD, Vogue, Vanity Fair y Glamour.'))}</p>
  </section>

  <div class="tag-list">
    <span class="tag">Celtra</span>
    <span class="tag">Rich Media</span>
    <span class="tag">DCO</span>
    <span class="tag">${esc(T('Publicidad interactiva'))}</span>
    <span class="tag">${esc(T('Animación'))}</span>
    <span class="tag">${esc(T('Vídeo'))}</span>
  </div>

  <div class="piezas">

${piezas}

  </div>

${footer(false)}

</main>
`;
  return doc('Rich Media — Xabier Mauleon', body, false, '', T('Cinco formatos de publicidad interactiva construidos sobre Celtra para las cabeceras de Condé Nast.'), 'richmedia');
}

/* ---------- Escritura ---------- */

/* Se escribe un árbol por idioma: el castellano en public/ y el inglés
   en public/en/. Los archivos comunes —CSS, JS, imágenes, CV— no se
   duplican: viven en public/ y cada árbol los enlaza hacia arriba. */

function escribir(rel, contenido) {
  const destino = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, contenido, 'utf8');
}

/* Se calculan antes de escribir ninguna pagina, porque cada una las
   incrusta en su cabecera. */
/* public/ se reconstruye entero en cada compilacion, asi que no se
   versiona: lo genera Netlify al desplegar. Lo que SI se versiona es
   src/, que son los archivos que se mantienen a mano —hoja de estilos,
   script, imagenes, CV— y que se copian aqui antes de escribir nada. */
function copiar(origen, destino) {
  fs.mkdirSync(destino, { recursive: true });
  for (const entrada of fs.readdirSync(origen, { withFileTypes: true })) {
    const de = path.join(origen, entrada.name);
    const a = path.join(destino, entrada.name);
    if (entrada.isDirectory()) copiar(de, a);
    else fs.copyFileSync(de, a);
  }
}

fs.rmSync(ROOT, { recursive: true, force: true });
copiar(FUENTES, ROOT);
console.log('public/ reconstruido desde cero · src/ copiado');

V.css = huella('styles.css');
V.js = huella('script.js');

let escritos = 0;

for (const idioma of VISIBLES) {
  L = idioma;
  const base = BASE[idioma];

  // Limpia casos que ya no existen en los datos
  const dirCasos = path.join(ROOT, base + RUTA[idioma].casos);
  if (fs.existsSync(dirCasos)) {
    const vigentes = cases.map(c => c.slug + '.html');
    for (const f of fs.readdirSync(dirCasos)) {
      if (f.endsWith('.html') && !vigentes.includes(f)) fs.unlinkSync(path.join(dirCasos, f));
    }
  }

  cases.forEach((c, i) => {
    escribir(base + RUTA[idioma].casos + c.slug + '.html', casePage(c, i, cases));
    escritos += 1;
  });

  escribir(base + RUTA[idioma].inicio, inicioPage());
  escribir(base + RUTA[idioma].trabajo, workPage(cases));
  escribir(base + RUTA[idioma].metodo, metodoPage());
  escribir(base + RUTA[idioma].richmedia, richMediaPage());
  escribir(base + RUTA[idioma].estudio, estudioPage());
  escribir(base + RUTA[idioma].contacto, contactoPage());
  escribir(base + RUTA[idioma].gracias, graciasPage());
  escritos += 7;
}

L = 'es';

/* ---------- Piezas de publicación ---------- */

function pagina(titulo, h1, texto, extra) {
  const body = `
${nav('', false)}

<main>
  <section class="hero">
    <h1>${esc(h1)}</h1>
    <p class="lede">${texto}</p>
    ${extra || ''}
  </section>
${footer(false)}
</main>
`;
  return doc(titulo, body, false, '', texto.replace(/<[^>]+>/g, ''), 'inicio');
}

escribir('404.html', pagina(
  'Página no encontrada — Xabier Mauleon',
  'Esta página no existe.',
  'Puede que el enlace esté antiguo o que yo haya movido algo de sitio.' +
    (PUBLICAR_INGLES ? ' <span lang="en">This page does not exist — the link may be out of date.</span>' : ''),
  '<p class="support"><a class="link-azul" href="/trabajo.html">Ver los proyectos →</a>' +
    (PUBLICAR_INGLES ? ' &nbsp; <a class="link-azul" lang="en" href="/en/projects.html">See the projects →</a>' : '') + '</p>'
));

/* robots.txt y sitemap.xml */
fs.writeFileSync(path.join(ROOT, 'robots.txt'),
  'User-agent: *\nAllow: /\n\nSitemap: ' + SITIO + '/sitemap.xml\n', 'utf8');

const HOY = new Date().toISOString().slice(0, 10);
const CLAVES = [
  { k: 'inicio', p: '1.0' },
  { k: 'trabajo', p: '0.9' },
  { k: 'metodo', p: '0.8' },
  { k: 'richmedia', p: '0.7' },
  { k: 'estudio', p: '0.7' },
  { k: 'contacto', p: '0.6' }
];

/* Cada URL declara sus alternativas de idioma también en el sitemap:
   es la señal que Google prefiere para sitios con varios idiomas. */
function entrada(lang, clave, slug, prioridad) {
  const alt = VISIBLES.length < 2 ? '' : '\n' + VISIBLES
    .map(lg => '      <xhtml:link rel="alternate" hreflang="' + lg + '" href="' + url(lg, clave, slug) + '"/>')
    .join('\n');
  return '  <url>\n    <loc>' + url(lang, clave, slug) + '</loc>' + alt +
         '\n    <lastmod>' + HOY + '</lastmod>\n    <priority>' + prioridad + '</priority>\n  </url>';
}

const urls = [];
for (const lang of VISIBLES) {
  for (const { k, p } of CLAVES) urls.push(entrada(lang, k, null, p));
  for (const c of cases) urls.push(entrada(lang, null, c.slug, '0.8'));
}

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
  urls.join('\n') + '\n</urlset>\n', 'utf8');

fs.writeFileSync(path.join(RAIZ_REPO, 'netlify.toml'), `# Netlify compila el sitio en cada despliegue ejecutando el generador.
# Así lo publicado siempre sale de lo versionado: no se puede subir un
# cambio en los datos y olvidarse de reconstruir.
[build]
  publish = "public"
  command = "node build/build.js"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"

[[headers]]
  for = "/img/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=604800"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=604800"

# Direcciones limpias
[[redirects]]
  from = "/proyectos"
  to = "/trabajo.html"
  status = 301

[[redirects]]
  from = "/cv"
  to = "/cv-xabier-mauleon.pdf"
  status = 301

[[redirects]]
  from = "/contacto"
  to = "/contacto.html"
  status = 301

[[redirects]]
  from = "/en"
  to = "/en/index.html"
  status = 301
`, 'utf8');

console.log('Escritas ' + escritos + ' páginas. Idiomas publicados: ' + VISIBLES.join(', ') +
  (PUBLICAR_INGLES ? '' : '  (el inglés está generado pero NO se publica: PUBLICAR_INGLES = false)'));
console.log('Huellas: styles.css' + V.css + ' · script.js' + V.js);
console.log('Publicación: gracias.html, 404.html, robots.txt, sitemap.xml (' + urls.length + ' urls), netlify.toml');

if (faltan.size) {
  console.warn('\nSIN TRADUCIR (' + faltan.size + '):');
  for (const f of Array.from(faltan).slice(0, 40)) console.warn('  · ' + f);
  if (faltan.size > 40) console.warn('  … y ' + (faltan.size - 40) + ' más');
}
