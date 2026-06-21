# NexDesk Marketing Site

Marketing website and client portal for [NexDesk](https://nexdesk.app) — custom business systems, websites, and AI automation.

## Stack

- Next.js 16 · TypeScript · Tailwind CSS v4
- Client portal + admin backend (mock data, Stripe-ready)
- Deployed on **GitHub Pages** (static) and **Vercel** (full API)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Client portal demo login

- Email: `demo@nexdesk.app`
- Password: `NexDesk2026!`

### Admin portal demo login

- Email: `admin@nexdesk.app`
- Password: `NexDeskAdmin2026!`

## GitHub Pages deployment

Pushes to `main` automatically deploy via GitHub Actions.

### Custom domain (`mynexdesk.com`)

1. In GitHub: **Settings → Pages → Custom domain** → enter `mynexdesk.com`
2. At your domain registrar, add these DNS records:

| Type  | Name | Value                |
|-------|------|----------------------|
| A     | @    | 185.199.108.153      |
| A     | @    | 185.199.109.153      |
| A     | @    | 185.199.110.153      |
| A     | @    | 185.199.111.153      |
| CNAME | www  | bigrocks67.github.io |

3. Enable **Enforce HTTPS** in GitHub Pages settings once DNS propagates.

> **Note:** GitHub Pages serves a static export. API routes (`/api/os/*`) only work on Vercel. Forms and live portal sync fall back to demo/mock data on GitHub Pages.

## Vercel deployment (full features)

```bash
npm run build
vercel --prod
```

## Test static export locally

```bash
npm run build:gh-pages
npx serve out
```
