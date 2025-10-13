import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Header } from '../header'

describe('Header', () => {
  beforeEach(() => {
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = jest.fn()
  })

  it('should render the logo', () => {
    render(<Header />)
    expect(screen.getByText('MAISON')).toBeInTheDocument()
    expect(screen.getByText('COCKTAIL')).toBeInTheDocument()
  })

  it('should render all navigation items on desktop', () => {
    render(<Header />)
    expect(screen.getByText('Accueil')).toBeInTheDocument()
    expect(screen.getByText('Collection')).toBeInTheDocument()
    expect(screen.getByText('Histoire')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('should render reservation button', () => {
    render(<Header />)
    const buttons = screen.getAllByText('Réservation')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('should render mobile menu button', () => {
    render(<Header />)
    const menuButton = screen.getByLabelText('Ouvrir le menu')
    expect(menuButton).toBeInTheDocument()
  })

  it('should toggle mobile menu on button click', async () => {
    render(<Header />)
    const menuButton = screen.getByLabelText('Ouvrir le menu')

    fireEvent.click(menuButton)

    await waitFor(() => {
      expect(screen.getByLabelText('Fermer le menu')).toBeInTheDocument()
    })
  })

  it('should close mobile menu when clicking backdrop', async () => {
    render(<Header />)
    const menuButton = screen.getByLabelText('Ouvrir le menu')

    fireEvent.click(menuButton)

    await waitFor(() => {
      const backdrop = document.querySelector('.fixed.inset-0.z-40')
      if (backdrop) {
        fireEvent.click(backdrop)
      }
    })

    await waitFor(() => {
      expect(screen.queryByLabelText('Fermer le menu')).not.toBeInTheDocument()
    })
  })

  it('should apply scrolled styles when window is scrolled', async () => {
    render(<Header />)

    // Simulate scroll
    Object.defineProperty(window, 'scrollY', { writable: true, value: 100 })
    fireEvent.scroll(window)

    await waitFor(() => {
      const header = document.querySelector('header')
      expect(header?.className).toContain('shadow-lg')
    })
  })

  it('should render contact information in mobile menu', async () => {
    render(<Header />)
    const menuButton = screen.getByLabelText('Ouvrir le menu')

    fireEvent.click(menuButton)

    await waitFor(() => {
      expect(screen.getByText('12 Place Vendôme, Paris')).toBeInTheDocument()
      expect(screen.getByText('+33 1 42 96 10 73')).toBeInTheDocument()
    })
  })

  it('should have proper aria labels', () => {
    render(<Header />)
    expect(screen.getByLabelText('Maison Cocktail - Accueil')).toBeInTheDocument()
    expect(screen.getByLabelText('Navigation principale')).toBeInTheDocument()
  })

  it('should render phone link in mobile menu', async () => {
    render(<Header />)
    const menuButton = screen.getByLabelText('Ouvrir le menu')

    fireEvent.click(menuButton)

    await waitFor(() => {
      const phoneLink = screen.getByRole('link', { name: /\+33 1 42 96 10 73/i })
      expect(phoneLink).toHaveAttribute('href', 'tel:+33142961073')
    })
  })

  it('should prevent default navigation and scroll smoothly', async () => {
    render(<Header />)
    const aboutLink = screen.getAllByText('Histoire')[0]

    // Create a mock element
    const mockElement = document.createElement('div')
    mockElement.id = 'about'
    document.body.appendChild(mockElement)

    fireEvent.click(aboutLink)

    await waitFor(() => {
      expect(Element.prototype.scrollIntoView).toHaveBeenCalled()
    })

    document.body.removeChild(mockElement)
  })

  it('should close mobile menu when clicking navigation link', async () => {
    render(<Header />)
    const menuButton = screen.getByLabelText('Ouvrir le menu')

    fireEvent.click(menuButton)

    await waitFor(async () => {
      const histoireLinks = screen.getAllByText('Histoire')
      const mobileHistoireLink = histoireLinks[histoireLinks.length - 1]
      fireEvent.click(mobileHistoireLink)

      await waitFor(() => {
        expect(screen.queryByLabelText('Navigation mobile')).not.toBeInTheDocument()
      })
    })
  })

  it('should lock body scroll when mobile menu is open', async () => {
    render(<Header />)
    const menuButton = screen.getByLabelText('Ouvrir le menu')

    expect(document.body.style.overflow).toBe('')

    fireEvent.click(menuButton)

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden')
    })
  })

  it('should restore body scroll when mobile menu is closed', async () => {
    render(<Header />)
    const menuButton = screen.getByLabelText('Ouvrir le menu')

    fireEvent.click(menuButton)

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden')
    })

    fireEvent.click(screen.getByLabelText('Fermer le menu'))

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('')
    })
  })
})
