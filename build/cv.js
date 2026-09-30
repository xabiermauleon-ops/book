/* Contenido del CV, bilingüe. Misma convención que el resto: { es, en }.
   El CV es una página más del sitio; el PDF sale de imprimirla. */

const d = (es, en) => ({ es, en });

module.exports = {
  nombre: 'Xabier Mauleón Pérez',
  rol: d('UX/UI Design Lead · Director de Arte · Diseño Estratégico',
         'UX/UI Design Lead · Art Director · Strategic Design'),
  contacto: {
    tel: '+34 607 323 642',
    email: 'xabier.mauleon@gmail.com',
    lugar: d('Madrid, España', 'Madrid, Spain')
  },
  claim: d('Convierto la complejidad en claridad, y construyo los equipos, los sistemas y los relatos que hacen que eso se pueda repetir.',
           'I turn complexity into clarity, and build the teams, systems and stories that make it repeatable.'),

  perfilLabel: d('Perfil', 'Profile'),
  perfil: d('Veinte años dirigiendo diseño y convirtiendo encargos complejos en productos digitales claros, de las marcas globales de Condé Nast a proyectos propios de visualización de datos y comercio electrónico. Monto capacidad de diseño desde cero, dirijo equipos multidisciplinares bajo presión y traduzco estrategia de negocio en sistemas visuales que funcionan. En S Moda dirigía y retocaba a la vez: ese oficio de acabado es hoy lo que me permite cerrar una imagen generada en vez de conformarme con ella.',
            'Twenty years directing design and turning complex briefs into clear digital products, from Condé Nast’s global media brands to independent ventures in data visualisation and e-commerce. I build design capability from zero, lead multidisciplinary teams under pressure, and translate business strategy into visual systems that perform. At S Moda I was directing and retouching at the same time: that finishing craft is what lets me close a generated image today rather than settle for it.'),

  experienciaLabel: d('Experiencia', 'Experience'),
  experiencia: [
    {
      puesto: d('Consultor de diseño independiente', 'Independent Design Consultant'),
      org: d('Freelance · Madrid', 'Freelance · Madrid'),
      fechas: d('MAR 2026 — ACTUALIDAD', 'MAR 2026 — PRESENT'),
      puntos: [
        d('Dirección de UX/UI y desarrollo web de IBMot, una red de concesionarios de Mallorca: alquiler, venta, taller y mototurismo unificados en un solo producto SaaS con web pública, back office y cuadro de mando financiero (ibmotexperience.com). En sociedad creativa con el director de arte y fotógrafo Javier Garceche.',
          'UX/UI design and web development lead for IBMot, a Mallorca-based dealership network: rental, sales, workshop and touring brought together into one SaaS product with a public site, a back office and a financial dashboard (ibmotexperience.com). In creative partnership with art director and photographer Javier Garceche.'),
        d('Concepción, diseño y publicación de un proyecto propio de visualización de datos que cartografía cuarenta y cuatro años de corrupción política en España, sobre el lenguaje de la Carte Figurative de Minard (1869) y los principios de data-ink de Tufte.',
          'Conceived, designed and shipped an independent data-visualisation project mapping forty-four years of political corruption in Spain, built on the visual language of Minard’s 1869 Carte Figurative and Tufte’s data-ink principles.')
      ],
      cifras: [
        { n: '2', t: d('plataformas publicadas', 'platforms shipped') },
        { n: '32', t: d('casos cartografiados', 'cases mapped') },
        { n: '44 años', t: d('de datos', 'of data visualised') },
        { n: '8.697 M€', t: d('volumen rastreado', 'volume tracked') }
      ]
    },
    {
      puesto: d('Consultor de diseño estratégico', 'Strategic Design Consultant'),
      org: d('Grupo PRISA', 'Grupo PRISA'),
      fechas: d('NOV 2025 — FEB 2026', 'NOV 2025 — FEB 2026'),
      puntos: [
        d('Diseño y producción de la presentación del plan estratégico 2026–2029 del Grupo PRISA, entregada al comité de dirección.',
          'Designed and produced Grupo PRISA’s 2026–2029 strategic plan presentation, delivered to executive leadership.'),
        d('Síntesis de una estrategia de negocio compleja en un relato visual claro, dentro de una ventana de trabajo muy ajustada.',
          'Synthesised complex business strategy into a clear visual narrative within a tight engagement window.')
      ],
      cifras: [
        { n: '3 meses', t: d('de encargo', 'engagement') },
        { n: d('Comité', 'C-Suite'), t: d('de dirección', 'delivery') }
      ]
    },
    {
      puesto: d('Design Lead — Marketing y Business Design', 'Design Lead — Marketing & Business Design'),
      org: d('Condé Nast International', 'Condé Nast International'),
      fechas: d('JUL 2021 — JUL 2025', 'JUL 2021 — JUL 2025'),
      puntos: [
        d('Dirección del diseño UX/UI de las cinco tiendas de suscripción sobre Shopify de Condé Nast España —Vogue, GQ, AD, Vanity Fair y Traveler—, del esquema al checkout.',
          'Led end-to-end UX/UI design of five Shopify subscription stores for Condé Nast Spain — Vogue, GQ, AD, Vanity Fair and Traveler — from wireframes to on-page checkout.'),
        d('Extensión del modelo a Oriente Medio (Dubái) junto a ONIL Agency, con experiencias interactivas de captación de datos sobre Cooltabs y Swoogo.',
          'Extended the store model into the Middle East (Dubai) with ONIL Agency; designed interactive data-collection experiences via Cooltabs and Swoogo.'),
        d('Dirección de display y medios de pago, con seguimiento de rendimiento en Salesforce, HubSpot, GTM y BlueKai.',
          'Directed display and paid media, tracking performance across Salesforce, HubSpot, GTM and BlueKai.')
      ],
      cifras: [
        { n: '~2%', t: d('de subida en conversión', 'conversion uplift') },
        { n: '5', t: d('tiendas Shopify', 'Shopify stores') },
        { n: '6', t: d('diseñadores a cargo', 'designers led') },
        { n: '+1', t: d('mercado nuevo — Dubái', 'new market — Dubai') }
      ]
    },
    {
      puesto: d('Profesor de diseño digital', 'Digital Design Professor'),
      org: d('Vogue College of Fashion España / Universidad de Nebrija', 'Vogue College of Fashion Spain / Universidad de Nebrija'),
      fechas: d('MAR 2023 — JUN 2025', 'MAR 2023 — JUN 2025'),
      puntos: [
        d('Asignaturas de Herramientas de Diseño Digital y Diseño de Interacción, con un temario que integra los principios cognitivos de la Escuela de Ulm, el funcionalismo de BRAUN y las heurísticas de usabilidad de Nielsen.',
          'Taught Digital Design Tools and Interaction Design; curriculum integrating Ulm School cognitive principles, BRAUN functionalism and Nielsen’s usability heuristics.')
      ],
      cifras: [
        { n: '~40', t: d('alumnos por promoción', 'students per cohort') },
        { n: '5', t: d('semestres', 'semesters') }
      ]
    },
    {
      puesto: d('UX Design Lead — agencia CNX', 'UX Design Lead — CNX Advertising Agency'),
      org: d('Condé Nast España', 'Condé Nast Spain'),
      fechas: d('JUL 2017 — JUN 2021', 'JUL 2017 — JUN 2021'),
      puntos: [
        d('Dirección de un equipo multidisciplinar de catorce personas —diseño y front-end— con más de cincuenta campañas al año para Santander, El Corte Inglés, Adidas, UGG y L’Oréal.',
          'Led a multidisciplinary team of fourteen (designers and front-end developers) delivering 50+ campaigns a year for Santander, El Corte Inglés, Adidas, UGG and L’Oréal.'),
        d('Fundación y escalado del departamento de Rich Media desde cero: estrategia de UX, prototipos y esquemas, pruebas de usabilidad y presentación a cliente.',
          'Founded and scaled the Rich Media department from zero; defined UX strategy, prototypes and wireframes; ran usability testing and client presentations.')
      ],
      cifras: [
        { n: '14', t: d('personas en el equipo', 'team members') },
        { n: '50+', t: d('campañas al año', 'campaigns a year') },
        { n: '250.000 €+', t: d('facturación el primer año', 'revenue year 1') }
      ]
    },
    {
      puesto: d('Diseñador sénior — agencia CNX', 'Senior Designer — CNX Advertising Agency'),
      org: d('Condé Nast España', 'Condé Nast Spain'),
      fechas: d('JUL 2016 — JUN 2017', 'JUL 2016 — JUN 2017'),
      puntos: [
        d('Papel creativo sénior previo al ascenso a Design Lead: diseño de campaña y ejecución creativa en digital e impreso.',
          'Senior creative role prior to promotion to Design Lead; campaign design and creative execution across digital and print.')
      ],
      cifras: []
    },
    {
      puesto: d('Jefe de Diseño', 'Head of Design'),
      org: d('S Moda — El País', 'S Moda — El País'),
      fechas: d('SEP 2011 — JUN 2016', 'SEP 2011 — JUN 2016'),
      puntos: [
        d('Dirección del departamento de diseño de S Moda, el suplemento de moda de El País: dirección de arte, maquetación e identidad visual en las ediciones impresa y digital. Más de doscientos números firmados.',
          'Led the design department for S Moda, El País’s fashion supplement: art direction, layout and visual identity across print and digital editions. More than two hundred issues signed off.'),
        d('Retoque fotográfico profesional en paralelo a la dirección, durante los cinco años. Es donde me hice experto en Photoshop.',
          'Professional photo retouching alongside the direction role, throughout the five years. This is where I learnt Photoshop inside out.')
      ],
      cifras: [
        { n: '5 años', t: d('al frente del departamento', 'leading the department') },
        { n: '200+', t: d('números firmados', 'issues signed off') }
      ]
    },
    {
      puesto: d('Diseñador', 'Designer'),
      org: d('Revista Glamour — Condé Nast España', 'Glamour Magazine — Condé Nast Spain'),
      fechas: d('ABR 2005 — SEP 2011', 'APR 2005 — SEP 2011'),
      puntos: [
        d('Dirección de arte, maquetación y consistencia de marca en una de las cabeceras de moda de referencia en España.',
          'Art direction, layout design and brand consistency for one of Spain’s leading fashion magazines.')
      ],
      cifras: [{ n: '6 años', t: d('de recorrido', 'tenure') }]
    }
  ],
  primeraEtapa: d('Primera etapa — Diseñador júnior en Grupo Recoletos y en CD/ON Servicios de Comunicación · jun 2001 – oct 2003',
                  'Early career — Junior Designer at Grupo Recoletos and CD/ON Servicios de Comunicación · Jun 2001 – Oct 2003'),

  competenciasLabel: d('Competencias', 'Core skills'),
  competencias: [
    { t: d('Oficio visual', 'Visual craft'),
      v: d('Dirección de arte · Retoque fotográfico profesional · Composición · Tipografía · Identidad',
           'Art direction · Professional photo retouching · Composition · Typography · Identity') },
    { t: d('IA generativa', 'Generative AI'),
      v: d('Midjourney · Flux · Firefly en Photoshop · Claude · ChatGPT — integradas en producción, no solo en exploración',
           'Midjourney · Flux · Firefly in Photoshop · Claude · ChatGPT — integrated into production, not only exploration') },
    { t: d('Producto y UX', 'Product & UX'),
      v: d('UX/UI sénior · Esquemas · Recorridos de usuario · Pruebas de usabilidad · Shopify',
           'Senior UX/UI · Wireframing · Consumer journeys · Usability testing · Shopify') },
    { t: d('Sistemas de diseño', 'Design systems'),
      v: d('Tokens · Librerías de componentes · Plantillas reutilizables · Producción a escala',
           'Tokens · Component libraries · Reusable templates · Production at scale') },
    { t: d('Motion y audiovisual', 'Motion & video'),
      v: d('After Effects · Premiere · Edición y montaje · Animación',
           'After Effects · Premiere · Editing · Animation') },
    { t: d('Dirección de equipos', 'Leadership'),
      v: d('Equipos de 6 a 14 personas · Acompañamiento · Facilitación entre áreas · Gestión de interlocutores',
           'Teams of 6–14 · Coaching-oriented · Cross-functional facilitation · Stakeholder management') },
    { t: d('Herramientas', 'Tools'),
      v: d('Figma · Adobe CC (Ps, Ai, Id, Ae, Pr) · Sketch · Zeplin · HTML/CSS · Shopify Plus',
           'Figma · Adobe CC (Ps, Ai, Id, Ae, Pr) · Sketch · Zeplin · HTML/CSS · Shopify Plus') },
    { t: d('Analítica', 'Analytics'),
      v: d('Salesforce · HubSpot · GTM · BlueKai · Hootsuite Analytics',
           'Salesforce · HubSpot · GTM · BlueKai · Hootsuite Analytics') }
  ],

  formacionLabel: d('Formación', 'Education'),
  formacion: [
    { t: d('Vostok VII — Máster en UX y Diseño de Interacción', 'Vostok VII — UX & Interaction Design Master’s Programme'),
      org: d('Tramontana · Javier Cañada', 'Tramontana · Javier Cañada'),
      fechas: d('FEB 2018 – NOV 2019', 'FEB 2018 – NOV 2019'),
      nota: d('Seleccionado entre ocho alumnos por edición: el programa de UX e interacción más selectivo de España.',
              'Selected as one of eight students per edition: Spain’s most selective UX and interaction design programme.') },
    { t: d('Máster en Dirección de Arte', 'Master’s in Art Direction'),
      org: d('Lightbox Academy', 'Lightbox Academy'),
      fechas: d('2009 – 2011', '2009 – 2011'),
      nota: d('HTML/XHTML, ActionScript 3.0, Flash, Premiere y After Effects. Cursado durante mi etapa en Condé Nast.',
              'HTML/XHTML, ActionScript 3.0, Flash, Premiere and After Effects. Taken during my time at Condé Nast.') },
    { t: d('Diplomatura universitaria en Diseño Gráfico', 'University Diploma in Graphic Design'),
      org: d('IED — Istituto Europeo di Design', 'IED — Istituto Europeo di Design'),
      fechas: d('1997 – 2000', '1997 – 2000'),
      nota: '' }
  ],

  certificadosLabel: d('Certificaciones', 'Certifications'),
  certificados: [
    { t: d('AI Fluency: Framework and Foundations', 'AI Fluency: Framework and Foundations'),
      org: d('Anthropic · Claude Academy', 'Anthropic · Claude Academy'), fecha: d('SEP 2026', 'SEP 2026') },
    { t: d('Claude 101', 'Claude 101'),
      org: d('Anthropic', 'Anthropic'), fecha: d('SEP 2026', 'SEP 2026') },
    { t: d('Inteligencia artificial para la actividad deportiva', 'Artificial Intelligence for Sport'),
      org: d('ODILO', 'ODILO'), fecha: d('NOV 2025', 'NOV 2025') },
    { t: d('Scrum esencial', 'Scrum Essentials'),
      org: d('LinkedIn Learning', 'LinkedIn Learning'), fecha: d('NOV 2025', 'NOV 2025') },
    { t: d('Aprende Jira', 'Learning Jira'),
      org: d('LinkedIn Learning', 'LinkedIn Learning'), fecha: d('NOV 2025', 'NOV 2025') }
  ],

  idiomasLabel: d('Idiomas', 'Languages'),
  idiomas: [
    d('Español — nativo', 'Spanish — native'),
    d('Inglés — profesional', 'English — professional')
  ],

  deporteLabel: d('Deporte', 'Sport'),
  deporte: d('Quince años de hockey hierba en competición. Campeón de Europa sub-16 con la selección española y subcampeón de Europa +35. Entrenador titulado de nivel II por el Ministerio de Educación; hoy entreno equipos de base.',
             'Fifteen years of competitive field hockey. European champion at under-16 with the Spanish national side and European runner-up at +35. Level II certified coach (Ministry of Education); today I coach youth teams.')
};
