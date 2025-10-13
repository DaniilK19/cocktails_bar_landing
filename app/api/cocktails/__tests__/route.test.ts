import { GET } from '../route'
import { cocktails } from '@/data/cocktails'

describe('/api/cocktails', () => {
  describe('GET', () => {
    it('should return all cocktails when no query params', async () => {
      const request = new Request('http://localhost:3000/api/cocktails')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(Array.isArray(data)).toBe(true)
      expect(data.length).toBe(cocktails.length)
    })

    it('should return cocktail by id', async () => {
      const testId = '1'
      const request = new Request(`http://localhost:3000/api/cocktails?id=${testId}`)
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.id).toBe(testId)
      expect(data).toHaveProperty('name')
      expect(data).toHaveProperty('description')
      expect(data).toHaveProperty('ingredients')
    })

    it('should return 404 for non-existent cocktail id', async () => {
      const request = new Request('http://localhost:3000/api/cocktails?id=999')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data).toEqual({ error: 'Cocktail not found' })
    })

    it('should filter cocktails by category', async () => {
      const category = 'Tropical'
      const request = new Request(`http://localhost:3000/api/cocktails?category=${category}`)
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(Array.isArray(data)).toBe(true)
      data.forEach((cocktail: any) => {
        expect(cocktail.category).toBe(category)
      })
    })

    it('should be case-insensitive for category filter', async () => {
      const request = new Request('http://localhost:3000/api/cocktails?category=tropical')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(Array.isArray(data)).toBe(true)
      expect(data.length).toBeGreaterThan(0)
    })

    it('should return empty array for non-existent category', async () => {
      const request = new Request('http://localhost:3000/api/cocktails?category=NonExistent')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(Array.isArray(data)).toBe(true)
      expect(data.length).toBe(0)
    })

    it('should include cache headers', async () => {
      const request = new Request('http://localhost:3000/api/cocktails')
      const response = await GET(request)

      expect(response.headers.get('Cache-Control')).toBeDefined()
      expect(response.headers.get('Cache-Control')).toContain('public')
    })

    it('should include CDN cache headers', async () => {
      const request = new Request('http://localhost:3000/api/cocktails')
      const response = await GET(request)

      expect(response.headers.get('CDN-Cache-Control')).toBeDefined()
      expect(response.headers.get('Vercel-CDN-Cache-Control')).toBeDefined()
    })

    it('should return correct content type', async () => {
      const request = new Request('http://localhost:3000/api/cocktails')
      const response = await GET(request)

      expect(response.headers.get('content-type')).toContain('application/json')
    })

    it('should handle malformed query parameters gracefully', async () => {
      const request = new Request('http://localhost:3000/api/cocktails?id=&category=')
      const response = await GET(request)

      // Should not crash and return valid response
      expect(response.status).toBeLessThan(500)
    })

    it('should return cocktail with all required fields', async () => {
      const request = new Request('http://localhost:3000/api/cocktails?id=1')
      const response = await GET(request)
      const data = await response.json()

      expect(data).toHaveProperty('id')
      expect(data).toHaveProperty('name')
      expect(data).toHaveProperty('description')
      expect(data).toHaveProperty('image')
      expect(data).toHaveProperty('ingredients')
      expect(data).toHaveProperty('instructions')
      expect(data).toHaveProperty('category')
      expect(data).toHaveProperty('alcohol')
      expect(data).toHaveProperty('color')
      expect(data).toHaveProperty('price')
    })

    it('should prioritize id over category when both are provided', async () => {
      const request = new Request('http://localhost:3000/api/cocktails?id=1&category=Tropical')
      const response = await GET(request)
      const data = await response.json()

      // Should return single cocktail by id, not filtered list
      expect(data).not.toBeInstanceOf(Array)
      expect(data.id).toBe('1')
    })

    it('should handle URL encoding in parameters', async () => {
      const category = encodeURIComponent('Tropical')
      const request = new Request(`http://localhost:3000/api/cocktails?category=${category}`)
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(Array.isArray(data)).toBe(true)
    })

    it('should return ingredients as an array', async () => {
      const request = new Request('http://localhost:3000/api/cocktails?id=1')
      const response = await GET(request)
      const data = await response.json()

      expect(Array.isArray(data.ingredients)).toBe(true)
      expect(data.ingredients.length).toBeGreaterThan(0)
    })

    it('should return instructions as an array', async () => {
      const request = new Request('http://localhost:3000/api/cocktails?id=1')
      const response = await GET(request)
      const data = await response.json()

      expect(Array.isArray(data.instructions)).toBe(true)
      expect(data.instructions.length).toBeGreaterThan(0)
    })
  })
})
