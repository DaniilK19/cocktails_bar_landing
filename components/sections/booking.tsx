"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, X } from "lucide-react"
import { BookingForm } from "@/components/ui/booking-form"

export function Booking() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      {/* Booking CTA Section */}
      <section className="section safe-top safe-bottom bg-gradient-to-b from-aristocrat-obsidian to-aristocrat-void">
        <div className="container px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="relative inline-block mb-6">
              <Calendar className="w-12 h-12 text-aristocrat-cream mx-auto" />
            </div>

            <h2 className="text-title font-light serif mb-6">
              <span className="text-aristocrat-white">RÉSERVEZ</span>
              <br />
              <span className="text-aristocrat-cream italic">VOTRE TABLE</span>
            </h2>

            <div className="w-16 sm:w-20 md:w-24 h-px bg-aristocrat-cream/20 mx-auto mb-8" />

            <p className="text-lg text-aristocrat-cream/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Profitez d&apos;une expérience unique dans notre établissement.
              Réservez votre table dès maintenant et laissez-nous vous faire découvrir
              l&apos;art de la mixologie française.
            </p>

            <motion.button
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-aristocrat-cream text-aristocrat-void font-light tracking-wide rounded-lg hover:bg-aristocrat-white transition-colors text-lg"
            >
              Réserver Maintenant
            </motion.button>

            <p className="text-sm text-aristocrat-gray mt-6">
              Ouvert du mardi au dimanche · 18h00 - 02h00
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-aristocrat-void/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-aristocrat-void border border-aristocrat-charcoal/30 rounded-2xl p-6 sm:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-aristocrat-gray hover:text-aristocrat-cream transition-colors"
                aria-label="Fermer"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Modal Header */}
              <div className="text-center mb-8">
                <Calendar className="w-10 h-10 text-aristocrat-cream mx-auto mb-4" />
                <h3 className="text-2xl sm:text-3xl font-light serif text-aristocrat-white mb-2">
                  Réservation de Table
                </h3>
                <p className="text-aristocrat-cream/60">
                  Remplissez le formulaire ci-dessous
                </p>
              </div>

              {/* Booking Form */}
              <BookingForm onClose={() => setIsModalOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
