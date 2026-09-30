/* Contenido de inicio, sobre mí y contacto.
   Cada texto lleva sus dos idiomas juntos: si añades o cambias uno en
   castellano y no tocas el inglés, la compilación lo avisa. */

const d = (es, en) => ({ es, en });

module.exports = {

  inicio: {
    titulo: d('Xabier Mauleon — UX Design Lead · Art Director',
              'Xabier Mauleon — UX Design Lead · Art Director'),
    desc: d('Book de Xabier Mauleon, UX Design Lead y Art Director en Madrid. Veinte años dirigiendo diseño entre medios de moda, agencia y producto digital.',
            'Portfolio of Xabier Mauleon, UX Design Lead and Art Director in Madrid. Twenty years directing design across fashion media, agency and digital product.'),
    retratoAlt: d('Retrato de Xabier Mauleon sosteniendo un alambre curvado frente a la cara',
                  'Portrait of Xabier Mauleon holding a bent wire in front of his face'),
    estado: d('Disponible — Q4 2026', 'Available — Q4 2026'),
    h1a: d('La forma es el final', 'Form is the end'),
    h1b: d('de un razonamiento.', 'of a line of reasoning.'),
    lede: d('No el principio. Veinte años dirigiendo diseño —de las marcas globales de Condé Nast a proyectos propios de producto y visualización de datos— para acabar en la misma conclusión: lo que se ve es la consecuencia de lo que se decidió antes, y casi nunca al revés.',
            'Not the beginning. Twenty years directing design — from Condé Nast’s global titles to my own work in product and data visualisation — all arriving at the same conclusion: what you see is the consequence of what was decided earlier, and almost never the other way round.'),
    apoyo: d('UX/UI Design Lead · Art Director · Strategic Design — Madrid.',
             'UX/UI Design Lead · Art Director · Strategic Design — Madrid.'),

    destacadoLabel: d('Trabajo destacado', 'Selected work'),
    destacadoLink: d('Ver los 13 proyectos →', 'See all 13 projects →'),
    verCaso: d('Ver el caso →', 'Read the case →'),
    tarjetas: [
      { slug: 'ibmot',
        titulo: d('IBMot Experience', 'IBMot Experience'),
        texto: d('Un producto SaaS completo: catálogo de 200 páginas indexables, back office de gestión y el cuadro de mando financiero que el negocio usa cada mes.',
                 'A complete SaaS product: a 200-page indexable catalogue, a management back office, and the financial dashboard the business runs on every month.') },
      { slug: 'corrupcion',
        titulo: d('Corrupción en la Democracia Española', 'Corruption in Spanish Democracy'),
        texto: d('Cuarenta y cuatro años de sentencias traducidos al lenguaje visual de Minard, con las cifras en euros de 2026.',
                 'Forty-four years of court rulings rendered in Minard’s visual language, with the figures in 2026 euros.') },
      { slug: 'suscripciones-conde-nast',
        titulo: d('Condé Nast — Suscripciones', 'Condé Nast — Subscriptions'),
        texto: d('Una base de datos nueva desde cero, cinco cabeceras sobre Shopify Plus y un checkout de siete pasos reducido a dos.',
                 'A new database built from scratch, five titles on Shopify Plus, and a seven-step checkout cut to two.') }
    ],

    bandaAlt: d('Edificio de oficinas de vidrio y celosía vertical vista desde abajo',
                'Glass office building with a vertical louvre screen, seen from below'),

    metodoH2: d('Cómo trabajo', 'How I work'),
    metodoEyebrow: d('El conflicto es el sitio donde se diseña', 'Conflict is where design happens'),
    metodoLede: d('Casi ningún proyecto falla por falta de ideas. Falla porque dos cosas legítimas se estorban y nadie decide cuál manda. Mi trabajo empieza ahí: encontrar ese choque, resolverlo con una regla explícita y convertirla en un sistema que aguante cuando el proyecto crece.',
                  'Hardly any project fails for lack of ideas. It fails because two legitimate things get in each other’s way and nobody decides which one wins. That is where my work starts: find the clash, settle it with an explicit rule, and turn that rule into a system that holds when the project grows.'),
    conflictos: [
      { proyecto: d('IBMot Experience', 'IBMot Experience'),
        choque: d('SEO contra experiencia', 'SEO against experience'),
        regla: d('Si la página no existe como URL propia, la visita no ocurre. Manda el buscador.',
                 'If the page has no URL of its own, the visit never happens. The search engine wins.') },
      { proyecto: d('Condé Nast', 'Condé Nast'),
        choque: d('Migrar contra reconstruir', 'Migrate against rebuild'),
        regla: d('La base heredada imponía las reglas de un modelo muerto. Se reconstruye desde cero.',
                 'The inherited database imposed the rules of a dead business model. Rebuild from scratch.') },
      { proyecto: d('Corrupción', 'Corruption'),
        choque: d('Rigor contra legibilidad', 'Rigour against legibility'),
        regla: d('Un dato que no se entiende dentro del gráfico no está publicado. Manda la lectura.',
                 'A figure you cannot understand inside the chart is not published. Reading wins.') }
    ],
    metodoLink: d('Cómo trabajo, en detalle →', 'How I work, in detail →'),

    perfilLabel: d('Sobre mí', 'About'),
    perfilAlt: d('Cartel del documental Helvetica, de Gary Hustwit',
                 'Poster for the documentary Helvetica, by Gary Hustwit'),
    perfilH2: d('Vengo del diseño gráfico, me quedé en el producto digital.',
                'I come from graphic design. I stayed in digital product.'),
    perfilP: [
      d('Aprendí el oficio cerrando revistas: seis años en Glamour y cinco dirigiendo el diseño de S Moda en El País, donde firmé más de doscientos números. Allí dirigía y retocaba a la vez, y me hice experto en Photoshop. Esa escuela enseña algo que el producto digital suele olvidar — que una portada se decide en horas y no se puede repetir.',
        'I learnt the trade closing magazines: six years at Glamour and five directing design at S Moda for El País, where I signed off more than two hundred issues. There I was directing and retouching at the same time, and that is where I learnt Photoshop inside out. That school teaches something digital product tends to forget — a cover is decided in hours and cannot be done again.'),
      d('En Condé Nast monté desde cero el departamento de Rich Media y acabé dirigiendo un equipo de catorce personas y más de cincuenta campañas al año para Santander, El Corte Inglés, Adidas y L’Oréal. Después pasé al lado de producto: cinco tiendas de suscripción sobre Shopify para Vogue, GQ, AD, Vanity Fair y Traveler, y su salto a Oriente Medio. En 2025 diseñé para PRISA la presentación de su plan estratégico 2026–2029 ante el comité de dirección.',
        'At Condé Nast I built the Rich Media department from nothing and ended up leading a team of fourteen and more than fifty campaigns a year for Santander, El Corte Inglés, Adidas and L’Oréal. Then I moved to the product side: five subscription stores on Shopify for Vogue, GQ, AD, Vanity Fair and Traveler, and their move into the Middle East. In 2025 I designed PRISA’s 2026–2029 strategic plan presentation for its board.'),
      d('Por el camino pasé por el Vostok VII de Javier Cañada en Tramontana —ocho alumnos por edición— y di clase de diseño digital e interacción en el Vogue College of Fashion y en Nebrija durante cinco semestres.',
        'Along the way I went through Javier Cañada’s Vostok VII at Tramontana — eight students an edition — and taught digital and interaction design at the Vogue College of Fashion and at Nebrija for five semesters.')
    ],
    perfilCV: d('Ver el CV (PDF)', 'View the CV (PDF)'),
    perfilTray: d('Trayectoria completa', 'Full background')
  },

  estudio: {
    titulo: d('Sobre mí — Xabier Mauleon', 'About — Xabier Mauleon'),
    desc: d('Trayectoria completa: Glamour, S Moda en El País, Condé Nast CNX y Condé Nast International, más docencia y proyectos propios.',
            'Full background: Glamour, S Moda at El País, Condé Nast CNX and Condé Nast International, plus teaching and personal projects.'),
    h1: d('Veinte años dirigiendo diseño en moda, medios y producto digital.',
          'Twenty years directing design across fashion, media and digital product.'),
    intro: [
      d('Empecé en el estudio de Óscar Mariné, aprendí el oficio en Glamour y lo dirigí en S Moda, donde firmé más de doscientos números como Jefe de Diseño. En Condé Nast pasé de liderar un equipo de diez en la agencia interna a dirigir el diseño de las plataformas de suscripción de cinco cabeceras, escalándolas a España, Oriente Medio e India. Enseño en el Vogue College of Fashion y en Nebrija.',
        'I started at Óscar Mariné’s studio, learnt the trade at Glamour and ran it at S Moda, where I signed off more than two hundred issues as Head of Design. At Condé Nast I went from leading a team of ten in the in-house agency to directing design for the subscription platforms of five titles, scaling them across Spain, the Middle East and India. I teach at the Vogue College of Fashion and at Nebrija.'),
      d('Trabajo igual de cómodo dirigiendo una portada que montando un sistema de tokens. Lo que me interesa de verdad es lo segundo: que una marca aguante cuando crece.',
        'I am equally at home art-directing a cover and building a token system. What really interests me is the second: making a brand hold when it grows.'),
      d('En S Moda no solo dirigía: también retocaba, las dos cosas a la vez y durante años, hasta hacerme experto en Photoshop. Ese oficio es hoy lo que me permite cerrar una imagen generada en vez de conformarme con ella. Edito y animo vídeo, con un máster en After Effects por Lightbox Academy que cursé durante mi etapa en Condé Nast.',
        'At S Moda I was not only directing: I was retouching too, both at once and for years, until I knew Photoshop inside out. That trade is what lets me finish a generated image today rather than settle for it. I edit and animate video, with a master’s in After Effects from Lightbox Academy taken during my time at Condé Nast.')
    ],
    trayectoriaLabel: d('Trayectoria', 'Background'),
    trayectoria: [
      d('Óscar Mariné Estudio', 'Óscar Mariné Studio'),
      d('IED Madrid · Máster Dirección de Arte', 'IED Madrid · MA Art Direction'),
      d('Glamour', 'Glamour'),
      d('S Moda — Jefe de Diseño', 'S Moda — Head of Design'),
      d('Condé Nast — UX Design Lead', 'Condé Nast — UX Design Lead'),
      d('Docencia — Vogue College / Nebrija', 'Teaching — Vogue College / Nebrija')
    ],
    herramientasLabel: d('Herramientas', 'Tools'),
    herramientas: ['Figma', 'Illustrator', 'Photoshop', 'InDesign', 'After Effects', 'Midjourney', 'Flux', 'Claude', 'Shopify Plus', 'HTML/CSS'],
    fueraLabel: d('Fuera del trabajo', 'Outside work'),
    fuera: d('El hockey hierba ha sido la otra gran pasión: campeón de Europa sub-16 con la selección española y 15 años de competición nacional e internacional. Hoy entreno equipos de base — otro mundo, un reto igual de apasionante.',
             'Field hockey has been the other great passion: European champion at under-16 with the Spanish national side, and fifteen years competing nationally and internationally. These days I coach youth teams — a different world, and just as absorbing a challenge.')
  },

  contacto: {
    titulo: d('Contacto — Xabier Mauleon', 'Contact — Xabier Mauleon'),
    desc: d('Quién soy, qué hago y en qué estoy ahora. Disponible para dirección de arte y diseño de producto en Madrid, híbrido o remoto.',
            'Who I am, what I do and what I am working on. Available for art direction and product design in Madrid, hybrid or remote.'),
    eyebrow: d('Contacto', 'Contact'),
    intro: d('Director de arte y diseñador de producto digital. Veinte años dirigiendo diseño entre redacciones de moda, agencia y producto.',
             'Art director and digital product designer. Twenty years directing design across fashion newsrooms, agency and product.'),
    bloques: [
      { label: d('De dónde vengo', 'Where I come from'),
        texto: d('Aprendí el oficio cerrando revistas: seis años en Glamour y cinco como Jefe de Diseño de S Moda en El País, más de doscientos números — dirigiendo y retocando a la vez, que es donde me hice experto en Photoshop. En la agencia interna de Condé Nast monté el departamento de Rich Media desde cero y acabé dirigiendo un equipo de catorce personas y más de cincuenta campañas al año. Después pasé al lado de producto, como Design Lead de las plataformas de suscripción de Vogue, GQ, AD, Vanity Fair y Traveler, y de su apertura a Oriente Medio e India.',
                 'I learnt the trade closing magazines: six years at Glamour and five as Head of Design at S Moda for El País, more than two hundred issues — directing and retouching at the same time, which is where I learnt Photoshop inside out. At Condé Nast’s in-house agency I built the Rich Media department from nothing and ended up leading a team of fourteen and more than fifty campaigns a year. Then I moved to the product side, as Design Lead for the subscription platforms of Vogue, GQ, AD, Vanity Fair and Traveler, and for their launch in the Middle East and India.') },
      { label: d('Qué hago', 'What I do'),
        texto: d('Encuentro el conflicto que nadie ha resuelto en un proyecto —lo que pide el negocio contra lo que necesita quien lo usa—, decido cuál de los dos manda, dejo la regla por escrito y la convierto en un sistema que aguanta cuando el proyecto crece. Sirve igual para una portada que para un catálogo de doscientas páginas indexables. Trabajo con la misma naturalidad dirigiendo una sesión de fotos que montando una librería de componentes y tokens en Figma.',
                 'I find the conflict nobody has resolved in a project — what the business wants against what the person using it needs — decide which of the two wins, put the rule in writing, and turn it into a system that holds when the project grows. It works the same for a cover as for a two-hundred-page indexable catalogue. I am as comfortable directing a photo shoot as building a component and token library in Figma.') },
      { label: d('Qué estoy haciendo ahora', 'What I am doing now'),
        texto: d('Busco un puesto de Design Lead o dirección de arte en Madrid, híbrido o remoto, y estoy disponible desde el último trimestre de 2026. Mientras tanto trabajo por libre y en proyectos propios: IBMot Experience, una plataforma de alquiler y venta de motos construida entera desde el posicionamiento, y la visualización de cuarenta y cuatro años de corrupción política en España. También doy clase de diseño digital e interacción y sigo usando cada encargo para afinar el mismo método.',
                 'I am looking for a Design Lead or art direction role in Madrid, hybrid or remote, and I am available from the last quarter of 2026. Meanwhile I work freelance and on my own projects: IBMot Experience, a motorcycle rental and sales platform built entirely from search up, and a visualisation of forty-four years of political corruption in Spain. I also teach digital and interaction design, and keep using every commission to sharpen the same method.') }
    ],
    formTitulo: d('Escríbeme — respondo en un día laborable', 'Write to me — I reply within one working day'),
    hp: d('No rellenar:', 'Do not fill in:'),
    campos: {
      nombre: d('Nombre', 'Name'),
      email: d('Email', 'Email'),
      empresa: d('Empresa o estudio', 'Company or studio'),
      motivo: d('Motivo', 'Reason'),
      mensaje: d('Mensaje', 'Message')
    },
    motivos: [
      d('Oferta de trabajo', 'Job offer'),
      d('Proyecto freelance', 'Freelance project'),
      d('Colaboración', 'Collaboration'),
      d('Otro', 'Other')
    ],
    enviar: d('Enviar mensaje', 'Send message'),
    nota: d('El mensaje llega a xabier.mauleon@gmail.com.', 'The message goes to xabier.mauleon@gmail.com.'),
    directoLabel: d('Directo', 'Direct'),
    copiar: d('Copiar', 'Copy'),
    otrosLabel: d('En otros sitios', 'Elsewhere'),
    buscandoLabel: d('Buscando', 'Looking for'),
    buscando: d('Design Lead o dirección de arte, en Madrid, híbrido o remoto. Disponible desde Q4 2026. También escucho encargos freelance de identidad y producto digital.',
                'Design Lead or art direction, in Madrid, hybrid or remote. Available from Q4 2026. I also take freelance commissions in identity and digital product.')
  },

  gracias: {
    titulo: d('Mensaje enviado — Xabier Mauleon', 'Message sent — Xabier Mauleon'),
    h1: d('Recibido.', 'Got it.'),
    texto: d('Te contesto en cuanto lo lea, normalmente el mismo día. Si tienes prisa, el teléfono está en el menú.',
             'I will reply as soon as I read it, usually the same day. If you are in a hurry, the phone number is in the menu.'),
    volver: d('Volver al inicio →', 'Back to home →')
  }

};
