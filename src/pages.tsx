import type { ReactNode } from 'react'
import App from './App'
import CaseStudyLaNeuro from './CaseStudyLaNeuro'

export type PageDef = {
  /** Path within dist/, e.g. 'index.html' or 'work/la-neurosciences/index.html' */
  outFile: string
  title: string
  description: string
  canonical: string
  /** Whether this page is listed in sitemap.xml. Required so that adding a
   *  page forces an explicit decision about whether search engines see it. */
  sitemap: boolean
  Component: () => ReactNode
}

export const pages: PageDef[] = [
  {
    outFile: 'index.html',
    title: 'Michael Fortney | Senior Frontend Engineer, Contract',
    description:
      'Senior frontend engineer available for contract work. React, TypeScript, and Next.js. Design systems, accessibility compliance, and safe delivery in live production systems.',
    canonical: 'https://michaelfortney.com/',
    sitemap: true,
    Component: App,
  },
  {
    outFile: 'work/la-neurosciences/index.html',
    title: 'Los Angeles Neurosciences | Michael Fortney',
    description:
      'A neurology practice site rebuilt on Next.js and Sanity, with WCAG 2.2 AA accessibility built in from the start and an automated gate that keeps it there.',
    canonical: 'https://michaelfortney.com/work/la-neurosciences',
    sitemap: true,
    Component: CaseStudyLaNeuro,
  },
]
