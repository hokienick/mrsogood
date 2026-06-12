'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'

const ROW_VARIANTS = {
  hidden: { y: 24 },
  visible: (i) => ({
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.25, 0.4, 0.25, 1] },
  }),
}

function ProjectRow({ project: p, index }) {
  const even = index % 2 === 0

  return (
    <motion.div
      custom={index}
      variants={ROW_VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      <Link
        href={`/work/${p.slug}`}
        className="group block border-t border-chalk/10 py-10 md:py-14"
      >
        <div className={`flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 items-center ${even ? '' : 'md:flex-row-reverse'}`}>

          {/* Thumbnail */}
          <div
            className="w-full md:w-[55%] flex-shrink-0 overflow-hidden rounded-lg"
            style={{ aspectRatio: '16/10' }}
          >
            <img
              src={p.thumbnail}
              alt={p.name}
              className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-chalk/40 mb-3">
              {p.industry}&nbsp;·&nbsp;{p.location}
            </p>

            <h2
              className="display text-chalk leading-none mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.035em' }}
            >
              <span className="relative inline-block">
                {p.name}
                <span
                  className="absolute left-0 -bottom-1 h-[2px] w-0 group-hover:w-full transition-all duration-300 ease-out"
                  style={{ background: '#E86B3A' }}
                  aria-hidden="true"
                />
              </span>
            </h2>

            <p
              className="font-body text-chalk/60 text-base md:text-lg leading-relaxed mb-3 max-w-[48ch]"
              style={{ textWrap: 'pretty' }}
            >
              {p.tagline}
            </p>

            {p.afterUrl?.includes('vercel.app') && (
              <p className="font-body text-sm italic mb-6" style={{ color: '#E86B3A' }}>
                Own this business? Check your inbox.
              </p>
            )}

            <span className="font-body text-sm font-semibold inline-flex items-center gap-1.5 group-hover:gap-3 transition-all duration-200"
              style={{ color: '#E86B3A' }}>
              View case study
              <span aria-hidden="true">→</span>
            </span>
          </div>

        </div>
      </Link>
    </motion.div>
  )
}

export default function Work() {
  return (
    <>
      {/* Header */}
      <section className="bg-ink pt-32 pb-16 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            className="display text-chalk"
            style={{
              fontSize: 'clamp(3.5rem, 9vw, 8rem)',
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
            }}
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            The <span style={{ color: '#E86B3A' }}>Work.</span>
          </motion.h1>
          <motion.p
            className="font-body text-chalk/55 text-lg mt-6"
            initial={{ y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.25, 0.4, 0.25, 1] }}
          >
            Every project starts with a business that deserved better online.
          </motion.p>
        </div>
      </section>

      {/* Project rows */}
      <section className="bg-ink pb-8 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          {projects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} />
          ))}
          <div className="border-t border-chalk/10" />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <h2
            className="display text-chalk mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              letterSpacing: '-0.04em',
              lineHeight: 0.94,
            }}
          >
            Want to be next?
          </h2>
          <p className="font-body text-chalk/55 text-lg mb-10">
            Free mockup. 24 hours. No obligation.
          </p>
          <Link
            href="/#contact"
            className="inline-block font-body font-semibold px-10 py-4 rounded-full text-base cursor-pointer transition-colors duration-200"
            style={{ background: '#E86B3A', color: '#F7F6F3' }}
          >
            Get My Free Mockup
          </Link>
        </div>
      </section>
    </>
  )
}
