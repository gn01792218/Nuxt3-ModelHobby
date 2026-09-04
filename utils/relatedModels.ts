import type { Model } from "~/types/model"

export function pickRandom<T>(items: T[], count: number): T[] {
  const shuffled = [...items]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, count)
}

// 依 type/brand/scale 找出跟 currentModel 相同的其他模型，隨機取 limit 筆
export function pickRelatedModels(
  models: Model[],
  currentModel: Model | undefined,
  field: "type" | "brand" | "scale",
  limit = 10
): Model[] {
  if (!currentModel?.[field]) return []
  const related = models.filter(
    (model) => model.id !== currentModel.id && model[field] === currentModel[field]
  )
  return pickRandom(related, limit)
}
