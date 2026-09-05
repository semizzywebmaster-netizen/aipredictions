import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://punterprediction.com'
  const routes = ['', '/football', '/basketball', '/predictions', '/bet-builder', '/about', '/how-it-works', '/responsible-betting', '/privacy', '/terms']
  return routes.map(route => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: route === '' ? 1 : 0.8 }))
}
