import { useParams, Link } from 'react-router-dom'
import { projects } from '../data/projects'

export default function CaseStudy() {
  const { slug } = useParams()
  const p = projects.find(x => x.slug === slug)

  if (!p) return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div>
        <h1 className="display text-fluid-lg text-ink mb-4">Not found.</h1>
        <Link to="/work" className="nav-link font-body text-coral font-semibold cursor-pointer">← Back to Work</Link>
      </div>
    </div>
  )

  return (
    <>
      <section className="pt-32 pb-20 px-6 md:px-10" style={{ background: p.color }}>
        <div className="max-w-7xl mx-auto">
          <Link to="/work" className="inline-flex items-center gap-2 font-body text-base text-white/40 hover:text-white mb-10 transition-colors cursor-pointer">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Work
          </Link>
          <p className="font-body text-base font-semibold uppercase tracking-widest text-white/40 mb-2">{p.industry} · {p.location}</p>
          <h1 className="display text-fluid-xl text-white">{p.name}</h1>
        </div>
      </section>

      <section className="bg-cream py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {/* Before */}
            <div>
              <div className="rounded-2xl overflow-hidden bg-ink mb-3">
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/8">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="h-64 bg-gradient-to-br from-ink to-sand/30 flex items-center justify-center">
                  <p className="font-body text-white/20 text-base">Screenshot placeholder</p>
                </div>
              </div>
              <p className="font-body text-base font-semibold uppercase tracking-widest text-sand">Before</p>
            </div>
            {/* After */}
            <div>
              <div className="rounded-2xl overflow-hidden bg-ink mb-3">
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/8">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="h-64 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${p.color}, ${p.accent})` }}>
                  <p className="font-body text-white/40 text-base">Staging preview</p>
                </div>
              </div>
              <p className="font-body text-base font-semibold uppercase tracking-widest text-coral">After</p>
            </div>
          </div>

          <div className="max-w-2xl">
            <p className="font-body text-base font-semibold uppercase tracking-widest text-coral mb-4">The Transformation</p>
            <h2 className="display text-fluid-md text-ink mb-6">How we got there.</h2>
            <p className="font-body text-sand text-lg leading-relaxed">{p.description}</p>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="display text-fluid-lg text-cream mb-4">Want results like this?</h2>
          <p className="font-body text-cream/40 text-lg mb-8">Free mockup. No commitment. No cost.</p>
          <Link to="/#contact"
            className="btn-primary inline-block bg-coral text-cream font-body font-semibold px-10 py-4 rounded-full text-base cursor-pointer">
            Get My Free Mockup →
          </Link>
        </div>
      </section>
    </>
  )
}
