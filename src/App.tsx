import { content } from './content'

export default function App() {
  const { contact } = content

  return (
    <main className="page">
      <header>
        <div className="header-name">
          <h1>{content.name}</h1>
          <p>{content.dba}</p>
          <p>
            {content.tagline.map((line, i) => (
              <span key={line}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
        </div>
      </header>

      <div className="intro">
        {content.intro.map((p, i) => (
          <p key={p} className={i === 0 ? 'hero' : undefined}>
            {p}
          </p>
        ))}
      </div>

      <section aria-labelledby="who-i-work-with">
        <h2 id="who-i-work-with" className="spine-heading">
          Who I work with
        </h2>
        {content.whoIWorkWith.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>

      <section aria-labelledby="specialties">
        <h2 id="specialties" className="spine-heading">
          What I am especially good at
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
          Some things I have built recently
        </h2>
        {content.work.map((w) => (
          <div key={w.client}>
            <h3>{w.href ? <a href={w.href}>{w.client}</a> : w.client}</h3>
            <p>{w.body}</p>
          </div>
        ))}
      </section>

      <section aria-labelledby="background">
        <h2 id="background" className="spine-heading">
          Before this
        </h2>
        <p>{content.background}</p>
      </section>

      <section aria-labelledby="engagements">
        <h2 id="engagements" className="spine-heading">
          Working together
        </h2>
        {content.engagements.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>

      <section aria-labelledby="contact">
        <h2 id="contact" className="spine-heading">
          Getting hold of me
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
        <p>No contact form. I would rather you just emailed me.</p>
      </section>

      <section aria-labelledby="policies">
        <h2 id="policies" className="spine-heading">
          The boring but necessary part
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
