# TPPG Public Website

Buyer-facing website for The Premier Property Group. Its goal is to turn Google/SEO traffic into leads for TPPG property specialists. The internal agent system lives in the separate `tppg-portal-updated-` repo.

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS v3
- Supabase (reads public-safe views; writes leads via a server API route)
- Leaflet for maps (client component on top of server-rendered listings)
- Deployed on Railway as its own service

## Getting started
```bash
npm install
cp .env.example .env.local   # fill in Supabase values
npm run dev
```

## Structure
```
app/            Routes (home, properties, locations, guides, about, specialists, contact, api)
components/     layout, home sections, properties, forms, map
lib/supabase/   public (anon) and server-only (service role) clients
lib/seo/        site constants + metadata helper
types/          shared TypeScript types
supabase/       SQL drafts: leads table, public views
docs/           the Portal and Website structure docs
```

## Rules
- Public pages query **public views only**, never raw Portal tables.
- `SUPABASE_SERVICE_ROLE_KEY` is server-only. Never import `getServiceClient` in a client component.
- Every page gets a unique title, description, canonical URL, and one `h1`.
- Only publish verified company figures and testimonials.

## Build order
Homepage sections one by one: Header, Hero + Search, Featured Properties, Property Types, Locations, Why TPPG, Find My Property, Guides, Specialists, Testimonials, Final CTA, Footer.

# TPPG---Home-Page

