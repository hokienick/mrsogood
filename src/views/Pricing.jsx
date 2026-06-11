'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.65, ease: [0.25, 0.4, 0.25, 1] },
  }),
}


const faqs = [
  ['What does $100/yr cover?', 'Hosting and minor content updates: swapping photos, changing text, adjusting hours or pricing. It keeps your site live and current without you doing anything.'],
  ['What counts as "minor"?', 'Text changes, image swaps, small tweaks. If it takes more than 15–20 minutes or involves new functionality, that falls under a separate request.'],
  ["What if I don't like the mockup?", "Depends on what 'don't like' means. Colors feel off? Layout needs a tweak? Content in the wrong spot? Those are easy fixes — as long as you're ready to move forward, I'll make as many adjustments as it takes until it feels exactly right. But if the whole direction misses the mark, no hard feelings. We shake hands and move on."],
  ['What does 24 hours actually mean?', "Once I've reviewed your submission and confirmed I'm taking it on, the clock starts. You'll have a live staging link within 24 hours of that confirmation. I do my best to respond to every request quickly, so you won't be waiting long either way. Applies to 1–3 page sites — larger projects may take a bit longer."],
  ['Do you offer SEO?', "Not currently. The focus is building a site that looks great and loads fast. Once your site looks the part, that's the right time to invest in SEO."],
]

const ADDONS = [
  {
    id: 'admin-dashboard',
    name: 'Admin Dashboard',
    price: '+$200',
    note: 'one-time',
    desc: 'Edit your own content without touching code.',
    features: ['Secure login portal', 'Edit text, pricing, services', 'Swap images and photos', 'Changes go live instantly'],
  },
  {
    id: 'extra-pages',
    name: 'Extra Pages',
    price: '+$75',
    note: 'per page',
    desc: "Need more than 3 pages? We can add them. Just keep it focused.",
    features: ['Each page fully designed', 'Matches your site style', 'Mobile-responsive like the rest'],
  },
]

export default function Pricing() {
  const router = useRouter()
  const [selected, setSelected] = useState([])

  const toggle = (id) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const handleCTA = () => {
    const params = selected.length ? `?addons=${selected.join(',')}` : ''
    router.push(`/${params}#contact`)
  }

  return (
    <>
      {/* ════ HERO ════ */}
      <section className="relative bg-ink overflow-hidden pt-32 pb-24 px-6 md:px-10 noise-overlay">
        <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-coral/8 blur-[120px] pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="inline-flex items-center gap-2.5 bg-chalk/5 border border-chalk/10 text-chalk/70 px-4 py-2 rounded-full text-base font-body tracking-widest uppercase mb-10"
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-coral"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            No tiers. No tricks.
          </motion.div>

          <div className="overflow-hidden mb-1">
            <motion.h1
              className="display text-[clamp(3rem,7vw,8rem)] text-chalk leading-[0.9]"
              variants={fadeUp} initial="hidden" animate="visible" custom={1}
            >
              Flat rate.
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              className="display-italic text-[clamp(3rem,7vw,8rem)] text-coral leading-[0.9]"
              variants={fadeUp} initial="hidden" animate="visible" custom={2}
            >
              No surprises.
            </motion.h1>
          </div>

          <motion.p
            className="font-body text-chalk/70 text-lg leading-relaxed max-w-lg mb-14"
            variants={fadeUp} initial="hidden" animate="visible" custom={3}
          >
            One flat build fee. A hundred bucks a year after that. No monthly charges, no scope creep, no invoice you didn't expect.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            variants={fadeUp} initial="hidden" animate="visible" custom={4}
          >
            {[
              { label: 'Redesign', value: '$600' },
              { label: 'Hosting + Updates', value: '+ $100 / yr' },
              { label: 'Live in 24 hours', value: 'Free mockup' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="bg-chalk/5 border border-chalk/10 rounded-2xl px-7 py-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <div className="display text-3xl text-chalk leading-none mb-1">{s.value}</div>
                <div className="font-body text-base text-chalk/70 uppercase tracking-widest">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════ BUILDER MATH ════ */}
      <section className="bg-white py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <p className="font-body text-base font-semibold uppercase tracking-[0.22em] text-coral mb-4">
              Run the numbers
            </p>
            <h2 className="display text-[clamp(2rem,4vw,4rem)] text-ink leading-[0.92] mb-2">
              The math might
            </h2>
            <h2 className="display-italic text-[clamp(2rem,4vw,4rem)] text-ink leading-[0.92]">
              surprise you.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: DIY Builder */}
            <motion.div
              className="rounded-2xl border border-ink/10 bg-ink/[0.03] p-8 flex flex-col"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="font-body text-base font-semibold uppercase tracking-widest text-ink/70 mb-1">Current Setup</p>
                  <h3 className="display text-2xl text-ink leading-none">DIY Website Builder</h3>
                </div>
                <span className="flex-shrink-0 bg-ink/8 text-ink/75 font-body text-sm font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest">
                  Typical
                </span>
              </div>

              <ul className="space-y-4 flex-1 mb-8">
                {[
                  ['Monthly subscription', '$25–40 / mo ($300–480 / yr)'],
                  ['Design', 'Generic templates — looks like everyone else'],
                  ['Content updates', 'You do them yourself'],
                  ['Flexibility', 'Limited to their platform'],
                  ['Every year after that', 'Same bill. Same site.'],
                ].map(([label, value]) => (
                  <li key={label} className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-ink/60 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <div>
                      <span className="font-body text-sm text-ink/70 block">{label}</span>
                      <span className="font-body text-base font-semibold text-ink">{value}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-ink/10 pt-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-body text-xs text-ink/65 uppercase tracking-widest mb-1">5 years</p>
                    <p className="display text-2xl text-ink/75 leading-none">$1,500–2,400</p>
                  </div>
                  <div>
                    <p className="font-body text-xs text-ink/65 uppercase tracking-widest mb-1">10 years</p>
                    <p className="display text-2xl text-ink leading-none">$3,000–4,800</p>
                  </div>
                </div>
                <p className="font-body text-sm text-ink/70 mt-2.5">and the bill never stops.</p>
              </div>
            </motion.div>

            {/* Right: Mr. So Good */}
            <motion.div
              className="rounded-2xl border-2 border-coral/30 bg-ink p-8 flex flex-col relative overflow-hidden"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <div className="pointer-events-none absolute top-0 right-0 w-64 h-64 bg-coral/10 rounded-full blur-[80px]" aria-hidden="true" />

              <div className="flex items-start justify-between gap-4 mb-6 relative z-10">
                <div>
                  <p className="font-body text-base font-semibold uppercase tracking-widest text-coral mb-1">Better Option</p>
                  <h3 className="display text-2xl text-chalk leading-none">Mr. So Good</h3>
                </div>
                <span className="flex-shrink-0 bg-coral/20 text-coral font-body text-sm font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest">
                  Recommended
                </span>
              </div>

              <ul className="space-y-4 flex-1 mb-8 relative z-10">
                {[
                  ['One-time build fee', '$600 flat — no monthly charge'],
                  ['Design', 'Custom, modern, built specifically for you'],
                  ['Content updates', 'Included. We handle it. Unless you want to.'],
                  ['Flexibility', 'Your domain. Your site. Fully yours.'],
                  ['Every year after that', 'Just $100. Hosting + unlimited minor updates.'],
                ].map(([label, value]) => (
                  <li key={label} className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-coral flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <span className="font-body text-sm text-chalk/70 block">{label}</span>
                      <span className="font-body text-base font-semibold text-chalk">{value}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-chalk/10 pt-5 relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-body text-xs text-chalk/65 uppercase tracking-widest mb-1">5 years</p>
                    <p className="display text-2xl text-coral/85 leading-none">$1,100</p>
                  </div>
                  <div>
                    <p className="font-body text-xs text-chalk/65 uppercase tracking-widest mb-1">10 years</p>
                    <p className="display text-2xl text-coral leading-none">$1,600</p>
                  </div>
                </div>
                <p className="font-body text-sm text-chalk/70 mt-2.5">for a site that actually looks the part.</p>
              </div>
            </motion.div>
          </div>

          <motion.p
            className="font-body text-base text-ink/75 mt-7 max-w-2xl leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Once we move your domain to the new site, you can cancel your old platform subscription the same day. That recurring bill? Gone.
          </motion.p>
        </div>
      </section>

      {/* ════ PRICING CONFIGURATOR ════ */}
      <section className="bg-chalk py-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">

          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <h2 className="display text-[clamp(2rem,3.5vw,3.5rem)] text-ink leading-none mb-2">Build your sundae.</h2>
            <p className="font-body text-ink/70 text-base">The redesign is the base. Add the toppings that fit.</p>
          </motion.div>

          {/* ── Redesign base card ── */}
          <motion.div
            className="bg-ink rounded-2xl p-8 md:p-10 mb-4 relative overflow-hidden ring-2 ring-coral"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="pointer-events-none absolute top-0 right-0 w-80 h-80 bg-coral/8 rounded-full blur-[100px]" aria-hidden="true" />
            <div className="relative z-10">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <span className="inline-block font-body text-xs font-semibold uppercase tracking-[0.2em] bg-coral/20 text-coral px-3 py-1 rounded-full mb-3">
                    The foundation
                  </span>
                  <h3 className="display text-[clamp(2rem,3.5vw,3.5rem)] text-chalk leading-none">Redesign</h3>
                </div>
                <div className="text-right">
                  <div className="display text-5xl text-chalk leading-none">$600</div>
                  <p className="font-body text-base text-chalk/70 mt-1">+ $100 / yr</p>
                </div>
              </div>

              <p className="font-body text-chalk/70 text-base leading-relaxed mb-8 max-w-xl">
                Your existing site, completely modernized. Custom design. Mobile-ready. Yours to keep. One flat fee, no monthly surprises.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Full visual redesign from your existing site',
                  'Mobile-responsive layout',
                  'Live staging preview in 24 hours*',
                  'Hosting included',
                  'Minor updates year-round (text, images)',
                  'Up to 3 pages of content',
                  'Booking or scheduling integration (if applicable)',
                  'No self-service editing — contact me for tweaks',
                ].map((f, idx) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${idx === 7 ? 'text-chalk/65' : 'text-coral'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      {idx === 7
                        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      }
                    </svg>
                    <span className={`font-body text-base ${idx === 7 ? 'text-chalk/75' : 'text-chalk'}`}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Add-on tiles ── */}
          <div className="mt-10 mb-8 space-y-3">
            <motion.div
              className="flex items-center gap-2.5 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Cherry SVG */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-coral flex-shrink-0" aria-hidden="true">
                <path d="M9 3C9 3 10 8 14 9C14 9 11 10 9 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="7.5" cy="17.5" r="3.5" fill="currentColor" opacity="0.85"/>
                <circle cx="15.5" cy="16.5" r="3.5" fill="currentColor"/>
                <path d="M14 9C14 9 16 10 17 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-ink/70">The toppings</p>
            </motion.div>
            {ADDONS.map((addon, i) => {
              const checked = selected.includes(addon.id)
              return (
                <motion.button
                  key={addon.id}
                  type="button"
                  onClick={() => toggle(addon.id)}
                  className={`w-full text-left rounded-2xl p-6 border-2 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-chalk ${
                    checked
                      ? 'border-coral bg-white shadow-sm'
                      : 'border-ink/10 bg-white hover:border-ink/20'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <div className={`flex-shrink-0 w-5 h-5 rounded-md border-2 mt-0.5 flex items-center justify-center transition-colors duration-150 ${
                      checked ? 'bg-coral border-coral' : 'border-ink/20'
                    }`} aria-hidden="true">
                      {checked && (
                        <svg className="w-3 h-3 text-chalk" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                        <span className={`font-body font-bold text-base transition-colors ${checked ? 'text-coral' : 'text-ink'}`}>
                          {addon.name}
                        </span>
                        <span className="font-body text-sm text-ink/70">{addon.price} <span className="text-ink/65">{addon.note}</span></span>
                      </div>
                      <p className="font-body text-sm text-ink/70 mb-3">{addon.desc}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        {addon.features.map(f => (
                          <span key={f} className="font-body text-sm text-ink/65 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-coral/60 flex-shrink-0" />
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* ── Summary + CTA ── */}
          <motion.div
            className="bg-white border border-ink/8 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div>
              <p className="font-body text-sm uppercase tracking-widest text-ink/70 mb-1">Your Total <span className="normal-case tracking-normal font-normal text-ink/65">(due at delivery, not today)</span></p>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="display text-3xl text-ink leading-none">
                  ${600 + selected.reduce((sum, id) => {
                    if (id === 'admin-dashboard') return sum + 200
                    if (id === 'extra-pages') return sum + 75
                    return sum
                  }, 0)}
                </span>
                <span className="font-body text-base text-ink/75">+ $100 / yr</span>
                {selected.length > 0 && (
                  <span className="font-body text-sm text-coral ml-1">
                    ({selected.map(id => ADDONS.find(a => a.id === id)?.name).join(' + ')})
                  </span>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={handleCTA}
              className="btn-primary flex-shrink-0 bg-coral text-chalk font-body font-semibold px-8 py-4 rounded-xl text-base cursor-pointer whitespace-nowrap"
            >
              Get My Free Mockup →
            </button>
          </motion.div>

          <p className="font-body text-sm text-ink/65 mt-4">* 24-hour delivery applies to sites with 1–3 pages. Larger projects may take longer.</p>
        </div>
      </section>

      {/* ════ FAQ ════ */}
      <section className="bg-white py-20 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="display text-fluid-md text-ink mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            Common Questions.
          </motion.h2>
          <div className="space-y-0">
            {faqs.map(([q, a], i) => (
              <motion.div
                key={q}
                className="py-7 border-b border-ink/8"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <h3 className="font-body font-bold text-ink text-base mb-2">{q}</h3>
                <p className="font-body text-ink/75 text-base leading-relaxed">{a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ CTA ════ */}
      <section className="bg-coral py-20 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="display text-fluid-lg text-chalk mb-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            Still on the fence?
          </motion.h2>
          <motion.p
            className="font-body text-chalk/70 text-lg mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            The mockup is free. There's literally no risk. Let me show you what's possible.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <Link href="/#contact"
              className="btn-primary inline-block bg-chalk text-coral font-body font-semibold px-10 py-4 rounded-full text-base cursor-pointer">
              Get My Free Mockup →
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
