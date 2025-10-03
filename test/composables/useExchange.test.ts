import { describe, it, expect } from 'vitest'
import { Currency } from "~/types/model"

describe('useExchange', () => {
  describe('Currency conversion', () => {
    it('should correctly convert RMB to TWD', async () => {
      const { toTWD } = (await import('../../composables/useExchange')).default()
      const price = 100
      const amount = 2
      const result = toTWD(Currency.RMB, price, amount)
      expect(result).toBe(price * 4.5 * amount) // RMB to TWD exchange rate is 4.5
    })

    it('should keep the same value when currency is already TWD', async () => {
      const { toTWD } = (await import('../../composables/useExchange')).default()
      const price = 100
      const amount = 2
      const result = toTWD(Currency.TW, price, amount)
      expect(result).toBe(price * amount)
    })
  })
})