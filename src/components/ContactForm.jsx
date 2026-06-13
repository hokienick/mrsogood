'use client'
import { useState } from 'react'

const ADDON_OPTIONS = [
  { id: 'admin-dashboard', label: 'Admin Dashboard', price: '+$200' },
  { id: 'extra-pages', label: 'Extra Pages', price: '+$75/page' },
]

const STEPS = [
  { n: 1, label: 'Who are you?' },
  { n: 2, label: 'Tell me about your site.' },
  { n: 3, label: 'Last details.' },
]

export default function ContactForm({ dark = false }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', website: '', industry: '',
    addons: [], takesBookings: null, booking: '', inspiration: '', message: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const toggleAddon = id => setForm(f => ({
    ...f,
    addons: f.addons.includes(id) ? f.addons.filter(x => x !== id) : [...f.addons, id],
  }))

  const validate = s => {
    const errs = {}
    if (s === 1) {
      if (!form.name.trim()) errs.name = 'Please enter your name.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'A valid email is required.'
    }
    if (s === 2) {
      if (!form.industry.trim()) errs.industry = 'Please tell me your industry.'
    }
    return errs
  }

  const next = () => {
    const errs = validate(step)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStep(s => s + 1)
  }

  const back = () => { setErrors({}); setStep(s => s - 1) }

  const submit = async e => {
    e.preventDefault()
    setLoading(true)
    setSubmitError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, takesBookings: form.takesBookings }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setSubmitError('Something went wrong. Email nick@mistersogood.com directly.')
    } finally {
      setLoading(false)
    }
  }

  // ── Style helpers ──────────────────────────────────────────
  const fieldLine = `w-full pb-3.5 pt-1 bg-transparent font-body text-base focus:outline-none transition-colors duration-200 border-b ${
    dark
      ? 'border-chalk/30 text-chalk placeholder-chalk/50 focus:border-coral'
      : 'border-ink/20 text-ink placeholder-ink/40 focus:border-coral'
  }`
  const labelSm = `block font-body text-[0.6rem] font-bold uppercase tracking-[0.15em] mb-2 ${dark ? 'text-chalk/75' : 'text-ink/65'}`
  const errMsg  = `block font-body text-[0.7rem] font-semibold text-coral mt-1.5`

  const muted = dark ? 'text-chalk/55' : 'text-ink/50'
  const heading = `display text-[clamp(1.5rem,4vw,2.4rem)] mb-8 ${dark ? 'text-chalk' : 'text-ink'}`

  // ── Success state ──────────────────────────────────────────
  if (sent) return (
    <div className="py-16 text-center">
      <div className={`display text-fluid-lg mb-6 ${dark ? 'text-chalk' : 'text-ink'}`}>You're<br />on the <span className="text-coral">list.</span></div>
      <p className={`font-body text-lg max-w-md mx-auto leading-relaxed mb-8 ${dark ? 'text-chalk/70' : 'text-ink/65'}`}>
        I'll review your info and reach out to confirm a few details. Once we're aligned, your mockup will be in your inbox within 24 hours.
      </p>
      <ul className="inline-flex flex-col gap-2 text-left">
        {['I review your form and reach out', 'You confirm the direction', 'Mockup lands in 24 hours'].map((item) => (
          <li key={item} className="flex items-center gap-3 font-body text-base font-semibold text-coral">
            <span className="w-1.5 h-1.5 rounded-full bg-coral flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div>
      {/* ── Progress indicator ── */}
      <div className="flex items-center gap-3 mb-12" role="progressbar" aria-label="Form progress" aria-valuenow={step} aria-valuemin={1} aria-valuemax={3}>
        {STEPS.map(({ n }, i) => {
          const done   = n < step
          const active = n === step
          return (
            <span key={n} className="contents">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all duration-300 ${
                done   ? 'bg-coral border-coral' :
                active ? 'border-coral bg-transparent' :
                dark   ? 'border-chalk/18 bg-transparent' : 'border-ink/14 bg-transparent'
              }`}>
                {done ? (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : (
                  <span className={`font-display font-black text-[0.62rem] ${active ? 'text-coral' : dark ? 'text-chalk/28' : 'text-ink/22'}`}>{n}</span>
                )}
              </div>
              {i < 2 && (
                <div className={`flex-1 h-px transition-colors duration-500 ${step > n ? 'bg-coral' : dark ? 'bg-chalk/10' : 'bg-ink/10'}`} />
              )}
            </span>
          )
        })}
      </div>

      <form onSubmit={submit}>

        {/* ── Step 1: Who are you? ── */}
        {step === 1 && (
          <div>
            <p className={`font-display font-black text-[0.6rem] tracking-[0.18em] uppercase mb-2 ${muted}`}>Step 1 of 3</p>
            <h3 className={heading}>Who are you?</h3>
            <div className="space-y-7">
              <div>
                <label htmlFor="name" className={labelSm}>Your name</label>
                <input id="name" name="name" type="text" value={form.name} onChange={handle}
                  placeholder="Jane Smith" autoComplete="name"
                  className={fieldLine + (errors.name ? ' !border-coral' : '')} />
                {errors.name && <span className={errMsg}>{errors.name}</span>}
              </div>
              <div>
                <label htmlFor="email" className={labelSm}>Email address</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handle}
                  placeholder="jane@yourbusiness.com" autoComplete="email"
                  className={fieldLine + (errors.email ? ' !border-coral' : '')} />
                {errors.email && <span className={errMsg}>{errors.email}</span>}
              </div>
              <div>
                <label htmlFor="phone" className={labelSm}>Phone <span className="normal-case tracking-normal font-normal opacity-60">(optional)</span></label>
                <input id="phone" name="phone" type="tel" value={form.phone} onChange={handle}
                  placeholder="(619) 555-0100" autoComplete="tel"
                  className={fieldLine} />
              </div>
            </div>
            <div className="pt-9">
              <button type="button" onClick={next}
                className="font-display font-black text-[0.72rem] tracking-[0.08em] uppercase bg-coral text-chalk px-8 py-4 rounded-full inline-flex items-center gap-2 hover:bg-coral-dark active:scale-[0.97] transition-all duration-200 cursor-pointer">
                Continue
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2: About your site ── */}
        {step === 2 && (
          <div>
            <p className={`font-display font-black text-[0.6rem] tracking-[0.18em] uppercase mb-2 ${muted}`}>Step 2 of 3</p>
            <h3 className={heading}>Tell me about your site.</h3>
            <div className="space-y-7">
              <div>
                <label htmlFor="website" className={labelSm}>Current website URL</label>
                <input id="website" name="website" type="text" value={form.website} onChange={handle}
                  placeholder="https://yoursite.com"
                  className={fieldLine} />
                <span className={`block text-[0.67rem] mt-2 ${dark ? 'text-chalk/55' : 'text-ink/50'}`}>No site yet? Leave blank. I can build from scratch.</span>
              </div>
              <div>
                <label htmlFor="industry" className={labelSm}>Your industry</label>
                <input id="industry" name="industry" type="text" value={form.industry} onChange={handle}
                  placeholder="e.g. restaurant, dental office, bar"
                  className={fieldLine + (errors.industry ? ' !border-coral' : '')} />
                {errors.industry && <span className={errMsg}>{errors.industry}</span>}
              </div>
            </div>
            <div className="pt-9 flex items-center gap-5">
              <button type="button" onClick={next}
                className="font-display font-black text-[0.72rem] tracking-[0.08em] uppercase bg-coral text-chalk px-8 py-4 rounded-full inline-flex items-center gap-2 hover:bg-coral-dark active:scale-[0.97] transition-all duration-200 cursor-pointer">
                Continue
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <button type="button" onClick={back}
                className={`text-[0.78rem] font-medium transition-colors cursor-pointer ${dark ? 'text-chalk/55 hover:text-chalk' : 'text-ink/50 hover:text-ink'}`}>
                ← Back
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Last details ── */}
        {step === 3 && (
          <div>
            <p className={`font-display font-black text-[0.6rem] tracking-[0.18em] uppercase mb-2 ${muted}`}>Step 3 of 3</p>
            <h3 className={heading}>Last details.</h3>
            <div className="space-y-7">
              {/* Add-ons */}
              <div>
                <p className={`${labelSm} mb-3`}>Add-ons <span className="normal-case tracking-normal font-normal opacity-70">(optional)</span></p>
                <div className="space-y-2">
                  {ADDON_OPTIONS.map(opt => {
                    const checked = form.addons.includes(opt.id)
                    return (
                      <button key={opt.id} type="button" onClick={() => toggleAddon(opt.id)}
                        className={`w-full text-left flex items-center gap-3 border rounded-xl px-4 py-3 transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-coral ${
                          checked ? 'border-coral bg-coral/8' :
                          dark ? 'border-chalk/10 hover:border-chalk/20' : 'border-ink/10 hover:border-ink/20'
                        }`}>
                        <div className={`w-4 h-4 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${
                          checked ? 'bg-coral border-coral' : dark ? 'border-chalk/25' : 'border-ink/20'
                        }`} aria-hidden="true">
                          {checked && (
                            <svg className="w-2.5 h-2.5 text-chalk" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={`font-body font-semibold text-base flex-1 ${checked ? 'text-coral' : dark ? 'text-chalk/80' : 'text-ink'}`}>{opt.label}</span>
                        <span className={`font-body text-sm ${dark ? 'text-chalk/50' : 'text-ink/50'}`}>{opt.price}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
              {/* Takes bookings */}
              <div>
                <p className={`${labelSm} mb-3`}>Do you take bookings or appointments? <span className="normal-case tracking-normal font-normal opacity-60">(optional)</span></p>
                <div className="flex gap-2 mb-3">
                  {[['Yes', true], ['No', false]].map(([opt, val]) => (
                    <button key={opt} type="button"
                      onClick={() => setForm(f => ({ ...f, takesBookings: f.takesBookings === val ? null : val }))}
                      className={`px-5 py-2.5 rounded-xl font-body font-semibold text-base border-2 transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-coral ${
                        form.takesBookings === val
                          ? 'border-coral bg-coral text-chalk'
                          : dark ? 'border-chalk/15 text-chalk/75 hover:border-chalk/30' : 'border-ink/15 text-ink/70 hover:border-ink/30'
                      }`}>{opt}</button>
                  ))}
                </div>
                {form.takesBookings === true && (
                  <input name="booking" type="text" value={form.booking} onChange={handle}
                    placeholder="Which tool? e.g. OpenTable, Calendly, Square"
                    className={fieldLine} />
                )}
              </div>
              {/* Inspiration */}
              <div>
                <label htmlFor="inspiration" className={labelSm}>Inspiration URLs <span className="normal-case tracking-normal font-normal opacity-60">(optional)</span></label>
                <textarea id="inspiration" name="inspiration" rows={2} value={form.inspiration} onChange={handle}
                  placeholder="Share links to sites you love the look of."
                  className={fieldLine + ' resize-none'} />
              </div>
              {/* Message */}
              <div>
                <label htmlFor="message" className={labelSm}>Anything else? <span className="normal-case tracking-normal font-normal opacity-60">(optional)</span></label>
                <textarea id="message" name="message" rows={2} value={form.message} onChange={handle}
                  placeholder="Business, goals, whatever helps."
                  className={fieldLine + ' resize-none'} />
              </div>
            </div>
            {submitError && <p className="font-body text-sm text-red-500 mt-4">{submitError}</p>}
            <div className="pt-9 flex items-center gap-5 flex-wrap">
              <button type="submit" disabled={loading}
                className="font-display font-black text-[0.72rem] tracking-[0.08em] uppercase bg-coral text-chalk px-8 py-4 rounded-full inline-flex items-center gap-2 hover:bg-coral-dark active:scale-[0.97] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral focus-visible:outline-offset-2">
                {loading ? 'Sending…' : 'Request my free mockup'}
                {!loading && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>}
              </button>
              <button type="button" onClick={back}
                className={`text-[0.78rem] font-medium transition-colors cursor-pointer ${dark ? 'text-chalk/55 hover:text-chalk' : 'text-ink/50 hover:text-ink'}`}>
                ← Back
              </button>
            </div>
          </div>
        )}

      </form>
    </div>
  )
}
