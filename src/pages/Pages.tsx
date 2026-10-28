import { ArrowDownRight, ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from 'lucide-react';
import {
  ContactStrip,
  Education,
  PageIntro,
  ProjectGrid,
  ResumeLink,
  SectionHeading,
  Skills,
  Timeline,
  WorkMap,
} from '../components/Site';
import { findProject, identity, projectPath, projects, publishedProjects } from '../content/portfolio';
import type { Project } from '../content/types';
import type { Route } from './routes';

function Home() {
  const featured = [
    'spring-boot-microservices',
    'data-pipeline-optimization',
    'registrar-integration-platform',
    'event-ingestion-pipeline',
  ].map((slug) => findProject(slug)!);
  return (
    <>
      <section className="hero wrap">
        <div className="hero-topline">
          <p className="eyebrow">
            <span className="status-mark" aria-hidden="true" />
            KEVIN PATEL / SOFTWARE ENGINEER
          </p>
          <span className="mono hero-location">MUMBAI, INDIA</span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <h1>
              Backend systems.
              <br />
              <em>Data in motion.</em>
            </h1>
            <p className="hero-lede">
              I build the systems behind the interface. From Spring Boot services to PySpark pipelines, my
              work follows the data, the contracts and the boundaries between them.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="/projects/">
                Explore my work <ArrowDownRight size={18} aria-hidden="true" />
              </a>
              <ResumeLink quiet />
            </div>
          </div>
          <aside className="hero-index" aria-label="Selected areas of work">
            <div className="hero-index-top">
              <span className="mono">THE WORK, AT A GLANCE</span>
              <span className="index-symbol" aria-hidden="true">
                ✳
              </span>
            </div>
            <a href={projectPath('spring-boot-microservices')}>
              <span className="index-number">01</span>
              <span>
                <small>APPLICATION ENGINEERING</small>
                <strong>Service boundaries</strong>
              </span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a href={projectPath('event-ingestion-pipeline')}>
              <span className="index-number">02</span>
              <span>
                <small>DATA ENGINEERING</small>
                <strong>Data contracts</strong>
              </span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a href={projectPath('registrar-integration-platform')}>
              <span className="index-number">03</span>
              <span>
                <small>INTEGRATION ENGINEERING</small>
                <strong>Domain operations</strong>
              </span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <p className="hero-index-bottom">
              Different responsibilities.
              <br />
              One connected engineering perspective.
            </p>
          </aside>
        </div>
        <div className="proof-strip">
          <span className="mono">CURRENTLY</span>
          <p>
            <strong>Associate Software Engineer</strong>
            <span>Vertoz Limited / ConnectReseller</span>
          </p>
          <span className="proof-date">AUG 2025 — PRESENT</span>
          <a href="/experience/" aria-label="View my engineering experience">
            <ArrowUpRight size={21} aria-hidden="true" />
          </a>
        </div>
      </section>
      <section className="section wrap" id="notes">
        <SectionHeading
          number="01"
          eyebrow="SELECTED ENGINEERING WORK"
          title={
            <>
              The details
              <br />
              <em>make the difference.</em>
            </>
          }
        >
          <p>Actual problems, my contribution and the decisions behind the implementation.</p>
          <a className="text-link" href="/projects/">
            All six case studies <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </SectionHeading>
        <ProjectGrid projects={featured} featured />
      </section>
      <section className="section experience-section wrap" id="journey">
        <SectionHeading
          number="02"
          eyebrow="THE THROUGH-LINE"
          title={
            <>
              From moving data
              <br />
              to building systems.
            </>
          }
        >
          <a className="text-link" href="/experience/">
            Full experience <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </SectionHeading>
        <Timeline compact />
      </section>
      <section className="section map-section wrap">
        <SectionHeading
          number="03"
          eyebrow="TWO PERSPECTIVES"
          title={
            <>
              Different layers.
              <br />
              <em>The same curiosity.</em>
            </>
          }
        >
          <p>Explore the engineering concerns that connect my backend and data work.</p>
        </SectionHeading>
        <WorkMap />
      </section>
      <section className="section wrap" id="skills">
        <SectionHeading
          number="04"
          eyebrow="TOOLS IN CONTEXT"
          title={
            <>
              A stack is useful.
              <br />
              The context matters.
            </>
          }
        >
          <a className="text-link" href="/skills/">
            Explore technical skills <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </SectionHeading>
        <Skills compact />
      </section>
      <section className="section about-home wrap" id="about">
        <SectionHeading
          number="05"
          eyebrow="FOUNDATIONS"
          title={
            <>
              An engineer,
              <br />
              <em>still asking why.</em>
            </>
          }
        >
          <p>A Computer Engineering graduate working across backend systems and data at Vertoz.</p>
          <a className="text-link" href="/about/">
            More about me <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </SectionHeading>
        <Education />
      </section>
      <ContactStrip />
    </>
  );
}

function About() {
  return (
    <>
      <PageIntro
        label="ABOUT"
        title={
          <>
            Curious about the
            <br />
            <em>layers underneath.</em>
          </>
        }
      >
        <p>
          I’m Kevin Patel, a software engineer in Mumbai. I work at Vertoz Limited, where my experience has
          grown from data engineering into backend application development.
        </p>
      </PageIntro>
      <section className="section wrap prose-split">
        <p className="eyebrow">THE ENGINEERING PERSPECTIVE</p>
        <div className="prose">
          <h2>
            Follow the data.
            <br />
            Understand the system.
          </h2>
          <p>
            As a Data Engineer Intern from June to August 2025, I worked across multiple Vertoz products on
            scheduled ingestion, PySpark transformations, event processing and analytical data access.
          </p>
          <p>
            Since August 2025, I’ve been an Associate Software Engineer. My backend work includes
            ConnectReseller, a Vertoz product, with contributions to Spring Boot services, MySQL models,
            registry integrations and hierarchical account access.
          </p>
          <p>
            The through-line is how software moves and represents information: a field in an event, a response
            from a registrar, a permission relationship or a model prediction. I’m interested in making those
            boundaries understandable and useful.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="/experience/">
              Explore my experience <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <ResumeLink quiet />
          </div>
        </div>
      </section>
      <section className="section wrap">
        <SectionHeading
          number="01"
          eyebrow="EDUCATION & LEARNING"
          title={
            <>
              Strong foundations.
              <br />
              <em>Continued learning.</em>
            </>
          }
        />
        <Education />
        <p className="credential-note">
          These are the course titles documented in my resume; they are not claims of vendor-issued
          professional certification.
        </p>
      </section>
      <ContactStrip />
    </>
  );
}

function ExperiencePage() {
  return (
    <>
      <PageIntro
        label="EXPERIENCE"
        title={
          <>
            From data workflows
            <br />
            <em>to domain systems.</em>
          </>
        }
      >
        <p>
          Two roles at Vertoz Limited. A foundation in data processing, followed by backend engineering for
          ConnectReseller.
        </p>
      </PageIntro>
      <section className="section wrap">
        <h2 className="sr-only">Professional experience at Vertoz</h2>
        <Timeline />
        <div className="experience-note">
          <span className="mono">THE CONTEXT</span>
          <p>
            Vertoz Limited is my employer. ConnectReseller is a product within Vertoz. My internship covered
            multiple products; the data engineering work is not attributed to Spoutro alone.
          </p>
        </div>
        <ResumeLink />
      </section>
      <ContactStrip />
    </>
  );
}

function ProjectsPage() {
  return (
    <>
      <PageIntro
        label="WORK"
        title={
          <>
            Engineering work.
            <br />
            <em>With the context.</em>
          </>
        }
      >
        <p>
          Selected contributions from Vertoz and a personal machine learning project. Each case study
          separates the problem, my work, the outcome and the trade-offs.
        </p>
      </PageIntro>
      <section className="section work-index wrap" data-project-browser>
        <div className="project-tools" data-project-tools hidden>
          <div className="filter-controls" role="group" aria-label="Filter case studies">
            {['All', 'Backend', 'Data engineering', 'Machine learning'].map((category) => (
              <button type="button" data-filter={category} aria-pressed={category === 'All'} key={category}>
                {category}
              </button>
            ))}
          </div>
          <div className="project-search">
            <label htmlFor="project-search">Find a project or technology</label>
            <input
              id="project-search"
              type="search"
              placeholder="Try Kafka or MySQL…"
              data-project-search
              autoComplete="off"
            />
          </div>
        </div>
        <div className="project-index-label">
          <h2 className="mono">SELECTED CASE STUDIES</h2>
          <p data-project-count role="status" aria-live="polite">
            {publishedProjects.length} projects
          </p>
        </div>
        <ProjectGrid />
        <p className="empty-state" data-project-empty hidden>
          No projects match these filters. Try another technology or select All.
        </p>
      </section>
      <ContactStrip />
    </>
  );
}

function CaseStudy({ project, review }: { project: Project; review: boolean }) {
  const visibleMetrics = project.metrics?.filter((metric) => metric.status !== 'pending');
  const showDiagram = project.architecture && (project.architecture.status === 'approved' || review);
  const headings = [
    'Context',
    'My contribution',
    'Implementation',
    ...(showDiagram ? ['Architecture'] : []),
    'Outcome',
    'Trade-offs',
    'What I would improve',
  ];
  const anchors = [
    'context',
    'contribution',
    'implementation',
    ...(showDiagram ? ['architecture'] : []),
    'outcome',
    'tradeoffs',
    'improvements',
  ];
  return (
    <>
      <div className="case-intro wrap">
        <div className="breadcrumb">
          <a href="/">Home</a>
          <span aria-hidden="true">/</span>
          <a href="/projects/">Work</a>
          <span aria-hidden="true">/</span>
          <span>Case {project.number}</span>
        </div>
        <div className="case-eyebrow">
          <p className="eyebrow">{project.category}</p>
          <span className="mono">CASE STUDY / {project.number}</span>
        </div>
        <h1>{project.title}</h1>
        <p className="case-summary">{project.summary}</p>
        <div className="case-facts">
          <div>
            <span className="mono">CONTEXT</span>
            <strong>{project.context}</strong>
          </div>
          <div>
            <span className="mono">MY ROLE</span>
            <strong>{project.role}</strong>
          </div>
          <div>
            <span className="mono">PERIOD</span>
            <strong>{project.year}</strong>
          </div>
        </div>
        <div className="tags">
          {project.technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </div>
      <div className="case-layout section wrap">
        <aside className="case-navigation">
          <p className="eyebrow">IN THIS CASE STUDY</p>
          <nav aria-label="Case study sections">
            {headings.map((heading, index) => (
              <a href={`#${anchors[index]}`} key={heading}>
                <span className="mono">0{index + 1}</span>
                {heading}
              </a>
            ))}
          </nav>
          <a className="text-link" href="/projects/">
            All engineering work <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </aside>
        <article className="case-content">
          <section id="context">
            <p className="eyebrow">01 / THE CONTEXT</p>
            <h2>Problem & constraints</h2>
            <p>{project.problem}</p>
            <p>{project.constraints}</p>
          </section>
          <section id="contribution">
            <p className="eyebrow">02 / MY CONTRIBUTION</p>
            <h2>The work I contributed</h2>
            <ul className="contribution-list">
              {project.contribution.map((item) => (
                <li key={item}>
                  <Check size={17} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <section id="implementation">
            <p className="eyebrow">03 / IMPLEMENTATION</p>
            <h2>Decisions at the boundaries</h2>
            <div className="implementation-list">
              {project.implementation.map((item, index) => (
                <details key={item.title} open={index === 0}>
                  <summary>
                    <span className="mono">0{index + 1}</span>
                    {item.title}
                    <span className="detail-symbol" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <div>
                    <p>{item.text}</p>
                    {item.points && (
                      <ul>
                        {item.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </section>
          {showDiagram && (
            <section id="architecture">
              <p className="eyebrow">ARCHITECTURE</p>
              <DraftDiagram project={project} />
            </section>
          )}
          <section id="outcome">
            <p className="eyebrow">THE OUTCOME</p>
            <h2>What changed</h2>
            <p>{project.outcome}</p>
            {visibleMetrics?.map((metric) => (
              <div className="metric" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
                <p>{metric.qualification}</p>
              </div>
            ))}
          </section>
          <section id="tradeoffs">
            <p className="eyebrow">THE TRADE-OFFS</p>
            <h2>What the work brings into focus</h2>
            <p>{project.tradeoffs}</p>
          </section>
          <section id="improvements">
            <p className="eyebrow">NEXT ITERATION</p>
            <h2>What I would improve</h2>
            <p>{project.nextSteps}</p>
          </section>
          <div className="case-source">
            <p className="mono">ABOUT THIS ACCOUNT</p>
            <p>
              Based on my documented experience and resume. Employer source code and private infrastructure
              details are not published.
            </p>
          </div>
        </article>
      </div>
      <section className="section wrap related-projects">
        <SectionHeading number="→" eyebrow="KEEP EXPLORING" title="Related engineering work" />
        <ProjectGrid projects={project.related.map((slug) => findProject(slug)!)} />
      </section>
      <ContactStrip />
    </>
  );
}

function Contact() {
  return (
    <>
      <PageIntro
        label="CONTACT"
        title={
          <>
            Good work starts
            <br />
            <em>with a conversation.</em>
          </>
        }
      >
        <p>Get in touch about software engineering, backend systems and data engineering opportunities.</p>
      </PageIntro>
      <section className="section contact-layout wrap">
        <div className="contact-primary">
          <p className="eyebrow">THE DIRECT ROUTE</p>
          <a className="big-email" href={`mailto:${identity.email}`}>
            {identity.email}
            <ArrowUpRight size={28} aria-hidden="true" />
          </a>
          <div className="copy-email">
            <button className="button button-outline" type="button" data-copy-email={identity.email} hidden>
              <Copy size={15} aria-hidden="true" />
              Copy email address
            </button>
            <span role="status" data-copy-status aria-live="polite" />
          </div>
          <p className="contact-location">{identity.location}</p>
          <ResumeLink />
        </div>
        <div className="contact-profiles">
          <a href={identity.github}>
            <Github aria-hidden="true" />
            <span>
              <strong>GitHub</strong>
              <small>Code & repositories</small>
            </span>
            <ArrowUpRight size={19} aria-hidden="true" />
          </a>
          <a href={identity.linkedin}>
            <Linkedin aria-hidden="true" />
            <span>
              <strong>LinkedIn</strong>
              <small>Professional profile</small>
            </span>
            <ArrowUpRight size={19} aria-hidden="true" />
          </a>
          <a href={`mailto:${identity.email}`}>
            <Mail aria-hidden="true" />
            <span>
              <strong>Email</strong>
              <small>Engineering conversations</small>
            </span>
            <ArrowUpRight size={19} aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}

function DraftDiagram({ project }: { project: Project }) {
  const diagram = project.architecture;
  if (!diagram) return null;
  return (
    <figure className="architecture-figure">
      <figcaption>
        <span className={`diagram-state ${diagram.status}`}>
          {diagram.status === 'draft' ? 'DRAFT / OWNER REVIEW REQUIRED' : 'APPROVED DIAGRAM'}
        </span>
        <h3>{diagram.title}</h3>
        <p>{diagram.description}</p>
      </figcaption>
      <ol className="diagram-stages">
        {diagram.stages.map((stage, index) => (
          <li key={stage.label}>
            <span className="mono">0{index + 1}</span>
            <strong>{stage.label}</strong>
            <small>{stage.detail}</small>
          </li>
        ))}
      </ol>
      {diagram.status === 'draft' && (
        <div className="diagram-questions">
          <h4>Confirm before publication</h4>
          <ul>
            {diagram.questions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
        </div>
      )}
    </figure>
  );
}

function Review() {
  return (
    <>
      <PageIntro
        label="OWNER REVIEW"
        title={
          <>
            Architecture sketches.
            <br />
            <em>Not yet approved.</em>
          </>
        }
      >
        <p>
          These sanitized proposals are excluded from production builds. Confirm every connection and boundary
          before changing a diagram’s status to approved.
        </p>
      </PageIntro>
      <section className="section review-grid wrap">
        {projects.map((project) => (
          <article key={project.slug}>
            <h2 className="eyebrow">
              CASE {project.number} / {project.title}
            </h2>
            <DraftDiagram project={project} />
            {project.metrics
              ?.filter((metric) => metric.status === 'pending')
              .map((metric) => (
                <div className="review-metric" key={metric.label}>
                  <strong>
                    {metric.label}: {metric.value}
                  </strong>
                  <p>{metric.qualification}</p>
                  <span>Source: {metric.source}</span>
                </div>
              ))}
            <a className="text-link" href={projectPath(project.slug)}>
              Review case study <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </article>
        ))}
      </section>
    </>
  );
}

export function Page({ route, review }: { route: Route; review: boolean }) {
  switch (route.kind) {
    case 'home':
      return <Home />;
    case 'about':
      return <About />;
    case 'experience':
      return <ExperiencePage />;
    case 'projects':
      return <ProjectsPage />;
    case 'project': {
      const project = findProject(route.slug!);
      return project ? <CaseStudy project={project} review={review} /> : <NotFound />;
    }
    case 'skills':
      return (
        <>
          <PageIntro
            label="TECHNICAL SKILLS"
            title={
              <>
                Tools, connected
                <br />
                <em>to the work.</em>
              </>
            }
          >
            <p>
              Backend and data engineering are my primary focus. Machine learning and supporting technologies
              are shown in their project or resume context.
            </p>
          </PageIntro>
          <section className="section wrap">
            <h2 className="sr-only">Technology groups</h2>
            <Skills />
            <div className="experience-note">
              <span className="mono">HOW TO READ THIS</span>
              <p>
                These groups describe technologies I have worked with or documented in my resume. They are not
                proficiency scores or a claim of equal specialization.
              </p>
            </div>
          </section>
          <ContactStrip />
        </>
      );
    case 'contact':
      return <Contact />;
    case 'review':
      return <Review />;
    default:
      return <NotFound />;
  }
}

function NotFound() {
  return (
    <section className="not-found wrap">
      <p className="eyebrow">404 / PAGE NOT FOUND</p>
      <h1>
        A missing route.
        <br />
        <em>A way back.</em>
      </h1>
      <p>This page isn’t here. There’s plenty of engineering work to explore.</p>
      <div className="hero-actions">
        <a className="button button-primary" href="/projects/">
          Explore my work <ArrowUpRight size={17} aria-hidden="true" />
        </a>
        <a className="button button-outline" href="/">
          Back to home
        </a>
      </div>
    </section>
  );
}
