(function () {
  /* ---------- Menú desplegable ----------
     Una sola capa por página. Se abre con la hamburguesa y se
     cierra con la X, con Escape, al pinchar cualquier enlace y
     al pinchar fuera del panel. Mientras está abierto se bloquea
     el scroll del documento para que no se mueva el fondo.       */
  var menu = document.getElementById('menu');
  var abrir = document.querySelector('[data-menu-abrir]');

  if (menu && abrir) {
    var cerrarBtn = menu.querySelector('[data-menu-cerrar]');

    function estado(abierto) {
      /* Al abrir el menú la cabecera vuelve siempre. Con un clic real ya
         ocurriría —el pointerdown la despierta—, pero no quiero que la
         garantía dependa de qué evento llegue primero. */
      if (abierto) {
        var cab = document.querySelector('.site-header');
        if (cab) cab.classList.remove('oculta');
      }
      menu.classList.toggle('abierto', abierto);
      menu.setAttribute('aria-hidden', abierto ? 'false' : 'true');
      abrir.setAttribute('aria-expanded', abierto ? 'true' : 'false');
      document.body.classList.toggle('menu-abierto', abierto);
      if (abierto) {
        var primero = menu.querySelector('.menu-nav .fila');
        if (primero) primero.focus({ preventScroll: true });
      } else {
        abrir.focus({ preventScroll: true });
      }
    }

    abrir.addEventListener('click', function () { estado(true); });
    if (cerrarBtn) cerrarBtn.addEventListener('click', function () { estado(false); });

    menu.addEventListener('click', function (e) {
      if (e.target === menu) estado(false);
      if (e.target.closest && e.target.closest('a')) estado(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('abierto')) estado(false);
    });
  }

  /* ---------- Copiar al portapapeles ---------- */
  function fallbackCopy(value) {
    var ta = document.createElement('textarea');
    ta.value = value;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  }

  function copiar(value, done) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).then(function () { done(true); }).catch(function () {
        fallbackCopy(value);
        done(true);
      });
    } else {
      fallbackCopy(value);
      done(true);
    }
  }

  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    var original = btn.textContent;
    btn.addEventListener('click', function () {
      copiar(btn.getAttribute('data-copy'), function () {
        btn.textContent = 'Copiado';
        setTimeout(function () { btn.textContent = original; }, 1600);
      });
    });
  });

  /* ---------- Formulario de contacto ---------- */
  var form = document.getElementById('form-contacto');
  if (!form) return;

  var status = document.getElementById('form-status');
  var campos = ['nombre', 'email', 'mensaje'];

  function pintarError(id, msg) {
    var span = form.querySelector('[data-error-for="' + id + '"]');
    if (span) span.textContent = msg || '';
  }

  function validar() {
    var ok = true;
    campos.forEach(function (id) {
      var el = document.getElementById(id);
      var v = (el.value || '').trim();
      if (!v) {
        pintarError(id, 'Este campo es obligatorio');
        ok = false;
      } else if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        pintarError(id, 'Revisa la dirección de correo');
        ok = false;
      } else {
        pintarError(id, '');
      }
    });
    return ok;
  }

  campos.forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('input', function () { pintarError(id, ''); });
  });

  // En una vista previa el envío no tiene servidor detrás: se valida,
  // se compone el mensaje y se deja listo para copiar.
  var enPreview = location.protocol === 'blob:' ||
                  location.hostname.indexOf('claude') !== -1 ||
                  location.hostname === '' ||
                  location.protocol === 'file:';

  form.addEventListener('submit', function (e) {
    if (!validar()) {
      e.preventDefault();
      var primero = form.querySelector('.error:not(:empty)');
      if (primero) {
        var id = primero.getAttribute('data-error-for');
        var el = document.getElementById(id);
        if (el) el.focus();
      }
      return;
    }

    if (!enPreview) return; // desplegado: lo envía Netlify

    e.preventDefault();
    var datos = {
      nombre: document.getElementById('nombre').value.trim(),
      email: document.getElementById('email').value.trim(),
      empresa: (document.getElementById('empresa') || {}).value || '',
      motivo: (document.getElementById('motivo') || {}).value || '',
      mensaje: document.getElementById('mensaje').value.trim()
    };
    var texto =
      'De: ' + datos.nombre + ' <' + datos.email + '>\n' +
      (datos.empresa ? 'Empresa: ' + datos.empresa + '\n' : '') +
      'Motivo: ' + datos.motivo + '\n\n' +
      datos.mensaje;

    copiar(texto, function () {
      status.hidden = false;
      status.innerHTML = 'Esta es una vista previa, así que el formulario todavía no envía nada. ' +
        'He copiado tu mensaje al portapapeles: pégalo en un correo a <strong>xabier.mauleon@gmail.com</strong>.';
      status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
})();

/* ------------------------------------------------------------
   Filtros de la página de proyectos.
   Al activar una categoría cambia el extremo inferior del
   degradado de fondo de toda la página (--grad-b), que está
   registrado con @property en styles.css y por eso se puede
   animar como si fuera un color normal.
   ------------------------------------------------------------ */
(function () {
  const botones = Array.from(document.querySelectorAll('.filtro'));
  if (!botones.length) return;

  const filas = Array.from(document.querySelectorAll('.work-row'));
  const contador = document.querySelector('[data-contador]');
  /* Este archivo lo comparten las dos versiones del sitio, así que los
     textos del contador salen del idioma declarado en <html lang>. */
  const EN = document.documentElement.lang === 'en';

  const ETIQUETA = EN ? {
    todo: null,
    uxui: 'Digital UX/UI',
    publicidad: 'Advertising',
    richmedia: 'Rich Media',
    editorial: 'Editorial',
    datos: 'Data'
  } : {
    todo: null,
    uxui: 'UX/UI Digital',
    publicidad: 'Publicidad',
    richmedia: 'Rich Media',
    editorial: 'Editorial',
    datos: 'Datos'
  };

  // Rich Media son piezas publicitarias, no proyectos: el contador
  // usa el sustantivo que corresponde a cada categoría.
  const SUSTANTIVO = EN
    ? { richmedia: ['piece', 'pieces'] }
    : { richmedia: ['pieza', 'piezas'] };
  const GENERICO = EN ? ['project', 'projects'] : ['proyecto', 'proyectos'];
  const TODO_TXT = EN
    ? ' projects, each told through the problem it solved and why each decision was taken — not just through the result.'
    : ' trabajos, cada uno contado por el problema que resolvía y por qué se tomó cada decisión — no solo por el resultado.';
  const EN_TXT = EN ? ' in ' : ' en ';

  function aplicar(cat, empujarHash) {
    if (!(cat in ETIQUETA)) cat = 'todo';

    document.body.dataset.filtro = cat;

    let visibles = 0;
    filas.forEach(fila => {
      const dentro = cat === 'todo' || fila.dataset.cat === cat;
      fila.hidden = !dentro;
      if (dentro) visibles += 1;
    });

    // Renumera lo que queda a la vista, para que el listado
    // filtrado no empiece en 03.
    let n = 0;
    filas.forEach(fila => {
      if (fila.hidden) return;
      n += 1;
      const num = fila.querySelector('.num');
      if (num) num.textContent = String(n).padStart(2, '0');
    });

    botones.forEach(b => b.classList.toggle('activo', b.dataset.cat === cat));

    if (contador) {
      const par = SUSTANTIVO[cat] || GENERICO;
      const palabra = visibles === 1 ? par[0] : par[1];
      contador.textContent = cat === 'todo'
        ? visibles + TODO_TXT
        : visibles + ' ' + palabra + EN_TXT + ETIQUETA[cat] + '.';
    }

    if (empujarHash) {
      const destino = cat === 'todo' ? ' ' : '#' + cat;
      history.replaceState(null, '', destino);
    }
  }

  botones.forEach(b => {
    b.addEventListener('click', () => aplicar(b.dataset.cat, true));
  });

  function desdeHash() {
    return (location.hash || '').replace('#', '') || 'todo';
  }

  aplicar(desdeHash(), false);

  /* Si ya estás en esta página y eliges un submenú del menú, el navegador
     no recarga: solo cambia el ancla. Sin escuchar ese cambio, el enlace
     parecía no hacer nada. Además llevamos la vista al listado, porque si
     venías de más abajo el filtro se aplicaba fuera de tu campo de visión. */
  window.addEventListener('hashchange', function () {
    aplicar(desdeHash(), false);
    var listado = document.querySelector('.filtros');
    if (!listado) return;
    var suave = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    listado.scrollIntoView({ behavior: suave ? 'smooth' : 'auto', block: 'start' });
  });
})();

/* ------------------------------------------------------------
   Aparición de los módulos al entrar en pantalla.

   Tres decisiones de oficio, por si hay que revisarlas:
   1. La clase la pone el JS en <html>. Si el JS falla, no hay
      nada oculto: el site se ve entero.
   2. Solo una vez. Se deja de observar en cuanto aparece, así no
      hay parpadeo al subir y bajar.
   3. Lo que está sobre la línea de flotación —cabecera, retrato,
      titular— no se anima. Retrasar lo primero que se lee es un
      coste sin beneficio.
   ------------------------------------------------------------ */
(function () {
  const raiz = document.documentElement;
  const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (quieto || !('IntersectionObserver' in window)) return;

  const SELECTOR = [
    'main > section',
    'main > figure',
    'main > .work-list > .work-row',
    'main > .piezas > .pieza',
    'main > .case-body > .case-block',
    'main > .filtros',
    'main > .next-case',
    'main > .site-footer'
  ].join(',');

  const fuera = ['.hero', '.page-header', '.site-header'];

  const objetivos = Array.from(document.querySelectorAll(SELECTOR))
    .filter(n => !fuera.some(sel => n.matches(sel)));

  if (!objetivos.length) return;
  raiz.classList.add('js-anim');

  objetivos.forEach(n => n.setAttribute('data-aparece', ''));

  // Los hijos de una rejilla entran escalonados, no todos de golpe
  objetivos.forEach(n => {
    const hijos = n.querySelectorAll(':scope > .featured-grid > *, :scope > .conflicto-grid > *, :scope > .conflictos > *');
    hijos.forEach((h, i) => {
      h.setAttribute('data-aparece', '');
      h.style.setProperty('--retraso', (i * 70) + 'ms');
    });
  });

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      observador.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

  document.querySelectorAll('[data-aparece]').forEach(n => {
    // lo que ya está en pantalla al cargar aparece sin esperar
    const caja = n.getBoundingClientRect();
    if (caja.top < window.innerHeight * 0.9) { n.classList.add('visible'); return; }
    observador.observe(n);
  });
})();

/* ------------------------------------------------------------
   Cabecera que se retira sola
   Se esconde tras 2,5 s sin actividad y vuelve con cualquier señal.
   Dos seguros: no se esconde nunca con el menú abierto, ni con el foco
   dentro de ella. El botón del menú es la única forma de navegar, así
   que dejarlo inalcanzable a alguien que va con teclado sería un fallo
   de accesibilidad, no un detalle de estilo.
   ------------------------------------------------------------ */
(function () {
  var cabecera = document.querySelector('.site-header');
  if (!cabecera) return;
  var capa = document.getElementById('menu');

  var ESPERA = 2500;
  var reloj = null;

  function retenida() {
    return (capa && capa.classList.contains('abierto')) ||
           cabecera.contains(document.activeElement);
  }

  function esconder() {
    if (retenida()) { programar(); return; }
    cabecera.classList.add('oculta');
  }

  function programar() {
    clearTimeout(reloj);
    reloj = setTimeout(esconder, ESPERA);
  }

  function despertar() {
    cabecera.classList.remove('oculta');
    programar();
  }

  ['scroll', 'wheel', 'pointermove', 'pointerdown', 'touchstart', 'keydown', 'focusin']
    .forEach(function (evento) {
      window.addEventListener(evento, despertar, { passive: true });
    });

  /* Si la pestaña pasa a segundo plano, el contador no debe seguir:
     al volver, la cabecera estaría escondida sin que nadie haya hecho nada. */
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) clearTimeout(reloj); else despertar();
  });

  programar();
})();
