export type Category = 'Backend' | 'Data engineering' | 'Machine learning';

export interface Metric {
  label: string;
  value: string;
  source: string;
  status: 'verified' | 'reported' | 'pending';
  qualification: string;
}

export interface ArchitectureDiagram {
  title: string;
  description: string;
  status: 'draft' | 'approved';
  stages: { label: string; detail: string }[];
  questions: string[];
}

export interface CaseSection {
  title: string;
  text: string;
  points?: string[];
}

export interface Project {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  category: Category;
  context: string;
  role: string;
  year: string;
  summary: string;
  cardSummary: string;
  problem: string;
  constraints: string;
  contribution: string[];
  implementation: CaseSection[];
  outcome: string;
  tradeoffs: string;
  nextSteps: string;
  technologies: string[];
  related: string[];
  links?: { label: string; url: string }[];
  metrics?: Metric[];
  architecture?: ArchitectureDiagram;
  publicationStatus: 'published' | 'draft';
  evidence: string[];
}

export interface Experience {
  id: string;
  title: string;
  employer: string;
  product?: string;
  startDate: string;
  endDate?: string;
  period: string;
  summary: string;
  contributions: string[];
  technologies: string[];
  projects: string[];
}

export interface SkillGroup {
  title: string;
  description: string;
  technologies: string[];
  project?: string;
}

export interface Education {
  institution: string;
  board: string;
  qualification: string;
  year: string;
  result: string;
}

export interface Credential {
  title: string;
  instructor: string;
  provider: string;
}

export interface SeoMetadata {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
}
