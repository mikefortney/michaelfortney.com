import { content } from './content'

export default function App() {
  const { contact } = content

  return (
    <main>
      <header>
        <h1>{content.name}</h1>
        <p>{content.dba}</p>
        <p>{content.tagline}</p>
      </header>

      <section aria-labelledby="services">
        <h2 id="services">What I do</h2>
        {content.services.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>

      <section aria-labelledby="specialties">
        <h2 id="specialties">What I specialize in</h2>
        {content.specialties.map((s) => (
          <div key={s.title}>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </section>

      <section aria-labelledby="work">
        <h2 id="work">Selected client work</h2>
        {content.work.map((w) => (
          <div key={w.client}>
            <h3>{w.client}</h3>
            <p>{w.body}</p>
          </div>
        ))}
      </section>

      <section aria-labelledby="background">
        <h2 id="background">Background</h2>
        <p>{content.background}</p>
      </section>

      <section aria-labelledby="engagements">
        <h2 id="engagements">How engagements work</h2>
        {content.engagements.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>

      <section aria-labelledby="contact">
        <h2 id="contact">Contact</h2>
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

      <hr />

      <section aria-labelledby="policies">
        <h2 id="policies">Policies</h2>
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
