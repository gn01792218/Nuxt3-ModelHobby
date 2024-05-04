// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/style.css"],
  supabase: {
    redirect: false, //true的話就會設置路由守衛，自動把尚未登入者導到login
  },
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "nuxt-swiper",
    "@pinia/nuxt",
    "@nuxtjs/supabase",
    "@samk-dev/nuxt-vcalendar",
    "nuxt-time",
    "@nuxt/image",
  ],
  image: {
    provider: process.env.NUXT_IMAGE_PROVIDER, //部署在netlify中，需要透過他來轉換圖片
    dir: "assets/images", //設置靜態圖片資源的資料夾；使用時直接src="/cat.png"即可
    quality: 90, // 设置預設压缩质量为 ?%
    domains: [process.env.SUPABASE_URL || ""], //外部網址的圖片，都需要設置這個
  },
});
