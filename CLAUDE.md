# CLAUDE.md

專案指引，供 Claude Code 在此 repo 工作時自動遵循，避免重複被提醒。

## 專案概觀
Nuxt 3 模型收藏/購入管理系統。資料庫用 Prisma，認證/儲存用 Supabase，圖片存放 S3(R2)。

## 基本準則：本文件的撰寫方式
新增/修改本文件內容時，比照業界常見的 AI 指引文件（如 AGENTS.md）風格：
- 每條規則寫成「遇到 X 就怎麼做」的祈使句，不寫流水帳、不記錄現況或歷史（例如「目前仍分散在...」「這是先前發生過...的問題」都不要寫）。
- 需要理由時，一句話帶過即可，不展開說明背景故事。
- 用條列，不用長段落；能用檔案連結佐證的規則就附連結，不用文字重述程式碼內容。
- 規則會過時就直接改掉或刪除，不要疊加註記「已過時」之類的說明。

## 基本準則：重複必抽共用
只要發現「兩處以上」地方使用雷同的計算邏輯、判斷邏輯或 HTML 結構，優先抽成共用 composable / method，或共用元件（component），不要各自複製一份。
- 邏輯類（計算、格式化、狀態判斷）→ 依是否需要用到元件生命週期/響應式（如 `ref`、`computed`、`onMounted`、注入其他 composable 等）決定：
  - 需要 → 抽成 `composables/` 底下的共用 composable。
  - 不需要，純輸入輸出的函式 → 抽成 `utils/` 底下的共用 util（例如既有的 [utils/enumToArray.ts](utils/enumToArray.ts)），不要為了「共用」就一律包成 composable。
- 畫面/HTML 結構類（重複的區塊、卡片、表單片段）→ 抽成 `components/` 底下的共用元件。
- 判斷「雷同」不需要完全一模一樣，只要是同一個概念的計算/顯示（例如「毛利怎麼算、怎麼上色」），出現第二次就該抽，不要等到第三次。
- 下方「金額與毛利計算」一節就是這個準則的具體案例（`useExchange`、`useProfit`）。

## 金額與毛利計算
- 換算成台幣一律呼叫 [composables/useExchange.ts](composables/useExchange.ts) 的 `toTWD(currency, price, amount)`，不要自己寫換算公式或寫死匯率。
- 毛利計算/顯示一律呼叫 [composables/useProfit.ts](composables/useProfit.ts)：
  - `getProfit(purchaseInfo, withAmount?)`：`price`/`sellingPrice` 缺一則回傳 `null`。單筆顯示用預設 `false`（不乘數量）；加總統計用 `true`（乘 `amount`）。
  - `profitText(profit)`：正數補 `+` 號。
  - `profitClass(profit)`：正數紅 `text-red-500`、負數綠 `text-green-500`、0 不上色，全站固定用這個規則，不要自創配色。
- 新增相關功能時擴充這兩個 composable，不要在元件內另寫加總或正負號判斷。

## API 呼叫方式
封裝在 [composables/api/useApiBase.ts](composables/api/useApiBase.ts)，有兩種：
- `fetchApiBase`：純客戶端請求，大部分情境用這個。
- `useFetchApi`：需要 SSR 的請求（例如首頁模型列表）才用這個。

新增 API 呼叫前先判斷是否需要 SSR，不要自己用裸的 `fetch`/`$fetch`。

## 測試
測試放在 `test/`，目錄結構鏡射 `composables/`（例如 `composables/useExchange.ts` → `test/composables/useExchange.test.ts`）。用 `npm run test` (vitest) 執行。新增/修改 composable 的計算邏輯時，應同步補上或更新對應測試。

## 慣例
- Composable、Store 皆使用 Nuxt/Pinia 的 auto-import，不需手動 import（新檔案存到 `composables/` 或 `store/` 即可）。
- Pinia store 用 composition API 寫法（`defineStore(name, () => {...})`），不是 options API。
