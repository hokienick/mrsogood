'use client'
import { useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

const BEFORE_FILTER = 'saturate(0.55) contrast(0.85) brightness(0.95) sepia(0.08)'
const BEFORE_WIPE_FILTER = 'saturate(0.4) contrast(0.78) brightness(0.72)'

const NOISE_BG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

function TrafficLights() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
      <div className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
      <div className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
    </div>
  )
}

function ChromeBar({ beforeImages }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-[#EDEAE5] rounded-t-[calc(1.25rem-0.375rem)] border-b border-black/5">
      <TrafficLights />
      <div className="flex-1 mx-3 min-w-0">
        <div className="bg-white/60 rounded-full px-3 py-1 flex items-center gap-2 max-w-[300px]">
          <svg
            className="w-3 h-3 flex-shrink-0"
            style={{ color: 'rgba(26,20,16,0.3)' }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="font-body text-xs truncate" style={{ color: 'rgba(26,20,16,0.32)' }}>
            original website
          </span>
        </div>
      </div>
    </div>
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const p = projects.find(x => x.slug === slug)

  // GSAP refs — desktop-only sections
  const beforeOuterRef = useRef(null)
  const screenshotInnerRef = useRef(null)
  const wipeOuterRef = useRef(null)
  const afterPanelRef = useRef(null)
  const wipeEdgeRef = useRef(null)
  const afterBtnRef = useRef(null)
  const afterLabelRef = useRef(null)

  useEffect(() => {
    if (!p) return
    // Only run GSAP on real desktop — check in useEffect where window is accurate
    if (window.innerWidth < 768) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // ── Before: screenshot slides up inside the browser chrome ──
      if (screenshotInnerRef.current && beforeOuterRef.current) {
        gsap.to(screenshotInnerRef.current, {
          y: '-40%',
          ease: 'none',
          scrollTrigger: {
            trigger: beforeOuterRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
          },
        })
      }

      // ── Wipe: clip-path reveals the after panel ──
      if (afterPanelRef.current && wipeOuterRef.current) {
        gsap.set(afterBtnRef.current, { opacity: 0, scale: 0.86 })
        gsap.set(afterLabelRef.current, { opacity: 0 })

        const wipeTl = gsap.timeline({
          scrollTrigger: {
            trigger: wipeOuterRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
          },
        })

        wipeTl
          .fromTo(
            afterPanelRef.current,
            { clipPath: 'inset(0 100% 0 0)' },
            { clipPath: 'inset(0 0% 0 0)', ease: 'power1.inOut', duration: 0.72 }
          )
          .fromTo(
            wipeEdgeRef.current,
            { left: '0%', opacity: 1 },
            { left: '100%', ease: 'power1.inOut', duration: 0.72 },
            '<'
          )
          .to(wipeEdgeRef.current, { opacity: 0, duration: 0.06 }, 0.72)
          .to(
            afterBtnRef.current,
            { opacity: 1, scale: 1, ease: 'power3.out', duration: 0.32 },
            0.74
          )
          .to(afterLabelRef.current, { opacity: 1, duration: 0.2 }, 0.76)
      }
    })

    return () => ctx.revert()
  }, [p])

  if (!p) {
    return (
      <div className="min-h-screen bg-chalk flex items-center justify-center px-6">
        <div>
          <h1 className="display text-[4rem] text-ink mb-4 leading-none">Not found.</h1>
          <Link href="/work" className="font-body text-coral font-semibold cursor-pointer">
            ← Back to Work
          </Link>
        </div>
      </div>
    )
  }

  const afterGradient = `linear-gradient(155deg, ${p.color} 0%, ${p.accent ?? p.color} 100%)`

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative bg-chalk" style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>

        {/* Full-bleed before screenshot — upper 60% of the viewport */}
        <motion.div
          className="relative overflow-hidden w-full flex-shrink-0"
          style={{ height: '60vh' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <img
            src={p.beforeImages[0].src}
            alt={`${p.name} — before redesign`}
            className="w-full h-full object-cover object-top"
            style={{ filter: BEFORE_FILTER }}
          />
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
            style={{ background: 'linear-gradient(to bottom, rgba(26,20,16,0.05) 0%, rgba(26,20,16,0.4) 100%)' }}
          />
          {/* Paper tear PNG — sits over bottom of the image */}
          <img
            src="/torn-edge_top.png"
            alt=""
            aria-hidden="true"
            className="absolute bottom-0 left-0 w-full pointer-events-none select-none"
            style={{ display: 'block', zIndex: 2, objectFit: 'fill', height: 80 }}
          />
        </motion.div>

        {/* Chalk title card — anchored to bottom of remaining viewport space */}
        <div className="relative z-10 flex flex-col justify-end flex-1 px-6 md:px-10 pb-12 md:pb-16">
          <div className="max-w-6xl mx-auto w-full">

            <motion.h1
              className="display text-ink"
              style={{
                fontSize: 'clamp(3.5rem, 9.5vw, 9rem)',
                letterSpacing: '-0.04em',
                lineHeight: 0.92,
                textWrap: 'balance',
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
            >
              {p.name}
            </motion.h1>

            {/* Coral rule */}
            <motion.div
              className="mt-6"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.52, ease: [0.25, 0.4, 0.25, 1] }}
              style={{ originX: 0 }}
            >
              <div style={{ width: 40, height: 1.5, background: '#E86B3A', borderRadius: 2 }} />
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="font-body mt-5 leading-relaxed max-w-[52ch]"
              style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', color: 'rgba(26,20,16,0.52)' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.62, ease: [0.25, 0.4, 0.25, 1] }}
            >
              {p.tagline}
            </motion.p>

          </div>
        </div>
      </section>

      {/* ── BEFORE: mobile (static scrollable chrome) ─────── */}
      <section className="md:hidden bg-[#1A1410] px-4 py-12">
        <div className="flex items-center gap-4 mb-5 px-2">
          <div className="w-8 h-px" style={{ background: 'rgba(255,255,255,0.18)' }} />
          <p className="font-body text-[11px] uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.28)' }}>
            The original site
          </p>
        </div>
        <div
          className="p-1.5 rounded-[1.25rem]"
          style={{
            background: '#E8E4DE',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            outline: '1px solid rgba(0,0,0,0.08)',
          }}
        >
          <ChromeBar beforeImages={p.beforeImages} />
          <div className="rounded-b-[calc(1.25rem-0.375rem)] overflow-hidden" style={{ maxHeight: '65vh', overflowY: 'auto' }}>
            {p.beforeImages.map((img) => (
              <img key={img.src} src={img.src} alt={`${p.name} original site`} className="w-full h-auto block" style={{ filter: BEFORE_FILTER }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE: desktop (GSAP scroll-pinned screenshot) ── */}
      <section
        ref={beforeOuterRef}
        className="relative hidden md:block"
        style={{ background: '#1A1410', minHeight: '240vh' }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center px-6 md:px-10 py-10">
          <div className="w-full max-w-5xl">
            {/* Label */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-px" style={{ background: 'rgba(255,255,255,0.18)' }} />
              <p className="font-body text-[11px] uppercase tracking-[0.22em]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                The original site
              </p>
            </div>

            {/* Double-bezel browser chrome */}
            <div
              className="p-1.5 rounded-[1.25rem]"
              style={{
                background: '#E8E4DE',
                boxShadow: '0 28px 90px rgba(0,0,0,0.55)',
                outline: '1px solid rgba(0,0,0,0.08)',
              }}
            >
              <ChromeBar beforeImages={p.beforeImages} />

              {/* Screenshot viewport — fixed height, GSAP moves content up */}
              <div
                className="rounded-b-[calc(1.25rem-0.375rem)] overflow-hidden relative bg-white"
                style={{ height: '67vh' }}
              >
                <div ref={screenshotInnerRef} className="will-change-transform">
                  {p.beforeImages.map((img) => (
                    <img
                      key={img.src}
                      src={img.src}
                      alt={`${p.name} original site`}
                      className="w-full h-auto block"
                      style={{ filter: BEFORE_FILTER }}
                      loading="eager"
                    />
                  ))}
                </div>
                {/* Vignette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  aria-hidden="true"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 30%, transparent 48%, rgba(26,20,16,0.4) 100%)',
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                  aria-hidden="true"
                  style={{ background: 'linear-gradient(to bottom, transparent, rgba(26,20,16,0.16))' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WIPE: mobile (stacked gradient section) ───────── */}
      <section className="md:hidden bg-ink px-4 py-12">
        <div className="flex items-center gap-4 mb-8 px-2">
          <div className="w-8 h-px bg-coral/50" />
          <p className="font-body text-[11px] text-coral uppercase tracking-[0.2em]">The redesign</p>
        </div>
        <div
          className="rounded-2xl relative overflow-hidden flex items-center justify-center"
          style={{ minHeight: '300px', background: afterGradient }}
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ backgroundImage: NOISE_BG, opacity: 0.05 }} />
          <div className="relative text-center px-8">
            {p.afterUrl ? (
              <a
                href={p.afterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-chalk text-ink font-body font-semibold text-sm px-6 py-3.5 rounded-full cursor-pointer"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.28)' }}
              >
                <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                View Live Site
                <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(26,20,16,0.08)' }}>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </a>
            ) : (
              <p className="font-body text-sm text-white/45">Staging link coming soon</p>
            )}
          </div>
        </div>
      </section>

      {/* ── WIPE: desktop (GSAP clip-path reveal) ─────────── */}
      <section
        ref={wipeOuterRef}
        className="relative hidden md:block"
        style={{ minHeight: '190vh' }}
      >
        <div className="sticky top-0 h-screen relative">
          {/* Before panel — filtered full-bleed */}
          <div className="absolute inset-0">
            <img
              src={p.beforeImages[0].src}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover object-top"
              style={{ filter: BEFORE_WIPE_FILTER }}
            />
            <div className="absolute inset-0" style={{ background: 'rgba(26,20,16,0.45)' }} />
            <div className="absolute top-7 left-8">
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.28)' }}>
                Before
              </p>
            </div>
          </div>

          {/* After panel — clips in from right */}
          <div
            ref={afterPanelRef}
            className="absolute inset-0 flex items-center justify-center"
            style={{ clipPath: 'inset(0 100% 0 0)', background: afterGradient }}
          >
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ backgroundImage: NOISE_BG, opacity: 0.05 }} />

            {/* After corner label — fades in via GSAP */}
            <div ref={afterLabelRef} className="absolute top-7 right-8" style={{ opacity: 0 }}>
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
                After
              </p>
            </div>

            {/* CTA */}
            <div className="relative text-center">
              {p.afterUrl ? (
                <a
                  ref={afterBtnRef}
                  href={p.afterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-chalk text-ink font-body font-semibold text-base px-7 py-4 rounded-full cursor-pointer"
                  style={{
                    boxShadow: '0 10px 50px rgba(0,0,0,0.3)',
                    transition: 'transform 220ms cubic-bezier(0.16,1,0.3,1), box-shadow 200ms ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.04)'
                    e.currentTarget.style.boxShadow = '0 18px 70px rgba(0,0,0,0.4)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = '0 10px 50px rgba(0,0,0,0.3)'
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                  View Live Site
                  <span className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(26,20,16,0.08)' }}>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </a>
              ) : (
                <p ref={afterBtnRef} className="font-body text-base text-white/45">
                  Staging link coming soon.
                </p>
              )}
            </div>
          </div>

          {/* Coral wipe edge — travels left to right via GSAP */}
          <div
            ref={wipeEdgeRef}
            className="absolute top-0 bottom-0 pointer-events-none"
            aria-hidden="true"
            style={{
              left: '0%',
              width: '2px',
              background: '#E86B3A',
              boxShadow: '0 0 22px rgba(232,107,58,0.7)',
            }}
          />
        </div>
      </section>

      {/* ── THE STORY ─────────────────────────────────────── */}
      <section className="bg-chalk px-6 md:px-10 py-28 md:py-36">
        <div className="max-w-6xl mx-auto">

          {/* Beat 1: Why — left-aligned */}
          <motion.div
            className="max-w-[56ch]"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="w-10 h-px bg-coral/55 mb-6" />
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-coral mb-5">
              Why this one
            </p>
            <p className="font-body text-lg text-ink/65 leading-relaxed">{p.why}</p>
          </motion.div>

          {/* Beat 2: Vision — right-aligned */}
          <motion.div
            className="max-w-[52ch] md:ml-auto mt-20 md:mt-28"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="w-10 h-px bg-coral/55 mb-6" />
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-coral mb-5">
              What I wanted to bring
            </p>
            <p className="font-body text-lg text-ink/65 leading-relaxed">{p.vision}</p>
          </motion.div>

          {/* Beat 3: Outcome — full width, display-size pullquote */}
          <motion.div
            className="mt-20 md:mt-28"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="w-10 h-px bg-coral/55 mb-6" />
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-coral mb-8">
              The result
            </p>
            <p
              className="display text-ink leading-[1.12] max-w-[24ch]"
              style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', letterSpacing: '-0.03em' }}
            >
              {p.outcome}
            </p>
          </motion.div>

        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="bg-ink noise-overlay px-6 md:px-10 py-28 md:py-36">
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <p className="font-body text-base text-chalk/40 mb-6 leading-relaxed">
              Every one of them looked better within 24 hours.
            </p>
            <h2
              className="display text-coral leading-none mb-14"
              style={{ fontSize: 'clamp(3.5rem,8vw,7rem)', letterSpacing: '-0.04em' }}
            >
              Your turn.
            </h2>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 bg-coral text-chalk font-body font-semibold text-base px-8 py-4 rounded-full btn-shimmer cursor-pointer"
              style={{
                boxShadow: '0 8px 40px rgba(232,107,58,0.35)',
                transition: 'transform 220ms cubic-bezier(0.16,1,0.3,1), box-shadow 200ms ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.03)'
                e.currentTarget.style.boxShadow = '0 16px 60px rgba(232,107,58,0.45)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 8px 40px rgba(232,107,58,0.35)'
              }}
            >
              Get My Free Mockup
              <span className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(247,246,243,0.12)' }}>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
