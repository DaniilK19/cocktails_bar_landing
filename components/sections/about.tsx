"use client"

import { memo, useCallback } from "react"
import { Clock, Award, Sparkles, Crown } from "lucide-react"
import { seoContent } from "@/data/seo-content"

const principles = [
  { 
    number: "01", 
    title: seoContent.about.values.heritage.title, 
    description: "Héritage des maîtres mixologues",
    icon: Clock,
    details: seoContent.about.values.heritage.description,
    stats: "100 ans d'excellence"
  },
  { 
    number: "02", 
    title: seoContent.about.values.innovation.title, 
    description: "Créativité contemporaine",
    icon: Sparkles,
    details: seoContent.about.values.innovation.description,
    stats: "50+ créations exclusives"
  },
  { 
    number: "03", 
    title: seoContent.about.values.craftsmanship.title, 
    description: "Perfection dans chaque détail",
    icon: Award,
    details: seoContent.about.values.craftsmanship.description,
    stats: "Spiritueux d'exception"
  },
  { 
    number: "04", 
    title: seoContent.about.values.experience.title, 
    description: "L'élégance française",
    icon: Crown,
    details: seoContent.about.values.experience.description,
    stats: "Place Vendôme Paris"
  },
]

const ValueCard = memo(({ principle }: { principle: typeof principles[0] }) => {
  const Icon = principle.icon
  
  return (
    <div className="group">
      <div className="text-center p-8 bg-aristocrat-obsidian/20 border border-aristocrat-charcoal/20 rounded-lg hover:bg-aristocrat-obsidian/30 hover:border-aristocrat-charcoal/30 transition-all duration-300">
        {/* Icon and Number */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-sm text-aristocrat-cream/60 font-light tracking-wider">{principle.number}</span>
          <Icon className="w-5 h-5 text-aristocrat-cream/50" />
        </div>
        
        {/* Content */}
        <div>
          <h4 className="text-xl font-light serif text-aristocrat-white mb-3 leading-tight">{principle.title}</h4>
          <p className="text-sm text-aristocrat-cream/60 uppercase tracking-wider mb-4 font-light">{principle.description}</p>
          <p className="text-aristocrat-cream/75 text-base leading-relaxed mb-4 font-light">{principle.details}</p>
          
          {/* Stats */}
          <div className="pt-4 border-t border-aristocrat-charcoal/20">
            <span className="text-xs text-aristocrat-cream/50 uppercase tracking-widest font-light">{principle.stats}</span>
          </div>
        </div>
      </div>
    </div>
  )
})

ValueCard.displayName = 'ValueCard'

const AboutComponent = () => {
  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <section className="section bg-gradient-to-b from-aristocrat-void to-aristocrat-obsidian">
      <div className="container">
        {/* Simple, Elegant Content */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Clean Header */}
          <p className="text-xs sm:text-sm text-aristocrat-cream/60 font-light tracking-widest uppercase mb-8">
            — Notre Histoire —
          </p>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light serif mb-12 text-aristocrat-white">
            L&apos;Art de la <span className="text-aristocrat-cream italic">Mixologie</span>
          </h2>

          {/* Quote Style Introduction */}
          <div className="mb-16">
            <blockquote className="text-xl md:text-2xl text-aristocrat-cream/80 font-light italic leading-relaxed mb-8">
              &ldquo;Depuis 1924, nous cultivons l&apos;art du cocktail français avec la précision d&apos;un maître horloger et la passion d&apos;un artiste.&rdquo;
            </blockquote>
            <cite className="text-sm text-aristocrat-cream/60 not-italic">— Maison Cocktail, Place Vendôme</cite>
          </div>

          {/* Story Paragraphs */}
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-aristocrat-cream/80 font-light leading-relaxed mb-16">
            <p>
              Chaque création naît d&apos;une recherche minutieuse, d&apos;une sélection rigoureuse 
              des meilleurs ingrédients et d&apos;un savoir-faire transmis de génération en génération.
            </p>
            <p>
              Notre atelier parisien cultive l&apos;excellence, créant des expériences sensorielles 
              uniques pour une clientèle exigeante qui apprécie l&apos;authenticité française.
            </p>
          </div>

          {/* Minimal Values Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {principles.map((principle) => (
              <div key={principle.number} className="text-center">
                <principle.icon className="w-6 h-6 text-aristocrat-cream/50 mx-auto mb-3" />
                <h4 className="text-sm font-light serif text-aristocrat-white mb-2">{principle.title}</h4>
                <p className="text-xs text-aristocrat-cream/50 uppercase tracking-wider">{principle.stats}</p>
              </div>
            ))}
          </div>

          {/* Simple CTA */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <button
              onClick={() => scrollToSection('#cocktails')}
              className="px-8 py-3 bg-aristocrat-cream/15 border border-aristocrat-cream/30 text-aristocrat-cream font-light tracking-wider uppercase text-sm hover:bg-aristocrat-cream/25 transition-all duration-300"
            >
              Nos Créations
            </button>
            <button
              onClick={() => scrollToSection('#contact')}
              className="px-8 py-3 border border-aristocrat-charcoal/40 text-aristocrat-cream/80 font-light tracking-wider uppercase text-sm hover:text-aristocrat-cream hover:border-aristocrat-cream/50 transition-all duration-300"
            >
              Réserver
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export const About = memo(AboutComponent)
About.displayName = 'About'