'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    num: '01',
    title: 'Fill out the form',
    body: 'Tell me about your business and drop your current website URL. Two minutes.',
  },
  {
    num: '02',
    title: 'I review your site',
    body: 'I dig into what you have: the good, the bad, and the opportunity.',
  },
  {
    num: '03',
    title: 'Full redesign built overnight',
    body: 'Your palette, your vibe, modernized from the ground up.',
  },
  {
    num: '04',
    title: 'Preview link in your inbox',
    body: 'A live staging link lands within 24 hours. See exactly what it looks like.',
  },
  {
    num: '05',
    title: 'Love it? We make it official.',
    body: "If you're in, we launch. If not, no hard feelings, seriously.",
    isFinal: true,
  },
]

export default function ProcessSection() {
  const outerRef    = useRef(null)
  const progressRef = useRef(null)
  const nudgeRef    = useRef(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    setIsDesktop(mq.matches)
    const handler = (e) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // One ref object per step: { row, ghost }
  const stepRefs = useRef(STEPS.map(() => ({ row: null, ghost: null })))

  useEffect(() => {
    if (!isDesktop) return
    const ctx = gsap.context(() => {
      // ── Initial state: step 1 active, all others dimmed ──
      STEPS.forEach((_, i) => {
        const { row, ghost } = stepRefs.current[i]
        gsap.set(row,   { opacity: i === 0 ? 1 : 0.13 })
        gsap.set(ghost, { scale:   i === 0 ? 1.35 : 1, opacity: i === 0 ? 0.13 : 0.045 })
      })

      // ── Master timeline scrubbed to outer section scroll ──
      // Nudge indicator: fade in when section enters, fade out once scrolling starts
      if (nudgeRef.current) {
        gsap.set(nudgeRef.current, { opacity: 0, y: 8 })
        ScrollTrigger.create({
          trigger: outerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          onEnter: () => {
            gsap.to(nudgeRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.4 })
          },
          onUpdate: (self) => {
            // Fade out once user has scrolled 12% into the section
            if (self.progress > 0.12) {
              gsap.to(nudgeRef.current, { opacity: 0, y: -8, duration: 0.35, ease: 'power2.in', overwrite: true })
            }
            if (progressRef.current) {
              gsap.set(progressRef.current, { scaleY: self.progress })
            }
          },
          onLeaveBack: () => {
            gsap.to(nudgeRef.current, { opacity: 0, y: 8, duration: 0.25, ease: 'power2.in' })
          },
        })
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: 'top top',
          end:   'bottom bottom',
          scrub: 1.2,
          onUpdate: (self) => {
            if (progressRef.current) {
              gsap.set(progressRef.current, { scaleY: self.progress })
            }
          },
        },
      })

      // Each transition occupies 1/(N-1) of the timeline
      const N = STEPS.length
      STEPS.forEach((_, i) => {
        if (i === N - 1) return
        const at = i / (N - 1)          // position in timeline (0–1)
        const { row: rowA, ghost: ghostA } = stepRefs.current[i]
        const { row: rowB, ghost: ghostB } = stepRefs.current[i + 1]

        tl.to(rowA,   { opacity: 0.13, duration: 0.18 }, at + 0.04)
        tl.to(ghostA, { scale: 1,    opacity: 0.045, duration: 0.18 }, at + 0.04)
        tl.to(rowB,   { opacity: 1,   duration: 0.18 }, at + 0.04)
        tl.to(ghostB, { scale: 1.35, opacity: 0.13,  duration: 0.18 }, at + 0.04)
      })
    }, outerRef)

    return () => ctx.revert()
  }, [isDesktop])

  // ── Mobile layout: plain stacked list, no GSAP ──
  if (!isDesktop) {
    return (
      <section className="bg-chalk px-6 py-20">
        <div className="max-w-lg mx-auto">
          <h2 className="display text-[clamp(2.5rem,8vw,4rem)] text-ink leading-none mb-4">
            A new website<br />in your inbox.<br />
            <span className="text-coral">Tomorrow.</span>
          </h2>
          <p className="font-body text-sm text-ink/40 mb-12">5 steps · Under 24 hours to preview</p>

          <div className="space-y-0">
            {STEPS.map((step) => {
              if (step.isFinal) {
                return (
                  <div key={step.num} className="mt-4 bg-coral rounded-2xl px-6 py-8 relative overflow-hidden">
                    <span className="pointer-events-none select-none absolute right-4 top-1/2 -translate-y-1/2 display leading-none text-[5rem] text-chalk/10" aria-hidden="true">05</span>
                    <div className="relative">
                      <span className="font-body text-sm font-semibold text-chalk/55 block mb-2">05</span>
                      <p className="display text-[clamp(1.6rem,5vw,2.2rem)] text-chalk leading-tight mb-3">{step.title}</p>
                      <p className="font-body text-base text-chalk/75 leading-relaxed mb-6">{step.body}</p>
                      <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 bg-chalk text-ink font-body font-semibold px-6 py-3 rounded-full text-sm cursor-pointer hover:bg-white transition-colors duration-200"
                      >
                        Get My Free Mockup →
                      </Link>
                    </div>
                  </div>
                )
              }
              return (
                <div key={step.num} className="relative flex gap-5 py-6 border-b border-ink/8">
                  <span className="font-body text-sm font-semibold text-coral pt-0.5 w-8 flex-shrink-0 tabular-nums">{step.num}</span>
                  <div>
                    <p className="font-body font-bold text-lg text-ink mb-1 leading-snug">{step.title}</p>
                    <p className="font-body text-base text-ink/55 leading-relaxed">{step.body}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  return (
    // Outer div provides the scroll real-estate (300vh)
    <section ref={outerRef} className="relative bg-chalk" style={{ minHeight: '300vh' }}>

      {/* Sticky viewport-height container */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden px-6 md:px-10">

        {/* Scroll nudge — bottom center, fades in on enter, out once scrolling */}
        <div
          ref={nudgeRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          aria-hidden="true"
        >
          {/* Scroll wheel */}
          <div className="w-6 h-9 rounded-full border-2 border-ink/25 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-coral" style={{
              animation: 'scrollDot 1.5s ease-in-out infinite'
            }} />
          </div>
          <span className="font-body text-[10px] uppercase tracking-[0.2em] text-ink/35">scroll</span>
        </div>
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-20 items-center">

            {/* ── LEFT: headline + scroll progress bar ── */}
            <div className="relative">
              <h2 className="display text-[clamp(2.5rem,5vw,5.5rem)] text-ink leading-none">
                A new website<br />in your inbox.<br />
                <span className="text-coral">Tomorrow.</span>
              </h2>

              <div className="mt-10 flex items-start gap-4">
                {/* Progress spine */}
                <div className="relative flex-shrink-0 mt-1">
                  <div className="w-px h-16 bg-ink/10 rounded-full" />
                  <div
                    ref={progressRef}
                    className="absolute top-0 left-0 w-px h-16 bg-coral rounded-full origin-top"
                    style={{ scaleY: 0 }}
                  />
                </div>
                <div>
                  <p className="font-body text-base font-semibold text-ink/70">
                    5 steps &nbsp;·&nbsp; Under 24 hours to preview
                  </p>
                  <p className="font-body text-sm text-ink/40 mt-1">Scroll to walk through it</p>
                </div>
              </div>
            </div>

            {/* ── RIGHT: step rows ── */}
            <div>
              {STEPS.map((step, i) => {
                if (step.isFinal) {
                  return (
                    <div
                      key={step.num}
                      ref={el => { stepRefs.current[i].row = el }}
                      className="mt-3 bg-coral rounded-2xl px-8 py-8 relative overflow-hidden"
                    >
                      <span
                        ref={el => { stepRefs.current[i].ghost = el }}
                        className="pointer-events-none select-none absolute right-4 top-1/2 -translate-y-1/2 display leading-none text-[6rem] text-chalk/10"
                        aria-hidden="true"
                      >05</span>
                      <div className="relative">
                        <span className="font-body text-sm font-semibold text-chalk/55 block mb-3">05</span>
                        <p className="display text-[clamp(1.6rem,3vw,2.2rem)] text-chalk leading-tight mb-3">
                          {step.title}
                        </p>
                        <p className="font-body text-base text-chalk/75 leading-relaxed mb-6">
                          {step.body}
                        </p>
                        <Link
                          href="/#contact"
                          className="inline-flex items-center gap-2 bg-chalk text-ink font-body font-semibold px-6 py-3 rounded-full text-sm cursor-pointer hover:bg-white transition-colors duration-200"
                        >
                          Get My Free Mockup →
                        </Link>
                      </div>
                    </div>
                  )
                }

                return (
                  <div
                    key={step.num}
                    ref={el => { stepRefs.current[i].row = el }}
                    className="relative flex gap-6 py-7 border-b border-ink/8 overflow-hidden"
                  >
                    {/* Ghost number watermark — scales up when active */}
                    <span
                      ref={el => { stepRefs.current[i].ghost = el }}
                      className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 display leading-none text-[6rem] text-ink/[0.05] origin-right"
                      aria-hidden="true"
                    >{step.num}</span>

                    {/* Step number */}
                    <span className="font-body text-sm font-semibold text-coral pt-0.5 w-8 flex-shrink-0 tabular-nums">
                      {step.num}
                    </span>

                    {/* Content */}
                    <div className="relative">
                      <p className="font-body font-bold text-xl text-ink mb-2 leading-snug">{step.title}</p>
                      <p className="font-body text-base text-ink/55 leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
