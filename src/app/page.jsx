import Home from '../views/Home'
import Script from 'next/script'

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': 'https://www.mistersogood.com/#business',
      name: 'Mr. So Good',
      url: 'https://www.mistersogood.com',
      description: 'Web design for small businesses. Free mockup in 24 hours, fast turnaround, no agency markup.',
      areaServed: { '@type': 'Country', name: 'United States' },
      serviceType: 'Web Design',
      priceRange: '$$',
      image: 'https://www.mistersogood.com/nick.JPG',
      founder: { '@id': 'https://www.mistersogood.com/#nick' },
    },
    {
      '@type': 'Person',
      '@id': 'https://www.mistersogood.com/#nick',
      name: 'Nick',
      jobTitle: 'Web Designer',
      worksFor: { '@id': 'https://www.mistersogood.com/#business' },
      url: 'https://www.mistersogood.com',
      image: 'https://www.mistersogood.com/nick.JPG',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.mistersogood.com/#website',
      url: 'https://www.mistersogood.com',
      name: 'Mr. So Good',
      publisher: { '@id': 'https://www.mistersogood.com/#business' },
    },
  ],
}

export default function Page() {
  return (
    <>
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Home />
    </>
  )
}
