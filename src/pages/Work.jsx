import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import WorksGallery from '../components/WorksGallery'

export default function Work() {
  return (
    <>
      <section className="bg-ink pt-32 pb-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="display text-fluid-xl text-cream mb-6">The Work.</h1>
          <p className="font-body text-cream/70 text-lg max-w-md">
            Every project starts with a business that deserved better online. Hover to preview, click for the full story.
          </p>
        </div>
      </section>

      <section className="bg-ink pb-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <WorksGallery projects={projects} />
        </div>
      </section>

      <section className="bg-coral py-20 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="display text-fluid-lg text-cream mb-6">Want to be next?</h2>
          <p className="font-body text-cream/70 text-lg mb-8">Free mockup. 24 hours. No obligation.</p>
          <Link to="/#contact"
            className="btn-primary inline-block bg-cream text-coral font-body font-semibold px-10 py-4 rounded-full text-base cursor-pointer">
            Get My Free Mockup →
          </Link>
        </div>
      </section>
    </>
  )
}
