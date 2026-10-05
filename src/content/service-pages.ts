import type { Locale } from '@/lib/i18n';

export const serviceSlugs = [
  'aplicaciones-moviles',
  'paginas-web',
  'ecommerce',
  'sistemas-internos',
  'automatizaciones',
  'desarrollo-mvp',
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

type ServicePageContent = {
  title: string;
  seoTitle: string;
  description: string;
  keywords: string[];
  lead: string;
  outcome: string;
  audience: string;
  capabilities: { title: string; text: string }[];
  approach: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
  visual: [string, string, string];
};

export const servicePages: Record<
  Locale,
  Record<ServiceSlug, ServicePageContent>
> = {
  es: {
    'aplicaciones-moviles': {
      title: 'Aplicaciones móviles',
      seoTitle:
        'Desarrollo de aplicaciones móviles iOS y Android | Agustín Garate',
      description:
        'Desarrollo de apps para iOS y Android: definición del alcance, diseño de la experiencia, integraciones y pruebas en dispositivos.',
      keywords: [
        'desarrollo de aplicaciones móviles',
        'apps iOS y Android',
        'React Native',
        'Flutter',
      ],
      lead: 'Desarrollo de apps para iOS y Android, desde el diseño hasta las pruebas en dispositivos.',
      outcome:
        'Una app útil parte de lo que las personas necesitan hacer. Defino las funciones, diseño los recorridos y construyo una experiencia clara. También la conecto con los sistemas necesarios y la pruebo en dispositivos antes de ampliarla.',
      audience:
        'Para equipos y negocios que quieren lanzar una app nueva o mejorar una existente, con un alcance claro y una experiencia consistente en iOS y Android.',
      capabilities: [
        {
          title: 'Definición del producto',
          text: 'Convierto los objetivos del proyecto y las necesidades de los usuarios en funciones prioritarias, recorridos y pantallas.',
        },
        {
          title: 'Desarrollo para iOS y Android',
          text: 'Construyo la app con una base compartida cuando conviene, cuidando el rendimiento y el comportamiento propio de cada plataforma.',
        },
        {
          title: 'Integraciones y continuidad',
          text: 'Conecto APIs, inicio de sesión y notificaciones según el alcance, con una estructura que permita mantener y ampliar la app.',
        },
      ],
      approach: [
        {
          title: 'Definir el alcance',
          text: 'Identifico quién usará la app, qué tareas debe resolver y con qué servicios tendrá que conectarse.',
        },
        {
          title: 'Diseñar y desarrollar',
          text: 'Organizo los recorridos principales y desarrollo las funciones prioritarias en versiones que se pueden revisar.',
        },
        {
          title: 'Probar en dispositivos',
          text: 'Reviso los flujos en iOS y Android, corrijo problemas de uso y rendimiento, y priorizo los siguientes cambios.',
        },
      ],
      faqs: [
        {
          question: '¿Una misma app puede funcionar en iOS y Android?',
          answer:
            'Sí. Según las funciones necesarias, puedo compartir una parte importante del código y ajustar la interfaz o las funciones que cada sistema requiere.',
        },
        {
          question: '¿Se puede empezar con una versión pequeña?',
          answer:
            'Sí. Puedo desarrollar primero los recorridos esenciales para que pruebes la app y decidas qué funciones agregar después.',
        },
      ],
      visual: ['IDEA', 'iOS', 'ANDROID'],
    },
    'paginas-web': {
      title: 'Páginas web',
      seoTitle: 'Desarrollo de páginas web y landing pages | Agustín Garate',
      description:
        'Sitios web y landing pages responsive y accesibles, con SEO técnico, contenido preparado para respuestas de IA y analítica de datos.',
      keywords: [
        'desarrollo de páginas web',
        'landing pages',
        'sitios web a medida',
        'SEO técnico',
        'accesibilidad web',
        'diseño responsive',
        'AEO y GEO',
        'analítica web',
      ],
      lead: 'Una presencia web que comunica con claridad y guía a la acción.',
      outcome:
        'Un sitio eficaz combina mensaje, diseño y tecnología. Cada pantalla debe ayudar a entender la propuesta y dar un siguiente paso sin fricción.',
      audience:
        'Para marcas, profesionales y productos que necesitan presentar su trabajo, captar consultas o convertir una idea en una experiencia web sólida.',
      capabilities: [
        {
          title: 'Diseño responsive',
          text: 'Diseño y desarrollo cada pantalla para que el contenido y las acciones funcionen bien en celulares, tablets y escritorio.',
        },
        {
          title: 'Accesibilidad',
          text: 'Uso HTML semántico, navegación por teclado, contraste y etiquetas claras para que más personas puedan usar el sitio.',
        },
        {
          title: 'Rendimiento',
          text: 'Optimizo imágenes, recursos y carga de la página para ofrecer una experiencia ágil y visualmente estable.',
        },
        {
          title: 'SEO técnico',
          text: 'Trabajo títulos, metadatos, estructura de encabezados, enlaces internos e indexación para que los buscadores interpreten el sitio.',
        },
        {
          title: 'AEO y GEO',
          text: 'Organizo respuestas claras, datos estructurados cuando aportan valor y contenido con contexto para facilitar su comprensión en buscadores y asistentes de IA.',
        },
        {
          title: 'Analítica de datos',
          text: 'Configuro medición de visitas y acciones importantes, con criterios de privacidad, para entender qué funciona y qué conviene mejorar.',
        },
      ],
      approach: [
        {
          title: 'Ordenar el mensaje',
          text: 'Defino audiencia, objetivo y contenido antes de diseñar la página.',
        },
        {
          title: 'Diseñar y desarrollar',
          text: 'Construyo una experiencia coherente en escritorio y móvil, con navegación clara y acciones fáciles de encontrar y completar.',
        },
        {
          title: 'Revisar y publicar',
          text: 'Compruebo accesibilidad, rendimiento, metadatos y eventos de analítica antes de salir al aire.',
        },
      ],
      faqs: [
        {
          question: '¿El sitio se adapta a celulares?',
          answer:
            'Sí. El diseño se plantea para distintos tamaños de pantalla y formas de interacción.',
        },
        {
          question: '¿Puede incluir un blog o contenido editable?',
          answer:
            'Sí. La estructura puede incorporar un sistema de contenidos cuando el proyecto lo necesita.',
        },
      ],
      visual: ['MENSAJE', 'EXPERIENCIA', 'ACCIÓN'],
    },
    ecommerce: {
      title: 'E-commerce',
      seoTitle: 'Desarrollo de tiendas online y e-commerce | Agustín Garate',
      description:
        'Tiendas online a medida: catálogo, experiencia de compra, pagos, pedidos e integraciones para vender con una operación clara.',
      keywords: [
        'desarrollo e-commerce',
        'tiendas online',
        'catálogo online',
        'integración de pagos',
      ],
      lead: 'Una tienda que hace simple comprar y también operar.',
      outcome:
        'Vender online implica más que una vidriera. El catálogo, el carrito, el pago y la gestión de pedidos necesitan funcionar como una sola experiencia.',
      audience:
        'Para negocios que quieren abrir un canal digital o mejorar una tienda existente con una experiencia más propia y una operación mejor conectada.',
      capabilities: [
        {
          title: 'Catálogo fácil de explorar',
          text: 'Organización de productos, fichas claras y recorridos que ayudan a elegir.',
        },
        {
          title: 'Compra sin obstáculos',
          text: 'Carrito, checkout y medios de pago integrados según el contexto del negocio.',
        },
        {
          title: 'Operación conectada',
          text: 'Pedidos y datos integrados con las herramientas necesarias para el trabajo cotidiano.',
        },
      ],
      approach: [
        {
          title: 'Mapear la venta',
          text: 'Reviso productos, clientes, logística y procesos de la operación actual.',
        },
        {
          title: 'Construir la experiencia',
          text: 'Diseño el recorrido de compra y desarrollo la tienda con sus integraciones.',
        },
        {
          title: 'Probar el circuito',
          text: 'Verifico la compra completa, el registro del pedido y los casos de error antes del lanzamiento.',
        },
      ],
      faqs: [
        {
          question: '¿Se pueden integrar medios de pago?',
          answer:
            'Sí. Se eligen e integran según el país, el modelo de negocio y las necesidades del proyecto.',
        },
        {
          question: '¿Puedo administrar productos y pedidos?',
          answer:
            'Sí. La solución se define para que el equipo pueda mantener el catálogo y seguir la operación.',
        },
      ],
      visual: ['CATÁLOGO', 'COMPRA', 'PEDIDOS'],
    },
    'sistemas-internos': {
      title: 'Sistemas internos y back office',
      seoTitle:
        'Desarrollo de sistemas internos y back office | Agustín Garate',
      description:
        'Herramientas internas a medida para ordenar operaciones, centralizar información e integrar procesos y datos de tu negocio.',
      keywords: [
        'sistemas internos a medida',
        'desarrollo back office',
        'software de gestión',
        'integración de sistemas',
      ],
      lead: 'Menos trabajo disperso. Más control sobre lo que pasa.',
      outcome:
        'Cuando la operación crece entre planillas, mensajes y tareas repetidas, un sistema interno puede reunir la información y hacer visible el estado de cada proceso.',
      audience:
        'Para equipos que necesitan una herramienta propia porque su manera de trabajar ya no encaja cómodamente en soluciones genéricas.',
      capabilities: [
        {
          title: 'Flujos a medida',
          text: 'Pantallas y permisos diseñados alrededor de tareas reales, roles y decisiones del equipo.',
        },
        {
          title: 'Información en contexto',
          text: 'Datos reunidos en vistas útiles para trabajar y seguir procesos sin cambiar de herramienta constantemente.',
        },
        {
          title: 'Integraciones',
          text: 'Conexiones con sistemas existentes para reducir duplicación y mantener la información consistente.',
        },
      ],
      approach: [
        {
          title: 'Observar la operación',
          text: 'Identifico tareas, personas, cuellos de botella y fuentes de información.',
        },
        {
          title: 'Priorizar el núcleo',
          text: 'Diseño primero el flujo que más valor aporta al trabajo diario.',
        },
        {
          title: 'Implementar con el equipo',
          text: 'Pruebo el sistema con quienes lo usarán y lo ajusto según su experiencia.',
        },
      ],
      faqs: [
        {
          question: '¿Se puede conectar con herramientas que ya usamos?',
          answer:
            'En muchos casos, sí. Primero se revisan las APIs y posibilidades de integración de cada herramienta.',
        },
        {
          question: '¿Es necesario reemplazar todo el proceso de una vez?',
          answer:
            'No. Se puede comenzar por un flujo prioritario y ampliar la solución gradualmente.',
        },
      ],
      visual: ['EQUIPO', 'SISTEMA', 'DATOS'],
    },
    automatizaciones: {
      title: 'Automatizaciones',
      seoTitle:
        'Automatización de procesos e integraciones con IA | Agustín Garate',
      description:
        'Automatización de tareas e integración de sistemas, con IA cuando aporta valor, para reducir trabajo manual y errores repetitivos.',
      keywords: [
        'automatización de procesos',
        'integración de sistemas',
        'automatizaciones con IA',
        'flujos de trabajo',
      ],
      lead: 'Que los sistemas hagan el trabajo repetitivo y las personas el importante.',
      outcome:
        'Una automatización útil conecta un disparador con una acción verificable. Reduce pasos manuales, mantiene el contexto y permite saber qué ocurrió.',
      audience:
        'Para equipos que repiten tareas entre aplicaciones, copian información o necesitan responder más rápido sin perder control.',
      capabilities: [
        {
          title: 'Flujos programados',
          text: 'Reglas y eventos que mueven información entre sistemas con trazabilidad.',
        },
        {
          title: 'Integraciones',
          text: 'Conexión de APIs y herramientas para evitar tareas duplicadas y datos aislados.',
        },
        {
          title: 'IA con propósito',
          text: 'Uso de modelos de IA en tareas concretas cuando ofrecen una mejora verificable y permiten revisión humana.',
        },
      ],
      approach: [
        {
          title: 'Elegir el proceso',
          text: 'Analizo la frecuencia, los pasos y los errores para encontrar un caso de uso valioso.',
        },
        {
          title: 'Diseñar las reglas',
          text: 'Defino entradas, salidas, excepciones y los puntos donde debe intervenir una persona.',
        },
        {
          title: 'Monitorear el flujo',
          text: 'Implemento el flujo y reviso sus resultados para detectar fallas y mejorar el proceso.',
        },
      ],
      faqs: [
        {
          question: '¿Toda automatización necesita inteligencia artificial?',
          answer:
            'No. Muchas tareas se resuelven mejor con reglas claras; la IA se incorpora solo cuando el caso lo justifica.',
        },
        {
          question: '¿Qué ocurre si falla una integración?',
          answer:
            'El diseño debe contemplar errores, avisos y una forma de revisar o reintentar el trabajo.',
        },
      ],
      visual: ['ENTRADA', 'REGLA', 'RESULTADO'],
    },
    'desarrollo-mvp': {
      title: 'Desarrollo de MVP',
      seoTitle:
        'Desarrollo de MVP para validar ideas de producto | Agustín Garate',
      description:
        'Diseño y desarrollo de productos mínimos viables para probar una idea con usuarios reales y aprender antes de ampliar la inversión.',
      keywords: [
        'desarrollo de MVP',
        'producto mínimo viable',
        'validación de ideas',
        'prototipo funcional',
      ],
      lead: 'La primera versión debe responder una pregunta importante.',
      outcome:
        'Un MVP es un producto funcional con el alcance justo para poner una hipótesis frente a usuarios reales. Su valor está en aprender qué funciona antes de construir más.',
      audience:
        'Para personas y equipos con una idea de producto que necesitan lanzarla, observar el uso y decidir el siguiente paso con evidencia.',
      capabilities: [
        {
          title: 'Alcance enfocado',
          text: 'Defino la función central, lo que puede esperar y la señal que indicará si la idea merece crecer.',
        },
        {
          title: 'Producto utilizable',
          text: 'Construyo una primera versión coherente, con los flujos necesarios para el caso de uso principal.',
        },
        {
          title: 'Base para iterar',
          text: 'Preparo una implementación clara para ajustar el producto a partir de lo aprendido.',
        },
      ],
      approach: [
        {
          title: 'Formular la hipótesis',
          text: 'Defino con vos qué problema se intenta resolver y cómo reconocer una señal útil.',
        },
        {
          title: 'Lanzar lo esencial',
          text: 'Diseño y desarrollo un alcance pequeño que pueda usarse de verdad.',
        },
        {
          title: 'Aprender y decidir',
          text: 'Observo el uso y priorizo mejoras, cambios de rumbo o nuevas funciones.',
        },
      ],
      faqs: [
        {
          question: '¿Un MVP es un prototipo?',
          answer:
            'No necesariamente. Un MVP puede ser una versión funcional que personas reales usan para resolver una necesidad concreta.',
        },
        {
          question: '¿Cuántas funciones debería tener?',
          answer:
            'Las suficientes para comprobar la hipótesis principal. El alcance se define según el problema y la forma de validarlo.',
        },
      ],
      visual: ['HIPÓTESIS', 'PRODUCTO', 'APRENDIZAJE'],
    },
  },
  en: {
    'aplicaciones-moviles': {
      title: 'Mobile applications',
      seoTitle: 'iOS and Android App Development | Agustin Garate',
      description:
        'iOS and Android app development: scope definition, user experience design, integrations, and testing on devices.',
      keywords: [
        'mobile app development',
        'iOS and Android apps',
        'React Native',
        'Flutter',
      ],
      lead: 'iOS and Android app development, from design to testing on devices.',
      outcome:
        'A useful app starts with what people need to do. I define the features, design the journeys, and build a clear experience. I also connect it to the systems it needs and test it on devices before expanding it.',
      audience:
        'For teams and businesses launching a new app or improving an existing one, with a clear scope and a consistent experience on iOS and Android.',
      capabilities: [
        {
          title: 'Product definition',
          text: 'I turn project goals and user needs into priority features, journeys, and screens.',
        },
        {
          title: 'iOS and Android development',
          text: 'I build the app with a shared foundation when it makes sense, while respecting each platform’s behavior and performance needs.',
        },
        {
          title: 'Integrations and continuity',
          text: 'I connect APIs, sign-in, and notifications as needed, with a structure that supports maintenance and new features.',
        },
      ],
      approach: [
        {
          title: 'Define the scope',
          text: 'I identify who will use the app, which tasks it must solve, and which services it needs to connect to.',
        },
        {
          title: 'Design and develop',
          text: 'I organize the main journeys and build priority features in versions you can review.',
        },
        {
          title: 'Test on devices',
          text: 'I review flows on iOS and Android, fix usability and performance issues, and prioritize what comes next.',
        },
      ],
      faqs: [
        {
          question: 'Can one app work on both iOS and Android?',
          answer:
            'Yes. Depending on the features, I can share much of the code and adapt the interface or functions each platform needs.',
        },
        {
          question: 'Can I start with a smaller version?',
          answer:
            'Yes. I can build the essential journeys first so you can test the app and decide which features to add next.',
        },
      ],
      visual: ['IDEA', 'iOS', 'ANDROID'],
    },
    'paginas-web': {
      title: 'Websites',
      seoTitle: 'Website and Landing Page Development | Agustin Garate',
      description:
        'Responsive, accessible websites and landing pages with technical SEO, content prepared for AI answers, and web analytics.',
      keywords: [
        'website development',
        'landing pages',
        'custom websites',
        'technical SEO',
        'web accessibility',
        'responsive design',
        'AEO and GEO',
        'web analytics',
      ],
      lead: 'A web presence that communicates clearly and guides people to act.',
      outcome:
        'An effective site combines message, design, and technology. Each screen should make the proposition easier to understand and the next step easier to take.',
      audience:
        'For brands, professionals, and products that need to present their work, generate inquiries, or turn an idea into a solid web experience.',
      capabilities: [
        {
          title: 'Responsive design',
          text: 'I design and build each screen so content and actions work well on phones, tablets, and desktops.',
        },
        {
          title: 'Accessibility',
          text: 'I use semantic HTML, keyboard navigation, contrast, and clear labels so more people can use the site.',
        },
        {
          title: 'Performance',
          text: 'I optimize images, assets, and page loading for a fast, visually stable experience.',
        },
        {
          title: 'Technical SEO',
          text: 'I work on titles, metadata, heading structure, internal links, and indexing so search engines can interpret the site.',
        },
        {
          title: 'AEO and GEO',
          text: 'I organize clear answers, structured data where useful, and contextual content to help search engines and AI assistants understand the site.',
        },
        {
          title: 'Web analytics',
          text: 'I set up measurement for visits and key actions, with privacy in mind, to see what works and what should improve.',
        },
      ],
      approach: [
        {
          title: 'Clarify the message',
          text: 'I define the audience, goal, and content before designing the page.',
        },
        {
          title: 'Design and build',
          text: 'I create a coherent desktop and mobile experience, with clear navigation and actions that are easy to find and complete.',
        },
        {
          title: 'Review and launch',
          text: 'I check accessibility, performance, metadata, and analytics events before publishing.',
        },
      ],
      faqs: [
        {
          question: 'Will the site work on phones?',
          answer:
            'Yes. The design accounts for different screen sizes and ways of interacting.',
        },
        {
          question: 'Can it include a blog or editable content?',
          answer:
            'Yes. A content system can be included when the project needs one.',
        },
      ],
      visual: ['MESSAGE', 'EXPERIENCE', 'ACTION'],
    },
    ecommerce: {
      title: 'E-commerce',
      seoTitle: 'Online Store and E-commerce Development | Agustin Garate',
      description:
        'Custom online stores with catalog, checkout, payments, orders, and integrations for a clear buying and operating experience.',
      keywords: [
        'e-commerce development',
        'online stores',
        'product catalog',
        'payment integration',
      ],
      lead: 'A store that makes buying simple and running it manageable.',
      outcome:
        'Selling online takes more than a storefront. Catalog, cart, payment, and order management need to work as one experience.',
      audience:
        'For businesses opening a digital sales channel or improving an existing store with a more distinctive experience and connected operation.',
      capabilities: [
        {
          title: 'Easy-to-explore catalog',
          text: 'Product organization, clear detail pages, and paths that help customers choose.',
        },
        {
          title: 'Frictionless checkout',
          text: 'Cart, checkout, and payment methods integrated for the business context.',
        },
        {
          title: 'Connected operations',
          text: 'Orders and data connected to the tools needed for day-to-day work.',
        },
      ],
      approach: [
        {
          title: 'Map the sale',
          text: 'I review products, customers, logistics, and existing operational processes.',
        },
        {
          title: 'Build the experience',
          text: 'I design the purchase journey and develop the store with its integrations.',
        },
        {
          title: 'Test the full flow',
          text: 'I verify checkout, order recording, and error cases before launch.',
        },
      ],
      faqs: [
        {
          question: 'Can payment methods be integrated?',
          answer:
            'Yes. They are selected according to the country, business model, and project requirements.',
        },
        {
          question: 'Can my team manage products and orders?',
          answer:
            'Yes. The solution is shaped so your team can maintain the catalog and follow operations.',
        },
      ],
      visual: ['CATALOG', 'CHECKOUT', 'ORDERS'],
    },
    'sistemas-internos': {
      title: 'Internal systems and back offices',
      seoTitle: 'Internal Systems and Back-office Development | Agustin Garate',
      description:
        'Custom internal tools to organize operations, centralize information, and connect the processes and data behind your business.',
      keywords: [
        'custom internal software',
        'back-office development',
        'business software',
        'systems integration',
      ],
      lead: 'Less scattered work. More visibility into what is happening.',
      outcome:
        'As operations spread across spreadsheets, messages, and repeated tasks, an internal system can bring information together and make each process visible.',
      audience:
        'For teams that need their own tool because the way they work no longer fits comfortably inside generic software.',
      capabilities: [
        {
          title: 'Tailored workflows',
          text: 'Screens and permissions designed around real tasks, roles, and team decisions.',
        },
        {
          title: 'Information in context',
          text: 'Data gathered into useful views so people can work without constantly switching tools.',
        },
        {
          title: 'Integrations',
          text: 'Connections to existing systems that reduce duplication and keep information consistent.',
        },
      ],
      approach: [
        {
          title: 'Observe the operation',
          text: 'I identify tasks, people, bottlenecks, and information sources.',
        },
        {
          title: 'Prioritize the core',
          text: 'I design the workflow that adds the most value to daily work first.',
        },
        {
          title: 'Build with the team',
          text: 'I test with the people who will use the system and refine it from their experience.',
        },
      ],
      faqs: [
        {
          question: 'Can it connect to tools we already use?',
          answer:
            'Often, yes. The APIs and integration options for each tool are reviewed first.',
        },
        {
          question: 'Do we need to replace the whole process at once?',
          answer:
            'No. You can begin with a priority workflow and expand the solution gradually.',
        },
      ],
      visual: ['TEAM', 'SYSTEM', 'DATA'],
    },
    automatizaciones: {
      title: 'Automation',
      seoTitle: 'Process Automation and AI Integrations | Agustin Garate',
      description:
        'Process automation and system integrations, using AI where it adds value, to reduce manual work and repeated errors.',
      keywords: [
        'process automation',
        'systems integration',
        'AI automation',
        'workflows',
      ],
      lead: 'Let systems do the repetitive work and people do the important work.',
      outcome:
        'A useful automation connects a trigger to a verifiable action. It reduces manual steps, preserves context, and makes outcomes visible.',
      audience:
        'For teams repeating tasks across apps, copying information, or needing to respond faster without losing control.',
      capabilities: [
        {
          title: 'Programmed workflows',
          text: 'Rules and events that move information across systems with traceability.',
        },
        {
          title: 'Integrations',
          text: 'APIs and tools connected to avoid duplicated work and isolated data.',
        },
        {
          title: 'Purposeful AI',
          text: 'AI models applied to specific tasks where they offer a measurable improvement and allow human review.',
        },
      ],
      approach: [
        {
          title: 'Choose the process',
          text: 'I assess frequency, steps, and errors to find a valuable use case.',
        },
        {
          title: 'Design the rules',
          text: 'I define inputs, outputs, exceptions, and points where a person should intervene.',
        },
        {
          title: 'Monitor the flow',
          text: 'I implement the flow and review its results to detect failures and improve the process.',
        },
      ],
      faqs: [
        {
          question: 'Does every automation need artificial intelligence?',
          answer:
            'No. Many tasks work better with clear rules; AI is included only when the case warrants it.',
        },
        {
          question: 'What happens if an integration fails?',
          answer:
            'The design should account for errors, alerts, and a way to review or retry the work.',
        },
      ],
      visual: ['INPUT', 'RULE', 'RESULT'],
    },
    'desarrollo-mvp': {
      title: 'MVP development',
      seoTitle: 'MVP Development to Validate Product Ideas | Agustin Garate',
      description:
        'Design and development of minimum viable products that test an idea with real users before expanding the investment.',
      keywords: [
        'MVP development',
        'minimum viable product',
        'idea validation',
        'functional prototype',
      ],
      lead: 'The first version should answer an important question.',
      outcome:
        'An MVP is a functional product with just enough scope to put a hypothesis in front of real users. Its value is in learning what works before building more.',
      audience:
        'For people and teams with a product idea who need to launch it, observe usage, and choose the next step based on evidence.',
      capabilities: [
        {
          title: 'Focused scope',
          text: 'I define the core feature, what can wait, and the signal that shows whether the idea should grow.',
        },
        {
          title: 'Usable product',
          text: 'I build a coherent first release with the flows needed for the main use case.',
        },
        {
          title: 'Room to iterate',
          text: 'I prepare a clear implementation that can evolve based on what I learn from users.',
        },
      ],
      approach: [
        {
          title: 'Frame the hypothesis',
          text: 'I define with you which problem to solve and how to recognize a useful signal.',
        },
        {
          title: 'Launch the essentials',
          text: 'I design and build a small scope that people can actually use.',
        },
        {
          title: 'Learn and decide',
          text: 'I observe usage and prioritize improvements, a change of direction, or new features.',
        },
      ],
      faqs: [
        {
          question: 'Is an MVP a prototype?',
          answer:
            'Not necessarily. An MVP can be a functional release that real people use to solve a specific need.',
        },
        {
          question: 'How many features should it have?',
          answer:
            'Enough to test the main hypothesis. Scope depends on the problem and how it will be validated.',
        },
      ],
      visual: ['HYPOTHESIS', 'PRODUCT', 'LEARNING'],
    },
  },
};

export function servicePath(locale: Locale, slug: ServiceSlug) {
  return `${locale === 'en' ? '/en/services' : '/servicios'}/${slug}`;
}

export function isServiceSlug(slug: string): slug is ServiceSlug {
  return serviceSlugs.some((value) => value === slug);
}
