# 模型品牌/類型/比例篩選

- 共用篩選邏輯在 [composables/useModelFilter.ts](../composables/useModelFilter.ts)，傳入來源模型清單（`ref`/`computed`），回傳 `brandOptions`/`typeOptions`/`scaleOptions`、`selectedBrand`/`selectedType`/`selectedScale`（篩選狀態）、`filteredModels`（篩選後結果）、`reSetFilter`（清空篩選）。任何頁面要提供「依品牌/類型/比例篩選模型清單」都先看能不能沿用這個 composable，不要各自重寫 `.filter()`。
  - 第二個參數 `{ optionsSource }` 控制下拉選單選項來源：預設 `'enum'` 顯示完整 enum 清單（不管來源清單目前有沒有該選項，例如首頁）；傳 `'models'` 則只顯示來源清單裡實際出現過的值（例如我的收藏，收藏數量少時不需要看到整個 enum 的品牌/類型/比例）。
  - 實際篩選（`filterModelsByCriteria`）與「該欄位有哪些值出現過」（`presentOptions`）兩個純函式在 [utils/modelFilter.ts](../utils/modelFilter.ts)，composable 只負責包一層 Vue 響應式；純函式邏輯有測試見 [test/utils/modelFilter.test.ts](../test/utils/modelFilter.test.ts)。
- 篩選面板（品牌/類型/比例下拉選單＋重置按鈕）的 HTML 結構共用 [components/ModelFilterPanel.vue](../components/ModelFilterPanel.vue)，用 `v-model:brand`/`v-model:type`/`v-model:scale` 綁定 `useModelFilter` 回傳的篩選狀態、`@reset` 綁 `reSetFilter`；需要在面板裡加其他篩選項（例如排序）就放進 `#extra` slot，不要複製整段面板 HTML。
- 品牌/類型/比例一律用 [components/MySelect.vue](../components/MySelect.vue) 下拉選單呈現，不要用 `ToggleChip` 或其他形式（比例過去曾用 `ToggleChip` 逐一列出，已統一改為下拉選單）。
- 首頁「探索更多模型創作」（[pages/index.vue](../pages/index.vue)）用 `#extra` slot 額外疊加排序（`selectedSort`）在 `useModelFilter` 回傳的 `filteredModels` 之上；排序邏輯不屬於 `useModelFilter`/`ModelFilterPanel`，只在需要排序的頁面自行實作。
- 我的收藏（[pages/User/WishList.vue](../pages/User/WishList.vue)）只用篩選、不用排序，直接把 `useModelFilter` 回傳的 `filteredModels` 拿去顯示。
