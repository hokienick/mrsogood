import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export function GalleryInfoPanel({ project, visible, flush = false, className = '' }) {
  return (
    <div
      className={[
        'w-full p-5 md:p-6',
        flush
          ? 'bg-[#0f0c0a]/95 backdrop-blur-md shadow-[0_-12px_32px_rgba(0,0,0,0.45)] border-x-0 border-b-0 border-t border-white/15'
          : 'backdrop-blur-xl bg-black/25 shadow-2xl rounded-2xl border border-white/10',
        flush ? 'rounded-none' : '',
        'transition-opacity duration-700 ease-out',
        flush ? '' : 'transition-all duration-700 ease-out',
        visible ? 'opacity-100' : flush ? 'opacity-0 invisible' : 'translate-y-4 opacity-0',
        className,
      ].join(' ')}
    >
      <p className="font-body text-base font-semibold uppercase tracking-[0.22em] text-coral mb-2">
        {project.industry}
      </p>
      <h3 className="display text-lg md:text-xl text-white uppercase tracking-tight leading-none mb-1">
        {project.name}
      </h3>
      <p className="font-body text-base text-white/65 mb-4">{project.location}</p>
      <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
        <span className="font-body text-base uppercase tracking-widest text-white/50">View case study</span>
        <svg className="w-4 h-4 text-coral shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  )
}

export default function GalleryVideoCard({
  project,
  isHovered,
  isExpanded,
  onHoverChange,
  compact = false,
  syncSizes = null,
}) {
  const videoRef = useRef(null)
  const expanded = isExpanded && isHovered
  const revealWidth = project.previewFit === 'reveal'

  useEffect(() => {
    const video = videoRef.current
    if (!video || !project.video) return

    if (isHovered) {
      video.currentTime = 0
      video.play().catch(() => {})
    } else {
      video.pause()
      video.currentTime = 0
    }
  }, [isHovered, project.video])

  const syncedHeight = syncSizes?.totalHeight
  const syncedPreviewHeight = syncSizes?.previewHeight

  const cardStyle =
    !compact && syncedHeight
      ? { height: `${syncedHeight}px` }
      : undefined

  const previewStyle =
    revealWidth && syncedPreviewHeight
      ? { height: `${syncedPreviewHeight}px` }
      : undefined

  const collapsedPreviewStyle = project.previewObjectPosition
    ? { objectPosition: project.previewObjectPosition, transformOrigin: project.previewObjectPosition }
    : undefined

  const collapsedPreviewClasses = (() => {
    if (project.previewObjectPosition) return ''
    switch (project.previewPosition) {
      case 'left top':
        return 'origin-top-left object-left-top'
      case 'left center':
        return 'origin-left object-[left_center]'
      default:
        return 'origin-center object-center'
    }
  })()

  const previewImage = (
    <img
      src={revealWidth ? project.thumbnail : (project.hoverImage || project.thumbnail)}
      alt=""
      className={[
        'transition-all duration-700',
        revealWidth
          ? 'absolute top-0 left-0 w-full h-auto'
          : 'w-full h-full object-cover object-top scale-105',
      ].join(' ')}
      aria-hidden="true"
    />
  )

  const thumbnailImage = (
    <img
      src={project.thumbnail}
      alt={`${project.name} preview`}
      className={[
        'w-full h-full transition-all duration-700',
        revealWidth
          ? 'object-cover object-left-top'
          : 'object-cover object-top',
        !isHovered && 'grayscale brightness-[0.72]',
      ].join(' ')}
      loading="lazy"
    />
  )

  return (
    <Link
      to={`/work/${project.slug}`}
      style={cardStyle}
      className={[
        'group relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] block',
        'cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral focus-visible:outline-offset-4',
        'transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
        compact ? 'h-[360px] w-full shrink-0' : syncedHeight ? 'w-full' : 'h-[520px] md:h-[580px] lg:h-[620px]',
        compact ? '' : 'lg:min-w-[160px]',
        compact ? '' : isHovered ? 'lg:flex-[2.2] lg:shadow-2xl lg:shadow-black/40' : 'lg:flex-[0.75] lg:opacity-90',
      ].join(' ')}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      onFocus={() => onHoverChange(true)}
      onBlur={() => onHoverChange(false)}
    >
      {revealWidth ? (
        <>
          {/* Collapsed: full-card cover preview */}
          <div
            className={[
              'absolute inset-0 overflow-hidden bg-[#1A1410] transition-opacity duration-700',
              isHovered ? 'pointer-events-none opacity-0' : 'opacity-100',
            ].join(' ')}
          >
            <img
              src={project.thumbnail}
              alt={`${project.name} preview`}
              style={collapsedPreviewStyle}
              className={`h-full w-full scale-[1.35] object-cover grayscale brightness-[0.72] transition-all duration-700 ${collapsedPreviewClasses}`}
              loading="lazy"
            />
          </div>

          {/* Expanded: website preview + info bar */}
          <div
            className={[
              'absolute inset-0 flex flex-col transition-opacity duration-700',
              isHovered ? 'opacity-100' : 'pointer-events-none opacity-0',
            ].join(' ')}
          >
            <div
              className="relative w-full shrink-0 overflow-hidden bg-[#1A1410]"
              style={previewStyle}
            >
              {previewImage}
            </div>
            <div className="w-full shrink-0" aria-hidden={!expanded}>
              <GalleryInfoPanel project={project} visible={expanded} flush />
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={[
              'absolute inset-0 transition-opacity duration-700',
              isHovered ? 'opacity-0' : 'opacity-100',
            ].join(' ')}
          >
            {thumbnailImage}
          </div>

          <div
            className={[
              'absolute inset-0 transition-opacity duration-700',
              isHovered ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
          >
            {project.video ? (
              <video
                ref={videoRef}
                className="w-full h-full object-cover scale-105"
                loop
                muted
                playsInline
                preload="metadata"
              >
                <source src={project.video} type="video/mp4" />
              </video>
            ) : (
              previewImage
            )}
          </div>

          <div
            className={[
              'absolute bottom-0 left-0 right-0 p-5 md:p-8 transition-all duration-700',
              expanded ? 'opacity-100' : 'opacity-0 pointer-events-none',
            ].join(' ')}
          >
            <GalleryInfoPanel project={project} visible={expanded} />
          </div>
        </>
      )}
    </Link>
  )
}
