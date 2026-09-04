# CLAUDE.md

專案指引，供 Claude Code 在此 repo 工作時自動遵循，避免重複被提醒。本文件只放全站通用、跨功能的規則；單一功能領域的細節規則放 `docs/`，索引見 [docs/README.md](docs/README.md)。

## 專案概觀
Nuxt 3 模型收藏/購入管理系統。資料庫用 Prisma，認證/儲存用 Supabase，圖片存放 S3(R2)。

## 基本準則：撰寫文件（CLAUDE.md / README / SKILL.md / docs）
適用於本文件與 README.md、SKILL.md、docs/** 等所有文件：
- 只描述目前的現狀與規則，不寫流水帳、不記錄開發過程或現況演變（例如「目前仍分散在...」「這是先前發生過...的問題」都不要寫）。
- 新增/調整後直接更新對應章節反映最新狀態，不要疊加「本次異動」「新增於 xxx」「已過時」之類的附加段落或註記；規則或作法過時就直接改掉或刪除。
- 不堆疊 commit hash、PR 編號、ticket 編號等歷史紀錄，這類資訊已存在於 git log 與 PR 系統；確有查找價值才引用少數必要案例，並隨時精簡，不逐案永久保留。
- 已被取代的作法直接刪除或改寫，不用刪除線、註解或「舊版做法」段落長期保留。
- 判斷內容去留的標準是「未來維護者需要知道什麼」，不是「這段程式碼/規則怎麼演變過來的」。
- 用條列，不用長段落；能用檔案連結佐證的規則就附連結，不用文字重述程式碼內容。
- 提到某個 function 時只寫名稱（附連結），不要列出完整參數簽名（如 `fn(a, b, c?)`），參數一改文件就要跟著改；真的需要說明某個參數的行為差異時，用文字描述該參數的效果，不要照抄簽名。
- 需要理由時，一句話帶過即可，不展開說明背景故事。
- 本文件（CLAUDE.md）另外比照業界常見的 AI 指引文件（如 AGENTS.md）風格，每條規則寫成「遇到 X 就怎麼做」的祈使句。
- CLAUDE.md 只放跨功能的通用原則；單一功能領域（例如某個功能的計算規則、權限規則）的細節寫進 `docs/` 底下對應的檔案，CLAUDE.md 本身不列舉這些檔案，只透過 [docs/README.md](docs/README.md) 這個索引檔連結出去，避免每加一個功能 CLAUDE.md 就多一行。判斷標準：影響全站寫法、寫任何功能都要看的準則留在 CLAUDE.md（例如 grill 需求、重複必抽共用、API 呼叫方式、測試、慣例）；只跟單一功能/領域有關的規則獨立成 `docs/` 檔案。
- 新增 `docs/` 檔案時同步在 [docs/README.md](docs/README.md) 加一行連結＋一句話說明；該檔案內容有更新，索引那一句話跟著改到還是準確為止；功能整個移除就把對應檔案與索引行一起刪掉。CLAUDE.md 裡完全不需要跟著變動。

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
- [docs/profit-and-currency.md](docs/profit-and-currency.md)（`useExchange`、`useProfit`）與區塊標題共用元件 [components/SectionTitle.vue](components/SectionTitle.vue)，都是這個準則的具體案例。

## 基本準則：改動後同步更新文件
每次改完程式碼，收工前主動想一次「這次改動有沒有新增/調整規則、慣例、共用元件、資料來源」，需要就直接更新 CLAUDE.md 或對應的 `docs/**`，不要等使用者提醒才補；去哪個檔案的判斷標準跟「基本準則：撰寫文件」一致。
- 算「規則變了、要更新文件」的情況：新增共用 composable/component/util、新增或調整 API 的權限規則、新增色階或其他之後會被複用的慣例（例如新增 `useModelAuthor.ts` 這種資料來源）。
- 純粹調整視覺樣式（改顏色數值、字級、間距）本身不用寫文件；但如果順便新增了共用元件或新色階，那個「新增」的部分要記錄。

## API 呼叫方式
封裝在 [composables/api/useApiBase.ts](composables/api/useApiBase.ts)，有兩種：
- `fetchApiBase`：純客戶端請求，大部分情境用這個。
- `useFetchApi`：需要 SSR 的請求（例如首頁模型列表）才用這個。

新增 API 呼叫前先判斷是否需要 SSR，不要自己用裸的 `fetch`/`$fetch`。

## 測試
測試放在 `test/`，目錄結構鏡射 `composables/`/`utils/`（例如 `composables/useExchange.ts` → `test/composables/useExchange.test.ts`、`utils/favorite.ts` → `test/utils/favorite.test.ts`）。用 `npm run test` (vitest) 執行。新增/修改 composable 或 util 的計算邏輯時，應同步補上或更新對應測試；若邏輯依賴 `useUser`/Pinia store 等 Nuxt runtime，先拆成不依賴 runtime 的純函式放 `utils/` 再測，不要直接測需要 Nuxt context 的 composable。

## 慣例
- `composables/` 底下的檔案用 Nuxt 的 auto-import，不需手動 import。但 Pinia store（`useMyModelStore`）**沒有**被自動 import，任何檔案要用都必須手動 `import { useMyModelStore } from '~/store/useMyModelStore'`，漏了會在執行期才噴 `useMyModelStore is not defined`。
- Pinia store 用 composition API 寫法（`defineStore(name, () => {...})`），不是 options API。
- 顏色一律用 [tailwind.config.ts](tailwind.config.ts) 已定義的色階（`main` 藍、`acent` 粉紅、`earth` 大地棕、`olive` 軍綠、`steel` 銀灰），不要在元件裡寫死 hex 或用 Tailwind 內建色；新增色系也要補滿 `50`~`950` 完整色階。
- 卡片/列表要顯示模型代表圖時，依序 `finish_infos[0].gallery[0]`（完成照）→ `main_img`（主圖）→ `/imagePlaceHolder.jpg`（佔位圖），呼叫 [composables/useMyModelImg.ts](composables/useMyModelImg.ts) 的 `getModelFinishImagePublicUrl`/`getModelMainImagePublicUrl`，不要只讀 `main_img`。範例：[components/MyModel/GalleryCard.vue](components/MyModel/GalleryCard.vue)。
