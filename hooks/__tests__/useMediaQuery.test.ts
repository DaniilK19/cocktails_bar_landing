import { renderHook, waitFor } from '@testing-library/react'
import { useMediaQuery } from '../useMediaQuery'

describe('useMediaQuery', () => {
  let mockMatchMedia: jest.Mock

  beforeEach(() => {
    mockMatchMedia = jest.fn()
    window.matchMedia = mockMatchMedia
  })

  it('should return false initially when media query does not match', () => {
    const listeners: ((e: MediaQueryListEvent) => void)[] = []

    mockMatchMedia.mockReturnValue({
      matches: false,
      media: '(min-width: 768px)',
      addEventListener: jest.fn((_, listener) => listeners.push(listener)),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
    })

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)
  })

  it('should return true when media query matches', () => {
    mockMatchMedia.mockReturnValue({
      matches: true,
      media: '(min-width: 768px)',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
    })

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(true)
  })

  it('should update when media query changes', async () => {
    let listener: ((e: MediaQueryListEvent) => void) | undefined

    mockMatchMedia.mockReturnValue({
      matches: false,
      media: '(min-width: 768px)',
      addEventListener: jest.fn((_, cb: (e: MediaQueryListEvent) => void) => {
        listener = cb
      }),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
    })

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)

    // Simulate media query change
    if (listener) {
      listener({
        matches: true,
        media: '(min-width: 768px)',
      } as MediaQueryListEvent)
    }

    await waitFor(() => {
      expect(result.current).toBe(true)
    })
  })

  it('should cleanup listener on unmount', () => {
    const removeEventListener = jest.fn()
    const removeListener = jest.fn()

    mockMatchMedia.mockReturnValue({
      matches: false,
      media: '(min-width: 768px)',
      addEventListener: jest.fn(),
      removeEventListener,
      addListener: jest.fn(),
      removeListener,
    })

    const { unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    unmount()

    // Should call either removeEventListener or removeListener
    expect(removeEventListener.mock.calls.length + removeListener.mock.calls.length).toBeGreaterThan(0)
  })

  it('should handle legacy addListener API', () => {
    let listener: ((e: MediaQueryListEvent) => void) | null = null

    mockMatchMedia.mockReturnValue({
      matches: false,
      media: '(min-width: 768px)',
      addListener: jest.fn((cb) => {
        listener = cb
      }),
      removeListener: jest.fn(),
    })

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)
  })

  it('should respond to different media queries', () => {
    mockMatchMedia.mockImplementation((query) => ({
      matches: query === '(min-width: 1024px)',
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }))

    const { result: result1 } = renderHook(() => useMediaQuery('(min-width: 1024px)'))
    const { result: result2 } = renderHook(() => useMediaQuery('(min-width: 768px)'))

    expect(result1.current).toBe(true)
    expect(result2.current).toBe(false)
  })
})
