import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LenisProvider from './components/LenisProvider'
import Home from './pages/Home'
import Work from './pages/Work'
import CaseStudy from './pages/CaseStudy'
import Pricing from './pages/Pricing'

function ScrollReset() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const scrollToTarget = () => {
        const target = document.querySelector(hash)
        if (target) target.scrollIntoView({ behavior: 'smooth' })
      }

      scrollToTarget()
      const timeout = window.setTimeout(scrollToTarget, 150)
      return () => window.clearTimeout(timeout)
    }

    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <LenisProvider>
      <ScrollReset />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/get-a-mockup" element={<Navigate to="/#contact" replace />} />
        </Routes>
      </main>
      <Footer />
    </LenisProvider>
  )
}
