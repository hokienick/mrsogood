'use client'
import { useState } from 'react'
import Link from 'next/link'
import BrowserChrome from './BrowserChrome'

function PreviewPlaceholder({ project }) {
  return (
    <div
      className="w-full h-full flex items-center justify-center p-6"
      style={{ background: `linear-gradient(145deg, ${project.color} 0%, ${project.accent}40 100%)` }}
    >
      <div className="w-full max-w-[280px] rounded-lg overflow-hidden border border-white/10 shadow-lg">
        <div className="h-2 bg-white/10" />
        <div className="p-4 space-y-2 bg-black/20">
          <div className="h-2 w-2/3 rounded bg-white/25" />
          <div className="h-8 w-full rounded bg-white/12" />
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            <div className="h-6 rounded bg-white/10" />
            <div className="h-6 rounded bg-white/10" />
            <div className="h-6 rounded bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProjectCard({ project: p, className = '' }) {
  const [imgFailed, setImgFailed] = useState(false)
  const previewUrl = p.previewUrl || 'preview.mrsogood.com'
  const showImage = p.image && !imgFailed

  return (
    <Link
      href={`/work/${p.slug}`}
      className={`project-card group block bg-white rounded-2xl overflow-hidden border border-ink/10 cursor-pointer ${className}`}
    >
      {/* Visual-first: unobstructed preview, no text overlay */}
      <div className="overflow-hidden bg-[#111]">
        <BrowserChrome url={previewUrl} colored={showImage} />
        <div className="relative aspect-[16/10] overflow-hidden">
          {showImage ? (
            <img
              src={p.image}
              alt={`${p.name} website redesign preview`}
              loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <PreviewPlaceholder project={p} />
          )}
        </div>
      </div>

      {/* Copy lives on solid white: full contrast, no fight with screenshot */}
      <div className="p-6 border-t border-ink/8">
        <span className="inline-block font-body text-base font-semibold uppercase tracking-widest text-coral bg-coral/10 px-2.5 py-1 rounded-md mb-4">
          {p.industry}
        </span>
        <h3 className="display text-[clamp(1.375rem,2.5vw,1.75rem)] text-ink leading-[1.12]">
          {p.name}
        </h3>
        <p className="font-body text-base text-sand mt-2.5 mb-5">{p.location}</p>
        <div className="flex items-center gap-2 text-coral font-body text-base font-semibold transition-all duration-200 group-hover:gap-3">
          View case study
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
