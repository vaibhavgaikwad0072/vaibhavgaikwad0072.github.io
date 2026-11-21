export type Accent = 'violet' | 'electric' | 'cyan' | 'emerald' | 'amber' | 'rose';

export interface ProjectLink {
  github?: string;
  demo?: string;
}

export interface ProjectOutcome {
  value: string;
  label: string;
  note?: string;
}

export interface ProjectScreenshot {
  src: string;
  caption: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  category: string;
  year: string;
  status: 'Shipped' | 'In development' | 'Research';
  accent: Accent;
  tech: string[];
  links: ProjectLink;
  problem: string;
  solution: string;
  architecture: string[];
  features: string[];
  outcomes: ProjectOutcome[];
  screenshots: ProjectScreenshot[];
  disclaimer?: string;
}

export interface SkillItem {
  name: string;
  note?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  blurb: string;
  items: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  org: string;
  period: string;
  location: string;
  mode: string;
  summary: string;
  bullets: string[];
  tech: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  tech: string[];
  icon: ServiceIcon;
}

export type ServiceIcon =
  | 'chatbot'
  | 'rag'
  | 'llm'
  | 'automation'
  | 'ml'
  | 'dashboard'
  | 'backend'
  | 'database';

export interface EducationItem {
  institution: string;
  qualification: string;
  period: string;
  detail: string;
}

export interface SiteSettings {
  name: string;
  shortName: string;
  roles: string[];
  availability: string;
  location: string;
  email: string;
  github: string;
  portfolio: string;
  linkedin: string;
  resumeUrl: string;
  photoUrl: string;
  heroIntro: string;
  heroHeading: string;
  heroDescription: string;
  aboutParagraph: string;
  aboutSecondary: string;
  education: EducationItem[];
  certifications: string[];
}

export interface Inquiry {
  id: string;
  kind: 'project' | 'contact';
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'archived';
}

export interface SiteContent {
  version: number;
  settings: SiteSettings;
  projects: Project[];
  skillGroups: SkillGroup[];
  experience: ExperienceItem[];
  services: ServiceItem[];
  updatedAt: string;
}
