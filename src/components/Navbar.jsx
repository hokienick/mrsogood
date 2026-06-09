import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const spring = { type: 'spring', stiffness: 400, damping: 30 }

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const onDark = pathname === '/' && !scrolled

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          onDark ? 'bg-transparent' : 'bg-cream/95 backdrop-blur-sm border-b border-ink/8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">

          {/* Logo */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={spring}>
            <Link to="/" className={`font-display text-xl tracking-tight transition-colors ${onDark ? 'text-cream' : 'text-ink'}`}>
              mr.<span className="text-coral">so</span>good
            </Link>
          </motion.div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[['Work', '/work'], ['Pricing', '/pricing'], ['About', '/#about']].map(([label, href], i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <Link
                  to={href}
                  className={`nav-link font-body text-base font-medium transition-colors cursor-pointer ${
                    onDark ? 'text-cream/70 hover:text-cream' : 'text-ink/60 hover:text-ink'
                  }`}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55, duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <Link
                to="/#contact"
                className="btn-shimmer font-body text-base font-semibold bg-coral text-cream px-5 py-2.5 rounded-full cursor-pointer block"
              >
                Free Mockup
              </Link>
            </motion.div>
          </nav>

          {/* Hamburger */}
          <motion.button
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            className={`md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 cursor-pointer ${onDark ? 'text-cream' : 'text-ink'}`}
            whileTap={{ scale: 0.9 }}
            transition={spring}
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 6.5 : 0 }}
              transition={spring}
              className="block h-[1.5px] w-6 bg-current origin-center"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
              transition={spring}
              className="block h-[1.5px] w-4 bg-current"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -6.5 : 0 }}
              transition={spring}
              className="block h-[1.5px] w-6 bg-current origin-center"
            />
          </motion.button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.nav
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              className="md:hidden bg-cream border-t border-ink/8 overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-5">
                {[['Work', '/work'], ['Pricing', '/pricing'], ['About', '/#about']].map(([label, href], i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                  >
                    <Link to={href} className="font-body font-medium text-ink/80 hover:text-coral transition-colors cursor-pointer">
                      {label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.25 }}
                >
                  <Link to="/#contact" className="btn-shimmer font-body font-semibold bg-coral text-cream px-5 py-3 rounded-full text-center cursor-pointer block">
                    Free Mockup
                  </Link>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
