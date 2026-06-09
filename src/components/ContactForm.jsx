import { useState } from 'react'

export default function ContactForm({ dark = false }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', website:'', industry:'', inspiration:'', message:'' })
  const [sent, setSent] = useState(false)

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const submit = e => { e.preventDefault(); setSent(true) }

  const base = `field w-full border rounded-xl px-4 py-3 font-body text-base focus:outline-none transition-colors duration-200 ${
    dark
      ? 'bg-white/8 border-cream/30 text-cream placeholder-cream/40 focus:border-cream/55 focus:bg-white/12'
      : 'bg-ink/4 border-ink/20 text-ink placeholder-ink/35 focus:border-ink/40 focus:bg-ink/6'
  }`
  const label = `block font-body text-base font-semibold uppercase tracking-widest mb-2 ${dark ? 'text-cream/75' : 'text-ink/65'}`

  if (sent) return (
    <div className="py-16 text-center">
      <div className={`display text-fluid-lg mb-4 ${dark ? 'text-cream' : 'text-ink'}`}>You're on the list.</div>
      <p className={`font-body text-lg ${dark ? 'text-cream/70' : 'text-ink/65'}`}>Expect a mockup in your inbox within 24 hours.</p>
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
        <select id="industry" name="industry" required value={form.industry} onChange={handle} className={base + ' cursor-pointer'}>
          <option value="" disabled>Select your industry</option>
          {['Restaurant / Bar / Cafe','Dental / Medical','Beauty & Wellness','Retail','Fitness / Gym','Real Estate','Other'].map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="inspiration" className={label}>Inspiration URLs <span className={`normal-case tracking-normal font-normal ${dark ? 'text-cream/65' : 'text-ink/55'}`}>(optional)</span></label>
        <textarea id="inspiration" name="inspiration" rows={3} value={form.inspiration} onChange={handle}
          placeholder="Share links to sites you love the look of. This helps a ton."
          className={base + ' resize-none'} />
      </div>
      <div>
        <label htmlFor="message" className={label}>Anything else? <span className={`normal-case tracking-normal font-normal ${dark ? 'text-cream/65' : 'text-ink/55'}`}>(optional)</span></label>
        <textarea id="message" name="message" rows={3} value={form.message} onChange={handle}
          placeholder="Tell me about your business, your goals, whatever helps."
          className={base + ' resize-none'} />
      </div>
      <button type="submit"
        className="btn-primary w-full bg-coral text-cream font-body font-semibold py-4 rounded-xl text-base cursor-pointer">
        Send It →
      </button>
    </form>
  )
}
