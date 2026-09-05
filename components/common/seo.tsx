import type { Metadata } from 'next'

export function generateSportMetadata(sport: 'football' | 'basketball'): Metadata {
  const isFootball = sport === 'football'
  return {
    title: isFootball ? 'Football Predictions | PUNTER PREDICTION' : 'Basketball Predictions | PUNTER PREDICTION',
    description: isFootball ? 'Professional football prediction intelligence: Premier League, La Liga, Champions League. AI confidence, risk levels, responsible insights.' : 'Professional basketball prediction intelligence: NBA, EuroLeague, NCAA. AI confidence, risk levels, responsible insights.',
    openGraph: {
      title: isFootball ? 'Football Predictions' : 'Basketball Predictions',
      description: 'Equal depth for both sports. No guaranteed wins, only analytical insights.',
      type: 'website',
    },
  }
}
