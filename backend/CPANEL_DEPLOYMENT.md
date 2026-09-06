# AIPREDICTIONS Backend — cPanel Deployment

## Requirements
- cPanel account with Node.js application / Passenger support
- Node.js 18.17+ (20 LTS recommended)
- MySQL database
- SSL/HTTPS
- No Docker, Redis, RabbitMQ, Supervisor, systemd, root access, or PM2-only dependency is required.

## Deployment
1. Upload the `backend` directory to the cPanel application directory.
2. Create a MySQL database and database user in cPanel.
3. Configure the Node.js application to use the backend entrypoint from `src/server.ts` after compiling TypeScript, or the compiled JavaScript entrypoint produced by your selected build process.
4. Install dependencies with `npm install`.
5. Set production environment variables from `.env.example` in cPanel's environment-variable interface; do not upload real `.env` secrets to GitHub.
6. Run `npm run db:generate` and `npm run db:deploy` after a reviewed Prisma migration history is present.
7. Start/restart the cPanel Node.js application.
8. Verify `GET /api/v1/health`.

## Important
External sports-data, SMTP, AI, payment and WhatsApp services are adapter/configuration points. Live credentials must be supplied by the operator. The backend intentionally does not fabricate provider success.

## Frontend
Set the existing Next.js frontend variable `NEXT_PUBLIC_API_URL` to the deployed backend base URL ending in `/api/v1`. The backend is isolated under `/backend` and does not replace the existing frontend.
