// Builds the SSR entry with Vite, renders App to static markup, and writes
// the final dist/index.html. This runs after the client `vite build` step
// (see package.json), which has already produced the hashed CSS and copied
// the fonts into dist/. No application JavaScript is emitted at any point
// in this pipeline.
import { build } from 'vite'
import react from '@vitejs/plugin-react'
import { readdirSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const distDir = join(root, 'dist')
const ssrOutDir = join(root, 'dist-ssr')

async function renderAppMarkup() {
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
  const { render } = await import(pathToFileURL(modulePath).href)
  return render()
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

function writeHtml(markup, cssHref) {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Michael Fortney | Senior Frontend Engineer, Contract</title>
    <meta
      name="description"
      content="Senior frontend engineer available for contract work. React, TypeScript, and Next.js. Design systems, accessibility compliance, and safe delivery in live production systems."
    />
    <link rel="canonical" href="https://www.michaelfortney.com/" />
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
    ${markup}
    <script defer src="/_vercel/insights/script.js"></script>
  </body>
</html>
`
  writeFileSync(join(distDir, 'index.html'), html)
}

async function main() {
  if (!existsSync(distDir)) {
    throw new Error('dist/ does not exist. Run the client vite build first.')
  }
  assertNoJsAssets()
  const cssHref = findCssHref()
  const markup = await renderAppMarkup()
  writeHtml(markup, cssHref)
  rmSync(ssrOutDir, { recursive: true, force: true })
}

main()
