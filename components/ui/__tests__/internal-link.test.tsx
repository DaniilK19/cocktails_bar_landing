import { render, screen } from '@testing-library/react'
import { InternalLink } from '../internal-link'

describe('InternalLink', () => {
  it('should render link with children', () => {
    render(<InternalLink href="/test">Test Link</InternalLink>)
    const link = screen.getByText('Test Link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
  })

  it('should apply primary variant classes by default', () => {
    render(<InternalLink href="/test">Test Link</InternalLink>)
    const link = screen.getByText('Test Link')
    expect(link).toHaveClass('aristocrat-button')
  })

  it('should apply secondary variant classes', () => {
    render(
      <InternalLink href="/test" variant="secondary">
        Test Link
      </InternalLink>
    )
    const link = screen.getByText('Test Link')
    expect(link).toHaveClass('aristocrat-link')
  })

  it('should apply text variant classes', () => {
    render(
      <InternalLink href="/test" variant="text">
        Test Link
      </InternalLink>
    )
    const link = screen.getByText('Test Link')
    expect(link).toHaveClass('text-aristocrat-cream')
    expect(link).toHaveClass('hover:text-aristocrat-white')
  })

  it('should apply custom className', () => {
    render(
      <InternalLink href="/test" className="custom-class">
        Test Link
      </InternalLink>
    )
    const link = screen.getByText('Test Link')
    expect(link).toHaveClass('custom-class')
  })

  it('should show arrow when showArrow is true', () => {
    render(
      <InternalLink href="/test" showArrow>
        Test Link
      </InternalLink>
    )
    const svg = screen.getByText('Test Link').parentElement?.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('should not show arrow when showArrow is false', () => {
    render(
      <InternalLink href="/test" showArrow={false}>
        Test Link
      </InternalLink>
    )
    const svg = screen.getByText('Test Link').parentElement?.querySelector('svg')
    expect(svg).not.toBeInTheDocument()
  })

  it('should apply title attribute when provided', () => {
    render(
      <InternalLink href="/test" title="Test Title">
        Test Link
      </InternalLink>
    )
    const link = screen.getByTitle('Test Title')
    expect(link).toBeInTheDocument()
  })

  it('should handle different href values', () => {
    const { rerender } = render(<InternalLink href="/page1">Link</InternalLink>)
    let link = screen.getByText('Link')
    expect(link).toHaveAttribute('href', '/page1')

    rerender(<InternalLink href="#section">Link</InternalLink>)
    link = screen.getByText('Link')
    expect(link).toHaveAttribute('href', '#section')

    rerender(<InternalLink href="https://example.com">Link</InternalLink>)
    link = screen.getByText('Link')
    expect(link).toHaveAttribute('href', 'https://example.com')
  })

  it('should render with complex children', () => {
    render(
      <InternalLink href="/test">
        <span>Complex</span> <strong>Children</strong>
      </InternalLink>
    )
    expect(screen.getByText('Complex')).toBeInTheDocument()
    expect(screen.getByText('Children')).toBeInTheDocument()
  })

  it('should combine all variant classes with custom classes', () => {
    render(
      <InternalLink href="/test" variant="secondary" className="my-custom-class">
        Test Link
      </InternalLink>
    )
    const link = screen.getByText('Test Link')
    expect(link).toHaveClass('aristocrat-link')
    expect(link).toHaveClass('my-custom-class')
    expect(link).toHaveClass('inline-flex')
  })
})
