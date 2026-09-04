import { useMyModelStore } from "~/store/useMyModelStore"
import useApiBase from "./api/useApiBase"
import { favoriteCount, isFavoritedBy } from "~/utils/favorite"
import type { Model } from "~/types/model"

// 用模組層級的 reactive Set 當作跨元件共用的鎖，同一個模型在請求完成前忽略重複點擊，避免回應順序不一致造成的競態
const pendingModelIds = reactive(new Set<number>())

export default () => {
  const { user } = useUser()
  const { fetchApiBase } = useApiBase()
  const { updateModelFavorites } = useMyModelStore()

  function isFavoritedByMe(model: Model) {
    return isFavoritedBy(model, user.value?.id)
  }

  function isPending(model: Model) {
    return pendingModelIds.has(model.id)
  }

  async function toggleFavorite(model: Model) {
    if (!user.value) {
      navigateTo('/login')
      return
    }
    if (pendingModelIds.has(model.id)) return

    const userId = user.value.id
    const previousFavorites = model.favorites ?? []
    const wasFavorited = isFavoritedByMe(model)
    const optimisticFavorites = wasFavorited
      ? previousFavorites.filter((favorite) => favorite.userId !== userId)
      : [...previousFavorites, { userId }]

    // 樂觀更新：先假設成功讓畫面立刻反應，不等 API 回應
    pendingModelIds.add(model.id)
    updateModelFavorites(model.id, optimisticFavorites)

    try {
      const method = wasFavorited ? 'delete' : 'post'
      const favorites = await fetchApiBase(`/api/favorites/${model.id}`, method)
      // 用伺服器實際結果覆蓋；若請求失敗（favorites 為 null）則復原成點擊前的狀態
      updateModelFavorites(model.id, favorites ?? previousFavorites)
    } finally {
      pendingModelIds.delete(model.id)
    }
  }

  return {
    //methods
    favoriteCount,
    isFavoritedByMe,
    isPending,
    toggleFavorite
  }
}
