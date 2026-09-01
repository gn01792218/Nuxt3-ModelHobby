import { describe, it, expect } from 'vitest'
import useExchange from '@/composables/useExchange' // 請根據實際路徑調整
import { Currency } from '~/types/model'

describe('useExchange', () => {
  describe('toTWD', () => {
    it('should convert RMB to TWD', () => {
      const { toTWD } = useExchange()
      const result = toTWD(Currency.RMB, 100, 2)
      expect(result).toBe(900) // 100 * 4.5 * 2
    })

    it('should calculate TWD price', () => {
      const { toTWD } = useExchange()
      const result = toTWD(Currency.TW, 100, 2)
      expect(result).toBe(200) // 100 * 2
    })

    it('should use the given exchange rate instead of the default when converting RMB', () => {
      const { toTWD } = useExchange()
      const result = toTWD(Currency.RMB, 100, 2, 5)
      expect(result).toBe(1000) // 100 * 5 * 2
    })

    it('should fall back to the default exchange rate when it is null', () => {
      const { toTWD } = useExchange()
      const result = toTWD(Currency.RMB, 100, 2, null)
      expect(result).toBe(900) // 100 * 4.5 * 2
    })
  })
})