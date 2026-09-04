import type { Model } from "~/types/model"

export function favoriteCount(model: Model) {
  return model.favorites?.length ?? 0
}

export function isFavoritedBy(model: Model, userId?: string) {
  if (!userId) return false
  return !!model.favorites?.some((favorite) => favorite.userId === userId)
}

export interface FavoriteCategory {
  key: string
  label: string
  items: Model[]
}

// models 需先依收藏數排序過，這裡只依 type 分組並各取前 limit 筆，不重新排序
export function groupMostFavoritedByType(models: Model[], types: string[], limit = 10): FavoriteCategory[] {
  return types
    .map((type) => ({
      key: type,
      label: `人氣${type}`,
      items: models.filter((model) => model.type === type).slice(0, limit)
    }))
    .filter((category) => category.items.length > 0)
}
