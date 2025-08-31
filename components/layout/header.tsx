"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Accueil", href: "#home" },
  { name: "Collection", href: "#cocktails" },
  { name: "Histoire", href: "#about" },
  { name: "Contact", href: "#contact" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
    
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [isMobileMenuOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const href = e.currentTarget.getAttribute('href')
    if (href) {
      const element = document.querySelector(href)
      if (element) {
        setIsMobileMenuOpen(false)
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-top",
          isScrolled 
            ? "bg-aristocrat-void/95 backdrop-blur-md py-3 shadow-lg" 
            : "bg-aristocrat-void/50 backdrop-blur-sm py-4 md:py-6"
        )}
      >
        <div className="container">
          <div className="flex items-center justify-between">
            {/* Logo - Mobile optimized */}
            <motion.a
              href="/"
              whileHover={{ y: -1 }}
              className="flex items-center text-aristocrat-white"
              aria-label="Maison Cocktail - Accueil"
            >
              <span className="text-lg md:text-2xl font-light serif tracking-wider">
                MAISON
              </span>
              <span className="text-lg md:text-2xl text-aristocrat-cream font-extralight ml-1 md:ml-2 serif">
                COCKTAIL
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-10" aria-label="Navigation principale">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={handleNavClick}
                  whileHover={{ y: -1 }}
                  className="aristocrat-link text-sm lg:text-base"
                  title={`Aller à la section ${item.name}`}
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex">
              <motion.a
                href="#contact"
                onClick={handleNavClick}
                whileHover={{ y: -1 }}
                className="aristocrat-button text-xs lg:text-sm"
                title="Réserver une table"
              >
                Réservation
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "md:hidden p-3 -mr-3 text-aristocrat-cream",
                "touch-manipulation transition-colors duration-200"
              )}
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={cn(
                "fixed right-0 top-0 z-40 h-full w-full max-w-sm",
                "bg-aristocrat-void/98 backdrop-blur-md",
                "safe-top safe-bottom md:hidden"
              )}
              aria-label="Navigation mobile"
            >
              {/* Close button area */}
              <div className="flex justify-end p-4 pt-6">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 -mr-3 text-aristocrat-cream"
                  aria-label="Fermer le menu"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Navigation Items */}
              <div className="px-8 py-8 space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                    onClick={handleNavClick}
                    className={cn(
                      "block py-4 text-lg font-light",
                      "text-aristocrat-cream hover:text-aristocrat-white",
                      "transition-colors duration-200",
                      "border-b border-aristocrat-charcoal/20"
                    )}
                  >
                    {item.name}
                  </motion.a>
                ))}
                
                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-8"
                >
                  <a
                    href="#contact"
                    onClick={handleNavClick}
                    className={cn(
                      "block w-full py-4 text-center",
                      "bg-aristocrat-cream/10 backdrop-blur-sm",
                      "text-aristocrat-cream font-light tracking-wider uppercase text-sm",
                      "border border-aristocrat-cream/20",
                      "active:scale-98 transition-all duration-200"
                    )}
                  >
                    Réserver une table
                  </a>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="pt-8 space-y-4 text-center"
                >
                  <p className="text-aristocrat-gray text-sm">12 Place Vendôme, Paris</p>
                  <a 
                    href="tel:+33142961073" 
                    className="block text-aristocrat-cream text-sm hover:text-aristocrat-white transition-colors"
                  >
                    +33 1 42 96 10 73
                  </a>
                </motion.div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}