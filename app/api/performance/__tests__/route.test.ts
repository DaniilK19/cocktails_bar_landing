import { GET } from '../route'

describe('/api/performance', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  describe('GET without metrics', () => {
    it('should return server metrics', async () => {
      const request = new Request('http://localhost:3000/api/performance')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toHaveProperty('serverTime')
      expect(data).toHaveProperty('edgeLocation')
      expect(data).toHaveProperty('buildTime')
      expect(data).toHaveProperty('nextVersion')
      expect(data).toHaveProperty('optimizations')
    })

    it('should include current server time', async () => {
      const beforeTime = Date.now()
      const request = new Request('http://localhost:3000/api/performance')
      const response = await GET(request)
      const data = await response.json()
      const afterTime = Date.now()

      expect(data.serverTime).toBeGreaterThanOrEqual(beforeTime)
      expect(data.serverTime).toBeLessThanOrEqual(afterTime)
    })

    it('should return Next.js version', async () => {
      const request = new Request('http://localhost:3000/api/performance')
      const response = await GET(request)
      const data = await response.json()

      expect(data.nextVersion).toBe('15.4.5')
    })

    it('should return optimizations array', async () => {
      const request = new Request('http://localhost:3000/api/performance')
      const response = await GET(request)
      const data = await response.json()

      expect(Array.isArray(data.optimizations)).toBe(true)
      expect(data.optimizations.length).toBeGreaterThan(0)
      expect(data.optimizations).toContain('Edge Runtime')
    })

    it('should include cache control headers', async () => {
      const request = new Request('http://localhost:3000/api/performance')
      const response = await GET(request)

      expect(response.headers.get('Cache-Control')).toContain('public')
      expect(response.headers.get('Cache-Control')).toContain('s-maxage=30')
    })

    it('should include response time header', async () => {
      const request = new Request('http://localhost:3000/api/performance')
      const response = await GET(request)

      expect(response.headers.get('X-Response-Time')).toBeDefined()
    })

    it('should use edge location from environment', async () => {
      process.env.VERCEL_REGION = 'iad1'
      const request = new Request('http://localhost:3000/api/performance')
      const response = await GET(request)
      const data = await response.json()

      expect(data.edgeLocation).toBe('iad1')
    })

    it('should default to "local" when no edge location', async () => {
      delete process.env.VERCEL_REGION
      const request = new Request('http://localhost:3000/api/performance')
      const response = await GET(request)
      const data = await response.json()

      expect(data.edgeLocation).toBe('local')
    })

    it('should use build time from environment', async () => {
      const buildTime = '2024-01-01T00:00:00.000Z'
      process.env.BUILD_TIME = buildTime
      const request = new Request('http://localhost:3000/api/performance')
      const response = await GET(request)
      const data = await response.json()

      expect(data.buildTime).toBe(buildTime)
    })
  })

  describe('GET with metrics', () => {
    it('should return parsed client metrics', async () => {
      const clientMetrics = {
        fcp: 1200,
        lcp: 2500,
        cls: 0.1,
        fid: 50,
      }
      const encoded = encodeURIComponent(JSON.stringify(clientMetrics))
      const request = new Request(`http://localhost:3000/api/performance?metrics=${encoded}`)
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual(clientMetrics)
    })

    it('should include no-cache header for client metrics', async () => {
      const clientMetrics = { fcp: 1200 }
      const encoded = encodeURIComponent(JSON.stringify(clientMetrics))
      const request = new Request(`http://localhost:3000/api/performance?metrics=${encoded}`)
      const response = await GET(request)

      expect(response.headers.get('Cache-Control')).toBe('no-cache')
    })

    it('should return 400 for invalid JSON metrics', async () => {
      const invalidMetrics = 'not-valid-json'
      const encoded = encodeURIComponent(invalidMetrics)
      const request = new Request(`http://localhost:3000/api/performance?metrics=${encoded}`)
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data).toEqual({ error: 'Invalid metrics data' })
    })

    it('should handle complex client metrics object', async () => {
      const complexMetrics = {
        fcp: 1200,
        lcp: 2500,
        cls: 0.1,
        fid: 50,
        ttfb: 300,
        tti: 3500,
        customMetrics: {
          apiResponseTime: 150,
          renderTime: 2000,
        },
      }
      const encoded = encodeURIComponent(JSON.stringify(complexMetrics))
      const request = new Request(`http://localhost:3000/api/performance?metrics=${encoded}`)
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual(complexMetrics)
      expect(data.customMetrics).toEqual(complexMetrics.customMetrics)
    })

    it('should handle empty metrics object', async () => {
      const emptyMetrics = {}
      const encoded = encodeURIComponent(JSON.stringify(emptyMetrics))
      const request = new Request(`http://localhost:3000/api/performance?metrics=${encoded}`)
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual(emptyMetrics)
    })

    it('should handle URL-encoded special characters', async () => {
      const metricsWithSpecialChars = {
        page: '/cocktails/[id]',
        timing: '2.5s',
      }
      const encoded = encodeURIComponent(JSON.stringify(metricsWithSpecialChars))
      const request = new Request(`http://localhost:3000/api/performance?metrics=${encoded}`)
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.page).toBe('/cocktails/[id]')
    })

    it('should reject malformed JSON gracefully', async () => {
      const malformedJSON = '{invalid: json,}'
      const encoded = encodeURIComponent(malformedJSON)
      const request = new Request(`http://localhost:3000/api/performance?metrics=${encoded}`)
      const response = await GET(request)

      expect(response.status).toBe(400)
    })
  })

  describe('Response format', () => {
    it('should return valid JSON', async () => {
      const request = new Request('http://localhost:3000/api/performance')
      const response = await GET(request)

      expect(response.headers.get('content-type')).toContain('application/json')
    })

    it('should be parseable as JSON', async () => {
      const request = new Request('http://localhost:3000/api/performance')
      const response = await GET(request)

      await expect(response.json()).resolves.toBeDefined()
    })
  })

  describe('Edge Runtime', () => {
    it('should indicate edge runtime optimization', async () => {
      const request = new Request('http://localhost:3000/api/performance')
      const response = await GET(request)
      const data = await response.json()

      expect(data.optimizations).toContain('Edge Runtime')
    })
  })
})
