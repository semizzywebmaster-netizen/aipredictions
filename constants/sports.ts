export type SportType = 'football' | 'basketball'

export interface SportConfig {
  id: SportType
  name: string
  color: string
  lightColor: string
  darkColor: string
  mutedColor: string
  icon: string
  description: string
}

export const SPORTS_CONFIG: Record<SportType, SportConfig> = {
  football: {
    id: 'football',
    name: 'Football',
    color: '#059669',
    lightColor: '#10b981',
    darkColor: '#047857',
    mutedColor: '#ecfdf5',
    icon: '⚽',
    description: 'Premier predictions for world football',
  },
  basketball: {
    id: 'basketball',
    name: 'Basketball',
    color: '#EA580C',
    lightColor: '#fb923c',
    darkColor: '#c2410c',
    mutedColor: '#fff7ed',
    icon: '🏀',
    description: 'Elite basketball intelligence',
  },
}

export const FOOTBALL_COMPETITIONS_EXAMPLES = [
  'Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1',
  'UEFA Champions League', 'Europa League', 'Conference League',
  'FA Cup', 'MLS', 'Saudi Pro League', 'Brasileirão',
]

export const BASKETBALL_COMPETITIONS_EXAMPLES = [
  'NBA', 'WNBA', 'NCAA Men', 'NCAA Women', 'EuroLeague',
  'EuroCup', 'ACB/Liga Endesa', 'Basketball Bundesliga',
]

export const FOOTBALL_MARKETS = [
  '1X2', 'Double Chance', 'Over/Under', 'BTTS', 'Draw No Bet',
  'Asian Handicap', 'Correct Score', 'Half-Time', 'Team Goals', 'Corners', 'Cards'
]

export const BASKETBALL_MARKETS = [
  'Moneyline', 'Point Spread', 'Over/Under', 'Team Totals',
  'Quarter Markets', 'Half Markets', 'Player Props'
]
