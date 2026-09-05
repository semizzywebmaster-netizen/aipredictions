import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/providers'

export const metadata: Metadata = {
  title: {
    default: 'PUNTER PREDICTION | Professional Sports Prediction Intelligence',
    template: '%s | PUNTER PREDICTION',
  },
  description: 'AI-powered football and basketball prediction platform with equal depth for both sports. Professional analytics, not guarantees.',
  keywords: ['football predictions', 'basketball predictions', 'sports AI', 'bet builder', 'NBA predictions', 'Premier League predictions'],
  authors: [{ name: 'PUNTER PREDICTION' }],
  creator: 'PUNTER PREDICTION',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'PUNTER PREDICTION',
  },
  robots: { index: true, follow: true },
  manifest: '/manifest.json',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
