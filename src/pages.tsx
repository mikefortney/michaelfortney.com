import type { ReactNode } from 'react'
import App from './App'
import CaseStudyLaNeuro from './CaseStudyLaNeuro'

export type PageDef = {
  /** Path within dist/, e.g. 'index.html' or 'work/la-neurosciences/index.html' */
  outFile: string
  title: string
  description: string
  canonical: string
  Component: () => ReactNode
}

export const pages: PageDef[] = [
  {
    outFile: 'index.html',
    title: 'Michael Fortney | Senior Frontend Engineer, Contract',
    description:
      'Senior frontend engineer available for contract work. React, TypeScript, and Next.js. Design systems, accessibility compliance, and safe delivery in live production systems.',
    canonical: 'https://www.michaelfortney.com/',
    Component: App,
  },
  {
    outFile: 'work/la-neurosciences/index.html',
    title: 'Los Angeles Neurosciences | Michael Fortney',
    description:
      'A neurology practice site rebuilt on Next.js and Sanity, with WCAG 2.2 AA accessibility built in from the start and an automated gate that keeps it there.',
    canonical: 'https://www.michaelfortney.com/work/la-neurosciences',
    Component: CaseStudyLaNeuro,
  },
]
