import type {
  Education,
  Experience,
  LifecyclePhase,
  NavigationItem,
  ProjectType,
  Service,
  SocialLink,
  StackCategory,
  Technology,
} from './portfolio.types';

const helloEmail = 'hola@agustingarate.com';

export const portfolioContent = {
  identity: {
    name: 'Agustin Garate',
    shortName: 'AG',
    role: 'Software Developer',
  },
  metadata: {
    title: 'Agustin Garate — Software Developer',
    description:
      'Portfolio de desarrollo de productos digitales, experiencias móviles e inteligencia artificial.',
    siteUrl: 'https://agustingarate.com',
  },
  navigation: [
    { label: 'Inicio', href: '#inicio', icon: 'home' },
    { label: 'Sobre mí', href: '#sobre-mi', icon: 'person' },
    { label: 'Servicios', href: '#servicios', icon: 'services' },
    { label: 'Herramientas', href: '#stack', icon: 'layers' },
    { label: 'Contacto', href: '#contacto', icon: 'mail' },
  ] satisfies readonly NavigationItem[],
  hero: {
    headline: 'Hola, soy Agus — Ingeniero de software',
    phrases: [
      'Hola! Soy Agus',
      'Construyo productos digitales modernos y escalables pensados para las personas.',
      'Desarrollo experiencias móviles, web y ecosistemas impulsados por IA.',
    ],
    description:
      'Especializado en productos de software multiplataforma y ecosistemas impulsados por IA, puenteando la brecha entre la ingeniería robusta y el diseño intuitivo. Mi enfoque es crear soluciones que se sientan naturales y funcionen a escala.',
    primaryAction: { label: 'Conóceme', href: '#sobre-mi' },
    secondaryAction: { label: 'Hablemos', href: '#contacto' },
  },
  about: {
    title: 'Sobre mí',
    location: 'Rosario, Argentina',
    description:
      'Tengo más de 3 años de experiencia diseñando e implementando software y productos digitales, especialmente en entornos móviles. Me centro en entender el valor del negocio para transformar ideas o problemas complejos en soluciones simples, eficientes y modernas.',
  },
  experience: {
    title: 'Experiencia Profesional',
    items: [
      {
        period: '2023 >',
        role: 'Ingeniero de Software Móvil',
        company: 'Ecloud Agency',
        companyUrl: 'https://www.ecloud.agency/',
        summary:
          'Desarrollo de aplicaciones móviles de alta fidelidad para iOS y Android, en conjunto con equipos de diseño y producto, priorizando calidad, rendimiento y mantenibilidad.',
        highlights: [
          'Desarrollo y evolución de productos móviles multiplataforma',
          'Diseño e implementación de arquitecturas escalables y testables',
          'Implementación de interfaces de alta fidelidad con foco en rendimiento y experiencia de usuario',
          'Integración de APIs, servicios externos y flujos impulsados por IA',
          'Proyectos en industrias como salud, gobierno y deportes',
        ],
        technologies: [
          'React Native',
          'Flutter',
          'TypeScript',
          'Expo',
          'Dart',
          'iOS',
          'Android',
          'IA',
          'Firebase',
          'REST API',
          'tRPC',
          'CI/CD',
          'Metodologías ágiles',
          'Figma',
          'ClickUp',
          'Notion',
          'Pixel-Perfect',
          'Motion Design',
          'MVVM',
          'Clean Architecture',
          'Spec-driven development',
          'Feature-sliced design',
          'Feature-first development',
        ],
      },
      {
        period: '2022',
        role: 'Desarrollador Móvil',
        company: 'Globant',
        companyUrl: 'https://globant.com',
        summary:
          'Desarrollo de aplicaciones multiplataforma y sistemas de diseño para el cliente Disney.',
        highlights: [
          'Desarrollo de funcionalidades móviles dentro de equipos ágiles',
          'Creación y mantenimiento de componentes reutilizables y sistemas de diseño',
          'Integración con APIs y servicios externos',
          'Colaboración con equipos multidisciplinarios y multinacionales',
        ],
        technologies: ['Flutter', 'iOS', 'Android', 'Metodologías ágiles'],
      },
      // {
      //   period: '2017 - 2019',
      //   role: 'Junior Developer',
      //   company: '@ StartUp Hub',
      //   summary:
      //     'Fullstack development for internal platforms and process automation.',
      //   highlights: [
      //     'Desarrollo fullstack para plataformas internas',
      //     'Automatización de procesos',
      //   ],
      //   technologies: ['Node.js', 'Vue'],
      // },
    ] satisfies readonly Experience[],
  },
  education: {
    title: 'Mis estudios',
    degree: 'Ingeniero en Sistemas',
    institution: 'Universidad Tecnológica Nacional — Rosario',
    institutionLogo: 'utn',
    description:
      'Formación integral en ciencias de la computación, arquitectura de software y gestión de proyectos tecnológicos. Enfoque en la resolución de problemas complejos mediante el diseño de sistemas escalables y eficientes.',
    topics: [
      'Arquitectura de software',
      'Algoritmos',
      'Bases de datos',
      'Ingeniería de requisitos',
      'Ingeniería y desarrollo de software',
      'Seguridad de la información',
      'Análisis y diseño de sistemas',
    ],
    milestones: [
      { year: '2018', label: 'Primer año' },
      { year: '2019', label: 'Segundo año' },
      { year: '2020', label: 'Tercer año' },
      { year: '2021', label: 'Cuarto año' },
      { year: '2022', label: 'Quinto año' },
      { year: '2023', label: 'Sexto año' },
    ],
  } satisfies Education,
  services: {
    title: 'Servicios',
    description:
      'Cada solución se define a partir del problema, las prioridades y el contexto real de tu negocio.',
    items: [
      {
        title: 'Aplicaciones móviles',
        description:
          'Desarrollo de aplicaciones móviles multiplataforma para iOS y Android optimizadas para rendimiento y fluidez.',
        icon: 'mobile',
      },
      {
        title: 'Páginas web',
        description:
          'Creación de plataformas web interactivas y landing pages enfocadas en la experiencia de usuario.',
        icon: 'web',
      },
      {
        title: 'Sistemas internos y back office',
        description:
          'Diseño e implementación de herramientas internas a medida para optimizar operaciones de negocio.',
        icon: 'backend',
      },
      {
        title: 'Automatizaciones',
        description:
          'Integración de sistemas y automatización de procesos mediante IA y flujos programados.',
        icon: 'automation',
      },
      {
        title: 'Desarrollo de MVP',
        description:
          'Lanzamiento ágil de productos mínimos viables (MVPs) para validar ideas en el mercado rápidamente con una base técnica sólida.',
        detail:
          '¿Qué es un MVP? Es una versión simple, temprana y totalmente funcional de tu idea que nos permite lanzarla rápido al mercado para probar si funciona, ahorrando tiempo y costos antes de construir el producto final completo.',
        icon: 'rocket',
        featured: true,
      },
    ] satisfies readonly Service[],
  },
  lifecycle: {
    title: 'Etapas de un proyecto',
    hint: 'Desplazá para ver el progreso del proyecto',
    weeks: [
      'Semana 1',
      'Semana 3',
      'Semana 4',
      'Semana 7',
      'Semana 8',
      'Semana 11',
      'Semana 15',
      'Semana N',
    ],
    phases: [
      {
        id: 'discovery',
        title: 'Discovery',
        description:
          'Investigación profunda de tus necesidades y la definición de objetivos.',
        startWeek: 0,
        duration: 1.45,
        tone: 'blue',
      },
      {
        id: 'kickoff',
        title: 'Kick-off',
        description:
          'Alineación inicial, establecimiento de hitos y comienzo del proyecto.',
        startWeek: 0.75,
        duration: 1.4,
        tone: 'coral',
      },
      {
        id: 'design',
        title: 'Diseño UX/UI',
        description:
          'Creación de interfaces intuitivas y flujos centrados en el usuario.',
        startWeek: 1.5,
        duration: 2.1,
        tone: 'lilac',
      },
      {
        id: 'frontend',
        title: 'Desarrollo Frontend',
        description:
          'Implementación de interfaces móviles y web de alta fidelidad.',
        startWeek: 2.55,
        duration: 2.7,
        tone: 'green',
      },
      {
        id: 'backend',
        title: 'Desarrollo Backend',
        description: 'Construcción de arquitecturas robustas y escalables.',
        startWeek: 3.2,
        duration: 2.8,
        tone: 'cream',
      },
      {
        id: 'testing',
        title: 'Testing & QA',
        description:
          'Pruebas exhaustivas para asegurar la máxima calidad del producto.',
        startWeek: 5.1,
        duration: 1.45,
        tone: 'blue',
      },
      {
        id: 'deploy',
        title: 'Despliegue',
        description: 'Lanzamiento controlado a entornos de producción.',
        startWeek: 6,
        duration: 1.3,
        tone: 'coral',
      },
      {
        id: 'training',
        title: 'Capacitación',
        description:
          'Entrega final, formación para el uso del producto y redacción de documentación.',
        startWeek: 6.5,
        duration: 1.3,
        tone: 'lilac',
      },
    ] satisfies readonly LifecyclePhase[],
  },
  stack: {
    title: 'Tecnologías y herramientas',
    categories: [
      {
        title: 'Móvil',
        icon: 'mobile',
        technologies: ['Flutter', 'React Native', 'Expo'],
        tone: 'blue',
      },
      {
        title: 'Frontend',
        icon: 'frontend',
        technologies: ['React', 'Next.js', 'Tailwind CSS'],
        tone: 'green',
      },
      {
        title: 'Backend',
        icon: 'backend',
        technologies: ['Node.js', 'Next.js', 'PostgreSQL'],
        tone: 'coral',
      },
      {
        title: 'Cloud & DevOps',
        icon: 'cloud',
        technologies: [
          'GCP',
          'Firebase',
          'Cloudflare',
          'Supabase',
          'Expo EAS',
          'GitHub',
          'GitLab',
          'Bitbucket',
          'App Store Connect',
          'Google Play Console',
        ],
        tone: 'cream',
      },
      {
        title: 'Producto & IA',
        icon: 'sparkles',
        technologies: [
          'Figma',
          'Stitch',
          'Orca',
          'ChatGPT',
          'Claude Code',
          'LangChain',
        ],
        tone: 'lilac',
      },
    ] satisfies readonly StackCategory[],
    marquee: [
      { label: 'Flutter', icon: 'flutter' },
      { label: 'React Native', icon: 'react-native' },
      { label: 'Expo', icon: 'expo' },
      { label: 'Swift', icon: 'swift' },
      { label: 'Figma', icon: 'figma' },
      { label: 'Node.js', icon: 'nodejs' },
      { label: 'Tailwind CSS', icon: 'tailwind' },
      { label: 'React', icon: 'react' },
    ] satisfies readonly Technology[],
  },
  contact: {
    title: 'Contactame',
    description:
      'Contame sobre tu idea o desafío. Siempre estoy abierto a discutir nuevos proyectos y oportunidades.',
    email: helloEmail,
    turnstileSiteKey: '0x4AAAAAAEavAZEwMjd8a5sv',
    projectTypes: [
      { label: 'Aplicación móvil', value: 'mobile' },
      { label: 'Aplicación web', value: 'web' },
      { label: 'Automatización', value: 'automation' },
      { label: 'Otro', value: 'other' },
    ] satisfies readonly ProjectType[],
  },
  socials: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/agustin-garate/',
      icon: 'linkedin',
    },
    {
      label: '@garate__',
      href: 'https://x.com/garate__',
      icon: 'twitter',
    },
    { label: 'GitHub', href: '#', icon: 'github' },
    { label: 'Descargar CV', href: '#', icon: 'download' },
    { label: helloEmail, href: `mailto:${helloEmail}`, icon: 'mail' },
  ] satisfies readonly SocialLink[],
  footer: {
    copyright: `Diseñado y desarrollado por mí. Todos los derechos reservados.`,
  },
} as const;
