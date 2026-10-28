import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFile } from 'node:fs/promises';

function portfolioPages() {
  return {
    name: 'portfolio-static-pages',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const pathname = new URL(request.url ?? '/', 'http://localhost').pathname;
        if (pathname === '/__qa/responsive/') {
          response.setHeader('Content-Type', 'text/html; charset=utf-8');
          response.setHeader('X-Robots-Tag', 'noindex, nofollow');
          response.end(await readFile('tests/responsive.html', 'utf8'));
          return;
        }
        if (
          !['GET', 'HEAD'].includes(request.method ?? 'GET') ||
          pathname.startsWith('/@') ||
          pathname.startsWith('/src/') ||
          pathname.startsWith('/node_modules/') ||
          (/\.[^/]+$/.test(pathname) && !pathname.endsWith('.html'))
        )
          return next();
        try {
          const { renderPage } = await server.ssrLoadModule('/src/entry-server.tsx');
          const page = renderPage(pathname, true);
          const template = await server.transformIndexHtml(pathname, await readFile('index.html', 'utf8'));
          response.statusCode = page.status;
          response.setHeader('Content-Type', 'text/html; charset=utf-8');
          response.setHeader('X-Robots-Tag', 'noindex, nofollow');
          response.end(
            request.method === 'HEAD'
              ? undefined
              : template
                  .replace('<!--page-head-->', () => page.head)
                  .replace('<!--page-body-->', () => page.body),
          );
        } catch (error) {
          next(error);
        }
      });
    },
    configurePreviewServer(server) {
      return () =>
        server.middlewares.use(async (request, response, next) => {
          if (!['GET', 'HEAD'].includes(request.method ?? 'GET')) return next();
          response.statusCode = 404;
          response.setHeader('Content-Type', 'text/html; charset=utf-8');
          response.end(request.method === 'HEAD' ? undefined : await readFile('dist/404.html', 'utf8'));
        });
    },
  };
}

export default defineConfig({
  plugins: [react(), portfolioPages()],
  appType: 'custom',
  base: '/',
  server: { allowedHosts: ['terminal.local'] },
  optimizeDeps: { noDiscovery: true },
  build: { target: 'es2022' },
});
