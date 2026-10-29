# 金額與毛利計算

- 換算成台幣一律呼叫 [composables/useExchange.ts](../composables/useExchange.ts) 的 `toTWD`，不要自己寫換算公式或寫死匯率。可傳入自訂匯率，只在幣種為人民幣時生效，留空則用預設匯率。
- 毛利計算/顯示一律呼叫 [composables/useProfit.ts](../composables/useProfit.ts)：
  - `getProfit`：`price`/`sellingPrice` 缺一則回傳 `null`。單筆顯示用預設不乘數量；加總統計則改用乘上數量的模式。
  - `getModelProfit`：單一模型所有購買資訊乘上數量後的毛利加總，全部算不出毛利時回傳 `null`；統計看板的已賣出毛利加總與卡片毛利都用這個。
  - `profitText(profit)`：正數補 `+` 號。
  - `profitClass(profit)`：正數紅 `text-red-500`、負數綠 `text-green-500`、0 不上色，全站固定用這個規則，不要自創配色。
- 新增相關功能時擴充這兩個 composable，不要在元件內另寫加總或正負號判斷。
- 卡片上顯示單一模型毛利（「毛利+25」，算不出時「毛利 -」）一律用共用元件 [components/MyModel/ProfitText.vue](../components/MyModel/ProfitText.vue)：
  - 「我的模型」已賣出頁籤：[Card.vue](../components/MyModel/Card.vue) 傳入 `showProfit`。
  - 點統計區「已賣出」開啟的搜尋彈窗：store 的 `setSearchResult` 第二個參數設定 `searchShowProfit`，[SmallCard.vue](../components/MyModel/SmallCard.vue) 依此顯示；其他開窗方式不傳就預設不顯示。
