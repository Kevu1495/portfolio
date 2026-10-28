import type { Credential, Education, Experience, Project, SkillGroup } from './types';

export const identity = {
  name: 'Kevin Patel',
  title: 'Associate Software Engineer',
  positioning: 'Software engineer building backend systems and data-intensive platforms.',
  location: 'Mumbai, India',
  email: 'kevu1495@gmail.com',
  github: 'https://github.com/Kevu1495',
  linkedin: 'https://linkedin.com/in/kevu1495',
  employer: 'Vertoz Limited',
  site: 'https://kevinp.dev',
  resume: '/assets/kevin-patel-resume.pdf',
  updated: '2026-10-27',
} as const;

export const experiences: Experience[] = [
  {
    id: 'associate',
    title: 'Associate Software Engineer',
    employer: identity.employer,
    product: 'ConnectReseller',
    startDate: '2025-08',
    period: 'August 2025 - present',
    summary:
      'Backend engineering for ConnectReseller, a product within Vertoz: service boundaries, domain operations, relational data and delegated account access.',
    contributions: [
      'Contributed to modernizing a legacy Spring application into Spring Boot microservices, including API Gateway routing, authentication and business/domain services.',
      'Built REST APIs and registry integrations using REST and SOAP, with consistent response contracts and domain lifecycle, nameserver and glue-record workflows.',
      'Normalized MySQL schemas and improved foreign keys, indexes and queries; built paginated and filtered endpoints with Spring Data JPA.',
      'Implemented Kafka-based asynchronous notification workflows.',
      'Developed JWT-based hierarchical impersonation with stack-based identity transitions, relational role/feature/user mappings and permission-aware navigation.',
      'Implemented database-driven registrar routing and request/response normalization; communicated with clients to clarify requirements.',
    ],
    technologies: ['Java', 'Spring Boot', 'MySQL', 'JPA', 'Kafka', 'REST / SOAP', 'JWT'],
    projects: ['spring-boot-microservices', 'registrar-integration-platform', 'secure-account-management'],
  },
  {
    id: 'intern',
    title: 'Data Engineer Intern',
    employer: identity.employer,
    startDate: '2025-06',
    endDate: '2025-08',
    period: 'June 2025 - August 2025',
    summary:
      'Data engineering across multiple Vertoz products, spanning scheduled ingestion, batch transformation, streaming fields and analytical data access.',
    contributions: [
      'Wrote scheduled Python jobs to ingest endpoint JSON and insert or update database rows.',
      'Reworked applicable Bash/Impala-oriented batch workflows with PySpark and Vertica, processing date-partitioned Parquet, aggregating data and normalizing location fields.',
      'Optimized database writes and PySpark/JDBC execution; built Apache Superset analytics backed by Vertica.',
      'Worked on Go website-activity ingestion, device/geolocation enrichment and Kafka event production.',
      'Updated PySpark streaming transformations and Parquet output, including fixes for missing or incorrectly transmitted fields.',
      'Changed a Java analytical data-access path involving Vertica and Redis to reduce reliance on Impala.',
    ],
    technologies: ['Python', 'PySpark', 'Go', 'Kafka', 'Parquet', 'Vertica', 'Redis', 'Superset'],
    projects: ['data-pipeline-optimization', 'event-ingestion-pipeline'],
  },
];

export const education: Education[] = [
  {
    institution: "Vivekanand Education Society's Institute of Technology",
    board: 'University of Mumbai',
    qualification: 'Bachelor of Engineering in Computer Engineering',
    year: '2025',
    result: 'Overall CGPI: 9.45/10.0',
  },
  {
    institution: "Vivekanand Education Society's Polytechnic",
    board: 'Maharashtra State Board of Technical Education',
    qualification: 'Diploma in Computer Engineering',
    year: '2021',
    result: 'Percentage: 94.97%',
  },
];

export const credentials: Credential[] = [
  {
    title: 'Java Spring Framework 6 with Spring Boot 3 with Telusko',
    instructor: 'Navin Reddy',
    provider: 'Udemy',
  },
  { title: '2023-24 Tableau Certified Data Analyst Training', instructor: 'Jed Guinto', provider: 'Udemy' },
  { title: 'The Complete 2023 Software Testing Bootcamp', instructor: 'Tarek Roshdy', provider: 'Udemy' },
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'Backend & integrations',
    description: 'Services, API contracts and registrar operations at ConnectReseller.',
    technologies: ['Java', 'Spring', 'Spring Boot', 'REST', 'SOAP', 'Spring Data JPA', 'JWT'],
    project: 'spring-boot-microservices',
  },
  {
    title: 'Data & event processing',
    description: 'Scheduled jobs, streaming transformations and analytical workloads across Vertoz products.',
    technologies: [
      'Python',
      'Go',
      'PySpark',
      'Kafka',
      'Parquet',
      'HDFS',
      'Hive',
      'Impala',
      'Vertica',
      'Superset',
    ],
    project: 'data-pipeline-optimization',
  },
  {
    title: 'Persistence & data models',
    description: 'Relational modeling, analytical data access and caching.',
    technologies: ['MySQL', 'Redis', 'MongoDB'],
    project: 'registrar-integration-platform',
  },
  {
    title: 'Machine learning',
    description: 'Model development, preprocessing and Flask inference APIs in MedLeaf.',
    technologies: ['PyTorch', 'Python', 'Flask', 'AWS EC2'],
    project: 'medleaf',
  },
  {
    title: 'Supporting tools',
    description: 'Additional technologies documented in my resume.',
    technologies: ['Git', 'Docker', 'Jenkins', 'AWS S3', 'Angular', 'Tailwind CSS', 'Bootstrap'],
  },
];

export const projects: Project[] = [
  {
    slug: 'spring-boot-microservices',
    number: '01',
    title: 'From a Spring monolith to service boundaries',
    shortTitle: 'Breaking down the monolith.',
    category: 'Backend',
    context: 'Vertoz / ConnectReseller',
    role: 'Associate Software Engineer',
    year: '2025 - present',
    summary:
      'At Vertoz, I contributed to modernizing ConnectReseller from a legacy Spring application into Spring Boot microservices. My work covered gateway routing, service APIs, relational data models and Kafka-based notification workflows.',
    cardSummary: 'Spring Boot services, consistent APIs and asynchronous notifications for ConnectReseller.',
    problem:
      'A legacy Spring application brought authentication, business operations and domain functionality into the same application context. The modernization work introduced clearer service responsibilities while registrar and reseller features continued to evolve.',
    constraints:
      'The work involved existing business behavior, relational data and external registry integrations. Service boundaries needed to reflect those responsibilities rather than simply split technical layers.',
    contribution: [
      'Contributed to the move from legacy Spring to Spring Boot services.',
      'Worked on API Gateway routing, authentication/JWT generation and business/domain service functionality.',
      'Designed REST APIs with consistent response contracts.',
      'Improved normalized MySQL models and JPA queries, including pagination, joins, projections and aggregations.',
      'Implemented Kafka-based asynchronous notifications.',
    ],
    implementation: [
      {
        title: 'Start with responsibilities',
        text: 'Gateway routing, authentication, business operations and domain functionality are distinct concerns in this work. The portfolio describes these responsibilities without claiming a particular deployment topology.',
      },
      {
        title: 'Make API and data contracts explicit',
        text: 'Consistent REST responses and relational entity relationships supported the service APIs. Query work included joins, projections, aggregates and paginated or filtered responses.',
      },
      {
        title: 'Separate notifications from request handling',
        text: 'Kafka-based workflows supported asynchronous notifications. That is separate from the synchronous HTTP contracts exposed by the services.',
      },
    ],
    outcome:
      'The contribution spans Spring Boot modernization, gateway/service API work, normalized MySQL data and asynchronous notification workflows. No deployment-frequency, availability or scaling result is claimed here.',
    tradeoffs:
      'Splitting responsibilities can make code boundaries clearer, while introducing network failures and cross-service consistency concerns. Those trade-offs need evaluation alongside the simplicity of a monolith.',
    nextSteps:
      'I would document service-level API contracts and failure behavior together, then add contract checks around the integration boundaries. These are proposed improvements, not claims about the existing platform.',
    technologies: ['Java', 'Spring Boot', 'API Gateway', 'MySQL', 'Spring Data JPA', 'Kafka'],
    related: ['registrar-integration-platform', 'secure-account-management'],
    publicationStatus: 'published',
    evidence: [
      'Owner-confirmed responsibilities in the portfolio brief',
      'Attached resume: ConnectReseller experience',
    ],
    architecture: {
      title: 'Service responsibility sketch',
      status: 'draft',
      description:
        'A proposed summary of gateway, service and notification responsibilities. This is not a verified deployment diagram.',
      stages: [
        { label: 'API Gateway', detail: 'Request routing' },
        {
          label: 'Auth / business / domain services',
          detail: 'Distinct responsibilities; exact boundaries to confirm',
        },
        { label: 'Kafka', detail: 'Asynchronous notification events' },
        { label: 'Notification processing', detail: 'Consumer boundary to confirm' },
      ],
      questions: [
        'Which services publish notification events?',
        'Which calls pass through the gateway?',
        'Do not infer shared databases or independent deployment.',
      ],
    },
  },
  {
    slug: 'data-pipeline-optimization',
    number: '02',
    title: 'Reworking the batch data path',
    shortTitle: 'Making the batch path work better.',
    category: 'Data engineering',
    context: 'Vertoz / multiple products',
    role: 'Data Engineer Intern',
    year: 'June - August 2025',
    summary:
      'During my Vertoz internship, I worked on scheduled PySpark jobs that transformed date-partitioned Parquet and loaded Vertica. The work included aggregations, location-field normalization and tuning the database-write path.',
    cardSummary: 'Partitioned Parquet, PySpark transformations and a tuned Vertica write path.',
    problem:
      'Applicable legacy batch workflows used Bash and Impala-oriented processing. The work involved moving those transformations toward PySpark and Vertica and improving database writes and processing execution.',
    constraints:
      'The inputs were date-partitioned Parquet, the jobs were scheduled, and the transformations included analytical aggregations and location normalization. This work covered multiple products at Vertoz.',
    contribution: [
      'Processed date-partitioned Parquet in scheduled PySpark jobs.',
      'Implemented transformations, aggregations and location normalization into separate fields.',
      'Worked on migration from applicable legacy batch workflows toward PySpark and Vertica.',
      'Optimized database writes and the PySpark/JDBC execution path.',
      'Built Superset analytics backed by Vertica as related analytical work.',
    ],
    implementation: [
      {
        title: 'Use the input partitions deliberately',
        text: 'The jobs read date-partitioned Parquet. Transformation work included aggregating records and separating location information into fields such as country, state and city.',
      },
      {
        title: 'Treat the write path as part of the job',
        text: 'The Vertica load and JDBC behavior were part of the optimization work. Exact partition counts, batch sizes and database settings are not published because they have not been verified for this account.',
      },
      {
        title: 'Keep related workflows distinct',
        text: 'Superset reporting over Vertica and a Java analytical path involving Vertica and Redis were also part of my internship. They are separate contributions, not assumed stages of this batch pipeline.',
      },
    ],
    outcome:
      'Reworked batch processing in PySpark and Vertica, with transformation and database-write improvements. A numerical speedup is not presented as a verified benchmark.',
    tradeoffs:
      'Processing parallelism and database-write concurrency must be considered together: increasing one can move pressure to the other. Performance comparisons are only meaningful alongside comparable input and correct output.',
    nextSteps:
      'I would record input volume, partitioning, environment and stage-level timings for repeatable before/after comparisons, alongside row-count and aggregate checks.',
    technologies: ['Python', 'PySpark', 'Parquet', 'Vertica', 'JDBC', 'Superset'],
    related: ['event-ingestion-pipeline', 'spring-boot-microservices'],
    publicationStatus: 'published',
    evidence: [
      'Owner-confirmed batch-processing responsibilities',
      'Existing repository: batch migration and optimization notes',
      'Resume: reported daily-processing improvement',
    ],
    metrics: [
      {
        label: 'Reported job runtime',
        value: '~90 to ~10 minutes',
        status: 'pending',
        source: 'Portfolio brief and previous site',
        qualification:
          'Comparable workload, hardware and timing boundaries need confirmation. A comparable run would be 9x faster, or 88.9% less elapsed time.',
      },
      {
        label: 'Daily processing improvement',
        value: '10x',
        status: 'pending',
        source: 'Attached resume',
        qualification: 'A separate claim; not interchangeable with the 90-to-10-minute comparison.',
      },
    ],
    architecture: {
      title: 'Batch-processing sketch',
      status: 'draft',
      description:
        'Proposed batch sequence based on the confirmed Parquet, PySpark and Vertica responsibilities. Exact job boundaries need owner review.',
      stages: [
        { label: 'Date-partitioned Parquet', detail: 'Batch inputs' },
        { label: 'PySpark', detail: 'Transform, normalize and aggregate' },
        { label: 'JDBC write path', detail: 'Database-write tuning' },
        { label: 'Vertica', detail: 'Analytical destination' },
      ],
      questions: [
        'Do these stages describe the same optimized job?',
        'Confirm the original and replacement workflow boundaries.',
        'Keep Superset and Java/Redis paths separate unless their connection is confirmed.',
      ],
    },
  },
  {
    slug: 'registrar-integration-platform',
    number: '03',
    title: 'A consistent boundary for registrar integrations',
    shortTitle: 'Many providers. A clearer contract.',
    category: 'Backend',
    context: 'Vertoz / ConnectReseller',
    role: 'Associate Software Engineer',
    year: '2025 - present',
    summary:
      'For ConnectReseller at Vertoz, I worked on database-driven registrar routing and normalization of provider-specific request and response formats, alongside REST/SOAP registry integrations and domain lifecycle operations.',
    cardSummary:
      'Database-driven routing and normalized request/response formats across registrar integrations.',
    problem:
      'Registrar integrations expose different request fields, response shapes and error conventions. Domain-facing APIs need a consistent boundary while preserving the meaning of each provider response.',
    constraints:
      'Domain operations depend on registry state, nameserver validation and lifecycle behavior. Provider-specific behavior cannot simply be erased by a common response shape.',
    contribution: [
      'Implemented database-driven registrar routing and request/response normalization.',
      'Worked on REST and SOAP registry integrations.',
      'Improved domain expiration, deletion, redemption, registry-status and nameserver workflows.',
      'Worked on child-nameserver validation and glue-record creation.',
      'Clarified requirements directly with clients.',
    ],
    implementation: [
      {
        title: 'Keep provider formats at the boundary',
        text: 'The integration work translated differing provider request and response formats behind a normalized contract. This lets the API describe an operation without passing every provider-specific representation to callers.',
      },
      {
        title: 'Make supported routing configurable',
        text: 'Database-driven routing was part of the implementation. This account does not claim every provider capability can be added through configuration or that all integrations are fully dynamic.',
      },
      {
        title: 'Respect domain state',
        text: 'The work included domain lifecycle and EPP-related status behavior, nameservers and glue records. Validation and response handling matter because local application state and registry state are different boundaries.',
      },
    ],
    outcome:
      'A contribution to configurable registrar routing, consistent integration formats and domain-operation workflows. Private provider contracts, endpoints and configurations are excluded.',
    tradeoffs:
      'A shared contract makes callers simpler, but over-generalization can hide provider-specific capabilities and meaningful errors. Configuration also needs validation and a clear boundary with code.',
    nextSteps:
      'I would add a provider capability matrix and contract fixtures for representative success, timeout and error cases. These are suggested next steps rather than documented existing features.',
    technologies: ['Java', 'Spring Boot', 'MySQL', 'REST', 'SOAP', 'EPP'],
    related: ['spring-boot-microservices', 'secure-account-management'],
    publicationStatus: 'published',
    evidence: [
      'Owner-confirmed registrar and domain-operation responsibilities',
      'Existing public repository: registrar routing notes',
      'Attached resume: registry integration experience',
    ],
    architecture: {
      title: 'Integration normalization sketch',
      status: 'draft',
      description: 'Proposed logical boundaries, not a map of private services or endpoints.',
      stages: [
        { label: 'Platform operation', detail: 'Shared request contract' },
        { label: 'Configured route', detail: 'Database-driven registrar selection' },
        { label: 'Provider adapter', detail: 'Request and response translation' },
        { label: 'External provider', detail: 'Registrar-specific contract' },
      ],
      questions: [
        'Which operations are configuration-driven?',
        'Where is the EPP-shaped contract actually used?',
        'Confirm the routing layer versus adapter responsibilities.',
      ],
    },
  },
  {
    slug: 'event-ingestion-pipeline',
    number: '04',
    title: 'Preserving the event contract',
    shortTitle: 'Following a field through the stream.',
    category: 'Data engineering',
    context: 'Vertoz / data engineering',
    role: 'Data Engineer Intern',
    year: 'June - August 2025',
    summary:
      'At Vertoz, I worked on Go website-activity ingestion, device/geolocation enrichment, Kafka event production and PySpark streaming transformations. I also fixed fields that were missing or incorrectly transmitted between ingestion and processing.',
    cardSummary: 'Go ingestion, Kafka events and PySpark transformations, with attention to missing fields.',
    problem:
      'Event data can lose meaning when fields are missing or change shape between ingestion, serialization and transformation. My work included diagnosing and correcting those field-transmission problems.',
    constraints:
      'The responsibilities covered HTTP ingestion and streaming processing. Their exact wiring is kept out of the public account until the system diagram is verified.',
    contribution: [
      'Worked on Go endpoints for website activity ingestion.',
      'Worked with device/geolocation enrichment and Kafka event production.',
      'Updated PySpark streaming transformations and Parquet output.',
      'Debugged fields missing or incorrectly transmitted between ingestion and processing stages.',
    ],
    implementation: [
      {
        title: 'Look at the event shape',
        text: 'The source-side work involved website activity events and enrichment. The specific enrichment dependency, private event fields and source payloads are not published.',
      },
      {
        title: 'Keep request and stream behavior separate',
        text: 'HTTP ingestion and Kafka/PySpark processing are different responsibilities. Describing both does not imply that a browser request waits for downstream transformation or persistence.',
      },
      {
        title: 'Trace field transformations',
        text: 'My changes addressed missing or incorrectly transmitted fields across the ingestion and processing work, including the PySpark transformations that produced Parquet output.',
      },
    ],
    outcome:
      'Corrections to event-field transmission and transformation, alongside Go ingestion and PySpark streaming work. No throughput, delivery guarantee or end-to-end latency figure is asserted.',
    tradeoffs:
      'Strict parsing makes unexpected data visible but can reject useful events. Permissive parsing can conceal missing fields. The event contract and handling of absent values need to be explicit.',
    nextSteps:
      'I would keep representative, sanitized event fixtures and check the expected fields at each transformation boundary, then track schema changes as part of the producer/consumer contract.',
    technologies: ['Go', 'HTTP', 'Kafka', 'PySpark', 'Parquet', 'HDFS'],
    related: ['data-pipeline-optimization', 'spring-boot-microservices'],
    publicationStatus: 'published',
    evidence: [
      'Owner-confirmed ingestion, enrichment and streaming responsibilities',
      'Attached resume: website activity tracking work',
    ],
    architecture: {
      title: 'Event-flow proposal',
      status: 'draft',
      description:
        'This candidate flow deliberately requires confirmation of its connections. Synchronous HTTP ends at ingestion; the downstream flow must not be inferred as synchronous.',
      stages: [
        { label: 'Browser / Go HTTP boundary', detail: 'Exact client and response behavior to confirm' },
        { label: 'Enrichment / Kafka production', detail: 'Ordering and process boundary to confirm' },
        { label: 'PySpark streaming', detail: 'Field parsing and transformation' },
        { label: 'Parquet output', detail: 'Storage boundary to confirm' },
      ],
      questions: [
        'Confirm each edge and enrichment location.',
        'When does the HTTP request complete?',
        'Does the described Parquet output belong to this consumer?',
        'Which responsibilities belonged specifically to Spoutro?',
      ],
    },
  },
  {
    slug: 'secure-account-management',
    number: '05',
    title: 'Account context across a reseller hierarchy',
    shortTitle: 'Changing context. Keeping the path back.',
    category: 'Backend',
    context: 'Vertoz / ConnectReseller',
    role: 'Associate Software Engineer',
    year: '2025 - present',
    summary:
      'For ConnectReseller at Vertoz, I implemented hierarchical impersonation using JWT claims and stack-based identity transitions, alongside normalized role/feature/user mappings and permission-aware frontend navigation.',
    cardSummary: 'JWT identity transitions, hierarchical impersonation and a relational permission model.',
    problem:
      'Delegated account management needs an active account context and a way to restore the previous identity. Role and feature relationships also need a representation that can be used consistently across the application.',
    constraints:
      'Identity transitions, authorization and frontend visibility are separate concerns. Private claims, actual permission rules, token examples and internal endpoints are deliberately omitted.',
    contribution: [
      'Built hierarchical user impersonation using JWT claims.',
      'Used a stack-based transition mechanism to return to a previous identity.',
      'Normalized role, feature and user authorization relationships.',
      'Worked on gateway filtering for selected public endpoints.',
      'Implemented permission-aware frontend menu and feature visibility.',
    ],
    implementation: [
      {
        title: 'Represent the active context',
        text: 'JWT claims were used in the impersonation flow. This public description concerns identity context rather than exposing a token format or the rules that decide which transitions are allowed.',
      },
      {
        title: 'Keep a return path',
        text: 'A stack-based transition mechanism supported restoration of the previous identity when leaving an impersonated context. Exact storage and token-handling details are not disclosed.',
      },
      {
        title: 'Model relationships explicitly',
        text: 'The authorization work normalized role, feature and user relationships. Frontend visibility used authorization information, while navigation itself must not be treated as proof that a backend operation is allowed.',
      },
    ],
    outcome:
      'Hierarchical identity transitions and restoration, plus relational authorization mappings and permission-aware navigation. This description is not a security audit or a guarantee of platform security.',
    tradeoffs:
      'Nested identity contexts make delegated workflows convenient, but make the distinction between original actor and active identity more important. A relational permission model is clearer than storing multiple values in a single field, while requiring deliberate relationship queries.',
    nextSteps:
      'I would expand behavioral tests for entering, nesting and exiting contexts, including denied transitions and permission changes. No internal authorization rules are needed in public fixtures.',
    technologies: ['Java', 'Spring Boot', 'JWT', 'RBAC', 'MySQL', 'Angular'],
    related: ['spring-boot-microservices', 'registrar-integration-platform'],
    publicationStatus: 'published',
    evidence: [
      'Owner-confirmed hierarchical impersonation and authorization responsibilities',
      'Existing repository: role/feature mapping notes',
      'Attached resume: JWT and RBAC contribution',
    ],
    architecture: {
      title: 'Identity transition sketch',
      status: 'draft',
      description:
        'A high-level state sequence only. It excludes claim names, permission checks, storage design and token details.',
      stages: [
        { label: 'Current account context', detail: 'Authenticated starting context' },
        {
          label: 'Authorized transition',
          detail: 'Preserve prior context; checks intentionally unspecified',
        },
        { label: 'Target account context', detail: 'JWT identity context' },
        { label: 'Restore prior context', detail: 'Stack-based return' },
      ],
      questions: [
        'Is the ordering accurate at this level?',
        'Confirm that this sketch reveals no internal authorization behavior.',
        'No trust-boundary or security guarantee should be inferred.',
      ],
    },
  },
  {
    slug: 'medleaf',
    number: '06',
    title: 'MedLeaf: from flora image to model prediction',
    shortTitle: 'Taking a model beyond the notebook.',
    category: 'Machine learning',
    context: 'Personal project',
    role: 'Model and API development',
    year: '2025',
    summary:
      'MedLeaf is my PyTorch-based flora identification and medicinal value assessment project. I worked on data preparation, model development and hyperparameter optimization, then exposed predictions through Flask REST APIs deployed on AWS EC2.',
    cardSummary: 'A PyTorch flora project with Flask prediction APIs and an AWS EC2 deployment.',
    problem:
      'The project connected image-based flora identification and medicinal-value information with an API that a frontend could use, extending the work beyond model training alone.',
    constraints:
      'The public evidence documents the model/API work and a reported accuracy figure. Dataset size, species coverage, model architecture and evaluation split are not documented here. Medicinal information is a project feature, not clinical guidance.',
    contribution: [
      'Led the development of a flora-identification model in PyTorch.',
      'Performed data cleaning, preprocessing, model development, hyperparameter optimization and evaluation.',
      'Designed Flask REST APIs for predictions and frontend integration.',
      'Deployed the application on AWS EC2.',
    ],
    implementation: [
      {
        title: 'Prepare data before modeling',
        text: 'The project work included cleaning and preprocessing the data before model development. The source does not specify dataset size or species count.',
      },
      {
        title: 'Train and evaluate',
        text: 'PyTorch model development included hyperparameter optimization and evaluation. The resume reports 82% accuracy; this is a project-reported result rather than an independently verified benchmark.',
      },
      {
        title: 'Expose the prediction boundary',
        text: 'Flask REST APIs made predictions available for frontend integration. The application was deployed on AWS EC2. No public demo URL or source repository is claimed.',
      },
    ],
    outcome:
      'A flora-identification project connecting model development with an API and EC2 deployment. The resume reports 82% accuracy, with evaluation details still to be documented.',
    tradeoffs:
      'A single accuracy number does not explain class-level behavior or performance on unfamiliar images. An API also introduces input-validation and response-time concerns beyond offline evaluation.',
    nextSteps:
      'I would publish the dataset provenance, evaluation split, per-class metrics and model limitations, then add representative API checks. These are future improvements, not completed features.',
    technologies: ['Python', 'PyTorch', 'Flask', 'REST', 'AWS EC2'],
    related: ['data-pipeline-optimization', 'event-ingestion-pipeline'],
    publicationStatus: 'published',
    evidence: ['Attached resume: MedLeaf personal project'],
    metrics: [
      {
        label: 'Project-reported model accuracy',
        value: '82%',
        status: 'reported',
        source: 'Resume: MedLeaf',
        qualification:
          'Evaluation split, dataset and class-level metrics are not published; this is not an independent benchmark or clinical validation.',
      },
    ],
    architecture: {
      title: 'Model and API responsibility sketch',
      status: 'draft',
      description:
        'Training and inference responsibilities are shown separately; exact preprocessing parity and deployment layout need review.',
      stages: [
        { label: 'Data preparation', detail: 'Cleaning and preprocessing for training' },
        { label: 'PyTorch model', detail: 'Development, tuning and evaluation' },
        { label: 'Flask REST API', detail: 'Prediction interface' },
        { label: 'AWS EC2', detail: 'Application deployment' },
      ],
      questions: [
        'Confirm training versus inference boundaries.',
        'Do preprocessing steps match at training and inference?',
        'Provide evaluation details before stronger accuracy claims.',
      ],
    },
  },
];

export const publishedProjects = projects.filter((project) => project.publicationStatus === 'published');
export const projectPath = (slug: string) => `/projects/${slug}/`;
export const findProject = (slug: string) => projects.find((project) => project.slug === slug);
