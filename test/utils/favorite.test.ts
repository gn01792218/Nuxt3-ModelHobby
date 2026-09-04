import { describe, it, expect } from 'vitest'
import { favoriteCount, isFavoritedBy } from '@/utils/favorite'
import type { Model } from '~/types/model'

function buildModel(favorites: { userId: string }[]): Model {
  return {
    favorites,
  } as Model
}

describe('favorite', () => {
  describe('favoriteCount', () => {
    it('should count favorites', () => {
      const model = buildModel([{ userId: 'a' }, { userId: 'b' }])
      expect(favoriteCount(model)).toBe(2)
    })

    it('should return 0 when favorites is undefined', () => {
      const model = { } as Model
      expect(favoriteCount(model)).toBe(0)
    })

    it('should return 0 when favorites is empty', () => {
      const model = buildModel([])
      expect(favoriteCount(model)).toBe(0)
    })
  })

  describe('isFavoritedBy', () => {
    it('should return true when userId is in favorites', () => {
      const model = buildModel([{ userId: 'a' }, { userId: 'b' }])
      expect(isFavoritedBy(model, 'b')).toBe(true)
    })

    it('should return false when userId is not in favorites', () => {
      const model = buildModel([{ userId: 'a' }])
      expect(isFavoritedBy(model, 'b')).toBe(false)
    })

    it('should return false when userId is undefined', () => {
      const model = buildModel([{ userId: 'a' }])
      expect(isFavoritedBy(model, undefined)).toBe(false)
    })

    it('should return false when favorites is undefined', () => {
      const model = { } as Model
      expect(isFavoritedBy(model, 'a')).toBe(false)
    })
  })
})
