import { describe, it, expect } from 'vitest'
import { favoriteCount, isFavoritedBy, groupMostFavoritedByType } from '@/utils/favorite'
import type { Model } from '~/types/model'

function buildModel(favorites: { userId: string }[], overrides: Partial<Model> = {}): Model {
  return {
    favorites,
    ...overrides,
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

  describe('groupMostFavoritedByType', () => {
    it('should group models by type and keep given order', () => {
      const tank1 = buildModel([{ userId: 'a' }, { userId: 'b' }], { id: 1, type: '戰車' as any })
      const tank2 = buildModel([{ userId: 'a' }], { id: 2, type: '戰車' as any })
      const plane1 = buildModel([{ userId: 'a' }], { id: 3, type: '飛機' as any })
      const models = [tank1, tank2, plane1]

      const result = groupMostFavoritedByType(models, ['戰車', '飛機'])

      expect(result).toEqual([
        { key: '戰車', label: '人氣戰車', items: [tank1, tank2] },
        { key: '飛機', label: '人氣飛機', items: [plane1] },
      ])
    })

    it('should exclude types with no models', () => {
      const tank1 = buildModel([{ userId: 'a' }], { id: 1, type: '戰車' as any })
      const result = groupMostFavoritedByType([tank1], ['戰車', '飛機', '船艦'])
      expect(result.map((category) => category.key)).toEqual(['戰車'])
    })

    it('should respect the limit per type', () => {
      const tanks = [1, 2, 3].map((id) => buildModel([{ userId: 'a' }], { id, type: '戰車' as any }))
      const result = groupMostFavoritedByType(tanks, ['戰車'], 2)
      expect(result[0].items).toHaveLength(2)
      expect(result[0].items.map((model) => model.id)).toEqual([1, 2])
    })

    it('should return an empty array when there are no models', () => {
      expect(groupMostFavoritedByType([], ['戰車', '飛機'])).toEqual([])
    })
  })
})
