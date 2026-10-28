import { createServer } from 'vite';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const review = process.argv.includes('--review');
const dist = path.resolve('dist');
const server = await createServer({
  configFile: path.resolve('vite.config.js'),
  server: { middlewareMode: true },
  appType: 'custom',
  optimizeDeps: { noDiscovery: true },
  logLevel: 'error',
});
try {
  const [{ renderPage }, { getRoutes }, content] = await Promise.all([
    server.ssrLoadModule('/src/entry-server.tsx'),
    server.ssrLoadModule('/src/pages/routes.ts'),
    server.ssrLoadModule('/src/content/portfolio.ts'),
  ]);
  const template = await readFile(path.join(dist, 'index.html'), 'utf8');
  if (!template.includes('<!--page-head-->') || !template.includes('<!--page-body-->'))
    throw new Error('Missing static-render placeholders.');
  const routes = getRoutes(review);
  for (const route of routes) {
    const page = renderPage(route.path, review);
    const relative =
      route.path === '/'
        ? 'index.html'
        : route.path.endsWith('.html')
          ? route.path.slice(1)
          : `${route.path.slice(1)}index.html`;
    const output = path.join(dist, relative);
    await mkdir(path.dirname(output), { recursive: true });
    const html = template
      .replace('<!--page-head-->', () => page.head)
      .replace('<!--page-body-->', () => page.body);
    await writeFile(output, html);
  }
  await mkdir('.build', { recursive: true });
  const publicProjects = content.publishedProjects.map(({ slug, title, summary, category }) => ({
    slug,
    title,
    summary,
    category,
  }));
  await writeFile(
    '.build/site-manifest.json',
    JSON.stringify(
      {
        review,
        routes,
        identity: content.identity,
        experiences: content.experiences.map(({ title, employer, product, period }) => ({
          title,
          employer,
          product,
          period,
        })),
        projects: publicProjects,
      },
      null,
      2,
    ),
  );
  console.log(
    `Prerendered ${routes.length} routes (${review ? 'review, noindex' : 'production; drafts excluded'}).`,
  );
} finally {
  await server.close();
}
