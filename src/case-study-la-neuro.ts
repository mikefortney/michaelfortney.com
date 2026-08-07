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
        'The site runs on Next.js with Sanity CMS behind it, and it is 28 pages now: seven service pages covering what he actually treats, a clinical blog, and the usual practice pages for contact, reviews, clinical trials and medical-legal work.',
        "The eight posts he already had came across from Squarespace through a migration script that converted them into Sanity's content format, with the generated slugs cleaned up and a redirect from every old URL to its new home. That part mattered more than it sounds, because he was ranking and I wasn't going to spend that on a rebuild. His staff can edit any of it without calling me.",
      ],
    },
    {
      title: 'Accessibility, and the gate that keeps it',
      body: [
        'The site is WCAG 2.2 AA, and the part I care about more is that it stays that way. Axe runs against nine routes chosen to cover every distinct section type and interactive widget on the site, the form, the accordion, the carousel, a service page, a blog post, and it has to come back with zero violations.',
        "I went through the awkward parts with VoiceOver by hand as well, because an automated tool won't tell you that a heading is announcing itself as \"2 items\" to a screen reader user.",
      ],
    },
    {
      title: 'Getting the editor right',
      body: [
        "The client wanted to edit his own pages the way Squarespace had let him, and that was the hardest part to get right. Rather than guess at it, I researched what was actually out there: React Bricks, Payload, Puck, and Sanity's own Presentation tool.",
        "Puck embedded in Sanity looked strongest on paper, so I built working spikes rather than trusting the documentation. They told me what the docs couldn't. It worked, but it wasn't going to give him an editing experience I'd be proud of, so I changed tracks and built on Sanity Presentation instead, then reorganized the content model so the editing surface matched the way he actually thinks about his pages.",
        "Prototyping is cheap and being wrong in production isn't, so I'd rather find that out in a spike than after launch.",
      ],
    },
  ],
  closing:
    'The design came from the client and my job was to implement it exactly, which is most of what agency work actually is. The rest was keeping what already ranked, building out what had never been there, and leaving him a site his staff can run without me.',
}
