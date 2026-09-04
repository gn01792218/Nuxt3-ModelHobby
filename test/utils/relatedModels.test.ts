import { describe, it, expect } from 'vitest'
import { pickRandom, pickRelatedModels } from '@/utils/relatedModels'
import type { Model } from '~/types/model'

function buildModel(overrides: Partial<Model> = {}): Model {
  return { favorites: [], ...overrides } as Model
}

describe('relatedModels', () => {
  describe('pickRandom', () => {
    it('should return all items when count exceeds length', () => {
      const items = [1, 2, 3]
      const result = pickRandom(items, 10)
      expect(result).toHaveLength(3)
      expect(result.sort()).toEqual([1, 2, 3])
    })

    it('should limit the result to count', () => {
      const items = [1, 2, 3, 4, 5]
      const result = pickRandom(items, 2)
      expect(result).toHaveLength(2)
    })

    it('should not mutate the original array', () => {
      const items = [1, 2, 3]
      pickRandom(items, 2)
      expect(items).toEqual([1, 2, 3])
    })

    it('should return an empty array when input is empty', () => {
      expect(pickRandom([], 5)).toEqual([])
    })
  })

  describe('pickRelatedModels', () => {
    it('should return models sharing the same field value, excluding itself', () => {
      const current = buildModel({ id: 1, type: '戰車' as any })
      const same = buildModel({ id: 2, type: '戰車' as any })
      const other = buildModel({ id: 3, type: '飛機' as any })
      const models = [current, same, other]

      const result = pickRelatedModels(models, current, 'type')

      expect(result).toEqual([same])
    })

    it('should respect the limit', () => {
      const current = buildModel({ id: 1, type: '戰車' as any })
      const models = [current, ...[2, 3, 4].map((id) => buildModel({ id, type: '戰車' as any }))]

      const result = pickRelatedModels(models, current, 'type', 2)

      expect(result).toHaveLength(2)
    })

    it('should return an empty array when currentModel does not have the field', () => {
      const current = buildModel({ id: 1 })
      const models = [current, buildModel({ id: 2, type: '戰車' as any })]

      expect(pickRelatedModels(models, current, 'type')).toEqual([])
    })

    it('should return an empty array when currentModel is undefined', () => {
      const models = [buildModel({ id: 1, type: '戰車' as any })]
      expect(pickRelatedModels(models, undefined, 'type')).toEqual([])
    })

    it('should return an empty array when there is no match', () => {
      const current = buildModel({ id: 1, brand: 'Tamiya' as any })
      const models = [current, buildModel({ id: 2, brand: 'Bandai' as any })]
      expect(pickRelatedModels(models, current, 'brand')).toEqual([])
    })
  })
})
