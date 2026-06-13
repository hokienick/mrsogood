import { projects } from '../data/projects'

export default function sitemap() {
  const base = 'https://www.mistersogood.com'
  const now = new Date().toISOString()

  const staticPages = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/work`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ]

  const caseStudyPages = projects.map((p) => ({
    url: `${base}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  return [...staticPages, ...caseStudyPages]
}
