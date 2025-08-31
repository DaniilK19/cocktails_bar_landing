import { Hero } from "@/components/sections/hero"
import { FAQ } from "@/components/sections/faq"
import dynamic from "next/dynamic"

// Lazy load heavy components for better initial performance
const CocktailGrid = dynamic(
  () => import("@/components/sections/cocktail-grid").then(mod => ({ default: mod.CocktailGrid })),
  {
    loading: () => (
      <div className="py-40 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="animate-pulse text-aristocrat-cream">Loading collection...</div>
      </div>
    )
  }
)

const About = dynamic(
  () => import("@/components/sections/about").then(mod => ({ default: mod.About })),
  {
    loading: () => (
      <div className="py-40 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="animate-pulse text-aristocrat-cream">Loading story...</div>
      </div>
    )
  }
)

export default function Home() {
  return (
    <main className="relative">
      <section id="home">
        <Hero />
      </section>
      <section id="cocktails">
        <CocktailGrid />
      </section>  
      <section id="about">
        <About />
      </section>
      <FAQ />
      <section id="contact" className="relative overflow-hidden safe-top safe-bottom">
        
        <div className="section px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-title font-light mb-8 lg:mb-12 serif tracking-tight">
              <span className="text-aristocrat-white">RÉSERVATION</span>
              <br />
              <span className="text-aristocrat-cream font-extralight">& CONTACT</span>
            </h2>
            <div className="w-12 lg:w-16 h-px bg-aristocrat-charcoal mx-auto mb-12 lg:mb-16"></div>
            <div className="aristocrat-text font-extralight leading-loose max-w-2xl mx-auto text-body">
              <address className="not-italic mb-6 lg:mb-8">
                <p className="mb-4">Bar à Cocktails Maison Cocktail</p>
                <p className="mb-4">12 Place Vendôme, 75001 Paris</p>
                <p className="mb-4"><a href="tel:+33142961073" className="hover:text-aristocrat-cream transition-colors min-h-[44px] inline-flex items-center" title="Appeler pour réserver">+33 1 42 96 10 73</a></p>
                <p><a href="mailto:contact@maisoncocktail.fr" className="hover:text-aristocrat-cream transition-colors min-h-[44px] inline-flex items-center" title="Email pour réservation">contact@maisoncocktail.fr</a></p>
              </address>
              <div className="mt-6 lg:mt-8 p-4 lg:p-6 border border-aristocrat-charcoal/30 rounded-lg">
                <h3 className="text-subtitle text-aristocrat-cream font-light mb-3 lg:mb-4">Horaires d&apos;Ouverture</h3>
                <p className="mb-2"><time>Mardi - Vendredi</time>: 18h00 - 02h00</p>
                <p><time>Samedi - Dimanche</time>: 17h00 - 03h00</p>
                <p className="text-small text-aristocrat-gray mt-3 lg:mt-4">Fermé le lundi · Réservation recommandée</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}