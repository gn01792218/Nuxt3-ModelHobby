// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig:{
    baseURL:process.env.BASE_URL
  },
  supabase:{
    redirect:false,  //true的話就會設置路由守衛，自動把尚未登入者導到login
  },
  devtools: { enabled: true },
  modules:[
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/supabase'
  ]
})
