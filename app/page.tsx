import { Hero } from "@/components/sections/hero"
import { FAQ } from "@/components/sections/faq"
import { Contact } from "@/components/sections/contact"
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
      <Hero />
      <section id="cocktails">
        <CocktailGrid />
      </section>  
      <section id="about">
        <About />
      </section>
      <FAQ />
      <Contact />
    </main>
  )
}