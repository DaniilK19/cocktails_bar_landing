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
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ minHeight: '-webkit-fill-available' }}
    >
      {/* Background Image - Optimized for mobile */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/optimized/hero.webp"
          alt="Maison Cocktail ambiance"
          fill
          priority
          quality={isMobile ? 85 : 95}
          sizes="100vw"
          className="object-cover object-center"
          style={{ transform: 'scale(1.1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-aristocrat-void/60 via-aristocrat-void/40 to-aristocrat-void/80" />
      </div>

      {/* Content - Mobile First */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 sm:mb-10"
        >
          <p className="text-xs sm:text-sm md:text-base text-aristocrat-cream/70 font-light tracking-[0.2em] uppercase">
            <time dateTime="1924">Est. MCMXXIV</time>
            <span className="hidden sm:inline"> — {seoContent.hero.tagline}</span>
          </p>
        </motion.div>

        {/* Main Title - Responsive sizing */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6 sm:mb-10"
        >
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light serif tracking-tight text-aristocrat-white">
            MAISON
          </span>
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight serif tracking-tight text-aristocrat-cream mt-2">
            COCKTAIL
          </span>
        </motion.h1>

        {/* Divider */}
        <motion.hr 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-16 sm:w-20 md:w-24 h-px bg-aristocrat-cream/30 mx-auto mb-6 sm:mb-10 border-0" 
          aria-hidden="true" 
        />

        {/* Subtitle - Mobile optimized */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-aristocrat-cream/80 mb-8 sm:mb-12 md:mb-16 max-w-2xl mx-auto font-light leading-relaxed sans"
        >
          L&apos;art de la mixologie française
          <span className="block sm:hidden mt-2 text-xs text-aristocrat-cream/60">
            Place Vendôme, Paris
          </span>
          <span className="hidden sm:block mt-4 text-sm md:text-base text-aristocrat-cream/60 tracking-wider uppercase">
            {seoContent.hero.subTagline}
          </span>
        </motion.p>

        {/* CTA Buttons - Mobile optimized */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center items-center"
          aria-label="Actions principales"
        >
          <a
            href="#cocktails"
            onClick={(e) => {
              scrollToSection(e)
              trackSectionView('cocktails_from_hero')
            }}
            className="w-full sm:w-auto px-8 py-4 bg-aristocrat-cream/10 backdrop-blur-sm border border-aristocrat-cream/20 text-aristocrat-cream font-light tracking-wider uppercase text-sm hover:bg-aristocrat-cream/20 transition-all duration-300"
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
            className="w-full sm:w-auto px-8 py-4 text-aristocrat-cream/80 font-light tracking-wider uppercase text-sm hover:text-aristocrat-cream transition-colors duration-300"
            aria-label="Réserver une table"
          >
            {seoContent.hero.cta.secondary}
          </a>
        </motion.nav>
      </div>

      {/* Scroll Indicator - Hidden on very small screens */}
      <motion.a
        href="#cocktails"
        onClick={scrollToSection}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 hidden sm:block"
        aria-label="Défiler vers la collection"
      >
        <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-aristocrat-cream/40" />
      </motion.a>
    </section>
  )
}