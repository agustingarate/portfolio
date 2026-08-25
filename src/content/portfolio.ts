import type {
  Experience, LifecyclePhase, NavigationItem, ProjectType, Service,
  SocialLink, StackCategory, Technology,
} from "./portfolio.types";

export const portfolioContent = {
  identity: { name: "Agustin Garate", shortName: "AG", role: "Software Developer" },
  metadata: {
    title: "Agustin Garate — Software Developer",
    description: "Portfolio de desarrollo de productos digitales, experiencias móviles e inteligencia artificial.",
  },
  navigation: [
    { label: "Inicio", href: "#inicio", icon: "home" },
    { label: "Sobre mí", href: "#sobre-mi", icon: "person" },
    { label: "Servicios", href: "#servicios", icon: "services" },
    { label: "Stack", href: "#stack", icon: "layers" },
    { label: "Contacto", href: "#contacto", icon: "mail" },
  ] satisfies readonly NavigationItem[],
  hero: {
    phrases: [
      "Hola! Soy Agus",
      "Construyo productos digitales claros, escalables y pensados para las personas que los usan.",
      "Transformo problemas complejos en soluciones técnicas sólidas.",
      "Diseño experiencias móviles nativas y ecosistemas impulsados por IA.",
    ],
    description: "Especializado en experiencias móviles nativas y ecosistemas impulsados por IA, puenteando la brecha entre la ingeniería robusta y el diseño intuitivo. Mi enfoque es crear soluciones que se sientan naturales y funcionen a escala.",
    primaryAction: { label: "Conóceme", href: "#sobre-mi" },
    secondaryAction: { label: "Hablemos", href: "#contacto" },
  },
  about: {
    title: "Trayectoria & Enfoque",
    description: "Con más de 5 años de experiencia diseñando e implementando arquitecturas limpias, me centro en entender el core del negocio para transformar ideas complejas en interfaces simples y flujos de trabajo eficientes.",
  },
  experience: {
    title: "Experiencia Profesional",
    items: [
      { period: "2022 - Present", role: "Senior Mobile Engineer", company: "@ TechFlow", summary: "Leading mobile product team, focusing on fluid architectures and high-fidelity interaction design.", highlights: ["Liderazgo técnico de equipos móviles", "Arquitecturas escalables y diseño de interacciones de alta fidelidad"], technologies: ["React Native", "Swift"] },
      { period: "2019 - 2022", role: "Product Designer & Developer", company: "@ InnovaSoft", summary: "Creation of hybrid design systems and development of shared components for web and mobile.", highlights: ["Creación de sistemas de diseño híbridos", "Desarrollo de componentes compartidos web y mobile"], technologies: ["Flutter", "React"] },
      { period: "2017 - 2019", role: "Junior Developer", company: "@ StartUp Hub", summary: "Fullstack development for internal platforms and process automation.", highlights: ["Desarrollo fullstack para plataformas internas", "Automatización de procesos"], technologies: ["Node.js", "Vue"] },
    ] satisfies readonly Experience[],
  },
  services: {
    title: "Servicios",
    description: "Cada solución se define a partir del problema, las prioridades y el contexto real del producto.",
    items: [
      { title: "Aplicaciones móviles", description: "Desarrollo de aplicaciones móviles multiplataforma para iOS y Android optimizadas para rendimiento y fluidez.", icon: "mobile" },
      { title: "Páginas web", description: "Creación de plataformas web interactivas y landing pages enfocadas en la experiencia de usuario.", icon: "web" },
      { title: "Sistemas internos y Backoffice", description: "Diseño e implementación de herramientas internas a medida para optimizar operaciones de negocio.", icon: "backend" },
      { title: "Automatizaciones", description: "Integración de sistemas y automatización de procesos mediante IA y flujos programados.", icon: "automation" },
      { title: "Desarrollos de MVP", description: "Lanzamiento ágil de Productos Mínimos Viables (MVPs) para validar ideas en el mercado rápidamente con una base técnica sólida.", detail: "¿Qué es un MVP? Es una versión simple, temprana y totalmente funcional de tu idea que nos permite lanzarla rápido al mercado para probar si funciona, ahorrando tiempo y costos antes de construir el producto final completo.", icon: "rocket", featured: true },
    ] satisfies readonly Service[],
  },
  lifecycle: {
    title: "Ciclo de Vida del Proyecto",
    hint: "Desplaza para ver el progreso del proyecto",
    weeks: ["Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 5", "Semana 6", "Semana 7", "Semana 8"],
    phases: [
      { id: "discovery", title: "Discovery", description: "Investigación profunda de necesidades y definición de objetivos.", startWeek: 0, duration: 1.45, tone: "blue" },
      { id: "kickoff", title: "Kick-off", description: "Alineación inicial del equipo y establecimiento de hitos.", startWeek: 0.75, duration: 1.4, tone: "coral" },
      { id: "design", title: "Diseño UX/UI", description: "Creación de interfaces intuitivas y flujos centrados en el usuario.", startWeek: 1.5, duration: 2.1, tone: "lilac" },
      { id: "frontend", title: "Desarrollo Frontend", description: "Implementación de interfaces móviles y web de alta fidelidad.", startWeek: 2.55, duration: 2.7, tone: "green" },
      { id: "backend", title: "Desarrollo Backend", description: "Construcción de arquitecturas robustas y escalables.", startWeek: 3.2, duration: 2.8, tone: "cream" },
      { id: "testing", title: "Testing & QA", description: "Pruebas exhaustivas para asegurar la máxima calidad.", startWeek: 5.1, duration: 1.45, tone: "blue" },
      { id: "deploy", title: "Despliegue", description: "Lanzamiento controlado a entornos de producción.", startWeek: 6.2, duration: 1.1, tone: "coral" },
      { id: "training", title: "Capacitación", description: "Entrega final y formación para el uso del producto.", startWeek: 6.75, duration: 1.2, tone: "lilac" },
    ] satisfies readonly LifecyclePhase[],
  },
  stack: {
    title: "Tecnologías y herramientas",
    categories: [
      { title: "Mobile", icon: "mobile", technologies: ["Swift", "Kotlin", "Flutter"], tone: "blue" },
      { title: "Frontend", icon: "frontend", technologies: ["React", "Vue", "Tailwind CSS"], tone: "green" },
      { title: "Backend", icon: "backend", technologies: ["Node.js", "Python", "Go"], tone: "coral" },
      { title: "Cloud & DevOps", icon: "cloud", technologies: ["AWS", "GCP", "Docker"], tone: "cream" },
      { title: "Producto & IA", icon: "sparkles", technologies: ["Figma", "OpenAI", "LangChain"], tone: "lilac" },
    ] satisfies readonly StackCategory[],
    marquee: [
      { label: "Flutter", icon: "mobile" }, { label: "React Native", icon: "mobile" },
      { label: "Expo", icon: "mobile" }, { label: "Swift", icon: "code" },
      { label: "Figma", icon: "sparkles" }, { label: "Node.js", icon: "backend" },
      { label: "Python", icon: "code" }, { label: "Tailwind CSS", icon: "frontend" },
      { label: "React", icon: "web" },
    ] satisfies readonly Technology[],
  },
  contact: {
    title: "Empecemos un proyecto",
    description: "Cuéntame sobre tu idea o desafío. Siempre estoy abierto a discutir nuevos proyectos y oportunidades.",
    email: "agarateprof@gmail.com",
    projectTypes: [
      { label: "Mobile App", value: "mobile" }, { label: "Web App", value: "web" },
      { label: "Automatización", value: "automation" }, { label: "Otro", value: "other" },
    ] satisfies readonly ProjectType[],
  },
  socials: [
    { label: "LinkedIn", href: "#", icon: "linkedin" },
    { label: "GitHub", href: "#", icon: "github" },
    { label: "Descargar CV", href: "#", icon: "download" },
  ] satisfies readonly SocialLink[],
  footer: { copyright: "Software Developer Portfolio. Product Thinking & Mobile Expert." },
} as const;
