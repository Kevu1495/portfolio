# Engineering report

## Result

The portfolio implementation retains React 18 and Vite 6, adds typed content and dedicated static routes, and replaces full-site hydration with a small progressive-enhancement module. The visual system uses charcoal, warm off-white, lime, self-hosted typography, a deliberate grid and original code-native artwork.

The homepage leads with backend/data engineering, selected contributions, the confirmed career timeline, an interactive map of engineering concerns, contextual skills, education and contact. Six individually navigable case studies explain the problem, constraints, personal contribution, implementation decisions, outcome, trade-offs and proposed next steps.

No production deployment, DNS edits, account-setting changes, analytics installation, branch deletion, force push or repository-visibility changes were performed.

## Architecture decision

The existing React/Vite prerendering was a useful foundation. Extending it avoids a framework migration while delivering the static HTML and low JavaScript cost a content-focused portfolio needs. React composes pages at build time; TypeScript validates content and client interactions. The deployed site needs no Node server, database, CMS or authentication.

Content lives in `src/content/portfolio.ts`, with models in `types.ts`. Shared components and page composition are separate. Build scripts generate every route and indexing file from this content. The Vite development server provides a noindex review experience; Cloudflare serves the resulting production assets.

## Routes

| Purpose                      | Route                                       |
| ---------------------------- | ------------------------------------------- |
| Homepage                     | `/`                                         |
| Background and education     | `/about/`                                   |
| Career timeline              | `/experience/`                              |
| Filterable engineering work  | `/projects/`                                |
| Spring Boot modernization    | `/projects/spring-boot-microservices/`      |
| Batch data processing        | `/projects/data-pipeline-optimization/`     |
| Registrar normalization      | `/projects/registrar-integration-platform/` |
| Event contract work          | `/projects/event-ingestion-pipeline/`       |
| Hierarchical account context | `/projects/secure-account-management/`      |
| MedLeaf                      | `/projects/medleaf/`                        |
| Technology context           | `/skills/`                                  |
| Professional contact         | `/contact/`                                 |
| Custom missing-page content  | `/404.html`                                 |
| Review build only            | `/review/architecture/`                     |

The production sitemap contains twelve indexable routes. The 404 page is noindex. The diagram review route is absent from production output. Legacy `#top`, `#journey`, `#notes` and `#about` anchors remain useful; `/kevin.html` and `/resume.pdf` have proposed Cloudflare redirects.

## Factual content

- Internship: June 2025 - August 2025; Associate Software Engineer: August 2025 - present.
- Employer: Vertoz Limited. ConnectReseller is a product within Vertoz.
- Internship data work is described across multiple products, not wholly attributed to Spoutro.
- The approximately 90-to-10-minute run and separate resume-reported 10x daily-processing claim remain distinct pending measurements. Neither numerical speedup ships in the production account.
- MedLeaf's 82% result is explicitly project-reported, with missing evaluation context stated.
- All six sanitized architecture sketches remain drafts and require owner approval. They are reviewable without exposing employer code, private endpoints, actual credentials or private permission rules.
- The public, one-page resume is derived from the attachment and shared factual content. It corrects dates/attribution and includes only the approved professional contact details. The uploaded original is untouched.

See [content review](CONTENT_REVIEW.md) for concrete questions, evidence limits and diagram approval conditions.

## SEO and AI discovery

Every public route has static readable content, a unique title/description, canonical URL, Open Graph/Twitter metadata and sharing image. JSON-LD covers Person, WebSite, ProfilePage/WebPage, BreadcrumbList and project CreativeWork where applicable. Tests parse the JSON-LD and check identity, route and breadcrumb consistency.

The production origin was verified through the existing Cloudflare custom-domain mapping and a successful HTTPS response. Generated robots/sitemap content uses that origin. Existing GPTBot disallow behavior is preserved, OAI-SearchBot remains allowed, and llms.txt supplies factual supplementary navigation. No search placement, rich-result eligibility or AI citation is guaranteed. Official crawler guidance and the llms.txt proposal were reviewed; links are in CONTENT_REVIEW.md.

## Validation

| Check                 | Result                                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Full production check | Passed: TypeScript, ESLint, Prettier, production build and 46 output tests                                               |
| Review build          | Passed: fourteen routes, 49 output tests, noindex controls and no sitemap                                                |
| Responsive checks     | 98 route/viewport combinations; no horizontal overflow                                                                   |
| Widths                | 320, 375, 430, 768, 1024, 1440, 1920 pixels                                                                              |
| Project filters       | Backend + Kafka returned one project; empty state and reload persistence worked                                          |
| Keyboard navigation   | Enter opened the mobile menu, Tab reached Work, Escape closed/restored focus; ArrowRight selected the data focus tab     |
| Public resume         | One page, selectable text, professional links, correct dates/attribution; PDF visually inspected and built bytes checked |
| Social image          | 1200 × 630 PNG generated and inspected                                                                                   |
| Wrangler              | Version 4.149.0; configuration/runtime types generated; deployment dry run passed                                        |

The output tests validate rendered routes, semantic landmarks and heading hierarchy, metadata, local links/fragments/assets, JSON-LD, sitemap membership, crawler policy, draft exclusion, factual attribution, resume bytes and the JavaScript budget. The baseline Vite prerender scanner error was removed by disabling dependency discovery for the build-time renderer. An initial ESLint 10/plugin peer conflict was resolved with compatible tooling.

Browser viewport evidence is saved in [responsive-results.json](responsive-results.json). These checks use real iframe CSS viewport widths and are not mobile-device or Core Web Vitals measurements. Screenshots: [desktop](screenshots/home-desktop.jpg) and [375-pixel frame](screenshots/home-mobile.jpg).

## Measured asset sizes

| Asset             | Baseline                   | Final local production build |
| ----------------- | -------------------------- | ---------------------------- |
| Client JavaScript | 320.66 KB / 104.02 KB gzip | 3.95 KB / 1.59 KB gzip       |
| CSS               | 27.45 KB / 7.05 KB gzip    | 33.16 KB / 7.37 KB gzip      |

The browser bundle contains neither React DOM nor Framer Motion. Fonts are self-hosted. Only hashed assets receive immutable caching; stable PDF/social/favicon paths revalidate. These are build-size measurements, not field-performance results.

## Verification limits and remaining work

- Native PDF download-event/media capture timed out in the cloud browser. The PDF itself, its public asset path and production bytes passed local checks. Confirm real browser attachment behavior on the deployed host.
- Lighthouse, real-user LCP/INP/CLS, external rich-results tooling and OS reduced-motion emulation were not available/performed. Reduced-motion CSS, semantic checks, focus behavior and keyboard interactions were implemented/tested as described; no full WCAG compliance claim is made.
- Cloudflare `_headers`, redirects and actual production HTTP 404 behavior need post-release checks. The local deployment dry run validates preparation, not a live deployment.
- Diagrams and stronger benchmark claims require the factual confirmations in CONTENT_REVIEW.md.
- No analytics script was found or added. Cloudflare Web Analytics is a possible later choice, subject to reviewing current collection/retention/consent behavior before enabling it.

## Release

The existing Cloudflare Workers Builds trigger watches main and deploys it automatically. Review the public resume and implementation, then obtain the owner's release approval before merging. Do not deploy a review build. See [deployment instructions](DEPLOYMENT.md) for the exact existing target, release and post-release checks.

## Changed files

- `.github/workflows/deploy.yml`
- `.gitignore`
- `.prettierignore`
- `.prettierrc.json`
- `README.md`
- `docs/AUDIT.md`
- `docs/CONTENT_REVIEW.md`
- `docs/DEPLOYMENT.md`
- `docs/ENGINEERING_REPORT.md`
- `docs/responsive-results.json`
- `docs/screenshots/home-desktop.jpg`
- `docs/screenshots/home-mobile.jpg`
- `eslint.config.js`
- `index.html`
- `kevin-headers.txt`
- `kevin.html`
- `package-lock.json`
- `package.json`
- `public/_headers`
- `public/_redirects`
- `public/assets/favicon.svg`
- `public/assets/kevin-patel-resume.pdf`
- `public/assets/social-card.png`
- `public/assets/social-card.svg`
- `public/llms.txt`
- `public/robots.txt`
- `public/sitemap.xml`
- `scripts/build-resume.py`
- `scripts/export-content.mjs`
- `scripts/generate-seo-assets.mjs`
- `scripts/prerender.mjs`
- `src/App.jsx`
- `src/client.ts`
- `src/components/Site.tsx`
- `src/content/portfolio.ts`
- `src/content/types.ts`
- `src/entry-server.tsx`
- `src/main.jsx`
- `src/pages/Pages.tsx`
- `src/pages/routes.ts`
- `src/styles.css`
- `tests/responsive.html`
- `tests/site.test.mjs`
- `tsconfig.json`
- `vite.config.js`
- `wrangler.jsonc`
