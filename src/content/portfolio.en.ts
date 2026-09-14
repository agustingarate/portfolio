import { portfolioContent as spanishContent } from './portfolio';

export const portfolioContentEn = {
  ...spanishContent,
  locale: 'en' as const,
  metadata: {
    ...spanishContent.metadata,
    title: 'Agustin Garate — Software Developer',
    description:
      'Software developer portfolio for digital products, mobile and web applications, and artificial intelligence solutions.',
  },
  ui: {
    navigation: {
      mainLabel: 'Main navigation',
      homeLabel: 'Go to home',
      contactCta: 'Get in touch',
      languageLabel: 'Change language',
      spanishLabel: 'Español',
      englishLabel: 'English',
    },
    hero: {
      eyebrow: 'Software engineer',
      pauseMotion: 'Pause animation',
      resumeMotion: 'Resume animation',
    },
    contactChips: {
      label: 'Quick contact',
      copied: 'Copied',
      unableToCopy: 'Could not copy',
      copy: 'Copy',
    },
    contactForm: {
      projectType: 'Project type',
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'Your email',
      message: 'Message',
      messagePlaceholder: 'Tell me a little about your idea or project',
      website: 'Website',
      sending: 'Sending message…',
      sent: 'Thank you! Your message was sent successfully.',
      error:
        'We could not send your message. Please try again in a few minutes.',
      submit: 'Send message',
    },
    experience: { newTab: 'opens in a new tab' },
    stack: { featuredTechnologies: 'Featured technologies' },
    lifecycle: { today: 'Today' },
    share: {
      button: 'Share',
      text: 'Explore Agustin Garate’s portfolio.',
      copyLink: 'Copy link',
      linkCopied: 'Link copied',
      unableToCopy: 'Could not copy the link',
    },
  },
  navigation: [
    { label: 'Home', href: '#inicio', icon: 'home' },
    { label: 'About', href: '#sobre-mi', icon: 'person' },
    { label: 'Services', href: '#servicios', icon: 'services' },
    { label: 'Stack', href: '#stack', icon: 'layers' },
    { label: 'Contact', href: '#contacto', icon: 'mail' },
  ],
  hero: {
    headline: 'Hi, I’m Agus — Software Engineer',
    phrases: [
      'Hi! I’m Agus',
      'I build modern, scalable digital products designed around people.',
      'I craft mobile, web, and AI-powered ecosystems.',
    ],
    description:
      'I specialize in cross-platform software products and AI-powered ecosystems, bridging robust engineering with intuitive design. I create solutions that feel natural and work at scale.',
    primaryAction: { label: 'About me', href: '#sobre-mi' },
    secondaryAction: { label: 'Let’s talk', href: '#contacto' },
  },
  about: {
    ...spanishContent.about,
    title: 'About me',
    description:
      'I have over three years of experience designing and building software and digital products, especially for mobile. I focus on understanding business value and turning complex ideas or problems into simple, efficient, modern solutions.',
  },
  experience: {
    title: 'Professional experience',
    items: [
      {
        ...spanishContent.experience.items[0],
        role: 'Mobile Software Engineer',
        summary:
          'I build high-fidelity iOS and Android apps alongside design and product teams, prioritizing quality, performance, and maintainability.',
        highlights: [
          'Building and evolving cross-platform mobile products',
          'Designing and implementing scalable, testable architectures',
          'Delivering high-fidelity interfaces focused on performance and user experience',
          'Integrating APIs, external services, and AI-powered flows',
          'Projects across health, government, and sports industries',
        ],
        technologies: [
          'React Native',
          'Flutter',
          'TypeScript',
          'Expo',
          'Dart',
          'iOS',
          'Android',
          'AI',
          'Firebase',
          'REST API',
          'tRPC',
          'CI/CD',
          'Agile methodologies',
          'Figma',
          'ClickUp',
          'Notion',
          'Pixel-perfect',
          'Motion design',
          'MVVM',
          'Clean Architecture',
          'Spec-driven development',
          'Feature-sliced design',
          'Feature-first development',
        ],
      },
      {
        ...spanishContent.experience.items[1],
        role: 'Mobile Developer',
        summary:
          'Built cross-platform applications and design systems for Disney.',
        highlights: [
          'Developed mobile features within agile teams',
          'Created and maintained reusable components and design systems',
          'Integrated APIs and external services',
          'Collaborated with multidisciplinary, international teams',
        ],
        technologies: ['Flutter', 'iOS', 'Android', 'Agile methodologies'],
      },
    ],
  },
  education: {
    ...spanishContent.education,
    title: 'Education',
    degree: 'Systems Engineering',
    description:
      'A comprehensive education in computer science, software architecture, and technology project management, focused on solving complex problems through scalable and efficient system design.',
    topics: [
      'Software architecture',
      'Algorithms',
      'Databases',
      'Requirements engineering',
      'Software engineering and development',
      'Information security',
      'Systems analysis and design',
    ],
    milestones: [
      { year: '2018', label: 'First year' },
      { year: '2019', label: 'Second year' },
      { year: '2020', label: 'Third year' },
      { year: '2021', label: 'Fourth year' },
      { year: '2022', label: 'Fifth year' },
      { year: '2023', label: 'Sixth year' },
    ],
  },
  services: {
    title: 'Services',
    description:
      'I design and build tailored solutions that solve real problems, streamline operations, and help your project grow.',
    items: [
      {
        ...spanishContent.services.items[0],
        title: 'Mobile applications',
        description:
          'Cross-platform iOS and Android app development, optimized for performance and a fluid experience.',
        signals: ['IOS', 'ANDROID'],
      },
      {
        ...spanishContent.services.items[1],
        title: 'Websites',
        description:
          'Interactive web platforms and landing pages designed to attract and convert new users or customers.',
        signals: ['WEB', 'INTERFACE'],
      },
      {
        ...spanishContent.services.items[2],
        title: 'Internal systems and back offices',
        description:
          'Custom internal tools that streamline operations and integrate naturally with your systems and business data.',
        signals: ['SYSTEMS', 'OPERATIONS'],
      },
      {
        ...spanishContent.services.items[3],
        title: 'Automation',
        description:
          'System integrations and process automation through AI and programmed workflows.',
        signals: ['INPUT', 'ACTION'],
      },
      {
        ...spanishContent.services.items[4],
        title: 'MVP development',
        description:
          'Rapid launches of minimum viable products (MVPs) to validate ideas in the market with a solid technical foundation.',
        detail:
          'What is an MVP? It is a simple, early, fully functional version of your idea. It lets us launch quickly, test the market, and save time and cost before building the complete product.',
        signals: ['IDEA', 'MVP'],
      },
    ],
  },
  lifecycle: {
    ...spanishContent.lifecycle,
    title: 'Project stages',
    hint: 'Scroll to follow the project’s progress',
    weeks: [
      'Day 1',
      'Day 3',
      'Day 4',
      'Day 7',
      'Day 8',
      'Day 11',
      'Day 15',
      'Day N',
    ],
    phases: [
      {
        ...spanishContent.lifecycle.phases[0],
        description:
          'In-depth research into your needs and definition of objectives.',
      },
      {
        ...spanishContent.lifecycle.phases[1],
        description:
          'Initial alignment, milestone setting, and project kickoff.',
      },
      {
        ...spanishContent.lifecycle.phases[2],
        title: 'UX/UI design',
        description: 'Creating intuitive, user-centered interfaces and flows.',
      },
      {
        ...spanishContent.lifecycle.phases[3],
        title: 'Frontend development',
        description: 'Implementing high-fidelity mobile and web interfaces.',
      },
      {
        ...spanishContent.lifecycle.phases[4],
        title: 'Backend development',
        description: 'Building robust, scalable architectures.',
      },
      {
        ...spanishContent.lifecycle.phases[5],
        description: 'Thorough testing to ensure the highest product quality.',
      },
      {
        ...spanishContent.lifecycle.phases[6],
        title: 'Deployment',
        description: 'A controlled production launch.',
      },
      {
        ...spanishContent.lifecycle.phases[7],
        title: 'Training',
        description: 'Final delivery, product training, and documentation.',
      },
    ],
  },
  stack: {
    ...spanishContent.stack,
    title: 'Technologies and tools',
    categories: spanishContent.stack.categories.map((category) => ({
      ...category,
      title:
        (
          { Móvil: 'Mobile', 'Producto & IA': 'Product & AI' } as Record<
            string,
            string
          >
        )[category.title] ?? category.title,
    })),
  },
  contact: {
    ...spanishContent.contact,
    title: 'Get in touch',
    description:
      'Tell me about your idea or challenge. I’m always open to discussing new projects and opportunities.',
    projectTypes: [
      { label: 'Mobile app', value: 'mobile' },
      { label: 'Web app', value: 'web' },
      { label: 'Automation', value: 'automation' },
      { label: 'Other', value: 'other' },
    ],
  },
  footer: { copyright: 'Designed and developed by me. All rights reserved.' },
} as const;
