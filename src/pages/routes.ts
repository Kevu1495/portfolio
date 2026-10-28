import { publishedProjects } from '../content/portfolio';
import type { SeoMetadata } from '../content/types';

export type Route = SeoMetadata & {
  kind: 'home' | 'about' | 'experience' | 'projects' | 'project' | 'skills' | 'contact' | 'review' | '404';
  slug?: string;
};

export function getRoutes(review = false): Route[] {
  return [
    {
      path: '/',
      kind: 'home',
      title: 'Kevin Patel — Software Engineer | Backend & Data Systems',
      description:
        'Kevin Patel is a software engineer at Vertoz Limited in Mumbai. Explore his backend engineering, data pipelines, registrar integrations and MedLeaf project.',
    },
    {
      path: '/about/',
      kind: 'about',
      title: 'About Kevin Patel — Software Engineer',
      description:
        'Kevin Patel’s engineering background, Computer Engineering education and selected coursework, from data processing to backend services at Vertoz.',
    },
    {
      path: '/experience/',
      kind: 'experience',
      title: 'Experience — Kevin Patel | Vertoz & ConnectReseller',
      description:
        'Kevin Patel’s career at Vertoz: Data Engineer Intern, June–August 2025, and Associate Software Engineer from August 2025, including ConnectReseller.',
    },
    {
      path: '/projects/',
      kind: 'projects',
      title: 'Engineering Case Studies — Kevin Patel',
      description:
        'Explore Kevin Patel’s contributions to Spring Boot services, PySpark pipelines, registrar integrations, account context, event processing and MedLeaf.',
    },
    ...publishedProjects.map((project): Route => ({
      path: `/projects/${project.slug}/`,
      kind: 'project',
      slug: project.slug,
      title: `${project.title} — Kevin Patel`,
      description: `${project.cardSummary} A case study by Kevin Patel.`,
    })),
    {
      path: '/skills/',
      kind: 'skills',
      title: 'Technical Skills in Context — Kevin Patel',
      description:
        'Java, Spring Boot, Python, Go, PySpark, Kafka, MySQL and PyTorch connected to Kevin Patel’s backend, data engineering and personal project experience.',
    },
    {
      path: '/contact/',
      kind: 'contact',
      title: 'Contact Kevin Patel — Engineering Opportunities',
      description:
        'Contact Kevin Patel in Mumbai about software, backend and data engineering opportunities. Find his email, GitHub, LinkedIn and downloadable resume.',
    },
    ...(review
      ? [
          {
            path: '/review/architecture/',
            kind: 'review' as const,
            title: 'Architecture Review — Unpublished Drafts',
            description: 'Owner review of sanitized draft diagrams and unresolved factual questions.',
            noindex: true,
          },
        ]
      : []),
    {
      path: '/404.html',
      kind: '404',
      title: 'Page Not Found — Kevin Patel',
      description:
        'This page could not be found. Explore Kevin Patel’s engineering work or return to the homepage.',
      noindex: true,
    },
  ];
}
