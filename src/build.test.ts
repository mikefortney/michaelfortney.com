import { execSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const distDir = join(root, 'dist')

function ensureBuild() {
  if (existsSync(join(distDir, 'index.html'))) return
  // vitest sets NODE_ENV=test; inheriting that here makes Vite bundle
  // react-dom's development build (whose warning strings contain an em
  // dash) during the SSR render step, so force production explicitly.
  execSync('npm run build', {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' },
  })
}

function readHtml(): string {
  return readFileSync(join(distDir, 'index.html'), 'utf-8')
}

function jsFilesInDist(): string[] {
  const found: string[] = []
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.name.endsWith('.js') || entry.name.endsWith('.mjs')) found.push(full)
    }
  }
  walk(distDir)
  return found
}

describe('production build output', () => {
  beforeAll(() => {
    ensureBuild()
  }, 120_000)

  it('contains the fully rendered page copy in the shipped HTML', () => {
    const html = readHtml()
    for (const required of [
      'mike@michaelfortney.com',
      'calendly.com/mike-fortney/30min',
      'US dollars (USD)',
      'Temecula, California',
    ]) {
      expect(html).toContain(required)
    }
  }, 120_000)

  it('never ships forbidden strings in the HTML', () => {
    const html = readHtml().toLowerCase()

    for (const forbidden of ['LA Neurosciences', 'DogVacay', 'OneLogin', '17%']) {
      expect(html).not.toContain(forbidden.toLowerCase())
    }
  }, 120_000)

  it('never ships an em dash in the HTML', () => {
    expect(readHtml()).not.toContain('—')
  }, 120_000)

  it('ships no application JavaScript bundle', () => {
    // No .js or .mjs file anywhere in dist, and the only script tag in the
    // HTML at all is the first-party Vercel Insights snippet. Counting every
    // <script occurrence (not just src= ones) also catches a future inline
    // script sneaking a runtime back in.
    expect(jsFilesInDist()).toEqual([])

    const html = readHtml()
    const scriptTags = html.match(/<script\b/g) ?? []
    expect(scriptTags).toHaveLength(1)
    expect(html).toContain('<script defer src="/_vercel/insights/script.js"></script>')
  }, 120_000)

  it('links the built stylesheet and preloads the font', () => {
    const html = readHtml()
    expect(html).toMatch(/<link rel="stylesheet" href="\/assets\/[^"]+\.css" \/>/)
    expect(html).toMatch(/href="\/fonts\/public-sans-var\.woff2"/)
  }, 120_000)
})
