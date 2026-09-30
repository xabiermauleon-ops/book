/* Datos de los casos. Cada texto lleva sus dos idiomas: { es, en }.
   Si en falta, el generador publica el castellano y lo avisa por consola. */

module.exports = [
  {
    "slug": "ibmot",
    "title": {
      "es": "IBMot Experience",
      "en": "IBMot Experience"
    },
    "subtitle": {
      "es": "Un producto SaaS para una red de concesionarios: web pública, back office y cuadro de mando financiero.",
      "en": "A SaaS product for a dealership network: public site, back office and financial dashboard."
    },
    "year": "2026",
    "category": {
      "es": "UX/UI Digital",
      "en": "Digital UX/UI"
    },
    "summary": {
      "es": "No es una web: es un producto SaaS completo, con el panel de gestión y el cuadro de mando financiero que el negocio usa cada mes para decidir.",
      "en": "Not a website: a complete SaaS product, including the management back office and the financial dashboard the business uses every month to decide."
    },
    "problema": {
      "es": "Una red de concesionarios y talleres con cuatro negocios distintos —alquiler, venta de motos nuevas y seminuevas, taller técnico y rutas de mototurismo— repartidos en sitios sueltos y en herramientas que no se hablaban entre sí. Por delante, el problema era de captación: todo el negocio depende de que quien busca un modelo concreto llegue a la página de ese modelo, y el patrón habitual para resolver un catálogo, filtros dinámicos tipo SPA, no deja prácticamente nada indexable. Por detrás había un problema mayor y peor contado: la gerencia sabía cuánto había facturado, pero no qué línea de negocio sostenía los gastos fijos y cuál se los comía, porque los datos vivían en EINA —taller, recambios y venta— y en MyBooking —los dos tipos de alquiler y la flota— sin cruzarse en ningún sitio.",
      "en": "A network of dealerships and workshops running four different businesses — rental, new and used motorcycle sales, technical workshop and touring routes — spread across separate sites and tools that did not talk to each other. At the front the problem was acquisition: the whole business depends on someone searching for a specific model reaching that model’s page, and the usual pattern for a catalogue, SPA-style dynamic filters, leaves almost nothing indexable. Behind it there was a bigger and less well told problem: management knew how much had been invoiced, but not which business line was carrying the fixed costs and which was eating them, because the data lived in EINA — workshop, parts and sales — and in MyBooking — the two rental types and the fleet — and never met anywhere."
    },
    "decisiones": [
      {
        "que": {
          "es": "Tratar el encargo como un producto SaaS y no como una web con panel: una sola plataforma con web pública, back office de gestión y módulo financiero.",
          "en": "Treat the brief as a SaaS product rather than a website with an admin panel: one platform holding the public site, the management back office and the financial module."
        },
        "porque": {
          "es": "La web sola no resolvía el problema de la gerencia, y un cuadro de mando sin el operativo detrás habría sido otra hoja de cálculo bonita. El valor aparece cuando la misma moto que se publica en el catálogo es la que aparece en la flota de alquiler y en el cálculo del margen. Eso obliga a un único modelo de datos, no a tres productos pegados.",
          "en": "The website alone did not solve management’s problem, and a dashboard with no operational layer behind it would have been another handsome spreadsheet. The value appears when the same motorcycle published in the catalogue is the one sitting in the rental fleet and in the margin calculation. That forces a single data model, not three products glued together."
        }
      },
      {
        "que": {
          "es": "Priorizar el posicionamiento SEO por encima de la experiencia de usuario en los puntos donde ambos entran en conflicto.",
          "en": "Put search visibility ahead of user experience at the points where the two conflict."
        },
        "porque": {
          "es": "Es una decisión poco habitual en diseño de producto y se tomó a conciencia: la mayor parte del tráfico llega buscando una moto concreta o un servicio concreto. Si esa página no existe como URL propia, la visita no ocurre, y entonces la calidad de la experiencia da igual.",
          "en": "This is an unusual decision in product design and it was taken deliberately: most traffic arrives looking for a specific motorcycle or a specific service. If that page does not exist as a URL of its own, the visit never happens, and at that point the quality of the experience is irrelevant."
        }
      },
      {
        "que": {
          "es": "Construir páginas de listado y ficha completas y rastreables en lugar de resolver el catálogo con filtros dinámicos, con la jerarquía de encabezados pensada primero para el buscador.",
          "en": "Build complete, crawlable listing and detail pages instead of resolving the catalogue with dynamic filters, with the heading hierarchy designed for the search engine first."
        },
        "porque": {
          "es": "Cada modelo, cada categoría y cada servicio necesita su propia URL indexable y su propio contenido semántico. Un filtro que cambia el estado de la página sin cambiar la dirección no genera nada que un buscador pueda leer. Las dos lecturas, la del robot y la de la persona, tenían que convivir en la misma página.",
          "en": "Every model, every category and every service needs its own indexable URL and its own semantic content. A filter that changes the state of the page without changing the address produces nothing a search engine can read. Both readings, the robot’s and the person’s, had to coexist on the same page."
        }
      },
      {
        "que": {
          "es": "En el cuadro de mando, cuando a una línea de negocio le falta el coste, los indicadores que dependen del margen muestran «—» en lugar de una cifra calculada con lo que hay.",
          "en": "In the dashboard, when a business line is missing its cost, the indicators that depend on margin show “—” instead of a figure calculated from whatever is available."
        },
        "porque": {
          "es": "Es la decisión de la que más orgulloso estoy y la que más discusión costó. Un cuadro de mando que rellena los huecos con estimaciones enseña a desconfiar de él, y a los tres meses nadie lo abre. Uno que dice «no lo sé» se usa para decidir, porque cuando muestra una cifra, esa cifra es verdad. Lo mismo con la barra de punto muerto: si falta un coste, no se dibuja, en vez de enseñar una cobertura falsa.",
          "en": "This is the decision I am proudest of and the one that took the most arguing. A dashboard that fills gaps with estimates teaches people to distrust it, and three months later nobody opens it. One that says “I don’t know” gets used to decide, because when it does show a figure, that figure is true. Same with the break-even bar: if a cost is missing, it is not drawn, rather than showing false coverage."
        }
      },
      {
        "que": {
          "es": "Cada uno de los seis indicadores explica su propia fórmula en la pantalla, al lado del número.",
          "en": "Each of the six indicators explains its own formula on screen, next to the number."
        },
        "porque": {
          "es": "Quien abre el cuadro de mando cada mañana no es analista financiero: es el gerente de una red de concesionarios. Si no sabe de dónde sale el punto muerto, no lo usa para nada. Poner la fórmula a un clic convierte el indicador en algo que se puede defender en una reunión, y eso es lo que hace que se mire.",
          "en": "Whoever opens the dashboard each morning is not a financial analyst: they run a dealership network. If they do not know where break-even comes from, they will not use it for anything. Putting the formula one click away turns the indicator into something you can defend in a meeting, and that is what makes people look at it."
        }
      },
      {
        "que": {
          "es": "El estado de las sincronizaciones vive dentro del cuadro de mando, no escondido en configuración: qué fuente trajo qué, cuándo entró por última vez, cuántos registros se omitieron y por qué motivo.",
          "en": "The state of the data syncs lives inside the dashboard, not hidden in settings: which source brought what, when it last ran, how many records were skipped and why."
        },
        "porque": {
          "es": "Un dato desactualizado que no avisa es peor que no tener dato, porque se decide sobre él igualmente. Enseñar que EINA entró a las 05:32 y omitió trece registros por estar fuera de catálogo convierte un fallo silencioso en una tarea concreta.",
          "en": "An out-of-date figure that does not announce itself is worse than no figure at all, because decisions get made on it anyway. Showing that EINA ran at 05:32 and skipped thirteen records for being off-catalogue turns a silent failure into a concrete task."
        }
      },
      {
        "que": {
          "es": "Las secciones del panel son las líneas reales del negocio —ventas de motos, taller y recambios, boutique, contratos de alquiler y flota— y no categorías contables.",
          "en": "The panel’s sections are the real business lines — motorcycle sales, workshop and parts, boutique, rental contracts and fleet — not accounting categories."
        },
        "porque": {
          "es": "La gerencia piensa en «cómo va el taller», no en «cómo va el epígrafe de servicios». Cuando la interfaz usa el vocabulario del negocio, desaparece el paso de traducción y con él la mayor parte de los errores de lectura.",
          "en": "Management thinks in terms of “how is the workshop doing”, not “how is the services heading doing”. When the interface uses the language of the business, the translation step disappears, and with it most misreadings."
        }
      },
      {
        "que": {
          "es": "Un sistema visual sin bordes redondeados, 100% rectangular, con paleta carbón, ocre y beige y Bebas Neue condensada sobre DM Sans, compartido por la web y el back office.",
          "en": "A visual system with no rounded corners, entirely rectangular, in a charcoal, ochre and beige palette with condensed Bebas Neue over DM Sans, shared by the public site and the back office."
        },
        "porque": {
          "es": "La marca es industrial y mecánica. El ángulo recto y la condensada en mayúsculas sostienen ese carácter mejor que cualquier redondeo. Y que el panel interno tenga la misma identidad que la web no es coquetería: es lo que hace que quien lo usa sienta que está dentro del mismo producto y no en una herramienta prestada.",
          "en": "The brand is industrial and mechanical. The right angle and the condensed uppercase hold that character better than any rounding. And giving the internal panel the same identity as the website is not vanity: it is what makes the person using it feel they are inside the same product rather than in a borrowed tool."
        }
      }
    ],
    "resultado": {
      "es": "Un producto SaaS en funcionamiento con tres capas sobre el mismo modelo de datos. La pública: más de 200 páginas indexables y cuatro verticales —alquiler, venta, taller y mototurismo— con su flujo de reserva. La operativa: back office de motos, rutas, consultas, páginas, menús y colaboradores, con su propio panel de visitas. Y la financiera: seis indicadores mensuales —facturación, margen bruto, gastos fijos, beneficio neto, punto muerto y rentabilidad— calculados sobre las seis líneas de negocio, con los datos entrando solos cada madrugada desde EINA y MyBooking, y un simulador para probar escenarios antes de tomar la decisión. Todo sobre un design system propio documentado en Figma: tokens de color, escala de espaciado de 4 a 48 y una librería de componentes reutilizables.",
      "en": "A working SaaS product with three layers over a single data model. The public one: more than 200 indexable pages and four verticals — rental, sales, workshop and touring — each with its own booking flow. The operational one: a back office for bikes, routes, enquiries, pages, menus and partners, with its own traffic panel. And the financial one: six monthly indicators — turnover, gross margin, fixed costs, net profit, break-even and return — calculated across the six business lines, with data arriving on its own every night from EINA and MyBooking, and a simulator for testing scenarios before the decision is taken. All of it on a design system of its own documented in Figma: colour tokens, a 4-to-48 spacing scale and a library of reusable components."
    },
    "links": [
      {
        "label": "Figma",
        "href": "https://www.figma.com/design/emHSt65U8IfmCCoLSa87fv/IBMot-Experience-%E2%80%94-UX-UI-Design-System?node-id=0-1"
      },
      {
        "label": "Live",
        "href": "https://ibmotexperience.com/es"
      }
    ],
    "featured": true,
    "definicion": {
      "es": "Red de concesionarios con cuatro negocios sueltos —alquiler, venta, taller y mototurismo— unificados en un producto SaaS. Por delante, un catálogo construido entero desde el posicionamiento: más de 200 páginas indexables en lugar de filtros dinámicos. Por detrás, un back office que gestiona motos, rutas, consultas y contenidos, y un cuadro de mando financiero que cruza las seis líneas de negocio con los gastos y dice cada mes si el mes se sostiene.",
      "en": "A dealership network with four separate businesses — rental, sales, workshop and motorcycle touring — brought together into one SaaS product. At the front, a catalogue built entirely from search up: more than 200 indexable pages instead of dynamic filters. Behind it, a back office that manages bikes, routes, enquiries and content, and a financial dashboard that crosses the six business lines against costs and says, each month, whether the month holds up."
    },
    "imagenes": [
      {
        "src": "img/ibmot/ibmot-financiero.jpg",
        "w": 1045,
        "h": 1010,
        "alt": {
          "es": "Cuadro de mando financiero de IBMOT con los seis indicadores del mes, la barra de punto muerto y el estado de las sincronizaciones",
          "en": "IBMOT financial dashboard showing the six indicators for the month, the break-even bar and the state of the data syncs"
        },
        "pie": {
          "es": "El cuadro de mando mensual. Cada indicador lleva su fórmula al lado, y las sincronizaciones con EINA y MyBooking se ven aquí y no en una pantalla de ajustes. Las cifras van difuminadas: son del negocio, no mías.",
          "en": "The monthly dashboard. Each indicator carries its formula alongside it, and the syncs with EINA and MyBooking are visible here rather than on a settings screen. The figures are blurred: they belong to the business, not to me."
        }
      },
      {
        "src": "img/ibmot/ibmot-panel.jpg",
        "w": 1400,
        "h": 1175,
        "alt": {
          "es": "Panel de administración de IBMOT con las métricas de visitas y la navegación lateral del back office",
          "en": "IBMOT administration panel showing traffic metrics and the back office side navigation"
        },
        "pie": {
          "es": "El back office. La navegación son las líneas reales del negocio —venta, alquiler, rutas, taller— y no categorías contables.",
          "en": "The back office. The navigation is the real business lines — sales, rental, routes, workshop — not accounting categories."
        }
      },
      {
        "src": "img/ibmot/ibmot-menu-lineas.jpg",
        "w": 212,
        "h": 376,
        "alt": {
          "es": "Submenú de líneas de negocio: ventas de motos, taller y recambios, boutique, contratos de alquiler y flota de alquiler",
          "en": "Business lines submenu: motorcycle sales, workshop and parts, boutique, rental contracts and rental fleet"
        },
        "pie": {
          "es": "Las seis líneas sobre las que se calcula todo.",
          "en": "The six lines everything is calculated on."
        }
      },
      {
        "src": "img/ibmot/ibmot-menu-datos.jpg",
        "w": 219,
        "h": 305,
        "alt": {
          "es": "Submenú de carga de datos del mes: importar extracto bancario, movimientos del banco y lectura de facturas",
          "en": "Monthly data entry submenu: import bank statement, bank movements and invoice reading"
        },
        "pie": {
          "es": "La entrada manual que queda: extracto bancario y facturas. El resto entra solo.",
          "en": "The manual entry that remains: bank statement and invoices. Everything else arrives on its own."
        }
      }
    ]
  },
  {
    "slug": "corrupcion",
    "title": {
      "es": "Corrupción en la Democracia Española",
      "en": "Corruption in Spanish Democracy"
    },
    "subtitle": {
      "es": "Cuarenta y cuatro años de corrupción política, contados con el lenguaje visual de Minard.",
      "en": "Forty-four years of political corruption, told in Minard’s visual language."
    },
    "year": "2026",
    "category": {
      "es": "Visualización de Datos",
      "en": "Data Visualisation"
    },
    "summary": {
      "es": "Traducir sentencias del Supremo, autos de la Audiencia Nacional e informes del Tribunal de Cuentas a un gráfico que se lee de un vistazo.",
      "en": "Translating Supreme Court judgments, National High Court orders and Court of Auditors reports into a chart that reads at a glance."
    },
    "problema": {
      "es": "Cuarenta y cuatro años de corrupción política en España documentados en sentencias del Tribunal Supremo, autos de la Audiencia Nacional, informes del Tribunal de Cuentas y prensa de referencia. El material es enorme, disperso y árido: en forma de tabla o de listado cronológico no deja ver ni la escala de cada caso ni el patrón que forman todos juntos.",
      "en": "Forty-four years of political corruption in Spain documented in Supreme Court judgments, National High Court orders, Court of Auditors reports and the main press. The material is vast, scattered and dry: as a table or a chronological list it shows neither the scale of each case nor the pattern they all form together."
    },
    "decisiones": [
      {
        "que": {
          "es": "Tomar como modelo la Carte Figurative de Charles Joseph Minard (1869), descrita por Edward Tufte como el mejor gráfico estadístico jamás dibujado.",
          "en": "Take Charles Joseph Minard’s Carte Figurative (1869) as the model, described by Edward Tufte as the best statistical graphic ever drawn."
        },
        "porque": {
          "es": "Minard resolvió exactamente este problema: representar volumen y flujo a lo largo del tiempo sin perder rigor ni añadir adorno. Traducir ese lenguaje a 44 años de legislaturas españolas daba un marco probado en lugar de una invención gráfica.",
          "en": "Minard solved exactly this problem: showing volume and flow over time without losing rigour or adding ornament. Translating that language to 44 years of Spanish parliamentary terms gave a proven framework instead of a graphic invention."
        }
      },
      {
        "que": {
          "es": "Representar cada caso documentado como una burbuja proporcional a su volumen económico estimado, distribuida en el eje temporal por gobierno y legislatura, con hitos históricos superpuestos.",
          "en": "Draw each documented case as a bubble proportional to its estimated financial volume, placed on the time axis by government and parliamentary term, with historical milestones overlaid."
        },
        "porque": {
          "es": "La comparación —entre casos y entre periodos— tiene que ser inmediata. Si el lector necesita leer cifras para saber qué caso fue mayor, el gráfico no está haciendo su trabajo.",
          "en": "The comparison — between cases and between periods — has to be immediate. If the reader needs to read figures to know which case was bigger, the chart is not doing its job."
        }
      },
      {
        "que": {
          "es": "Actualizar todas las cifras a euros de 2026 según el IPC del INE.",
          "en": "Restate every figure in 2026 euros using the INE consumer price index."
        },
        "porque": {
          "es": "Comparar importes de los años ochenta con los de 2020 en euros corrientes deforma la escala y, con ella, la conclusión. Sin esa corrección el gráfico sería llamativo pero falso.",
          "en": "Comparing amounts from the eighties with amounts from 2020 in current euros distorts the scale and, with it, the conclusion. Without that correction the chart would be striking but false."
        }
      },
      {
        "que": {
          "es": "Completar el gráfico principal con un mapa interactivo por comunidad autónoma, tres vistas de evolución temporal —acumulado, por legislatura y casos nuevos por año— y un panel de detalle deslizante.",
          "en": "Complete the main chart with an interactive map by autonomous community, three views of change over time — cumulative, by parliamentary term and new cases per year — and a sliding detail panel."
        },
        "porque": {
          "es": "Cada pregunta razonable sobre estos datos (cuánto en total, cuándo se concentró, dónde ocurrió, qué pasó en este caso concreto) pide una lectura distinta. Forzarlas todas a un solo gráfico habría dejado tres cuartas partes del material sin contar.",
          "en": "Every reasonable question about this data (how much in total, when it concentrated, where it happened, what happened in this particular case) asks for a different reading. Forcing them all into a single chart would have left three quarters of the material untold."
        }
      },
      {
        "que": {
          "es": "Construirlo íntegramente en HTML, SVG y JavaScript, sin librerías de gráficos, y mobile-first.",
          "en": "Build it entirely in HTML, SVG and JavaScript, with no charting libraries, and mobile-first."
        },
        "porque": {
          "es": "Una librería genérica impone sus formas y su peso. Dibujar a mano da control exacto sobre proporciones, tooltips y comportamiento táctil, que es donde se juega la legibilidad de un gráfico denso en una pantalla pequeña.",
          "en": "A generic library imposes its own shapes and its own weight. Drawing by hand gives exact control over proportions, tooltips and touch behaviour, which is where the legibility of a dense chart on a small screen is decided."
        }
      }
    ],
    "resultado": {
      "es": "32 casos documentados, unos 8.697 millones de euros de volumen estimado en euros de 2026, 44 años de democracia cubiertos y tres visualizaciones interactivas distintas, con filtros por partido y panel de detalle.",
      "en": "32 documented cases, some 8,697 million euros of estimated volume in 2026 euros, 44 years of democracy covered and three separate interactive visualisations, with filters by party and a detail panel."
    },
    "links": [
      {
        "label": "Live",
        "href": "https://corrupcion-espana.netlify.app/"
      }
    ],
    "featured": true,
    "definicion": {
      "es": "Cuarenta y cuatro años de sentencias del Supremo, autos de la Audiencia Nacional e informes del Tribunal de Cuentas traducidos al lenguaje de flujo de la Carte Figurative de Minard. Cada caso es una burbuja proporcional a su volumen económico, y todas las cifras están convertidas a euros de 2026 según el IPC. Construido en HTML, SVG y JavaScript, sin librerías.",
      "en": "Forty-four years of Supreme Court judgments, National High Court orders and Court of Auditors reports translated into the flow language of Minard’s Carte Figurative. Each case is a bubble proportional to its financial volume, and every figure is converted to 2026 euros using the consumer price index. Built in HTML, SVG and JavaScript, with no libraries."
    }
  },
  {
    "slug": "suscripciones-conde-nast",
    "title": {
      "es": "Plataforma de Suscripción — Condé Nast",
      "en": "Subscription Platform — Condé Nast"
    },
    "subtitle": {
      "es": "Cinco cabeceras vendiendo suscripciones sobre una misma base, en tres mercados.",
      "en": "Five titles selling subscriptions on a single base, across three markets."
    },
    "year": "2021–2024",
    "category": {
      "es": "UX/UI Digital",
      "en": "Digital UX/UI"
    },
    "summary": {
      "es": "Una tienda legacy imposible de migrar, un checkout de siete pasos y cinco marcas que no podían parecer la misma.",
      "en": "A legacy store impossible to migrate, a seven-step checkout and five brands that could not look like the same one."
    },
    "problema": {
      "es": "Vogue, Vanity Fair, GQ, AD y Traveler vendían suscripciones sobre una tienda tan antigua que resultó imposible importar los datos existentes. A eso se sumaba un checkout largo, con el abandono que eso arrastra, y la exigencia de que cinco marcas con identidades muy distintas convivieran sobre una única plataforma.",
      "en": "Vogue, Vanity Fair, GQ, AD and Traveler sold subscriptions on a store so old that importing the existing data proved impossible. On top of that came a long checkout, with the abandonment that drags behind it, and the requirement that five brands with very different identities live together on a single platform."
    },
    "decisiones": [
      {
        "que": {
          "es": "Construir una base de datos completamente nueva desde cero en lugar de migrar la existente.",
          "en": "Build a completely new database from scratch instead of migrating the existing one."
        },
        "porque": {
          "es": "La tienda legacy no permitía importar los datos. Forzar la migración habría arrastrado a la plataforma nueva los problemas de estructura de la vieja, que era justo lo que el proyecto venía a resolver.",
          "en": "The legacy store did not allow the data to be imported. Forcing the migration would have dragged the old structure’s problems into the new platform, which was exactly what the project came to solve."
        }
      },
      {
        "que": {
          "es": "Levantarlo sobre Shopify Plus con una arquitectura modular y mobile-first.",
          "en": "Set it up on Shopify Plus with a modular, mobile-first architecture."
        },
        "porque": {
          "es": "Cinco cabeceras necesitan la misma mecánica de venta con pieles distintas. Modular significa que cada marca cambia su identidad sin tocar el flujo, y que abrir un mercado nuevo es configurar, no rehacer.",
          "en": "Five titles need the same sales mechanics with different skins. Modular means each brand changes its identity without touching the flow, and opening a new market is a matter of configuring, not rebuilding."
        }
      },
      {
        "que": {
          "es": "Reducir el flujo de compra de siete pasos a dos.",
          "en": "Cut the purchase flow from seven steps to two."
        },
        "porque": {
          "es": "Cada paso intermedio en un checkout es una oportunidad de abandono. En un producto de suscripción, donde la fricción compite con un impulso de compra que dura poco, acortar el camino es la palanca más directa sobre la conversión.",
          "en": "Every intermediate step in a checkout is a chance to abandon. In a subscription product, where friction competes with a buying impulse that does not last long, shortening the path is the most direct lever on conversion."
        }
      }
    ],
    "resultado": {
      "es": "+40% de conversión en checkout, −28% de abandono de carrito, flujo reducido de siete a dos pasos y sistema replicado en Oriente Medio e India: tres mercados en 18 meses.",
      "en": "+40% checkout conversion, −28% cart abandonment, the flow cut from seven steps to two and the system replicated in the Middle East and India: three markets in 18 months."
    },
    "links": [
      {
        "label": "Figma",
        "href": "https://www.figma.com/design/HhTxndKFfQBDyplqJleOKl/Suscribe-VOGUE"
      },
      {
        "label": "Vogue",
        "href": "https://suscripcion.vogue.es/"
      },
      {
        "label": "Vanity Fair",
        "href": "https://suscripcion.revistavanityfair.es/"
      },
      {
        "label": "GQ",
        "href": "https://suscripcion.revistagq.com/"
      }
    ],
    "featured": true,
    "definicion": {
      "es": "Plataforma de suscripción de cinco cabeceras sobre Shopify Plus. La tienda heredada era tan antigua que importar sus datos resultó imposible, así que se construyó una base nueva desde cero. Sistema mobile-first y modular, proceso de compra reducido de siete pasos a dos, y replicado después en Oriente Medio e India.",
      "en": "A subscription platform for five titles on Shopify Plus. The inherited store was so old that importing its data proved impossible, so a new base was built from scratch. A modular, mobile-first system, the purchase process cut from seven steps to two, and later replicated in the Middle East and India."
    }
  },
  {
    "slug": "hotel-jorge-juan",
    "title": {
      "es": "Hotel Jorge Juan",
      "en": "Hotel Jorge Juan"
    },
    "subtitle": {
      "es": "Microsite del podcast de Vanity Fair con Seagram’s Gin.",
      "en": "Microsite for the Vanity Fair podcast with Seagram’s Gin."
    },
    "year": "2022",
    "category": {
      "es": "UX/UI Digital",
      "en": "Digital UX/UI"
    },
    "summary": {
      "es": "Un podcast patrocinado que necesitaba marca propia dentro del paraguas de la revista, con once temporadas que ordenar.",
      "en": "A sponsored podcast that needed a brand of its own under the magazine’s umbrella, with eleven seasons to organise."
    },
    "problema": {
      "es": "Un podcast producido por Vanity Fair España y patrocinado por Seagram’s Gin necesitaba sitio propio. Vestido con la línea editorial habitual de la revista habría desaparecido entre el resto del contenido, y detrás había once temporadas y seis plataformas de audio que ordenar sin marear al oyente.",
      "en": "A podcast produced by Vanity Fair España and sponsored by Seagram’s Gin needed a site of its own. Dressed in the magazine’s usual editorial line it would have disappeared among the rest of the content, and behind it were eleven seasons and six audio platforms to organise without losing the listener."
    },
    "decisiones": [
      {
        "que": {
          "es": "Darle identidad visual propia —tipografía bold, paleta amarilla y negra— separada de la línea editorial habitual de Vanity Fair.",
          "en": "Give it a visual identity of its own — bold typeface, yellow and black palette — separate from Vanity Fair’s usual editorial line."
        },
        "porque": {
          "es": "El podcast es un producto con nombre propio y un patrocinador que necesita visibilidad. Si se hubiera camuflado dentro del estilo de la revista, ni la pieza ni la marca invitada habrían tenido dónde apoyarse.",
          "en": "The podcast is a product with a name of its own and a sponsor that needs visibility. Camouflaged inside the magazine’s style, neither the piece nor the guest brand would have had anything to stand on."
        }
      },
      {
        "que": {
          "es": "Integrar reproducción de audio nativa y, a la vez, acceso a las seis plataformas de streaming.",
          "en": "Integrate native audio playback and, at the same time, access to the six streaming platforms."
        },
        "porque": {
          "es": "El oyente escucha donde ya tiene su biblioteca y sus suscripciones. Obligarle a una sola plataforma habría costado audiencia; no dar escucha directa en el sitio habría costado la visita.",
          "en": "The listener listens where their library and their subscriptions already are. Forcing them onto a single platform would have cost audience; not offering direct listening on the site would have cost the visit."
        }
      },
      {
        "que": {
          "es": "Organizar el contenido con una arquitectura de episodios por temporadas.",
          "en": "Organise the content as an architecture of episodes by season."
        },
        "porque": {
          "es": "Once temporadas en una lista plana son inmanejables. La jerarquía por temporada es la única que permite entrar por el último episodio o por el principio sin perderse.",
          "en": "Eleven seasons in a flat list are unmanageable. The season hierarchy is the only one that lets you come in through the latest episode or through the beginning without getting lost."
        }
      }
    ],
    "resultado": {
      "es": "Seis plataformas de audio, once temporadas navegables y diseño entregado en menos de tres semanas.",
      "en": "Six audio platforms, eleven browsable seasons and design delivered in under three weeks."
    },
    "links": [
      {
        "label": "Figma",
        "href": "https://www.figma.com/design/VugVhlQnjOw8Kd8hnr2xhd/micro-podcast-8jul"
      }
    ],
    "definicion": {
      "es": "Microsite del podcast de Vanity Fair patrocinado por Seagram’s Gin. Identidad propia en amarillo y negro, deliberadamente separada de la línea editorial de la revista, con audio nativo, acceso a seis plataformas de streaming y once temporadas navegables. Entregado en menos de tres semanas.",
      "en": "Microsite for the Vanity Fair podcast sponsored by Seagram’s Gin. An identity of its own in yellow and black, deliberately separate from the magazine’s editorial line, with native audio, access to six streaming platforms and eleven browsable seasons. Delivered in under three weeks."
    }
  },
  {
    "slug": "vfni",
    "title": {
      "es": "VFNI — Vogue Fashion Night In",
      "en": "VFNI — Vogue Fashion Night In"
    },
    "subtitle": {
      "es": "La primera Vogue Fashion Night Out 100% digital de Condé Nast.",
      "en": "Condé Nast’s first 100% digital Vogue Fashion Night Out."
    },
    "year": "2021",
    "category": {
      "es": "UX/UI Digital",
      "en": "Digital UX/UI"
    },
    "summary": {
      "es": "La pandemia dejó sin calle a uno de los eventos de moda del año; había que reinventarlo sin convertirlo en una retransmisión.",
      "en": "The pandemic left one of the fashion events of the year without a street; it had to be reinvented without turning it into a broadcast."
    },
    "problema": {
      "es": "La Vogue Fashion Night Out 2020, uno de los eventos de moda más importantes del año, no pudo celebrarse de forma presencial por la pandemia. El reto no era retransmitirla: era encontrar qué sustituye al hecho de recorrer una calle llena de tiendas abiertas.",
      "en": "The 2020 Vogue Fashion Night Out, one of the most important fashion events of the year, could not be held in person because of the pandemic. The challenge was not to broadcast it: it was to find what replaces walking down a street full of open shops."
    },
    "decisiones": [
      {
        "que": {
          "es": "Diseñar una experiencia inmersiva con estética de videojuego retro —tipografía pixel, paleta teal y magenta— completamente nueva y diferenciada de la línea habitual de Vogue.",
          "en": "Design an immersive experience with a retro video-game aesthetic — pixel typeface, teal and magenta palette — completely new and set apart from Vogue’s usual line."
        },
        "porque": {
          "es": "Un evento sin cuerpo necesita otro tipo de atractivo. La estética de videojuego daba permiso para jugar y marcaba desde el primer segundo que esto era otra cosa, no un sucedáneo del evento presencial.",
          "en": "An event with no body needs a different kind of pull. The video-game aesthetic gave permission to play and made clear from the first second that this was something else, not a stand-in for the event in the street."
        }
      },
      {
        "que": {
          "es": "Construir showroom virtual, avatares personalizables, juego interactivo desarrollado en Celtra, streaming en directo y dinámicas participativas.",
          "en": "Build a virtual showroom, customisable avatars, an interactive game developed in Celtra, live streaming and participatory mechanics."
        },
        "porque": {
          "es": "Lo que se pierde al quitar la calle es la participación, no el contenido. Si el usuario no puede pasear entre tiendas, tiene que poder hacer algo: vestir un avatar, jugar, entrar en una sala, asistir en directo.",
          "en": "What is lost when you take away the street is participation, not content. If the user cannot wander between shops, they have to be able to do something: dress an avatar, play, enter a room, attend live."
        }
      }
    ],
    "resultado": {
      "es": "Más de ocho secciones interactivas —avatares, showroom, gaming room, talking room y pack de productos—, evento en directo el 24 de septiembre con cuatro artistas y la primera VFNO 100% digital de Condé Nast.",
      "en": "More than eight interactive sections — avatars, showroom, gaming room, talking room and product pack — a live event on 24 September with four artists, and Condé Nast’s first 100% digital VFNO."
    },
    "links": [
      {
        "label": "Figma",
        "href": "https://www.figma.com/design/YYHyAQ6f73BlGjoi7B2MaU/micro-vfni"
      }
    ],
    "definicion": {
      "es": "La Vogue Fashion Night Out de 2020 no pudo celebrarse en la calle. Se reconstruyó entera en digital con estética de videojuego retro: showroom virtual, avatares personalizables, sala de juego desarrollada en Celtra y directo con cuatro artistas. Tipografía de píxel y paleta teal y magenta, fuera del código habitual de Vogue.",
      "en": "The 2020 Vogue Fashion Night Out could not be held on the street. It was rebuilt entirely in digital with a retro video-game aesthetic: virtual showroom, customisable avatars, a game room developed in Celtra and a live show with four artists. Pixel typeface and a teal and magenta palette, outside Vogue’s usual code."
    }
  },
  {
    "slug": "johnnie-walker",
    "title": {
      "es": "Johnnie Walker — Letras District",
      "en": "Johnnie Walker — Letras District"
    },
    "subtitle": {
      "es": "Mapa isométrico ilustrado del barrio de las Letras para Condé Nast Traveler.",
      "en": "An illustrated isometric map of the Letras district for Condé Nast Traveler."
    },
    "year": "2021",
    "category": {
      "es": "UX/UI Digital",
      "en": "Digital UX/UI"
    },
    "summary": {
      "es": "Que el contenido de marca se lea como una guía que apetece explorar y no como publicidad, con más de cincuenta sitios que ordenar.",
      "en": "Branded content that reads as a guide you want to explore rather than as advertising, with more than fifty places to put in order."
    },
    "problema": {
      "es": "Una marca de whisky patrocinando contenido de Traveler sobre el barrio de las Letras de Madrid. El riesgo evidente era que el resultado se leyera como publicidad disfrazada de recomendación, y además había más de cincuenta sitios —bares, restaurantes, tiendas y lugares con carácter— que ordenar sin que la pieza se convirtiera en un directorio.",
      "en": "A whisky brand sponsoring Traveler content about Madrid’s Letras district. The obvious risk was that the result would read as advertising dressed up as a recommendation, and on top of that there were more than fifty places — bars, restaurants, shops and spots with character — to put in order without the piece turning into a directory."
    },
    "decisiones": [
      {
        "que": {
          "es": "Poner en el centro un mapa isométrico ilustrado por el artista Bakea, en lugar de un listado o un mapa cartográfico.",
          "en": "Put an isometric map illustrated by the artist Bakea at the centre, instead of a listing or a cartographic map."
        },
        "porque": {
          "es": "La ilustración de autor convierte el patrocinio en una pieza que el lector quiere explorar por sí misma. Un listado con logotipo de marca se lee como anuncio; un mapa dibujado se lee como guía.",
          "en": "Illustration with an author behind it turns the sponsorship into a piece the reader wants to explore for its own sake. A listing with a brand logo on it reads as an advert; a drawn map reads as a guide."
        }
      },
      {
        "que": {
          "es": "Dar a cada uno de los hotspots ficha de contenido editorial y, en los que correspondía, actividades especiales patrocinadas por Johnnie Walker.",
          "en": "Give every hotspot an editorial entry and, where it applied, special activities sponsored by Johnnie Walker."
        },
        "porque": {
          "es": "Mezclar contenido propio y de marca en la misma capa —en vez de separarlos en dos experiencias— mantiene la credibilidad editorial y le da a la marca un lugar natural dentro del recorrido.",
          "en": "Mixing editorial and branded content in the same layer — rather than separating them into two experiences — keeps editorial credibility and gives the brand a natural place along the route."
        }
      },
      {
        "que": {
          "es": "Resolver la navegación con tooltips, capas de información y acceso lateral rápido a secciones.",
          "en": "Handle navigation with tooltips, information layers and quick side access to sections."
        },
        "porque": {
          "es": "Más de cincuenta puntos en un mapa solo funcionan con lectura progresiva: primero el barrio, luego la zona, luego la ficha. Mostrarlo todo a la vez habría convertido la ilustración en ruido.",
          "en": "More than fifty points on a map only work when they are read progressively: first the district, then the area, then the entry. Showing everything at once would have turned the illustration into noise."
        }
      }
    ],
    "resultado": {
      "es": "Más de 50 hotspots mapeados con contenido editorial, mapa isométrico ilustrado por Bakea, agenda de eventos integrada y navegación lateral con acceso rápido a secciones, todo bajo la narrativa Keep Walking.",
      "en": "More than 50 hotspots mapped with editorial content, an isometric map illustrated by Bakea, an integrated events programme and side navigation with quick access to sections, all under the Keep Walking narrative."
    },
    "links": [
      {
        "label": "Figma",
        "href": "https://www.figma.com/design/kghlGJlIi0NPYm87NuNNtx/02-johnnie-letrasdistrict"
      }
    ],
    "definicion": {
      "es": "Mapa isométrico del barrio de las Letras ilustrado por Bakea, con más de cincuenta puntos —bares, restaurantes, tiendas— cada uno con su ficha editorial. La agenda patrocinada convive con la recomendación sin disfrazarse de ella: el contenido de marca se lee como guía de ciudad y no como publicidad.",
      "en": "An isometric map of the Letras district illustrated by Bakea, with more than fifty points — bars, restaurants, shops — each with its own editorial entry. The sponsored programme sits alongside the recommendation without dressing up as it: branded content reads as a city guide, not as advertising."
    }
  },
  {
    "slug": "traveler-talks",
    "title": {
      "es": "Traveler Talks",
      "en": "Traveler Talks"
    },
    "subtitle": {
      "es": "Microsite del ciclo de charlas y podcast de Condé Nast Traveler.",
      "en": "Microsite for the Condé Nast Traveler talks series and podcast."
    },
    "year": "2021",
    "category": {
      "es": "UX/UI Digital",
      "en": "Digital UX/UI"
    },
    "summary": {
      "es": "Cuatro días de agenda, cuatro temáticas y un registro que tenía que sobrevivir a las ediciones siguientes.",
      "en": "Four days of programme, four themes and a registration flow that had to survive the editions to come."
    },
    "problema": {
      "es": "Conversaciones Traveler necesitaba un sistema capaz de albergar cuatro días de agenda, múltiples ponentes y cuatro temáticas distintas —Destinos, Hoteles, Movilidad y Tendencias— con un flujo de registro claro. Y con la certeza de que habría más ediciones después.",
      "en": "Conversaciones Traveler needed a system able to hold four days of programme, multiple speakers and four different themes — Destinations, Hotels, Mobility and Trends — with a clear registration flow. And with the certainty that more editions would follow."
    },
    "decisiones": [
      {
        "que": {
          "es": "Hacer de la agenda interactiva, con navegación por días y franjas horarias, el elemento central del diseño.",
          "en": "Make the interactive programme, navigable by day and time slot, the central element of the design."
        },
        "porque": {
          "es": "En un ciclo de charlas la pregunta del usuario siempre es la misma: qué hay y a qué hora. Todo lo demás —ponentes, temáticas, marca— se consulta después de resolver esa.",
          "en": "In a talks series the user’s question is always the same: what is on and at what time. Everything else — speakers, themes, brand — gets looked up once that one is answered."
        }
      },
      {
        "que": {
          "es": "Montar una arquitectura modular escalable a futuras ediciones sin rediseño.",
          "en": "Build a modular architecture that scales to future editions without a redesign."
        },
        "porque": {
          "es": "Un evento anual que obliga a rehacer el sitio cada año consume presupuesto en repetir trabajo. Modular significa que la edición siguiente entra como contenido, no como proyecto nuevo.",
          "en": "An annual event that forces the site to be rebuilt every year spends budget on repeating work. Modular means the next edition comes in as content, not as a new project."
        }
      },
      {
        "que": {
          "es": "Crear una identidad visual propia —naranja, turquesa y crema— para el ciclo.",
          "en": "Create a visual identity of its own — orange, turquoise and cream — for the series."
        },
        "porque": {
          "es": "El ciclo es un producto recurrente y tiene que reconocerse como tal, año tras año, sin depender de la portada de la cabecera que lo organiza.",
          "en": "The series is a recurring product and has to be recognised as one, year after year, without leaning on the masthead of the magazine that runs it."
        }
      }
    ],
    "resultado": {
      "es": "Cuatro días de evento y cuatro temáticas, agenda interactiva con franjas horarias, sistema de registro integrado, diseño escalable a nuevas ediciones y ponentes internacionales como Salvatore Ferragamo, Ben Pundole y Elizabeth Becker.",
      "en": "Four days of event and four themes, an interactive programme with time slots, an integrated registration system, a design that scales to new editions and international speakers such as Salvatore Ferragamo, Ben Pundole and Elizabeth Becker."
    },
    "links": [
      {
        "label": "Figma",
        "href": "https://www.figma.com/design/SJGS95J55MTUJOiQbH52Hq/traveler-conversaciones--1-"
      }
    ],
    "definicion": {
      "es": "Cuatro días de charlas, cuatro temáticas y ponentes internacionales resueltos en un solo sitio. La agenda interactiva por días y franjas horarias es el centro del diseño, y la arquitectura es modular para que las ediciones siguientes se monten sin rediseñar nada. Identidad propia en naranja, turquesa y crema.",
      "en": "Four days of talks, four themes and international speakers handled in a single site. The interactive programme, by day and time slot, is the centre of the design, and the architecture is modular so that later editions are built without redesigning anything. An identity of its own in orange, turquoise and cream."
    }
  },
  {
    "slug": "decir-las-cosas",
    "title": {
      "es": "Vanity Fair — Decir las Cosas",
      "en": "Vanity Fair — Decir las Cosas"
    },
    "subtitle": {
      "es": "Microsite del podcast de Vanity Fair con Gran Meliá Hotels.",
      "en": "Microsite for the Vanity Fair podcast with Gran Meliá Hotels."
    },
    "year": "2022",
    "category": {
      "es": "UX/UI Digital",
      "en": "Digital UX/UI"
    },
    "summary": {
      "es": "Transmitir alta gama sin poner nada entre el visitante y el botón de play.",
      "en": "A premium feel conveyed without anything standing between the visitor and the play button."
    },
    "problema": {
      "es": "El podcast, presentado por Jesús Torres y Alberto Moreno, aborda temas importantes que solemos dejar para después, y lo produce Vanity Fair en colaboración con Gran Meliá Hotels. Había que sostener el nivel de un patrocinador hotelero de lujo sin que la puesta en escena acabara estorbando a lo único que importa en un podcast, que es escucharlo.",
      "en": "The podcast, hosted by Jesús Torres and Alberto Moreno, takes on the important subjects we tend to leave for later, and it is produced by Vanity Fair in collaboration with Gran Meliá Hotels. It had to hold the level of a luxury hotel sponsor without the staging ending up in the way of the only thing that matters in a podcast, which is listening to it."
    },
    "decisiones": [
      {
        "que": {
          "es": "Construir una estética de alta gama: rojo Vanity Fair, tipografía editorial y sofás de terciopelo como elemento visual.",
          "en": "Build a premium aesthetic: Vanity Fair red, editorial typography and velvet sofas as the visual element."
        },
        "porque": {
          "es": "La pieza representa a la vez a la cabecera y a un hotel de lujo. El material y el color tenían que estar a esa altura desde la primera pantalla, porque es lo que el patrocinio compra.",
          "en": "The piece stands for the magazine and for a luxury hotel at the same time. Material and colour had to match that from the first screen, because that is what the sponsorship buys."
        }
      },
      {
        "que": {
          "es": "Priorizar la escucha directa por encima del resto de elementos.",
          "en": "Put direct listening ahead of every other element."
        },
        "porque": {
          "es": "Cualquier fricción antes del play resta oyentes. La ambientación acompaña, pero no se pone delante del reproductor.",
          "en": "Any friction before play costs listeners. The setting accompanies, but it does not get in front of the player."
        }
      },
      {
        "que": {
          "es": "Ordenar los episodios por temporadas con acceso a todas las plataformas de audio.",
          "en": "Order the episodes by season with access to every audio platform."
        },
        "porque": {
          "es": "Cada oyente llega con su plataforma ya elegida. Dar salida a las ocho evita perder a quien prefiere escuchar en la suya.",
          "en": "Every listener arrives with their platform already chosen. Giving all eight a way out avoids losing the one who prefers to listen on theirs."
        }
      }
    ],
    "resultado": {
      "es": "Ocho plataformas de audio, episodios con reproductores embebidos, diseño mobile-first e identidad visual diferenciada de la línea estándar de Vanity Fair.",
      "en": "Eight audio platforms, episodes with embedded players, a mobile-first design and a visual identity distinct from the standard Vanity Fair line."
    },
    "links": [
      {
        "label": "Figma",
        "href": "https://www.figma.com/design/wVD4WkfEwFXdzFZ5mjnN18/micro-DLC"
      }
    ],
    "definicion": {
      "es": "Podcast de Vanity Fair en colaboración con Gran Meliá. El encargo pedía alta gama —rojo Vanity Fair, tipografía editorial, terciopelo— sin que nada se interpusiera entre el visitante y el botón de reproducir. Navegación por temporadas y ocho plataformas de audio, mobile-first.",
      "en": "A Vanity Fair podcast in collaboration with Gran Meliá. The brief asked for premium — Vanity Fair red, editorial typography, velvet — with nothing standing between the visitor and the play button. Navigation by season and eight audio platforms, mobile-first."
    }
  },
  {
    "slug": "living-la-vida-vogue",
    "title": {
      "es": "Living la vida VOGUE",
      "en": "Living la vida VOGUE"
    },
    "subtitle": {
      "es": "Microsite del evento de moda en primera persona de Vogue España.",
      "en": "Microsite for the Vogue España first-person fashion event."
    },
    "year": "2022",
    "category": {
      "es": "UX/UI Digital",
      "en": "Digital UX/UI"
    },
    "summary": {
      "es": "Vender entradas de tres sesiones y gestionar dos fechas desde un único sitio.",
      "en": "Selling tickets for three sessions and running two dates from a single site."
    },
    "problema": {
      "es": "Un evento de moda en primera persona con la estilista Ana Casasnovas que no solo había que anunciar: había que vender. Tres sesiones de estilismo con precios distintos, dos fechas y un proceso de registro y compra que no podía romperse a mitad de camino.",
      "en": "A first-person fashion event with the stylist Ana Casasnovas that did not only have to be announced: it had to be sold. Three styling sessions at different prices, two dates and a registration and purchase process that could not break halfway through."
    },
    "decisiones": [
      {
        "que": {
          "es": "Levantar la identidad visual a partir de la caligrafía característica del título.",
          "en": "Build the visual identity out of the title’s own calligraphy."
        },
        "porque": {
          "es": "El nombre del evento ya tenía un gesto gráfico propio. Construir desde ahí da identidad reconocible sin añadir una capa gráfica inventada encima de la marca Vogue.",
          "en": "The event name already had a graphic gesture of its own. Building from there gives a recognisable identity without adding an invented graphic layer on top of the Vogue brand."
        }
      },
      {
        "que": {
          "es": "Integrar completamente Swoogo para la gestión de entradas y el registro.",
          "en": "Integrate Swoogo completely for ticketing and registration."
        },
        "porque": {
          "es": "La compra tenía que ocurrir dentro del microsite. Saltar a otro dominio en el momento de pagar es donde se cae la conversión de un evento.",
          "en": "The purchase had to happen inside the microsite. Jumping to another domain at the moment of payment is where an event’s conversion falls away."
        }
      },
      {
        "que": {
          "es": "Combinar en una sola arquitectura la información del evento, el perfil de la ponente y una tabla de precios con compra directa.",
          "en": "Combine the event information, the speaker’s profile and a price table with direct purchase in a single architecture."
        },
        "porque": {
          "es": "La decisión de comprar depende de tres cosas a la vez: qué es, quién lo da y qué incluye cada sesión. Separarlas en páginas distintas obliga a reconstruir el argumento en cada salto.",
          "en": "The decision to buy depends on three things at once: what it is, who gives it and what each session includes. Separating them across different pages forces the argument to be rebuilt at every jump."
        }
      }
    ],
    "resultado": {
      "es": "Pasarela de compra de entradas vía Swoogo, tres sesiones de estilismo con agenda y precios, regalo de pack edición limitada más suscripción digital de Vogue y dos fechas gestionadas desde un único microsite.",
      "en": "A ticket purchase gateway via Swoogo, three styling sessions with schedule and prices, a limited edition pack plus a Vogue digital subscription as a gift, and two dates run from a single microsite."
    },
    "links": [
      {
        "label": "Figma",
        "href": "https://www.figma.com/design/xfm7gP7tWIwCqHyPFq6ogA/Micro"
      },
      {
        "label": "Live",
        "href": "https://www.vogue.es/living/articulos/living-eventos"
      }
    ],
    "definicion": {
      "es": "Evento de estilismo en primera persona con Ana Casasnovas. La identidad se construyó sobre la caligrafía del título, con Swoogo integrado para entradas y registro, y una arquitectura que resuelve en un único sitio la información del evento, el perfil de la ponente, tres sesiones con precios y dos fechas distintas.",
      "en": "A first-person styling event with Ana Casasnovas. The identity was built on the calligraphy of the title, with Swoogo integrated for tickets and registration, and an architecture that handles the event information, the speaker’s profile, three priced sessions and two different dates in a single site."
    }
  },
  {
    "slug": "conde-nast-college",
    "title": {
      "es": "UX/UI — Condé Nast College",
      "en": "UX/UI — Condé Nast College"
    },
    "subtitle": {
      "es": "Rediseño de la sección de Cursos y Másteres del college de Condé Nast.",
      "en": "Redesign of the Courses and Masters section of the Condé Nast college."
    },
    "year": "2023",
    "category": {
      "es": "UX/UI Digital",
      "en": "Digital UX/UI"
    },
    "summary": {
      "es": "Un catálogo formativo de cuatro tipos distintos que había que poder comparar en el móvil.",
      "en": "A teaching catalogue of four different kinds that had to be comparable on a phone."
    },
    "problema": {
      "es": "El centro de formación de moda y creatividad de Condé Nast en España y Latinoamérica tenía un catálogo complejo —Masters, Experto, Diplomas y Cursos— con lógicas, duraciones y precios distintos. Sin una arquitectura clara, el futuro alumno no puede comparar, y si no puede comparar, no se matricula.",
      "en": "Condé Nast’s fashion and creativity school for Spain and Latin America had a complex catalogue — Masters, Expert, Diplomas and Courses — with different logics, lengths and prices. Without a clear architecture the prospective student cannot compare, and if they cannot compare, they do not enrol."
    },
    "decisiones": [
      {
        "que": {
          "es": "Separar el catálogo en tabs de categoría y añadir un sistema de filtrado.",
          "en": "Split the catalogue into category tabs and add a filtering system."
        },
        "porque": {
          "es": "El alumno llega sabiendo qué tipo de formación busca, no el nombre del programa. Ordenar por categoría respeta cómo se hace realmente la búsqueda.",
          "en": "The student arrives knowing what kind of teaching they are after, not the name of the programme. Ordering by category respects how the search is actually made."
        }
      },
      {
        "que": {
          "es": "Resolver cada programa con cards modulares de jerarquía visual clara.",
          "en": "Handle every programme with modular cards of clear visual hierarchy."
        },
        "porque": {
          "es": "Comparar exige que el mismo dato esté siempre en el mismo sitio. En cuanto las tarjetas varían de estructura, el usuario deja de comparar y empieza a leer una a una.",
          "en": "Comparing demands that the same piece of information always sit in the same place. As soon as cards vary in structure, the user stops comparing and starts reading them one by one."
        }
      },
      {
        "que": {
          "es": "Mantener los códigos editoriales de Condé Nast: tipografía serif elegante, blanco y negro y acentos en rojo institucional.",
          "en": "Keep the Condé Nast editorial codes: elegant serif typography, black and white and institutional red accents."
        },
        "porque": {
          "es": "Lo que vende una escuela de moda de Condé Nast es la pertenencia a esa marca. Alejarse de sus códigos habría debilitado el único argumento que la diferencia de otras escuelas.",
          "en": "What a Condé Nast fashion school sells is belonging to that brand. Moving away from its codes would have weakened the one argument that sets it apart from other schools."
        }
      }
    ],
    "resultado": {
      "es": "Cuatro categorías de formación navegables, cards modulares y escalables, diseño mobile-first y el proyecto presentado en el Vogue College.",
      "en": "Four navigable teaching categories, modular and scalable cards, a mobile-first design and the project presented at the Vogue College."
    },
    "links": [
      {
        "label": "Figma",
        "href": "https://www.figma.com/files/team/1302563223126525954/drafts"
      }
    ],
    "definicion": {
      "es": "Rediseño del catálogo de formación: másteres, experto, diplomas y cursos. El problema real no era navegar sino comparar, así que se resolvió con pestañas de categoría, tarjetas modulares de jerarquía idéntica y un sistema de filtrado. Mantiene los códigos editoriales de la casa: serif de alto contraste y rojo institucional.",
      "en": "A redesign of the teaching catalogue: masters, expert programme, diplomas and courses. The real problem was not navigating but comparing, so it was solved with category tabs, modular cards of identical hierarchy and a filtering system. It keeps the house editorial codes: high-contrast serif and institutional red."
    }
  },
  {
    "slug": "vogue-voices-gq-community",
    "title": {
      "es": "Vogue Voices & GQ Community",
      "en": "Vogue Voices & GQ Community"
    },
    "subtitle": {
      "es": "Dos microsites de comunidad para dos audiencias opuestas.",
      "en": "Two community microsites for two opposite audiences."
    },
    "year": "2020",
    "category": {
      "es": "UX/UI Digital",
      "en": "Digital UX/UI"
    },
    "summary": {
      "es": "La misma mecánica de fidelización para dos públicos que no se parecen en nada.",
      "en": "The same loyalty mechanism for two audiences with nothing in common."
    },
    "problema": {
      "es": "Fidelizar a las audiencias jóvenes y activas de dos cabeceras muy distintas. La mecánica que necesitaban era la misma —registro, contenido exclusivo, acceso a eventos— pero el público, el tono y la promesa de pertenencia no tenían nada que ver entre Vogue y GQ.",
      "en": "Building loyalty among the young, active audiences of two very different mastheads. The mechanism they needed was the same — registration, exclusive content, access to events — but the audience, the tone and the promise of belonging had nothing to do with each other across Vogue and GQ."
    },
    "decisiones": [
      {
        "que": {
          "es": "Compartir la misma arquitectura modular en los dos sites, con identidades visuales y tonos de comunicación completamente distintos.",
          "en": "Share the same modular architecture across both sites, with completely different visual identities and tones of voice."
        },
        "porque": {
          "es": "Lo que se repite es el mecanismo, no el discurso. Compartir arquitectura ahorra la mitad del trabajo y permite gastar el esfuerzo donde sí importa, que es la voz de cada comunidad.",
          "en": "What repeats is the mechanism, not the discourse. Sharing architecture saves half the work and lets the effort go where it does count, which is the voice of each community."
        }
      },
      {
        "que": {
          "es": "Definir cada una desde un concepto propio: escuchar a la lectora en Vogue Voices; identidad masculina moderna en GQ Community.",
          "en": "Define each one from a concept of its own: listening to the reader in Vogue Voices; modern male identity in GQ Community."
        },
        "porque": {
          "es": "Una comunidad se sostiene sobre una promesa concreta. Vogue Voices ofrece conversación y participación; GQ Community ofrece estilo, gastronomía, tecnología y networking. Con un concepto genérico no se apunta ni a una ni a otra.",
          "en": "A community rests on a concrete promise. Vogue Voices offers conversation and participation; GQ Community offers style, food, technology and networking. A generic concept aims at neither."
        }
      },
      {
        "que": {
          "es": "Simplificar el registro y resolver ambos con scroll narrativo mobile-first.",
          "en": "Simplify registration and handle both with a mobile-first narrative scroll."
        },
        "porque": {
          "es": "La conversión de estos productos es el alta, y ocurre casi siempre en el móvil mientras se lee. El relato tiene que llevar al formulario sin cambiar de contexto.",
          "en": "Conversion in these products is the sign-up, and it almost always happens on a phone while reading. The story has to lead to the form without a change of context."
        }
      }
    ],
    "resultado": {
      "es": "Dos comunidades con identidades visuales independientes, flujo de registro simplificado en ambas, integración de eventos presenciales como Royal Bliss y un sistema escalable a nuevas temáticas y ediciones.",
      "en": "Two communities with independent visual identities, a simplified registration flow in both, live events such as Royal Bliss integrated, and a system that scales to new themes and editions."
    },
    "links": [
      {
        "label": "Figma",
        "href": "https://www.figma.com/design/JpAGzF83pF1K9Hmr7LA6p7/vogue-voices-y-gq-community"
      }
    ],
    "definicion": {
      "es": "Dos microsites de comunidad que comparten la misma arquitectura modular y no se parecen en nada, porque sus públicos tampoco. Registro simplificado en ambos, scroll narrativo mobile-first y un sistema escalable a nuevas temáticas y ediciones.",
      "en": "Two community microsites that share the same modular architecture and look nothing alike, because their audiences do not either. Simplified registration in both, mobile-first narrative scroll and a system that scales to new themes and editions."
    }
  },
  {
    "slug": "vogue-business-santander",
    "title": {
      "es": "Vogue Business × Santander",
      "en": "Vogue Business × Santander"
    },
    "subtitle": {
      "es": "Publicación especial del acuerdo entre Condé Nast y Banco Santander.",
      "en": "A special publication from the agreement between Condé Nast and Banco Santander."
    },
    "year": "2020",
    "category": {
      "es": "Publicidad",
      "en": "Advertising"
    },
    "summary": {
      "es": "Que un acuerdo con un banco no acabe pareciendo un folleto corporativo.",
      "en": "Keeping an agreement with a bank from ending up looking like a corporate brochure."
    },
    "problema": {
      "es": "Una publicación especial nacida de un acuerdo estratégico entre Condé Nast España y Banco Santander para poner en valor el liderazgo femenino en los negocios y la innovación. Dos mundos —el editorial de moda y el de la banca— que tenían que convivir sin que el resultado se leyera como comunicación corporativa.",
      "en": "A special publication born out of a strategic agreement between Condé Nast España and Banco Santander to give weight to female leadership in business and innovation. Two worlds — fashion editorial and banking — that had to live together without the result reading as corporate communication."
    },
    "decisiones": [
      {
        "que": {
          "es": "Dar a cada uno de los cuatro números una dirección de arte de portada diferente —fotografía editorial, ilustración— manteniendo los códigos tipográficos y la cabecera Vogue Business.",
          "en": "Give each of the four issues a different cover art direction — editorial photography, illustration — while keeping the typographic codes and the Vogue Business masthead."
        },
        "porque": {
          "es": "Cuatro números idénticos se perciben como colección de folletos. La cabecera constante da continuidad de marca; la portada distinta da a cada entrega entidad de revista.",
          "en": "Four identical issues are read as a collection of brochures. The constant masthead gives brand continuity; the different cover gives each instalment the standing of a magazine."
        }
      },
      {
        "que": {
          "es": "Construir cada número alrededor de protagonistas reales del liderazgo, como Elena Ochoa Foster o Helen Mirren en el especial Sin Edad con L’Oréal Paris.",
          "en": "Build every issue around real figures of leadership, such as Elena Ochoa Foster or Helen Mirren in the Sin Edad special with L’Oréal Paris."
        },
        "porque": {
          "es": "El argumento del acuerdo era el liderazgo femenino. Encarnarlo en figuras concretas lo demuestra; enunciarlo en titulares corporativos solo lo declara.",
          "en": "The argument behind the agreement was female leadership. Embodying it in concrete figures proves it; stating it in corporate headlines only declares it."
        }
      }
    ],
    "resultado": {
      "es": "Cuatro números publicados con colaboración de Condé Nast, Santander y L’Oréal Paris, portadas con Elena Ochoa Foster, Helen Mirren y líderes del sector audiovisual y tecnológico, y diseño editorial de alto nivel en cada número.",
      "en": "Four issues published with Condé Nast, Santander and L’Oréal Paris collaborating, covers with Elena Ochoa Foster, Helen Mirren and leaders from the audiovisual and technology sectors, and high-level editorial design in every issue."
    },
    "links": [
      {
        "label": "Live",
        "href": "https://www.vogue.es/moda/articulos/vogue-business-santander-mujeres-lideres"
      }
    ],
    "definicion": {
      "es": "Cuatro números de una publicación nacida del acuerdo entre Condé Nast y Banco Santander sobre liderazgo femenino. Cada portada con una dirección de arte distinta —fotografía o ilustración— sosteniendo la misma cabecera, para que el acuerdo se leyera como proyecto editorial y no como folleto corporativo.",
      "en": "Four issues of a publication born out of the agreement between Condé Nast and Banco Santander on female leadership. Each cover with a different art direction — photography or illustration — carrying the same masthead, so that the agreement would read as an editorial project and not as a corporate brochure."
    }
  },
  {
    "slug": "s-moda",
    "title": {
      "es": "S Moda — El País",
      "en": "S Moda — El País"
    },
    "subtitle": {
      "es": "Cinco años como Jefe de Diseño de la revista semanal de moda de El País.",
      "en": "Five years as Head of Design of the weekly fashion magazine of El País."
    },
    "year": "2011–2016",
    "category": {
      "es": "Editorial",
      "en": "Editorial"
    },
    "summary": {
      "es": "Sostener más de doscientos números a ritmo semanal y dirigir a la vez el salto al digital.",
      "en": "Holding more than two hundred issues at weekly pace and leading the move to digital at the same time."
    },
    "problema": {
      "es": "Una revista de moda semanal dentro de un diario. El ritmo no perdona: lo que no está sistematizado se improvisa cada semana, y a la vez había que abrir el camino de la cabecera hacia el digital sin romper lo que la hacía reconocible en papel.",
      "en": "A weekly fashion magazine inside a newspaper. The pace is unforgiving: whatever is not systematised gets improvised every week, and at the same time the masthead had to be opened up towards digital without breaking what made it recognisable in print."
    },
    "decisiones": [
      {
        "que": {
          "es": "Empezar por crear el sistema de diseño de la revista antes que resolver número a número.",
          "en": "Start by creating the magazine’s design system rather than solving issue by issue."
        },
        "porque": {
          "es": "A ritmo semanal, el sistema es lo que protege la identidad. Sin él, cada cierre depende de quién esté de guardia y la cabecera se deshace en unos meses.",
          "en": "At weekly pace, the system is what protects the identity. Without it, every close depends on who is on duty and the masthead falls apart within months."
        }
      },
      {
        "que": {
          "es": "Tratar la dirección de arte de portadas y reportajes como producto de autor, con Lily Cole, Inés Sastre o Amélie Nothomb.",
          "en": "Treat the art direction of covers and features as authored work, with Lily Cole, Inés Sastre or Amélie Nothomb."
        },
        "porque": {
          "es": "La portada es lo que construye la referencia de una cabecera de moda. Es la pieza que se recuerda y la que sitúa a la revista frente a la competencia.",
          "en": "The cover is what builds the standing of a fashion masthead. It is the piece people remember and the one that places the magazine against its competition."
        }
      },
      {
        "que": {
          "es": "Liderar además el desarrollo y la evolución del website de S Moda.",
          "en": "Lead the development and evolution of the S Moda website as well."
        },
        "porque": {
          "es": "La transición entre el lenguaje gráfico del papel y los formatos digitales había que dirigirla desde dentro. Delegarla habría dejado dos marcas distintas con el mismo nombre.",
          "en": "The transition between the graphic language of print and digital formats had to be directed from inside. Delegating it would have left two different brands with the same name."
        }
      }
    ],
    "resultado": {
      "es": "Cinco años como Jefe de Diseño bajo la dirección de Diego Areso, más de 200 números diseñados, dirección de arte de portadas con figuras como Lily Cole, Inés Sastre y Amélie Nothomb, y la creación del website de S Moda.",
      "en": "Five years as Head of Design under the direction of Diego Areso, more than 200 issues designed, cover art direction with figures such as Lily Cole, Inés Sastre and Amélie Nothomb, and the creation of the S Moda website."
    },
    "links": [
      {
        "label": "Website",
        "href": "https://elpais.com/smoda/"
      }
    ],
    "definicion": {
      "es": "Cinco años como Jefe de Diseño del semanal de moda de El País, bajo la dirección de Diego Areso. Más de doscientos números, el sistema de diseño de la revista y la dirección de arte de portadas con Lily Cole, Inés Sastre o Amélie Nothomb. Lideré además el desarrollo del site y la transición del lenguaje del papel al digital.",
      "en": "Five years as Head of Design of the El País fashion weekly, under the direction of Diego Areso. More than two hundred issues, the magazine’s design system and cover art direction with Lily Cole, Inés Sastre or Amélie Nothomb. I also led the development of the site and the transition from the language of print to digital."
    }
  }
];
