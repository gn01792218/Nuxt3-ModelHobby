# 巢狀資料的 Store 同步

`Model` 底下的巢狀陣列（`purchase_infos`、`finish_infos` 等）新增/修改/刪除後，一律把 API 回傳結果顯式寫回 `useMyModelStore` 裡對應物件的陣列（`push`/`splice`/依 `id` 找到 index 後整筆替換），不要依賴「元件間剛好共用同一個物件參考」這種隱性機制讓畫面更新——參考鏈只要中斷（多一層 clone、prop 傳遞方式改變等），其他頁面讀到的就會是舊資料，只能整頁刷新才會恢復正常。

- 範例：[components/ModelDetial/PurchaseInfo/index.vue](../components/ModelDetial/PurchaseInfo/index.vue) 的 `fetchAddModelPurchaseInfo`/`fetchDeletePurchaseInfo`/`fetchUpdate`，以及 [components/ModelDetial/BaseInfo.vue](../components/ModelDetial/BaseInfo.vue) 編輯後呼叫 `updateMyModelData()`。
- 用 `findIndex` 找項目後，用 `=== undefined` 或 `< 0` 判斷「找不到」，不要用 `!index`（index 為 `0` 時會被誤判成找不到）。
