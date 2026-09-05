import { describe, it, expect } from 'vitest'
import { filterModelsByCriteria, presentOptions, excludeOptions } from '@/utils/modelFilter'
import type { Model } from '~/types/model'

function buildModel(overrides: Partial<Model> = {}): Model {
  return { favorites: [], ...overrides } as Model
}

describe('modelFilter', () => {
  describe('filterModelsByCriteria', () => {
    it('should return all models when criteria is empty', () => {
      const models = [buildModel({ id: 1 }), buildModel({ id: 2 })]
      expect(filterModelsByCriteria(models, {})).toEqual(models)
    })

    it('should filter by a single field', () => {
      const tank = buildModel({ id: 1, type: '戰車' as any })
      const plane = buildModel({ id: 2, type: '飛機' as any })
      expect(filterModelsByCriteria([tank, plane], { type: '戰車' })).toEqual([tank])
    })

    it('should require all given fields to match', () => {
      const match = buildModel({ id: 1, brand: 'Tamiya' as any, scale: '1:72' as any })
      const wrongScale = buildModel({ id: 2, brand: 'Tamiya' as any, scale: '1:35' as any })
      const result = filterModelsByCriteria([match, wrongScale], { brand: 'Tamiya', scale: '1:72' })
      expect(result).toEqual([match])
    })
  })

  describe('presentOptions', () => {
    it('should only return options that appear in models, in allOptions order', () => {
      const models = [
        buildModel({ id: 1, scale: '1:72' as any }),
        buildModel({ id: 2, scale: '1:35' as any }),
      ]
      const result = presentOptions(models, 'scale', ['1:700', '1:350', '1:144', '1:100', '1:72', '1:48', '1:35'])
      expect(result).toEqual(['1:72', '1:35'])
    })

    it('should ignore models missing the field', () => {
      const models = [buildModel({ id: 1 }), buildModel({ id: 2, brand: 'Bandai' as any })]
      expect(presentOptions(models, 'brand', ['Tamiya', 'Bandai'])).toEqual(['Bandai'])
    })

    it('should return an empty array when there are no models', () => {
      expect(presentOptions([], 'type', ['戰車', '飛機'])).toEqual([])
    })

    it('should not duplicate an option shared by multiple models', () => {
      const models = [
        buildModel({ id: 1, brand: 'Tamiya' as any }),
        buildModel({ id: 2, brand: 'Tamiya' as any }),
      ]
      expect(presentOptions(models, 'brand', ['Tamiya', 'Bandai'])).toEqual(['Tamiya'])
    })
  })

  describe('excludeOptions', () => {
    it('should remove the excluded values', () => {
      expect(excludeOptions(['戰車', '飛機', '工具', '顏料'], ['工具', '顏料'])).toEqual(['戰車', '飛機'])
    })

    it('should return the original array when excluded is empty', () => {
      const options = ['戰車', '飛機']
      expect(excludeOptions(options, [])).toEqual(options)
    })

    it('should ignore excluded values that are not present', () => {
      expect(excludeOptions(['戰車', '飛機'], ['工具'])).toEqual(['戰車', '飛機'])
    })
  })
})
