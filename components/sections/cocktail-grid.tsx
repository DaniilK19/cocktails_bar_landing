"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cocktails } from "@/data/cocktails"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

export function CocktailGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)


  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay) return
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cocktails.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const activeCocktail = cocktails[activeIndex]

  // Navigation handlers
  const handleNextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % cocktails.length)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 8000)
  }, [])

  const handlePrevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + cocktails.length) % cocktails.length)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 8000)
  }, [])

  const handleGoToSlide = useCallback((index: number) => {
    setActiveIndex(index)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 8000)
  }, [])

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      handleNextSlide()
    }
    if (isRightSwipe) {
      handlePrevSlide()
    }
  }

  return (
    <section 
      ref={sectionRef} 
      className="section bg-gradient-to-b from-aristocrat-void to-aristocrat-obsidian overflow-hidden"
    >
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <p className="text-xs sm:text-sm md:text-base text-aristocrat-cream/60 font-light tracking-[0.2em] uppercase mb-4">
            — Collection Exclusive —
          </p>
          <h2 className="text-title serif mb-4">
            <span className="text-aristocrat-white">NOS</span>{" "}
            <span className="text-aristocrat-cream italic">CRÉATIONS</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-aristocrat-cream/20 mx-auto" />
        </motion.div>

        {/* Mobile Carousel / Desktop Grid */}
        <div className="relative">
          {/* Mobile View - Swipeable Carousel */}
          <div className="md:hidden">
            <div
              className="relative overflow-hidden touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  {/* Cocktail Card */}
                  <div className="bg-aristocrat-obsidian/40 backdrop-blur-sm border border-aristocrat-charcoal/20 rounded-lg overflow-hidden">
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={activeCocktail.image}
                        alt={activeCocktail.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-aristocrat-void/80 via-transparent to-transparent" />
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-light serif text-aristocrat-white mb-2">
                        {activeCocktail.name}
                      </h3>
                      <p className="text-sm text-aristocrat-cream/70 mb-4">
                        {activeCocktail.price}
                      </p>
                      <p className="text-sm text-aristocrat-cream/60 leading-relaxed">
                        {activeCocktail.description}
                      </p>
                      
                      {/* Ingredients */}
                      <div className="mt-4 pt-4 border-t border-aristocrat-charcoal/20">
                        <p className="text-xs text-aristocrat-gray uppercase tracking-wider mb-2">
                          Ingrédients
                        </p>
                        <p className="text-xs text-aristocrat-cream/50">
                          {activeCocktail.ingredients.join(" · ")}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Mobile Navigation Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {cocktails.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleGoToSlide(index)}
                    className={`transition-all duration-300 ${
                      index === activeIndex 
                        ? 'w-8 h-2 bg-aristocrat-cream rounded-full' 
                        : 'w-2 h-2 bg-aristocrat-charcoal rounded-full'
                    }`}
                    aria-label={`Aller au cocktail ${index + 1}`}
                  />
                ))}
              </div>

              {/* Swipe Hint */}
              <p className="text-center text-xs text-aristocrat-gray/60 mt-4">
                Glissez pour découvrir
              </p>
            </div>
          </div>

          {/* Desktop View - Minimalist Compact Slider */}
          <div className="hidden md:block">
            <div className="relative flex items-center justify-center py-12">
              {/* Main Active Card - Compact */}
              <div className="relative">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-[280px] lg:w-[320px] mx-auto"
                >
                  <div className="bg-aristocrat-obsidian/30 border border-aristocrat-charcoal/20 rounded-lg overflow-hidden">
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={activeCocktail.image}
                        alt={activeCocktail.name}
                        fill
                        sizes="320px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-aristocrat-void/80 via-transparent to-transparent" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                        <h3 className="text-lg lg:text-xl font-light serif text-aristocrat-white mb-1">
                          {activeCocktail.name}
                        </h3>
                        <p className="text-sm lg:text-base text-aristocrat-cream/80">
                          {activeCocktail.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Minimalist Navigation Arrows */}
              <button
                onClick={handlePrevSlide}
                className="absolute left-8 lg:left-16 top-1/2 -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center text-aristocrat-cream/60 hover:text-aristocrat-cream transition-colors duration-200"
                aria-label="Cocktail précédent"
              >
                <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
              
              <button
                onClick={handleNextSlide}
                className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center text-aristocrat-cream/60 hover:text-aristocrat-cream transition-colors duration-200"
                aria-label="Cocktail suivant"
              >
                <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            </div>

            {/* Minimalist Desktop Details */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center mt-8 max-w-2xl mx-auto"
            >
              <h3 className="text-2xl lg:text-3xl font-light serif text-aristocrat-white mb-3">
                {activeCocktail.name}
              </h3>
              <p className="text-base lg:text-lg text-aristocrat-cream/70 mb-6 leading-relaxed">
                {activeCocktail.description}
              </p>
              
              {/* Simple Info */}
              <div className="flex justify-center gap-6 mb-6">
                <div className="text-center">
                  <p className="text-xs text-aristocrat-gray uppercase tracking-wider mb-1">Prix</p>
                  <p className="text-aristocrat-cream">{activeCocktail.price}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-aristocrat-gray uppercase tracking-wider mb-1">Service</p>
                  <p className="text-aristocrat-cream">17h - 02h</p>
                </div>
              </div>
            </motion.div>

            {/* Minimalist Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {cocktails.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleGoToSlide(index)}
                  className={`transition-all duration-300 ${
                    index === activeIndex 
                      ? 'w-6 h-2 bg-aristocrat-cream rounded-full' 
                      : 'w-2 h-2 bg-aristocrat-charcoal hover:bg-aristocrat-gray rounded-full'
                  }`}
                  aria-label={`Aller au cocktail ${index + 1}`}
                >
                  <span className="sr-only">{cocktails[index].name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}