'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import ContactForm from '../components/ContactForm'
import BrowserChrome from '../components/BrowserChrome'
import WorksGallery from '../components/WorksGallery'
import ProcessSection from '../components/ProcessSection'
import { projects } from '../data/projects'

/* ── Spring config ── */
const spring = { type: 'spring', stiffness: 400, damping: 17 }

/* Transform-only entrance: content stays visible even if JS animation never runs */
const riseUp = {
  hidden: { y: 40 },
  visible: (i = 0) => ({
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }
  }),
}

/* ── Before / After floating mockup ── */
function BeforeAfterMockup() {
  const BEFORE = '/before-kenclub.jpg'
  const AFTER  = '/after-kenclub.jpg'
  const ease = [0.16, 1, 0.3, 1]
  const IMG_H = 230

  // Card heights: chrome ~34px + image + label ~30px = ~274px each
  // Gap between cards: 48px (connector lives here)
  // Total container: 274 + 48 + 274 = 596 → 600px

  return (
    <div className="relative w-full" style={{ height: 720 }}>

      {/* BEFORE: left-anchored, tilts -3deg, slides in from left */}
      <motion.div
        className="absolute left-3 top-0 rounded-xl overflow-hidden border border-white/10"
        style={{ rotate: -3, width: '88%', boxShadow: '0 8px 40px rgba(0,0,0,0.55)', zIndex: 10 }}
        initial={{ x: -60 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.15, duration: 1.3, ease }}
      >
        <BrowserChrome url="thekenclub.com" colored={false} />
        <img
          src={BEFORE} alt="Before redesign"
          className="w-full object-cover object-top"
          style={{ height: IMG_H }}
          onError={e => { e.target.style.display = 'none' }}
        />
        <div className="bg-white/8 border-t border-white/12 px-4 py-2.5 flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-white/50 flex-shrink-0" />
          <span className="font-body text-base font-bold uppercase tracking-[0.2em] text-white/70">Before Redesign</span>
        </div>
      </motion.div>

      {/* Connector: vertical arrow in the gap, springs in after cards land */}
      <motion.div
        className="absolute flex flex-col items-center"
        style={{ left: '44%', top: 296, zIndex: 30 }}
        initial={{ scale: 0.3 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.1, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div className="w-px h-10 bg-coral/25" />
        <div className="bg-coral rounded-full w-8 h-8 flex items-center justify-center shadow-lg shadow-coral/30 my-2.5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
        <div className="w-px h-10 bg-coral/25" />
      </motion.div>

      {/* AFTER: right-anchored, tilts +3deg, slides in from right */}
      <motion.div
        className="absolute right-0 rounded-xl overflow-hidden border border-white/15"
        style={{ rotate: 3, top: 420, width: '88%', boxShadow: '0 16px 48px rgba(0,0,0,0.65)', zIndex: 20 }}
        initial={{ x: 60 }}
        animate={{ x: 0 }}
        transition={{ duration: 1.3, ease }}
      >
        <BrowserChrome url="mrsogood.com/work/the-ken-club" colored={true} />
        <img
          src={AFTER} alt="After redesign"
          className="w-full object-cover object-top"
          style={{ height: IMG_H }}
          onError={e => { e.target.style.display = 'none' }}
        />
        <div className="bg-coral/20 border-t border-coral/35 px-4 py-2.5 flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-coral flex-shrink-0" />
          <span className="font-body text-base font-bold uppercase tracking-[0.2em] text-coral">After Redesign</span>
        </div>
      </motion.div>

      {/* Soft glow in the gap */}
      <div className="absolute left-1/2 -translate-x-1/2 w-40 h-32 rounded-full bg-coral/6 blur-[50px] pointer-events-none" style={{ top: 288 }} />
    </div>
  )
}

/* ── Mobile before/after: static flow, visible by default, thumb-friendly ── */
function MobileBeforeAfter() {
  const IMG_H = 170
  return (
    <div className="lg:hidden mt-14" aria-label="Before and after redesign comparison">

      {/* BEFORE */}
      <div className="relative w-[94%] rotate-[-1.25deg] rounded-xl overflow-hidden border border-white/10" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
        <BrowserChrome url="thekenclub.com" colored={false} />
        <img
          src="/before-kenclub.jpg" alt="The Ken Club website before redesign"
          className="w-full object-cover object-top"
          style={{ height: IMG_H }}
          loading="lazy"
          onError={e => { e.target.style.display = 'none' }}
        />
        <div className="bg-white/8 border-t border-white/12 px-4 py-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white/50 flex-shrink-0" />
          <span className="font-body text-sm font-bold uppercase tracking-[0.18em] text-white/70">Before</span>
        </div>
      </div>

      {/* Connector arrow */}
      <div className="flex justify-center py-3" aria-hidden="true">
        <div className="bg-coral rounded-full w-7 h-7 flex items-center justify-center shadow-lg shadow-coral/30">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </div>

      {/* AFTER */}
      <div className="relative w-[94%] ml-auto rotate-[1.25deg] rounded-xl overflow-hidden border border-white/15" style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.6)' }}>
        <BrowserChrome url="mrsogood.com/work/the-ken-club" colored={true} />
        <img
          src="/after-kenclub.jpg" alt="The Ken Club website after Mr. So Good redesign"
          className="w-full object-cover object-top"
          style={{ height: IMG_H }}
          loading="lazy"
          onError={e => { e.target.style.display = 'none' }}
        />
        <div className="bg-coral/20 border-t border-coral/35 px-4 py-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-coral flex-shrink-0" />
          <span className="font-body text-sm font-bold uppercase tracking-[0.18em] text-coral">After</span>
        </div>
      </div>
    </div>
  )
}

/* ── Marquee strip ── */
function Marquee() {
  const items = ['Free Mockup', '24hr Turnaround', 'No Obligation', 'Small Business Specialist', 'Redesigns & New Builds', 'US-Based']
  return (
    <div className="bg-coral overflow-hidden py-3 select-none">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="font-display text-chalk text-base tracking-widest mx-6 uppercase">
            {item} <span className="text-chalk/70 mx-3">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const heroRef    = useRef(null)
  const pricingRef = useRef(null)
  const contactRef = useRef(null)

  const { scrollYProgress: heroScroll }    = useScroll({ target: heroRef,    offset: ['start start', 'end start'] })
  const { scrollYProgress: pricingScroll } = useScroll({ target: pricingRef, offset: ['start end', 'end start'] })
  const { scrollYProgress: contactScroll } = useScroll({ target: contactRef, offset: ['start end', 'end start'] })

  const heroBlobY    = useTransform(heroScroll,    [0, 1], [0, -50])
  const pricingBlobY = useTransform(pricingScroll, [0, 1], [30, -30])
  const contactBlobY = useTransform(contactScroll, [0, 1], [30, -30])

  return (
    <>
      {/* ════ HERO ════ */}
      <section ref={heroRef} className="relative bg-ink min-h-screen flex items-center overflow-hidden">

        <motion.div
          className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-coral/8 blur-[120px] pointer-events-none"
          style={{ y: heroBlobY }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 pt-28 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-10 items-start">

          {/* ── LEFT: Text column ── */}
          <div>
            {/* Pulsing dot badge */}
            <motion.div
              variants={riseUp} initial="hidden" animate="visible" custom={0}
              className="inline-flex items-center gap-2.5 bg-chalk/5 border border-chalk/10 text-chalk/60 px-4 py-2 rounded-full text-sm font-body mb-10"
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-coral flex-shrink-0"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Taking new projects · Free mockup in 24hrs
            </motion.div>

            {/* Headline */}
            <h1 className="sr-only">Small Business Web Design</h1>
            <div className="mb-1">
              <motion.p
                className="display text-[clamp(3rem,6vw,6.5rem)] text-chalk leading-[0.9]"
                variants={riseUp} initial="hidden" animate="visible" custom={1}
              >
                You didn't know
              </motion.p>
            </div>
            <div className="mb-1">
              <motion.p
                className="display text-[clamp(3rem,6vw,6.5rem)] text-chalk leading-[0.9]"
                variants={riseUp} initial="hidden" animate="visible" custom={2}
              >
                your website could look
              </motion.p>
            </div>
            <div className="mb-10 pb-2">
              <motion.p
                className="display-italic text-[clamp(3rem,6vw,6.5rem)] text-coral leading-[0.9]"
                variants={riseUp} initial="hidden" animate="visible" custom={3}
              >
                so good.
              </motion.p>
            </div>

            {/* Divider + subtext */}
            <motion.div
              variants={riseUp} initial="hidden" animate="visible" custom={4}
              className="border-t border-chalk/10 pt-8 mb-8"
            >
              <p className="font-body text-chalk/70 text-lg leading-relaxed">
                Redesigns & new builds for small businesses.<br />
                Free mockup in 24 hours, no strings attached.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={riseUp} initial="hidden" animate="visible" custom={5}
              className="flex flex-col sm:flex-row gap-3"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={spring}>
                <Link
                  href="/#contact"
                  className="btn-shimmer block bg-coral text-chalk font-body font-semibold px-7 py-4 rounded-full text-base text-center whitespace-nowrap"
                >
                  Get My Free Mockup →
                </Link>
              </motion.div>
              <motion.a
                href="#work"
                className="font-body font-medium text-chalk/70 hover:text-chalk px-7 py-4 rounded-full text-base text-center border border-chalk/20 hover:border-chalk/40 transition-colors duration-200 whitespace-nowrap"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={spring}
              >
                See the Work ↓
              </motion.a>
            </motion.div>

            {/* Social proof dots */}
            <motion.div
              variants={riseUp} initial="hidden" animate="visible" custom={6}
              className="flex items-center gap-5 mt-10"
            >
              {['Zero Risk', '24hr Delivery', 'No Contract'].map((t, i) => (
                <span key={t} className="flex items-center gap-1.5 font-body text-chalk/75 text-base">
                  <span className="w-1 h-1 rounded-full bg-coral/60" />
                  {t}
                </span>
              ))}
            </motion.div>

            {/* Mobile-only before/after proof */}
            <MobileBeforeAfter />
          </div>

          {/* ── RIGHT: Floating before/after mockup ── */}
          <div className="relative hidden lg:block pt-16">
            <BeforeAfterMockup />
          </div>
        </div>

      </section>

      {/* ════ MARQUEE ════ */}
      <Marquee />

      {/* ════ PORTFOLIO ════ */}
      <section id="work" className="bg-ink px-6 md:px-10 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14">
            <motion.div
              initial={{ y: 30 }} whileInView={{ y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <h2 className="display text-[clamp(2.5rem,5vw,5.5rem)] text-chalk leading-none">
                Small businesses,<br />reimagined.
              </h2>
              <p className="font-body text-chalk/70 text-base mt-5 max-w-md leading-relaxed">
                Real businesses, before and after. Every card opens the full case study.
              </p>
            </motion.div>
            <motion.div
              initial={{ y: 12 }} whileInView={{ y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <Link href="/work" className="nav-link font-body text-base font-semibold text-chalk/75 hover:text-chalk transition-colors cursor-pointer pb-0.5 whitespace-nowrap">
                See all work →
              </Link>
            </motion.div>
          </div>

          <WorksGallery projects={projects.filter(p => p.featured)} />
        </div>
      </section>

      {/* ════ PROCESS ════ */}
      <ProcessSection />

      {/* ════ PRICING ════ */}
      <section ref={pricingRef} className="relative overflow-hidden bg-ink px-6 md:px-10 py-24 noise-overlay">
        <motion.div
          className="pointer-events-none absolute top-1/2 right-1/3 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-coral/8 blur-[120px]"
          aria-hidden="true"
          style={{ y: pricingBlobY }}
        />
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: headline + context */}
          <motion.div
            className="lg:sticky lg:top-24 lg:self-start"
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <h2 className="display text-[clamp(2.75rem,5vw,5.5rem)] text-chalk leading-[0.88] mb-3">
              Agency quality.
            </h2>
            <h2 className="display text-[clamp(2.75rem,5vw,5.5rem)] text-coral leading-[0.88] mb-10">
              Not agency prices.
            </h2>
            <div className="border-t border-chalk/10 pt-8 space-y-5">
              <p className="font-body text-chalk/70 text-lg leading-relaxed">
                One flat price. One annual fee for hosting and minor updates. Stack on add-ons if you need them.
              </p>
              <Link
                href="/pricing"
                className="nav-link inline-flex items-center gap-2 font-body text-base font-semibold text-chalk/65 hover:text-chalk cursor-pointer pb-0.5"
              >
                Full pricing breakdown
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </motion.div>

          {/* Right: pricing card */}
          <div>
            <motion.div
              initial={{ y: 30 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
              className="bg-chalk/5 border border-chalk/10 rounded-2xl px-8 py-10"
            >
              <p className="font-body text-sm font-medium text-coral/80 mb-4">
                Redesign
                <sup className="text-chalk/60 ml-0.5 font-normal">*</sup>
              </p>
              <div className="display text-[4.5rem] text-chalk leading-none mb-2">$600</div>
              <p className="font-body text-chalk/70 text-base mb-5">+ $100/yr, hosting and unlimited minor updates</p>
              <motion.div
                className="h-px bg-coral rounded-full mb-6"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              />
              <div className="flex flex-wrap gap-2">
                {['Admin Dashboard +$200', 'Extra Pages +$75/pg'].map(tag => (
                  <span key={tag} className="font-body text-sm text-chalk/45 border border-chalk/10 rounded-full px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.p
              className="font-body text-chalk/55 text-sm mt-4"
              initial={{ y: 8 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            >
              * 24hr turnaround applies to 1–3 page sites. Larger projects quoted separately.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ════ ABOUT ════ */}
      <section id="about" className="bg-chalk px-6 md:px-10 py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Photo with spring entrance */}
          <motion.div
            className="relative max-w-sm mx-auto lg:mx-0"
            initial={{ x: -40 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="absolute -inset-3 bg-coral/8 rounded-3xl" />
            <motion.div
              className="relative rounded-2xl overflow-hidden border-2 border-white shadow-2xl"
              style={{ rotate: -1.5 }}
              whileHover={{ rotate: 0, scale: 1.02, transition: spring }}
            >
              <img
                src="/nick.JPG"
                alt="Nick, founder of Mr. So Good"
                className="w-full aspect-[3/4] object-cover object-top"
                onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
              />
              <div className="hidden w-full aspect-[3/4] bg-gradient-to-br from-navy to-sand items-center justify-center">
                <span className="display text-chalk text-8xl">N</span>
              </div>
            </motion.div>
            <motion.div
              className="absolute -bottom-3 -right-3 bg-coral text-chalk px-5 py-3 rounded-xl shadow-lg cursor-default"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, ...spring }}
              whileHover={{ scale: 1.05, transition: spring }}
            >
              <div className="display text-3xl leading-none">24hr</div>
              <div className="font-body text-base text-chalk/70 mt-0.5">turnaround</div>
            </motion.div>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ x: 40 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <h2 className="display text-[clamp(2.5rem,5vw,5.5rem)] text-ink mb-8 leading-none">Hi, I'm Nick.</h2>
            <p className="font-body text-ink/65 text-lg leading-relaxed mb-6">
              I started Mr. So Good because I've been where you are. As a{' '}
              <a
                href="https://www.djhokienick.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ink underline decoration-coral/50 underline-offset-[3px] hover:text-coral hover:decoration-coral transition-colors"
              >
                small business owner
              </a>{' '}
              myself, I know that a bad website, or no website at all, costs you customers every single day.
            </p>
            <p className="font-body text-ink/65 text-lg leading-relaxed mb-12">
              I've spent 12 years as a developer, and I'm using every tool at my disposal to give small businesses the online presence they deserve. Fast, affordable, and zero agency markup.
            </p>
            <div className="grid grid-cols-3 gap-4 sm:flex sm:gap-12 text-center sm:text-left">
              {[['12', 'Years experience'], [String(projects.length), 'Businesses rebuilt'], ['24hr', 'Turnaround']].map(([n, l], i) => (
                <motion.div
                  key={l}
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                >
                  <div className="display text-4xl text-coral leading-none">{n}</div>
                  <div className="font-body text-base text-ink/70 uppercase tracking-wider mt-1.5">{l}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════ NO CATCH ════ */}
      <section className="bg-chalk px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="border-t-2 border-ink/10 pt-10"
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <p className="font-body text-base font-semibold uppercase tracking-[0.22em] text-coral mb-7">
              Can I be honest with you?
            </p>
            <h2 className="display text-[clamp(2.5rem,5vw,5rem)] text-ink leading-[0.92] mb-2">
              Free mockup.
            </h2>
            <h2 className="display-italic text-[clamp(2.5rem,5vw,5rem)] text-ink leading-[0.92] mb-10">
              Zero catch.
            </h2>
            <p className="font-body text-ink/65 text-lg leading-relaxed mb-4">
              I'm in the early stages of building Mr. So Good, and part of that means going out and redesigning local businesses as a way to grow my portfolio. I genuinely love the work. So when I say free mockup with no obligation, it's not a sales trick. It's just how this works.
            </p>
            <p className="font-body text-ink/65 text-lg leading-relaxed mb-10">
              Submitting the form means your project moves to the top of my list. If you love the mockup, great.  Don't worry if it's not perfect, I'll work with you to get it there. If not, we go our separate ways with no hard feelings.
            </p>
            <div className="flex items-center gap-3">
              <span className="w-5 h-px bg-coral/50" />
              <p className="font-body text-base font-semibold text-coral tracking-wide">
                Skip the line. Fill out the form below!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════ CONTACT ════ */}
      <section id="contact" ref={contactRef} className="relative overflow-hidden bg-ink px-6 md:px-10 py-24 noise-overlay">
        <motion.div
          className="pointer-events-none absolute top-1/2 right-1/3 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-coral/8 blur-[120px]"
          aria-hidden="true"
          style={{ y: contactBlobY }}
        />
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: bold statement column */}
          <motion.div
            className="lg:sticky lg:top-24 lg:self-start"
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <h2 className="display text-[clamp(3rem,5.5vw,6.5rem)] text-chalk leading-[0.88] mb-1">
              Ready to look
            </h2>
            <h2 className="display-italic text-[clamp(3rem,5.5vw,6.5rem)] text-coral leading-[0.88] mb-10">
              so good?
            </h2>
            <div className="border-t border-chalk/10 pt-8 space-y-4">
              <p className="font-body text-chalk/70 text-lg leading-relaxed">
                Fill out the form and I'll have a free mockup in your inbox within 24 hours. The more information you share, the better the mockup will be. No cost, no commitment.
              </p>
              <div className="flex flex-col gap-2">
                {['Free mockup, no strings', '24-hour turnaround', 'If you love it, we go from there'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-coral flex-shrink-0" />
                    <span className="font-body text-base text-chalk/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <ContactForm dark />
          </motion.div>
        </div>
      </section>
    </>
  )
}
