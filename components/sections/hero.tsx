"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { seoContent } from "@/data/seo-content"
import { useAnalytics } from "@/components/analytics/google-analytics"
import Image from "next/image"

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const { trackReservationAttempt, trackSectionView } = useAnalytics()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const href = e.currentTarget.getAttribute('href')
    if (href) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ 
        height: '100vh',
        height: '100dvh',
        minHeight: '100vh',
        minHeight: '100dvh',
        margin: 0,
        padding: 0
      }}
    >
      {/* Background Image - Optimized for all devices */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/optimized/hero.webp"
          alt="Maison Cocktail ambiance"
          fill
          priority
          quality={isMobile ? 85 : 95}
          sizes="100vw"
          className="object-cover object-center"
          style={{ 
            transform: isMobile ? 'scale(1.1)' : 'scale(1.05)',
            filter: isMobile ? 'brightness(0.7)' : 'brightness(0.8)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-aristocrat-void/50 via-aristocrat-void/30 to-aristocrat-void/70 lg:from-aristocrat-void/40 lg:via-aristocrat-void/20 lg:to-aristocrat-void/60" />
      </div>

      {/* Content - Refined Aristocrat Layout */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto pt-20 md:pt-24">
        {/* Tagline - Sophisticated Typography */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          <p className="text-xs sm:text-sm text-aristocrat-cream/60 font-light tracking-widest uppercase">
            <time dateTime="1924">Est. MCMXXIV</time>
            <span className="hidden sm:inline"> — {seoContent.hero.tagline}</span>
          </p>
        </motion.div>

        {/* Main Title - Classical Elegance */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8 md:mb-12"
        >
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light serif tracking-tight text-aristocrat-white leading-tight">
            MAISON
          </span>
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light serif tracking-tight text-aristocrat-cream mt-1 md:mt-2 leading-tight italic">
            COCKTAIL
          </span>
        </motion.h1>

        {/* Elegant Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center mb-8 md:mb-12"
          aria-hidden="true"
        >
          <div className="w-8 h-px bg-aristocrat-cream/30" />
          <div className="w-2 h-2 bg-aristocrat-cream/30 rounded-full mx-4" />
          <div className="w-8 h-px bg-aristocrat-cream/30" />
        </motion.div>

        {/* Refined Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-xl lg:text-2xl text-aristocrat-cream/80 mb-12 md:mb-16 max-w-3xl mx-auto font-light leading-relaxed sans"
        >
          L&apos;art de la mixologie française
          <span className="block mt-3 md:mt-4 text-sm md:text-base text-aristocrat-cream/60 tracking-wider uppercase font-extralight">
            {seoContent.hero.subTagline}
          </span>
        </motion.p>

        {/* Refined CTA Buttons */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
          aria-label="Actions principales"
        >
          <a
            href="#cocktails"
            onClick={(e) => {
              scrollToSection(e)
              trackSectionView('cocktails_from_hero')
            }}
            className="w-full sm:w-auto px-8 py-3 bg-aristocrat-cream/15 border border-aristocrat-cream/30 text-aristocrat-cream font-light tracking-wider uppercase text-sm hover:bg-aristocrat-cream/25 transition-all duration-300"
            aria-label="Voir notre collection de cocktails"
          >
            {seoContent.hero.cta.primary}
          </a>
          
          <a
            href="#contact"
            onClick={(e) => {
              scrollToSection(e)
              trackReservationAttempt('hero')
            }}
            className="w-full sm:w-auto px-8 py-3 border border-aristocrat-charcoal/40 text-aristocrat-cream/80 font-light tracking-wider uppercase text-sm hover:text-aristocrat-cream hover:border-aristocrat-cream/50 transition-all duration-300"
            aria-label="Réserver une table"
          >
            {seoContent.hero.cta.secondary}
          </a>
        </motion.nav>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#cocktails"
        onClick={scrollToSection}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 hidden sm:block"
        aria-label="Défiler vers la collection"
      >
        <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-aristocrat-cream/40 hover:text-aristocrat-cream/60 transition-colors duration-300" />
      </motion.a>
    </section>
  )
}