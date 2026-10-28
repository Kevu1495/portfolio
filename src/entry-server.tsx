import { renderToStaticMarkup } from 'react-dom/server';
import { Layout } from './components/Site';
import { findProject, identity } from './content/portfolio';
import { Page } from './pages/Pages';
import { getRoutes, type Route } from './pages/routes';

const escapeHtml = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function structuredData(route: Route, origin: string) {
  const personId = `${origin}/#person`;
  const websiteId = `${origin}/#website`;
  const url = `${origin}${route.path}`;
  const person = {
    '@type': 'Person',
    '@id': personId,
    name: identity.name,
    url: `${origin}/`,
    jobTitle: identity.title,
    description: identity.positioning,
    worksFor: { '@type': 'Organization', name: identity.employer },
    homeLocation: { '@type': 'Place', name: identity.location },
    email: identity.email,
    sameAs: [identity.github, identity.linkedin],
    knowsAbout: ['Backend engineering', 'Data engineering', 'Microservices', 'Data processing'],
  };
  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: `${origin}/`,
    name: 'Kevin Patel — Engineering Portfolio',
    author: { '@id': personId },
    inLanguage: 'en',
  };
  const crumbs = [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` }];
  if (route.kind === 'project')
    crumbs.push({ '@type': 'ListItem', position: 2, name: 'Engineering work', item: `${origin}/projects/` });
  if (route.kind !== 'home')
    crumbs.push({
      '@type': 'ListItem',
      position: crumbs.length + 1,
      name: route.title.split(' — ')[0],
      item: url,
    });
  const page = {
    '@type': route.kind === 'home' || route.kind === 'about' ? 'ProfilePage' : 'WebPage',
    '@id': `${url}#page`,
    url,
    name: route.title,
    description: route.description,
    isPartOf: { '@id': websiteId },
    mainEntity: { '@id': personId },
    inLanguage: 'en',
    dateModified: identity.updated,
  };
  const graph: Record<string, unknown>[] = [
    person,
    website,
    page,
    { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumbs`, itemListElement: crumbs },
  ];
  if (route.kind === 'project' && route.slug) {
    const project = findProject(route.slug)!;
    page.mainEntity = { '@id': `${url}#work` };
    graph.push({
      '@type': 'CreativeWork',
      '@id': `${url}#work`,
      name: project.title,
      description: project.summary,
      url,
      author: { '@id': personId },
      about: project.technologies,
      inLanguage: 'en',
      isPartOf: { '@id': websiteId },
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

export function renderPage(pathname: string, review = false) {
  const origin = identity.site;
  const normalized =
    pathname === '/' || pathname.endsWith('/') || pathname.endsWith('.html') ? pathname : `${pathname}/`;
  const routes = getRoutes(review);
  const found = routes.find((route) => route.path === normalized);
  const route = found ?? routes.find((item) => item.kind === '404')!;
  const noindex = review || route.noindex;
  const canonical = !noindex ? `${origin}${route.path}` : undefined;
  const socialImage = review ? '/assets/social-card.png' : `${origin}/assets/social-card.png`;
  const schema = !noindex ? structuredData(route, origin) : undefined;
  const head = `<title>${escapeHtml(route.title)}</title>
    <meta name="description" content="${escapeHtml(route.description)}" />
    <meta name="robots" content="${noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}" />
    <meta name="author" content="${identity.name}" />
    <meta property="og:type" content="${route.kind === 'project' ? 'article' : 'website'}" />
    <meta property="og:site_name" content="Kevin Patel — Engineering Portfolio" />
    <meta property="og:title" content="${escapeHtml(route.title)}" />
    <meta property="og:description" content="${escapeHtml(route.description)}" />
    <meta property="og:image" content="${socialImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Kevin Patel — Backend systems. Data in motion." />
    <meta property="og:locale" content="en_IN" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(route.title)}" />
    <meta name="twitter:description" content="${escapeHtml(route.description)}" />
    <meta name="twitter:image" content="${socialImage}" />
    ${canonical ? `<link rel="canonical" href="${canonical}" /><meta property="og:url" content="${canonical}" />` : ''}
    <link rel="describedby" type="text/markdown" href="/llms.txt" />
    ${schema ? `<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>` : ''}`;
  return {
    head,
    body: renderToStaticMarkup(
      <Layout path={route.path} review={review}>
        <Page route={route} review={review} />
      </Layout>,
    ),
    route,
    status: found && route.kind !== '404' ? 200 : 404,
  };
}
