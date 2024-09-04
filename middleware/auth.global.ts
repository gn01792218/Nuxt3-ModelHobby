export default defineNuxtRouteMiddleware((to, from) => {
  const { getCookie } = useMyCookie()
  //由於middleware中無法抓到localstorage，所以要使用cookie
  const userToken = getCookie('sb-access-token') //抓取supabase自動設置的cookie，無須自己設置唷

  if (to.path.includes("MyModel") || to.path.includes("WishList")) {
    if (!userToken.value) {
      return navigateTo('/login')
    }
  }
  return true
});
