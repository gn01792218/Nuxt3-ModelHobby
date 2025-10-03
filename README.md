# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
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