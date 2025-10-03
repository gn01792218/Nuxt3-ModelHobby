import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('useDate', () => {
  describe('Current date functions', () => {
    beforeEach(() => {
      // Mock the current date to 2025/10/3
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2025, 9, 3))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should get current year and month', async () => {
      const { thisYear, thisMonth } = (await import('../../composables/useDate')).default()
      expect(thisYear).toBe(2025)
      expect(thisMonth).toBe(10)
    })
  })

  describe('Date parsing functions', () => {
    it('should get year from date string', async () => {
      const { getYear } = (await import('../../composables/useDate')).default()
      expect(getYear('2025-10-03')).toBe(2025)
    })

    it('should get month with leading zero', async () => {
      const { getMonth } = (await import('../../composables/useDate')).default()
      expect(getMonth('2025-05-03')).toBe('05')
    })
  })

  describe('Date comparison', () => {
    it('should correctly identify same month', async () => {
      const { isThisMoth } = (await import('../../composables/useDate')).default()
      expect(isThisMoth('2025-10-01', '2025-10-31')).toBe(true)
      expect(isThisMoth('2025-10-01', '2025-11-01')).toBe(false)
    })
  })
})