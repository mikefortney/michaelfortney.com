import { caseStudy } from './case-study-la-neuro'

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export default function CaseStudyLaNeuro() {
  return (
    <main className="page">
      <header>
        <div className="header-name">
          <p>
            <a href="/">Mike Fortney</a>
          </p>
          <h1>{caseStudy.client}</h1>
          <p>{caseStudy.title}</p>
          <p>
            <a href={caseStudy.liveUrl} rel="noopener noreferrer" target="_blank">
              laneurosciences.com
            </a>
          </p>
        </div>
      </header>

      <div className="intro">
        {caseStudy.opening.map((p, i) => (
          <p key={p} className={i === 0 ? 'hero' : undefined}>
            {p}
          </p>
        ))}
      </div>

      {caseStudy.images.map((img) => (
        <figure key={img.src}>
          <img
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            loading="lazy"
          />
          <figcaption>{img.caption}</figcaption>
        </figure>
      ))}

      {caseStudy.sections.map((s) => (
        <section key={s.title} aria-labelledby={slug(s.title)}>
          <h2 id={slug(s.title)} className="spine-heading">
            {s.title}
          </h2>
          {s.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </section>
      ))}

      <section aria-labelledby="in-short">
        <h2 id="in-short" className="spine-heading">
          In short
        </h2>
        <p>{caseStudy.closing}</p>
      </section>
    </main>
  )
}
