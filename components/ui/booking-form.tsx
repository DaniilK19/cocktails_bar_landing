"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, Users, Mail, Phone, User, MessageSquare, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { bookingSchema, type BookingFormData, timeSlots, guestOptions } from "@/types/booking"

interface BookingFormProps {
  onClose?: () => void
}

type SubmissionState = "idle" | "loading" | "success" | "error"

export function BookingForm({ onClose }: BookingFormProps) {
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guests: 2,
    }
  })

  const onSubmit = async (data: BookingFormData) => {
    setSubmissionState("loading")

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          date: format(data.date, "yyyy-MM-dd"),
        }),
      })

      if (!response.ok) throw new Error("Booking failed")

      setSubmissionState("success")
      reset()

      // Close modal after 3 seconds if onClose is provided
      if (onClose) {
        setTimeout(() => {
          onClose()
          setSubmissionState("idle")
        }, 3000)
      }
    } catch (error) {
      console.error("Booking error:", error)
      setSubmissionState("error")

      // Reset error state after 5 seconds
      setTimeout(() => {
        setSubmissionState("idle")
      }, 5000)
    }
  }

  // Generate next 60 days for date selection
  const availableDates = Array.from({ length: 60 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date
  })

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {submissionState === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-2xl font-light serif text-aristocrat-white mb-2">
              Réservation Confirmée
            </h3>
            <p className="text-aristocrat-cream/70">
              Nous avons bien reçu votre demande de réservation.
              <br />
              Un email de confirmation vous a été envoyé.
            </p>
          </motion.div>
        ) : submissionState === "error" ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-12"
          >
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-light serif text-aristocrat-white mb-2">
              Erreur de Réservation
            </h3>
            <p className="text-aristocrat-cream/70 mb-6">
              Une erreur est survenue. Veuillez réessayer ou nous contacter directement.
            </p>
            <button
              onClick={() => setSubmissionState("idle")}
              className="px-6 py-2 bg-aristocrat-cream text-aristocrat-void rounded-lg hover:bg-aristocrat-white transition-colors"
            >
              Réessayer
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="flex items-center gap-2 text-sm text-aristocrat-cream mb-2">
                  <User className="w-4 h-4" />
                  Nom Complet
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  placeholder="Jean Dupont"
                  className={`w-full px-4 py-3 bg-aristocrat-obsidian/50 border ${
                    errors.name ? "border-red-500" : "border-aristocrat-charcoal/30"
                  } rounded-lg text-aristocrat-white placeholder:text-aristocrat-gray/50 focus:outline-none focus:border-aristocrat-cream transition-colors`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="flex items-center gap-2 text-sm text-aristocrat-cream mb-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="jean.dupont@email.fr"
                  className={`w-full px-4 py-3 bg-aristocrat-obsidian/50 border ${
                    errors.email ? "border-red-500" : "border-aristocrat-charcoal/30"
                  } rounded-lg text-aristocrat-white placeholder:text-aristocrat-gray/50 focus:outline-none focus:border-aristocrat-cream transition-colors`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="flex items-center gap-2 text-sm text-aristocrat-cream mb-2">
                <Phone className="w-4 h-4" />
                Téléphone
              </label>
              <input
                id="phone"
                type="tel"
                {...register("phone")}
                placeholder="+33 6 12 34 56 78"
                className={`w-full px-4 py-3 bg-aristocrat-obsidian/50 border ${
                  errors.phone ? "border-red-500" : "border-aristocrat-charcoal/30"
                } rounded-lg text-aristocrat-white placeholder:text-aristocrat-gray/50 focus:outline-none focus:border-aristocrat-cream transition-colors`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Date, Time, and Guests Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Date Field */}
              <div>
                <label htmlFor="date" className="flex items-center gap-2 text-sm text-aristocrat-cream mb-2">
                  <Calendar className="w-4 h-4" />
                  Date
                </label>
                <select
                  id="date"
                  {...register("date", {
                    setValueAs: (v) => v ? new Date(v) : undefined
                  })}
                  className={`w-full px-4 py-3 bg-aristocrat-obsidian/50 border ${
                    errors.date ? "border-red-500" : "border-aristocrat-charcoal/30"
                  } rounded-lg text-aristocrat-white focus:outline-none focus:border-aristocrat-cream transition-colors`}
                >
                  <option value="">Sélectionner</option>
                  {availableDates.map((date) => (
                    <option key={date.toISOString()} value={date.toISOString()}>
                      {format(date, "dd MMM yyyy", { locale: fr })}
                    </option>
                  ))}
                </select>
                {errors.date && (
                  <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
                )}
              </div>

              {/* Time Field */}
              <div>
                <label htmlFor="time" className="flex items-center gap-2 text-sm text-aristocrat-cream mb-2">
                  <Clock className="w-4 h-4" />
                  Heure
                </label>
                <select
                  id="time"
                  {...register("time")}
                  className={`w-full px-4 py-3 bg-aristocrat-obsidian/50 border ${
                    errors.time ? "border-red-500" : "border-aristocrat-charcoal/30"
                  } rounded-lg text-aristocrat-white focus:outline-none focus:border-aristocrat-cream transition-colors`}
                >
                  <option value="">Sélectionner</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>
                )}
              </div>

              {/* Guests Field */}
              <div>
                <label htmlFor="guests" className="flex items-center gap-2 text-sm text-aristocrat-cream mb-2">
                  <Users className="w-4 h-4" />
                  Invités
                </label>
                <select
                  id="guests"
                  {...register("guests", {
                    setValueAs: (v) => parseInt(v)
                  })}
                  className={`w-full px-4 py-3 bg-aristocrat-obsidian/50 border ${
                    errors.guests ? "border-red-500" : "border-aristocrat-charcoal/30"
                  } rounded-lg text-aristocrat-white focus:outline-none focus:border-aristocrat-cream transition-colors`}
                >
                  {guestOptions.map((count) => (
                    <option key={count} value={count}>
                      {count} {count === 1 ? "personne" : "personnes"}
                    </option>
                  ))}
                </select>
                {errors.guests && (
                  <p className="text-red-500 text-xs mt-1">{errors.guests.message}</p>
                )}
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="flex items-center gap-2 text-sm text-aristocrat-cream mb-2">
                <MessageSquare className="w-4 h-4" />
                Message (Optionnel)
              </label>
              <textarea
                id="message"
                {...register("message")}
                placeholder="Demandes spéciales, allergies, occasion spéciale..."
                rows={4}
                className={`w-full px-4 py-3 bg-aristocrat-obsidian/50 border ${
                  errors.message ? "border-red-500" : "border-aristocrat-charcoal/30"
                } rounded-lg text-aristocrat-white placeholder:text-aristocrat-gray/50 focus:outline-none focus:border-aristocrat-cream transition-colors resize-none`}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={submissionState === "loading"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-4 bg-aristocrat-cream text-aristocrat-void font-light tracking-wide rounded-lg hover:bg-aristocrat-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submissionState === "loading" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Réservation en cours...
                </>
              ) : (
                "Confirmer la Réservation"
              )}
            </motion.button>

            {/* Info Text */}
            <p className="text-xs text-aristocrat-gray text-center">
              En soumettant ce formulaire, vous acceptez d&apos;être contacté par notre équipe pour confirmer votre réservation.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
