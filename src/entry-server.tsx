import { renderToStaticMarkup } from 'react-dom/server'
import App from './App.tsx'

export function render(): string {
  return renderToStaticMarkup(<App />)
}
