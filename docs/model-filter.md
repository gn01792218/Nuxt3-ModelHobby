# 模型品牌/類型/比例篩選

- 共用篩選邏輯在 [composables/useModelFilter.ts](../composables/useModelFilter.ts)，傳入來源模型清單（`ref`/`computed`），回傳 `brandOptions`/`typeOptions`/`scaleOptions`、`selectedBrand`/`selectedType`/`selectedScale`/`selectedKeyword`（篩選狀態）、`filteredModels`（篩選後結果）、`reSetFilter`（清空篩選）。任何頁面要提供「依品牌/類型/比例篩選模型清單」都先看能不能沿用這個 composable，不要各自重寫 `.filter()`。
  - `selectedKeyword` 是在品牌/類型/比例篩選完的結果上，再用 [composables/useModelKeywordFilter.ts](../composables/useModelKeywordFilter.ts) 的 `filterModelsByKeyword` 進一步做關鍵字搜尋（跟頁首「藝廊搜尋」同一套比對邏輯：`JSON.stringify(model)` 轉小寫＋繁轉簡再比對，關鍵字可用空白分隔多個，符合其中一個就算），不是另外做一套搜尋邏輯。
  - 第二個參數 `{ optionsSource }` 控制下拉選單選項來源：預設 `'enum'` 顯示完整 enum 清單（不管來源清單目前有沒有該選項，例如首頁）；傳 `'models'` 則只顯示來源清單裡實際出現過的值（例如我的收藏，收藏數量少時不需要看到整個 enum 的品牌/類型/比例）。
  - 第二個參數的 `excludeTypeOptions` 可以再從類型選項裡拿掉指定值，不管 `optionsSource` 是哪一種來源都會套用；首頁用它排除「工具」「顏料」「成品模型」這三個不算模型創作展示品的類型（見下方）。只排除下拉選單的可選項，不會把這些類型的模型從清單裡篩掉。
  - 實際篩選（`filterModelsByCriteria`）、「該欄位有哪些值出現過」（`presentOptions`）、「從選項清單排除指定值」（`excludeOptions`）三個純函式在 [utils/modelFilter.ts](../utils/modelFilter.ts)，composable 只負責包一層 Vue 響應式；純函式邏輯有測試見 [test/utils/modelFilter.test.ts](../test/utils/modelFilter.test.ts)。
- 篩選面板（關鍵字搜尋框＋品牌/類型/比例下拉選單＋重置按鈕）的 HTML 結構共用 [components/ModelFilterPanel.vue](../components/ModelFilterPanel.vue)，用 `v-model:brand`/`v-model:type`/`v-model:scale`/`v-model:keyword` 綁定 `useModelFilter` 回傳的篩選狀態、`@reset` 綁 `reSetFilter`；需要在面板裡加其他篩選項（例如排序）就放進 `#extra` slot，不要複製整段面板 HTML。
- 品牌/類型/比例一律用 [components/MySelect.vue](../components/MySelect.vue) 下拉選單呈現，不要用 `ToggleChip` 或其他形式（比例過去曾用 `ToggleChip` 逐一列出，已統一改為下拉選單）。
- 首頁「探索更多模型創作」（[pages/index.vue](../pages/index.vue)）的來源清單是 `useMyModel.ts` 的 `showcaseReadyModels`（已用 [utils/modelShowcase.ts](../utils/modelShowcase.ts) 的 `isShowcaseReady` 排除沒有完成圖片/完成時間的模型，見 [gallery-detail.md](gallery-detail.md)），不要改回傳 `allfinishedModels`；並用 `#extra` slot 額外疊加排序（`selectedSort`）在 `useModelFilter` 回傳的 `filteredModels` 之上，排序邏輯不屬於 `useModelFilter`/`ModelFilterPanel`，只在需要排序的頁面自行實作。
- 首頁「選擇類型」下拉選單另外傳 `excludeTypeOptions: [ModelType.工具, ModelType.顏料, ModelType.成品模型]`，因為這三個類型不是可展示的模型創作（工具/顏料不是模型本體、成品模型不是自己組裝的創作），之後 `ModelType` 若再新增類似「非展示用」的類型，同樣加進這個排除清單，不要讓它出現在篩選選項裡。
- 我的收藏（[pages/User/WishList.vue](../pages/User/WishList.vue)）只用篩選、不用排序，直接把 `useModelFilter` 回傳的 `filteredModels` 拿去顯示。
