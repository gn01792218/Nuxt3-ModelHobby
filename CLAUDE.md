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
- 提到某個 function 時只寫名稱（附連結），不要列出完整參數簽名（如 `fn(a, b, c?)`），參數一改文件就要跟著改；真的需要說明某個參數的行為差異時，用文字描述該參數的效果，不要照抄簽名。

## 基本準則：README/SKILL.md/docs 撰寫規範
撰寫或更新 README.md、SKILL.md、docs/** 等文件時：
- 只描述目前的現狀與架構，不寫成開發過程的流水帳或時間軸紀錄。
- 新增/調整功能後，直接更新對應章節內容反映最新狀態，不要在文件底部疊加「本次異動」「新增於 xxx」之類的附加段落。
- 不堆疊 commit hash、PR 編號、ticket 編號等歷史紀錄，這類資訊已存在於 git log 與 PR 系統；確有查找價值才引用少數必要案例，並隨時精簡，不逐案永久保留。
- 已被取代的作法直接刪除或改寫，不用刪除線、註解或「舊版做法」段落長期保留。
- 判斷內容去留的標準是「未來維護者需要知道什麼」，不是「這段程式碼怎麼演變過來的」。

## 基本準則：先 grill 再動工
收到新需求時，先提出詳細問題釐清範圍、邊界情況、資料來源等細節，確認清楚後才開始寫程式，不要憑猜測直接實作。
- 需求形如「A 的地方要跟 B 一樣」時，若 B 的既有實作涵蓋的範圍比使用者明講的還大（例如 B 有多個相關欄位，需求只提到其中一個），只實作使用者明講的部分；其餘欄位是否也要套用，一律先問，不要自己判斷。

## 基本準則：重複必抽共用
只要發現「兩處以上」地方使用雷同的計算邏輯、判斷邏輯或 HTML 結構，優先抽成共用 composable / method，或共用元件（component），不要各自複製一份。
- 邏輯類（計算、格式化、狀態判斷）→ 依是否需要用到元件生命週期/響應式（如 `ref`、`computed`、`onMounted`、注入其他 composable 等）決定：
  - 需要 → 抽成 `composables/` 底下的共用 composable。
  - 不需要，純輸入輸出的函式 → 抽成 `utils/` 底下的共用 util（例如既有的 [utils/enumToArray.ts](utils/enumToArray.ts)），不要為了「共用」就一律包成 composable。
- 畫面/HTML 結構類（重複的區塊、卡片、表單片段）→ 抽成 `components/` 底下的共用元件。
- 判斷「雷同」不需要完全一模一樣，只要是同一個概念的計算/顯示（例如「毛利怎麼算、怎麼上色」），出現第二次就該抽，不要等到第三次。
- 下方「金額與毛利計算」一節就是這個準則的具體案例（`useExchange`、`useProfit`）。

## 金額與毛利計算
- 換算成台幣一律呼叫 [composables/useExchange.ts](composables/useExchange.ts) 的 `toTWD`，不要自己寫換算公式或寫死匯率。可傳入自訂匯率，只在幣種為人民幣時生效，留空則用預設匯率。
- 毛利計算/顯示一律呼叫 [composables/useProfit.ts](composables/useProfit.ts)：
  - `getProfit`：`price`/`sellingPrice` 缺一則回傳 `null`。單筆顯示用預設不乘數量；加總統計則改用乘上數量的模式。
  - `profitText(profit)`：正數補 `+` 號。
  - `profitClass(profit)`：正數紅 `text-red-500`、負數綠 `text-green-500`、0 不上色，全站固定用這個規則，不要自創配色。
- 新增相關功能時擴充這兩個 composable，不要在元件內另寫加總或正負號判斷。

## 巢狀資料的 Store 同步
`Model` 底下的巢狀陣列（`purchase_infos`、`finish_infos` 等）新增/修改/刪除後，一律把 API 回傳結果顯式寫回 `useMyModelStore` 裡對應物件的陣列（`push`/`splice`/依 `id` 找到 index 後整筆替換），不要依賴「元件間剛好共用同一個物件參考」這種隱性機制讓畫面更新——參考鏈只要中斷（多一層 clone、prop 傳遞方式改變等），其他頁面讀到的就會是舊資料，只能整頁刷新才會恢復正常。
- 範例：[components/ModelDetial/PurchaseInfo/index.vue](components/ModelDetial/PurchaseInfo/index.vue) 的 `fetchAddModelPurchaseInfo`/`fetchDeletePurchaseInfo`/`fetchUpdate`，以及 [components/ModelDetial/BaseInfo.vue](components/ModelDetial/BaseInfo.vue) 編輯後呼叫 `updateMyModelData()`。
- 用 `findIndex` 找項目後，用 `=== undefined` 或 `< 0` 判斷「找不到」，不要用 `!index`（index 為 `0` 時會被誤判成找不到）。

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
