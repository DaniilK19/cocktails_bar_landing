import {
  analyticsConfig,
  shouldLoadAnalytics,
  initializeAnalytics,
  businessEventTrackers,
} from '../analytics-config'

describe('analyticsConfig', () => {
  it('should have correct structure', () => {
    expect(analyticsConfig).toHaveProperty('google')
    expect(analyticsConfig).toHaveProperty('seo')
    expect(analyticsConfig).toHaveProperty('events')
    expect(analyticsConfig).toHaveProperty('customParameters')
  })

  it('should have valid event names', () => {
    expect(analyticsConfig.events.cocktailView).toBe('cocktail_viewed')
    expect(analyticsConfig.events.reservationClick).toBe('reservation_click')
    expect(analyticsConfig.events.contactSubmit).toBe('contact_submit')
  })

  it('should have valid SEO tracking configuration', () => {
    expect(analyticsConfig.seo.enableCoreWebVitals).toBe(true)
    expect(analyticsConfig.seo.trackingThresholds.scrollDepth).toEqual([
      25, 50, 75, 90, 100,
    ])
  })

  it('should have valid custom parameters', () => {
    expect(analyticsConfig.customParameters.businessType).toBe('Cocktail Bar')
    expect(analyticsConfig.customParameters.location).toBe('Place Vendôme Paris')
  })
})

describe('shouldLoadAnalytics', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  it('should return false in development without flag', () => {
    process.env.NODE_ENV = 'development'
    process.env.NEXT_PUBLIC_ENABLE_ANALYTICS_DEV = undefined
    expect(shouldLoadAnalytics()).toBe(false)
  })

  it('should return true in development with flag', () => {
    process.env.NODE_ENV = 'development'
    process.env.NEXT_PUBLIC_ENABLE_ANALYTICS_DEV = 'true'
    expect(shouldLoadAnalytics()).toBe(true)
  })

  it('should return true in production', () => {
    process.env.NODE_ENV = 'production'
    expect(shouldLoadAnalytics()).toBe(true)
  })
})

describe('initializeAnalytics', () => {
  const originalEnv = process.env
  const mockGtag = jest.fn()

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
    process.env.NODE_ENV = 'production'
    ;(global as any).window = {
      gtag: mockGtag,
    }
    localStorage.clear()
    mockGtag.mockClear()
  })

  afterAll(() => {
    process.env = originalEnv
    delete (global as any).window
  })

  it('should initialize analytics when consent is given', () => {
    localStorage.setItem('analytics-consent', 'true')
    initializeAnalytics()

    expect(mockGtag).toHaveBeenCalledWith('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      functionality_storage: 'granted',
      personalization_storage: 'denied',
      security_storage: 'granted',
    })
  })

  it('should not initialize analytics without consent', () => {
    localStorage.setItem('analytics-consent', 'false')
    initializeAnalytics()

    expect(mockGtag).not.toHaveBeenCalled()
  })

  it('should not initialize in development', () => {
    process.env.NODE_ENV = 'development'
    localStorage.setItem('analytics-consent', 'true')
    initializeAnalytics()

    expect(mockGtag).not.toHaveBeenCalled()
  })
})

describe('businessEventTrackers', () => {
  const mockGtag = jest.fn()

  beforeEach(() => {
    ;(global as any).window = {
      gtag: mockGtag,
    }
    mockGtag.mockClear()
  })

  afterAll(() => {
    delete (global as any).window
  })

  describe('trackReservationIntent', () => {
    it('should track reservation click with correct parameters', () => {
      businessEventTrackers.trackReservationIntent('hero_button')

      expect(mockGtag).toHaveBeenCalledWith(
        'event',
        'reservation_click',
        expect.objectContaining({
          event_category: 'conversion',
          event_label: 'hero_button',
          value: 1,
        })
      )
    })
  })

  describe('trackCocktailInterest', () => {
    it('should track cocktail view with correct parameters', () => {
      businessEventTrackers.trackCocktailInterest('Sunset Margarita', 'view_details')

      expect(mockGtag).toHaveBeenCalledWith(
        'event',
        'cocktail_viewed',
        expect.objectContaining({
          event_category: 'product_interaction',
          event_label: 'Sunset Margarita',
          custom_parameter_action: 'view_details',
          cocktail_category: 'signature',
        })
      )
    })
  })

  describe('trackContactEngagement', () => {
    it('should track phone call click', () => {
      businessEventTrackers.trackContactEngagement('phone')

      expect(mockGtag).toHaveBeenCalledWith(
        'event',
        'phone_call_click',
        expect.objectContaining({
          event_category: 'engagement',
          event_label: 'contact_phone',
          contact_method: 'phone',
          business_priority: 'high',
        })
      )
    })

    it('should track email click', () => {
      businessEventTrackers.trackContactEngagement('email')

      expect(mockGtag).toHaveBeenCalledWith(
        'event',
        'email_click',
        expect.objectContaining({
          event_category: 'engagement',
          contact_method: 'email',
        })
      )
    })

    it('should track form submission', () => {
      businessEventTrackers.trackContactEngagement('form')

      expect(mockGtag).toHaveBeenCalledWith(
        'event',
        'contact_submit',
        expect.objectContaining({
          event_category: 'engagement',
          contact_method: 'form',
        })
      )
    })

    it('should handle missing gtag gracefully', () => {
      delete (global as any).window.gtag
      expect(() => {
        businessEventTrackers.trackContactEngagement('phone')
      }).not.toThrow()
    })
  })
})
