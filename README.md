<div align="center">

<img src="public/images/optimized/hero.webp" alt="Maison Cocktail" width="100%" style="border-radius: 8px; margin-bottom: 20px;" />

# 🍸 Maison Cocktail

### Premium Parisian Cocktail Bar Experience

<p align="center">
  <a href="https://maisoncocktail.vercel.app"><img src="https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-ff6b6b?style=for-the-badge" alt="Live Demo" /></a>
  <a href="https://github.com/DaniilK19/cocktails_bar_landing/actions"><img src="https://img.shields.io/github/actions/workflow/status/DaniilK19/cocktails_bar_landing/ci.yml?style=for-the-badge&logo=github&label=CI%2FCD" alt="CI/CD" /></a>
  <a href="https://maisoncocktail.vercel.app"><img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel" alt="Vercel" /></a>
</p>

<p align="center">
  <strong>Elegant landing page showcasing premium cocktails with smooth animations and modern design</strong>
</p>

</div>

<br />

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎨 **Design & UX**
- Parisian luxury aesthetic
- Smooth scroll animations (Lenis)
- Interactive cocktail gallery
- Dark mode support
- Mobile-first responsive design

</td>
<td width="50%">

### ⚡ **Performance**
- Next.js 15 with Turbopack
- Edge Runtime APIs
- Optimized WebP/AVIF images
- Perfect Lighthouse scores
- SEO optimized with rich snippets

</td>
</tr>
<tr>
<td width="50%">

### 🛠️ **Features**
- Online table booking system
- Form validation (Zod + React Hook Form)
- Dynamic cocktail detail pages
- Contact information & hours
- Google Analytics integration

</td>
<td width="50%">

### 🧪 **Quality**
- TypeScript strict mode
- Unit tests (Jest + RTL)
- E2E tests (Playwright)
- Automated CI/CD pipeline
- ESLint + Prettier

</td>
</tr>
</table>

<br />

## 🚀 Tech Stack

<div align="center">

### Core Technologies

<p>
  <img src="https://img.shields.io/badge/Next.js-15.4.5-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
</p>

### Animation & Effects

<p>
  <img src="https://img.shields.io/badge/Framer_Motion-12.23-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/GSAP-3.13-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
  <img src="https://img.shields.io/badge/Lenis-1.1-FF6B6B?style=for-the-badge" alt="Lenis" />
</p>

### Development & Testing

<p>
  <img src="https://img.shields.io/badge/Jest-29.7-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest" />
  <img src="https://img.shields.io/badge/Playwright-1.50-2EAD33?style=for-the-badge&logo=playwright&logoColor=white" alt="Playwright" />
  <img src="https://img.shields.io/badge/ESLint-9.0-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
</p>

</div>

<br />

## 📦 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

<br />

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create optimized production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint for code quality |
| `npm test` | Run Jest unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate test coverage report |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run test:e2e:ui` | Run E2E tests with UI mode |
| `npm run test:all` | Run all tests (unit + E2E) |

<br />

## 📁 Project Structure

```
cocktails_bar_landing/
│
├── app/                      # Next.js App Router
│   ├── api/                  # API routes (Edge Runtime)
│   │   ├── bookings/         # Booking form API
│   │   └── cocktails/        # Cocktail data API
│   ├── cocktails/[id]/       # Dynamic cocktail pages
│   ├── layout.tsx            # Root layout with providers
│   └── page.tsx              # Main landing page
│
├── components/               # React components
│   ├── sections/             # Page sections
│   │   ├── Hero.tsx          # Hero section with animations
│   │   ├── CocktailGrid.tsx  # Interactive cocktail gallery
│   │   ├── About.tsx         # About section
│   │   ├── FAQ.tsx           # FAQ accordion
│   │   └── Contact.tsx       # Contact & booking
│   ├── layout/               # Layout components
│   │   ├── Header.tsx        # Navigation header
│   │   └── Footer.tsx        # Footer with links
│   ├── ui/                   # Reusable UI components
│   │   ├── BookingForm.tsx   # Table booking form
│   │   ├── CocktailCard.tsx  # Cocktail card component
│   │   ├── OptimizedImage.tsx # Image optimization wrapper
│   │   └── InternalLink.tsx  # Link with prefetch
│   ├── providers/            # Context providers
│   │   ├── ThemeProvider.tsx # Dark mode provider
│   │   └── LenisProvider.tsx # Smooth scroll provider
│   ├── seo/                  # SEO components
│   │   └── StructuredData.tsx # JSON-LD schema
│   └── analytics/            # Analytics integration
│       └── GoogleAnalytics.tsx
│
├── hooks/                    # Custom React hooks
│   ├── useOptimizedMouseMove.ts
│   ├── useThrottledScroll.ts
│   ├── useMediaQuery.ts
│   ├── useMobileDetect.ts
│   ├── useIntersectionObserver.ts
│   └── useSmoothScroll.ts
│
├── lib/                      # Utilities & config
│   ├── utils.ts              # Tailwind class merger
│   ├── gsap.ts               # GSAP configuration
│   └── analytics-config.ts   # Analytics setup
│
├── data/                     # Static data
│   └── cocktails.ts          # Cocktail database
│
├── types/                    # TypeScript types
│   └── booking.ts            # Booking form types
│
├── public/                   # Static assets
│   └── images/optimized/     # Optimized WebP images
│
├── e2e/                      # Playwright E2E tests
├── __tests__/                # Jest unit tests
├── .github/workflows/        # CI/CD pipelines
└── CLAUDE.md                 # Project documentation
```

<br />

## 🎨 Design System

### Color Palette

```css
/* Aristocrat Colors - Premium Neutrals */
--aristocrat-white:   #FEFEFE
--aristocrat-cream:   #F5F3F0
--aristocrat-gray:    #E8E6E3
--aristocrat-charcoal: #2A2826
--aristocrat-obsidian: #1A1816
--aristocrat-void:    #0F0D0C

/* Cocktail Colors - Vibrant Accents */
--cocktail-red:    #DC2626
--cocktail-orange: #EA580C
--cocktail-yellow: #F59E0B
--cocktail-green:  #10B981
--cocktail-blue:   #3B82F6
--cocktail-purple: #8B5CF6
```

### Custom Animations

- **float** - Gentle floating effect
- **liquid** - Liquid wave animation
- **shimmer** - Shimmer effect for cards
- **gradient-shift** - Smooth gradient transitions
- **gentle-glow** - Subtle glow effect

<br />

## 🚀 Deployment

The app is automatically deployed to Vercel on every push to `main` branch.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/DaniilK19/cocktails_bar_landing)

### Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

<br />

## 📊 Performance

- **100** - Performance (Lighthouse)
- **100** - Accessibility (Lighthouse)
- **100** - Best Practices (Lighthouse)
- **100** - SEO (Lighthouse)

### Optimization Techniques

- Edge Runtime for API routes
- Dynamic imports for heavy components
- WebP/AVIF image formats
- Aggressive CDN caching
- Font optimization with `next/font`
- Preloading critical assets
- Tree-shaking and code splitting

<br />

## 🧪 Testing

### Unit Tests (Jest + React Testing Library)

```bash
npm test                 # Run all unit tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report (70% threshold)
```

### E2E Tests (Playwright)

```bash
npm run test:e2e         # Run E2E tests
npm run test:e2e:ui      # Interactive UI mode
npm run test:e2e:headed  # See browser while testing
```

Tests run on:
- Chromium (Desktop & Mobile)
- Firefox
- WebKit (Safari)

<br />

## 📝 Documentation

Detailed development documentation is available in [CLAUDE.md](CLAUDE.md), including:

- Development workflow
- Architecture patterns
- Component guidelines
- Performance optimization
- CI/CD pipeline details

<br />

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](.github/CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

<br />

## 📄 License

This project is open source and available under the MIT License.

<br />

---

<div align="center">

### 💎 Crafted with precision and passion

**Made with Next.js, TypeScript & Love**

[⭐ Star this repo](https://github.com/DaniilK19/cocktails_bar_landing) • [🐛 Report Bug](https://github.com/DaniilK19/cocktails_bar_landing/issues) • [✨ Request Feature](https://github.com/DaniilK19/cocktails_bar_landing/issues)

</div>
