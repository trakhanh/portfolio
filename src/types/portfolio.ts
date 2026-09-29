export type Locale = "vi" | "en";

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectItem {
  id: string;
  phase: "foundation" | "professional" | "product" | string;
  phaseLabel: string;
  title: string;
  description: string;
  result: string;
  image: string;
  tags: readonly string[];
  links?: readonly ProjectLink[];
  /** Where the work was done, e.g. "Bông Trà F&B"; orgKey links it to an experience entry. */
  org: string;
  orgKey: string;
  period: string;
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
  responsibilities: readonly string[];
  process: readonly ProcessStep[];
  technologies: readonly TechnologyItem[];
  outcome: string;
  evidence: readonly string[];
  learning: string;
  privacyNote?: string;
}

export interface CertificateItem {
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  tags: readonly string[];
  verifyUrl: string;
  courseUrl?: string;
}

export interface ExperienceItem {
  date: string;
  company: string;
  role: string;
  current: boolean;
  highlights: readonly string[];
  /** Matches ProjectItem.orgKey to list the projects done in this role. */
  key?: string;
  /** Live products shipped in this role. */
  links?: readonly { label: string; url: string; note: string }[];
}

export interface SystemStage {
  number: string;
  label: string;
  title: string;
  description: string;
  tags: readonly string[];
}

export interface Metric {
  value: string;
  label: string;
}

export interface WorkArea {
  index: string;
  title: string;
  description: string;
  capabilities: readonly string[];
  note: string;
}

export interface Recommendation {
  eyebrow: string;
  title: string;
  description: string;
  issuer: string;
  issuerRole: string;
  date: string;
  highlights: readonly string[];
  preview: string;
  pages: readonly string[];
  previewAlt: string;
  file: string;
  view: string;
  download: string;
  modalTitle: string;
  pageLabel: string;
  close: string;
}

export interface PortfolioContent {
  meta: { title: string; description: string };
  nav: {
    systems: string;
    experience: string;
    projects: string;
    proof: string;
    contact: string;
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
    profileAreas: readonly { title: string; meta: string }[];
    profileRoute: readonly string[];
  };
  system: {
    eyebrow: string;
    status: string;
    title: string;
    intro: string;
    stages: readonly SystemStage[];
    tools: {
      eyebrow: string;
      title: string;
      intro: string;
      groups: readonly { index: string; title: string; items: readonly string[] }[];
    };
    metrics: readonly Metric[];
    proofNote: string;
  };
  journey: {
    eyebrow: string;
    title: string;
    intro: string;
    items: readonly {
      number: string;
      label: string;
      title: string;
      description: string;
      meta: string;
    }[];
  };
  work: {
    eyebrow: string;
    title: string;
    intro: string;
    education: {
      label: string;
      school: string;
      degree: string;
      description: string;
      focusLabel: string;
      focus: readonly string[];
      status: string;
    };
    areas: readonly WorkArea[];
  };
  experience: {
    eyebrow: string;
    title: string;
    intro: string;
    recommendation: Recommendation;
    items: readonly ExperienceItem[];
  };
  projects: {
    eyebrow: string;
    title: string;
    intro: string;
    filters: { all: string; foundation: string; professional: string; product: string };
    items: readonly ProjectItem[];
  };
  certificates: {
    eyebrow: string;
    title: string;
    intro: string;
    moreLabel: string;
    moreItems: readonly { code: string; title: string; issuer: string; status: string }[];
    verify: string;
    course: string;
    viewDetails: string;
    modalSkillsLabel: string;
    modalIssuerLabel: string;
    modalDateLabel: string;
    items: readonly CertificateItem[];
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    groups: readonly { title: string; items: readonly string[] }[];
    cv: string;
    cvUrl: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    emailLabel: string;
    phoneLabel: string;
    socialLabel: string;
  };
  footer: string;
}

export interface CaseStudyData {
  labels: {
    back: string;
    role: string;
    result: string;
    scope: string;
    academic: string;
    professional: string;
    product: string;
    org: string;
    period: string;
    related: string;
    at: string;
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
