import { Link } from 'react-router-dom'

const tiers = [
  {
    name: 'Redesign',
    price: '$600',
    yearly: '$100 / yr',
    tag: 'Most popular',
    desc: 'Your existing site, completely modernized.',
    features: ['Full visual redesign from your existing site','Mobile-responsive layout','Live staging preview in 24 hours*','Hosting included','Minor updates year-round (text, images)','Up to 3 pages of content'],
    out: ['Brand new functionality','SEO optimization'],
    highlight: true,
  },
  {
    name: 'New Build',
    price: '$700',
    yearly: '$100 / yr',
    tag: null,
    desc: "No website yet? We'll build one that turns heads.",
    features: ['Brand new site built from scratch','Mobile-responsive layout','Live staging preview in 24–48 hours*','Hosting included','Minor updates year-round (text, images)','Up to 3 pages of content'],
    out: ['Brand identity / logo design','SEO optimization'],
    highlight: false,
  },
  {
    name: 'Admin Dashboard',
    price: '+$100',
    yearly: 'one-time',
    tag: 'Add-on',
    desc: 'Edit your own content without touching code.',
    features: ['Secure login portal','Edit text, pricing, services','Swap images and photos','Changes go live instantly','Works with either plan above'],
    out: [],
    highlight: false,
  },
]

const faqs = [
  ['What does $100/yr cover?', 'Hosting and minor content updates: swapping photos, changing text, adjusting hours or pricing. It keeps your site live and current without you doing anything.'],
  ['What counts as "minor"?', 'Text changes, image swaps, small tweaks. If it takes more than 15–20 minutes or involves new functionality, that falls under a separate request.'],
  ["What if I don't like the mockup?", "Then we part ways as friends. The mockup is free and there's zero obligation. No invoice, no follow-up pressure."],
  ['What does 24 hours actually mean?', "You'll have a live staging link to review within 24 hours of submitting the form. This applies to 1–3 page sites. Larger projects may take a bit longer."],
  ['Do you offer SEO?', "Not currently. The focus is building a site that looks great and loads fast. Once your site looks the part, that's the right time to invest in SEO."],
]

export default function Pricing() {
  return (
    <>
      <section className="bg-ink pt-32 pb-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="display text-fluid-xl text-cream mb-6">Simple, Honest Pricing.</h1>
          <p className="font-body text-cream/70 text-lg max-w-md">No surprise invoices. No scope creep. Just a fair price for work that gets done.</p>
        </div>
      </section>

      <section className="bg-cream py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {tiers.map(t => (
              <div key={t.name}
                className={`card-hover rounded-2xl p-8 flex flex-col ${
                  t.highlight
                    ? 'bg-ink text-cream ring-2 ring-coral'
                    : 'bg-white border border-ink/8 text-ink'
                }`}>
                {t.tag && (
                  <span className={`self-start font-body text-base font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${
                    t.highlight ? 'bg-coral/20 text-coral' : 'bg-coral/10 text-coral'
                  }`}>{t.tag}</span>
                )}
                <p className="font-body text-base font-semibold uppercase tracking-widest text-coral mb-2">{t.name}</p>
                <div className={`display text-5xl leading-none mb-1 ${t.highlight ? 'text-cream' : 'text-ink'}`}>{t.price}</div>
                <p className={`font-body text-base mb-4 ${t.highlight ? 'text-cream/65' : 'text-ink/60'}`}>{t.yearly}</p>
                <p className={`font-body text-base leading-relaxed mb-6 ${t.highlight ? 'text-cream/80' : 'text-ink/65'}`}>{t.desc}</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {t.features.map(f => (
                    <li key={f} className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-coral flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={`font-body text-base ${t.highlight ? 'text-cream/80' : 'text-ink'}`}>{f}</span>
                    </li>
                  ))}
                  {t.out.map(f => (
                    <li key={f} className="flex items-start gap-3 opacity-30">
                      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="font-body text-base">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/#contact"
                  className={`btn-primary block text-center font-body font-semibold py-3.5 rounded-xl cursor-pointer ${
                    t.highlight ? 'bg-coral text-cream' : 'bg-ink text-cream'
                  }`}>
                  Get My Free Mockup →
                </Link>
              </div>
            ))}
          </div>
          <p className="font-body text-base text-ink/55">* 24-hour delivery applies to sites with 1–3 pages. Larger projects may take longer.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="display text-fluid-md text-ink mb-12">Common Questions.</h2>
          <div className="space-y-0">
            {faqs.map(([q, a]) => (
              <div key={q} className="py-7 border-b border-ink/8">
                <h3 className="font-body font-bold text-ink text-base mb-2">{q}</h3>
                <p className="font-body text-ink/60 text-base leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-coral py-20 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="display text-fluid-lg text-cream mb-4">Still on the fence?</h2>
          <p className="font-body text-cream/70 text-lg mb-8">The mockup is free. There's literally no risk. Let me show you what's possible.</p>
          <Link to="/#contact"
            className="btn-primary inline-block bg-cream text-coral font-body font-semibold px-10 py-4 rounded-full text-base cursor-pointer">
            Get My Free Mockup →
          </Link>
        </div>
      </section>
    </>
  )
}
