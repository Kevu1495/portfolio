import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const distDir = path.resolve('dist')
const publicDir = path.resolve('public')
const rawSiteUrl = process.env.VITE_SITE_URL?.trim()
const siteUrl = rawSiteUrl ? new URL(rawSiteUrl).toString().replace(/\/$/, '') : ''

await mkdir(distDir, { recursive: true })

const robots = [
  'User-agent: *',
  'Allow: /',
  '',
  '# Search visibility for ChatGPT search; separate from model-training crawling.',
  'User-agent: OAI-SearchBot',
  'Allow: /',
  '',
  '# GPTBot is disallowed by default. This controls potential training crawling,',
  '# not ChatGPT search visibility. Remove this block only if you choose to allow it.',
  'User-agent: GPTBot',
  'Disallow: /',
  '',
  'User-agent: ChatGPT-User',
  'Allow: /',
  '',
  'User-agent: Googlebot',
  'Allow: /',
  '',
  'User-agent: Bingbot',
  'Allow: /',
]
if (siteUrl) robots.push('', `Sitemap: ${siteUrl}/sitemap.xml`)
await writeFile(path.join(distDir, 'robots.txt'), `${robots.join('\n')}\n`)

if (siteUrl) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${escapeXml(siteUrl + '/')}</loc>\n  </url>\n</urlset>\n`
  await writeFile(path.join(distDir, 'sitemap.xml'), sitemap)
} else {
  console.warn('SEO: VITE_SITE_URL is not set; sitemap.xml was not generated. Set it to your final public URL before deploying.')
}

const indexPath = path.join(distDir, 'index.html')
let html = await readFile(indexPath, 'utf8')
if (siteUrl) {
  const canonical = `\n    <link rel="canonical" href="${escapeHtml(siteUrl + '/')}" />`
  const ogUrl = `\n    <meta property="og:url" content="${escapeHtml(siteUrl + '/')}" />`
  html = html.replace('</head>', `${canonical}${ogUrl}\n  </head>`)
}
await writeFile(indexPath, html)

function escapeXml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;')
}
function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}
