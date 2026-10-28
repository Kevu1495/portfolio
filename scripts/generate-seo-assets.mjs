import { readFile, writeFile, rm, readdir } from 'node:fs/promises';
import path from 'node:path';

const manifest = JSON.parse(await readFile('.build/site-manifest.json', 'utf8'));
const { review, routes, identity, experiences, projects } = manifest;
const origin = identity.site;
const dist = path.resolve('dist');
const write = (file, value) => writeFile(path.join(dist, file), value);
const escapeXml = (text) =>
  text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

const robots = review
  ? 'User-agent: *\nDisallow: /\n'
  : `User-agent: *\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\n# Preserve the repository's existing training-crawler preference.\nUser-agent: GPTBot\nDisallow: /\n\nSitemap: ${origin}/sitemap.xml\n`;
await write('robots.txt', robots);
if (review) await rm(path.join(dist, 'sitemap.xml'), { force: true });
else
  await write(
    'sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
      .filter((route) => !route.noindex)
      .map((route) => `  <url><loc>${escapeXml(origin + route.path)}</loc></url>`)
      .join('\n')}\n</urlset>\n`,
  );
const summary = `# ${identity.name} — Software Engineer\n\n> ${identity.positioning} Based in ${identity.location}; employed by ${identity.employer}.\n\nThis is supplementary navigation for AI readers. The linked HTML pages are the authoritative public account. It does not guarantee search or AI-answer inclusion.\n\n## Identity and experience\n${experiences.map((item) => `- ${item.title}, ${item.employer}: ${item.period}.${item.product ? ` ${item.product} is a product within ${item.employer}.` : ' Data engineering covered multiple products.'}`).join('\n')}\n- [Experience](${origin}/experience/): Career timeline and responsibilities.\n- [About](${origin}/about/): Background, education and coursework.\n\n## Engineering work\n${projects.map((project) => `- [${project.title}](${origin}/projects/${project.slug}/): ${project.summary}`).join('\n')}\n\n## Professional links\n- [Contact](${origin}/contact/): ${identity.email}\n- [Resume](${origin}${identity.resume})\n- [GitHub](${identity.github})\n- [LinkedIn](${identity.linkedin})\n\n## Evidence\nMedLeaf's 82% accuracy is project-reported, with evaluation details not published. Numerical pipeline speedups and unapproved architecture diagrams are excluded from the production account. No confidential employer source code is provided.\n`;
await write(
  'llms.txt',
  review ? '# Unpublished review build\n\nThis preview is not an authoritative public source.\n' : summary,
);
const hashedAssets = (await readdir(path.join(dist, 'assets'))).filter((name) =>
  /-[A-Za-z0-9_-]{8}\.(js|css|woff2?)$/.test(name),
);
const headers =
  (await readFile('public/_headers', 'utf8')) +
  hashedAssets
    .map((name) => `/assets/${name}\n  Cache-Control: public, max-age=31536000, immutable\n`)
    .join('');
await write('_headers', review ? `${headers}\n/*\n  X-Robots-Tag: noindex, nofollow\n` : headers);
console.log(`Generated ${review ? 'review indexing controls' : 'sitemap, robots and factual llms.txt'}.`);
