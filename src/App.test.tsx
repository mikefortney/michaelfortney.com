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
    const mailto = screen.getByRole('link', { name: /mike@michaelfortney\.com/i })
    expect(mailto).toHaveAttribute('href', 'mailto:mike@michaelfortney.com')
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
    // Current rendered body text is ~3665 characters; 1000 is comfortably above an
    // empty render and comfortably below that, so this catches a broken/blank page.
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
