# ZenithRazor — Portfolio

Next.js 14 (App Router) portfolio site for ZenithRazor — Discord developer,
cloud/hosting engineer, and Server Head at Apexis.

## Stack

- Next.js 14 (App Router, TypeScript)
- No external UI libraries — plain CSS with design tokens in `app/globals.css`
- Custom WebGL shader background (`components/ShaderField.tsx`) — no dependencies
- Canvas 2D node-network animation (`components/NodeNetwork.tsx`)
- Three-dot navigation menu (`components/DotMenu.tsx`)

## Pages

- `/` — Home
- `/about` — About
- `/experience` — Experience (Apexis + GitHub)
- `/contact` — Contact (Discord: `zenithrazor`)

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

**Option A — Vercel CLI**

```bash
npm i -g vercel
vercel
```

Follow the prompts. Vercel auto-detects Next.js — no config needed beyond what's
in this repo.

**Option B — GitHub + Vercel dashboard**

1. Push this project to a GitHub repository.
2. Go to https://vercel.com/new and import the repository.
3. Framework preset: Next.js (auto-detected). Leave build settings as default.
4. Deploy.

**Custom domain (zenithrazor.com)**

In the Vercel project → Settings → Domains, add `zenithrazor.com` and follow the
DNS instructions Vercel provides (usually an A record or CNAME at your
registrar).

## Editing content

- Home page copy: `app/page.tsx`
- About page copy: `app/about/page.tsx`
- Experience (Apexis / GitHub): `app/experience/page.tsx`
- Contact details: `app/contact/page.tsx`
- Site-wide colors/fonts: `app/globals.css` (`:root` variables at the top)
- Nav items: `components/DotMenu.tsx` (`NAV_ITEMS` array)
