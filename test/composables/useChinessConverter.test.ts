import { describe, it, expect } from 'vitest'

describe('useChinessConverter', () => {
  describe('Chinese character conversion', () => {
    it('should convert traditional Chinese to simplified Chinese', async () => {
      const { converTradictionalToSimple } = (await import('../../composables/useChinessConverter')).default()
      const result = converTradictionalToSimple('繁體字')
      expect(result).toBe('繁体字')
    })
  })
})