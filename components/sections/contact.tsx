"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Calendar } from "lucide-react"
import { BookingForm } from "@/components/ui/booking-form"

type ContactMode = "info" | "booking"

export function Contact() {
  const [mode, setMode] = useState<ContactMode>("info")

  return (
    <section id="contact" className="relative overflow-hidden safe-top safe-bottom bg-aristocrat-void">
      <div className="section px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-title font-light mb-8 lg:mb-12 serif tracking-tight">
              <span className="text-aristocrat-white">RÉSERVATION</span>
              <br />
              <span className="text-aristocrat-cream font-extralight">& CONTACT</span>
            </h2>
            <div className="w-12 lg:w-16 h-px bg-aristocrat-charcoal mx-auto mb-8"></div>
            <p className="aristocrat-text font-extralight leading-loose max-w-2xl mx-auto text-body text-aristocrat-cream/70">
              Contactez-nous par téléphone ou réservez votre table en ligne
            </p>
          </motion.div>

          {/* Mode Toggle Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center gap-4 mb-12"
          >
            <button
              onClick={() => setMode("info")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                mode === "info"
                  ? "bg-aristocrat-cream text-aristocrat-void"
                  : "bg-aristocrat-obsidian/50 text-aristocrat-cream border border-aristocrat-charcoal/30 hover:border-aristocrat-cream/50"
              }`}
            >
              <Phone className="w-4 h-4" />
              <span className="font-light">Nous Contacter</span>
            </button>

            <button
              onClick={() => setMode("booking")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                mode === "booking"
                  ? "bg-aristocrat-cream text-aristocrat-void"
                  : "bg-aristocrat-obsidian/50 text-aristocrat-cream border border-aristocrat-charcoal/30 hover:border-aristocrat-cream/50"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span className="font-light">Réserver en Ligne</span>
            </button>
          </motion.div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            {mode === "info" ? (
              <motion.div
                key="info"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl mx-auto"
              >
                {/* Contact Information */}
                <div className="bg-aristocrat-obsidian border border-aristocrat-charcoal/40 rounded-2xl p-8 lg:p-12 shadow-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Address */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-aristocrat-charcoal/50 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-aristocrat-cream" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-subtitle text-aristocrat-white font-light mb-2">Adresse</h3>
                        <p className="text-aristocrat-cream/70 text-sm leading-relaxed">
                          Bar à Cocktails Maison Cocktail
                          <br />
                          12 Place Vendôme
                          <br />
                          75001 Paris
                        </p>
                      </div>
                    </div>

                    {/* Phone & Email */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-aristocrat-charcoal/50 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-aristocrat-cream" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-subtitle text-aristocrat-white font-light mb-2">Contact</h3>
                        <p className="text-aristocrat-cream/70 text-sm leading-relaxed">
                          <a
                            href="tel:+33142961073"
                            className="hover:text-aristocrat-cream transition-colors block mb-1"
                            title="Appeler pour réserver"
                          >
                            +33 1 42 96 10 73
                          </a>
                          <a
                            href="mailto:contact@maisoncocktail.fr"
                            className="hover:text-aristocrat-cream transition-colors block"
                            title="Email pour réservation"
                          >
                            contact@maisoncocktail.fr
                          </a>
                        </p>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex gap-4 md:col-span-2">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-aristocrat-charcoal/50 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-aristocrat-cream" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-subtitle text-aristocrat-white font-light mb-3">Horaires d&apos;Ouverture</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-aristocrat-cream/70">Mardi - Vendredi</span>
                            <span className="text-aristocrat-cream">18h00 - 02h00</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-aristocrat-cream/70">Samedi - Dimanche</span>
                            <span className="text-aristocrat-cream">17h00 - 03h00</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-aristocrat-charcoal/20">
                            <span className="text-aristocrat-gray text-xs">Lundi</span>
                            <span className="text-aristocrat-gray text-xs">Fermé</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="mt-8 pt-8 border-t border-aristocrat-charcoal/20 text-center">
                    <p className="text-sm text-aristocrat-gray mb-4">
                      Réservation recommandée pour les groupes de plus de 4 personnes
                    </p>
                    <motion.button
                      onClick={() => setMode("booking")}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-aristocrat-cream text-aristocrat-void rounded-lg hover:bg-aristocrat-white transition-colors font-light"
                    >
                      <Calendar className="w-4 h-4" />
                      Réserver en Ligne
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="booking"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl mx-auto"
              >
                {/* Booking Form */}
                <div className="bg-aristocrat-obsidian border border-aristocrat-charcoal/40 rounded-2xl p-6 lg:p-10 shadow-2xl">
                  <div className="text-center mb-8">
                    <Calendar className="w-10 h-10 text-aristocrat-cream mx-auto mb-4" />
                    <h3 className="text-2xl font-light serif text-aristocrat-white mb-2">
                      Réservation en Ligne
                    </h3>
                    <p className="text-sm text-aristocrat-cream/60">
                      Remplissez le formulaire ci-dessous
                    </p>
                  </div>

                  <BookingForm />

                  {/* Back to Contact Info */}
                  <div className="mt-8 pt-8 border-t border-aristocrat-charcoal/20 text-center">
                    <p className="text-sm text-aristocrat-gray mb-3">
                      Préférez-vous nous contacter par téléphone ?
                    </p>
                    <button
                      onClick={() => setMode("info")}
                      className="text-sm text-aristocrat-cream hover:text-aristocrat-white transition-colors underline"
                    >
                      Voir nos coordonnées
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
