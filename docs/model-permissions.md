# 權限：模型的新增/修改/刪除限定 owner

- 只有 `.env` 的 `OWNER_EMAIL`（對應 `runtimeConfig.public.ownerEmail`）指定的帳號能新增/修改/刪除 `Model` 與其巢狀資料（`PurchaseInfo`、`ModelFinishInfo`、`ModelSize`）以及上傳/刪除模型圖片，其他登入者與訪客一律唯讀。
- 新增任何模型相關的 POST/PUT/DELETE server API 時，第一行呼叫 [server/utils/requireOwner.ts](../server/utils/requireOwner.ts) 的 `requireOwner`，非 owner 會丟出 403；不要只靠前端擋，API 端一定要驗證，否則有人直接呼叫 API 就能繞過。
- 前端「我的模型」頁面（路徑含 `MyModel`）比照 [middleware/auth.global.ts](../middleware/auth.global.ts)：非 owner 一律導回首頁，不只是登入判斷。
- NavBar（[components/NavBar.vue](../components/NavBar.vue)）用 `Authority.SUPER`（[types/Auth.ts](../types/Auth.ts)）標記僅 owner 可見/可用的項目。
- 收藏功能是唯一例外（一般登入者也能寫入），見 [docs/favorites.md](favorites.md)。
- 因為現在唯一能新增模型的人就是 owner，模型的「作者」顯示名稱直接寫死在 [composables/useModelAuthor.ts](../composables/useModelAuthor.ts)（不走 `.env`、不查資料庫）；Gallery 列表卡片與模型明細頁都呼叫這個 composable 顯示作者，不要各自寫死字串。之後若開放多人新增模型，才需要改成依 `model.userId` 查真正的作者。
