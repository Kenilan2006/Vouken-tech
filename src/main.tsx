import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { ToastProvider } from './components/ToastProvider'
import AppErrorBoundary from './components/AppErrorBoundary'
import './styles/main.css'

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // BASE_URL keeps the worker scope correct when the site is served from a
    // subpath (for example a GitHub Pages project site at /Vouken-tech/).
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}service-worker.js`).catch(() => {
      /* Offline caching is optional; the site works without a service worker. */
    })
  })
}

createRoot(document.getElementById('root')!).render(<AppErrorBoundary><StrictMode><HashRouter><ToastProvider><App /></ToastProvider></HashRouter></StrictMode></AppErrorBoundary>)
