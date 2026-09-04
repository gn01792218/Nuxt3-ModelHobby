import type { Model } from "~/types/model"

export function favoriteCount(model: Model) {
  return model.favorites?.length ?? 0
}

export function isFavoritedBy(model: Model, userId?: string) {
  if (!userId) return false
  return !!model.favorites?.some((favorite) => favorite.userId === userId)
}
