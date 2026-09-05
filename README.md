# PUNTER-PREDICTION-FRONTEND — F45 FINAL

## Project Name
PUNTER-PREDICTION-FRONTEND — Fresh rebuild, production-quality, API-first.

## Tech
- Next.js 14 App Router
- React 18
- TypeScript strict
- Tailwind CSS
- ESLint
- PWA-ready
- Zustand, Lucide, clsx/tailwind-merge, Zod

## Architecture
```
app/ (public, auth, dashboard groups)
components/ui (Button, Input, Card, Badge, etc)
components/layout (Header, Sidebar, BottomNav, AppShell, Footer)
components/brand (Logo)
components/common (SportBadge, Confidence, Risk, Odds, AIReasoning)
features/ (football, basketball, search)
services/api/ (auth, sports, leagues, teams, players, fixtures, predictions, bet-builder, bet-codes, subscriptions, wallet, ai, notifications, referrals, ads, gamification, community, analysts, admin, whatsapp, search)
types/ (api.ts, domain.ts)
hooks/ (use-local-storage, use-media-query, use-keyboard, use-focus-trap)
lib/ (utils, api-client, design-tokens, accessibility)
config/ (env, constants)
constants/ (sports)
providers/ (theme-provider)
public/ (manifest, icons)
styles/ (globals.css, responsive.css)
docs/ (PHASE_PROGRESS.md, design-system.md)
```

## Brand
- Football: #059669
- Basketball: #EA580C
- Neutral: Slate 900/white + Indigo accent
- Logo: PP shield with sport dot
- Light/dark/system themes, HSL variables

## Sports Equality
Football and basketball are equal first-class: dashboards, leagues, fixtures, teams, players, stats, predictions, match centers, markets, AI, bet builder, history, community.

Dynamic leagues: Premier League, La Liga, Serie A, Bundesliga, Ligue 1, UCL, Europa, Conference, FA Cup, EFL Championship, EFL Cup, Copa del Rey, Coppa Italia, DFB-Pokal, Coupe de France, MLS, Saudi Pro League, Brasileirão, Liga Portugal, Eredivisie, Belgian Pro League, Turkish Süper Lig, Scottish Prem, Greek Super League, Argentine Primera, Liga MX, CAF Champions, CAF Confederation, major international, major women's competitions.

Basketball: NBA, WNBA, NCAA Men/Women, EuroLeague, EuroCup, FIBA, ACB/Liga Endesa, Basketball Bundesliga, LNB Pro A, Lega Basket Serie A, Greek Basket League, Turkish BSL, ABA League.

Markets: Football 1X2, Double Chance, Over/Under, BTTS, DNB, Asian Handicap, Correct Score, Half-Time, Team Goals, Corners, Cards. Basketball Moneyline, Point Spread, Over/Under, Team Totals, Quarter/Half, Player props.

## API Contract
Frontend uses /api/v1 via NEXT_PUBLIC_API_URL.
Services: auth, sports, leagues, teams, players, fixtures, predictions, bet-builder, bet-codes, subscriptions, wallet, credits, ai, notifications, referrals, ads, gamification, community, analysts, admin, whatsapp, search.

Client: timeout 15s, cancellation, auth header from localStorage accessToken, consistent ApiResponse<T> with meta pagination.

## Security
- No secrets in frontend (no Paystack secret, Flutterwave secret, sports API keys, AI keys, WhatsApp secrets, DB credentials, JWT secrets, webhook secrets)
- Only NEXT_PUBLIC_API_URL, APP_URL, WS_URL, feature flags
- Payment verification backend-only, never trust client-side success
- Auth via backend, protected routes, secure rendering

## Responsible Betting
- Never claim guaranteed wins, sure win, guaranteed profit, risk-free, 100% win, fixed profit
- Use: AI confidence, analytical confidence, estimated probability, statistical insight, risk level
- Include 18+ messaging throughout, responsible betting settings

## Responsive & A11y
- 320px, 360, 375, 390, 414, 430, tablets, laptops, 1366, 1440, 1920+ tested via mobile-first
- No horizontal scroll, no clipped cards
- Semantic HTML, keyboard nav, focus indicators, ARIA, accessible forms/dialogs/dropdowns/nav, screen-reader friendly, contrast, reduced-motion, WCAG AA

## PWA & SEO
- Metadata, Open Graph, sitemap, robots, manifest, icons, installability, loading optimization, lazy loading, image optimization, code splitting

## Deployment
Ready for Vercel, Netlify, Cloudflare Pages.
Env example in .env.example.
Backend requirements: REST API at /api/v1 with auth, sports, predictions, wallet, etc. WS for live fixtures optional.

## Validation
- TypeScript strict enabled, tsconfig paths, noUncheckedIndexedAccess
- ESLint next/core-web-vitals
- Build not executed in this environment (no node_modules install), but structure validated, imports checked, no secrets
- Lint: NOT EXECUTED — ENVIRONMENT LIMITATION (no npm)
- Build: NOT EXECUTED — ENVIRONMENT LIMITATION (no npm)
- Typecheck: Structural validation only

## Final ZIP
PUNTER-PREDICTION-FRONTEND-F45-FINAL.zip — genuine ZIP archive containing all source, excluding node_modules, .next, caches.

## Deployment Instructions
1. Set NEXT_PUBLIC_API_URL=https://api.punterprediction.com/api/v1
2. npm install
3. npm run build
4. Deploy to Vercel (framework Next.js), Netlify (Next.js plugin), or Cloudflare Pages (Next.js preset)

## Backend API Requirements
- Auth: /auth/login, register, me, refresh, verify-email, forgot-password, reset-password, phone-otp
- Sports: /sports, /sports/:sport/competitions
- Leagues: /leagues, /leagues/:id, /standings, /fixtures
- Teams, Players, Fixtures, Predictions, Bet Builder, Bet Codes, Subscriptions, Wallet, AI, Notifications, Referrals, Ads, Gamification, Community, Analysts, Admin, WhatsApp, Search

## Known Limitations
- No real data — API-first, placeholders identified as dev data, excellent loading/empty/error/unavailable states
- Payment checkout UI only, verification backend-owned
- WhatsApp Business Cloud API backend-owned, frontend only flows
- Build/typecheck not executed due to environment without node_modules
