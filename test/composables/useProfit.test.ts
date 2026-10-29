import { describe, it, expect } from 'vitest'
import useProfit from '@/composables/useProfit'
import { Currency, type Model } from '~/types/model'
import type { PurchaseInfo } from '~/types/purchaseInfo'

function createPurchaseInfo(overrides: Partial<PurchaseInfo> = {}): PurchaseInfo {
  return {
    id: 1,
    currency: Currency.TW,
    price: 100,
    sellingCurrency: Currency.TW,
    sellingPrice: 150,
    amount: 1,
    ...overrides,
  } as PurchaseInfo
}

function createModel(purchase_infos?: PurchaseInfo[]): Model {
  return { purchase_infos } as Model
}

describe('useProfit', () => {
  describe('getProfit', () => {
    it('should return null when price or sellingPrice is missing', () => {
      const { getProfit } = useProfit()
      expect(getProfit(createPurchaseInfo({ sellingPrice: 0 }))).toBeNull()
      expect(getProfit(createPurchaseInfo({ price: 0 }))).toBeNull()
    })

    it('should ignore amount by default and multiply it when withAmount is true', () => {
      const { getProfit } = useProfit()
      const info = createPurchaseInfo({ amount: 2 })
      expect(getProfit(info)).toBe(50)
      expect(getProfit(info, true)).toBe(100)
    })
  })

  describe('getModelProfit', () => {
    it('should sum profits of all purchase infos multiplied by amount', () => {
      const { getModelProfit } = useProfit()
      const model = createModel([
        createPurchaseInfo({ amount: 2 }), // +100
        createPurchaseInfo({ currency: Currency.RMB, price: 20, sellingPrice: 80 }), // 80 - 90 = -10
      ])
      expect(getModelProfit(model)).toBe(90)
    })

    it('should skip purchase infos whose profit cannot be calculated', () => {
      const { getModelProfit } = useProfit()
      const model = createModel([
        createPurchaseInfo(),
        createPurchaseInfo({ sellingPrice: 0 }),
      ])
      expect(getModelProfit(model)).toBe(50)
    })

    it('should return null when no purchase info has a profit', () => {
      const { getModelProfit } = useProfit()
      expect(getModelProfit(createModel())).toBeNull()
      expect(getModelProfit(createModel([createPurchaseInfo({ sellingPrice: 0 })]))).toBeNull()
    })
  })

  describe('profitText / profitClass', () => {
    it('should prefix positive numbers with + and color by sign', () => {
      const { profitText, profitClass } = useProfit()
      expect(profitText(25)).toBe('+25')
      expect(profitText(-15)).toBe('-15')
      expect(profitClass(25)).toBe('text-red-500')
      expect(profitClass(-15)).toBe('text-green-500')
      expect(profitClass(0)).toBe('')
    })
  })
})
