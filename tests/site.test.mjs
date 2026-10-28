import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFile, access, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';
import path from 'node:path';
import { load } from 'cheerio';

const dist = path.resolve('dist');
const manifest = JSON.parse(await readFile('.build/site-manifest.json', 'utf8'));
const fileFor = (route) =>
  route === '/' ? 'index.html' : route.endsWith('.html') ? route.slice(1) : `${route.slice(1)}index.html`;
const pages = await Promise.all(
  manifest.routes.map(async (route) => ({
    route,
    html: await readFile(path.join(dist, fileFor(route.path)), 'utf8'),
  })),
);
const routePaths = new Set(manifest.routes.map((route) => route.path));

test('all requested public routes contain rendered content', () => {
  for (const route of [
    '/',
    '/about/',
    '/experience/',
    '/projects/',
    '/skills/',
    '/contact/',
    '/projects/medleaf/',
    '/projects/registrar-integration-platform/',
    '/projects/secure-account-management/',
    '/projects/data-pipeline-optimization/',
    '/projects/event-ingestion-pipeline/',
    '/projects/spring-boot-microservices/',
  ])
    assert.ok(routePaths.has(route), route);
  assert.equal(pages.length, manifest.review ? 14 : 13);
});

for (const { route, html } of pages) {
  test(`${route.path}: semantic, crawlable content and unique metadata`, () => {
    const $ = load(html);
    assert.equal($('html').attr('lang'), 'en');
    assert.equal($('main').length, 1);
    assert.equal($('h1').length, 1);
    let level = 0;
    for (const element of $('main h1, main h2, main h3, main h4').toArray()) {
      const next = Number(element.tagName.slice(1));
      assert.ok(next <= level + 1, `Heading jump at ${$(element).text()}`);
      level = next;
    }
    assert.ok($('main').text().trim().length > 100);
    assert.equal($('title').text(), route.title);
    assert.equal($('meta[name="description"]').attr('content'), route.description);
    assert.ok(route.description.length <= 200, `Description too long: ${route.description.length}`);
    assert.equal($('meta[property="og:title"]').attr('content'), route.title);
    assert.equal($('meta[property="og:description"]').attr('content'), route.description);
    assert.equal($('meta[name="twitter:card"]').attr('content'), 'summary_large_image');
    assert.ok($('meta[property="og:image"]').attr('content').endsWith('/assets/social-card.png'));
    assert.equal($('.skip-link').attr('href'), '#main');
    assert.equal($('button:not([type])').length, 0);
    assert.equal($('a:not([href])').length, 0);
    assert.equal($('img:not([alt])').length, 0);
    const ids = $('[id]')
      .map((_, element) => $(element).attr('id'))
      .get();
    assert.equal(new Set(ids).size, ids.length, 'Duplicate IDs');
    assert.doesNotMatch(
      html,
      /<!--page-(head|body)-->|opacity:0|fonts\.googleapis\.com|localhost|your-domain\.example/,
    );
    const noindex = manifest.review || route.noindex;
    if (noindex) {
      assert.match($('meta[name="robots"]').attr('content'), /noindex/);
      assert.equal($('link[rel="canonical"]').length, 0);
    } else {
      assert.equal($('link[rel="canonical"]').attr('href'), manifest.identity.site + route.path);
      assert.equal($('meta[property="og:url"]').attr('content'), manifest.identity.site + route.path);
    }
  });

  test(`${route.path}: links, fragments and assets resolve`, async () => {
    const $ = load(html);
    for (const element of $('a[href], script[src], link[rel="stylesheet"]').toArray()) {
      const href = $(element).attr('href') ?? $(element).attr('src');
      const url = new URL(href, manifest.identity.site + route.path);
      if (url.origin !== manifest.identity.site || !['http:', 'https:'].includes(url.protocol)) continue;
      const pathname = url.pathname;
      if (pathname === '/llms.txt') continue;
      if (pathname.includes('.')) await access(path.join(dist, pathname));
      else {
        const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
        assert.ok(routePaths.has(normalized), `Unresolved link ${href}`);
        if (url.hash) {
          const target = load(await readFile(path.join(dist, fileFor(normalized)), 'utf8'));
          assert.ok(
            target('[id]')
              .toArray()
              .some((node) => target(node).attr('id') === decodeURIComponent(url.hash.slice(1))),
            `Missing fragment ${href}`,
          );
        }
      }
    }
  });

  test(`${route.path}: structured data agrees with identity and route`, () => {
    const $ = load(html);
    const raw = $('script[type="application/ld+json"]').text();
    if (manifest.review || route.noindex) {
      assert.equal(raw, '');
      return;
    }
    const data = JSON.parse(raw);
    assert.equal(data['@context'], 'https://schema.org');
    const person = data['@graph'].find((item) => item['@type'] === 'Person');
    assert.equal(person.name, 'Kevin Patel');
    assert.equal(person.jobTitle, 'Associate Software Engineer');
    assert.equal(person.worksFor.name, 'Vertoz Limited');
    assert.deepEqual(person.sameAs, [manifest.identity.github, manifest.identity.linkedin]);
    const page = data['@graph'].find((item) => ['ProfilePage', 'WebPage'].includes(item['@type']));
    assert.equal(page.url, manifest.identity.site + route.path);
    assert.equal(page.name, $('h1').length ? route.title : '');
    const breadcrumbs = data['@graph'].find((item) => item['@type'] === 'BreadcrumbList');
    assert.equal(breadcrumbs.itemListElement.at(-1).item, page.url);
    assert.doesNotMatch(raw, /aggregateRating|reviewRating|award|10x|90 minutes/);
  });
}

test('titles and descriptions are distinct', () => {
  assert.equal(new Set(manifest.routes.map((route) => route.title)).size, pages.length);
  assert.equal(new Set(manifest.routes.map((route) => route.description)).size, pages.length);
});

test('career attribution and reported metrics remain accurate', async () => {
  const experience = load(await readFile('dist/experience/index.html', 'utf8'));
  const timeline = experience('.timeline').text();
  assert.match(timeline, /June 2025 - August 2025/);
  assert.match(timeline, /August 2025 - present/);
  assert.match(timeline, /multiple Vertoz products/);
  assert.match(timeline, /PRODUCT: ConnectReseller/);
  const medleaf = load(await readFile('dist/projects/medleaf/index.html', 'utf8'));
  assert.match(medleaf('main').text(), /82%/);
  assert.match(medleaf('main').text(), /project-reported/i);
  if (!manifest.review)
    for (const { html } of pages)
      assert.doesNotMatch(html, /~90 to ~10|90 minutes|10x|10×|9×|DRAFT \/ OWNER REVIEW/);
});

test('production excludes review diagrams; review builds prevent indexing', async () => {
  const robots = await readFile('dist/robots.txt', 'utf8');
  if (manifest.review) {
    assert.ok(routePaths.has('/review/architecture/'));
    assert.match(robots, /User-agent: \*\nDisallow: \//);
    await assert.rejects(access('dist/sitemap.xml'));
    assert.match(await readFile('dist/_headers', 'utf8'), /X-Robots-Tag: noindex, nofollow/);
  } else {
    assert.ok(!routePaths.has('/review/architecture/'));
    await assert.rejects(access('dist/review/architecture/index.html'));
    assert.match(robots, /User-agent: OAI-SearchBot\nAllow: \//);
    assert.match(robots, /User-agent: GPTBot\nDisallow: \//);
    const sitemap = await readFile('dist/sitemap.xml', 'utf8');
    const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
    assert.deepEqual(
      locations.sort(),
      manifest.routes
        .filter((route) => !route.noindex)
        .map((route) => manifest.identity.site + route.path)
        .sort(),
    );
    assert.doesNotMatch(sitemap, /404|review|localhost/);
    assert.doesNotMatch(await readFile('dist/_headers', 'utf8'), /X-Robots-Tag/);
  }
});

test('resume and public assets are intentional, valid and included', async () => {
  const source = await readFile('public/assets/kevin-patel-resume.pdf');
  const built = await readFile('dist/assets/kevin-patel-resume.pdf');
  assert.ok(built.subarray(0, 5).toString() === '%PDF-');
  assert.equal(
    createHash('sha256').update(source).digest('hex'),
    createHash('sha256').update(built).digest('hex'),
  );
  const image = await readFile('dist/assets/social-card.png');
  assert.equal(image.readUInt32BE(16), 1200);
  assert.equal(image.readUInt32BE(20), 630);
  for (const { html, route } of pages.filter((page) => page.route.kind !== 'review')) {
    const $ = load(html);
    assert.ok($(`a[href="${manifest.identity.resume}"]`).length || route.kind === '404');
  }
});

test('client bundle stays small and serves no React runtime', async () => {
  const files = await readdir('dist/assets');
  const scripts = files.filter((file) => file.endsWith('.js'));
  let bytes = 0,
    compressed = 0;
  for (const script of scripts) {
    const data = await readFile(path.join('dist/assets', script));
    bytes += data.length;
    compressed += gzipSync(data).length;
    assert.doesNotMatch(data.toString(), /react-dom|framer-motion|hydrateRoot/);
  }
  assert.ok(bytes < 15000, `Client JS ${bytes} exceeds 15 KB`);
  assert.ok(compressed < 6000, `Client JS gzip ${compressed} exceeds 6 KB`);
});

test('Cloudflare static routing returns a real 404 and retains Worker identity', async () => {
  const config = JSON.parse(await readFile('wrangler.jsonc', 'utf8'));
  assert.equal(config.name, 'portfolio');
  assert.equal(config.assets.not_found_handling, '404-page');
  assert.equal(config.assets.html_handling, 'auto-trailing-slash');
  const $ = load(await readFile('dist/404.html', 'utf8'));
  assert.match($('h1').text(), /way back/);
  assert.match(
    await readFile('dist/_redirects', 'utf8'),
    /\/resume.pdf \/assets\/kevin-patel-resume.pdf 301/,
  );
});
