# Flight Air — Flight Booking Landing Page

A single-page, fully static flight ticket booking marketing site with a mock
search experience. Built with **Vite + React + TypeScript**, **Tailwind CSS
v4**, **Magic UI** components (on top of shadcn/ui), and **Framer Motion**.

There is **no backend** — the search form validates input client-side and
renders realistic mock flight results from local data.

## ✨ Features

- Sticky, responsive navbar with an animated light/dark theme toggle
- Hero section with an animated aurora headline, blur-in subheadline, retro
  grid background, and a glassmorphism flight search card
- Round-trip / one-way toggle, animated from/to swap, date pickers, and a
  passenger selector
- Client-side validation with inline error messages
- ~800ms shimmer loading state before mock flight results appear, sorted by
  price
- Popular destinations & testimonials marquees (pause on hover)
- Bento-grid feature highlights with animated number counters
- 3-step "How it works" section with scroll-triggered blur-fade reveals
- Interactive spinning globe highlighting global route coverage
- CTA banner with animated gradient text and a particles/meteors background
- Footer with column links and a dock-style social bar
- Respects `prefers-reduced-motion` throughout

## 🧱 Tech Stack

- [Vite](https://vite.dev/) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [shadcn/ui](https://ui.shadcn.com/) CLI + [Magic UI](https://magicui.design/) components
- [Framer Motion](https://www.framer.com/motion/) / Motion for animations
- [lucide-react](https://lucide.dev/) for icons

## 📂 Project Structure

```
src/
  components/
    ui/                   # Magic UI / shadcn primitives (generated via CLI)
    icons/                # Small custom inline SVG brand icons
    Navbar.tsx
    Hero.tsx
    FlightSearchCard.tsx  # The glassmorphism search form
    FlightResults.tsx     # Mock results + loading skeleton
    Destinations.tsx
    Features.tsx
    HowItWorks.tsx
    GlobeSection.tsx
    Testimonials.tsx
    CtaBanner.tsx
    Footer.tsx
  context/
    FlightSearchContext.tsx  # Search form state, validation, mock search
  data/
    flights.ts             # Cities + mock flight result generator
    destinations.ts        # Popular destination cards
  lib/
    utils.ts               # `cn` classname helper
  App.tsx                  # Composes every section
  index.css                # Tailwind v4 theme tokens + base styles
```

## 🚀 Getting Started

**Requirements:** Node.js 18.18+ (Node 20 LTS recommended)

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## 🏗️ Build for Production

```bash
npm run build
```

This runs a TypeScript project build followed by a Vite production build,
outputting fully static assets to `dist/`. Preview the production build
locally with:

```bash
npm run preview
```

## ☁️ Deploying (Vercel / Netlify)

This is a pure static site (`dist/`), so any static host works.

### Vercel

1. Import the repository in Vercel.
2. Framework preset: **Vite**.
3. Build command: `npm run build`
4. Output directory: `dist`

Or via CLI:

```bash
npm i -g vercel
vercel --prod
```

### Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`

Or via CLI:

```bash
npm i -g netlify-cli
netlify deploy --build --prod
```

## 🧩 Adding More Magic UI Components

This project's shadcn/ui config (`components.json`) is already wired up for
Tailwind v4 + the `@` path alias. To add another Magic UI component:

```bash
npx shadcn@latest add "https://magicui.design/r/<component-name>"
```

## ♿ Accessibility & Motion

All Magic UI animated primitives and custom animations respect
`prefers-reduced-motion` — see the media query in `src/index.css` and the
built-in reduced-motion handling inside components like `RetroGrid`.

## 📝 Notes on Mock Data

- `src/data/flights.ts` exposes a deterministic `generateMockResults(from, to)`
  helper that produces 5 pseudo-random (but stable per route) flight results,
  sorted by price ascending.
- `src/data/destinations.ts` powers the Popular Destinations marquee.
- No network requests are made anywhere in the app.
