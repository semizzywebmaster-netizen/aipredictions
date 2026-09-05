export type Sport = 'football' | 'basketball'
export type ConfidenceLevel = 'low' | 'medium' | 'high' | 'very_high'
export type RiskLevel = 'low' | 'medium' | 'high'

export interface League {
  id: string
  name: string
  slug: string
  sport: Sport
  country?: string
  logo?: string
  season: string
  isFeatured?: boolean
}

export interface Team {
  id: string
  name: string
  shortName: string
  slug: string
  sport: Sport
  leagueId: string
  logo?: string
  country?: string
  founded?: number
  stadium?: string
  coach?: string
}

export interface Player {
  id: string
  name: string
  slug: string
  sport: Sport
  teamId: string
  position?: string
  number?: number
  nationality?: string
  age?: number
  height?: string
  photo?: string
}

export interface Fixture {
  id: string
  sport: Sport
  leagueId: string
  homeTeam: Team
  awayTeam: Team
  date: string
  status: 'scheduled' | 'live' | 'ht' | 'ft' | 'postponed' | 'cancelled'
  score?: { home: number; away: number; htHome?: number; htAway?: number }
  minute?: number
  venue?: string
}

export interface Market {
  id: string
  name: string
  slug: string
  sport: Sport
  type: string
  outcomes: MarketOutcome[]
}

export interface MarketOutcome {
  id: string
  name: string
  odds: number
  probability?: number
}

export interface Prediction {
  id: string
  fixtureId: string
  sport: Sport
  leagueId: string
  market: string
  outcome: string
  odds: number
  confidence: number
  confidenceLevel: ConfidenceLevel
  risk: RiskLevel
  reasoning: string
  analysis?: string
  status: 'pending' | 'won' | 'lost' | 'void'
  createdAt: string
  fixture?: Fixture
}

export interface BetSelection {
  id: string
  fixtureId: string
  market: string
  outcome: string
  odds: number
  confidence: number
  sport: Sport
}

export interface BetBuilderState {
  selections: BetSelection[]
  totalOdds: number
  stake?: number
  estimatedReturn?: number
  strategy: 'conservative' | 'balanced' | 'aggressive'
  targetOdds?: number
}

export interface SubscriptionPlan {
  id: string
  name: string
  slug: string
  priceMonthly: number
  priceYearly: number
  currency: string
  features: string[]
  credits: number
  isPopular?: boolean
  isFree?: boolean
}

export interface Wallet {
  cashBalance: number
  creditBalance: number
  currency: string
}

export interface Transaction {
  id: string
  type: 'deposit' | 'withdrawal' | 'purchase' | 'reward' | 'refund'
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed'
  description: string
  createdAt: string
}

export interface AIConversation {
  id: string
  title: string
  sport?: Sport
  messages: AIMessage[]
  createdAt: string
}

export interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
  meta?: { confidence?: number; sources?: string[] }
}
