# 收藏功能（Favorite）

- 目前唯一開放「所有登入者」（不限 owner，見 [docs/model-permissions.md](model-permissions.md)）寫入的功能：`server/api/favorites/[modelId].post.ts`/`.delete.ts` 不呼叫 `requireOwner`，改用 `serverSupabaseUser` 解析登入者，userId 一律取自 token、不信任前端傳入值；新增其他「一般會員可寫入」的 API 時比照這個模式。
- 收藏數量/是否收藏一律呼叫 [composables/useFavorite.ts](../composables/useFavorite.ts) 的 `favoriteCount`/`isFavoritedByMe`，不要自己算 `favorites.length` 或比對 `userId`。
- `toggleFavorite` 用樂觀更新（先改 store 再打 API，失敗才復原原本的收藏名單）並用模組層級的 `pendingModelIds` 鎖擋重複點擊；之後新增類似的即時互動時延用這個模式，不要每次都等 API 回應才更新畫面。
- 愛心顯示分兩種元件：可點擊收藏/取消收藏用 [components/FavoriteButton.vue](../components/FavoriteButton.vue)；純顯示、不能互動用 [components/FavoriteBadge.vue](../components/FavoriteBadge.vue)（`variant` 為 `heart` 預設或 `flame`）。首頁「熱門排行」等瀏覽情境只能用 `FavoriteBadge`，避免使用者在排行榜/輪播上誤觸收藏。
  - `flame` 變體代表「這是熱門項目」的排名徽章，跟「目前登入者是否收藏」無關，永遠是實心橘色（`i-heroicons-fire-solid`）；只有 `heart` 變體才依 `isFavoritedByMe` 切換實心/空心。
- 依模型類型分組排行榜用 [utils/favorite.ts](../utils/favorite.ts) 的 `groupMostFavoritedByType`（純函式，輸入需為已排序好的清單）。
- `useMyModelStore` 的 `favoritedFinishedModels`/`mostFavoritedModels`/`latestFinishedModels`/`myFavoriteModels` 是收藏相關清單的來源，新增收藏相關畫面先看能不能沿用，不要在元件裡重新篩選 `allModelList`。
- [components/Home/HighlightBoard.vue](../components/Home/HighlightBoard.vue) 的頁籤（`categories`）只決定候選名單（例如「最新創作」只從最近完成的作品裡選），實際顯示在輪播卡牌與排行榜的順序一律另外依收藏數（`sortedCategoryItems`）重新排序，不要直接用頁籤 `items` 原本的順序（例如「最新創作」原本是依完成日期排序）去餵輪播/排行榜。
- 排行榜（`rankingModels`）固定只取前 5 名，輪播卡牌（`carouselModels`）固定只取前 10 筆，兩者都從 `sortedCategoryItems` 各自 `slice`；候選名單再大也不整批餵給輪播，避免卡牌數量隨資料量無限增加。
