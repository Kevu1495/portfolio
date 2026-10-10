import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, BookOpen, Check, ChevronRight,
  Code2, Database, ExternalLink, FileText, Github, Layers3, Linkedin, Menu, Search,
  ShieldCheck, Sparkles, Workflow, X, Zap
} from 'lucide-react'
import './styles.css'

const topics = {
  rbac: {
    title: 'Role-Based Access Control', eyebrow: 'SECURITY / AUTHORIZATION', tags: ['RBAC', 'Spring Boot', 'JWT'],
    summary: 'A way to decide what an authenticated user is allowed to do, based on roles and permissions.',
    sections: [
      { title: 'The mental model', body: 'A user is assigned a role; a role grants permissions; a protected operation checks for the permission it needs. Keep authentication (who are you?) separate from authorization (what can you do?).' },
      { title: 'A common data model', code: 'users → user_roles → roles\nroles → role_permissions → permissions', body: 'For example, a DOMAIN_READ permission may allow viewing domain records while DOMAIN_UPDATE allows changing nameservers. ' },
      { title: 'Request flow', steps: ['Authenticate the request and establish the caller identity.', 'Resolve effective permissions for the caller and relevant account scope.', 'Check the required permission in the backend service.', 'Apply resource-level checks so access cannot cross account boundaries.', 'Return a clear forbidden response when access is denied.'] },
      { title: 'Hierarchical accounts & impersonation', body: 'In a reseller hierarchy, authorization often needs both an action check and a scope check: can this actor perform this action on this account? Impersonation should preserve the original actor, identify the target context, restrict who can initiate it, and be auditable.' },
      
    ],
  },
  jwt: {
    title: 'JSON Web Token (JWT)', eyebrow: 'SECURITY / TOKENS', tags: ['JWT', 'Claims', 'HTTP'],
    summary: 'A compact token format for carrying claims. A signed JWT lets a receiver verify that its contents have not been modified.',
    sections: [
      { title: 'The three parts', body: 'A typical signed JWT has three Base64URL-encoded segments separated by dots.', diagram: true, code: 'header.payload.signature' },
      { title: 'Header', body: 'Metadata describing the token type and signing algorithm.', code: '{ "typ": "JWT", "alg": "RS256" }' },
      { title: 'Payload: claims', body: 'Claims are statements about the subject or token context. Registered examples include sub (subject), iss (issuer), aud (audience), exp (expiration), nbf (not before), and iat (issued at). Applications can also define custom claims.' , code: '{ "sub": "user-123", "iss": "auth.example", "exp": 1999999999 }' },
      { title: 'Signature & validation', body: 'The signature is computed over the encoded header and payload using the selected signing method. The API verifies it and validates relevant claims before trusting the token. With asymmetric signing, the issuer signs with a private key and services can verify with a public key.' },
      { title: 'Important caveats', bullets: ['A signed JWT is not automatically encrypted; its payload is readable.', 'Validate issuer, audience, expiration, and allowed algorithms.', 'A JWT does not replace server-side authorization or resource-scope checks.', 'Plan for revocation, key rotation, token expiry, and safe storage.'] },
      { title: 'Request flow', steps: ['User authenticates and receives a token.', 'Client sends Authorization: Bearer <token>.', 'API validates signature and relevant claims.', 'Application authorizes the requested operation.', 'API returns the result or denies access.'] }
    ],
  },
  kafka: {
    title: 'Apache Kafka', eyebrow: 'EVENT-DRIVEN SYSTEMS', tags: ['Kafka', 'Events', 'Streaming'],
    summary: 'A distributed event-streaming platform that lets producers publish records and consumers process them independently.',
    sections: [
      { title: 'The flow', diagram: true, body: 'A producer writes records to a topic. Topics are split into partitions, and consumer groups share the work of processing those partitions.' },
      { title: 'Core concepts', bullets: ['Topic — a named stream of records.', 'Partition — an ordered log that enables parallelism.', 'Offset — a consumer’s position in a partition.', 'Consumer group — consumers that divide partition assignments.', 'Replication — copies partitions for resilience.'] },
      { title: 'Why use it?', body: 'Kafka can decouple a request-serving service from slower background work. The producer publishes an event; a consumer handles notifications or other processing asynchronously. This improves isolation, but introduces operational concerns such as retries, ordering, duplicates, and lag.' },
      { title: 'Delivery and reliability', body: 'Understand at-most-once, at-least-once, and exactly-once capabilities in context. A common practical approach is idempotent consumer processing: if a record is retried, the business effect should not happen twice.' },
      
    ],
  },
  microservices: {
    title: 'Monolith → Microservices', eyebrow: 'BACKEND ARCHITECTURE', tags: ['Spring Boot', 'Services', 'Design'],
    summary: 'Splitting a legacy application into independently structured services around clear business boundaries.',
    sections: [
      { title: 'Why split a monolith?', body: 'A monolith can be simpler to deploy and reason about early on. As responsibilities grow, well-chosen service boundaries can improve ownership, isolation, and independent deployment. Splitting a system also adds network, observability, and data-consistency complexity.' },
      { title: 'Boundary first', bullets: ['Group code around business capabilities, not just technical layers.', 'Define APIs and ownership for each service.', 'Avoid shared-database coupling where practical.', 'Plan timeouts, retries, observability, and failure handling.'] },
      
      
    ],
  },
  sql: {
    title: 'SQL performance & pagination', eyebrow: 'DATA / DATABASES', tags: ['MySQL', 'JPA', 'Queries'],
    summary: 'Build queries that return the right records with predictable cost as data volume grows.',
    sections: [
      { title: 'Start with the query plan', body: 'Use EXPLAIN (and the database’s available analysis tools) to inspect access paths, join order, and whether indexes are being used. Measure with representative data rather than assuming an index helps.' },
      { title: 'Common levers', bullets: ['Index columns used by selective filters and joins.', 'Select only required columns instead of loading entire entities.', 'Use projections or aggregates when the endpoint needs a summary.', 'Keep pagination deterministic with a stable sort key.', 'Watch for N+1 queries when loading relationships.'] },
      { title: 'Offset vs cursor pagination', body: 'Offset pagination is simple, but deep offsets can require the database to skip many rows and concurrent changes can shift pages. Cursor/keyset pagination uses the last seen sort key and can work better for large, changing datasets when the sort order is designed appropriately.' },
      
    ],
  },
  redis: {
    title: 'Redis & caching', eyebrow: 'PERFORMANCE / CACHING', tags: ['Redis', 'Latency', 'Data access'],
    summary: 'Keep frequently requested data closer to the application to reduce repeated expensive work.',
    sections: [
      { title: 'Cache-aside pattern', steps: ['Check Redis for the key.', 'On a hit, return the cached value.', 'On a miss, fetch from the source of truth.', 'Write the result to cache with a deliberate TTL.', 'Define how updates invalidate or refresh cached data.'] },
      { title: 'Trade-offs', bullets: ['Stale data and invalidation are core design concerns.', 'Use TTLs to bound how long entries remain cached.', 'Avoid cache stampedes on popular keys.', 'Do not cache sensitive data without understanding access controls.', 'Measure hit rate and end-to-end latency.'] },
      
    ],
  }

  ,pythonIngestion: {
    title: 'Python endpoint → database', eyebrow: 'DATA ENGINEERING / INGESTION', tags: ['Python', 'JSON', 'Database'],
    summary: 'A scheduled ingestion job that reads JSON from an endpoint and appends or updates database records.',
    sections: [
      { title: 'The workflow', steps: ['Call the source endpoint and handle the response.', 'Parse JSON and validate required fields and types.', 'Map the payload to the destination table schema.', 'Decide whether each record should be inserted or updated.', 'Log failures and run the job through cron.'] },
      { title: 'Questions worth documenting', bullets: ['What identified an existing record: a primary key, external ID, or composite key?', 'Was the operation an upsert or separate insert/update logic?', 'How were API failures, pagination, and malformed records handled?', 'Was the job safe to rerun without creating duplicates?'] }
    ], },
  pysparkMigration: {
    title: 'Hive / Impala → Vertica pipeline', eyebrow: 'DATA ENGINEERING / ETL', tags: ['PySpark', 'Parquet', 'Vertica'],
    summary: 'Replaced a Bash-driven batch workflow that wrote to Impala with a PySpark transformation pipeline loading Vertica.',
    sections: [
      { title: 'Pipeline shape', steps: ['Read date-partitioned Parquet inputs.', 'Transform and aggregate the source data.', 'Split location values such as country, state, and city into separate columns.', 'Write the transformed dataset to Vertica.', 'Run the batch job on a cron schedule and validate the output.'] },
      { title: 'Migration considerations', bullets: ['Keep transformations consistent between the old and new pipelines.', 'Validate row counts, nulls, aggregates, and date boundaries.', 'Confirm the target schema and data types before writing.', 'Compare run time and output correctness, not performance alone.'] }
    ], },
  pysparkOptimization: {
    title: 'PySpark job: 90 minutes → 10', eyebrow: 'PERFORMANCE / BATCH PROCESSING', tags: ['PySpark', 'JDBC', 'Optimization'],
    summary: 'Tuned the PySpark-to-Vertica pipeline and its JDBC write/query behavior, reducing runtime from about 1 hour 30 minutes to about 10 minutes.',
    sections: [
      { title: 'Measured outcome', body: 'Reported runtime fell from roughly 90 minutes to 10 minutes — about a 9× speed-up, or an 89% reduction in elapsed time.' },
      
      { title: 'Performance story', steps: ['Establish the original runtime and bottleneck.', 'Change one major variable at a time.', 'Benchmark with comparable input volume.', 'Validate output correctness and compare elapsed time.', 'Document the final configuration and its trade-offs.'] }
    ], },
  supersetReporting: {
    title: 'Analytics in Apache Superset', eyebrow: 'DATA / REPORTING', tags: ['Vertica', 'Superset', 'Analytics'],
    summary: 'Built analytical charts in Superset using data stored in Vertica.',
    sections: [
      { title: 'From warehouse to chart', steps: ['Identify the business question and metric.', 'Query the relevant Vertica tables or views.', 'Choose chart type and dimensions that fit the question.', 'Validate totals and filters against source data.', 'Present the chart with useful labels and time ranges.'] },
      { title: 'Details to capture', bullets: ['Which metrics and dimensions did the dashboards show?', 'Were datasets based on tables, views, or SQL queries?', 'Which filters or date controls mattered to users?', 'Who used the charts and what decisions did they support?'] }
    ], },
  goTelemetry: {
    title: 'Go activity ingestion service', eyebrow: 'DATA ENGINEERING / EVENT INGESTION', tags: ['Go', 'HTTP', 'Kafka'],
    summary: 'A browser event triggered a JavaScript request to a Go endpoint, which enriched activity with device and geolocation information before publishing it to Kafka.',
    sections: [
      { title: 'End-to-end flow', steps: ['Browser JavaScript captures events such as clicks and mouse movement.', 'The client sends event data to the Go endpoint.', 'The endpoint enriches the payload using the WRFL dependency for device and geolocation information.', 'The service publishes the enriched event to a Kafka topic.', 'A downstream streaming job transforms and stores the data for reporting.'] },
      { title: 'Debugging missing fields', bullets: ['Compare the browser payload, decoded request, enriched object, Kafka record, and consumer output.', 'Check JSON field names, types, optional values, and serialization behavior.', 'Verify the consumer maps newly added or renamed fields correctly.', 'Test representative event types end to end.'] }
    ], },
  streamingTransforms: {
    title: 'Streaming fields → Parquet', eyebrow: 'DATA ENGINEERING / STREAM PROCESSING', tags: ['Kafka', 'PySpark', 'Parquet'],
    summary: 'Updated the PySpark streaming consumer alongside the Go producer so event fields were transformed correctly before being written to Parquet.',
    sections: [
      { title: 'Why both ends mattered', body: 'When an event contract changes, the producer and consumer must agree on field names, types, nullability, and semantics. A field can be present in the incoming event yet disappear or change shape during parsing and transformation.' },
      { title: 'Debugging checklist', bullets: ['Inspect the raw Kafka record.', 'Check the streaming schema and parsing mode.', 'Trace the field through each transformation.', 'Check the final DataFrame schema before writing.', 'Read sample Parquet output and verify the field is present and correctly typed.'] }
    ], },
  javaDataPipeline: {
    title: 'Replacing the Impala data path', eyebrow: 'DATA ENGINEERING / JAVA', tags: ['Java', 'Vertica', 'Redis'],
    summary: 'Retired a Java data-access pipeline that stored results in Impala and redirected the analytical path to Vertica with Redis caching for frequent queries.',
    sections: [
      { title: 'The change', steps: ['Trace the existing Java pipeline and its Impala dependency.', 'Move aggregation/query work to Vertica.', 'Persist or retrieve the required analytical results through the new path.', 'Cache frequent query results in Redis.', 'Compare output correctness and query latency against the old path.'] },
      { title: 'Trade-offs', bullets: ['Keep Vertica as the analytical source of truth.', 'Define how cached results expire or become invalid.', 'Measure cache hit rate and end-to-end latency.', 'Remove old dependencies only after consumers are verified.'] }
    ], },
  domainLifecycle: {
    title: 'Domain lifecycle & registry operations', eyebrow: 'CONNECTRESELLER / DOMAIN SYSTEMS', tags: ['EPP', 'Registry', 'Lifecycle'],
    summary: 'Implemented domain operations across application APIs and registry integrations, including nameserver and redemption-period behavior.',
    sections: [
      { title: 'Nameserver and glue flow', steps: ['Accept nameserver records such as abc.domainname.tld from the user.', 'Validate the submitted nameserver data.', 'Check host availability with the registry.', 'Send host-create with the hostname and IP address when glue records are required.', 'Handle registry responses and reflect the operation in application state.'] },
      { title: 'Expiration and redemption', body: 'For the expiration flow you described, the system eventually sends a domain-delete operation. During the intervening period, nameservers are switched to parking nameservers. A clientUpdateProhibited status blocked the update in some cases, so your fix queried current domain info, updated registry status as needed, then changed nameservers. TLD-specific lifecycle differences also needed to be accounted for.' },
      { title: 'Important edge cases', bullets: ['Registry state and the local MySQL record can drift.', 'EPP status codes can prohibit otherwise valid operations.', 'Different TLDs can have different lifecycle rules.', 'Operations need careful sequencing and handling of registry errors.'] }
    ], },
  impersonation: {
    title: 'Hierarchical account impersonation', eyebrow: 'CONNECTRESELLER / AUTH SERVICE', tags: ['JWT', 'Stack', 'Account hierarchy'],
    summary: 'Allowed a higher-level account to enter a lower-level account context and then return to its previous identity using a stack-based flow.',
    sections: [
      { title: 'Conceptual flow', steps: ['An authenticated user initiates impersonation of an eligible lower-level account.', 'The auth service validates the hierarchy and authorization.', 'The current identity/context is preserved on a stack.', 'A token is issued with claims representing the active impersonation context.', 'When exiting, pop the previous context and restore the prior identity.'] },
      { title: 'Security questions', bullets: ['Which claims distinguish the original actor from the current target?', 'How is the allowed parent-child relationship validated?', 'Can impersonation be nested, and what are the stack limits?', 'How are token expiry, exit, and audit events handled?', 'How are permissions re-evaluated in the target account context?'] }
    ], },
  apiGateway: {
    title: 'API gateway & public master data', eyebrow: 'CONNECTRESELLER / REQUEST ROUTING', tags: ['API Gateway', 'JWT', 'Filters'],
    summary: 'The gateway routes requests to services and includes a filter that allows selected general or master-data APIs to be called without a JWT.',
    sections: [
      { title: 'Request decision', steps: ['Receive the incoming request at the gateway.', 'Match the request against the explicitly public endpoint allowlist.', 'Allow those endpoints without requiring a JWT.', 'For protected routes, validate authentication and apply the relevant access checks.', 'Route the request to the appropriate downstream service.'] },
      { title: 'Design cautions', bullets: ['Prefer explicit allowlists over broad path exemptions.', 'Keep public master data genuinely non-sensitive.', 'Test trailing slashes, HTTP methods, and overlapping route patterns.', 'Do not confuse gateway authentication with service-level authorization.'] }
    ], },
  featureRbac: {
    title: 'Feature, role & user permission model', eyebrow: 'CONNECTRESELLER / AUTHORIZATION', tags: ['RBAC', 'MySQL', 'Frontend'],
    summary: 'Replaced comma-separated roles/features and loop-based checks with a relational feature, role, and user model plus a permission mapping.',
    sections: [
      { title: 'The data model you described', code: 'features ↔ role_features ↔ roles\nusers ↔ user_roles ↔ roles', body: 'This illustrates a normalized many-to-many model. Adjust table names to the actual schema. The key change was moving away from storing comma-separated values in a column.' },
      { title: 'Authorization across the app', steps: ['Define available features/permissions.', 'Map roles to features in relational tables.', 'Assign roles to users.', 'Evaluate the requested operation against the effective permission mapping.', 'Apply the same model to frontend menu visibility while retaining backend enforcement.'] },
      
    ], },
  registrarRouting: {
    title: 'Database-driven registrar integration', eyebrow: 'CONNECTRESELLER / INTEGRATION ARCHITECTURE', tags: ['EPP', 'REST APIs', 'Adapter pattern'],
    summary: 'Built a configurable path that routes domain operations through a registry layer to different external registrars while normalizing their differing request and response formats.',
    sections: [
      { title: 'Request path', steps: ['A client calls the platform API using the expected EPP-standard request shape.', 'A filter in the registry layer identifies the registrar route.', 'The registry service forwards the operation to the registrar microservice.', 'Configuration in the database determines which registrar adapter handles the request.', 'The adapter translates to the provider-specific request, calls the provider, and normalizes the response back to the standard contract.'] },
      { title: 'Why normalize?', body: 'External registrars can expose different fields, response shapes, and error conventions. A normalized contract keeps callers independent from provider-specific behavior and allows routing/configuration changes without redeploying the entire integration service for every configuration change.' },
      { title: 'Trade-offs & questions', bullets: ['How is provider configuration validated and versioned?', 'What happens when a provider times out or returns an unexpected response?', 'How are provider-specific capabilities represented?', 'How do you test that normalized EPP responses preserve meaningful errors?'] }
    ], }

}

const experiences = [
  {
    id: 'sde', number: '02', period: 'AUG 2025 — PRESENT', role: 'Associate Software Engineer', company: 'Vertoz Limited · ConnectReseller', headline: 'Building the systems behind domain operations.', description: 'Moved closer to application architecture: service boundaries, registry integrations, relational data, asynchronous workflows, and delegated account access.', skills: ['Java', 'Spring Boot', 'MySQL', 'REST / SOAP', 'Kafka', 'JWT / RBAC'], topics: ['microservices', 'domainLifecycle', 'sql', 'kafka', 'impersonation', 'featureRbac', 'registrarRouting', 'apiGateway', 'rbac', 'jwt'], bullets: [
      { title: 'Monolith to microservices', text: 'Migrated a legacy Spring application to a Spring Boot microservices architecture.', topic: 'microservices', number: '01' },
      { title: 'Domain operations & lifecycle', text: 'Handled nameserver/glue creation, registry checks, expiration/redemption behavior, prohibited statuses, and TLD-specific lifecycle differences.', topic: 'domainLifecycle', number: '02' },
      { title: 'MySQL normalization & APIs', text: 'Consolidated duplicate data structures, improved relational integrity and indexing, and built consistent REST APIs with pagination and JPA.', topic: 'sql', number: '03' },
      { title: 'Async workflows', text: 'Published onboarding events for asynchronous notification processing.', topic: 'kafka', number: '04' },
      { title: 'Delegated access', text: 'Built hierarchical impersonation and replaced comma-separated role/feature checks with mapped permissions.', topic: 'impersonation', number: '05' },
      { title: 'Gateway access rules', text: 'Allowed selected public master-data endpoints without requiring a JWT.', topic: 'apiGateway', number: '06' },
      { title: 'Role and feature mapping', text: 'Introduced relational role/feature/user mappings and role-aware frontend menus.', topic: 'featureRbac', number: '07' },
      { title: 'Database-driven registrar routing', text: 'Added configurable registrar routing and normalized provider-specific request/response formats behind an EPP-shaped contract.', topic: 'registrarRouting', number: '08' },
    ]
  },
  {
    id: 'de', number: '01', period: 'JUN 2025 — AUG 2025', role: 'Data Engineer Intern', company: 'Vertoz Limited', headline: 'From scheduled ingestion to streaming analytics.', description: 'Worked across scheduled Python ingestion, PySpark batch ETL, Vertica analytics, Go-to-Kafka event ingestion, streaming transformations, and a Java data path involving Vertica and Redis.', skills: ['Go', 'Kafka', 'PySpark', 'HDFS', 'Vertica', 'Redis'], topics: ['pythonIngestion', 'pysparkMigration', 'pysparkOptimization', 'supersetReporting', 'goTelemetry', 'streamingTransforms', 'javaDataPipeline', 'kafka', 'redis', 'sql'], bullets: [
      { title: 'Scheduled JSON ingestion', text: 'Started with Python cron jobs that read JSON from an endpoint and appended or updated database records.', topic: 'pythonIngestion', number: '01' },
      { title: 'Batch ETL: Impala to Vertica', text: 'Reworked a Bash-driven workflow into PySpark, transforming date-partitioned Parquet data for Vertica.', topic: 'pysparkMigration', number: '02' },
      { title: 'Pipeline performance', text: 'Tuned the PySpark/JDBC write path, reducing a reported run from about 90 minutes to about 10.', topic: 'pysparkOptimization', number: '03' },
      { title: 'Analytics and reporting', text: 'Built analytical charts in Superset using data from Vertica.', topic: 'supersetReporting', number: '04' },
      { title: 'Go event ingestion', text: 'Connected browser events to a Go HTTP endpoint, enriched them with device/location context, and published to Kafka.', topic: 'goTelemetry', number: '05' },
      { title: 'Streaming data quality', text: 'Updated the Go endpoint and PySpark stream transformations to preserve fields through to Parquet.', topic: 'streamingTransforms', number: '06' },
      { title: 'Java data path', text: 'Retired an Impala-bound Java path and moved the relevant analytical flow to Vertica with Redis in the architecture.', topic: 'javaDataPipeline', number: '07' },
    ]
  }
]

const allSearchItems = Object.entries(topics).map(([id, t]) => ({ id, title: t.title, eyebrow: t.eyebrow, summary: t.summary, tags: t.tags }))

function App() {
  const [activeTopic, setActiveTopic] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [activeSection, setActiveSection] = useState('top')
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const sections = ['top', 'journey', 'notes', 'about'].map(id => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-25% 0px -55% 0px', threshold: [0, .15, .4, .7] })
    sections.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onKey = e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setSearchOpen(true) }
      if (e.key === 'Escape') { setSearchOpen(false); setActiveTopic(null) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return allSearchItems
    return allSearchItems.filter(t => `${t.title} ${t.eyebrow} ${t.summary} ${t.tags.join(' ')}`.toLowerCase().includes(q))
  }, [query])

  const openTopic = id => { setActiveTopic(id); setSearchOpen(false); setQuery('') }
  const jumpTo = id => { setMobileMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }) }

  return <div className="site-shell">
    <div className="grain" aria-hidden="true" />
    <header className="topbar">
      <a className="wordmark" href="#top" onClick={e => { e.preventDefault(); jumpTo('top') }}><span className="wordmark-icon">K<span>.</span></span><span>KEVIN PATEL <small>ENGINEER / BUILDER</small></span></a>
      <nav className={`nav-links ${mobileMenu ? 'nav-open' : ''}`} aria-label="Main navigation">
        {[['journey','Journey'],['notes','Engineering notes'],['about','About']].map(([id,label]) => <button key={id} className={activeSection===id?'nav-active':''} onClick={() => jumpTo(id)}>{label}</button>)}
      </nav>
      <div className="top-actions">
        <button className="icon-button search-trigger" aria-label="Search engineering notes" onClick={() => setSearchOpen(true)}><Search size={16}/><span>Search</span><kbd>⌘ K</kbd></button>
        <button className="icon-button mobile-menu-button" aria-label="Toggle menu" onClick={() => setMobileMenu(v=>!v)}>{mobileMenu?<X size={18}/>:<Menu size={18}/>}</button>
      </div>
    </header>

    <main>
      <section id="top" className="hero section-wrap">
        <div className="hero-copy">
          <motion.div initial={reduceMotion?false:{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.6}} className="eyebrow"><span className="status-dot"/> SOFTWARE ENGINEER <span className="eyebrow-sep">/</span> MUMBAI, INDIA</motion.div>
          <motion.h1 initial={reduceMotion?false:{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.08}}>From moving<br/> <em>data</em> to building<br/> <span className="outline-text">systems.</span></motion.h1>
          <motion.p className="hero-lede" initial={reduceMotion?false:{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:.65,delay:.18}}>I’m Kevin — a software engineer interested in the systems behind the interface: event streams, backend services, data models, and the decisions that connect them.</motion.p>
          <motion.div className="hero-actions" initial={reduceMotion?false:{opacity:0}} animate={{opacity:1}} transition={{delay:.3}}>
            <button className="button button-primary" onClick={() => jumpTo('journey')}>Explore my journey <ArrowDownRight size={16}/></button>
            <button className="button button-quiet" onClick={() => setSearchOpen(true)}><Search size={15}/> Quick technical lookup</button>
          </motion.div>
          <div className="hero-meta"><span><i>01</i> DATA ENGINEERING</span><span><i>02</i> SOFTWARE ENGINEERING</span><span><i>03</i> ENGINEERING NOTES</span></div>
        </div>
        <div className="hero-art" aria-label="Illustrative flow from events to services">
          <div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/>
          <div className="art-label art-label-top">SYSTEMS IN MOTION <span>↗</span></div>
          <div className="node node-source"><span className="node-icon"><Database size={18}/></span><div><small>01 / INGEST</small><strong>Events</strong></div><span className="node-dot"/></div>
          <div className="connector connector-one"><span/></div>
          <div className="node node-stream"><span className="node-icon"><Workflow size={18}/></span><div><small>02 / PROCESS</small><strong>Streams</strong></div><span className="node-dot"/></div>
          <div className="connector connector-two"><span/></div>
          <div className="node node-service"><span className="node-icon"><Layers3 size={18}/></span><div><small>03 / DELIVER</small><strong>Services</strong></div><span className="node-dot"/></div>
          <div className="art-coordinate">19°04' N<br/>72°52' E</div>
          <div className="art-caption"><span className="caption-line"/>Follow the data. Understand the system.</div>
        </div>
        <div className="hero-scroll"><span className="scroll-line"/> SCROLL TO TRACE THE STORY <ArrowDown size={13}/></div>
      </section>

      <section id="journey" className="journey-section section-wrap">
        <div className="section-heading"><div><div className="eyebrow">THE CAREER TIMELINE <span className="eyebrow-sep">/</span> DATA → APPLICATIONS</div><h2>Follow the work.<br/><em>Understand the system.</em></h2></div></div>
        <div className="journey-grid">
          <div className="timeline-rail"><span className="rail-top">START</span><div className="rail-track"><motion.div className="rail-progress" initial={{height:0}} whileInView={{height:'100%'}} viewport={{once:true,amount:.2}} transition={{duration:1.4}}/><span className="rail-node rail-node-a">01</span><span className="rail-node rail-node-b">02</span></div><span className="rail-bottom">NOW</span></div>
          <div className="experience-list">
            {experiences.map((exp, idx) => <motion.article key={exp.id} className={`experience-card experience-${exp.id}`} initial={reduceMotion?false:{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.65,delay:idx*.1}}>
              <div className="experience-top"><span className="chapter-number">CHAPTER {exp.number}</span><span className="experience-period">{exp.period}</span></div>
              <h3>{exp.role}</h3><div className="experience-company">{exp.company}</div><p className="experience-headline">{exp.headline}</p><p className="experience-description">{exp.description}</p>
              <div className="skill-row">{exp.skills.map(s=><span key={s} className="skill-pill">{s}</span>)}</div>
              <div className="work-list">{exp.bullets.map(b=><button className="work-item" key={b.number} onClick={() => openTopic(b.topic)}><span className="work-number">{b.number}</span><span className="work-copy"><strong>{b.title}</strong><small>{b.text}</small></span><span className="work-arrow"><ArrowUpRight size={16}/></span></button>)}</div>
              <div className="card-footer"><span><span className="tiny-green-dot"/> SELECT A NOTE TO GO DEEPER</span><button onClick={() => openTopic(exp.topics[0])}>Explore chapter <ArrowRight size={14}/></button></div>
            </motion.article>)}
          </div>
        </div>
        <div className="bridge-card"><div className="bridge-icon"><Zap size={20}/></div><div className="bridge-content"><span className="eyebrow">THE THROUGH-LINE</span><h3>From event pipelines to application workflows.</h3><p>Data engineering taught me to think about throughput, processing, and latency. Software engineering brings those instincts into service boundaries, API design, and reliable background work.</p></div><div className="bridge-tags"><span>ASYNC WORK</span><span>DATA FLOW</span><span>LATENCY</span><span>RELIABILITY</span></div></div>
      </section>

      <section id="notes" className="notes-section section-wrap">
        <div className="section-heading notes-heading"><div><div className="eyebrow">PERSONAL ENGINEERING HANDBOOK</div><h2>Remember the <em>why,</em><br/>not just the what.</h2></div><div className="notes-heading-right"><p>Notes on the tools, systems, and engineering concepts that shape my work.</p><button className="button button-primary" onClick={() => setSearchOpen(true)}><Search size={15}/> Search all notes <kbd>⌘ K</kbd></button></div></div>
        <div className="notes-grid">{allSearchItems.map((t,i)=><motion.button key={t.id} className="note-card" onClick={() => openTopic(t.id)} initial={reduceMotion?false:{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.1}} transition={{duration:.45,delay:i*.05}}><div className="note-card-top"><span className="note-index">0{i+1}</span><span className="note-open"><ArrowUpRight size={17}/></span></div><span className="note-eyebrow">{t.eyebrow}</span><h3>{t.title}</h3><p>{t.summary}</p><div className="note-tags">{t.tags.map(tag=><span key={tag}>{tag}</span>)}</div></motion.button>)}</div>
      </section>

      <section id="about" className="about-section section-wrap"><div className="about-rule"/><div className="about-main"><div className="eyebrow">A LITTLE ABOUT ME</div><h2>Curious about the<br/>layers <em>underneath.</em></h2></div><div className="about-details"><p>I’m a Computer Engineering graduate who enjoys understanding how software behaves beyond the happy path — how services communicate, how data stays useful, and how access stays controlled.</p><p>Outside the day-to-day, this site is my living set of engineering notes: part portfolio, part memory aid, part explanation of what I’ve learned.</p><div className="about-links"><a href="https://github.com/kevu1495" target="_blank" rel="noreferrer"><Github size={16}/> GitHub <ArrowUpRight size={13}/></a><a href="https://linkedin.com/in/kevu1495" target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn <ArrowUpRight size={13}/></a><a href="mailto:kevu1495@gmail.com"><ExternalLink size={15}/> Email <ArrowUpRight size={13}/></a></div></div></section>
    </main>
    <footer className="footer section-wrap"><a className="wordmark footer-mark" href="#top" onClick={e=>{e.preventDefault();jumpTo('top')}}><span className="wordmark-icon">K<span>.</span></span><span>KEVIN PATEL <small>ENGINEER / BUILDER</small></span></a><span>BUILT TO BE EXPLORED <span className="footer-star">✳</span> {new Date().getFullYear()}</span><button onClick={() => jumpTo('top')}>BACK TO TOP ↑</button></footer>

    <AnimatePresence>{activeTopic && <TopicPanel topic={topics[activeTopic]} onClose={() => setActiveTopic(null)} />}</AnimatePresence>
    <AnimatePresence>{searchOpen && <SearchOverlay query={query} setQuery={setQuery} results={filtered} onOpen={openTopic} onClose={() => {setSearchOpen(false);setQuery('')}} />}</AnimatePresence>
  </div>
}

function TopicPanel({topic,onClose}) {
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    const old = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = old }
  }, [])
  return <motion.div className="panel-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}>
    <motion.aside className="topic-panel" role="dialog" aria-modal="true" aria-label={topic.title} initial={reduceMotion?false:{x:'100%'}} animate={{x:0}} exit={reduceMotion?{opacity:0}:{x:'100%'}} transition={{type:'spring',damping:32,stiffness:300}}>
      <div className="panel-topbar"><a className="panel-brand" href="#notes" onClick={e=>e.preventDefault()}><BookOpen size={15}/> ENGINEERING NOTES</a><button className="icon-button panel-close" onClick={onClose} aria-label="Close technical notes"><X size={18}/><span>Close</span><kbd>ESC</kbd></button></div>
      <div className="panel-scroll"><div className="panel-heading"><div className="eyebrow">{topic.eyebrow}</div><h2>{topic.title}</h2><p>{topic.summary}</p><div className="note-tags">{topic.tags.map(t=><span key={t}>{t}</span>)}</div></div>
        {topic.sections.map((s,i)=><section className="panel-section" key={s.title}><div className="panel-section-title"><span>{String(i+1).padStart(2,'0')}</span><h3>{s.title}</h3></div>{s.body&&<p>{s.body}</p>}{s.diagram&&<FlowDiagram topic={topic.title} />}{s.code&&<pre className="code-block"><code>{s.code}</code><button title="Copy code" onClick={()=>navigator.clipboard?.writeText(s.code)}><FileText size={14}/></button></pre>}{s.steps&&<ol className="panel-steps">{s.steps.map((step,j)=><li key={step}><span>{String(j+1).padStart(2,'0')}</span>{step}</li>)}</ol>}{s.bullets&&<ul className="panel-bullets">{s.bullets.map(b=><li key={b}>{b}</li>)}</ul>}</section>)}
        <div className="panel-end"><span>END</span><button onClick={onClose}>Back to the story <ArrowRight size={14}/></button></div>
      </div>
    </motion.aside>
  </motion.div>
}

function FlowDiagram({topic}) {
  const isJwt = topic.includes('JWT')
  const nodes = isJwt ? [['HEADER','Algorithm + type'],['PAYLOAD','Claims'],['SIGNATURE','Integrity']] : topic.includes('Kafka') ? [['PRODUCER','Publish record'],['TOPIC','Partitioned log'],['CONSUMER','Process event']] : [['USER','Identity'],['ROLE','Assigned access'],['PERMISSION','Allowed action']]
  return <div className="flow-diagram">{nodes.map((n,i)=><React.Fragment key={n[0]}><div className="flow-node"><span>{String(i+1).padStart(2,'0')}</span><strong>{n[0]}</strong><small>{n[1]}</small></div>{i<nodes.length-1&&<div className="flow-arrow"><ArrowRight size={15}/></div>}</React.Fragment>)}</div>
}

function SearchOverlay({query,setQuery,results,onOpen,onClose}) {
  const inputRef = React.useRef(null)
  useEffect(()=>{inputRef.current?.focus()},[])
  return <motion.div className="search-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><motion.div className="search-dialog" role="dialog" aria-modal="true" aria-label="Search engineering notes" initial={{opacity:0,y:-12,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-8,scale:.98}} transition={{duration:.18}}><div className="search-input-wrap"><Search size={19}/><input ref={inputRef} value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search JWT, RBAC, Kafka, SQL…"/><kbd>ESC</kbd><button aria-label="Close search" onClick={onClose}><X size={17}/></button></div><div className="search-results-label">{query?`${results.length} MATCHING NOTES`:'QUICK REFERENCE / ALL TOPICS'}</div><div className="search-results">{results.map((t,i)=><button key={t.id} className="search-result" onClick={()=>onOpen(t.id)}><span className="search-result-icon">{i===0?<BookOpen size={16}/>:<Code2 size={16}/>}</span><span className="search-result-copy"><strong>{t.title}</strong><small>{t.summary}</small></span><ChevronRight size={16}/></button>)}{!results.length&&<div className="empty-search">No matching notes. Try “security”, “streaming”, or “database”.</div>}</div><div className="search-footer"><span>↑↓ BROWSE WITH YOUR EYES</span><span>ENTER TO OPEN <span className="key-cap">↵</span></span></div></motion.div></motion.div>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>)
