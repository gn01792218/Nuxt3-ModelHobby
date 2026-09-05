import { describe, it, expect } from 'vitest'
import { hasFinishedGallery, hasFinishedDate, isShowcaseReady } from '@/utils/modelShowcase'
import type { Model } from '~/types/model'

function buildModel(overrides: Partial<Model> = {}): Model {
  return { favorites: [], finish_infos: [], ...overrides } as Model
}

describe('modelShowcase', () => {
  describe('hasFinishedGallery', () => {
    it('should return true when the first finish info has gallery images', () => {
      const model = buildModel({ finish_infos: [{ gallery: ['a.jpg'] } as any] })
      expect(hasFinishedGallery(model)).toBe(true)
    })

    it('should return false when gallery is empty', () => {
      const model = buildModel({ finish_infos: [{ gallery: [] } as any] })
      expect(hasFinishedGallery(model)).toBe(false)
    })

    it('should return false when there are no finish_infos', () => {
      expect(hasFinishedGallery(buildModel())).toBe(false)
    })
  })

  describe('hasFinishedDate', () => {
    it('should return true when the first finish info has a finished_date', () => {
      const model = buildModel({ finish_infos: [{ finished_date: new Date() } as any] })
      expect(hasFinishedDate(model)).toBe(true)
    })

    it('should return false when finished_date is missing', () => {
      const model = buildModel({ finish_infos: [{ gallery: ['a.jpg'] } as any] })
      expect(hasFinishedDate(model)).toBe(false)
    })

    it('should return false when there are no finish_infos', () => {
      expect(hasFinishedDate(buildModel())).toBe(false)
    })
  })

  describe('isShowcaseReady', () => {
    it('should return true when both gallery and finished_date exist', () => {
      const model = buildModel({ finish_infos: [{ gallery: ['a.jpg'], finished_date: new Date() } as any] })
      expect(isShowcaseReady(model)).toBe(true)
    })

    it('should return false when only gallery exists', () => {
      const model = buildModel({ finish_infos: [{ gallery: ['a.jpg'] } as any] })
      expect(isShowcaseReady(model)).toBe(false)
    })

    it('should return false when only finished_date exists', () => {
      const model = buildModel({ finish_infos: [{ finished_date: new Date() } as any] })
      expect(isShowcaseReady(model)).toBe(false)
    })
  })
})
