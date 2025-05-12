import { siteConfig } from '@/lib/metadata'

export function HomeJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    },
    "description": siteConfig.description,
    "publisher": {
      "@type": "Organization",
      "name": "Trimix",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.url}/logo.png`
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}