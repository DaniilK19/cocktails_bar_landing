import { render, screen } from '@testing-library/react'
import { CocktailCard } from '../cocktail-card'
import { Cocktail } from '@/data/cocktails'

// Mock the useOptimizedMouseMove hook
jest.mock('@/hooks/useOptimizedMouseMove', () => ({
  useOptimizedMouseMove: () => ({
    elementRef: { current: null },
    rotateX: 0,
    rotateY: 0,
    handleMouseMove: jest.fn(),
    handleMouseEnter: jest.fn(),
    handleMouseLeave: jest.fn(),
  }),
}))

describe('CocktailCard', () => {
  const mockCocktail: Cocktail = {
    id: '1',
    name: 'Test Margarita',
    description: 'A delicious test cocktail',
    image: '/test-image.jpg',
    ingredients: ['Tequila', 'Lime Juice', 'Triple Sec', 'Salt', 'Ice'],
    instructions: ['Mix ingredients', 'Serve'],
    category: 'Tropical',
    alcohol: 20,
    color: 'gradient-to-br from-cocktail-yellow to-cocktail-orange',
    price: '€15',
  }

  it('should render cocktail name', () => {
    render(<CocktailCard cocktail={mockCocktail} />)
    expect(screen.getByText('Test Margarita')).toBeInTheDocument()
  })

  it('should render cocktail description', () => {
    render(<CocktailCard cocktail={mockCocktail} />)
    expect(screen.getByText('A delicious test cocktail')).toBeInTheDocument()
  })

  it('should display alcohol percentage', () => {
    render(<CocktailCard cocktail={mockCocktail} />)
    expect(screen.getByText('20%')).toBeInTheDocument()
  })

  it('should render first 3 ingredients', () => {
    render(<CocktailCard cocktail={mockCocktail} />)

    // The component shows the last word of each ingredient
    expect(screen.getByText('Tequila')).toBeInTheDocument()
    expect(screen.getByText('Juice')).toBeInTheDocument()
    expect(screen.getByText('Sec')).toBeInTheDocument()
  })

  it('should show "+X more" when there are more than 3 ingredients', () => {
    render(<CocktailCard cocktail={mockCocktail} />)
    expect(screen.getByText('+2 more')).toBeInTheDocument()
  })

  it('should not show "+X more" when there are 3 or fewer ingredients', () => {
    const cocktailWith3Ingredients = {
      ...mockCocktail,
      ingredients: ['Vodka', 'Lime', 'Sugar'],
    }
    render(<CocktailCard cocktail={cocktailWith3Ingredients} />)
    expect(screen.queryByText(/\+\d+ more/)).not.toBeInTheDocument()
  })

  it('should render View Recipe button', () => {
    render(<CocktailCard cocktail={mockCocktail} />)
    expect(screen.getByText('View Recipe')).toBeInTheDocument()
  })

  it('should render Wine icon', () => {
    const { container } = render(<CocktailCard cocktail={mockCocktail} />)
    // Check for lucide-react icon by class or role
    const icons = container.querySelectorAll('svg')
    expect(icons.length).toBeGreaterThan(0)
  })

  it('should render Droplet icon for alcohol percentage', () => {
    const { container } = render(<CocktailCard cocktail={mockCocktail} />)
    const icons = container.querySelectorAll('svg')
    expect(icons.length).toBeGreaterThanOrEqual(2)
  })

  it('should apply color gradient classes', () => {
    const { container } = render(<CocktailCard cocktail={mockCocktail} />)
    const gradientElement = container.querySelector('.from-cocktail-yellow')
    expect(gradientElement).toBeInTheDocument()
  })

  it('should handle different alcohol percentages', () => {
    const highAlcoholCocktail = { ...mockCocktail, alcohol: 40 }
    const { rerender } = render(<CocktailCard cocktail={highAlcoholCocktail} />)
    expect(screen.getByText('40%')).toBeInTheDocument()

    const lowAlcoholCocktail = { ...mockCocktail, alcohol: 5 }
    rerender(<CocktailCard cocktail={lowAlcoholCocktail} />)
    expect(screen.getByText('5%')).toBeInTheDocument()
  })

  it('should render with animation delay based on index', () => {
    render(<CocktailCard cocktail={mockCocktail} index={2} />)
    // The component should still render normally
    expect(screen.getByText('Test Margarita')).toBeInTheDocument()
  })

  it('should handle cocktail with single word ingredients', () => {
    const simpleCocktail = {
      ...mockCocktail,
      ingredients: ['Vodka', 'Gin', 'Rum'],
    }
    render(<CocktailCard cocktail={simpleCocktail} />)
    expect(screen.getByText('Vodka')).toBeInTheDocument()
    expect(screen.getByText('Gin')).toBeInTheDocument()
    expect(screen.getByText('Rum')).toBeInTheDocument()
  })

  it('should display "Ingredients" label', () => {
    render(<CocktailCard cocktail={mockCocktail} />)
    expect(screen.getByText('Ingredients')).toBeInTheDocument()
  })

  it('should have proper accessibility structure', () => {
    const { container } = render(<CocktailCard cocktail={mockCocktail} />)

    // Should have heading for cocktail name
    const heading = container.querySelector('h3')
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Test Margarita')

    // Should have heading for ingredients section
    const ingredientsHeading = container.querySelector('h4')
    expect(ingredientsHeading).toBeInTheDocument()
  })

  it('should handle very long cocktail names', () => {
    const longNameCocktail = {
      ...mockCocktail,
      name: 'Super Deluxe Premium Ultra Fancy Complicated Name Cocktail',
    }
    render(<CocktailCard cocktail={longNameCocktail} />)
    expect(
      screen.getByText('Super Deluxe Premium Ultra Fancy Complicated Name Cocktail')
    ).toBeInTheDocument()
  })

  it('should handle very long descriptions', () => {
    const longDescCocktail = {
      ...mockCocktail,
      description:
        'This is a very long description that goes on and on about the cocktail and all its wonderful properties and ingredients',
    }
    render(<CocktailCard cocktail={longDescCocktail} />)
    expect(
      screen.getByText(/This is a very long description/)
    ).toBeInTheDocument()
  })

  it('should render correctly with minimum required data', () => {
    const minimalCocktail = {
      ...mockCocktail,
      ingredients: ['Vodka'],
    }
    render(<CocktailCard cocktail={minimalCocktail} />)
    expect(screen.getByText('Test Margarita')).toBeInTheDocument()
    expect(screen.getByText('Vodka')).toBeInTheDocument()
    expect(screen.queryByText(/\+\d+ more/)).not.toBeInTheDocument()
  })
})
