'use client'
import { useState, useEffect } from 'react'

const ADDON_OPTIONS = [
  { id: 'admin-dashboard', label: 'Admin Dashboard', price: '+$200 one-time' },
  { id: 'extra-pages', label: 'Extra Pages', price: '+$75 / page' },
]

export default function ContactForm({ dark = false }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', website:'', industry:'', booking:'', inspiration:'', message:'' })
  const [addons, setAddons] = useState([])
  const [takesBookings, setTakesBookings] = useState(null) // null=unanswered, true=yes, false=no
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const raw = params.get('addons')
    if (raw) setAddons(raw.split(',').filter(id => ADDON_OPTIONS.some(o => o.id === id)))
  }, [])

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const toggleAddon = id => setAddons(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  const submit = e => { e.preventDefault(); setSent(true) }

  const base = `field w-full border rounded-xl px-4 py-3 font-body text-base focus:outline-none transition-colors duration-200 ${
    dark
      ? 'bg-chalk text-ink placeholder-ink/50 border-ink/15 focus:border-coral focus:bg-white'
      : 'bg-ink/4 border-ink/20 text-ink placeholder-ink/50 focus:border-ink/40 focus:bg-ink/6'
  }`
  const label = `block font-body text-base font-semibold uppercase tracking-widest mb-2 ${dark ? 'text-chalk/75' : 'text-ink/65'}`

  if (sent) return (
    <div className="py-16 text-center">
      <div className={`display text-fluid-lg mb-4 ${dark ? 'text-chalk' : 'text-ink'}`}>You're on the list.</div>
      <p className={`font-body text-lg ${dark ? 'text-chalk/70' : 'text-ink/65'}`}>Expect a mockup in your inbox within 24 hours.</p>
    </div>
  )

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={label}>Name <span className="text-coral normal-case tracking-normal">*</span></label>
          <input id="name" name="name" type="text" required value={form.name} onChange={handle} placeholder="Your name" className={base} />
        </div>
        <div>
          <label htmlFor="email" className={label}>Email <span className="text-coral normal-case tracking-normal">*</span></label>
          <input id="email" name="email" type="email" required value={form.email} onChange={handle} placeholder="you@business.com" className={base} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className={label}>Phone</label>
          <input id="phone" name="phone" type="tel" value={form.phone} onChange={handle} placeholder="(619) 555-0100" className={base} />
        </div>
        <div>
          <label htmlFor="website" className={label}>Current Website <span className="text-coral normal-case tracking-normal">*</span></label>
          <input id="website" name="website" type="url" required value={form.website} onChange={handle} placeholder="https://yoursite.com" className={base} />
        </div>
      </div>
      <div>
        <label htmlFor="industry" className={label}>Your Industry <span className="text-coral normal-case tracking-normal">*</span></label>
        <input
          id="industry"
          name="industry"
          type="text"
          required
          value={form.industry}
          onChange={handle}
          placeholder="e.g. dental office, restaurant, entertainment"
          className={base}
        />
      </div>
      {/* Add-ons */}
      <div>
        <p className={label}>Add-ons <span className={`normal-case tracking-normal font-normal ${dark ? 'text-chalk/65' : 'text-ink/65'}`}>(optional)</span></p>
        <div className="space-y-2">
          {ADDON_OPTIONS.map(opt => {
            const checked = addons.includes(opt.id)
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggleAddon(opt.id)}
                className={`w-full text-left flex items-center gap-3 border-2 rounded-xl px-4 py-3 transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-coral ${
                  checked
                    ? dark ? 'border-coral bg-chalk/5' : 'border-coral bg-coral/5'
                    : dark ? 'border-chalk/10 hover:border-chalk/20' : 'border-ink/12 hover:border-ink/25'
                }`}
              >
                <div className={`w-4 h-4 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${
                  checked ? 'bg-coral border-coral' : dark ? 'border-chalk/30' : 'border-ink/25'
                }`} aria-hidden="true">
                  {checked && (
                    <svg className="w-2.5 h-2.5 text-chalk" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`font-body font-semibold text-base flex-1 ${checked ? 'text-coral' : dark ? 'text-chalk/80' : 'text-ink'}`}>{opt.label}</span>
                <span className={`font-body text-sm ${dark ? 'text-chalk/70' : 'text-ink/70'}`}>{opt.price}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <p className={label}>Do you take bookings or appointments? <span className={`normal-case tracking-normal font-normal ${dark ? 'text-chalk/65' : 'text-ink/65'}`}>(optional)</span></p>
        <div className="flex gap-2 mb-3">
          {[['Yes', true], ['No', false]].map(([opt, val]) => (
            <button
              key={opt}
              type="button"
              onClick={() => setTakesBookings(val)}
              className={`px-5 py-2.5 rounded-xl font-body font-semibold text-base border-2 transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-coral ${
                takesBookings === val
                  ? 'border-coral bg-coral text-chalk'
                  : dark ? 'border-chalk/15 text-chalk/75 hover:border-chalk/30' : 'border-ink/15 text-ink/70 hover:border-ink/30'
              }`}
            >{opt}</button>
          ))}
        </div>
        {takesBookings === true && (
          <input id="booking" name="booking" type="text" value={form.booking} onChange={handle}
            placeholder="Which tool do you use? e.g. OpenTable, Calendly, Square Appointments"
            className={base} />
        )}
      </div>
      <div>
        <label htmlFor="inspiration" className={label}>Inspiration URLs <span className={`normal-case tracking-normal font-normal ${dark ? 'text-chalk/65' : 'text-ink/65'}`}>(optional)</span></label>
        <textarea id="inspiration" name="inspiration" rows={3} value={form.inspiration} onChange={handle}
          placeholder="Share links to sites you love the look of. This helps a ton."
          className={base + ' resize-none'} />
      </div>
      <div>
        <label htmlFor="message" className={label}>Anything else? <span className={`normal-case tracking-normal font-normal ${dark ? 'text-chalk/65' : 'text-ink/65'}`}>(optional)</span></label>
        <textarea id="message" name="message" rows={3} value={form.message} onChange={handle}
          placeholder="Tell me about your business, your goals, whatever helps."
          className={base + ' resize-none'} />
      </div>
      <button type="submit"
        className="btn-primary w-full bg-coral text-chalk font-body font-semibold py-4 rounded-xl text-base cursor-pointer">
        Send It →
      </button>
    </form>
  )
}
