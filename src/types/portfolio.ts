export type Locale = "vi" | "en";

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectItem {
  id: string;
  phase: string;
  phaseLabel: string;
  title: string;
  description: string;
  result: string;
  image: string;
  tags: string[];
  links?: ProjectLink[];
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface TechnologyItem {
  name: string;
  purpose: string;
}

export interface ProjectCase {
  role: string;
  challenge: string;
  responsibilities: string[];
  process: ProcessStep[];
  technologies: TechnologyItem[];
  outcome: string;
  evidence: string[];
  learning: string;
  privacy?: string;
  privacyNote?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  description: string;
  skills: string[];
  verifyUrl: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location?: string;
  summary?: string;
  highlights: string[];
  tags: string[];
  verifiedNote?: string;
  hasRecommendation?: boolean;
}

export interface SystemStage {
  number: string;
  label: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ToolItem {
  name: string;
  category: string;
  icon: string;
}

export interface PortfolioContent {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    systems: string;
    experience: string;
    projects: string;
    proof: string;
    contact: string;
  };
  disclosure: {
    profileEyebrow: string;
    profileTitle: string;
    profileOpen: string;
    profileClose: string;
    capabilityOpen: string;
    capabilityClose: string;
  };
  hero: {
    eyebrow: string;
    name: string;
    title: string;
    intro: string;
    primary: string;
    secondary: string;
    cv: string;
    cvUrl: string;
    status: string;
    footnote: string;
    profileLabel: string;
    profileDirection: string;
    profileTitle: string;
    profileAreas: { title: string; meta: string }[];
    profileRouteLabel: string;
    profileRoute: string[];
    profileMetrics: string[];
  };
  system: {
    eyebrow: string;
    status: string;
    title: string;
    intro: string;
    stages: SystemStage[];
    tools: {
      eyebrow: string;
      title: string;
      intro: string;
      categories?: {
        id: string;
        name: string;
        items: string[];
      }[];
      groups?: {
        index: string;
        title: string;
        items: string[];
      }[];
    };
  };
  journey?: {
    eyebrow: string;
    title: string;
    intro: string;
    milestones: {
      year: string;
      title: string;
      role: string;
      focus: string;
      highlight: string;
    }[];
  };
  work?: {
    eyebrow: string;
    title: string;
    intro: string;
    roles: {
      title: string;
      company: string;
      period: string;
      bullets: string[];
      skills: string[];
    }[];
  };
  experience: {
    eyebrow: string;
    title: string;
    intro: string;
    items: ExperienceItem[];
  };
  projects: {
    eyebrow: string;
    title: string;
    intro: string;
    filterAll: string;
    categories: {
      id: string;
      label: string;
    }[];
    items: ProjectItem[];
  };
  certificates: {
    eyebrow: string;
    title: string;
    intro: string;
    viewCredential: string;
    items: CertificateItem[];
  };
  about?: {
    eyebrow: string;
    title: string;
    intro: string;
    paragraphs: string[];
    skills: {
      category: string;
      items: string[];
    }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    email: string;
    phone?: string;
    linkedin: string;
    github: string;
    facebook?: string;
    cta: string;
    copied: string;
  };
  footer: {
    copyright: string;
    builtWith: string;
    top: string;
  };
}

export interface CaseStudyData {
  labels: {
    back: string;
    role: string;
    result: string;
    scope: string;
    academic: string;
    professional: string;
    map: string;
    challenge: string;
    roleSection: string;
    process: string;
    technology: string;
    outcome: string;
    learning: string;
    imageCaption: string;
    previous: string;
    next: string;
    contactEyebrow: string;
    contactTitle: string;
    contactButton: string;
    sourceFallback: string;
    viewAll: string;
    nextSection: string;
    prevSection: string;
    notFoundTitle: string;
    notFoundText: string;
    notFoundButton: string;
  };
  items: Record<string, ProjectCase>;
}
