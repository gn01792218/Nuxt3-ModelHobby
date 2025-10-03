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
  })
})