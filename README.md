# Kevin Patel — Scroll-driven portfolio

A responsive React + Vite portfolio starter with a scroll-revealed career timeline, searchable engineering notes, and a persistent right-side technical panel. On small screens, the panel fills the screen for readability.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

1. Create a GitHub repository and push this folder's contents.
2. In repository **Settings → Pages**, choose **GitHub Actions** as the build and deployment source.
3. Add `.github/workflows/deploy.yml` (included in this project) and push to `main`.
4. If the site URL is `https://USERNAME.github.io/REPOSITORY/`, set `BASE_PATH` in the workflow to `/REPOSITORY/`. If the repository is `USERNAME.github.io`, use `/`.

Alternatively, install dependencies and run `npm run deploy` to publish `dist` to the `gh-pages` branch.

## Personalize before publishing

- Review every experience description and confirm it matches your work.
- The RBAC, JWT, Kafka, microservices, SQL, and Redis notes contain general technical explanations. The personal implementation callouts explicitly identify where you should add verified details from your own code and architecture.
- If you want a downloadable resume, copy your PDF into `public/resume.pdf` and add a Resume link to the hero/navigation.
- Replace or remove any contact links you do not want public.
- Avoid publishing private customer, production, or security implementation details.

## Included interactions

- Scroll-based section detection and reveal animations
- Clickable experience bullets open relevant technical notes
- `Ctrl/Cmd + K` opens the note search
- `Escape` closes the active overlay/panel
- Click outside the side panel to close it
- Reduced-motion preference support
- Responsive mobile layout
