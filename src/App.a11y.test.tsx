import { render, screen } from '@testing-library/react'
import App from './App'

describe('accessibility basics', () => {
  beforeEach(() => render(<App />))

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
})
