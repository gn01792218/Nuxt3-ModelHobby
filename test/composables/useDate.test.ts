import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import useDateUtils from '@/composables/useDate' // 請根據實際路徑調整

describe('useDateUtils', () => {
  beforeEach(() => {
    // Mock fixed current time: 2024-03-15
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-03-15'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Initialization data', () => {
    it('should correctly get current year', () => {
      const { thisYear } = useDateUtils()
      expect(thisYear).toBe(2024)
    })

    it('should correctly get current month', () => {
      const { thisMonth } = useDateUtils()
      expect(thisMonth).toBe(3)
    })
  })

  describe('getYear', () => {
    it('should get year from string date', () => {
      const { getYear } = useDateUtils()
      expect(getYear('2023-05-20')).toBe(2023)
    })

    it('should get year from Date object', () => {
      const { getYear } = useDateUtils()
      expect(getYear(new Date('2022-12-31'))).toBe(2022)
    })

    it('should handle different date string formats', () => {
      const { getYear } = useDateUtils()
      expect(getYear('2021/08/15')).toBe(2021)
    })
  })

  describe('getMonth', () => {
    it('should get month from string date with zero padding', () => {
      const { getMonth } = useDateUtils()
      expect(getMonth('2023-05-20')).toBe('05')
    })

    it('should get month from Date object with zero padding', () => {
      const { getMonth } = useDateUtils()
      expect(getMonth(new Date('2022-01-15'))).toBe('01')
    })

    it('should handle double-digit month correctly without extra padding', () => {
      const { getMonth } = useDateUtils()
      expect(getMonth('2023-12-25')).toBe('12')
    })

    it('should add zero padding for single-digit month', () => {
      const { getMonth } = useDateUtils()
      expect(getMonth('2023-03-01')).toBe('03')
    })
  })

  describe('getThisMonth', () => {
    it('should return current month', () => {
      const { getThisMonth } = useDateUtils()
      expect(getThisMonth()).toBe(3)
    })

    it('should return correct value for different months', () => {
      vi.setSystemTime(new Date('2024-12-31'))
      const { getThisMonth } = useDateUtils()
      expect(getThisMonth()).toBe(12)
    })
  })

  describe('isThisMoth', () => {
    it('should determine if two dates are in the same year and month', () => {
      const { isThisMoth } = useDateUtils()
      expect(isThisMoth('2024-03-01', '2024-03-31')).toBe(true)
    })

    it('should return false for different months', () => {
      const { isThisMoth } = useDateUtils()
      expect(isThisMoth('2024-03-01', '2024-04-01')).toBe(false)
    })

    it('should return false for different years', () => {
      const { isThisMoth } = useDateUtils()
      expect(isThisMoth('2023-03-15', '2024-03-15')).toBe(false)
    })

    it('should handle Date objects', () => {
      const { isThisMoth } = useDateUtils()
      const date1 = new Date('2024-05-10')
      const date2 = new Date('2024-05-20')
      expect(isThisMoth(date1, date2)).toBe(true)
    })

    it('should handle mixed string and Date objects', () => {
      const { isThisMoth } = useDateUtils()
      expect(isThisMoth('2024-06-01', new Date('2024-06-30'))).toBe(true)
    })
  })

  describe('sortDateArray', () => {
    it('should correctly sort string date array from oldest to newest', () => {
      const { sortDateArray } = useDateUtils()
      const dates = ['2024-03-15', '2024-01-01', '2024-12-31', '2024-06-15']
      const sorted = sortDateArray(dates)
      expect(sorted).toEqual(['2024-01-01', '2024-03-15', '2024-06-15','2024-12-31'])
    })

    it('should correctly sort Date object array', () => {
      const { sortDateArray } = useDateUtils()
      const dates = [
        new Date('2024-03-15'),
        new Date('2024-01-01'),
        new Date('2024-12-31')
      ]
      const sorted = sortDateArray(dates)
      expect(sorted[0]).toEqual(new Date('2024-01-01'))
      expect(sorted[2]).toEqual(new Date('2024-12-31'))
    })

    it('should handle empty array', () => {
      const { sortDateArray } = useDateUtils()
      expect(sortDateArray([])).toEqual([])
    })

    it('should handle single element array', () => {
      const { sortDateArray } = useDateUtils()
      const dates = ['2024-05-20']
      expect(sortDateArray(dates)).toEqual(['2024-05-20'])
    })

    it('should handle already sorted array', () => {
      const { sortDateArray } = useDateUtils()
      const dates = ['2024-01-01', '2024-06-15', '2024-12-31']
      const sorted = sortDateArray(dates)
      expect(sorted).toEqual(['2024-01-01', '2024-06-15', '2024-12-31'])
    })
  })

  describe('formateDateYYYYMM', () => {
    it('should format date with - symbol', () => {
      const { formateDateYYYYMM } = useDateUtils()
      expect(formateDateYYYYMM('2024-05-20', '-')).toBe('2024-05')
    })

    it('should format date with / symbol', () => {
      const { formateDateYYYYMM } = useDateUtils()
      expect(formateDateYYYYMM('2024-05-20', '/')).toBe('2024/05')
    })

    it('should handle Date object', () => {
      const { formateDateYYYYMM } = useDateUtils()
      expect(formateDateYYYYMM(new Date('2023-12-25'), '-')).toBe('2023-12')
    })

    it('should correctly add zero padding for single-digit month', () => {
      const { formateDateYYYYMM } = useDateUtils()
      expect(formateDateYYYYMM('2024-03-15', '-')).toBe('2024-03')
    })

    it('should handle empty value and return empty string', () => {
      const { formateDateYYYYMM } = useDateUtils()
      expect(formateDateYYYYMM('', '-')).toBe('')
    })

    it('should handle different years', () => {
      const { formateDateYYYYMM } = useDateUtils()
      expect(formateDateYYYYMM('2025-01-01', '/')).toBe('2025/01')
    })
  })

  describe('Integration tests', () => {
    it('should be able to combine multiple methods', () => {
      const { getYear, getMonth, formateDateYYYYMM } = useDateUtils()
      const date = '2024-08-15'
      
      expect(getYear(date)).toBe(2024)
      expect(getMonth(date)).toBe('08')
      expect(formateDateYYYYMM(date, '-')).toBe('2024-08')
    })

    it('should be able to sort and format dates', () => {
      const { sortDateArray, formateDateYYYYMM } = useDateUtils()
      const dates = ['2024-12-31', '2024-01-01', '2024-06-15']
      const sorted = sortDateArray(dates)
      
      expect(formateDateYYYYMM(sorted[0], '-')).toBe('2024-01')
      expect(formateDateYYYYMM(sorted[2], '-')).toBe('2024-12')
    })
  })
})