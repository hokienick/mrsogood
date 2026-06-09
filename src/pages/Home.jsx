import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  motion
} from 'framer-motion'
import ContactForm from '../components/ContactForm'
import BrowserChrome from '../components/BrowserChrome'
import WorksGallery from '../components/WorksGallery'
import { projects } from '../data/projects'

/* ── Spring config ── */
const spring = { type: 'spring', stiffness: 400, damping: 17 }

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
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
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
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
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
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
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
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

/* ── Marquee strip ── */
function Marquee() {
  const items = ['Free Mockup', '24hr Turnaround', 'No Obligation', 'Small Business Specialist', 'Redesigns & New Builds', 'US-Based']
  return (
    <div className="bg-coral overflow-hidden py-3 select-none">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="font-display text-cream text-base tracking-widest mx-6 uppercase">
            {item} <span className="text-cream/60 mx-3">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const heroRef = useRef(null)

  return (
    <>
      {/* ════ HERO ════ */}
      <section ref={heroRef} className="relative bg-ink min-h-screen flex items-center overflow-hidden">

        {/* Static subtle glow, no animation, just atmosphere */}
        <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-coral/8 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 pt-28 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-10 items-start">

          {/* ── LEFT: Text column ── */}
          <div>
            {/* Pulsing dot badge */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={0}
              className="inline-flex items-center gap-2.5 bg-cream/5 border border-cream/10 text-cream/70 px-4 py-2 rounded-full text-base font-body tracking-widest uppercase mb-10"
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-coral"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Let's modernize.
            </motion.div>

            {/* Headline */}
            <div className="overflow-hidden mb-1">
              <motion.h1
                className="display text-[clamp(3rem,6vw,6.5rem)] text-cream leading-[0.9]"
                variants={fadeUp} initial="hidden" animate="visible" custom={1}
              >
                You didn't know
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-1">
              <motion.h1
                className="display text-[clamp(3rem,6vw,6.5rem)] text-cream leading-[0.9]"
                variants={fadeUp} initial="hidden" animate="visible" custom={2}
              >
                your website could look
              </motion.h1>
            </div>
            <div className="mb-10 pb-2">
              <motion.h1
                className="display-italic text-[clamp(3rem,6vw,6.5rem)] text-coral leading-[0.9]"
                variants={fadeUp} initial="hidden" animate="visible" custom={3}
              >
                so good.
              </motion.h1>
            </div>

            {/* Divider + subtext */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={4}
              className="border-t border-cream/10 pt-8 mb-8"
            >
              <p className="font-body text-cream/70 text-lg leading-relaxed">
                Redesigns & new builds for small businesses.<br />
                Free mockup in 24 hours, no strings attached.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={5}
              className="flex flex-col sm:flex-row gap-3"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={spring}>
                <Link
                  to="/#contact"
                  className="btn-shimmer block bg-coral text-cream font-body font-semibold px-7 py-4 rounded-full text-base text-center whitespace-nowrap"
                >
                  Get My Free Mockup →
                </Link>
              </motion.div>
              <motion.a
                href="#work"
                className="font-body font-medium text-cream/70 hover:text-cream px-7 py-4 rounded-full text-base text-center border border-cream/20 hover:border-cream/40 transition-colors duration-200 whitespace-nowrap"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={spring}
              >
                See the Work ↓
              </motion.a>
            </motion.div>

            {/* Social proof dots */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={6}
              className="flex items-center gap-5 mt-10"
            >
              {['Zero Risk', '24hr Delivery', 'No Contract'].map((t, i) => (
                <span key={t} className="flex items-center gap-1.5 font-body text-cream/75 text-base">
                  <span className="w-1 h-1 rounded-full bg-coral/60" />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Floating before/after mockup ── */}
          <motion.div
            className="relative hidden lg:block pt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <BeforeAfterMockup />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <motion.div
            className="w-5 h-8 border border-cream/20 rounded-full flex justify-center pt-1.5"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              className="w-0.5 h-2 bg-cream/30 rounded-full"
              animate={{ y: [0, 5, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ════ MARQUEE ════ */}
      <Marquee />

      {/* ════ PORTFOLIO ════ */}
      <section id="work" className="bg-ink px-6 md:px-10 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14">
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <h2 className="display text-[clamp(2.5rem,5vw,5.5rem)] text-cream leading-none">
                Small businesses,<br />reimagined.
              </h2>
              <p className="font-body text-cream/45 text-base mt-5 max-w-md leading-relaxed">
                Hover a card to preview the work. Click through for the full case study.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Link to="/work" className="nav-link font-body text-base font-semibold text-cream/60 hover:text-cream transition-colors cursor-pointer pb-0.5 whitespace-nowrap">
                See all work →
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <WorksGallery projects={projects} />
          </motion.div>
        </div>
      </section>

      {/* ════ PROCESS ════ */}
      <section className="relative overflow-hidden bg-white px-6 md:px-10 py-24">
        <motion.div
          className="pointer-events-none absolute -right-24 top-16 h-[420px] w-[420px] rounded-full bg-sand/25 blur-[100px]"
          aria-hidden="true"
          animate={{ scale: [1, 1.06, 1], opacity: [0.45, 0.65, 0.45] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-20 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <p className="font-body text-base font-semibold uppercase tracking-[0.22em] text-coral mb-5">
                How it works
              </p>
              <h2 className="display text-[clamp(2.5rem,5vw,5.5rem)] text-ink leading-none">
                A new website<br />in your inbox.<br />
                <span className="text-sand">Tomorrow.</span>
              </h2>
              <div className="mt-8 flex items-center gap-3">
                <span className="inline-flex h-2 w-2 rounded-full bg-coral" aria-hidden="true" />
                <span className="font-body text-base font-semibold text-ink/70">5 steps</span>
                <span className="font-body text-base text-ink/35">·</span>
                <span className="font-body text-base text-ink/55">Under 24 hours to preview</span>
              </div>
            </motion.div>

            <div className="relative">
              <div className="absolute left-[1.65rem] top-10 bottom-10 z-0 hidden w-0.5 rounded-full bg-gradient-to-b from-coral/50 via-coral/35 to-coral/30 md:block" aria-hidden="true" />

              <div className="relative z-10 space-y-4">
                {[
                  ['01', 'Fill out the form', 'Tell me about your business and drop your current website URL. Two minutes.', 'bg-cream border-coral/15', false],
                  ['02', 'Nick reviews your site', 'I dig into what you have: the good, the bad, and the opportunity.', 'bg-white border-ink/8', false],
                  ['03', 'Full redesign built overnight', 'Your palette, your vibe, modernized from the ground up.', 'bg-[#FCF0EA] border-coral/20', false],
                  ['04', 'Preview link in your inbox', 'A live staging link lands within 24 hours. See exactly what it looks like.', 'bg-white border-ink/8', false],
                  ['05', 'Love it? We make it official.', "If you're in, we launch. If not, no hard feelings, seriously.", 'bg-[#F3ECE2] border-coral/35 ring-1 ring-coral/15', true],
                ].map(([num, title, body, cardClass, isFinal], i) => (
                  <motion.div
                    key={num}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: i * 0.07, duration: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
                    whileHover={{ y: -3 }}
                    className={[
                      'group relative rounded-[1.5rem] border p-5 md:p-6 shadow-[0_10px_30px_rgba(26,20,16,0.05)] transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(26,20,16,0.08)]',
                      cardClass,
                    ].join(' ')}
                  >
                    <div className="flex gap-4 md:gap-5">
                      <div
                        className={[
                          'flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl',
                          isFinal ? 'bg-coral text-cream shadow-[0_8px_20px_rgba(232,107,58,0.25)]' : 'bg-coral/12 text-coral',
                        ].join(' ')}
                      >
                        <span className="display text-2xl leading-none">{num}</span>
                      </div>
                      <div className="min-w-0 pt-1">
                        <p className="font-body font-bold text-lg mb-2 text-ink">{title}</p>
                        <p className="font-body text-base leading-relaxed text-ink/70">{body}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ PRICING ════ */}
      <section className="relative overflow-hidden bg-ink px-6 md:px-10 py-24">
        <motion.div
          className="pointer-events-none absolute top-1/4 -left-32 h-[480px] w-[480px] rounded-full bg-coral/10 blur-[120px]"
          aria-hidden="true"
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.75, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: headline + context */}
          <motion.div
            className="lg:sticky lg:top-24 lg:self-start"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <h2 className="display text-[clamp(2.75rem,5vw,5.5rem)] text-cream leading-[0.88] mb-3">
              Agency quality.
            </h2>
            <h2 className="display text-[clamp(2.75rem,5vw,5.5rem)] text-coral leading-[0.88] mb-10">
              Not agency prices.
            </h2>
            <div className="border-t border-cream/10 pt-8 space-y-5">
              <p className="font-body text-cream/70 text-lg leading-relaxed">
                Two straightforward plans. One flat price, one annual fee for hosting and unlimited minor fixes.
              </p>
              <Link
                to="/pricing"
                className="nav-link inline-flex items-center gap-2 font-body text-base font-semibold text-cream/65 hover:text-cream cursor-pointer pb-0.5"
              >
                Full pricing breakdown
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </motion.div>

          {/* Right: pricing cards */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Redesign', price: '$600', note: '+ $100/yr - hosting and unlimited minor fixes' },
                { label: 'From Scratch', price: '$700', note: '+ $100/yr - hosting and unlimited minor fixes' },
              ].map((t, i) => (
                <motion.div
                  key={t.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                  whileHover={{ y: -4, transition: spring }}
                  className="bg-cream/5 border border-cream/10 rounded-2xl px-8 py-10 cursor-default"
                >
                  <p className="font-body text-base font-semibold uppercase tracking-widest text-coral mb-4">
                    {t.label}
                    <sup className="text-cream ml-0.5 font-normal normal-case tracking-normal">*</sup>
                  </p>
                  <div className="display text-[4.5rem] text-cream leading-none mb-2">{t.price}</div>
                  <p className="font-body text-cream/55 text-base mb-5">{t.note}</p>
                  <motion.div
                    className="h-px bg-coral rounded-full"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.4, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
                  />
                </motion.div>
              ))}
            </div>
            <motion.p
              className="font-body text-cream/55 text-base mt-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              * These prices and 24hr turnaround apply to websites with 1–3 pages. Larger projects are quoted separately.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ════ ABOUT ════ */}
      <section id="about" className="bg-cream px-6 md:px-10 py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Photo with spring entrance */}
          <motion.div
            className="relative max-w-sm mx-auto lg:mx-0"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
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
                <span className="display text-cream text-8xl">N</span>
              </div>
            </motion.div>
            <motion.div
              className="absolute -bottom-3 -right-3 bg-coral text-cream px-5 py-3 rounded-xl shadow-lg cursor-default"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, ...spring }}
              whileHover={{ scale: 1.05, transition: spring }}
            >
              <div className="display text-3xl leading-none">24hr</div>
              <div className="font-body text-base text-cream/70 mt-0.5">turnaround</div>
            </motion.div>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <h2 className="display text-[clamp(2.5rem,5vw,5.5rem)] text-ink mb-8 leading-none">Hi, I'm Nick.</h2>
            <p className="font-body text-ink/65 text-lg leading-relaxed mb-6">
              I started Mr. So Good because I've been where you are. As a small business owner myself, I know that a bad website, or no website at all, costs you customers every single day.
            </p>
            <p className="font-body text-ink/65 text-lg leading-relaxed mb-12">
              I've spent 12 years as a developer, and I'm using every tool at my disposal to give small businesses the online presence they deserve. Fast, affordable, and zero agency markup.
            </p>
            <div className="flex gap-12">
              {[['12', 'Years experience'], ['4+', 'Businesses rebuilt'], ['24hr', 'Turnaround']].map(([n, l], i) => (
                <motion.div
                  key={l}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                >
                  <div className="display text-4xl text-coral leading-none">{n}</div>
                  <div className="font-body text-base text-ink/50 uppercase tracking-wider mt-1.5">{l}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════ CONTACT ════ */}
      <section id="contact" className="relative overflow-hidden bg-ink px-6 md:px-10 py-24">
        <motion.div
          className="pointer-events-none absolute top-1/4 -left-32 h-[480px] w-[480px] rounded-full bg-coral/10 blur-[120px]"
          aria-hidden="true"
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.75, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: bold statement column */}
          <motion.div
            className="lg:sticky lg:top-24 lg:self-start"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <h2 className="display text-[clamp(3rem,5.5vw,6.5rem)] text-cream leading-[0.88] mb-1">
              Ready to look
            </h2>
            <h2 className="display-italic text-[clamp(3rem,5.5vw,6.5rem)] text-coral leading-[0.88] mb-10">
              so good?
            </h2>
            <div className="border-t border-cream/10 pt-8 space-y-4">
              <p className="font-body text-cream/70 text-lg leading-relaxed">
                Fill out the form and I'll have a free mockup in your inbox within 24 hours. No cost, no commitment.
              </p>
              <div className="flex flex-col gap-2">
                {['Free mockup, no strings', '24-hour turnaround', 'If you love it, we go from there'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-coral flex-shrink-0" />
                    <span className="font-body text-base text-cream/65">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
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
