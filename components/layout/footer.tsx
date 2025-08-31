"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const footerSections = {
  experience: [
    { name: "Collection", href: "#collection" },
    { name: "Dégustations", href: "#tastings" },
    { name: "Événements", href: "#events" },
    { name: "Cours", href: "#courses" },
  ],
  maison: [
    { name: "Histoire", href: "#about" },
    { name: "Équipe", href: "#team" },
    { name: "Philosophie", href: "#philosophy" },
    { name: "Presse", href: "#press" },
  ],
}

export function Footer() {
  return (
    <footer className="section safe-bottom px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="minimal-border pt-12 lg:pt-16 mb-12 lg:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 xl:gap-24">
            
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-1"
            >
              <div className="mb-6 lg:mb-8">
                <h3 className="text-subtitle font-light serif tracking-wider text-aristocrat-white mb-2">
                  MAISON<span className="text-aristocrat-cream font-extralight ml-2">COCKTAIL</span>
                </h3>
                <p className="aristocrat-subtext mb-8">
                  Paris — <time dateTime="2024">MMXXIV</time>
                </p>
              </div>
              <p className="aristocrat-text font-extralight leading-loose mb-8 lg:mb-12 max-w-sm text-body">
                L&apos;excellence française au service de l&apos;art cocktail. 
                Une expérience sensorielle unique, cultivée dans le respect de la tradition.
              </p>
            </motion.div>

            {/* Links Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12"
            >
              <div>
                <h4 className="aristocrat-subtext mb-6 lg:mb-8">Expérience</h4>
                <ul className="space-y-3 lg:space-y-4">
                  {footerSections.experience.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="aristocrat-link text-body min-h-[44px] inline-flex items-center"
                        title={`Découvrir ${link.name.toLowerCase()}`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="aristocrat-subtext mb-6 lg:mb-8">La Maison</h4>
                <ul className="space-y-3 lg:space-y-4">
                  {footerSections.maison.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="aristocrat-link text-body min-h-[44px] inline-flex items-center"
                        title={`En savoir plus sur ${link.name.toLowerCase()}`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h4 className="aristocrat-subtext mb-6 lg:mb-8">Contact</h4>
              <div className="space-y-4 lg:space-y-6 aristocrat-text font-extralight text-body">
                <address className="not-italic">
                  <p>12 Place Vendôme</p>
                  <p>75001 Paris, France</p>
                </address>
                <div>
                  <p><a href="tel:+33142961073" className="hover:text-aristocrat-cream transition-colors min-h-[44px] inline-flex items-center" title="Appeler Maison Cocktail">+33 1 42 96 10 73</a></p>
                  <p><a href="mailto:contact@maisoncocktail.fr" className="hover:text-aristocrat-cream transition-colors min-h-[44px] inline-flex items-center" title="Envoyer un email à Maison Cocktail">contact@maisoncocktail.fr</a></p>
                </div>
                <div>
                  <p className="aristocrat-subtext">
                    <time>Mar — Sam</time> · <time>18h00 — 02h00</time>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 lg:gap-6"
        >
          <p className="aristocrat-subtext text-small">
            © <time dateTime="2024">MMXXIV</time> Maison Cocktail. Tous droits réservés.
          </p>
          <nav className="flex gap-6 lg:gap-8" aria-label="Liens légaux">
            <Link href="#" className="aristocrat-subtext text-small hover:text-aristocrat-cream transition-colors duration-300 min-h-[44px] inline-flex items-center" title="Consulter les mentions légales">
              Mentions Légales
            </Link>
            <Link href="#" className="aristocrat-subtext text-small hover:text-aristocrat-cream transition-colors duration-300 min-h-[44px] inline-flex items-center" title="Consulter la politique de confidentialité">
              Confidentialité
            </Link>
          </nav>
        </motion.div>
      </div>
    </footer>
  )
}