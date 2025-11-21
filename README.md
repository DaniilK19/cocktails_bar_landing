<div align="center">

# Maison Cocktail

Premium cocktail bar landing page

[![CI](https://github.com/DaniilK19/cocktails_bar_landing/actions/workflows/ci.yml/badge.svg)](https://github.com/DaniilK19/cocktails_bar_landing/actions)
[![Vercel](https://img.shields.io/badge/vercel-deployed-000?logo=vercel)](https://maisoncocktail.vercel.app)

[Live Demo →](https://maisoncocktail.vercel.app)

</div>

## Stack

- **Next.js 15** — App Router, Edge Runtime
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling
- **Framer Motion** — Animations
- **GSAP** — Scroll effects

## Features

- Interactive cocktail gallery
- Online table booking
- Smooth scrolling & animations
- SEO optimized
- Responsive design

## Development

```bash
npm install
npm run dev
```

```bash
npm run build    # Production build
npm run lint     # ESLint
npm test         # Unit tests
npm run test:e2e # E2E tests
```

## Architecture

```
app/              # Next.js routes
  ├─ api/         # Edge API routes
  └─ cocktails/   # Dynamic pages
components/       # React components
  ├─ sections/    # Page sections
  ├─ ui/          # UI components
  └─ providers/   # Context providers
hooks/            # Custom hooks
lib/              # Utilities
data/             # Static data
```

See [CLAUDE.md](CLAUDE.md) for detailed documentation.

---

<div align="center">

Built with Next.js & TypeScript

</div>
