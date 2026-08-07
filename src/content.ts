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
    "I'm Mike. I got online in 1990 at the age of ten, saved up to buy my own computer two years later, and have been happily ruining my eyesight ever since.",
    'At fifteen I did phone support at an ISP, talking people through fixing their janky dial up connections. Then computer sales and repair through the late nineties, and an in-home IT company in my early twenties, all before software became the job. No degree. I learned every bit of it the way you learn anything worth knowing: by building something, breaking it spectacularly, and refusing to go to bed until it worked.',
    'For a couple of years I also ran an online store selling wedding rings, which taught me that building an e-commerce site and running one are two very different jobs. It is still the most useful thing I know when a client sells things online.',
    'Twenty years into the software half of all this, I build frontend applications for a living, argue about Star Wars for free, and have a daughter who already thinks I am uncool.',
  ],
  whoIWorkWith: [
    'A few different kinds of people hire me.',
    'Agencies and studios who need a senior pair of hands under their own brand. I stay in the background, and your client never hears my name unless you want them to.',
    'Product teams who are short a person and cannot wait out six months of hiring to fix it.',
    'Businesses who need something built properly the first time, and would rather talk to the person doing the work than to an account manager.',
    'And sometimes a team that needs someone to run the frontend side rather than just write it. I led frontend at a Shopify SaaS company for three and a half years before going independent, so that is on the table too.',
    'Some of this is a whole site or app built from nothing. Some of it is six weeks inside a codebase somebody else wrote, shipping changes without taking anything down. Both are fine by me. The second one is rarer, and I am better at it than most.',
    'I work remotely from southern California, US Pacific hours, with people anywhere in the United States.',
  ],
  specialties: [
    {
      title: 'Design systems at scale',
      body: 'I have built these from nothing and I have been dropped into ones that were already wobbling. Either way the interesting work is the same. What is a component allowed to know. How does it version. What happens the first time a team needs it to do something it was never designed for. Get those right early and the thing lasts. Get them wrong and you find out two years later.',
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
      body: 'Product bundles, product page and cart upsells, and a spend-threshold free-gift ladder for their Shopify store. Also rebuilt the store navigation, built custom collection landing pages, and added a find-a-store page for people who would rather buy in person.',
    },
    {
      client: 'DML Solutions',
      body: 'A range of features on a pre-launch consumer app, plus bringing the whole thing up to WCAG 2.2 AA levels of accessibility.',
    },
  ],
  background:
    'Most recently three and a half years leading frontend at Inspired, a Shopify SaaS company. Before that, eight years at Cornerstone OnDemand, rebuilding a legacy ASP.NET platform into React while it stayed live for customers, and building the component library that more than ten teams ended up using.',
  engagements: [
    'Hourly, weekly, or a fixed price for something well defined like an accessibility audit. All quoted and invoiced in US dollars (USD).',
    'Invoices go out through Stripe, payable by ACH bank transfer or card.',
    'Payment terms, including any deposit, get agreed in writing before I start, and they vary with the work. Changes to an agreed scope get quoted separately, so nothing turns into a surprise.',
    'Rates depend on scope, length, and whether you are an agency reselling me or a client hiring me directly. Ask and I will send them the same day.',
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
