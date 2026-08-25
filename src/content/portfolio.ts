import type {
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
  },
  navigation: [
    { label: 'Inicio', href: '#inicio', icon: 'home' },
    { label: 'Sobre mí', href: '#sobre-mi', icon: 'person' },
    { label: 'Servicios', href: '#servicios', icon: 'services' },
    { label: 'Herramientas', href: '#stack', icon: 'layers' },
    { label: 'Contacto', href: '#contacto', icon: 'mail' },
  ] satisfies readonly NavigationItem[],
  hero: {
    phrases: [
      'Hola! Soy Agus',
      'Construyo productos digitales modernos y escalables pensados para las personas ',
      // 'Transformo problemas complejos en soluciones técnicas sólidas.',
      'Desarrollo experiencias móviles, web y ecosistemas impulsados por IA.',
    ],
    description:
      'Especializado en experiencias multiplataforma y ecosistemas impulsados por IA, puenteando la brecha entre la ingeniería robusta y el diseño intuitivo. Mi enfoque es crear soluciones que se sientan naturales y funcionen a escala.',
    primaryAction: { label: 'Conóceme', href: '#sobre-mi' },
    secondaryAction: { label: 'Hablemos', href: '#contacto' },
  },
  about: {
    title: 'Trayectoria & Enfoque',
    description:
      'Con más de 3 años de experiencia diseñando e implementando productos de software, me centro en entender el corazón y valor del negocio para transformar ideas o problemas complejos en soluciones simples y eficientes.',
  },
  experience: {
    title: 'Experiencia Profesional',
    items: [
      {
        period: '2023 >',
        role: 'Ingeniero de Software Mobile',
        company: '@ Ecloud Agency',
        summary:
          'Leading mobile product team, focusing on fluid architectures and high-fidelity interaction design.',
        highlights: [
          'Liderazgo técnico de equipos móviles',
          'Arquitecturas escalables y diseño de interacciones de alta fidelidad',
        ],
        technologies: ['React Native', 'Flutter', 'Typescript', 'Dart', 'IA'],
      },
      {
        period: '2022',
        role: 'Desarrollador Mobile',
        company: '@ Globant',
        summary:
          'Creation of hybrid design systems and development of shared components for web and mobile.',
        highlights: [
          'Creación de sistemas de diseño híbridos',
          'Desarrollo de componentes compartidos web y mobile',
        ],
        technologies: ['Flutter', 'Metodologias ágiles'],
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
        title: 'Sistemas internos y Backoffice',
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
        title: 'Desarrollos de MVP',
        description:
          'Lanzamiento ágil de Productos Mínimos Viables (MVPs) para validar ideas en el mercado rápidamente con una base técnica sólida.',
        detail:
          '¿Qué es un MVP? Es una versión simple, temprana y totalmente funcional de tu idea que nos permite lanzarla rápido al mercado para probar si funciona, ahorrando tiempo y costos antes de construir el producto final completo.',
        icon: 'rocket',
        featured: true,
      },
    ] satisfies readonly Service[],
  },
  lifecycle: {
    title: 'Ciclo de Vida del Proyecto',
    hint: 'Desplaza para ver el progreso del proyecto',
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
        title: 'Mobile',
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
      { label: 'Mobile App', value: 'mobile' },
      { label: 'Web App', value: 'web' },
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
    { label: 'GitHub', href: '#', icon: 'github' },
    { label: 'Descargar CV', href: '#', icon: 'download' },
    { label: helloEmail, href: `mailto:${helloEmail}`, icon: 'mail' },
  ] satisfies readonly SocialLink[],
  footer: {
    copyright: `Diseñado y desarrollado por mi - Todos los derechos reservados.`,
  },
} as const;
