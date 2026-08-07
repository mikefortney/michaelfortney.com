export type SiteContent = {
  name: string
  dba: string
  tagline: string[]
  intro: string[]
  whoIWorkWith: string[]
  specialties: { title: string; body: string }[]
  work: { client: string; body: string; href?: string }[]
  background: string
  engagements: string[]
  contact: { email: string; calendly: string; linkedin: string; location: string }
  policies: { title: string; body: string }[]
}

export const content: SiteContent = {
  name: 'Michael Fortney',
  dba: 'Grey Matter Tech',
  tagline: [
    'Frontend engineer, twenty years in. React, TypeScript, and Next.js.',
    'Available for contract work.',
  ],
  intro: [
    "I'm Mike. I got online in 1990 at the age of ten and have been happily ruining my eyesight ever since.",
    "At fifteen I did phone support at an ISP, talking people through their janky dial up connections, then ran an in-home IT company in my early twenties. No degree. I learned it by building something, breaking it spectacularly, and refusing to go to bed until it worked. I also ran an online store selling wedding rings for a couple of years, which taught me that building an e-commerce site and running one are two very different jobs. That's still the most useful thing I know when a client sells things online.",
    "Twenty years into the software half of all this, I build frontend applications for a living and have a daughter who already thinks I'm uncool.",
  ],
  whoIWorkWith: [
    'Agencies and studios who need a senior pair of hands under their own brand. I stay in the background, and your client never hears my name unless you want them to.',
    "Product teams who are short a person and can't wait out six months of hiring to fix it.",
    'Businesses who want something built properly the first time, and would rather talk to the person doing the work than to an account manager.',
    "Some of this is a whole site built from nothing, and some of it is six weeks inside a codebase somebody else wrote, shipping changes without taking anything down. The second one is rarer, and I'm better at it than most.",
  ],
  specialties: [
    {
      title: 'Design systems at scale',
      body: "I've built these from nothing and I've been dropped into ones that were already wobbling, and the interesting questions are the same either way. What is a component allowed to know, how does it version, and what happens the first time a team needs it to do something it was never designed for.",
    },
    {
      title: 'Accessibility',
      body: 'WCAG 2.1 and 2.2 AA, the audit and the React remediation afterward. A lot of teams have a compliance deadline and nobody in house who can meet it. I like this work more than I probably should.',
    },
    {
      title: 'Working in live production systems without breaking them',
      body: 'Incremental delivery, no big-bang rewrites, and nothing that takes down something people are using right now.',
    },
  ],
  work: [
    {
      client: 'Los Angeles Neurosciences',
      body: 'Built their site in Next.js and Sanity, with WCAG 2.2 AA accessibility in from the start and an automated gate that keeps it there.',
      href: '/work/la-neurosciences',
    },
    {
      client: 'Wild Tree Bee Company',
      body: 'Product bundles, upsells on the product page and in the cart, and a spend-threshold free-gift ladder for their Shopify store, plus rebuilt navigation and a find-a-store page.',
    },
    {
      client: 'DML Solutions',
      body: 'A range of features on a pre-launch consumer app, plus bringing the whole thing up to WCAG 2.2 AA.',
    },
  ],
  background:
    'Most recently three and a half years leading frontend at Inspired, a Shopify SaaS company. Before that, eight years at Cornerstone OnDemand, rebuilding a legacy ASP.NET platform into React while it stayed live for customers, and building the component library that more than ten teams ended up using.',
  engagements: [
    'Hourly, weekly, or a fixed price for something well defined like an accessibility audit. Everything is quoted and invoiced in US dollars (USD) through Stripe, payable by ACH bank transfer or card.',
    "Payment terms get agreed in writing before I start, and changes to an agreed scope get quoted separately so nothing turns into a surprise. Rates depend on scope, length, and whether you're an agency reselling me or a client hiring me directly. Ask and I'll send them the same day.",
  ],
  contact: {
    email: 'mike@michaelfortney.com',
    calendly: 'https://calendly.com/mike-fortney/30min',
    linkedin: 'https://www.linkedin.com/in/michaelfortney/',
    location: 'Temecula, California, United States',
  },
  policies: [
    {
      title: 'Cancellation',
      body: 'Either of us can end an engagement on one week of notice. You pay for work completed up to the end of that week and nothing after it.',
    },
    {
      title: 'Refunds',
      body: 'Terms get agreed in writing before any work starts. If you have paid in advance for work I have not delivered, you get the unused balance back. If something I delivered does not match what we agreed in writing, I fix it at no extra charge.',
    },
    {
      title: 'Privacy',
      body: 'This site sets no cookies and does not track you. It uses privacy-friendly analytics that count page views without cookies and without identifying anyone. There are no forms here. If you email me or book a call, I keep your details to talk to you about the work and nothing else. I do not sell or share them.',
    },
    {
      title: 'Payment security',
      body: 'Payments are handled by Stripe. Card and bank details are entered on Stripe systems and never touch this site, which stores no payment information at all.',
    },
  ],
}
