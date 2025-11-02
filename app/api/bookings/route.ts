import { NextResponse } from 'next/server'
import { bookingSchema } from '@/types/booking'
import { z } from 'zod'

export const runtime = 'edge'

// Extended schema for API validation (date comes as string from form)
const apiBookingSchema = bookingSchema.extend({
  date: z.string().transform((str) => new Date(str)),
})

export async function POST(request: Request) {
  const headers = {
    'Content-Type': 'application/json',
  }

  try {
    const body = await request.json()

    // Validate request body
    const validatedData = apiBookingSchema.parse(body)

    // Check if date is not in the past
    const bookingDate = new Date(validatedData.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (bookingDate < today) {
      return NextResponse.json(
        { error: 'La date de réservation ne peut pas être dans le passé' },
        { status: 400, headers }
      )
    }

    // Check if booking is within business hours (18:00 - 02:00)
    const [hours] = validatedData.time.split(':').map(Number)
    const isValidTime = (hours >= 18 || hours <= 2)

    if (!isValidTime) {
      return NextResponse.json(
        { error: 'Horaire de réservation invalide' },
        { status: 400, headers }
      )
    }

    // In a real application, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Send notification to restaurant staff
    // 4. Check availability

    // For portfolio purposes, we'll simulate a successful booking
    console.log('Booking received:', {
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      date: validatedData.date,
      time: validatedData.time,
      guests: validatedData.guests,
      message: validatedData.message,
    })

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json(
      {
        success: true,
        message: 'Réservation confirmée avec succès',
        booking: {
          id: `BOOK-${Date.now()}`,
          date: validatedData.date,
          time: validatedData.time,
          guests: validatedData.guests,
        },
      },
      { status: 200, headers }
    )
  } catch (error) {
    console.error('Booking error:', error)

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Données de réservation invalides',
          details: error.issues,
        },
        { status: 400, headers }
      )
    }

    // Handle other errors
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la réservation' },
      { status: 500, headers }
    )
  }
}

// GET endpoint to retrieve booking (for future implementation)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const bookingId = searchParams.get('id')

  if (!bookingId) {
    return NextResponse.json(
      { error: 'ID de réservation requis' },
      { status: 400 }
    )
  }

  // In a real application, you would fetch from database
  return NextResponse.json(
    { message: 'Feature coming soon' },
    { status: 501 }
  )
}
