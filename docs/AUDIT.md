# Portfolio audit and implementation brief

Audit date: 27 October 2026. Base commit: `bbdf9aaaef8aed1fda3988a9c5628dc373e6a580`.

## Existing architecture

- React 18, Vite 6, JavaScript/JSX and a handwritten CSS stylesheet. npm lockfile v3.
- A single 40 KB `App.jsx` owns content, navigation, search, modal panels and the homepage. A 27 KB stylesheet has accumulated overrides.
- Framer Motion and Lucide React are client dependencies. The current build ships approximately 320.66 KB JavaScript (104.02 KB gzip) and 27.45 KB CSS (7.05 KB gzip).
- A useful existing `react-dom/server` build step prerenders the homepage. Technical notes have no independent routes. Metadata, content and generated SEO files have overlapping sources of truth.
- No configured lint, formatting, type checking or test scripts. The baseline build exits successfully, but its Vite dependency scanner logs closed-server errors during prerendering.
- The original resume sits at repository root, outside Vite's public assets, and is not linked by the site.
- Git history and the fresh checkout were inspected. No pre-existing working-tree changes or applicable `AGENTS.md` files were found.

## Verified hosting

Read-only checks against the connected Cloudflare account confirm:

- `kevinp.dev` is an active Cloudflare zone.
- The enabled custom domain routes to the `portfolio` Worker, with a certificate assigned.
- An HTTPS HEAD request to `https://kevinp.dev` returned HTTP 200.
- The Worker has static assets. Its build trigger watches **main only**, runs `npm run build`, then `npx wrangler deploy`.
- The repository also contains a main-branch GitHub Pages workflow and `CNAME`; these are conflicting legacy deployment clues, not evidence that Pages currently serves the custom domain.
- Wrangler currently falls back to the homepage for unknown paths. A static portfolio needs proper 404 responses instead.

No DNS records, Worker settings, build triggers, secrets, production branches or deployments were changed during this audit.

## Main problems

1. Substantive technical work lives in modal panels. Recruiters cannot link directly to a case study, and crawlers cannot discover separate project pages.
2. The site presents a large general handbook before demonstrating selected engineering contributions. MedLeaf, education and credentials are missing.
3. Navigation uses buttons for destinations. Modal search and note panels do not implement complete focus containment/restoration. The mobile menu lacks expanded-state semantics.
4. Animated content initially has hidden styles in server-rendered output. The homepage depends heavily on hydration, and external Google font CSS adds a network dependency.
5. The resume's shared employment date obscures the internship/associate split. Its Spoutro heading incorrectly groups all data work under that product.
6. The reported 90-to-10-minute run and the resume's separate 10x claim lack benchmark conditions. Some old educational notes sound like verified personal implementation details.
7. The sitemap covers only the homepage; metadata has no sharing image. A static sitemap copied from `public` can survive a build even when URL configuration is absent.
8. No automatic checks guard routes, internal links, factual attribution, metadata, or resume availability.

## Architecture decision

Retain **React + Vite**. Extend the existing server-rendering approach to all routes, introduce TypeScript and a typed content layer, and ship a small DOM-based interaction module rather than hydrating the entire portfolio.

Astro would be a reasonable new-project choice, but it adds migration work without a concrete advantage over this repository's existing prerendering foundation. Keeping the toolchain reduces migration risk, preserves the established static deployment, and supports the required filters, navigation and technical exploration without a backend. React is used for maintainable build-time page composition; essential text is available without JavaScript.

## Implementation phases

1. Consolidate approved identity, experience, education, projects and publication status into typed source content. Keep unverified measurements out of published copy.
2. Build shared layouts, accessible navigation, dedicated case studies and a distinctive charcoal/lime editorial design. Retain the useful focus on backend/data boundaries and the existing reduced-motion intent.
3. Generate route-specific metadata, JSON-LD, sharing artwork, sitemap, robots and a supplemental machine-readable summary from the same source content.
4. Supply a source-derived public resume with confirmed dates, correct product attribution and only approved contact details. Keep the uploaded original untouched.
5. Validate build output, accessibility semantics, route/link integrity, responsive layouts, interactions and browser errors. Keep sanitized architecture proposals in a separately gated review build.
6. Commit to a feature branch and open a draft PR. Document the existing Cloudflare deployment procedure. Merging main will publish, so merger/deployment requires the owner's approval.

## Factual questions that do not block implementation

- Were the approximately 90- and 10-minute runs measured on comparable workloads, hardware and job boundaries? How does the separate 10x daily-processing figure relate?
- Which precise connections join browser, Go enrichment, Kafka, PySpark and storage? The dependency name in the old notes is not sufficiently verified to publish.
- Which batch/streaming pieces belonged to Spoutro versus other Vertoz products?
- Which registrar operations are database-configurable, and where exactly is an EPP-shaped versus provider-specific contract used?
- What dataset, evaluation split and model definition produced MedLeaf's resume-reported 82% accuracy?
- The sanitized diagrams require owner review before public inclusion.

The implementation can accurately describe confirmed responsibilities without guessing these details. See `CONTENT_REVIEW.md` for concrete review items.
