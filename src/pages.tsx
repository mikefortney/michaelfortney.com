import type { ReactNode } from 'react'
import App from './App'

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
]
