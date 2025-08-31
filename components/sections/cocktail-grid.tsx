"use client"

import { useEffect, useRef, useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cocktails } from "@/data/cocktails"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

export function CocktailGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

  // Calculate visible items for carousel
  const visibleItems = useMemo(() => {
    if (isMobile) {
      // Mobile: show only active item
      return [activeIndex]
    } else {
      // Desktop: show 3 items
      const prev = (activeIndex - 1 + cocktails.length) % cocktails.length
      const next = (activeIndex + 1) % cocktails.length
      return [prev, activeIndex, next]
    }
  }, [activeIndex, isMobile])

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

          {/* Desktop View - Enhanced 3D Carousel */}
          <div className="hidden md:block">
            <div className="relative h-[500px] lg:h-[650px] xl:h-[700px] flex items-center justify-center">
              <div className="relative w-full max-w-6xl xl:max-w-7xl mx-auto">
                {cocktails.map((cocktail, index) => {
                  const isVisible = visibleItems.includes(index)
                  const isActive = index === activeIndex
                  const position = visibleItems.indexOf(index)
                  
                  if (!isVisible) return null

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: isActive ? 1 : 0.7,
                        scale: isActive ? 1 : 0.8,
                        x: position === 0 ? '-110%' : position === 2 ? '110%' : '0%',
                        z: isActive ? 50 : 0,
                        rotateY: position === 0 ? 15 : position === 2 ? -15 : 0,
                      }}
                      transition={{ 
                        duration: 0.6, 
                        ease: [0.4, 0, 0.2, 1],
                        scale: { duration: 0.4 }
                      }}
                      className="absolute w-[300px] lg:w-[350px] xl:w-[400px] cursor-pointer group"
                      onClick={() => !isActive && handleGoToSlide(index)}
                      style={{
                        transformStyle: 'preserve-3d',
                        perspective: '1200px',
                        left: '50%',
                        top: '50%',
                        marginLeft: '-150px', // Half of base width (300px)  
                        marginTop: isActive ? '-175px' : '-150px', // Dynamic height adjustment
                        transformOrigin: 'center center',
                      }}
                    >
                      <div className="bg-aristocrat-obsidian/70 backdrop-blur-md border border-aristocrat-charcoal/40 rounded-xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-300">
                        <div className="relative aspect-[3/4]">
                          <Image
                            src={cocktail.image}
                            alt={cocktail.name}
                            fill
                            sizes="400px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-aristocrat-void/95 via-aristocrat-void/30 to-transparent" />
                          
                          {isActive && (
                            <motion.div 
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: 0.2 }}
                              className="absolute bottom-0 left-0 right-0 p-6 lg:p-8"
                            >
                              <h3 className="text-2xl lg:text-3xl xl:text-4xl font-light serif text-aristocrat-white mb-2 lg:mb-3">
                                {cocktail.name}
                              </h3>
                              <p className="text-lg lg:text-xl text-aristocrat-cream/90 font-light">
                                {cocktail.price}
                              </p>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Enhanced Desktop Navigation Arrows */}
              <button
                onClick={handlePrevSlide}
                className="absolute left-6 lg:left-12 xl:left-16 top-1/2 -translate-y-1/2 z-20 p-4 lg:p-5 bg-aristocrat-void/70 backdrop-blur-md border border-aristocrat-charcoal/30 rounded-full text-aristocrat-cream hover:bg-aristocrat-void/90 hover:border-aristocrat-cream/50 hover:scale-110 transition-all duration-300 shadow-lg"
                aria-label="Cocktail précédent"
              >
                <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>
              
              <button
                onClick={handleNextSlide}
                className="absolute right-6 lg:right-12 xl:right-16 top-1/2 -translate-y-1/2 z-20 p-4 lg:p-5 bg-aristocrat-void/70 backdrop-blur-md border border-aristocrat-charcoal/30 rounded-full text-aristocrat-cream hover:bg-aristocrat-void/90 hover:border-aristocrat-cream/50 hover:scale-110 transition-all duration-300 shadow-lg"
                aria-label="Cocktail suivant"
              >
                <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>
            </div>

            {/* Enhanced Desktop Details */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center mt-16 lg:mt-20 max-w-4xl mx-auto"
            >
              <h3 className="text-3xl lg:text-4xl xl:text-5xl font-light serif text-aristocrat-white mb-6 lg:mb-8">
                {activeCocktail.name}
              </h3>
              <p className="text-lg lg:text-xl text-aristocrat-cream/80 mb-8 lg:mb-10 leading-relaxed max-w-2xl mx-auto">
                {activeCocktail.description}
              </p>
              
              {/* Enhanced Info Grid */}
              <div className="flex justify-center gap-8 lg:gap-12 xl:gap-16 mb-8 lg:mb-12">
                <div className="text-center">
                  <p className="text-xs lg:text-sm text-aristocrat-gray uppercase tracking-wider mb-2">Prix</p>
                  <p className="text-lg lg:text-xl text-aristocrat-cream font-light">{activeCocktail.price}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs lg:text-sm text-aristocrat-gray uppercase tracking-wider mb-2">Service</p>
                  <p className="text-lg lg:text-xl text-aristocrat-cream font-light">17h - 02h</p>
                </div>
                <div className="text-center">
                  <p className="text-xs lg:text-sm text-aristocrat-gray uppercase tracking-wider mb-2">Degré</p>
                  <p className="text-lg lg:text-xl text-aristocrat-cream font-light">15-20°</p>
                </div>
              </div>

              {/* Ingredients Display */}
              <div className="max-w-3xl mx-auto">
                <p className="text-xs lg:text-sm text-aristocrat-gray uppercase tracking-wider mb-4">Ingrédients Sélectionnés</p>
                <p className="text-sm lg:text-base text-aristocrat-cream/60 leading-relaxed">
                  {activeCocktail.ingredients.join(" • ")}
                </p>
              </div>
            </motion.div>

            {/* Enhanced Desktop Navigation Dots */}
            <div className="flex justify-center gap-4 lg:gap-5 mt-12 lg:mt-16">
              {cocktails.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleGoToSlide(index)}
                  className={`group transition-all duration-400 transform hover:scale-110 ${
                    index === activeIndex 
                      ? 'w-4 h-4 lg:w-5 lg:h-5 bg-aristocrat-cream rounded-full shadow-lg' 
                      : 'w-3 h-3 lg:w-4 lg:h-4 bg-aristocrat-charcoal hover:bg-aristocrat-gray rounded-full hover:shadow-md'
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