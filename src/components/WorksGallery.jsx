import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import GalleryVideoCard, { GalleryInfoPanel } from './GalleryVideoCard'

const FLEX_EXPANDED = 2.2
const FLEX_COLLAPSED = 0.75
const KEN_CLUB_ASPECT = 900 / 1200

function getExpandedCardWidth(rowWidth, cardCount, gapPx) {
  const gaps = gapPx * (cardCount - 1)
  const available = rowWidth - gaps
  const totalFlex = FLEX_EXPANDED + FLEX_COLLAPSED * (cardCount - 1)
  return available * (FLEX_EXPANDED / totalFlex)
}

export default function WorksGallery({ projects, compact = false }) {
  const [hoveredSlug, setHoveredSlug] = useState(null)
  const rowRef = useRef(null)
  const infoMeasureRef = useRef(null)
  const [syncSizes, setSyncSizes] = useState(null)

  useLayoutEffect(() => {
    if (compact) return

    const row = rowRef.current
    if (!row) return

    const measure = () => {
      const rowWidth = row.clientWidth
      if (rowWidth <= 0) return

      const styles = getComputedStyle(row)
      const gapPx = parseFloat(styles.columnGap || styles.gap || '16') || 16
      const expandedWidth = getExpandedCardWidth(rowWidth, projects.length, gapPx)
      const previewHeight = expandedWidth * KEN_CLUB_ASPECT
      const infoHeight = infoMeasureRef.current?.offsetHeight ?? 168

      setSyncSizes({
        previewHeight: Math.round(previewHeight),
        totalHeight: Math.round(previewHeight + infoHeight),
      })
    }

    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(row)
    window.addEventListener('resize', measure)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [compact, projects.length])

  const sampleProject = projects[0]

  return (
    <div className={compact ? '' : 'works-gallery relative'}>
      {!compact && sampleProject ? (
        <div ref={infoMeasureRef} className="pointer-events-none absolute left-0 top-0 w-full opacity-0" aria-hidden="true">
          <GalleryInfoPanel project={sampleProject} visible flush />
        </div>
      ) : null}

      <div
        ref={rowRef}
        className={[
          compact
            ? 'grid grid-cols-1 sm:grid-cols-2 gap-4'
            : 'flex flex-col lg:flex-row gap-3 md:gap-4 lg:items-stretch',
          !compact && 'overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none pb-2 lg:pb-0',
        ].join(' ')}
      >
        {projects.map((project) => (
          <GalleryVideoCard
            key={project.slug}
            project={project}
            compact={compact}
            syncSizes={syncSizes}
            isHovered={hoveredSlug === project.slug}
            isExpanded={!compact}
            onHoverChange={(hovered) => setHoveredSlug(hovered ? project.slug : null)}
          />
        ))}
      </div>
    </div>
  )
}
