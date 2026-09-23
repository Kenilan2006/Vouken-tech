import type { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import ScrollProgress from './ScrollProgress'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background text-ink">
      <ScrollProgress />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-50 focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </div>
  )
}

