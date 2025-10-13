import { renderHook, act, waitFor } from '@testing-library/react'
import { useMobileDetect } from '../useMobileDetect'

describe('useMobileDetect', () => {
  const originalInnerWidth = window.innerWidth
  const originalNavigator = window.navigator

  beforeEach(() => {
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    // Mock navigator
    Object.defineProperty(window, 'navigator', {
      writable: true,
      configurable: true,
      value: {
        ...originalNavigator,
        maxTouchPoints: 0,
      },
    })
  })

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    })

    Object.defineProperty(window, 'navigator', {
      writable: true,
      configurable: true,
      value: originalNavigator,
    })
  })

  it('should detect desktop by default (width >= 1024)', () => {
    window.innerWidth = 1200
    const { result } = renderHook(() => useMobileDetect())

    expect(result.current.isDesktop).toBe(true)
    expect(result.current.isMobile).toBe(false)
    expect(result.current.isTablet).toBe(false)
  })

  it('should detect mobile (width < 640)', async () => {
    window.innerWidth = 375
    const { result } = renderHook(() => useMobileDetect())

    await waitFor(() => {
      expect(result.current.isMobile).toBe(true)
      expect(result.current.isTablet).toBe(false)
      expect(result.current.isDesktop).toBe(false)
    })
  })

  it('should detect tablet (640 <= width < 1024)', async () => {
    window.innerWidth = 768
    const { result } = renderHook(() => useMobileDetect())

    await waitFor(() => {
      expect(result.current.isTablet).toBe(true)
      expect(result.current.isMobile).toBe(false)
      expect(result.current.isDesktop).toBe(false)
    })
  })

  it('should detect touch device', async () => {
    Object.defineProperty(window, 'navigator', {
      writable: true,
      configurable: true,
      value: {
        ...originalNavigator,
        maxTouchPoints: 2,
      },
    })

    const { result } = renderHook(() => useMobileDetect())

    await waitFor(() => {
      expect(result.current.isTouchDevice).toBe(true)
    })
  })

  it('should update on window resize', async () => {
    window.innerWidth = 1200
    const { result } = renderHook(() => useMobileDetect())

    await waitFor(() => {
      expect(result.current.isDesktop).toBe(true)
    })

    // Simulate resize to mobile
    act(() => {
      window.innerWidth = 375
      window.dispatchEvent(new Event('resize'))
    })

    await waitFor(() => {
      expect(result.current.isMobile).toBe(true)
      expect(result.current.isDesktop).toBe(false)
    })
  })

  it('should update from mobile to tablet on resize', async () => {
    window.innerWidth = 375
    const { result } = renderHook(() => useMobileDetect())

    await waitFor(() => {
      expect(result.current.isMobile).toBe(true)
    })

    act(() => {
      window.innerWidth = 768
      window.dispatchEvent(new Event('resize'))
    })

    await waitFor(() => {
      expect(result.current.isTablet).toBe(true)
      expect(result.current.isMobile).toBe(false)
    })
  })

  it('should cleanup resize listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useMobileDetect())

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
    removeEventListenerSpy.mockRestore()
  })

  it('should handle boundary values correctly', async () => {
    // Test exact boundary: 640px
    window.innerWidth = 640
    const { result: result640, rerender: rerender640 } = renderHook(() => useMobileDetect())

    await waitFor(() => {
      expect(result640.current.isTablet).toBe(true)
      expect(result640.current.isMobile).toBe(false)
    })

    // Test exact boundary: 1024px
    window.innerWidth = 1024
    const { result: result1024 } = renderHook(() => useMobileDetect())

    await waitFor(() => {
      expect(result1024.current.isDesktop).toBe(true)
      expect(result1024.current.isTablet).toBe(false)
    })

    // Test one pixel below mobile boundary
    window.innerWidth = 639
    const { result: result639 } = renderHook(() => useMobileDetect())

    await waitFor(() => {
      expect(result639.current.isMobile).toBe(true)
    })
  })
})
