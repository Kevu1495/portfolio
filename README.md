# Kevin Patel — Engineering Portfolio

A static-first React + Vite portfolio for backend and data engineering work. React composes HTML at build time; a small TypeScript module handles navigation, project filters and the engineering-focus tabs. No React runtime, backend, database or analytics script is shipped to the browser.

## Development

Requires Node.js 22 or newer and npm.

```bash
npm ci
npm run dev
```

Development runs in review mode with noindex metadata. In the managed preview environment, use `sites-preview start <checkout>` and open its returned URL. The local-only responsive fixture is available at `/__qa/responsive/`.

## Validation and builds

```bash
npm run check
npm run build:review
npm test
npm run build
npm run deploy:check
```

`check` runs TypeScript, ESLint, Prettier, the production build and output tests. The last production build restores deployment output after review testing. `deploy:check` performs a Wrangler dry run and does not publish.

The production build generates twelve indexable routes plus `404.html`. The optional review build adds `/review/architecture/`, marks every page noindex, disallows crawling and omits the sitemap. It must never be used as a production release.

## Edit content

- `src/content/portfolio.ts`: identity, roles, education, coursework, skills and case studies.
- `src/content/types.ts`: content contracts and publication states.
- `src/pages/routes.ts`: route metadata.
- `src/components/Site.tsx` and `src/pages/Pages.tsx`: shared components and page composition.
- `src/styles.css`: design tokens, layout, typography, responsiveness and reduced-motion rules.
- `src/client.ts`: progressive enhancements. All substantive production text is rendered without JavaScript.

Project summaries, metadata, structured data and machine-readable navigation share the same content. Pending metrics are not published. Diagrams remain excluded until the owner verifies them and their status changes to `approved`.

## Resume and public assets

The public resume is `public/assets/kevin-patel-resume.pdf`. It is a source-derived copy with the confirmed role dates, correct employer/product attribution and only approved contact details. The uploaded original is untouched; the legacy repository-root resume is not part of `dist`.

To regenerate after factual edits, install Python ReportLab and run:

```bash
node scripts/export-content.mjs | python3 scripts/build-resume.py
```

Render and inspect the PDF before committing it. The current public copy is one page, with selectable text and clickable professional links.

Social artwork and the favicon are original SVG assets. The 1200 × 630 sharing PNG is served from `/assets/social-card.png`. Fonts are self-hosted through Fontsource packages.

## Hosting and release

Read-only account checks confirmed that `kevinp.dev` routes to the existing Cloudflare Worker named `portfolio`, and HTTPS responds successfully. Its existing Workers Builds trigger watches `main`, builds this repository, and invokes Wrangler. **Merging into main publishes through that existing trigger; obtain the owner's release approval first.**

The proposed workflow validates pull requests and uploads build output. It no longer deploys a second copy to GitHub Pages. No Cloudflare account settings, DNS records, secrets or production deployment were changed in this task.

See [deployment instructions](docs/DEPLOYMENT.md), the [engineering report](docs/ENGINEERING_REPORT.md), the [audit](docs/AUDIT.md) and [content review](docs/CONTENT_REVIEW.md).
