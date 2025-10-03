# Nuxt3-ModelHobby

基於 Nuxt3 開發的模型收藏網站。

## 功能特點

- 模型收藏管理
- 圖片上傳與管理
- 支援繁簡轉換
- 幣值轉換功能

## 開發環境設置

安裝依賴：

```bash
yarn install
```

啟動開發伺服器：

```bash
yarn dev
```

## 測試

執行單元測試：

```bash
# 執行所有測試
yarn test

# 開發時使用 watch 模式
yarn test:watch
```

## 建構與部署

建構專案（包含執行測試）：

```bash
yarn build
```

預覽建構結果：

```bash
yarn preview
```

## 部署

專案使用 Netlify 自動部署。每次推送到主分支時會：
1. 執行單元測試
2. 建構專案
3. 自動部署到生產環境

## 技術棧

- Nuxt 3
- Vue 3
- Pinia
- Vitest
- TypeScript
- Tailwind CSS
- Supabase


# yarn
yarn dev
```

## Production

Build the application for production:

```bash

# yarn
yarn build

```

Locally preview production build:

```bash

# yarn
yarn preview

```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

# Search icons
https://icones.js.org/collection/heroicons
# 專案初始化
## 環境變數設置
請添加一個.env檔案</br>
1.資料庫相關</br>
DATABASE_URL、SUPABASE_URL、SUPABASE_KEY</br>
2.S3圖片相關</br>
R2_ENDPOINT、R2_ACCESS_KEY_ID、R2_SECRET_ACCESS_KEY</br>
3.圖片插件需要
NUXT_IMAGE_PROVIDER=ipx 即可
## 資料庫的初始化
請使用以下指令將DB schema 推上新的資料庫中，</br>
**請使用port 5432的資料庫進行推送哦!(不要使用pool的)
```
npx prisma db push
```

# 使用Netilfy進行本地開發
## 先安裝Netilfy Cli
```
npm install netlify-cli -g

```
## 運行的指令
```
netlify dev
```
## 用netlify開發的指令
```
npm run netlify
```

# 關於API底層使用
目前封裝在useApiBase中，有兩種方式，fetchApiBase、useFetchApi。基本上主要使用fetchApiBase做大部分只需要在客戶端發送的請求，而需要SSR優勢的請求，如首頁的模型列表請求，就使用useFetchApi。