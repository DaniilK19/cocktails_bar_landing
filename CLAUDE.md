# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Maison Cocktail - A premium cocktail bar landing page built with Next.js 15.4.5, featuring elegant Parisian-inspired design, smooth animations, and optimized performance.

## Common Development Commands

### Core Development
```bash
# Start development server with Turbopack (fast refresh)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15.4.5 with App Router
- **Language**: TypeScript 5.0 with strict mode
- **Styling**: Tailwind CSS 3.4.4 with custom aristocrat-themed design tokens
- **Animations**: Framer Motion 12.23 + GSAP 3.13 for complex animations
- **Icons**: Lucide React
- **Deployment**: Vercel-optimized configuration

### Project Structure
```
cocktails_bar/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main landing page with lazy-loaded sections
│   ├── layout.tsx         # Root layout with providers and metadata
│   ├── globals.css        # Global styles and Tailwind imports
│   └── api/               # API routes
├── components/
│   ├── sections/          # Page sections (Hero, About, CocktailGrid, FAQ)
│   ├── layout/            # Header, Footer components
│   ├── providers/         # Theme, Lenis smooth scroll providers
│   ├── ui/                # Reusable UI components
│   ├── analytics/         # Google Analytics integration
│   └── seo/              # SEO components (StructuredData, SearchConsole)
├── data/                  # Static data (cocktails.ts, seo-content.ts)
├── lib/                   # Utilities and configurations
│   ├── analytics-config.ts
│   ├── gsap.ts           # GSAP initialization
│   └── utils.ts          # Utility functions (cn for className merging)
├── public/
│   └── images/           # Optimized images (.webp format)
└── types/                # TypeScript type definitions
```

### Key Architectural Patterns

1. **Dynamic Imports for Performance**: Heavy components (CocktailGrid, About) are lazy-loaded using Next.js dynamic imports with loading states.

2. **Component Organization**: 
   - Sections are self-contained in `components/sections/`
   - Each section handles its own animations and state
   - Providers wrap the entire app for theme and smooth scroll

3. **Styling Approach**:
   - Custom Tailwind theme with aristocrat color palette (white, cream, charcoal, gray, noir)
   - Utility-first CSS with component-specific classes
   - Responsive design with mobile-first approach

4. **Performance Optimizations**:
   - Image optimization with WebP/AVIF formats
   - Aggressive caching headers (1 year for static assets)
   - Package import optimization for framer-motion, gsap, lucide-react
   - Turbopack enabled for faster development builds

5. **SEO & Analytics**:
   - Comprehensive metadata in layout.tsx
   - Structured data for better search visibility
   - Google Analytics and Search Console integration
   - Sitemap generation (sitemap.ts)

### Environment Variables
Configure in `.env.local` (see .env.example):
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID
- `NEXT_PUBLIC_GSC_ID` - Google Search Console ID

### Important Configurations

**next.config.ts**: Contains image optimization, caching headers, security headers, and compiler optimizations.

**tailwind.config.ts**: Extended with custom aristocrat theme colors and fonts.

**tsconfig.json**: TypeScript strict mode enabled with path alias `@/*` for root imports.

### Development Notes
- Uses Turbopack for faster development builds (`--turbopack` flag)
- Console logs removed in production (except errors/warnings)
- All images should be in WebP format for optimization
- Components use Framer Motion for entrance animations
- GSAP used for complex scroll-triggered animations