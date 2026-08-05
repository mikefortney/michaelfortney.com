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
  // react-dom's development build instead of production, so force it.
  execSync('npm run build', {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' },
  })
}

function readBundleSource(): string {
  const assetsDir = join(distDir, 'assets')
  const files = readdirSync(assetsDir).filter((f: string) => f.endsWith('.js'))
  return files.map((f: string) => readFileSync(join(assetsDir, f), 'utf-8')).join('\n')
}

describe('production build output', () => {
  beforeAll(() => {
    ensureBuild()
  }, 120_000)

  it('mounts to the same element id that index.html provides', () => {
    const mainSource = readFileSync(join(root, 'src/main.tsx'), 'utf-8')
    const match = mainSource.match(/getElementById\(['"]([^'"]+)['"]\)/)
    expect(match).not.toBeNull()
    const mountId = match![1]

    const html = readFileSync(join(distDir, 'index.html'), 'utf-8')
    const idPattern = new RegExp(`id=["']${mountId}["']`)
    expect(html).toMatch(idPattern)
  }, 120_000)

  it('includes required contact and business copy in the shipped bundle', () => {
    const bundle = readBundleSource()
    for (const required of [
      'contact@michaelfortney.com',
      'calendly.com/mike-fortney/30min',
      'US dollars (USD)',
      'Temecula, California',
    ]) {
      expect(bundle).toContain(required)
    }
  }, 120_000)

  it('never ships forbidden strings in html or the bundle', () => {
    const html = readFileSync(join(distDir, 'index.html'), 'utf-8')
    const bundle = readBundleSource()
    const combined = html + bundle

    // LA Neurosciences stays unnamed until that client approves being named.
    // DogVacay and OneLogin must never appear here at all, both were acquired
    // years after the owner left and naming them would misrepresent his tenure.
    // 17% is withheld until a timeframe for that figure is confirmed.
    for (const forbidden of ['LA Neurosciences', 'DogVacay', 'OneLogin', '17%']) {
      expect(combined).not.toContain(forbidden)
    }
  }, 120_000)

  it('never ships an em dash in html or the bundle', () => {
    const html = readFileSync(join(distDir, 'index.html'), 'utf-8')
    const bundle = readBundleSource()

    expect(html).not.toContain('—')
    expect(bundle).not.toContain('—')
  }, 120_000)
})
