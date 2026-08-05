import { useEffect, useState } from 'react'
import { content } from './content'

type Theme = 'light' | 'dark'

function getSystemTheme(): Theme {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getStoredTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem('theme')
    return stored === 'light' || stored === 'dark' ? stored : null
  } catch {
    return null
  }
}

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme() ?? getSystemTheme())

  // Track the system preference live, but only while the visitor has not
  // made an explicit choice of their own.
  useEffect(() => {
    if (getStoredTheme() || typeof window.matchMedia !== 'function') return
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => setTheme(e.matches ? 'dark' : 'light')
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try {
      window.localStorage.setItem('theme', next)
    } catch {
      // Private browsing or a blocked store: the toggle still works for this visit.
    }
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-pressed={theme === 'dark'}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false">
        {theme === 'dark' ? (
          <path d="M17 11.5A7 7 0 1 1 8.5 3a5.5 5.5 0 0 0 8.5 8.5Z" fill="currentColor" />
        ) : (
          <>
            <circle cx="10" cy="10" r="4" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="10" y1="1.5" x2="10" y2="3.5" />
              <line x1="10" y1="16.5" x2="10" y2="18.5" />
              <line x1="1.5" y1="10" x2="3.5" y2="10" />
              <line x1="16.5" y1="10" x2="18.5" y2="10" />
              <line x1="4.2" y1="4.2" x2="5.6" y2="5.6" />
              <line x1="14.4" y1="14.4" x2="15.8" y2="15.8" />
              <line x1="4.2" y1="15.8" x2="5.6" y2="14.4" />
              <line x1="14.4" y1="5.6" x2="15.8" y2="4.2" />
            </g>
          </>
        )}
      </svg>
    </button>
  )
}

export default function App() {
  const { contact } = content

  return (
    <main className="page">
      <header>
        <div className="header-name">
          <h1>{content.name}</h1>
          <p>{content.dba}</p>
          <p>{content.tagline}</p>
        </div>
        <ThemeToggle />
      </header>

      <section aria-labelledby="services">
        <h2 id="services" className="spine-heading">
          What I do
        </h2>
        {content.services.map((p, i) => (
          <p key={p} className={i === 0 ? 'hero' : undefined}>
            {p}
          </p>
        ))}
      </section>

      <section aria-labelledby="specialties">
        <h2 id="specialties" className="spine-heading">
          What I specialize in
        </h2>
        {content.specialties.map((s) => (
          <div key={s.title}>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </section>

      <section aria-labelledby="work">
        <h2 id="work" className="spine-heading">
          Selected client work
        </h2>
        {content.work.map((w) => (
          <div key={w.client}>
            <h3>{w.client}</h3>
            <p>{w.body}</p>
          </div>
        ))}
      </section>

      <section aria-labelledby="background">
        <h2 id="background" className="spine-heading">
          Background
        </h2>
        <p>{content.background}</p>
      </section>

      <section aria-labelledby="engagements">
        <h2 id="engagements" className="spine-heading">
          How engagements work
        </h2>
        {content.engagements.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>

      <section aria-labelledby="contact">
        <h2 id="contact" className="spine-heading">
          Contact
        </h2>
        <ul>
          <li>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </li>
          <li>
            <a href={contact.calendly} rel="noopener noreferrer" target="_blank">
              Book a call
            </a>
          </li>
          <li>
            <a href={contact.linkedin} rel="noopener noreferrer" target="_blank">
              LinkedIn
            </a>
          </li>
        </ul>
        <p>{contact.location}</p>
      </section>

      <section aria-labelledby="policies">
        <h2 id="policies" className="spine-heading">
          Policies
        </h2>
        {content.policies.map((p) => (
          <div key={p.title}>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
