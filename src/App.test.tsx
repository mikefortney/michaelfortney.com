import { render, screen } from '@testing-library/react'
import App from './App'
import { content } from './content'

const allCopy = () =>
  JSON.stringify(content) + document.body.textContent

describe('Stripe website checklist', () => {
  beforeEach(() => render(<App />))

  it('states the purchase currency explicitly', () => {
    expect(document.body.textContent).toMatch(/US dollars \(USD\)/)
  })

  it('offers at least two direct contact methods', () => {
    const mailto = screen.getByRole('link', { name: /mike@fortney\.dev/i })
    expect(mailto).toHaveAttribute('href', 'mailto:mike@fortney.dev')
    const calendly = screen.getByRole('link', { name: /book a call/i })
    expect(calendly).toHaveAttribute('href', 'https://calendly.com/mike-fortney/30min')
  })

  it('has no contact form, which Stripe warns against as the only channel', () => {
    expect(document.querySelector('form')).toBeNull()
  })

  it('publishes cancellation, refund, privacy, and payment security policies', () => {
    for (const heading of ['Cancellation', 'Refunds', 'Privacy', 'Payment security']) {
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
    }
  })

  it('shows a business location', () => {
    expect(document.body.textContent).toMatch(/Temecula, California/)
  })
})

describe('claim rules from spec section 5', () => {
  beforeEach(() => render(<App />))

  it('renders a substantial body, so the forbidden-string checks below are not vacuous', () => {
    // Rendered body text is about 4566 characters after the Aug 6 copy cut.
    // 1000 is comfortably above an empty render and well below that, so this
    // catches a broken or blank page without gating on copy length.
    expect(document.body.textContent?.length ?? 0).toBeGreaterThan(1000)
  })

  // DogVacay and OneLogin must never appear here at all, both were acquired
  // years after the owner left and naming them would misrepresent his tenure.
  // 17% is withheld until a timeframe for that figure is confirmed.
  // "acquired" is blocked as a catch-all so an acquisition claim cannot sneak
  // in under different wording.
  // LA Neurosciences was removed from this list on 2026-08-06: Dr. Tom Kurian
  // gave written permission to name the practice and link the site.
  it.each(['DogVacay', 'OneLogin', '17%', 'acquired'])(
    'never mentions %s',
    (forbidden) => {
      expect(allCopy().toLowerCase()).not.toContain(forbidden.toLowerCase())
    },
  )

  it('names Los Angeles Neurosciences and links to its case study', () => {
    const link = screen.getByRole('link', { name: /Los Angeles Neurosciences/i })
    expect(link).toHaveAttribute('href', '/work/la-neurosciences')
  })

  it('does not claim design credit for the medical practice build', () => {
    expect(allCopy().toLowerCase()).not.toContain('designed and built')
  })
})

describe('voice rules', () => {
  beforeEach(() => render(<App />))

  it('contains no em dashes', () => {
    expect(allCopy()).not.toContain('—')
  })
})

describe('copy length', () => {
  beforeEach(() => render(<App />))

  // Measures only the five fields this cut controls. The rendered page also
  // carries policies, background, contact and the tagline, roughly 1600
  // characters that are deliberately out of scope, so asserting on
  // document.body.textContent would gate this on copy no edit may touch.
  const cutFields = () =>
    [
      content.intro,
      content.whoIWorkWith,
      content.specialties.flatMap((s) => [s.title, s.body]),
      content.work.flatMap((w) => [w.client, w.body]),
      content.engagements,
    ]
      .flat()
      .join(' ')

  it('keeps the cut copy under 3200 characters', () => {
    // 3005 after the Aug 6 cut, down from 3874, which is roughly 500 words.
    // The ceiling leaves headroom without letting it drift back.
    expect(cutFields().length).toBeLessThan(3200)
  })

  it('still says the things the Stripe checklist needs', () => {
    expect(document.body.textContent).toMatch(/US dollars \(USD\)/)
    expect(document.body.textContent).toMatch(/Temecula, California/)
  })
})
