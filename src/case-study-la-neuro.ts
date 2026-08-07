export type CaseStudy = {
  client: string
  title: string
  liveUrl: string
  images: { src: string; alt: string; caption: string; width: number; height: number }[]
  opening: string[]
  sections: { title: string; body: string[] }[]
  closing: string
}

export const caseStudy: CaseStudy = {
  client: 'Los Angeles Neurosciences',
  title: 'A neurology practice that needed more site than Squarespace could give it',
  liveUrl: 'https://laneurosciences.com',
  images: [
    {
      src: '/la-neurosciences-before.jpg',
      alt: 'The previous Los Angeles Neurosciences site, a Squarespace page with a blue hero reading Neurology with Purpose, and a nav of Blog, FAQ, About, Reviews, Contact and Patient Portal.',
      caption: 'The practice site before the rebuild.',
      width: 1200,
      height: 958,
    },
    {
      src: '/la-neurosciences-after.jpg',
      alt: 'The rebuilt Los Angeles Neurosciences site, with a hero reading Expert Neurology Care for Every Stage of Life that names migraines, epilepsy, stroke, Parkinsons and dementia, above a strip of practice statistics.',
      caption: 'The same practice after the rebuild.',
      width: 1200,
      height: 958,
    },
  ],
  opening: [
    'Dr. Kurian runs a neurology practice in Santa Clarita. His site was built and hosted on Squarespace. It looked dated, it did not cover everything he treats, and there was not much SEO work underneath it. No service-specific pages, no local content, none of the structured data that tells a search engine what a medical practice actually is.',
    "He was already ranking well, mostly because there isn't much neurology competition in Santa Clarita. That's worth saying because I wasn't fixing something broken, I was making sure I didn't break it while building out everything that had never been there.",
    "He never asked for accessibility but I built it in from the start because it's a medical practice, and I'd rather not ship something a patient can't use.",
  ],
  sections: [
    {
      title: 'What shipped',
      body: [
        'The site runs on Next.js with Sanity behind it, and it is 28 pages now: seven service pages covering what he actually treats, a clinical blog, and the usual practice pages for contact, reviews, clinical trials and medical-legal work.',
        "The eight posts he already had came across from Squarespace through a migration script that converted them into Sanity's content format, with the generated slugs cleaned up and a redirect from every old URL to its new home. That part mattered more than it sounds, because he was ranking and I wasn't going to spend that on a rebuild. His staff can edit any of it without calling me.",
      ],
    },
    {
      title: 'Accessibility, and the gate that keeps it',
      body: [
        'The site is WCAG 2.2 AA, and the part I care about more is that it stays that way. Axe runs against nine routes chosen to cover every distinct section type and interactive widget on the site, the form, the accordion, the carousel, a service page, a blog post, and it has to come back with zero violations.',
        "I went through the awkward parts with VoiceOver by hand as well, because an automated tool won't tell you that a heading is announcing itself as \"2 items\" to a screen reader user.",
        "There is no CI on this project, so that gate is a step I run locally before every deploy rather than something a server enforces for me. It is discipline rather than infrastructure, and it is worth saying out loud instead of implying otherwise.",
      ],
    },
    {
      title: 'The editor took two passes',
      body: [
        "The client wanted Squarespace-style visual editing, which is a reasonable thing to want after years of having it. Sanity's own presentation tool was too clunky to hand him, so I looked at the alternatives properly: Payload paired with Puck, Webstudio, Sanity Canvas, and a separate authenticated editing route.",
        "Payload would have meant self-hosting, and that breaks the zero-backend setup his security consultant had already signed off on, so it lost on that rather than on features. Webstudio gives you full CSS, which is harder to put guardrails around. Sanity Canvas turned out to be an AI writing tool rather than a page builder. Puck embedded inside the Sanity Studio won because nothing new had to be hosted or secured, and I built two throwaway spikes to prove it worked before committing to it.",
        "Then I built too much of it. A few weeks in I audited the roughly 3,600 lines of custom editor code I had written, and 400 to 600 of them were fighting the tool rather than using it. That layer was generating most of the recurring bugs, and it sat on top of fields that already worked, so removing it would have cost no functionality at all. I did not rewrite it and I did not rip it out. I stopped expanding it and let new work default to the way the tool wants to be used.",
      ],
    },
  ],
  closing:
    'The comps came from the client, so none of the visual design is mine. My job was to build them properly, keep what was already working, and leave him something his staff can run without me. That is most of what agency work actually is.',
}
