import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StructuredData } from "@/components/seo/structured-data";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { SearchConsole } from "@/components/seo/search-console";
import { analyticsConfig } from "@/lib/analytics-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://maisoncocktail.fr'),
  title: "Maison Cocktail | Art de la Mixologie Française | Paris",
  description: "Découvrez l'art de la mixologie française avec notre collection exclusive de cocktails artisanaux. Maison Cocktail Paris - Une expérience raffinée depuis 1924.",
  keywords: "cocktail Paris, mixologie française, bar cocktail, spiritueux artisanaux, cocktails premium, dégustation Paris, Place Vendôme",
  authors: [{ name: "Maison Cocktail" }],
  creator: "Maison Cocktail",
  publisher: "Maison Cocktail",
  robots: "index, follow",
  alternates: {
    canonical: "https://maisoncocktail.fr"
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://maisoncocktail.fr",
    siteName: "Maison Cocktail",
    title: "Maison Cocktail | Art de la Mixologie Française | Paris",
    description: "Découvrez l'art de la mixologie française avec notre collection exclusive de cocktails artisanaux. Une expérience raffinée depuis 1924.",
    images: [
      {
        url: "/images/optimized/hero.webp",
        width: 1200,
        height: 630,
        alt: "Maison Cocktail - Art de la mixologie française"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@MaisonCocktail",
    creator: "@MaisonCocktail",
    title: "Maison Cocktail | Art de la Mixologie Française",
    description: "Découvrez l'art de la mixologie française avec notre collection exclusive de cocktails artisanaux.",
    images: ["/images/optimized/hero.webp"]
  },
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <StructuredData />
        <SearchConsole verificationCode={analyticsConfig.google.verificationCode} />
        {/* Enhanced performance optimizations */}
        <link rel="preload" href="/images/optimized/hero.webp" as="image" type="image/webp" fetchPriority="high" />
        <link rel="preload" href="/images/optimized/1.webp" as="image" type="image/webp" />
        <link rel="preload" href="/images/optimized/2.webp" as="image" type="image/webp" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//maisoncocktail.fr" />
        <link rel="modulepreload" href="/_next/static/chunks/main.js" />
        <link rel="prefetch" href="/api/cocktails" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#0A0A0A" />
        {/* Safari specific fixes */}
        <meta name="apple-touch-fullscreen" content="yes" />
        <style dangerouslySetInnerHTML={{ __html: `
          @supports (-webkit-touch-callout: none) {
            body {
              -webkit-text-size-adjust: 100%;
              -webkit-tap-highlight-color: transparent;
            }
          }
        ` }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics measurementId={analyticsConfig.google.measurementId} />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LenisProvider>
            <Header />
            {children}
            <Footer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
