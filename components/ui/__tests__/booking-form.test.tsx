import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BookingForm } from '../booking-form'

// Mock fetch
global.fetch = jest.fn()

describe('BookingForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all form fields', () => {
    render(<BookingForm />)

    expect(screen.getByLabelText(/nom complet/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/téléphone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/heure/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/invités/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it('shows validation errors for empty required fields', async () => {
    const user = userEvent.setup()
    render(<BookingForm />)

    const submitButton = screen.getByRole('button', { name: /confirmer la réservation/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/le nom doit contenir au moins 2 caractères/i)).toBeInTheDocument()
      expect(screen.getByText(/adresse email invalide/i)).toBeInTheDocument()
      expect(screen.getByText(/numéro de téléphone invalide/i)).toBeInTheDocument()
    })
  })

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup()
    render(<BookingForm />)

    const emailInput = screen.getByLabelText(/email/i)
    await user.type(emailInput, 'invalid-email')

    const submitButton = screen.getByRole('button', { name: /confirmer la réservation/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/adresse email invalide/i)).toBeInTheDocument()
    })
  })

  it('shows validation error for invalid phone number', async () => {
    const user = userEvent.setup()
    render(<BookingForm />)

    const phoneInput = screen.getByLabelText(/téléphone/i)
    await user.type(phoneInput, 'abc')

    const submitButton = screen.getByRole('button', { name: /confirmer la réservation/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/numéro de téléphone invalide/i)).toBeInTheDocument()
    })
  })

  it('submits form successfully with valid data', async () => {
    const user = userEvent.setup()
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })

    render(<BookingForm />)

    // Fill in form
    await user.type(screen.getByLabelText(/nom complet/i), 'Jean Dupont')
    await user.type(screen.getByLabelText(/email/i), 'jean.dupont@email.fr')
    await user.type(screen.getByLabelText(/téléphone/i), '+33 6 12 34 56 78')

    // Select date (first option after placeholder)
    const dateSelect = screen.getByLabelText(/date/i)
    await user.selectOptions(dateSelect, dateSelect.querySelectorAll('option')[1].value)

    // Select time
    await user.selectOptions(screen.getByLabelText(/heure/i), '19:00')

    // Select guests
    await user.selectOptions(screen.getByLabelText(/invités/i), '4')

    // Submit form
    const submitButton = screen.getByRole('button', { name: /confirmer la réservation/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/bookings',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      )
    })

    // Check success message
    await waitFor(() => {
      expect(screen.getByText(/réservation confirmée/i)).toBeInTheDocument()
    })
  })

  it('shows error message when submission fails', async () => {
    const user = userEvent.setup()
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Booking failed' }),
    })

    render(<BookingForm />)

    // Fill in minimal valid data
    await user.type(screen.getByLabelText(/nom complet/i), 'Jean Dupont')
    await user.type(screen.getByLabelText(/email/i), 'jean@email.fr')
    await user.type(screen.getByLabelText(/téléphone/i), '+33612345678')

    const dateSelect = screen.getByLabelText(/date/i)
    await user.selectOptions(dateSelect, dateSelect.querySelectorAll('option')[1].value)
    await user.selectOptions(screen.getByLabelText(/heure/i), '20:00')

    const submitButton = screen.getByRole('button', { name: /confirmer la réservation/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/erreur de réservation/i)).toBeInTheDocument()
    })
  })

  it('disables submit button while submitting', async () => {
    const user = userEvent.setup()
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))

    render(<BookingForm />)

    // Fill in minimal valid data
    await user.type(screen.getByLabelText(/nom complet/i), 'Jean Dupont')
    await user.type(screen.getByLabelText(/email/i), 'jean@email.fr')
    await user.type(screen.getByLabelText(/téléphone/i), '+33612345678')

    const dateSelect = screen.getByLabelText(/date/i)
    await user.selectOptions(dateSelect, dateSelect.querySelectorAll('option')[1].value)
    await user.selectOptions(screen.getByLabelText(/heure/i), '20:00')

    const submitButton = screen.getByRole('button', { name: /confirmer la réservation/i })
    await user.click(submitButton)

    expect(submitButton).toBeDisabled()
  })

  it('calls onClose callback after successful submission', async () => {
    const user = userEvent.setup()
    const mockOnClose = jest.fn()
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })

    render(<BookingForm onClose={mockOnClose} />)

    // Fill in form
    await user.type(screen.getByLabelText(/nom complet/i), 'Jean Dupont')
    await user.type(screen.getByLabelText(/email/i), 'jean@email.fr')
    await user.type(screen.getByLabelText(/téléphone/i), '+33612345678')

    const dateSelect = screen.getByLabelText(/date/i)
    await user.selectOptions(dateSelect, dateSelect.querySelectorAll('option')[1].value)
    await user.selectOptions(screen.getByLabelText(/heure/i), '20:00')

    const submitButton = screen.getByRole('button', { name: /confirmer la réservation/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/réservation confirmée/i)).toBeInTheDocument()
    })

    // Wait for onClose to be called (after 3 second delay)
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled()
    }, { timeout: 4000 })
  })
})
