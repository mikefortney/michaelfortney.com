import { execSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const distDir = join(root, 'dist')

function ensureBuild() {
  if (
    existsSync(join(distDir, 'index.html')) &&
    existsSync(join(distDir, 'work', 'la-neurosciences', 'index.html')) &&
    existsSync(join(distDir, 'sitemap.xml'))
  ) {
    return
  }
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

function readCaseStudyHtml(): string {
  return readFileSync(join(distDir, 'work', 'la-neurosciences', 'index.html'), 'utf-8')
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

    for (const forbidden of ['DogVacay', 'OneLogin', '17%']) {
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

describe('case study page output', () => {
  beforeAll(() => {
    ensureBuild()
  }, 120_000)

  it('is written to its own nested path', () => {
    expect(existsSync(join(distDir, 'work', 'la-neurosciences', 'index.html'))).toBe(true)
  }, 120_000)

  it('carries its own title, description and canonical', () => {
    const html = readCaseStudyHtml()
    expect(html).toContain('<title>Los Angeles Neurosciences | Michael Fortney</title>')
    expect(html).toContain(
      '<link rel="canonical" href="https://fortney.dev/work/la-neurosciences" />',
    )

    const home = readHtml()
    const titleOf = (s: string) => s.match(/<title>([^<]*)<\/title>/)?.[1]
    const descOf = (s: string) => s.match(/name="description" content="([^"]*)"/)?.[1]
    expect(titleOf(html)).not.toEqual(titleOf(home))
    expect(descOf(html)).not.toEqual(descOf(home))
  }, 120_000)

  it('ships the case study copy in the HTML', () => {
    expect(readCaseStudyHtml()).toContain(
      'Dr. Kurian runs a neurology practice in Santa Clarita.',
    )
  }, 120_000)

  it('ships no application JavaScript on this page either', () => {
    const html = readCaseStudyHtml()
    const scriptTags = html.match(/<script\b/g) ?? []
    expect(scriptTags).toHaveLength(1)
    expect(jsFilesInDist()).toEqual([])
  }, 120_000)

  it('never ships an em dash', () => {
    expect(readCaseStudyHtml()).not.toContain('—')
  }, 120_000)

  it('never ships forbidden strings either', () => {
    const html = readCaseStudyHtml().toLowerCase()
    for (const forbidden of ['DogVacay', 'OneLogin', '17%', 'designed and built']) {
      expect(html).not.toContain(forbidden.toLowerCase())
    }
  }, 120_000)

  it('links back to the homepage', () => {
    expect(readCaseStudyHtml()).toContain('href="/"')
  }, 120_000)

  it.each(['la-neurosciences-before.jpg', 'la-neurosciences-after.jpg'])(
    'ships %s, and keeps it small',
    (name) => {
      const img = join(distDir, name)
      expect(existsSync(img)).toBe(true)
      // The before shot is 142KB as built. 200KB is the ceiling: this site's
      // whole point is that it is light, so an unoptimised screenshot would
      // undercut the thing it demonstrates.
      expect(statSync(img).size).toBeLessThan(200 * 1024)
    },
    120_000,
  )
})

// The URLs this site publishes to search engines. Deliberately spelled out
// rather than derived from src/pages.tsx: adding a page to the sitemap is a
// publication decision, so it should take an explicit edit here too.
const PUBLISHED_URLS = [
  'https://fortney.dev/',
  'https://fortney.dev/work/la-neurosciences',
]

function canonicalOf(html: string): string | undefined {
  return html.match(/<link rel="canonical" href="([^"]*)" \/>/)?.[1]
}

function builtCanonicals(): string[] {
  const found: string[] = []
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.name === 'index.html') {
        const canonical = canonicalOf(readFileSync(full, 'utf-8'))
        if (canonical) found.push(canonical)
      }
    }
  }
  walk(distDir)
  return found
}

describe('sitemap.xml and robots.txt', () => {
  beforeAll(ensureBuild, 120_000)

  it('lists exactly the pages we mean to publish', () => {
    const xml = readFileSync(join(distDir, 'sitemap.xml'), 'utf-8')
    const locs = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1])
    expect(locs).toEqual(PUBLISHED_URLS)
  }, 120_000)

  it('never lists a URL that has no page built for it', () => {
    const xml = readFileSync(join(distDir, 'sitemap.xml'), 'utf-8')
    const locs = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1])
    const canonicals = builtCanonicals()
    for (const loc of locs) {
      expect(canonicals).toContain(loc)
    }
  }, 120_000)

  it('lists only apex URLs, never www', () => {
    const xml = readFileSync(join(distDir, 'sitemap.xml'), 'utf-8')
    expect(xml).not.toContain('www.fortney.dev')
  }, 120_000)

  it('points robots.txt at the sitemap', () => {
    const robots = readFileSync(join(distDir, 'robots.txt'), 'utf-8')
    expect(robots).toContain('Sitemap: https://fortney.dev/sitemap.xml')
  }, 120_000)
})
