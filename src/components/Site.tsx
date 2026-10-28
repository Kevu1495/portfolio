import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Download, Github, Linkedin, Menu } from 'lucide-react';
import {
  credentials,
  education,
  experiences,
  identity,
  projectPath,
  publishedProjects,
  skillGroups,
} from '../content/portfolio';
import type { Project } from '../content/types';

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? (
    <ArrowUpRight size={18} aria-hidden="true" />
  ) : (
    <ArrowRight size={18} aria-hidden="true" />
  );
}

export function Header({ path }: { path: string }) {
  const links = [
    ['/projects/', 'Work'],
    ['/experience/', 'Experience'],
    ['/about/', 'About'],
    ['/skills/', 'Skills'],
  ];
  return (
    <header className="site-header" id="top">
      <div className="header-inner">
        <a className="brand" href="/" aria-label="Kevin Patel, home">
          <span className="brand-mark" aria-hidden="true">
            k<span>p</span>
            <i>.</i>
          </span>
          <span className="brand-name">
            Kevin Patel<span>SOFTWARE ENGINEER</span>
          </span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label="Open navigation"
          aria-expanded="false"
          aria-controls="primary-navigation"
          data-menu-toggle
          hidden
        >
          <Menu size={20} aria-hidden="true" />
          <span>Menu</span>
        </button>
        <nav
          className="primary-navigation"
          id="primary-navigation"
          aria-label="Main navigation"
          data-navigation
        >
          {links.map(([url, label]) => (
            <a key={url} href={url} aria-current={path.startsWith(url) ? 'page' : undefined}>
              {label}
            </a>
          ))}
          <a
            className="nav-contact"
            href="/contact/"
            aria-current={path === '/contact/' ? 'page' : undefined}
          >
            Let’s talk <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer wrap">
      <div className="footer-top">
        <a className="footer-name" href="/">
          Kevin Patel<span>Backend systems. Data in motion.</span>
        </a>
        <div className="footer-links">
          <a href={identity.resume} download="Kevin-Patel-Resume.pdf">
            Resume (PDF)
          </a>
          <a href={identity.github}>
            <Github size={16} aria-hidden="true" />
            GitHub
          </a>
          <a href={identity.linkedin}>
            <Linkedin size={16} aria-hidden="true" />
            LinkedIn
          </a>
          <a href={`mailto:${identity.email}`}>
            Email <Arrow diagonal />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          MUMBAI, INDIA <span aria-hidden="true">/</span> © {identity.updated.slice(0, 4)} KEVIN PATEL
        </span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}

export function Layout({
  path,
  children,
  review = false,
}: {
  path: string;
  children: ReactNode;
  review?: boolean;
}) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {review && (
        <div className="review-ribbon">
          REVIEW BUILD <span>Unpublished portfolio preview</span>
          <a href="/review/architecture/">
            Review diagrams <Arrow diagonal />
          </a>
        </div>
      )}
      <Header path={path} />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}

export function SectionHeading({
  number,
  eyebrow,
  title,
  children,
}: {
  number: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div className="section-heading-copy">
        <p className="eyebrow">
          <span className="section-number">{number}</span>
          {eyebrow}
        </p>
        <h2>{title}</h2>
      </div>
      {children && <div className="section-aside">{children}</div>}
    </div>
  );
}

export function PageIntro({
  label,
  title,
  children,
}: {
  label: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="page-intro wrap">
      <div className="breadcrumb">
        <a href="/">Home</a>
        <span aria-hidden="true">/</span>
        <span>{label}</span>
      </div>
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      <div className="page-lede">{children}</div>
    </div>
  );
}

export function ResumeLink({ quiet = false }: { quiet?: boolean }) {
  return (
    <a
      className={`button ${quiet ? 'button-outline' : 'button-primary'}`}
      href={identity.resume}
      download="Kevin-Patel-Resume.pdf"
    >
      Download resume <Download size={17} aria-hidden="true" />
      <span className="sr-only"> (PDF)</span>
    </a>
  );
}

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article
      className={`project-card ${featured ? 'project-card-featured' : ''}`}
      data-project-card
      data-category={project.category}
      data-search={`${project.title} ${project.summary} ${project.technologies.join(' ')}`}
    >
      <div className={`project-art art-${project.slug}`} aria-hidden="true">
        <span className="art-overline">{project.category}</span>
        <span className="art-glyph">
          {project.slug === 'spring-boot-microservices'
            ? '{ / }'
            : project.slug === 'data-pipeline-optimization'
              ? '∑'
              : project.slug === 'registrar-integration-platform'
                ? '.tld'
                : project.slug === 'event-ingestion-pipeline'
                  ? '↗'
                  : project.slug === 'secure-account-management'
                    ? '↳'
                    : 'mL'}
        </span>
        <span className="art-bottom">
          {project.technologies.slice(0, 3).join(' / ')}
          <span>{project.number}</span>
        </span>
        <span className="art-cross cross-one">+</span>
        <span className="art-cross cross-two">+</span>
      </div>
      <div className="project-card-body">
        <div className="project-meta">
          <span>{project.context}</span>
          <span>CASE {project.number}</span>
        </div>
        <h3>
          <a className="project-title-link" href={projectPath(project.slug)}>
            {project.shortTitle}
            <Arrow diagonal />
          </a>
        </h3>
        <p>{project.cardSummary}</p>
        <div className="tags">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function ProjectGrid({
  projects = publishedProjects,
  featured = false,
}: {
  projects?: Project[];
  featured?: boolean;
}) {
  return (
    <div className={`project-grid ${featured ? 'featured-grid' : ''}`} data-project-grid>
      {projects.map((project, index) => (
        <ProjectCard project={project} key={project.slug} featured={featured && index === 0} />
      ))}
    </div>
  );
}

export function Timeline({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`timeline ${compact ? 'timeline-compact' : ''}`}>
      {experiences.map((experience, index) => (
        <article className="timeline-item" key={experience.id}>
          <div className="timeline-date">
            <span className="timeline-dot" aria-hidden="true" />
            <span className="mono">{index === 0 ? 'NOW' : 'FOUNDATION'}</span>
            <p>
              <time dateTime={experience.startDate}>{experience.period.split(' - ')[0]}</time> -{' '}
              {experience.endDate ? <time dateTime={experience.endDate}>August 2025</time> : 'present'}
            </p>
          </div>
          <div className="timeline-body">
            <p className="eyebrow">
              {experience.employer}
              {experience.product && <span className="product-label">PRODUCT: {experience.product}</span>}
            </p>
            <h3>{experience.title}</h3>
            <p>{experience.summary}</p>
            {!compact && (
              <ul className="contribution-list">
                {experience.contributions.map((contribution) => (
                  <li key={contribution}>{contribution}</li>
                ))}
              </ul>
            )}
            <div className="tags">
              {experience.technologies.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <div className="inline-links">
              {experience.projects.slice(0, compact ? 1 : 3).map((slug) => {
                const project = publishedProjects.find((item) => item.slug === slug);
                return (
                  project && (
                    <a href={projectPath(slug)} key={slug}>
                      {compact ? 'Explore the work' : project.title}
                      <Arrow diagonal />
                    </a>
                  )
                );
              })}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function WorkMap() {
  return (
    <div className="work-map" data-work-map>
      <div
        className="work-map-controls"
        data-map-controls
        hidden
        role="tablist"
        aria-label="Explore engineering focus"
      >
        <button
          id="focus-backend"
          type="button"
          role="tab"
          aria-selected="true"
          aria-controls="map-backend"
          data-map-tab="backend"
        >
          01 / Backend systems
        </button>
        <button
          id="focus-data"
          type="button"
          role="tab"
          aria-selected="false"
          aria-controls="map-data"
          tabIndex={-1}
          data-map-tab="data"
        >
          02 / Data engineering
        </button>
      </div>
      <div className="work-map-panels">
        <div
          id="map-backend"
          className="map-panel"
          role="tabpanel"
          aria-labelledby="focus-backend"
          tabIndex={0}
          data-map-panel="backend"
        >
          <div className="map-graphic" aria-hidden="true">
            <div className="map-core">
              API<span>CONTRACTS</span>
            </div>
            <div className="map-satellite satellite-a">
              SERVICE
              <br />
              BOUNDARIES
            </div>
            <div className="map-satellite satellite-b">
              IDENTITY
              <br />& ACCESS
            </div>
            <div className="map-satellite satellite-c">
              RELATIONAL
              <br />
              DATA
            </div>
            <span className="map-caption">APPLICATION ENGINEERING</span>
          </div>
          <div className="map-copy">
            <p className="eyebrow">MAKE THE BOUNDARIES CLEAR</p>
            <h3>
              What happens
              <br />
              behind a request?
            </h3>
            <p>
              My ConnectReseller work spans service APIs, identity context, registrar integrations and the
              data models behind domain operations.
            </p>
            <a className="text-link" href={projectPath('spring-boot-microservices')}>
              Explore backend engineering <Arrow diagonal />
            </a>
            <div className="tags">
              <span>Spring Boot</span>
              <span>MySQL</span>
              <span>Kafka</span>
              <span>JWT</span>
            </div>
          </div>
        </div>
        <div
          id="map-data"
          className="map-panel"
          role="tabpanel"
          aria-labelledby="focus-data"
          tabIndex={0}
          data-map-panel="data"
        >
          <div className="map-graphic map-graphic-data" aria-hidden="true">
            <div className="map-core">
              DATA<span>CONTRACTS</span>
            </div>
            <div className="map-satellite satellite-a">
              BATCH
              <br />
              PROCESSING
            </div>
            <div className="map-satellite satellite-b">
              EVENT
              <br />
              FIELDS
            </div>
            <div className="map-satellite satellite-c">
              ANALYTICAL
              <br />
              QUERIES
            </div>
            <span className="map-caption">DATA ENGINEERING</span>
          </div>
          <div className="map-copy">
            <p className="eyebrow">KEEP THE DATA MEANINGFUL</p>
            <h3>
              Follow the field.
              <br />
              Understand the work.
            </h3>
            <p>
              My internship covered separate ingestion, batch, streaming and analytical workflows across
              multiple Vertoz products.
            </p>
            <a className="text-link" href={projectPath('event-ingestion-pipeline')}>
              Explore data engineering <Arrow diagonal />
            </a>
            <div className="tags">
              <span>Go</span>
              <span>PySpark</span>
              <span>Vertica</span>
              <span>Parquet</span>
            </div>
          </div>
        </div>
      </div>
      <p className="map-footnote">
        An index of engineering concerns. Select a case study for the implementation context.
      </p>
    </div>
  );
}

export function Skills({ compact = false }: { compact?: boolean }) {
  return (
    <div className="skills-list">
      {skillGroups.slice(0, compact ? 3 : undefined).map((group, index) => (
        <article className="skill-group" key={group.title}>
          <span className="skill-index mono">0{index + 1}</span>
          <div>
            <h3>{group.title}</h3>
            <p>{group.description}</p>
            {group.project && (
              <a className="text-link" href={projectPath(group.project)}>
                See the context <Arrow diagonal />
              </a>
            )}
          </div>
          <div className="tags">
            {group.technologies.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

export function Education({ showCredentials = true }: { showCredentials?: boolean }) {
  return (
    <div className="education-layout">
      <div>
        {education.map((item) => (
          <article className="education-item" key={item.qualification}>
            <span className="mono education-year">{item.year}</span>
            <h3>{item.qualification}</h3>
            <p>
              {item.institution}
              <br />
              {item.board}
            </p>
            <span className="education-result">{item.result}</span>
          </article>
        ))}
      </div>
      {showCredentials && (
        <div className="credentials">
          <p className="eyebrow">SELECTED COURSEWORK</p>
          {credentials.map((credential) => (
            <div className="credential" key={credential.title}>
              <h3>{credential.title}</h3>
              <p>
                {credential.instructor} <span aria-hidden="true">/</span> {credential.provider}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function ContactStrip() {
  return (
    <section className="contact-strip wrap" id="contact">
      <div>
        <p className="eyebrow">HAVE SOMETHING IN MIND?</p>
        <h2>
          Let’s make
          <br />
          <em>the connection.</em>
        </h2>
      </div>
      <div className="contact-strip-action">
        <p>For engineering opportunities and conversations about backend systems and data.</p>
        <a className="contact-email" href={`mailto:${identity.email}`}>
          {identity.email}
          <Arrow diagonal />
        </a>
        <span className="mono">MUMBAI, INDIA</span>
      </div>
    </section>
  );
}
