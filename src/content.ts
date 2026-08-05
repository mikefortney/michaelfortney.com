export type SiteContent = {
  name: string
  dba: string
  tagline: string
  services: string[]
  specialties: { title: string; body: string }[]
  work: { client: string; body: string }[]
  background: string
  engagements: string[]
  contact: { email: string; calendly: string; linkedin: string; location: string }
  policies: { title: string; body: string }[]
}

export const content: SiteContent = {
  name: 'Michael Fortney',
  dba: 'Grey Matter Tech',
  tagline:
    'Senior frontend engineer. React, TypeScript, Next.js. Available for contract work.',
  services: [
    'I design and build frontend applications. New ones, and the ones that already exist.',
    'New builds are the straightforward half. I take a site or an application from nothing to live, make the architectural calls early enough that they do not become expensive later, and hand over something a team can actually maintain.',
    'The other half is the part most contractors would rather not take. I can drop into a large production codebase somebody else wrote, work out how it actually behaves, and ship changes without breaking the things people already depend on. Twenty years in, that is what I am best at, and it is considerably harder to hire for than the first half.',
    'Engagements usually take one of three shapes. Ongoing capacity for a team that is short a senior person. A defined project with a fixed scope and price, such as an accessibility audit. Or subcontracted work under an agency\'s brand, where I stay in the background and your client never hears my name unless you want them to.',
    'I work remotely in US Pacific hours, with agencies and product teams anywhere in the United States.',
  ],
  specialties: [
    {
      title: 'Design systems at scale',
      body: 'Adoption is rarely the hard part, because the company has usually already decided to move that way. The hard part is adapting the system to how each team actually works once they are building with it.',
    },
    {
      title: 'Accessibility compliance',
      body: 'WCAG 2.1 and 2.2 AA, both the audit and the React remediation work afterward. Plenty of teams have a compliance deadline and nobody in house who can meet it.',
    },
    {
      title: 'Working safely in live production systems',
      body: 'Incremental delivery, no big-bang rewrites, and no breaking things people are currently using.',
    },
  ],
  work: [
    {
      client: 'Wild Tree Bee Company',
      body: 'Built a product bundle, product page and cart upsells, and a spend-threshold free-gift ladder for their Shopify store. Also rebuilt the store navigation and built custom collection landing pages.',
    },
    {
      client: 'DML Solutions',
      body: 'Built out a range of features on a pre-launch consumer app, and did the accessibility work across the application to WCAG 2.2 AA.',
    },
    {
      client: 'A medical practice in Los Angeles',
      body: 'Designed and built a Next.js and Sanity (CMS) site, including the accessibility work.',
    },
  ],
  background:
    'Twenty years in frontend. Most recently three and a half years leading frontend at Inspired, a Shopify SaaS company. Before that, eight years at Cornerstone OnDemand, rebuilding a legacy ASP.NET platform into React while it stayed live for customers, and building the component library that more than ten teams adopted.',
  engagements: [
    'Work is quoted hourly, weekly, or at a fixed price for defined projects such as accessibility audits. All work is quoted and invoiced in US dollars (USD).',
    'Invoices are issued through Stripe and are payable by ACH bank transfer or card.',
    'Payment terms, including any prepayment or deposit, are agreed in writing before work starts and vary by engagement. Changes to an agreed scope are quoted separately.',
    'Rates are quoted per engagement, because they depend on scope, duration, and whether the work is direct or through an agency. Ask and I will send them the same day.',
  ],
  contact: {
    email: 'contact@michaelfortney.com',
    calendly: 'https://calendly.com/mike-fortney/30min',
    linkedin: 'https://www.linkedin.com/in/michaelfortney/',
    location: 'Temecula, California, United States',
  },
  policies: [
    {
      title: 'Cancellation',
      body: 'Either of us can end an engagement on one week of notice. You are billed for work completed up to the end of that week and nothing beyond it.',
    },
    {
      title: 'Refunds',
      body: 'Terms for each engagement are agreed in writing before any work begins. Where work has been paid for in advance and is not delivered, the unused balance is refunded. If delivered work does not match what was agreed in writing, I correct it at no additional charge.',
    },
    {
      title: 'Privacy',
      body: 'This site sets no cookies and does not track you. It uses privacy-friendly analytics that count page views without cookies and without identifying individual visitors. There are no forms here. If you email me or book a call, I keep your details only to correspond with you about the work, and I do not sell or share them with anyone.',
    },
    {
      title: 'Payment security',
      body: 'Payments are processed by Stripe. Card and bank details are entered on Stripe systems and never touch this site, which stores no payment information of any kind.',
    },
  ],
}
