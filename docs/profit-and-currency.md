# 金額與毛利計算

- 換算成台幣一律呼叫 [composables/useExchange.ts](../composables/useExchange.ts) 的 `toTWD`，不要自己寫換算公式或寫死匯率。可傳入自訂匯率，只在幣種為人民幣時生效，留空則用預設匯率。
- 毛利計算/顯示一律呼叫 [composables/useProfit.ts](../composables/useProfit.ts)：
  - `getProfit`：`price`/`sellingPrice` 缺一則回傳 `null`。單筆顯示用預設不乘數量；加總統計則改用乘上數量的模式。
  - `profitText(profit)`：正數補 `+` 號。
  - `profitClass(profit)`：正數紅 `text-red-500`、負數綠 `text-green-500`、0 不上色，全站固定用這個規則，不要自創配色。
- 新增相關功能時擴充這兩個 composable，不要在元件內另寫加總或正負號判斷。
