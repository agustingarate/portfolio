export type IconName =
  | 'arrow-right'
  | 'automation'
  | 'backend'
  | 'check'
  | 'cloud'
  | 'code'
  | 'copy'
  | 'download'
  | 'external-link'
  | 'frontend'
  | 'figma'
  | 'flutter'
  | 'github'
  | 'home'
  | 'layers'
  | 'linkedin'
  | 'location'
  | 'mail'
  | 'mobile'
  | 'nodejs'
  | 'python'
  | 'react'
  | 'react-native'
  | 'expo'
  | 'person'
  | 'rocket'
  | 'services'
  | 'school'
  | 'sparkles'
  | 'swift'
  | 'tailwind'
  | 'twitter'
  | 'utn'
  | 'web'
  | 'work';

export type NavigationItem = {
  label: string;
  href: `#${string}`;
  icon: IconName;
};
export type Experience = {
  period: string;
  role: string;
  company: string;
  companyUrl: string;
  summary: string;
  highlights: readonly string[];
  technologies: readonly string[];
};
export type EducationMilestone = {
  year: string;
  label: string;
};
export type Education = {
  title: string;
  degree: string;
  institution: string;
  institutionLogo: IconName;
  description: string;
  topics: readonly string[];
  milestones: readonly EducationMilestone[];
};
export type Service = {
  title: string;
  description: string;
  detail?: string;
  icon: IconName;
  featured?: boolean;
};
export type LifecyclePhase = {
  id: string;
  title: string;
  description: string;
  startWeek: number;
  duration: number;
  tone: 'blue' | 'coral' | 'lilac' | 'green' | 'cream';
};
export type StackCategory = {
  title: string;
  icon: IconName;
  technologies: readonly string[];
  tone: LifecyclePhase['tone'];
};
export type Technology = { label: string; icon: IconName };
export type ProjectType = { label: string; value: string };
export type SocialLink = { label: string; href: string; icon: IconName };
