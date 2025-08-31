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
    <div className="mb-6">
      <div className="flex items-start gap-3 p-3 bg-aristocrat-obsidian/30 border border-aristocrat-charcoal/20">
        <span className="text-2xl text-aristocrat-cream/90 font-light w-8 flex-shrink-0">{principle.number}</span>
        <Icon className="w-6 h-6 text-aristocrat-gray mt-1 flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <h4 className="text-xl font-light text-aristocrat-white mb-1">{principle.title}</h4>
          <p className="text-sm text-aristocrat-cream/60 mb-3">{principle.description}</p>
          <p className="text-aristocrat-cream/75 text-sm leading-relaxed mb-3">{principle.details}</p>
          <span className="text-xs text-aristocrat-cream/50 uppercase tracking-wider">{principle.stats}</span>
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
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-aristocrat-void to-aristocrat-obsidian">
      <div className="max-w-5xl mx-auto">
        {/* Story Section */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-sm text-aristocrat-cream/60 uppercase tracking-widest mb-4">
            Notre Histoire
          </p>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light serif mb-6 text-aristocrat-white">
            L&apos;Art de la <span className="text-aristocrat-cream italic">Mixologie</span>
          </h2>
          
          <div className="w-16 h-px bg-aristocrat-cream/30 mx-auto mb-8" />

          <div className="max-w-3xl mx-auto space-y-6 text-aristocrat-cream/80 leading-relaxed text-base md:text-lg">
            <p>{seoContent.about.intro}</p>
            <p>
              Chaque création naît d&apos;une recherche minutieuse, d&apos;une sélection 
              rigoureuse des meilleurs ingrédients et d&apos;un savoir-faire transmis 
              de génération en génération.
            </p>
            <p>
              Notre atelier parisien cultive l&apos;excellence, créant des expériences 
              sensorielles uniques pour une clientèle exigeante.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button
              onClick={() => scrollToSection('#cocktails')}
              className="px-8 py-3 bg-aristocrat-cream/15 border border-aristocrat-cream/30 text-aristocrat-cream text-sm uppercase tracking-wider hover:bg-aristocrat-cream/25 transition-colors"
            >
              Nos Créations
            </button>
            <button
              onClick={() => scrollToSection('#contact')}
              className="px-8 py-3 border border-aristocrat-charcoal/40 text-aristocrat-cream/80 text-sm uppercase tracking-wider hover:text-aristocrat-cream hover:border-aristocrat-cream/50 transition-colors"
            >
              Réserver
            </button>
          </div>
        </div>

        {/* Values Section */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-light serif text-aristocrat-white mb-8 text-center">
            Nos Valeurs
          </h3>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {principles.map((principle) => (
              <ValueCard key={principle.number} principle={principle} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export const About = memo(AboutComponent)
About.displayName = 'About'