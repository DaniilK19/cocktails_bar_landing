import { render, screen } from '@testing-library/react'
import { Footer } from '../footer'

describe('Footer', () => {
  it('should render the brand name', () => {
    render(<Footer />)
    expect(screen.getByText('MAISON')).toBeInTheDocument()
    expect(screen.getByText('COCKTAIL')).toBeInTheDocument()
  })

  it('should render the brand description', () => {
    render(<Footer />)
    expect(
      screen.getByText(/L'excellence française au service de l'art cocktail/)
    ).toBeInTheDocument()
  })

  it('should render Experience section links', () => {
    render(<Footer />)
    expect(screen.getByText('Collection')).toBeInTheDocument()
    expect(screen.getByText('Dégustations')).toBeInTheDocument()
    expect(screen.getByText('Événements')).toBeInTheDocument()
    expect(screen.getByText('Cours')).toBeInTheDocument()
  })

  it('should render La Maison section links', () => {
    render(<Footer />)
    expect(screen.getByText('Histoire')).toBeInTheDocument()
    expect(screen.getByText('Équipe')).toBeInTheDocument()
    expect(screen.getByText('Philosophie')).toBeInTheDocument()
    expect(screen.getByText('Presse')).toBeInTheDocument()
  })

  it('should render contact information', () => {
    render(<Footer />)
    expect(screen.getByText('12 Place Vendôme')).toBeInTheDocument()
    expect(screen.getByText('75001 Paris, France')).toBeInTheDocument()
  })

  it('should render phone number link', () => {
    render(<Footer />)
    const phoneLink = screen.getByRole('link', { name: /Appeler Maison Cocktail/i })
    expect(phoneLink).toHaveAttribute('href', 'tel:+33142961073')
    expect(phoneLink).toHaveTextContent('+33 1 42 96 10 73')
  })

  it('should render email link', () => {
    render(<Footer />)
    const emailLink = screen.getByRole('link', {
      name: /Envoyer un email à Maison Cocktail/i,
    })
    expect(emailLink).toHaveAttribute('href', 'mailto:contact@maisoncocktail.fr')
    expect(emailLink).toHaveTextContent('contact@maisoncocktail.fr')
  })

  it('should render opening hours', () => {
    render(<Footer />)
    expect(screen.getByText(/Mar — Sam/)).toBeInTheDocument()
    expect(screen.getByText(/18h00 — 02h00/)).toBeInTheDocument()
  })

  it('should render copyright notice', () => {
    render(<Footer />)
    expect(
      screen.getByText(/MMXXIV Maison Cocktail. Tous droits réservés/)
    ).toBeInTheDocument()
  })

  it('should render legal links', () => {
    render(<Footer />)
    expect(
      screen.getByRole('link', { name: /Consulter les mentions légales/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /Consulter la politique de confidentialité/i })
    ).toBeInTheDocument()
  })

  it('should have proper semantic HTML structure', () => {
    const { container } = render(<Footer />)
    const footer = container.querySelector('footer')
    const address = container.querySelector('address')
    const nav = container.querySelector('nav[aria-label="Liens légaux"]')

    expect(footer).toBeInTheDocument()
    expect(address).toBeInTheDocument()
    expect(nav).toBeInTheDocument()
  })

  it('should have proper section headings', () => {
    render(<Footer />)
    expect(screen.getByText('Expérience')).toBeInTheDocument()
    expect(screen.getByText('La Maison')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('should render all links with proper href attributes', () => {
    const { container } = render(<Footer />)
    const links = container.querySelectorAll('a[href^="#"]')
    expect(links.length).toBeGreaterThan(0)

    links.forEach((link) => {
      expect(link.getAttribute('href')).toMatch(/^#/)
    })
  })

  it('should have accessible link titles', () => {
    render(<Footer />)
    const collectionLink = screen.getByTitle(/Découvrir collection/i)
    const histoireLink = screen.getByTitle(/En savoir plus sur histoire/i)

    expect(collectionLink).toBeInTheDocument()
    expect(histoireLink).toBeInTheDocument()
  })

  it('should use proper time elements', () => {
    const { container } = render(<Footer />)
    const timeElements = container.querySelectorAll('time')
    expect(timeElements.length).toBeGreaterThan(0)
  })

  it('should render address with not-italic class', () => {
    const { container } = render(<Footer />)
    const address = container.querySelector('address')
    expect(address).toHaveClass('not-italic')
  })

  it('should have minimum touch target sizes for mobile', () => {
    const { container } = render(<Footer />)
    const links = container.querySelectorAll('a')

    links.forEach((link) => {
      expect(link.className).toMatch(/min-h-\[44px\]/)
    })
  })

  it('should render with proper spacing classes', () => {
    const { container } = render(<Footer />)
    const footer = container.querySelector('footer')
    expect(footer).toHaveClass('section')
    expect(footer).toHaveClass('safe-bottom')
  })

  it('should have proper grid layout structure', () => {
    const { container } = render(<Footer />)
    const gridContainer = container.querySelector('.grid.grid-cols-1.lg\\:grid-cols-3')
    expect(gridContainer).toBeInTheDocument()
  })

  it('should render year in Roman numerals', () => {
    render(<Footer />)
    expect(screen.getAllByText('MMXXIV').length).toBeGreaterThan(0)
  })

  it('should have hover effects on links', () => {
    const { container } = render(<Footer />)
    const links = container.querySelectorAll('a')

    links.forEach((link) => {
      expect(link.className).toMatch(/transition/)
    })
  })
})
