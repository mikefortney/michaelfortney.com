import { render, screen } from '@testing-library/react'
import CaseStudyLaNeuro from './CaseStudyLaNeuro'
import { caseStudy } from './case-study-la-neuro'

const allCopy = () => JSON.stringify(caseStudy) + document.body.textContent

describe('LA Neurosciences case study', () => {
  beforeEach(() => render(<CaseStudyLaNeuro />))

  it('has exactly one h1', () => {
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('gives every section an accessible name', () => {
    const sections = Array.from(document.querySelectorAll('section'))
    expect(sections.length).toBeGreaterThan(0)
    for (const section of sections) {
      expect(section.getAttribute('aria-labelledby')).toBeTruthy()
    }
  })

  it('marks external links so they open predictably', () => {
    const external = Array.from(document.querySelectorAll('a[href^="https://"]'))
    expect(external.length).toBeGreaterThan(0)
    for (const link of external) {
      expect(link.getAttribute('rel')).toContain('noopener')
    }
  })

  it('links back to the homepage', () => {
    const home = screen.getByRole('link', { name: /Michael Fortney/i })
    expect(home).toHaveAttribute('href', '/')
  })

  it('links to the live client site', () => {
    const live = screen.getByRole('link', { name: /laneurosciences\.com/i })
    expect(live).toHaveAttribute('href', 'https://laneurosciences.com')
  })

  it('opens with the approved copy verbatim', () => {
    expect(document.body.textContent).toContain(
      'Dr. Kurian runs a neurology practice in Santa Clarita.',
    )
    expect(document.body.textContent).toContain(
      "He never asked for accessibility but I built it in from the start",
    )
  })

  it('contains no em dashes', () => {
    expect(allCopy()).not.toContain('—')
  })

  // Dr. Kurian's permission covers naming and linking only, not business
  // results. A percent sign is the sharpest single proxy for a metric claim
  // sneaking in, and there is no legitimate reason for one on this page.
  it('quotes no figures, because permission does not cover results', () => {
    expect(allCopy()).not.toContain('%')
  })

  // The client supplied the comps, so no design credit. Checking the exact
  // claim words rather than the substring "design", since the page
  // legitimately says "none of the visual design is mine".
  it.each(['designed and built', 'i designed', 'my design', 'designed by me'])(
    'never claims %s',
    (forbidden) => {
      expect(allCopy().toLowerCase()).not.toContain(forbidden.toLowerCase())
    },
  )

  it('says plainly that the designs came from the client', () => {
    expect(document.body.textContent).toMatch(/design came from the client/i)
  })

  it.each([
    ['before', /previous Los Angeles Neurosciences site/i, '/la-neurosciences-before.jpg'],
    ['after', /rebuilt Los Angeles Neurosciences site/i, '/la-neurosciences-after.jpg'],
  ])('shows the %s image with dimensions set, to prevent layout shift', (_label, alt, src) => {
    const img = screen.getByRole('img', { name: alt })
    expect(img).toHaveAttribute('src', src)
    expect(img).toHaveAttribute('width', '1200')
    expect(img).toHaveAttribute('height', '958')
    expect(img).toHaveAttribute('loading', 'lazy')
  })

  it('shows only those two images', () => {
    expect(document.querySelectorAll('img')).toHaveLength(2)
  })

  it('captions both without criticising the old site', () => {
    const captions = Array.from(document.querySelectorAll('figcaption')).map(
      (c) => c.textContent,
    )
    expect(captions).toEqual([
      'The practice site before the rebuild.',
      'The same practice after the rebuild.',
    ])
  })
})
