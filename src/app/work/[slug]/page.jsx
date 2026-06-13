import { projects } from '../../../data/projects'
import CaseStudy from '../../../views/CaseStudy'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }) {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) return {}
  return {
    title: project.name,
    description: `${project.tagline} See how Mr. So Good redesigned the website for ${project.name}, a ${project.industry} in ${project.location}.`,
    alternates: { canonical: `https://www.mistersogood.com/work/${project.slug}` },
    openGraph: {
      title: `${project.name} · Mr. So Good`,
      description: `${project.tagline} See how Mr. So Good redesigned the website for ${project.name}.`,
      url: `https://www.mistersogood.com/work/${project.slug}`,
      images: [{ url: project.thumbnail, alt: project.name }],
    },
  }
}

export default CaseStudy
