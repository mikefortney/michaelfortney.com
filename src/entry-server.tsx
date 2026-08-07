import { renderToStaticMarkup } from 'react-dom/server'
import { pages } from './pages'

export type RenderedPage = {
  outFile: string
  title: string
  description: string
  canonical: string
  markup: string
}

export function renderAll(): RenderedPage[] {
  return pages.map(({ Component, ...meta }) => ({
    ...meta,
    markup: renderToStaticMarkup(<Component />),
  }))
}
