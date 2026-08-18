// Builds the SSR entry with Vite, renders every page in src/pages.tsx to
// static markup, and writes one HTML file per page into dist/. This runs
// after the client `vite build` step (see package.json), which has already
// produced the hashed CSS and copied the fonts and public/ assets into
// dist/. No application JavaScript is emitted at any point in this pipeline,
// and assertNoJsAssets() fails the build if any appears.
import { build } from 'vite'
import react from '@vitejs/plugin-react'
import { readdirSync, writeFileSync, rmSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const distDir = join(root, 'dist')
const ssrOutDir = join(root, 'dist-ssr')

async function renderPages() {
  await build({
    root,
    plugins: [react()],
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: 'dist-ssr',
      emptyOutDir: true,
      minify: false,
      rollupOptions: {
        output: {
          entryFileNames: 'entry-server.mjs',
          format: 'es',
        },
      },
    },
    logLevel: 'warn',
  })

  const modulePath = join(ssrOutDir, 'entry-server.mjs')
  const { renderAll } = await import(pathToFileURL(modulePath).href)
  return renderAll()
}

function findCssHref() {
  const assetsDir = join(distDir, 'assets')
  const cssFiles = readdirSync(assetsDir).filter((f) => f.endsWith('.css'))
  if (cssFiles.length !== 1) {
    throw new Error(`Expected exactly one CSS asset, found ${cssFiles.length}`)
  }
  return `/assets/${cssFiles[0]}`
}

function assertNoJsAssets() {
  const assetsDir = join(distDir, 'assets')
  const jsFiles = readdirSync(assetsDir).filter((f) => f.endsWith('.js'))
  if (jsFiles.length > 0) {
    throw new Error(`Unexpected JS assets in dist/assets: ${jsFiles.join(', ')}`)
  }
}

function writeHtml(page, cssHref) {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${page.title}</title>
    <meta name="description" content="${page.description}" />
    <link rel="canonical" href="${page.canonical}" />
    <link
      rel="preload"
      href="/fonts/public-sans-var.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />
    <link rel="stylesheet" href="${cssHref}" />
  </head>
  <body>
    ${page.markup}
    <script defer src="/_vercel/insights/script.js"></script>
  </body>
</html>
`
  const outPath = join(distDir, page.outFile)
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, html)
}

// Lists every page that opted in via `sitemap: true` in src/pages.tsx, using
// the same canonical URL the page's own <link rel="canonical"> carries. No
// <lastmod>: it would change on every build and make the output
// non-deterministic, and Google treats it as a hint at best.
function writeSitemap(renderedPages) {
  const urls = renderedPages
    .filter((page) => page.sitemap)
    .map((page) => `  <url>\n    <loc>${page.canonical}</loc>\n  </url>`)
    .join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
  writeFileSync(join(distDir, 'sitemap.xml'), xml)
}

async function main() {
  if (!existsSync(distDir)) {
    throw new Error('dist/ does not exist. Run the client vite build first.')
  }
  assertNoJsAssets()
  const cssHref = findCssHref()
  const renderedPages = await renderPages()
  for (const page of renderedPages) {
    writeHtml(page, cssHref)
  }
  writeSitemap(renderedPages)
  rmSync(ssrOutDir, { recursive: true, force: true })
}

main()
