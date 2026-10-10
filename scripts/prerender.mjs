import { createServer } from 'vite'
import { renderToString } from 'react-dom/server'
import React from 'react'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const rootDir = process.cwd()
const distDir = path.join(rootDir, 'dist')
const indexPath = path.join(distDir, 'index.html')
let server

try {
  // Load the same React application through Vite so JSX and dependencies are
  // transformed consistently with the browser build.
  server = await createServer({
    configFile: path.join(rootDir, 'vite.config.js'),
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'error',
  })

  const { default: App } = await server.ssrLoadModule('/src/App.jsx')
  const markup = renderToString(React.createElement(App))
  const html = await readFile(indexPath, 'utf8')
  const rootPattern = /<div id="root"><\/div>/

  if (!rootPattern.test(html)) {
    throw new Error('Could not find the empty #root element in dist/index.html')
  }

  const prerendered = html.replace(rootPattern, `<div id="root">${markup}</div>`)
  await writeFile(indexPath, prerendered, 'utf8')
  console.log(`Prerendered homepage HTML (${markup.length.toLocaleString()} characters).`)
} catch (error) {
  console.error('Homepage prerender failed:', error)
  process.exitCode = 1
} finally {
  await server?.close()
}
