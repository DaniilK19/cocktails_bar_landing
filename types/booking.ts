import { z } from "zod"

// Validation schema for booking form
export const bookingSchema = z.object({
  name: z.string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),

  email: z.string()
    .email("Adresse email invalide"),

  phone: z.string()
    .min(10, "Numéro de téléphone invalide")
    .regex(/^[\d\s\+\-\(\)]+$/, "Numéro de téléphone invalide"),

  date: z.date({
    message: "Veuillez sélectionner une date",
  }),

  time: z.string()
    .min(1, "Veuillez sélectionner une heure"),

  guests: z.number()
    .min(1, "Au moins 1 personne requise")
    .max(12, "Pour plus de 12 personnes, contactez-nous directement"),

  message: z.string()
    .max(500, "Le message ne peut pas dépasser 500 caractères")
    .optional(),
})

export type BookingFormData = z.infer<typeof bookingSchema>

// Available time slots
export const timeSlots = [
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
  "21:00", "21:30", "22:00", "22:30", "23:00", "23:30",
  "00:00", "00:30", "01:00", "01:30", "02:00"
]

// Guest count options
export const guestOptions = Array.from({ length: 12 }, (_, i) => i + 1)
