import type { Model } from "~/types/model"

export type ModelFilterField = "brand" | "type" | "scale"

export interface ModelFilterCriteria {
  brand?: string
  type?: string
  scale?: string
}

export function filterModelsByCriteria(models: Model[], criteria: ModelFilterCriteria): Model[] {
  return models.filter((model) => {
    const matchBrand = criteria.brand ? model.brand === criteria.brand : true
    const matchType = criteria.type ? model.type === criteria.type : true
    const matchScale = criteria.scale ? model.scale === criteria.scale : true
    return matchBrand && matchType && matchScale
  })
}

// 從 models 裡實際出現過的值，依 allOptions 既定順序過濾出子集合
export function presentOptions(models: Model[], field: ModelFilterField, allOptions: string[]): string[] {
  const present = new Set(models.map((model) => model[field]).filter(Boolean) as string[])
  return allOptions.filter((option) => present.has(option))
}
