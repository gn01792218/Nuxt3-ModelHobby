// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css:['~/assets/css/style.css'],
  supabase:{
    redirect:false,  //true的話就會設置路由守衛，自動把尚未登入者導到login
  },
  devtools: { enabled: true },
  modules:[
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    '@samk-dev/nuxt-vcalendar',
    'nuxt-time'
  ]
})
