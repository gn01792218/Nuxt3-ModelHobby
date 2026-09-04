# 展示頁（Gallery Detail）

- 路由：`pages/Gallery/[modelId].vue`，資料來自 [composables/useMyModel.ts](../composables/useMyModel.ts) 的 `currentModel`（從全站已載入的 `allModelList` 裡 `find` 出來，不另外打 API）。
- 頁面底部「探索更多」依 `type`/`brand`/`scale` 三個條件各自從其他已完成模型（`allfinishedModels`，排除自己）隨機抽 12 筆，來源是 `useMyModel.ts` 的 `sameTypeModels`/`sameBrandModels`/`sameScaleModels`，實際篩選＋洗牌邏輯在 [utils/relatedModels.ts](../utils/relatedModels.ts) 的 `pickRelatedModels`（純函式，內部呼叫 `pickRandom` 做 Fisher-Yates 洗牌）。
- 三排卡片沿用 [components/MyModel/GalleryCard.vue](../components/MyModel/GalleryCard.vue)（即首頁「探索更多模型創作」用的同一顆卡片），不要另外做一顆展示頁專用卡片。
- 之後若有其他地方需要「依某欄位找同類其他項目、隨機抽 N 筆」，優先沿用 `pickRandom`/`pickRelatedModels`，不要重新寫一份洗牌邏輯。
