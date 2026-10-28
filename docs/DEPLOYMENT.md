# Deployment instructions

## Existing target, verified on 27 October 2026

- Production origin: `https://kevinp.dev`.
- Hosting: Cloudflare Workers Static Assets, Worker `portfolio`.
- Enabled custom domain and assigned certificate confirmed through the connected Cloudflare account.
- Current build trigger: repository `Kevu1495/portfolio`, branch `main`, build `npm run build`, deploy `npx wrangler deploy`.
- A feature-branch push does not match the verified main-only trigger.

No domain or DNS changes are required merely to release these asset changes. Preserve the existing custom-domain mapping. The local Wrangler configuration retains the Worker name and compatibility date, and switches static routing from SPA fallback to `404-page` with `auto-trailing-slash`.

## Before release

1. Review the implementation PR and the source-derived public resume.
2. Review `CONTENT_REVIEW.md`. All six diagrams are drafts; they can remain excluded for an otherwise complete release. Do not approve diagrams merely to remove a review label.
3. Run `npm ci` and `npm run check`.
4. Optionally run `npm run build:review` and `npm test` to inspect draft diagrams, then run `npm run build` and `npm test` to restore and verify production output.
5. Run `npm run deploy:check`. This is a dry run, not a deployment.
6. Confirm `dist` has no `/review/architecture/`, no draft diagrams and no unverified pipeline speedups. The output tests enforce those conditions.
7. Obtain the owner's approval before merging. The existing Cloudflare trigger deploys main automatically.

## Release

After explicit release approval, merge the implementation PR into main. Observe the existing Cloudflare Workers Builds deployment rather than starting a competing deployment. No new credentials or DNS edits are part of this release.

If manually deploying instead, use an appropriately authorized Cloudflare session, confirm the existing Worker and domain mapping, run the checks and production build, then invoke Wrangler only after release approval. Do not deploy a review build or change the Worker name.

## Post-release checks

Verify the actual production host, since development preview does not apply Cloudflare's `_headers` and `_redirects` processing:

- HTTPS, custom-domain mapping and certificate behavior.
- Every sitemap route returns its corresponding page.
- A missing route returns the custom page **with HTTP 404**, rather than a homepage with HTTP 200.
- Slash normalization and the `/kevin.html` and `/resume.pdf` legacy redirects.
- Resume response is `application/pdf`; attachment filename is `Kevin-Patel-Resume.pdf`; the downloaded file opens and contains the correct role dates.
- Stable PDF, favicon and sharing-image paths revalidate; only hashed JS/CSS/font files use immutable caching.
- CSP, focus/navigation, filtering, native disclosures and browser console behavior.
- Canonicals, JSON-LD, sharing PNG, robots and sitemap all use the intended production origin.

Submit the sitemap through the owner's Google Search Console/Bing Webmaster Tools accounts if configured. No search-console access or submission was performed here.

## Analytics

No analytics script was found in the inspected source and none was introduced. Cloudflare Web Analytics is a candidate for later evaluation. Before enabling it, confirm the provider's current collection, retention and consent behavior for the intended audience. No provider account, tracking token or consent banner is required for this implementation.

## Rollback

Use the owner's existing Cloudflare deployment/version rollback workflow if a production issue is observed. Do not rewrite Git history or remove branches. Investigate the failed release before preparing a follow-up change.
