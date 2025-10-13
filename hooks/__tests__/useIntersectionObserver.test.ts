import { renderHook, waitFor } from '@testing-library/react'
import { useIntersectionObserver } from '../useIntersectionObserver'

describe('useIntersectionObserver', () => {
  let mockIntersectionObserver: jest.Mock
  let mockObserve: jest.Mock
  let mockDisconnect: jest.Mock
  let observerCallback: IntersectionObserverCallback

  beforeEach(() => {
    mockObserve = jest.fn()
    mockDisconnect = jest.fn()

    mockIntersectionObserver = jest.fn((callback) => {
      observerCallback = callback
      return {
        observe: mockObserve,
        disconnect: mockDisconnect,
        unobserve: jest.fn(),
        takeRecords: jest.fn(),
      }
    })

    global.IntersectionObserver = mockIntersectionObserver as any
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useIntersectionObserver())

    expect(result.current.isIntersecting).toBe(false)
    expect(result.current.entry).toBeNull()
    expect(result.current.elementRef).toBeDefined()
  })

  it('should create IntersectionObserver with default options', () => {
    renderHook(() => useIntersectionObserver())

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px',
      }
    )
  })

  it('should create IntersectionObserver with custom options', () => {
    renderHook(() =>
      useIntersectionObserver({
        threshold: 0.5,
        rootMargin: '10px',
      })
    )

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0.5,
        rootMargin: '10px',
      }
    )
  })

  it('should observe element when ref is set', async () => {
    const { result } = renderHook(() => useIntersectionObserver())

    // Create a mock element
    const mockElement = document.createElement('div')

    // Manually set the ref
    if (result.current.elementRef.current !== mockElement) {
      result.current.elementRef.current = mockElement
    }

    // Re-render to trigger useEffect
    await waitFor(() => {
      expect(mockObserve).toHaveBeenCalled()
    })
  })

  it('should update isIntersecting when element enters viewport', async () => {
    const { result } = renderHook(() => useIntersectionObserver())

    const mockElement = document.createElement('div')
    result.current.elementRef.current = mockElement

    // Simulate intersection
    const mockEntry = {
      isIntersecting: true,
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRatio: 0.5,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: null,
      target: mockElement,
      time: Date.now(),
    } as IntersectionObserverEntry

    await waitFor(() => {
      if (observerCallback) {
        observerCallback([mockEntry], mockIntersectionObserver as any)
      }
    })

    await waitFor(() => {
      expect(result.current.isIntersecting).toBe(true)
      expect(result.current.entry).toEqual(mockEntry)
    })
  })

  it('should update isIntersecting when element leaves viewport', async () => {
    const { result } = renderHook(() => useIntersectionObserver())

    const mockElement = document.createElement('div')
    result.current.elementRef.current = mockElement

    // First make it intersecting
    const enteringEntry = {
      isIntersecting: true,
      target: mockElement,
    } as IntersectionObserverEntry

    await waitFor(() => {
      if (observerCallback) {
        observerCallback([enteringEntry], mockIntersectionObserver as any)
      }
    })

    // Then make it not intersecting
    const leavingEntry = {
      isIntersecting: false,
      target: mockElement,
    } as IntersectionObserverEntry

    await waitFor(() => {
      if (observerCallback) {
        observerCallback([leavingEntry], mockIntersectionObserver as any)
      }
    })

    await waitFor(() => {
      expect(result.current.isIntersecting).toBe(false)
    })
  })

  it('should disconnect observer on unmount', () => {
    const { result, unmount } = renderHook(() => useIntersectionObserver())

    const mockElement = document.createElement('div')
    result.current.elementRef.current = mockElement

    unmount()

    expect(mockDisconnect).toHaveBeenCalled()
  })

  it('should not observe if element ref is null', () => {
    renderHook(() => useIntersectionObserver())

    // elementRef.current is null by default
    expect(mockObserve).not.toHaveBeenCalled()
  })

  it('should recreate observer when options change', async () => {
    const { rerender } = renderHook(
      ({ threshold, rootMargin }) =>
        useIntersectionObserver({ threshold, rootMargin }),
      {
        initialProps: { threshold: 0.1, rootMargin: '0px' },
      }
    )

    expect(mockIntersectionObserver).toHaveBeenCalledTimes(1)

    // Change options
    rerender({ threshold: 0.5, rootMargin: '10px' })

    await waitFor(() => {
      expect(mockIntersectionObserver).toHaveBeenCalledTimes(2)
    })
  })

  it('should handle multiple intersection changes', async () => {
    const { result } = renderHook(() => useIntersectionObserver())

    const mockElement = document.createElement('div')
    result.current.elementRef.current = mockElement

    // Simulate multiple intersections
    const entries = [
      { isIntersecting: true, target: mockElement } as IntersectionObserverEntry,
      { isIntersecting: false, target: mockElement } as IntersectionObserverEntry,
      { isIntersecting: true, target: mockElement } as IntersectionObserverEntry,
    ]

    for (const entry of entries) {
      await waitFor(() => {
        if (observerCallback) {
          observerCallback([entry], mockIntersectionObserver as any)
        }
      })
    }

    await waitFor(() => {
      expect(result.current.isIntersecting).toBe(true)
    })
  })
})
